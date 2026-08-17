const encoder = new TextEncoder();
const esc = value => String(value ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const crcTable = (() => { const table = []; for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; table[n] = c >>> 0; } return table; })();
const crc32 = bytes => { let c = 0xffffffff; for (const byte of bytes) c = crcTable[(c ^ byte) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
const uint16 = value => { const bytes = new Uint8Array(2); new DataView(bytes.buffer).setUint16(0, value, true); return bytes; };
const uint32 = value => { const bytes = new Uint8Array(4); new DataView(bytes.buffer).setUint32(0, value, true); return bytes; };
const join = chunks => { const length = chunks.reduce((sum, chunk) => sum + chunk.length, 0); const result = new Uint8Array(length); let offset = 0; for (const chunk of chunks) { result.set(chunk, offset); offset += chunk.length; } return result; };

function zip(files) {
  let offset = 0; const parts = []; const centralDirectory = [];
  for (const [name, content] of Object.entries(files)) {
    const filename = encoder.encode(name), data = encoder.encode(content), crc = crc32(data);
    const header = join([uint32(0x04034b50), uint16(20), uint16(0), uint16(0), uint16(0), uint16(0), uint32(crc), uint32(data.length), uint32(data.length), uint16(filename.length), uint16(0)]);
    parts.push(header, filename, data);
    const central = join([uint32(0x02014b50), uint16(20), uint16(20), uint16(0), uint16(0), uint16(0), uint16(0), uint32(crc), uint32(data.length), uint32(data.length), uint16(filename.length), uint16(0), uint16(0), uint16(0), uint16(0), uint32(0), uint32(offset), filename]);
    centralDirectory.push(central); offset += header.length + filename.length + data.length;
  }
  const directory = join(centralDirectory);
  return join([...parts, directory, uint32(0x06054b50), uint16(0), uint16(0), uint16(centralDirectory.length), uint16(centralDirectory.length), uint32(directory.length), uint32(offset), uint16(0)]);
}

function xlsx(entries) {
  const headings = ['Date & time', 'Order ID', 'Café', 'Customer name', 'Table', 'Items ordered', 'Item prices', 'Subtotal', 'Taxes', 'Grand total', 'Status'];
  const letters = 'ABCDEFGHIJK'.split('');
  const cell = (value, address) => typeof value === 'number' ? `<c r="${address}" t="n"><v>${value}</v></c>` : `<c r="${address}" t="inlineStr"><is><t>${esc(value)}</t></is></c>`;
  const rows = [headings, ...entries.map(order => [order.createdAt, order.id, order.cafeName, order.customerName || 'Walk-in guest', order.table, order.items.map(item => `${item.qty} × ${item.name}`).join(' · '), order.items.map(item => `₹${item.price}`).join(' · '), order.subtotal, order.tax, order.total, order.status])]
    .map((row, index) => `<row r="${index + 1}">${row.map((value, column) => cell(value, `${letters[column]}${index + 1}`)).join('')}</row>`).join('');
  const sheet = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews><cols>${[22,15,24,22,10,48,30,13,12,15,14].map((width, index) => `<col min="${index + 1}" max="${index + 1}" width="${width}" customWidth="1"/>`).join('')}</cols><sheetData>${rows}</sheetData><autoFilter ref="A1:K${entries.length + 1}"/></worksheet>`;
  return zip({
    '[Content_Types].xml': '<?xml version="1.0" encoding="UTF-8"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/></Types>',
    '_rels/.rels': '<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>',
    'xl/workbook.xml': '<?xml version="1.0" encoding="UTF-8"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="Cafe orders" sheetId="1" r:id="rId1"/></sheets></workbook>',
    'xl/_rels/workbook.xml.rels': '<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="worksheets/sheet1.xml"/></Relationships>',
    'xl/worksheets/sheet1.xml': sheet
  });
}

export class OrderStore {
  constructor(state) { this.state = state; }
  async fetch(request) {
    const url = new URL(request.url);
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    };
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    let db = await this.state.storage.get('app_db');
    let orders = (db && db.orders) || (await this.state.storage.get('orders')) || [];

    // Full Cloud State Synchronizer (Company settings, cafe profiles, menus, orders)
    if (url.pathname === '/api/db') {
      if (request.method === 'GET') {
        return Response.json(db || null, { headers: corsHeaders });
      }
      if (request.method === 'POST') {
        const payload = await request.json();
        db = { ...(db || {}), ...payload };
        await this.state.storage.put('app_db', db);
        if (Array.isArray(db.orders)) {
          await this.state.storage.put('orders', db.orders);
        }
        return Response.json({ success: true, db }, { headers: corsHeaders });
      }
    }

    // Orders endpoint
    if (request.method === 'GET' && url.pathname === '/api/orders') {
      return Response.json(orders, { headers: corsHeaders });
    }
    if (request.method === 'POST' && url.pathname === '/api/orders') {
      const order = await request.json();
      if (!order.id || !order.table || !Array.isArray(order.items)) return Response.json({ saved: false, error: 'Missing order details' }, { status: 400, headers: corsHeaders });
      orders.unshift(order);
      if (db) db.orders = orders;
      await this.state.storage.put('orders', orders);
      if (db) await this.state.storage.put('app_db', db);
      return Response.json({ saved: true }, { headers: corsHeaders });
    }
    if (request.method === 'PUT' && url.pathname === '/api/orders') {
      const update = await request.json();
      let found = false;
      for (let i = 0; i < orders.length; i++) {
        if (orders[i].id === update.id) {
          orders[i].status = update.status;
          found = true;
          break;
        }
      }
      if (found) {
        if (db) db.orders = orders;
        await this.state.storage.put('orders', orders);
        if (db) await this.state.storage.put('app_db', db);
      }
      return Response.json({ updated: found }, { headers: corsHeaders });
    }
    if (request.method === 'GET' && url.pathname === '/exports/orders.xlsx') {
      return new Response(xlsx(orders), { headers: { ...corsHeaders, 'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'Content-Disposition': 'attachment; filename="cafe-orders.xlsx"' } });
    }
    return new Response('Not found', { status: 404, headers: corsHeaders });
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/exports/')) {
      const id = env.ORDER_STORE.idFromName('global-orders');
      return env.ORDER_STORE.get(id).fetch(request);
    }
    return env.ASSETS.fetch(request);
  }
};
