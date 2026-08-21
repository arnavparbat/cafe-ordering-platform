const $ = (s, el=document) => el.querySelector(s);
const $$ = (s, el=document) => [...el.querySelectorAll(s)];
const money = n => `₹${Number(n).toLocaleString('en-IN')}`;
const esc = v => String(v ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const SESSION_DURATION_MS = 60 * 60 * 1000; // 1 hour session & guest order persistence

const imgs = {
  cappuccino: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=700&q=80',
  latte: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=700&q=80',
  cortado: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=700&q=80',
  coldbrew: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=700&q=80',
  croissant: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=80',
  sandwich: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=700&q=80',
  pasta: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=700&q=80',
  brownie: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=700&q=80',
  mojito: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=700&q=80',
  cheesecake: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=700&q=80'
};

const seed = {
  platform: {
    companyName: "Eat 'N Greet",
    adminName: "Aarav Mehta",
    adminEmail: "aarav@eatngreet.console",
    adminUsername: "admin",
    adminPassword: "admin123"
  },
  cafes: [
    {
      id: 'CAF-001',
      name: "Eat 'N Greet — Park Street",
      username: 'eatngreet',
      slug: 'eatngreet',
      password: 'cafe123',
      qrSecret: 'eng_sec_caf001_p@rkst',
      contact: '+91 98123 45678',
      address: '18, Park Street, Kolkata',
      gstin: '19AAACH7409R1ZZ',
      gstRate: 5,
      gstEnabled: true,
      serviceChargeRate: 5,
      serviceChargeEnabled: true,
      customCharges: [],
      upiId: 'eatngreet.parkstreet@upi',
      upiName: "Eat 'N Greet Park Street",
      upiEnabled: true,
      status: 'Active',
      wifi: { ssid: 'EatNGreet_ParkStreet', password: 'Welcome@ParkStreet' },
      opensAt: '08:00',
      closesAt: '22:30',
      description: 'A quiet corner for considered coffee, all-day plates and slow conversations.',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1800&q=85'
    },
    {
      id: 'CAF-002',
      name: "Eat 'N Greet — Salt Lake",
      username: 'saltlake',
      slug: 'saltlake',
      password: 'cafe123',
      qrSecret: 'eng_sec_caf002_s@ltlk',
      contact: '+91 98345 67890',
      address: 'Sector V, Salt Lake, Kolkata',
      gstin: '19AABCS8821Q1Z8',
      gstRate: 5,
      gstEnabled: true,
      serviceChargeRate: 5,
      serviceChargeEnabled: true,
      customCharges: [],
      upiId: 'eatngreet.saltlake@upi',
      upiName: "Eat 'N Greet Salt Lake",
      upiEnabled: true,
      status: 'Active',
      wifi: { ssid: 'EatNGreet_SaltLake', password: 'Coffee@SaltLake' },
      opensAt: '09:00',
      closesAt: '23:00',
      description: 'Modern artisanal coffee bar, specialty pour-overs and bakery.',
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1800&q=85'
    },
    {
      id: 'CAF-003',
      name: "Eat 'N Greet — Ballygunge",
      username: 'ballygunge',
      slug: 'ballygunge',
      password: 'cafe123',
      qrSecret: 'eng_sec_caf003_b@llyg',
      contact: '+91 98765 43210',
      address: '45/2, Ballygunge Circular Rd, Kolkata',
      gstin: '19AACCE3312M1Z2',
      gstRate: 5,
      gstEnabled: true,
      serviceChargeRate: 5,
      serviceChargeEnabled: true,
      customCharges: [],
      upiId: 'eatngreet.ballygunge@upi',
      upiName: "Eat 'N Greet Ballygunge",
      upiEnabled: true,
      status: 'Active',
      wifi: { ssid: 'EatNGreet_Ballygunge', password: 'Aroma@Ballygunge' },
      opensAt: '08:30',
      closesAt: '22:00',
      description: 'Charming courtyard café with artisan sourdough toasts & cold brews.',
      image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=1800&q=85'
    }
  ],
  menu: [
    // CAF-001 (Park Street)
    {id:'m1',cafeId:'CAF-001',name:'House Cappuccino',description:'Velvety espresso, steamed milk & rich foam.',price:180,category:'Coffee',image:imgs.cappuccino,available:true,veg:true},
    {id:'m2',cafeId:'CAF-001',name:'Vanilla Oat Latte',description:'Single-origin espresso with silky oat milk.',price:220,category:'Coffee',image:imgs.latte,available:true,veg:true},
    {id:'m3',cafeId:'CAF-001',name:'Butter Croissant',description:'Flaky, slow-fermented French butter pastry.',price:155,category:'Breakfast',image:imgs.croissant,available:true,veg:true},
    {id:'m4',cafeId:'CAF-001',name:'Three Cheese Toastie',description:'Aged cheddar, mozzarella & herb butter.',price:280,category:'Snacks',image:imgs.sandwich,available:true,veg:true},
    {id:'m5',cafeId:'CAF-001',name:'Truffle Cream Pasta',description:'Tagliatelle, parmesan & black truffle.',price:410,category:'Main Course',image:imgs.pasta,available:true,veg:true},
    {id:'m6',cafeId:'CAF-001',name:'Warm Chocolate Brownie',description:'Dark cocoa brownie, vanilla crème fraîche.',price:190,category:'Desserts',image:imgs.brownie,available:true,veg:true},
    {id:'m7',cafeId:'CAF-001',name:'Citrus Garden Cooler',description:'Fresh lime, mint, cucumber & soda.',price:165,category:'Cold Beverages',image:imgs.mojito,available:true,veg:true},

    // CAF-002 (Salt Lake)
    {id:'m8',cafeId:'CAF-002',name:'Spanish Cortado',description:'Double shot espresso balanced with warm textured milk.',price:195,category:'Coffee',image:imgs.cortado,available:true,veg:true},
    {id:'m9',cafeId:'CAF-002',name:'Vanilla Cold Brew',description:'18-hour slow steeped cold brew with Madagascar vanilla.',price:230,category:'Coffee',image:imgs.coldbrew,available:true,veg:true},
    {id:'m10',cafeId:'CAF-002',name:'Almond Croissant',description:'Flaky pastry filled with rich almond frangipane.',price:175,category:'Breakfast',image:imgs.croissant,available:true,veg:true},
    {id:'m11',cafeId:'CAF-002',name:'Grilled Pesto Panini',description:'Sun-dried tomatoes, bocconcini & fresh basil pesto.',price:295,category:'Snacks',image:imgs.sandwich,available:true,veg:true},
    {id:'m12',cafeId:'CAF-002',name:'Classic Basque Cheesecake',description:'Caramelized exterior with an ultra-creamy custard center.',price:240,category:'Desserts',image:imgs.cheesecake,available:true,veg:true},
    {id:'m13',cafeId:'CAF-002',name:'Mint Mojito Cooler',description:'Crushed mint, fresh lime juice & sparkling soda.',price:170,category:'Cold Beverages',image:imgs.mojito,available:true,veg:true},

    // CAF-003 (Ballygunge)
    {id:'m14',cafeId:'CAF-003',name:'Artisan Flat White',description:'Ristretto espresso with microfoam velvety milk.',price:190,category:'Coffee',image:imgs.latte,available:true,veg:true},
    {id:'m15',cafeId:'CAF-003',name:'Avocado Sourdough Toast',description:'Hass avocado, chili flakes, feta & microgreens.',price:310,category:'Breakfast',image:imgs.sandwich,available:true,veg:true},
    {id:'m16',cafeId:'CAF-003',name:'Penne Arrabbiata',description:'Slow-simmered San Marzano tomatoes, garlic & basil.',price:380,category:'Main Course',image:imgs.pasta,available:true,veg:true},
    {id:'m17',cafeId:'CAF-003',name:'Fudge Walnut Brownie',description:'Rich Belgian chocolate brownie with roasted walnuts.',price:200,category:'Desserts',image:imgs.brownie,available:true,veg:true}
  ],
  orders: [
    {id:'ORD-1048',cafeId:'CAF-001',table:'04',customerName:'Ananya Sharma',items:[{name:'House Cappuccino',qty:2,price:180},{name:'Butter Croissant',qty:1,price:155}],total:567,status:'Preparing',time:'10:42 AM',date:'Today',timestamp:Date.now()-1000*60*25},
    {id:'ORD-1047',cafeId:'CAF-001',table:'11',customerName:'Rahul Sen',items:[{name:'Truffle Cream Pasta',qty:1,price:410,isNew:true}],total:451,status:'New',isNew:true,time:'10:31 AM',date:'Today',timestamp:Date.now()-1000*60*10},
    {id:'ORD-1046',cafeId:'CAF-002',table:'07',customerName:'Priya Patel',items:[{name:'Spanish Cortado',qty:1,price:195},{name:'Classic Basque Cheesecake',qty:1,price:240}],total:479,status:'Ready',time:'10:18 AM',date:'Today',timestamp:Date.now()-1000*60*45},
    {id:'ORD-1045',cafeId:'CAF-003',table:'02',customerName:'Vikram Das',items:[{name:'Avocado Sourdough Toast',qty:1,price:310}],total:341,status:'Completed',time:'09:52 AM',date:'Today',timestamp:Date.now()-1000*60*90}
  ]
};

let db = JSON.parse(localStorage.getItem('juniper-db') || 'null') || seed;

// Function to save locally and broadcast to cloud backend for all devices
function save(immediate = false) {
  localStorage.setItem('juniper-db', JSON.stringify(db));
  pushCloudDb(immediate);
}

let pushTimeout = null;
function pushCloudDb(immediate = false) {
  clearTimeout(pushTimeout);
  const executePush = async () => {
    try {
      await fetch('/api/db', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(db)
      });
    } catch(e){}
  };
  if (immediate) {
    executePush();
  } else {
    pushTimeout = setTimeout(executePush, 50);
  }
}

db.platform = Object.assign({
  companyName: "Eat 'N Greet",
  adminName: "Aarav Mehta",
  adminEmail: "aarav@eatngreet.console",
  adminUsername: "admin",
  adminPassword: "admin123"
}, db.platform || {});

if (!db.cafes || !db.cafes.length) db.cafes = seed.cafes;
db.menu = db.menu || seed.menu;
db.orders = db.orders || seed.orders;
db.tableResets = db.tableResets || {};

db.menu.forEach(item => item.cafeId ||= db.cafes[0].id);
db.orders.forEach(order => {
  order.cafeId ||= db.cafes[0].id;
  order.customerName ||= 'Guest (' + (order.table ? `Table ${order.table}` : 'Walk-in') + ')';
  order.timestamp ||= Date.now() - 1000 * 60 * 30;
  if (order.status === 'New') {
    order.isNew = true;
    (order.items || []).forEach(i => i.isNew = true);
  }
});
db.cafes.forEach((c, i) => {
  c.opensAt ||= '08:00';
  c.closesAt ||= '22:30';
  c.address ||= '18, Park Street, Kolkata';
  c.slug ||= c.username || c.id.toLowerCase();
  c.qrSecret ||= `eng_sec_${c.id.toLowerCase()}_${c.password || 'welcome123'}`;
  c.gstRate = c.gstRate !== undefined ? Number(c.gstRate) : 5;
  c.gstEnabled = c.gstEnabled !== undefined ? !!c.gstEnabled : true;
  c.serviceChargeRate = c.serviceChargeRate !== undefined ? Number(c.serviceChargeRate) : 5;
  c.serviceChargeEnabled = c.serviceChargeEnabled !== undefined ? !!c.serviceChargeEnabled : true;
  c.gstin ||= (i === 0 ? '19AAACH7409R1ZZ' : i === 1 ? '19AABCS8821Q1Z8' : '19AACCE3312M1Z2');
  c.customCharges ||= [];
  c.upiId ||= (i === 0 ? 'eatngreet.parkstreet@upi' : i === 1 ? 'eatngreet.saltlake@upi' : 'eatngreet.ballygunge@upi');
  c.upiName ||= c.name;
  c.upiEnabled = c.upiEnabled !== undefined ? !!c.upiEnabled : true;
});
localStorage.setItem('juniper-db', JSON.stringify(db));

// Cryptographic Deterministic Table QR Token Generator
function generateTableToken(cafeId, table, secret) {
  const cleanCafeId = String(cafeId || '').trim().toLowerCase();
  const cleanTable = String(table || '').trim().padStart(2, '0');
  const secretKey = String(secret || (cleanCafeId + '_eng_secret_key_2026'));
  
  const input = `eatngreet:secure-table-token:${cleanCafeId}:${cleanTable}:${secretKey}`;
  let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
  for (let i = 0; i < input.length; i++) {
    const ch = input.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  const hex1 = (h1 >>> 0).toString(16).padStart(8, '0');
  const hex2 = (h2 >>> 0).toString(16).padStart(8, '0');
  return `${hex1}${hex2}`;
}

// Cryptographic Deterministic Table QR Token Verifier
function verifyTableToken(cafeId, table, token) {
  if (!cafeId || !table || !token) return false;
  const c = db.cafes.find(x => 
    x.id.toLowerCase() === String(cafeId).toLowerCase() || 
    (x.slug && x.slug.toLowerCase() === String(cafeId).toLowerCase()) || 
    (x.username && x.username.toLowerCase() === String(cafeId).toLowerCase())
  );
  const secret = c?.qrSecret || `${cafeId}_eng_secret_key_2026`;
  const expected = generateTableToken(cafeId, table, secret);
  return String(token).trim().toLowerCase() === expected.toLowerCase();
}

// ========================================================
// CAFÉ BILLING CHARGES & REVENUE ENGINE
// ========================================================
function getCafeCharges(cafeIdOrObj) {
  const c = typeof cafeIdOrObj === 'object' && cafeIdOrObj !== null 
    ? cafeIdOrObj 
    : (db.cafes.find(x => x.id === cafeIdOrObj) || (typeof cafe === 'function' ? cafe() : db.cafes[0]) || db.cafes[0]);
  
  if (!c) {
    return [{ id: 'gst', name: 'GST (5%)', label: 'GST', rate: 5, type: 'percent', enabled: true }];
  }

  const list = [];
  const gstRate = c.gstRate !== undefined ? Number(c.gstRate) : 5;
  const gstEnabled = c.gstEnabled !== undefined ? !!c.gstEnabled : true;
  if (gstEnabled && gstRate > 0) {
    list.push({
      id: 'gst',
      name: `GST (${gstRate}%)`,
      label: 'GST',
      rate: gstRate,
      type: 'percent',
      enabled: true
    });
  }

  const scRate = c.serviceChargeRate !== undefined ? Number(c.serviceChargeRate) : 5;
  const scEnabled = c.serviceChargeEnabled !== undefined ? !!c.serviceChargeEnabled : true;
  if (scEnabled && scRate > 0) {
    list.push({
      id: 'service_charge',
      name: `Service Charge (${scRate}%)`,
      label: 'Service Charge',
      rate: scRate,
      type: 'percent',
      enabled: true
    });
  }

  if (Array.isArray(c.customCharges)) {
    c.customCharges.forEach((ch, idx) => {
      if (ch && ch.enabled && Number(ch.rate) > 0) {
        const typeLabel = ch.type === 'fixed' ? ` (₹${ch.rate})` : ` (${ch.rate}%)`;
        list.push({
          id: ch.id || `custom_${idx}`,
          name: `${ch.name}${typeLabel}`,
          label: ch.name,
          rate: Number(ch.rate),
          type: ch.type || 'percent',
          enabled: true
        });
      }
    });
  }

  return list;
}

function calculateOrderBreakdown(items, cafeIdOrObj) {
  const subtotal = (items || []).reduce((sum, i) => sum + (Number(i.price) || 0) * (Number(i.qty) || 1), 0);
  const activeCharges = getCafeCharges(cafeIdOrObj);
  const appliedCharges = [];
  let totalCharges = 0;

  activeCharges.forEach(ch => {
    let amt = 0;
    if (ch.type === 'percent') {
      amt = Math.round(subtotal * (ch.rate / 100));
    } else {
      amt = Math.round(Number(ch.rate) || 0);
    }
    appliedCharges.push({
      id: ch.id,
      name: ch.name,
      label: ch.label,
      rate: ch.rate,
      type: ch.type,
      amount: amt
    });
    totalCharges += amt;
  });

  const total = subtotal + totalCharges;
  const gstCharge = appliedCharges.find(c => c.id === 'gst');

  return {
    subtotal,
    charges: appliedCharges,
    totalCharges,
    tax: gstCharge ? gstCharge.amount : 0,
    total
  };
}

function numberToWords(num) {
  if (!num || isNaN(num)) return '';
  const a = ['','One ','Two ','Three ','Four ', 'Five ','Six ','Seven ','Eight ','Nine ','Ten ','Eleven ','Twelve ','Thirteen ','Fourteen ','Fifteen ','Sixteen ','Seventeen ','Eighteen ','Nineteen '];
  const b = ['', '', 'Twenty','Thirty','Forty','Fifty', 'Sixty','Seventy','Eighty','Ninety'];

  function inWords(n) {
    if ((n = n.toString()).length > 9) return '';
    let n_ = ('000000000' + n).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n_) return '';
    let str = '';
    str += (n_[1] != 0) ? (a[Number(n_[1])] || b[n_[1][0]] + ' ' + a[n_[1][1]]) + 'Crore ' : '';
    str += (n_[2] != 0) ? (a[Number(n_[2])] || b[n_[2][0]] + ' ' + a[n_[2][1]]) + 'Lakh ' : '';
    str += (n_[3] != 0) ? (a[Number(n_[3])] || b[n_[3][0]] + ' ' + a[n_[3][1]]) + 'Thousand ' : '';
    str += (n_[4] != 0) ? (a[Number(n_[4])] || b[n_[4][0]] + ' ' + a[n_[4][1]]) + 'Hundred ' : '';
    str += (n_[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n_[5])] || b[n_[5][0]] + ' ' + a[n_[5][1]]) : '';
    return str.trim();
  }

  const words = inWords(Math.round(num));
  return words ? `Rupees ${words} Only` : '';
}

// ========================================================
// GUEST NAME RESOLUTION & BILL UTILITIES
// ========================================================
function isDefaultGuestName(name) {
  if (!name || typeof name !== 'string') return true;
  const s = name.trim().toLowerCase();
  if (!s) return true;
  if (s === 'guest' || s === 'walk-in' || s === 'walk-in guest' || s === 'no active guest' || s === 'no guest' || s === 'anonymous') return true;
  if (/^guest\s*\(/i.test(s)) return true; // Matches "Guest (Table 01)", "Guest (Walk-in)", etc.
  if (/^table\s*\d+/i.test(s)) return true; // Matches "Table 01", etc.
  return false;
}

function cleanGuestName(name, tableNum = '') {
  if (!name || typeof name !== 'string') {
    return tableNum ? `Guest (Table ${String(tableNum).padStart(2, '0')})` : 'Walk-in Guest';
  }
  const s = name.trim();
  if (isDefaultGuestName(s)) {
    return tableNum ? `Guest (Table ${String(tableNum).padStart(2, '0')})` : 'Walk-in Guest';
  }
  return s;
}

function getActiveTableGuestName(tableNum, cafeId) {
  const cId = cafeId || (typeof cafe === 'function' ? cafe()?.id : db.cafes?.[0]?.id) || db.cafes?.[0]?.id;
  const cleanTable = String(tableNum || '').trim().padStart(2, '0');
  const tableResets = db.tableResets || {};
  const resetTime = tableResets[`${cId}_${cleanTable}`] || 0;
  const activeOrders = (db.orders || []).filter(o => 
    o.cafeId === cId && 
    String(o.table || '').padStart(2, '0') === cleanTable &&
    (o.timestamp || 0) > resetTime
  );
  const realOrder = activeOrders.find(o => o.customerName && !isDefaultGuestName(o.customerName));
  if (realOrder) return realOrder.customerName.trim();
  if (typeof state !== 'undefined' && state) {
    if (String(state.table || '').padStart(2, '0') === cleanTable && state.customerName && !isDefaultGuestName(state.customerName)) {
      return state.customerName.trim();
    }
    if (String(state.staffTable || '').padStart(2, '0') === cleanTable && state.staffCustomerName && !isDefaultGuestName(state.staffCustomerName)) {
      return state.staffCustomerName.trim();
    }
  }
  return '';
}

// ========================================================
// PRINTABLE BILL & TAX INVOICE GENERATOR
// ========================================================
function getBillData(type, targetId) {
  const c = cafe();
  let billTitle = "TAX INVOICE / DINING BILL";
  let billNumber = `INV-${Date.now().toString().slice(-6)}`;
  let dateTimeStr = new Date().toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });
  let tableNum = '01';
  let guestName = 'Walk-in Guest';
  let items = [];
  let orderBatches = [];
  let paymentStatus = 'Offline (Cash / Card / UPI)';

  if (type === 'table') {
    tableNum = String(targetId).padStart(2, '0');
    const tableResets = db.tableResets || {};
    const resetTime = tableResets[`${c.id}_${tableNum}`] || 0;
    const activeOrders = db.orders.filter(o => 
      o.cafeId === c.id && 
      String(o.table).padStart(2, '0') === tableNum &&
      (o.timestamp || 0) > resetTime
    );

    const ordersToBill = activeOrders.length > 0 ? activeOrders : db.orders.filter(o => o.cafeId === c.id && String(o.table).padStart(2, '0') === tableNum).slice(0, 3);
    
    if (ordersToBill.length > 0) {
      // Find the real customer name from any batch placed during this session
      const realNamedOrder = ordersToBill.find(ord => ord.customerName && !isDefaultGuestName(ord.customerName));
      if (realNamedOrder) {
        guestName = realNamedOrder.customerName;
      } else {
        const activeGuest = getActiveTableGuestName(tableNum, c.id);
        if (activeGuest) {
          guestName = activeGuest;
        } else if (state.table === tableNum && state.customerName && !isDefaultGuestName(state.customerName)) {
          guestName = state.customerName;
        } else if (state.staffTable === tableNum && state.staffCustomerName && !isDefaultGuestName(state.staffCustomerName)) {
          guestName = state.staffCustomerName;
        } else {
          guestName = ordersToBill[0].customerName || `Guest (Table ${tableNum})`;
        }
      }

      dateTimeStr = ordersToBill[0].date && ordersToBill[0].time ? `${ordersToBill[0].date} · ${ordersToBill[0].time}` : dateTimeStr;
      billNumber = `BILL-T${tableNum}-${ordersToBill[0].id.replace('ORD-', '')}`;
      ordersToBill.forEach(ord => {
        orderBatches.push(ord.id);
        (ord.items || []).forEach(itm => {
          items.push({ name: itm.name, qty: itm.qty || 1, price: itm.price });
        });
      });
    } else {
      const activeGuest = getActiveTableGuestName(tableNum, c.id);
      guestName = activeGuest || (state.table === tableNum && state.customerName ? state.customerName : `Guest (Table ${tableNum})`);
    }
  } else if (type === 'order') {
    const o = db.orders.find(ord => ord.id === targetId) || (state.confirmed && state.confirmed.id === targetId ? state.confirmed : null);
    if (o) {
      tableNum = String(o.table || '01').padStart(2, '0');
      if (o.customerName && !isDefaultGuestName(o.customerName)) {
        guestName = o.customerName;
      } else {
        // Look for guest name from the table's active session or siblings
        const activeGuest = getActiveTableGuestName(tableNum, c.id);
        if (activeGuest) {
          guestName = activeGuest;
        } else if (state.table === tableNum && state.customerName && !isDefaultGuestName(state.customerName)) {
          guestName = state.customerName;
        } else {
          guestName = o.customerName || `Guest (Table ${tableNum})`;
        }
      }
      billNumber = `INV-${o.id}`;
      dateTimeStr = `${o.date || 'Today'} · ${o.time || ''}`;
      orderBatches = [o.id];
      items = (o.items || []).map(i => ({ name: i.name, qty: i.qty || 1, price: i.price }));
    }
  } else if (type === 'pos') {
    const cleanTable = String(state.staffTable || '01').trim().padStart(2, '0');
    tableNum = cleanTable;
    const inputName = ($('#pos-customer-name')?.value || state.staffCustomerName || '').trim();
    const existingGuest = getActiveTableGuestName(cleanTable, c.id);
    guestName = inputName || existingGuest || (state.staffCustomerName && !isDefaultGuestName(state.staffCustomerName) ? state.staffCustomerName : `Guest (Table ${cleanTable})`);
    billNumber = `DRAFT-T${tableNum}-${Date.now().toString().slice(-4)}`;
    dateTimeStr = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
    orderBatches = ['DRAFT'];
    items = (state.staffCart || []).map(i => ({ name: i.name, qty: i.qty || 1, price: i.price }));
  }

  // Deduplicate and aggregate identical items
  const itemMap = new Map();
  items.forEach(itm => {
    const key = `${itm.name}__${itm.price}`;
    if (itemMap.has(key)) {
      itemMap.get(key).qty += (itm.qty || 1);
    } else {
      itemMap.set(key, { name: itm.name, qty: itm.qty || 1, price: itm.price });
    }
  });
  const consolidatedItems = Array.from(itemMap.values());
  const breakdown = calculateOrderBreakdown(consolidatedItems, c);

  return {
    cafe: c,
    table: tableNum,
    guestName,
    billNumber,
    dateTimeStr,
    orderBatches,
    items: consolidatedItems,
    breakdown,
    paymentStatus
  };
}

let printWindowLock = false;
function printBillWindow(billData) {
  if (!billData) return;
  if (printWindowLock) return;
  printWindowLock = true;
  setTimeout(() => { printWindowLock = false; }, 1200);

  const { cafe: c, table, guestName, billNumber, dateTimeStr, orderBatches, items, breakdown, paymentStatus } = billData;
  const win = window.open('', '_blank', 'width=460,height=800');
  if (!win) {
    printWindowLock = false;
    return alert('Please allow popups to print bills.');
  }

  const totalWords = numberToWords(breakdown.total);
  const upiId = (c.upiId || '').trim();
  const upiName = (c.upiName || c.name || '').trim();
  const isUpiActive = c.upiEnabled !== false && !!upiId;
  const billTotal = breakdown.total;
  const upiPayUrl = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(upiName || c.name)}&am=${billTotal}&cu=INR&tn=${encodeURIComponent(`Bill ${billNumber} Table ${table}`)}`;
  const upiQrImageUrl = getQrServiceUrl(upiPayUrl, 260);

  win.document.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Bill — Table ${esc(table)} (${billNumber})</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 24px 16px;
      font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      background: #f4efe9;
      color: #1a1512;
      display: flex;
      justify-content: center;
    }
    .thermal-bill {
      width: 380px;
      background: #fff;
      padding: 28px 24px;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
      font-size: 13px;
      line-height: 1.4;
    }
    .bill-header {
      text-align: center;
      border-bottom: 2px dashed #d5c8b8;
      padding-bottom: 16px;
      margin-bottom: 16px;
    }
    .brand-title {
      font-family: 'Playfair Display', serif;
      font-size: 22px;
      font-weight: 700;
      color: #281811;
      margin: 0 0 4px;
    }
    .cafe-meta {
      font-size: 11.5px;
      color: #6a584c;
      margin: 2px 0;
    }
    .tax-badge {
      display: inline-block;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      background: #281811;
      color: #fff;
      padding: 3px 12px;
      border-radius: 12px;
      margin-top: 8px;
    }
    .meta-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px 12px;
      font-size: 12px;
      padding-bottom: 14px;
      border-bottom: 1px dashed #d5c8b8;
      margin-bottom: 14px;
    }
    .meta-item strong {
      color: #281811;
    }
    .items-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 14px;
    }
    .items-table th {
      text-align: left;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #7a685b;
      padding-bottom: 8px;
      border-bottom: 1.5px solid #281811;
    }
    .items-table th.num, .items-table td.num {
      text-align: right;
    }
    .items-table td {
      padding: 8px 0;
      border-bottom: 1px dashed #efe5d9;
      font-size: 12.5px;
      vertical-align: top;
    }
    .item-name {
      font-weight: 600;
      color: #281811;
    }
    .charges-summary {
      border-top: 1px dashed #d5c8b8;
      padding-top: 10px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      font-size: 12.5px;
    }
    .sum-line {
      display: flex;
      justify-content: space-between;
      color: #5c4a3e;
    }
    .sum-line.charge-line {
      color: #4a3b31;
    }
    .sum-line.grand-total {
      margin-top: 8px;
      padding-top: 10px;
      border-top: 2px solid #281811;
      border-bottom: 2px solid #281811;
      padding-bottom: 10px;
      font-size: 16px;
      font-weight: 800;
      color: #1a5e37;
    }
    .words-note {
      font-size: 11px;
      font-style: italic;
      color: #7a685b;
      margin: 8px 0 14px;
      text-align: right;
    }
    .bill-footer {
      border-top: 1px dashed #d5c8b8;
      padding-top: 14px;
      text-align: center;
      font-size: 11.5px;
      color: #6a584c;
    }
    .wifi-pill {
      background: #faf6f0;
      border: 1px dashed #d5c8b8;
      border-radius: 8px;
      padding: 8px 12px;
      margin: 10px 0;
      text-align: left;
      font-size: 11px;
    }
    .upi-bill-box {
      margin: 14px 0 12px;
      padding: 12px 10px;
      background: #faf7f2;
      border: 1.5px dashed #c49a6c;
      border-radius: 10px;
      text-align: center;
    }
    .upi-bill-badge {
      display: inline-block;
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 0.8px;
      text-transform: uppercase;
      background: #281811;
      color: #fff;
      padding: 3px 12px;
      border-radius: 12px;
      margin-bottom: 6px;
    }
    .upi-qr-wrapper {
      display: flex;
      justify-content: center;
      margin: 4px 0 6px;
    }
    .upi-qr-img {
      width: 130px;
      height: 130px;
      background: #fff;
      padding: 4px;
      border: 1px solid #d5c8b8;
      border-radius: 8px;
      display: block;
    }
    .upi-vpa-text {
      font-size: 12px;
      color: #281811;
      margin: 4px 0 1px;
    }
    .upi-payee-text {
      font-size: 11px;
      color: #6a584c;
      margin: 0 0 4px;
    }
    .upi-amt-tag {
      font-size: 11.5px;
      color: #1a5e37;
      font-weight: 700;
      background: #e8f5ec;
      padding: 2px 8px;
      border-radius: 6px;
      display: inline-block;
      margin-bottom: 4px;
    }
    .upi-accepted-apps {
      font-size: 9.5px;
      font-weight: 600;
      color: #8c786a;
      letter-spacing: 0.2px;
    }
    .barcode-sim {
      font-family: 'Space Mono', monospace;
      letter-spacing: 4px;
      font-size: 13px;
      margin: 12px 0 4px;
      font-weight: 700;
    }
    .print-bar {
      margin-bottom: 16px;
      text-align: center;
    }
    .btn-print-now {
      background: #281811;
      color: #fff;
      border: none;
      padding: 10px 22px;
      font-size: 13px;
      font-weight: 700;
      border-radius: 8px;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    }
    @media print {
      body { background: #fff !important; padding: 0 !important; }
      .thermal-bill { width: 100% !important; box-shadow: none !important; padding: 12px !important; border-radius: 0 !important; }
      .no-print { display: none !important; }
    }
  </style>
</head>
<body>
  <div>
    <div class="print-bar no-print">
      <button class="btn-print-now" onclick="window.print()">🖨️ Print Bill Now</button>
    </div>
    <div class="thermal-bill">
      <header class="bill-header">
        <h1 class="brand-title">${esc(c.name)}</h1>
        <div class="cafe-meta">${esc(c.address || 'Kolkata')}</div>
        <div class="cafe-meta">Ph: ${esc(c.contact || '+91 98123 45678')}</div>
        ${c.gstin ? `<div class="cafe-meta"><strong>GSTIN:</strong> ${esc(c.gstin)}</div>` : ''}
        <div><span class="tax-badge">Tax Invoice & Bill</span></div>
      </header>

      <div class="meta-grid">
        <div class="meta-item"><span>Bill No:</span> <strong>${esc(billNumber)}</strong></div>
        <div class="meta-item"><span>Table:</span> <strong>Table ${esc(table)}</strong></div>
        <div class="meta-item"><span>Date:</span> <strong>${esc(dateTimeStr)}</strong></div>
        <div class="meta-item"><span>Guest:</span> <strong>${esc(guestName)}</strong></div>
        ${orderBatches.length ? `<div class="meta-item" style="grid-column:1/-1;"><span>Order Ref:</span> <strong>#${esc(orderBatches.join(', #'))}</strong></div>` : ''}
      </div>

      <table class="items-table">
        <thead>
          <tr>
            <th>Item</th>
            <th class="num">Qty</th>
            <th class="num">Rate</th>
            <th class="num">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${items.map(i => `
            <tr>
              <td><div class="item-name">${esc(i.name)}</div></td>
              <td class="num">${i.qty}</td>
              <td class="num">₹${i.price}</td>
              <td class="num"><strong>₹${i.qty * i.price}</strong></td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div class="charges-summary">
        <div class="sum-line">
          <span>Items Subtotal (${items.reduce((s, i) => s + i.qty, 0)} items):</span>
          <strong>₹${breakdown.subtotal}</strong>
        </div>
        ${breakdown.charges.map(ch => `
          <div class="sum-line charge-line">
            <span>${esc(ch.name)}:</span>
            <span>₹${ch.amount}</span>
          </div>
        `).join('')}
        <div class="sum-line grand-total">
          <span>GRAND TOTAL:</span>
          <strong>₹${breakdown.total}</strong>
        </div>
      </div>

      ${totalWords ? `<div class="words-note">${esc(totalWords)}</div>` : ''}

      ${isUpiActive ? `
        <div class="upi-bill-box">
          <div><span class="upi-bill-badge">⚡ Scan & Pay via UPI</span></div>
          <div class="upi-qr-wrapper">
            <img class="upi-qr-img" src="${upiQrImageUrl}" alt="UPI Payment QR">
          </div>
          <div class="upi-vpa-text">UPI ID: <strong>${esc(upiId)}</strong></div>
          ${upiName ? `<div class="upi-payee-text">Payee: <strong>${esc(upiName)}</strong></div>` : ''}
          <div><span class="upi-amt-tag">Amount to Pay: ₹${billTotal}</span></div>
          <div class="upi-accepted-apps">Scan with GPay • PhonePe • Paytm • BHIM • Any UPI App</div>
        </div>
      ` : ''}

      <footer class="bill-footer">
        <div style="font-weight:600;color:#281811;margin-bottom:6px;">Payment Mode: ${esc(paymentStatus)}</div>
        ${c.wifi ? `<div class="wifi-pill"><b>📶 Guest Wi-Fi:</b> ${esc(c.wifi.ssid)}<br><b>🔑 Password:</b> ${esc(c.wifi.password)}</div>` : ''}
        <div style="margin:10px 0 6px;">Thank you for dining at <b>${esc(c.name)}</b>!</div>
        <div>Please visit again ✨</div>
        <div class="barcode-sim">||| | |||| | |||||| || | |||</div>
      </footer>
    </div>
  </div>
  <script>
    var hasExecutedPrint = false;
    function triggerSinglePrint() {
      if (hasExecutedPrint) return;
      hasExecutedPrint = true;
      try {
        window.print();
      } catch(err) {}
    }
    window.addEventListener('load', function() {
      setTimeout(triggerSinglePrint, 350);
    });
    setTimeout(triggerSinglePrint, 700);
  </script>
</body>
</html>`);
  win.document.close();
}

// URL Parameter & Multi-Link Resolver with Tamper Detection
function parseUrlRouting() {
  const searchParams = new URLSearchParams(window.location.search);
  const hash = window.location.hash || '';
  
  // Check cafe parameter
  const cafeParam = searchParams.get('cafe') || searchParams.get('cafeId') || searchParams.get('c') || searchParams.get('id');
  // Check table parameter
  const tableParam = searchParams.get('table') || searchParams.get('t') || searchParams.get('tbl');
  // Check token parameter
  const tokenParam = searchParams.get('token') || searchParams.get('sig') || searchParams.get('k') || searchParams.get('auth');
  // Check view / role parameter
  const isLogin = searchParams.has('login') || searchParams.has('portal') || searchParams.has('admin') || hash.includes('login');

  let matchedCafe = null;
  if (cafeParam) {
    matchedCafe = db.cafes.find(c => 
      c.id.toLowerCase() === cafeParam.toLowerCase() || 
      (c.username && c.username.toLowerCase() === cafeParam.toLowerCase()) || 
      (c.slug && c.slug.toLowerCase() === cafeParam.toLowerCase())
    );
  }

  let matchedTable = null;
  let isTableVerified = false;
  let hasTamperedTable = false;

  if (tableParam) {
    let cleanTable = String(tableParam).trim();
    if (/^\d+$/.test(cleanTable)) {
      cleanTable = cleanTable.padStart(2, '0');
    }
    const targetCafe = matchedCafe || db.cafes[0];
    if (targetCafe && tokenParam && verifyTableToken(targetCafe.id, cleanTable, tokenParam)) {
      matchedTable = cleanTable;
      isTableVerified = true;
    } else {
      // Table parameter was changed/supplied manually without valid cryptographic QR token!
      hasTamperedTable = cleanTable;
      matchedTable = null;
      isTableVerified = false;
    }
  }

  return { cafeParam, matchedCafe, tableParam: matchedTable, isTableVerified, qrToken: isTableVerified ? tokenParam : null, hasTamperedTable, isLogin };
}

// Generate Canonical Signed URL for any Café and Table
function getCafeUrl(cafeId, table = null) {
  const origin = window.location.origin;
  const pathname = window.location.pathname.replace(/\/$/, '') || '';
  let url = `${origin}${pathname}?cafe=${encodeURIComponent(cafeId)}`;
  if (table) {
    const cleanTable = String(table).trim().padStart(2, '0');
    const c = db.cafes.find(x => x.id.toLowerCase() === String(cafeId).toLowerCase() || (x.slug && x.slug.toLowerCase() === String(cafeId).toLowerCase()));
    const secret = c?.qrSecret || `${cafeId}_eng_secret_key_2026`;
    const token = generateTableToken(cafeId, cleanTable, secret);
    url += `&table=${encodeURIComponent(cleanTable)}&token=${encodeURIComponent(token)}`;
  }
  return url;
}

// Session Management with 1-hour persistence & table security check
const defaultState = {
  view: 'customer',
  role: 'cafe',
  page: 'orders',
  cafeId: db.cafes[0]?.id,
  cart: [],
  customerCategory: 'All',
  selectedOrder: null,
  customerName: '',
  table: '',
  tableVerified: false,
  qrToken: null,
  tamperAttempt: null,
  tableFromQr: false,
  placedOrderIds: [],
  confirmed: null,
  orderPlacedAt: null,
  cartOpen: false,
  boatAfloat: false,
  selectedQrTable: '01',
  orderViewMode: 'tables',
  orderDateScope: 'today',
  orderStatusFilter: 'all',
  orderSearchQuery: '',
  expandedTables: {},
  // Staff POS / Take Order state
  staffCart: [],
  staffTable: '01',
  staffCustomerName: '',
  staffCustomerNotes: '',
  staffCategory: 'All',
  staffSearchQuery: '',
  // Admin & Menu Filters
  cafeSearchQuery: '',
  cafeStatusFilter: 'All statuses',
  menuSearchQuery: '',
  menuCategoryFilter: 'All categories'
};

function loadSession(){
  try {
    const raw = localStorage.getItem('juniper-session');
    if(!raw) return null;
    const session = JSON.parse(raw);
    if(session && session.timestamp && (Date.now() - session.timestamp < SESSION_DURATION_MS)){
      // Validate saved table token against cafe secret
      if(session.table && session.qrToken && session.cafeId){
        if(!verifyTableToken(session.cafeId, session.table, session.qrToken)){
          session.table = '';
          session.tableVerified = false;
          session.qrToken = null;
        }
      }
      return session;
    }
  } catch(e){}
  return null;
}

function saveSession(){
  try {
    const sessionData = {
      view: state.view,
      role: state.role,
      page: state.page,
      cafeId: state.cafeId,
      cart: state.cart || [],
      customerCategory: state.customerCategory || 'All',
      customerName: state.customerName || '',
      table: state.table || '',
      tableVerified: !!state.tableVerified,
      qrToken: state.qrToken || null,
      tamperAttempt: state.tamperAttempt || null,
      tableFromQr: !!state.tableFromQr,
      placedOrderIds: state.placedOrderIds || [],
      confirmed: state.confirmed || null,
      orderPlacedAt: state.orderPlacedAt || null,
      cartOpen: !!state.cartOpen,
      selectedQrTable: state.selectedQrTable || '01',
      // Staff POS state
      staffCart: state.staffCart || [],
      staffTable: state.staffTable || '01',
      staffCustomerName: state.staffCustomerName || '',
      staffCustomerNotes: state.staffCustomerNotes || '',
      staffCategory: state.staffCategory || 'All',
      staffSearchQuery: state.staffSearchQuery || '',
      timestamp: Date.now()
    };
    localStorage.setItem('juniper-session', JSON.stringify(sessionData));
  } catch(e){}
}

const savedSession = loadSession();
let state = savedSession ? Object.assign({}, defaultState, savedSession) : Object.assign({}, defaultState);

// Apply URL Routing - strictly lock to the scanned café and verify signed table QR
const routing = parseUrlRouting();
if (routing.matchedCafe) {
  if (state.cafeId !== routing.matchedCafe.id) {
    state.cart = []; // Reset cart if guest scanned a different cafe QR
  }
  state.cafeId = routing.matchedCafe.id;
  state.view = 'customer';
}

if (routing.isTableVerified && routing.tableParam) {
  state.table = routing.tableParam;
  state.tableVerified = true;
  state.qrToken = routing.qrToken;
  state.tableFromQr = true;
  state.tamperAttempt = null;
  state.view = 'customer';
} else if (routing.hasTamperedTable) {
  // Tampering detected: clear any table lock & warn the customer
  state.table = '';
  state.tableVerified = false;
  state.qrToken = null;
  state.tableFromQr = false;
  state.tamperAttempt = routing.hasTamperedTable;
  state.view = 'customer';
}

if (routing.isLogin) {
  state.view = 'login';
} else if (!savedSession && !routing.matchedCafe && !routing.isLogin) {
  state.view = 'customer';
}
saveSession();

// Helper to get all active table orders placed during this guest session
function getSessionOrders(){
  const cleanTbl = state.table ? String(state.table).padStart(2, '0') : '';
  const cId = state.cafeId || (db.cafes && db.cafes[0]?.id) || 'CAF-001';
  const resetTime = (cId && cleanTbl && db.tableResets) ? (db.tableResets[`${cId}_${cleanTbl}`] || 0) : 0;

  if (cleanTbl && cId && Array.isArray(db.orders)) {
    const tableOrders = db.orders.filter(o => 
      o.cafeId === cId && 
      String(o.table || '').padStart(2, '0') === cleanTbl && 
      (o.timestamp || 0) > resetTime
    );
    
    // Sort with latest order first
    tableOrders.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
    
    state.placedOrderIds = tableOrders.map(o => o.id);
    state.confirmed = tableOrders[0] || null;
    return tableOrders;
  }

  let ids = state.placedOrderIds || [];
  if (!ids.length && state.confirmed) ids = [state.confirmed.id];
  return ids.map(id => (db.orders || []).find(o => o.id === id)).filter(Boolean);
}

function getActiveOrder(){
  const orders = getSessionOrders();
  return orders[0] || state.confirmed || null;
}

const cafe = () => db.cafes.find(c => c.id === state.cafeId) || db.cafes[0];
const myMenu = () => db.menu.filter(item => item.cafeId === cafe().id);
const myOrders = () => db.orders.filter(order => order.cafeId === cafe().id);

function isOrderToday(order) {
  if (!order) return false;
  const now = new Date();
  if (order.timestamp && !isNaN(Number(order.timestamp))) {
    const d = new Date(Number(order.timestamp));
    return d.getFullYear() === now.getFullYear() &&
           d.getMonth() === now.getMonth() &&
           d.getDate() === now.getDate();
  }
  if (order.createdAt) {
    const d = new Date(order.createdAt);
    if (!isNaN(d.getTime())) {
      return d.getFullYear() === now.getFullYear() &&
             d.getMonth() === now.getMonth() &&
             d.getDate() === now.getDate();
    }
  }
  if (order.date && order.date !== 'Today') {
    const d = new Date(order.date);
    if (!isNaN(d.getTime())) {
      return d.getFullYear() === now.getFullYear() &&
             d.getMonth() === now.getMonth() &&
             d.getDate() === now.getDate();
    }
    return false;
  }
  return true;
}

function formatOrderDate(order) {
  if (!order) return 'Today';
  const now = new Date();
  if (order.timestamp && !isNaN(Number(order.timestamp))) {
    const d = new Date(Number(order.timestamp));
    if (d.getFullYear() === now.getFullYear() &&
        d.getMonth() === now.getMonth() &&
        d.getDate() === now.getDate()) {
      return 'Today';
    }
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    if (d.getFullYear() === yesterday.getFullYear() &&
        d.getMonth() === yesterday.getMonth() &&
        d.getDate() === yesterday.getDate()) {
      return 'Yesterday';
    }
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  }
  return order.date || 'Today';
}

function getTimeGreeting() {
  const hour = new Date().getHours();
  if (hour >= 4 && hour < 12) {
    return 'Good morning';
  } else if (hour >= 12 && hour < 17) {
    return 'Good afternoon';
  } else {
    return 'Good evening';
  }
}

const myTodaysOrders = () => db.orders.filter(order => order.cafeId === cafe().id && isOrderToday(order));
const clockLabel = value => new Date(`2000-01-01T${value}`).toLocaleTimeString('en-IN', {hour:'numeric', minute:'2-digit'});

let toastTimeout = null;
function toast(msg){
  const el = $('#toast');
  if(!el) return;
  clearTimeout(toastTimeout);
  el.textContent = msg;
  el.classList.add('show');
  toastTimeout = setTimeout(() => {
    el.classList.remove('show');
  }, 2200);
}

function copyToClipboard(text, message = 'Link copied to clipboard!') {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => toast(message)).catch(() => promptCopy(text));
  } else {
    promptCopy(text);
  }
}

function promptCopy(text) {
  prompt('Copy this link:', text);
}

// Shared Audio Context for instant and unblocked playback
let sharedAudioCtx = null;
function getAudioContext() {
  if (!sharedAudioCtx) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (AudioCtx) sharedAudioCtx = new AudioCtx();
  }
  if (sharedAudioCtx && sharedAudioCtx.state === 'suspended') {
    sharedAudioCtx.resume();
  }
  return sharedAudioCtx;
}

// Unlock audio on first user touch/click for mobile browsers
['click', 'touchstart', 'keydown'].forEach(evt => {
  document.addEventListener(evt, () => {
    try { getAudioContext(); } catch(e){}
  }, { once: true, passive: true });
});

// Loud, punchy "Toing!" & Cafe Bell sound synthesizer
function playToingSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();

    const now = ctx.currentTime;

    // Master Gain & Limiter/Compressor for clean loud sound
    const compressor = ctx.createDynamicsCompressor();
    compressor.threshold.setValueAtTime(-12, now);
    compressor.knee.setValueAtTime(4, now);
    compressor.ratio.setValueAtTime(12, now);
    compressor.attack.setValueAtTime(0.002, now);
    compressor.release.setValueAtTime(0.25, now);

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(1.0, now); // Loud max level
    masterGain.connect(compressor);
    compressor.connect(ctx.destination);

    // Tone 1: Springy "Toing" Pitch Bending Wave (Triangle + Sine)
    const oscToing = ctx.createOscillator();
    const gainToing = ctx.createGain();
    oscToing.type = 'triangle';
    oscToing.frequency.setValueAtTime(260, now);
    oscToing.frequency.exponentialRampToValueAtTime(880, now + 0.08); // Sharp upward 'Toing' spring
    oscToing.frequency.exponentialRampToValueAtTime(440, now + 0.32); // Resonant decay
    gainToing.gain.setValueAtTime(0.95, now);
    gainToing.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
    oscToing.connect(gainToing);
    gainToing.connect(masterGain);

    // Tone 2: Bright Crisp Chime Bell (C6 - 1046.5 Hz)
    const oscBell1 = ctx.createOscillator();
    const gainBell1 = ctx.createGain();
    oscBell1.type = 'sine';
    oscBell1.frequency.setValueAtTime(1046.5, now + 0.03);
    gainBell1.gain.setValueAtTime(0.001, now);
    gainBell1.gain.setValueAtTime(0.85, now + 0.04);
    gainBell1.gain.exponentialRampToValueAtTime(0.001, now + 0.65);
    oscBell1.connect(gainBell1);
    gainBell1.connect(masterGain);

    // Tone 3: High Resonance Harmonic (E6 - 1318.5 Hz)
    const oscBell2 = ctx.createOscillator();
    const gainBell2 = ctx.createGain();
    oscBell2.type = 'sine';
    oscBell2.frequency.setValueAtTime(1318.5, now + 0.08);
    gainBell2.gain.setValueAtTime(0.001, now);
    gainBell2.gain.setValueAtTime(0.75, now + 0.09);
    gainBell2.gain.exponentialRampToValueAtTime(0.001, now + 0.75);
    oscBell2.connect(gainBell2);
    gainBell2.connect(masterGain);

    // Play all oscillators
    oscToing.start(now);
    oscToing.stop(now + 0.45);
    oscBell1.start(now + 0.03);
    oscBell1.stop(now + 0.65);
    oscBell2.start(now + 0.08);
    oscBell2.stop(now + 0.75);
  } catch(e) {
    console.warn('Audio playback not ready:', e);
  }
}

// Alias for backwards-compatibility
function playNotificationSound() {
  playToingSound();
}

function statusClass(s){ return (s || '').toLowerCase().replace(' ', ''); }
function icon(n){ return `<i class="icon icon-${n}"></i>`; }

// Free High-Speed QR Code Generator Services with auto-fallbacks
function getQrServiceUrl(text, size = 300) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}&margin=1&color=2a1811&bgcolor=ffffff`;
}

// High-Definition QR Code Renderer (Free QR Server API + Fallbacks)
function renderQr(canvas, text, size = 180) {
  if (!canvas) return;
  canvas.width = size;
  canvas.height = size;
  canvas.dataset.qrUrl = text;
  
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, size, size);

  const img = new Image();
  img.crossOrigin = 'anonymous';

  img.onload = () => {
    ctx.clearRect(0, 0, size, size);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);
    ctx.drawImage(img, 0, 0, size, size);
  };

  img.onerror = () => {
    // Fallback 1: QuickChart QR API
    const fallback1 = new Image();
    fallback1.crossOrigin = 'anonymous';
    fallback1.onload = () => {
      ctx.clearRect(0, 0, size, size);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, size, size);
      ctx.drawImage(fallback1, 0, 0, size, size);
    };
    fallback1.onerror = () => {
      // Fallback 2: Google Chart QR API
      const fallback2 = new Image();
      fallback2.crossOrigin = 'anonymous';
      fallback2.onload = () => {
        ctx.clearRect(0, 0, size, size);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, size, size);
        ctx.drawImage(fallback2, 0, 0, size, size);
      };
      fallback2.src = `https://chart.googleapis.com/chart?chs=${size * 2}x${size * 2}&cht=qr&chl=${encodeURIComponent(text)}&choe=UTF-8`;
    };
    fallback1.src = `https://quickchart.io/qr?text=${encodeURIComponent(text)}&size=${size * 2}&margin=1&dark=2a1811&light=ffffff`;
  };

  img.src = getQrServiceUrl(text, size * 2);
}

function downloadCanvasAsPng(canvas, filename = 'qr-code.png') {
  if (!canvas) return;
  try {
    const dataUrl = canvas.toDataURL('image/png');
    if (dataUrl && dataUrl.length > 500) {
      const link = document.createElement('a');
      link.download = filename;
      link.href = dataUrl;
      link.click();
      return;
    }
  } catch(e){}

  const text = canvas.dataset?.qrUrl;
  if (text) {
    const directUrl = getQrServiceUrl(text, 600);
    const link = document.createElement('a');
    link.download = filename;
    link.href = directUrl;
    link.target = '_blank';
    link.click();
  }
}

// Full-Screen Live Camera QR Gatekeeper View for Guests
function qrGatekeeperView(){
  let c = cafe();
  let brandName = db.platform.companyName || "Eat 'N Greet";
  let brandInitial = brandName.charAt(0).toUpperCase() || 'E';

  return `
    <div class="gatekeeper-layout">
      <nav class="gatekeeper-nav">
        <div class="gatekeeper-brand">
          <span class="gatekeeper-brand-mark">${brandInitial}</span>
          <span>${esc(brandName)}</span>
        </div>
        <button class="staff-link-btn" id="go-login" title="Staff Portal">
          ${icon('key-round')} <span class="staff-label">Staff Portal</span>
        </button>
      </nav>

      <main class="gatekeeper-container">
        <div class="gatekeeper-card">
          <div class="gatekeeper-badge">${icon('camera')} Live Camera Scanner</div>
          <h1 class="gatekeeper-title">Scan Table QR Standee</h1>
          <p class="gatekeeper-subtitle">Welcome to ${esc(c.name)}. Please point your camera directly at the QR code standee on your dining table to unlock the menu.</p>

          <div class="gatekeeper-viewport-wrap">
            <div id="gatekeeper-camera-viewport"></div>
            <div class="scanner-target-frame">
              <div class="scanner-target-corners"></div>
            </div>
            <div class="scanner-laser"></div>
          </div>

          <div class="gatekeeper-status-row">
            <span class="pulse-dot"></span>
            <span id="gatekeeper-camera-status">Camera active · Looking for table QR standee...</span>
          </div>

          <div class="gatekeeper-actions">
            <button class="gatekeeper-flip-btn" id="btn-gatekeeper-flip">${icon('refresh-cw')} Switch Camera</button>
          </div>

          <div class="gatekeeper-footer-note">
            ${icon('shield-check')} <span>Physical table QR scan required to order</span>
          </div>
        </div>
      </main>
    </div>
  `;
}

let activeScanner = null;
let currentFacingMode = "environment";
let isCameraStarting = false;
let availableCameras = [];
let selectedCameraId = null;

async function initGatekeeperCamera() {
  if (isCameraStarting) return;
  isCameraStarting = true;

  if (!window.Html5Qrcode) {
    setTimeout(() => {
      isCameraStarting = false;
      initGatekeeperCamera();
    }, 200);
    return;
  }

  const statusEl = document.getElementById("gatekeeper-camera-status");

  try {
    if (activeScanner) {
      try {
        await activeScanner.stop();
        activeScanner.clear();
      } catch(e){}
      activeScanner = null;
    }

    const viewportEl = document.getElementById("gatekeeper-camera-viewport");
    if (!viewportEl) {
      isCameraStarting = false;
      return;
    }

    viewportEl.innerHTML = '';

    activeScanner = new Html5Qrcode("gatekeeper-camera-viewport", {
      verbose: false
    });

    // Query hardware cameras to select explicit device ID and avoid generic facingMode black screen bug
    try {
      availableCameras = await Html5Qrcode.getCameras();
    } catch(err) {
      console.log('Camera enumeration notice:', err);
    }

    let cameraTarget = { facingMode: currentFacingMode };

    if (availableCameras && availableCameras.length > 0) {
      let chosen = null;
      if (currentFacingMode === "environment") {
        // Find back / rear / wide / environment camera
        chosen = availableCameras.find(c => /back|rear|environment|wide|main|0/i.test(c.label)) 
              || availableCameras[availableCameras.length - 1];
      } else {
        // Find front / user / selfie camera
        chosen = availableCameras.find(c => /front|user|selfie|face/i.test(c.label)) 
              || availableCameras[0];
      }
      if (chosen && chosen.id) {
        selectedCameraId = chosen.id;
        cameraTarget = chosen.id;
      }
    }

    const qrConfig = {
      fps: 24,
      qrbox: { width: 220, height: 220 },
      aspectRatio: 1.0,
      disableFlip: currentFacingMode === "environment"
    };

    await activeScanner.start(
      cameraTarget,
      qrConfig,
      (decodedText) => {
        handleGatekeeperQrScan(decodedText);
      },
      () => {}
    );

    // Ensure video stream element is active and rendered
    const video = viewportEl.querySelector('video');
    if (video) {
      video.setAttribute('playsinline', 'true');
      video.setAttribute('webkit-playsinline', 'true');
      video.muted = true;
      video.style.width = '100%';
      video.style.height = '100%';
      video.style.objectFit = 'cover';
      if (video.paused) {
        try { await video.play(); } catch(e){}
      }
    }

    if (statusEl) {
      statusEl.innerHTML = `Camera active · Looking for table QR standee...`;
    }
  } catch (err) {
    console.warn('Gatekeeper camera start error:', err);
    // Fallback if specific device ID failed
    try {
      if (activeScanner && !activeScanner.isScanning) {
        await activeScanner.start(
          { facingMode: currentFacingMode },
          { fps: 20, qrbox: { width: 220, height: 220 } },
          (decodedText) => handleGatekeeperQrScan(decodedText),
          () => {}
        );
        isCameraStarting = false;
        return;
      }
    } catch(fallbackErr){}

    if (statusEl) {
      statusEl.innerHTML = `<span style="color:#ff8577">Camera permission required. Please allow camera access in your browser settings.</span>`;
    }
  } finally {
    isCameraStarting = false;
  }
}

function stopLiveCameraScanner() {
  if (activeScanner) {
    try {
      activeScanner.stop().catch(() => {}).finally(() => {
        try { activeScanner.clear(); } catch(e){}
        activeScanner = null;
      });
    } catch(e) {
      activeScanner = null;
    }
  }
}

function handleGatekeeperQrScan(qrContent) {
  try {
    let url = null;
    try {
      url = new URL(qrContent);
    } catch(e) {
      if (qrContent.includes('?')) {
        url = new URL(qrContent, window.location.origin);
      }
    }

    let targetCafe = cafe();
    let cleanTable = null;
    let tokenParam = null;

    if (url) {
      const searchParams = url.searchParams;
      const cafeParam = searchParams.get('cafe') || searchParams.get('cafeId') || searchParams.get('c');
      const tableParam = searchParams.get('table') || searchParams.get('t') || searchParams.get('tbl');
      tokenParam = searchParams.get('token') || searchParams.get('sig') || searchParams.get('k') || searchParams.get('auth');

      if (cafeParam) {
        targetCafe = db.cafes.find(c => c.id.toLowerCase() === cafeParam.toLowerCase() || (c.slug && c.slug.toLowerCase() === cafeParam.toLowerCase())) || targetCafe;
      }
      if (tableParam) {
        cleanTable = String(tableParam).trim();
        if (/^\d+$/.test(cleanTable)) cleanTable = cleanTable.padStart(2, '0');
      }
    }

    if (targetCafe && cleanTable && tokenParam) {
      if (verifyTableToken(targetCafe.id, cleanTable, tokenParam)) {
        stopLiveCameraScanner();
        state.cafeId = targetCafe.id;
        state.table = cleanTable;
        state.tableVerified = true;
        state.qrToken = tokenParam;
        state.tableFromQr = true;
        state.tamperAttempt = null;
        saveSession();
        playToingSound();
        toast(`✅ Verified Table ${cleanTable}! Welcome to ${targetCafe.name}.`);
        render();
        return;
      }
    }

    const statusEl = document.getElementById("gatekeeper-camera-status");
    if (statusEl) {
      statusEl.innerHTML = `<span style="color:#ffb259">⚠️ Invalid QR code. Please scan the official table standee.</span>`;
    }
  } catch(e) {
    console.warn('QR parse error:', e);
  }
}

let boatSinkTimeout = null;

function triggerBoatPopUp(durationMs = 4500) {
  clearTimeout(boatSinkTimeout);
  state.boatAfloat = true;
  const bar = document.querySelector('.mobile-cart-bar');
  const peek = document.querySelector('.boat-peek-pill');
  if (bar) {
    bar.classList.remove('boat-sinking', 'boat-sunk');
    bar.classList.add('boat-floating');
  }
  if (peek) {
    peek.classList.add('peek-hidden');
  }
  
  boatSinkTimeout = setTimeout(() => {
    sinkBoat();
  }, durationMs);
}

function sinkBoat() {
  clearTimeout(boatSinkTimeout);
  const bar = document.querySelector('.mobile-cart-bar');
  const peek = document.querySelector('.boat-peek-pill');
  if (bar && bar.classList.contains('boat-floating')) {
    bar.classList.remove('boat-floating');
    bar.classList.add('boat-sinking');
    setTimeout(() => {
      state.boatAfloat = false;
      if (bar) {
        bar.classList.remove('boat-sinking');
        bar.classList.add('boat-sunk');
      }
      if (peek) {
        peek.classList.remove('peek-hidden');
      }
    }, 700);
  } else {
    state.boatAfloat = false;
    if (bar) bar.classList.add('boat-sunk');
    if (peek) peek.classList.remove('peek-hidden');
  }
}

function render(){
  document.title = `${db.platform.companyName || "Eat 'N Greet"} — Café Console`;
  saveSession();
  const app = $('#app');
  if(!app) return;

  // Preserve window scroll position across renders when staying in the same view/page/category
  const prevView = state.view;
  const prevPage = state.page;
  const prevCategory = state.customerCategory;
  const scrollX = window.scrollX || window.pageXOffset || 0;
  const scrollY = window.scrollY || window.pageYOffset || 0;

  // Only capture focus & cursor selection position for editable input/textarea fields with an ID or name
  // This prevents buttons/steppers/cards from stealing focus and causing unwanted mobile viewport jumps/scrolling
  const activeEl = document.activeElement;
  const isTextInput = activeEl && (
    activeEl.tagName === 'TEXTAREA' ||
    (activeEl.tagName === 'INPUT' && !['button', 'submit', 'reset', 'checkbox', 'radio', 'file', 'image'].includes(activeEl.type))
  );
  let activeId = (isTextInput && activeEl.id) ? activeEl.id : null;
  let activeName = (isTextInput && !activeId && activeEl.name) ? activeEl.name : null;
  let selStart = null;
  let selEnd = null;

  if (isTextInput && ('selectionStart' in activeEl)) {
    try {
      selStart = activeEl.selectionStart;
      selEnd = activeEl.selectionEnd;
    } catch (_) {}
  }

  if (state.view === 'login') {
    stopLiveCameraScanner();
    app.innerHTML = loginView();
  } else if (state.view === 'dashboard') {
    stopLiveCameraScanner();
    app.innerHTML = dashboardView();
  } else if (state.view === 'confirmation') {
    stopLiveCameraScanner();
    app.innerHTML = confirmationView();
  } else {
    // Guest Customer Flow:
    // Strictly require verified table QR session!
    const isTableVerified = !!(state.table && state.tableVerified && state.qrToken && verifyTableToken(state.cafeId, state.table, state.qrToken));
    if (!isTableVerified) {
      state.table = '';
      state.tableVerified = false;
      state.qrToken = null;
      app.innerHTML = qrGatekeeperView();
      initGatekeeperCamera();
    } else {
      stopLiveCameraScanner();
      app.innerHTML = customerView();
    }
  }
  bind();

  if (state.view === 'customer' && state.boatAfloat) {
    clearTimeout(boatSinkTimeout);
    boatSinkTimeout = setTimeout(() => {
      sinkBoat();
    }, 4200);
  }

  // Restore scroll position when re-rendering the same view so mobile screen doesn't jump
  if (state.view === prevView && state.page === prevPage && state.customerCategory === prevCategory) {
    window.scrollTo(scrollX, scrollY);
  }

  // Restore focus and cursor selection position safely with preventScroll for active text inputs only
  if (activeId || activeName) {
    let target = activeId ? document.getElementById(activeId) : document.querySelector(`[name="${activeName.replace(/"/g, '\\"')}"]`);
    if (target && typeof target.focus === 'function') {
      try {
        target.focus({ preventScroll: true });
        if (selStart !== null && selEnd !== null && typeof target.setSelectionRange === 'function') {
          target.setSelectionRange(selStart, selEnd);
        }
      } catch (_) {}
    }
  }
}

function loginView(){
  return `<main class="auth-page"><section class="auth-visual"><div class="auth-brand">${esc(db.platform.companyName)}</div><div class="auth-quote"><h1>More than a café.<br>A daily ritual.</h1><p>Thoughtfully made coffee and food, managed with equal care.</p></div></section><section class="auth-form-side"><form class="auth-form" id="login-form"><div class="eyebrow">Welcome back</div><h2>Sign in to your space</h2><p>Access your café operations from one considered, simple place.</p><div class="role-switch"><button type="button" class="${state.role==='cafe'?'active':''}" data-role="cafe">Café portal</button><button type="button" class="${state.role==='admin'?'active':''}" data-role="admin">Admin portal</button></div><div class="field"><label>Username</label><input id="username" required placeholder="Enter your username" autocomplete="username"></div><div class="field"><label>Password</label><div class="password-wrap"><input id="password" type="password" required placeholder="Enter your password" autocomplete="current-password"><button type="button" class="show-pass" id="show-pass">${icon('eye')}</button></div></div><button class="primary login-btn" type="submit">Sign in ${icon('arrow-right')}</button><button type="button" class="customer-link" id="go-customer">Explore the guest menu instead</button></form></section></main>`;
}

const navs = {
  admin: [
    ['dashboard', 'Dashboard', 'layout-dashboard'],
    ['cafes', 'Cafés & QR Links', 'store'],
    ['accounts', 'Café Accounts', 'key-round'],
    ['settings', 'Settings', 'settings']
  ],
  cafe: [
    ['orders', 'Order Board', 'clipboard-list'],
    ['pos', 'Take Order', 'plus-circle'],
    ['dashboard', 'Dashboard', 'layout-dashboard'],
    ['menu', 'Menu', 'utensils'],
    ['categories', 'Categories', 'tags'],
    ['qr', 'QR Codes & Stands', 'qr-code'],
    ['wifi', 'Wi-Fi Settings', 'wifi'],
    ['profile', 'Café Profile', 'building-2'],
    ['settings', 'Settings', 'settings']
  ]
};

function sidebar(){
  let n = navs[state.role];
  let adminName = db.platform.adminName || 'Aarav Mehta';
  let adminInitial = adminName.charAt(0).toUpperCase() || 'A';
  let cafeInitial = (cafe().name || 'C').slice(0, 2).toUpperCase();
  return `<aside class="sidebar"><div class="brand"><span class="brand-mark">${(db.platform.companyName || 'E').charAt(0).toUpperCase()}</span> ${esc(db.platform.companyName)} <small>CONSOLE</small></div><nav class="nav-group"><div class="nav-label">${state.role==='admin'?'Administration':'Café workspace'}</div>${n.map(x=>`<button class="nav-item ${state.page===x[0]?'active':''}" data-page="${x[0]}">${icon(x[2])}<span>${x[1]}</span></button>`).join('')}</nav><div class="nav-spacer"></div><button class="nav-item" id="logout">${icon('log-out')}<span>Logout</span></button><div class="profile-chip"><span class="avatar">${state.role==='admin'?adminInitial:cafeInitial}</span><div><strong>${state.role==='admin'?esc(adminName):esc(cafe().name)}</strong><span>${state.role==='admin'?'System administrator':'Café owner'}</span></div></div></aside>`;
}

function dashboardView(){
  let adminName = db.platform.adminName || 'Aarav Mehta';
  let greetingText = state.role === 'admin' 
    ? `${getTimeGreeting()}, ${esc(adminName)}` 
    : `${getTimeGreeting()}, ${esc(cafe().name)}`;
  return `<div class="app-shell">${sidebar()}<main class="main"><header class="topbar"><div><div class="eyebrow">${greetingText}</div><h1 class="page-title">${titleForPage()}</h1></div><div class="top-actions"><span class="date-chip">${new Date().toLocaleDateString('en-IN',{weekday:'short',month:'short',day:'numeric'})}</span><button class="outline" id="header-visit-menu" title="Open Guest Menu" style="font-size:12px;padding:8px 12px;">${icon('external-link')} View Live Menu</button>${state.role==='cafe'?`<button class="primary" id="header-take-order" style="font-size:12px;padding:8px 14px;background:#3c2419;">${icon('plus-circle')} Take Order</button>`:''}${state.role==='admin'&&state.page==='cafes'?`<button class="primary" id="add-cafe">${icon('plus')} Add café</button>`:state.role==='cafe'&&state.page==='menu'?`<button class="primary" id="add-menu">${icon('plus')} Add item</button>`:''}</div></header>${pageContent()}</main></div>`;
}

function titleForPage(){
  const map = {
    dashboard: 'Dashboard',
    cafes: 'Café directory & QR links',
    accounts: 'Café accounts',
    orders: 'Order management & table board',
    pos: 'Take order for table (Counter POS)',
    menu: 'Your menu',
    categories: 'Categories',
    qr: 'QR Codes & Table Stands',
    wifi: 'Wi-Fi settings',
    profile: 'Café profile',
    settings: 'Settings'
  };
  return map[state.page] || 'Dashboard';
}

function stats(){
  let allOrders = db.orders || [];
  let isAdm = state.role === 'admin';
  if (isAdm) {
    let todayOrders = allOrders.filter(isOrderToday);
    let todaySales = todayOrders.filter(o => o.status !== 'Cancelled').reduce((a, o) => a + (Number(o.total) || 0), 0);
    let data = [
      ['store', 'Total cafés', db.cafes.length],
      ['circle-check', 'Active cafés', db.cafes.filter(c => c.status === 'Active').length],
      ['receipt-indian-rupee', 'Today’s platform sales', money(todaySales)],
      ['shopping-bag', 'Today’s total orders', todayOrders.length]
    ];
    return `<section class="grid stat-grid">${data.map(x => `<article class="stat-card"><div class="stat-icon">${icon(x[0])}</div><div class="stat-num">${x[2]}</div><div class="stat-label">${x[1]}</div></article>`).join('')}</section>`;
  } else {
    let cafeOrders = myOrders();
    let todayOrders = myTodaysOrders();
    let todaySales = todayOrders.filter(o => o.status !== 'Cancelled').reduce((a, o) => a + (Number(o.total) || 0), 0);
    let pendingCount = cafeOrders.filter(o => ['New', 'Preparing', 'Processing'].includes(o.status)).length;
    let activeTablesCount = new Set(cafeOrders.filter(o => o.status !== 'Completed' && o.status !== 'Cancelled' && o.table).map(o => String(o.table).padStart(2, '0'))).size;
    
    let data = [
      ['receipt-indian-rupee', 'Today’s sales', money(todaySales)],
      ['shopping-bag', 'Today’s orders', todayOrders.length],
      ['clock-3', 'Pending orders', pendingCount],
      ['armchair', 'Active tables', activeTablesCount]
    ];
    return `<section class="grid stat-grid">${data.map(x => `<article class="stat-card"><div class="stat-icon">${icon(x[0])}</div><div class="stat-num">${x[2]}</div><div class="stat-label">${x[1]}</div></article>`).join('')}</section>`;
  }
}

function adminSettingsPage(){
  let companyName = db.platform.companyName || "Eat 'N Greet";
  let adminName = db.platform.adminName || 'Aarav Mehta';
  let adminEmail = db.platform.adminEmail || 'aarav@eatngreet.console';
  let adminUsername = db.platform.adminUsername || 'admin';
  let adminPassword = db.platform.adminPassword || 'admin123';

  return `<div class="panel form-panel admin-settings-panel" style="max-width:740px">
    <div class="panel-head" style="margin-bottom:14px">
      <div>
        <h2 class="panel-title">System & Security Settings</h2>
        <p class="panel-sub">Manage platform branding, update administrator login credentials, and sync with Cloudflare.</p>
      </div>
      <span class="charge-pill upi" style="background:#eef7ee;color:#2e7d32;border:1px solid #c8e6c9;font-size:11px;font-weight:600;padding:5px 12px;border-radius:20px;display:inline-flex;align-items:center;gap:6px">
        <span style="width:7px;height:7px;border-radius:50%;background:#2e7d32;display:inline-block"></span> Cloudflare Synced
      </span>
    </div>

    <form id="admin-settings-form" style="margin-top:18px">
      <!-- Administrator Security & Login Credentials -->
      <div style="background:#fffcf7;border:1px solid #ebd9c8;border-radius:12px;padding:20px;margin-bottom:20px">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
          <strong style="font-size:14px;color:var(--coffee);display:inline-flex;align-items:center;gap:6px">${icon('shield')} Administrator Login Credentials</strong>
        </div>
        <p class="cell-sub" style="margin-bottom:16px;color:var(--muted);font-size:12px">Update the username and password required to sign in to the Admin Portal. Changes are applied immediately across all active sessions and stored permanently in Cloudflare cloud storage.</p>
        
        <div class="settings-grid">
          <div class="field">
            <label>Admin Username</label>
            <input name="adminUsername" id="admin-username-input" required value="${esc(adminUsername)}" placeholder="e.g. admin" autocomplete="username">
          </div>
          <div class="field">
            <label>Admin Password</label>
            <div class="password-wrap">
              <input name="adminPassword" id="admin-password-input" type="password" required value="${esc(adminPassword)}" placeholder="Enter new admin password" autocomplete="current-password">
              <button type="button" class="show-pass" id="toggle-admin-pass" title="Toggle password visibility">${icon('eye')}</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Company & Platform Profile -->
      <div style="background:#faf8f5;border:1px solid #e9e3da;border-radius:12px;padding:20px;margin-bottom:20px">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
          <strong style="font-size:14px;color:var(--ink);display:inline-flex;align-items:center;gap:6px">${icon('building-2')} Company & Platform Profile</strong>
        </div>
        <p class="cell-sub" style="margin-bottom:16px;color:var(--muted);font-size:12px">This is your company identity shown on the sign-in screen, guest menus, and staff consoles.</p>
        
        <div class="field">
          <label>Company / Brand Name</label>
          <input name="companyName" required value="${esc(companyName)}" placeholder="e.g. Eat 'N Greet">
        </div>
        <div class="settings-grid">
          <div class="field">
            <label>Administrator Full Name</label>
            <input name="adminName" required value="${esc(adminName)}" placeholder="e.g. Aarav Mehta">
          </div>
          <div class="field">
            <label>Administrator Email Address</label>
            <input name="adminEmail" type="email" required value="${esc(adminEmail)}" placeholder="e.g. admin@eatngreet.console">
          </div>
        </div>
      </div>

      <!-- Cloudflare & GitHub Deployment Notes -->
      <div style="background:#f4f7fb;border:1px solid #d4e2f4;border-radius:12px;padding:14px 18px;margin-bottom:24px;font-size:12px;color:#2c405a;line-height:1.6">
        <div style="display:flex;align-items:center;gap:7px;margin-bottom:4px;font-weight:600">
          ${icon('cloud')} Cloudflare & GitHub Deployment
        </div>
        <div>All modifications are automatically saved in real time to the Cloudflare Durable Object storage. To deploy code changes or updates, push your Git commits to GitHub (<code>origin/main</code>), which triggers Cloudflare automated deployment.</div>
      </div>

      <div>
        <button class="primary" type="submit" style="padding:12px 24px;font-size:13px;font-weight:600;display:inline-flex;align-items:center;gap:8px">
          ${icon('save')} Save Settings & Credentials
        </button>
      </div>
    </form>
  </div>`;
}

function pageContent(){
  if(state.role === 'admin'){
    if(state.page === 'cafes' || state.page === 'accounts') return cafesPage();
    if(state.page === 'settings') return adminSettingsPage();
    return adminDash();
  }
  if(state.page === 'orders') return ordersPage();
  if(state.page === 'pos') return posPage();
  if(state.page === 'menu') return menuPage();
  if(state.page === 'categories') return categoriesPage();
  if(state.page === 'qr') return qrPage();
  if(state.page === 'wifi') return wifiPage();
  if(state.page === 'profile') return profilePage();
  if(state.page === 'settings') return `<div class="panel form-panel"><h2 class="panel-title">Workspace preferences</h2><p class="panel-sub">Control how your café workspace feels and behaves.</p><div class="field" style="margin-top:22px"><label>Notification email</label><input value="${esc(cafe().email || 'hello@eatngreet.in')}"></div><button class="primary" onclick="toast('Preferences saved')">Save changes</button></div>`;
  return cafeDash();
}

function adminDash(){
  return `${stats()}<section class="grid split"><article class="panel"><div class="panel-head"><div><h2 class="panel-title">Registered Cafés & QR Scanners</h2><p class="panel-sub">Manage locations and individual QR ordering links</p></div><button class="outline" onclick="state.page='cafes';render()">View all</button></div>${db.cafes.map(c=>`<div class="order-row"><img class="cafe-logo-sm" src="${c.image}"><div><div class="order-id">${esc(c.name)}</div><div class="order-time">${c.id} · ${esc(c.address)}</div></div><div class="order-items"><button class="outline view-cafe-qr" data-cafe="${c.id}" style="padding:4px 8px;font-size:11px">${icon('qr-code')} QR & Link</button></div><strong>${db.orders.filter(o=>o.cafeId===c.id).length} orders</strong><span class="status ${statusClass(c.status)}">${c.status}</span></div>`).join('')}</article>${chart()}</section>`;
}

function cafeDash(){
  let groups = getCafeTableGroups();
  let activeGroups = groups.filter(g => g.activeOrdersCount > 0 || g.hasNew);
  let todaysRecent = myTodaysOrders().slice(0, 4);
  return `${stats()}<section class="grid split"><article class="panel"><div class="panel-head"><div><h2 class="panel-title">Active Dining Tables & Live Orders</h2><p class="panel-sub">Organized by dining tables with new item alerts</p></div><button class="outline" onclick="state.page='orders';render()">View All Tables</button></div>${activeGroups.length ? `<div class="dash-tables-list">${activeGroups.slice(0, 4).map(g => `
    <div class="dash-table-row ${g.hasNew ? 'alert-row' : ''}">
      <div class="table-badge ${g.hasNew ? 'glow-ring' : ''}">${esc(g.table)}</div>
      <div class="dash-table-main">
        <div class="dash-table-title"><strong>${esc(g.customerName)}</strong> ${g.hasNew ? `<span class="table-ring-badge animate-ring">${icon('bell-ring')} <span class="ring-pulse-dot"></span> New Order</span>` : ''}</div>
        <div class="cell-sub">${g.orders.length} ${g.orders.length === 1 ? 'order' : 'orders'} · ${g.totalItems} items · Latest ${esc(g.latestTime)}</div>
      </div>
      <div class="dash-table-total"><strong>${money(g.total)}</strong></div>
      <div class="dash-table-action">
        <button class="soft" onclick="state.page='orders';state.expandedTables['${g.table}']=true;render();">${icon('arrow-right')} View Table</button>
      </div>
    </div>
  `).join('')}</div>` : (todaysRecent.length ? `<div class="order-list">${todaysRecent.map(orderRow).join('')}</div>` : `<div class="empty" style="padding:28px 16px;">No orders placed today yet. Scan table QR codes to start dining orders.</div>`)}</article>${chart()}</section>`;
}

function chart(){
  return `<article class="panel"><div class="panel-head"><div><h2 class="panel-title">Weekly sales</h2><p class="panel-sub">This week</p></div><strong>${money(12840)}</strong></div><div class="sales-chart">${[['M',55],['T',76],['W',44],['T',88],['F',67],['S',92],['S',73]].map((x,i)=>`<div class="bar ${i===5?'active':''}" style="height:${x[1]}%"><span>${x[0]}</span></div>`).join('')}</div><div class="legend"><span><b></b> Sales performance</span><span>+12.5% vs last week</span></div></article>`;
}

function orderRow(o){
  const dateStr = formatOrderDate(o);
  const timeStr = o.time ? `${dateStr} · ${esc(o.time)}` : dateStr;
  return `<div class="order-row"><div class="table-badge">${esc(o.table || '01')}</div><div><div class="order-id">${esc(o.id)}</div><div class="order-time">Table ${esc(o.table || '01')} · ${timeStr}</div></div><div class="order-items">${(o.items || []).map(i=>`${i.qty}× ${esc(i.name)}`).join(', ')}</div><strong>${money(o.total)}</strong><span class="status ${statusClass(o.status)}">${o.status}</span></div>`;
}

function cafesPage(){
  let q = (state.cafeSearchQuery || '').toLowerCase().trim();
  let status = state.cafeStatusFilter || 'All statuses';
  let filteredCafes = db.cafes.filter(c => {
    const text = (c.name + ' ' + c.id + ' ' + (c.username || '') + ' ' + (c.address || '') + ' ' + (c.upiId || '')).toLowerCase();
    const matchQ = !q || text.includes(q);
    const matchStatus = status === 'All statuses' || c.status === status;
    return matchQ && matchStatus;
  });
  return `<section class="panel"><div class="section-bar"><div class="filter-row"><div class="search-wrap">${icon('search')}<input class="search" id="cafe-search" placeholder="Search cafes & UPI IDs" value="${esc(state.cafeSearchQuery || '')}"></div><select class="select" id="cafe-status-filter"><option ${status==='All statuses'?'selected':''}>All statuses</option><option ${status==='Active'?'selected':''}>Active</option><option ${status==='Inactive'?'selected':''}>Inactive</option></select></div><span class="panel-sub">${filteredCafes.length} registered cafés</span></div><div style="overflow:auto"><table class="table"><thead><tr><th>Café</th><th>Café ID</th><th>UPI Payment QR</th><th>Charges & Taxes</th><th>Ordering Link</th><th>QR Standees</th><th>Security Key</th><th>Status</th><th>Actions</th></tr></thead><tbody>${filteredCafes.map(c=>{
    const gstRate = c.gstRate !== undefined ? Number(c.gstRate) : 5;
    const gstEnabled = c.gstEnabled !== undefined ? !!c.gstEnabled : true;
    const scRate = c.serviceChargeRate !== undefined ? Number(c.serviceChargeRate) : 5;
    const scEnabled = c.serviceChargeEnabled !== undefined ? !!c.serviceChargeEnabled : true;
    const customCount = Array.isArray(c.customCharges) ? c.customCharges.filter(x => x && x.enabled).length : 0;
    const upiId = c.upiId || `${(c.slug || c.username || 'cafe').toLowerCase()}@upi`;
    const isUpiOn = c.upiEnabled !== false && !!c.upiId;

    return `<tr>
      <td><div style="display:flex;align-items:center;gap:11px"><img class="cafe-logo-sm" src="${c.image}"><div><div class="cell-title">${esc(c.name)}</div><div class="cell-sub">@${esc(c.username)} · ${esc(c.address)}</div></div></div></td>
      <td><b>${esc(c.id)}</b></td>
      <td>
        <div class="cafe-upi-col-cell">
          <div style="display:flex;align-items:center;gap:5px;margin-bottom:4px;">
            ${isUpiOn ? `
              <span class="charge-pill upi" title="UPI Active: ${esc(upiId)}">
                ${icon('qr-code')} ${esc(upiId)}
              </span>
            ` : `
              <span class="charge-pill off">UPI Off</span>
            `}
          </div>
          <button type="button" class="outline edit-cafe-upi" data-cafe="${c.id}" style="padding:4px 9px;font-size:11px;display:inline-flex;align-items:center;gap:4px;border-radius:6px;width:max-content;" title="Configure UPI payment QR for customer bills">
            ${icon('edit-3')} Change UPI ID
          </button>
        </div>
      </td>
      <td>
        <div class="cafe-charges-col-cell">
          <div class="charges-pills-wrap">
            ${gstEnabled && gstRate > 0 ? `<span class="charge-pill gst" title="GST ${gstRate}% active">GST ${gstRate}%</span>` : `<span class="charge-pill off">GST Off</span>`}
            ${scEnabled && scRate > 0 ? `<span class="charge-pill sc" title="Service Charge ${scRate}% active">SC ${scRate}%</span>` : `<span class="charge-pill off">SC Off</span>`}
            ${customCount > 0 ? `<span class="charge-pill custom" title="${customCount} custom add-ons active">+${customCount} custom</span>` : ''}
          </div>
          <button type="button" class="outline edit-cafe-charges" data-cafe="${c.id}" style="padding:4px 9px;font-size:11px;display:inline-flex;align-items:center;gap:4px;border-radius:6px;width:max-content;">
            ${icon('settings-2')} Edit Charges
          </button>
        </div>
      </td>
      <td><button class="outline copy-cafe-link" data-url="${getCafeUrl(c.id)}" style="padding:5px 10px;font-size:11px;">${icon('copy')} Copy Link</button></td>
      <td><button class="primary view-cafe-qr" data-cafe="${c.id}" style="padding:5px 10px;font-size:11px;">${icon('qr-code')} View QR</button></td>
      <td><button class="outline admin-rotate-key" data-cafe="${c.id}" title="Rotate cryptographic security key for ${esc(c.name)}" style="padding:5px 10px;font-size:11px;color:#8f4d0a;">${icon('refresh-cw')} Rotate Key</button></td>
      <td><button class="status ${statusClass(c.status)} status-toggle" data-cafe="${c.id}">${c.status}</button></td>
      <td><div style="display:flex;gap:6px;"><button class="outline visit-cafe-menu" data-cafe="${c.id}" title="Open guest menu" style="padding:5px 8px;font-size:11px;">${icon('external-link')}</button><button class="dots edit-cafe" data-cafe="${c.id}">${icon('ellipsis')}</button></div></td>
    </tr>`;
  }).join('')}</tbody></table></div></section>`;
}

// Table-Organized Orders Data Aggregator
function getCafeTableGroups() {
  const cId = cafe().id;
  const allOrders = myOrders();
  const tableResets = db.tableResets || {};
  
  // Find all distinct table numbers from active orders or default tables
  const tableNums = new Set();
  for (let i = 1; i <= 12; i++) tableNums.add(String(i).padStart(2, '0'));
  allOrders.forEach(o => {
    if (o.table) tableNums.add(String(o.table).padStart(2, '0'));
  });

  const groups = [];

  Array.from(tableNums).sort().forEach(tbl => {
    const resetTime = tableResets[`${cId}_${tbl}`] || 0;
    
    // Current active dining session for this table (orders placed strictly after the last table restart)
    const activeOrders = allOrders.filter(o => 
      String(o.table || '').padStart(2, '0') === tbl && 
      (o.timestamp || 0) > resetTime
    );

    // Past settled orders for this table (for historical reference)
    const pastOrders = allOrders.filter(o => 
      String(o.table || '').padStart(2, '0') === tbl && 
      (o.timestamp || 0) <= resetTime
    );

    // Orders from today only that were previously placed / settled
    const pastOrdersToday = pastOrders.filter(isOrderToday);

    // Sort active orders with latest batch first
    activeOrders.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

    if (activeOrders.length > 0) {
      let totalItems = 0;
      let hasNew = false;
      let activeOrdersCount = 0;
      const allActiveItems = [];

      activeOrders.forEach(o => {
        if (o.status === 'New' || o.isNew) hasNew = true;
        if (o.status !== 'Completed' && o.status !== 'Cancelled') {
          activeOrdersCount++;
        }
        (o.items || []).forEach(item => {
          totalItems += (item.qty || 1);
          allActiveItems.push(item);
        });
      });

      const breakdown = calculateOrderBreakdown(allActiveItems, cId);

      const hasReady = activeOrders.some(o => o.status === 'Ready');
      const hasPrep = activeOrders.some(o => o.status === 'Preparing' || o.status === 'Processing');
      
      let status = 'Completed';
      if (hasNew) status = 'New';
      else if (hasPrep) status = 'Preparing';
      else if (hasReady) status = 'Ready';
      else if (activeOrdersCount > 0) status = 'Active';

      const realNamedOrder = activeOrders.find(o => o.customerName && !isDefaultGuestName(o.customerName));
      const resolvedCustomerName = realNamedOrder 
        ? realNamedOrder.customerName 
        : (activeOrders[0]?.customerName && !isDefaultGuestName(activeOrders[0].customerName)
            ? activeOrders[0].customerName
            : (state && String(state.table).padStart(2, '0') === tbl && state.customerName && !isDefaultGuestName(state.customerName)
                ? state.customerName
                : (activeOrders[0]?.customerName || `Guest (Table ${tbl})`)));

      groups.push({
        table: tbl,
        isVacant: false,
        orders: activeOrders,
        pastOrdersCount: pastOrders.length,
        customerName: resolvedCustomerName,
        hasNew,
        totalItems,
        total: breakdown.total,
        subtotal: breakdown.subtotal,
        breakdown,
        activeOrdersCount,
        status,
        latestTime: activeOrders[0] ? (activeOrders[0].time ? `${formatOrderDate(activeOrders[0])} · ${activeOrders[0].time}` : formatOrderDate(activeOrders[0])) : 'Today',
        latestTimestamp: activeOrders[0]?.timestamp || 0,
        resetTime
      });
    } else {
      // Table is currently vacant / ready for next guest
      groups.push({
        table: tbl,
        isVacant: true,
        orders: [],
        pastOrdersCount: pastOrders.length,
        customerName: 'No active guest',
        hasNew: false,
        totalItems: 0,
        total: 0,
        subtotal: 0,
        breakdown: { subtotal: 0, charges: [], totalCharges: 0, total: 0 },
        activeOrdersCount: 0,
        status: 'Available',
        latestTime: 'Ready for guests',
        latestTimestamp: resetTime,
        lastSettledTotal: 0,
        resetTime
      });
    }
  });

  return groups.sort((a, b) => {
    if (a.hasNew && !b.hasNew) return -1;
    if (!a.hasNew && b.hasNew) return 1;
    if (!a.isVacant && b.isVacant) return -1;
    if (a.isVacant && !b.isVacant) return 1;
    return a.table.localeCompare(b.table);
  });
}

function tableSectionView(g, isExpanded) {
  if (g.isVacant) {
    return `<article class="table-order-card vacant-table ${isExpanded ? 'expanded' : ''}" data-table-card="${g.table}">
      <header class="table-card-head" data-toggle-table="${g.table}">
        <div class="table-head-left">
          <div class="table-badge-large">
            <span class="tbl-lbl">TABLE</span>
            <span class="tbl-num">${esc(g.table)}</span>
          </div>
          <div class="table-info-meta">
            <div class="table-title-row">
              <h3 class="table-guest-name" style="color:var(--muted);font-weight:600;">Table ${esc(g.table)} — Ready for Next Guest</h3>
              <span class="status status-vacant">${icon('shield-check')} Ready / Vacant</span>
            </div>
            <div class="table-sub-meta">
              <span>0 ongoing orders</span>
              <span>·</span>
              <span>Ready for dining</span>
              <span>·</span>
              <strong style="color:var(--muted)">Active Bill: ₹0</strong>
            </div>
          </div>
        </div>
        <div class="table-head-right" style="display:flex;align-items:center;gap:8px;">
          <button type="button" class="primary btn-take-order-table" data-pos-table="${esc(g.table)}" style="padding:6px 12px;font-size:11.5px;border-radius:8px;font-weight:700;">${icon('plus-circle')} Take Order</button>
          <button type="button" class="table-expand-btn" data-toggle-table="${g.table}">
            <span>${isExpanded ? 'Hide' : 'Details'}</span>
            ${icon(isExpanded ? 'chevron-up' : 'chevron-down')}
          </button>
        </div>
      </header>
      ${isExpanded ? `<div class="table-card-body">
        <div class="vacant-table-body">
          <div style="font-size:28px;margin-bottom:8px;">🛋️</div>
          <strong style="color:var(--coffee-dark);font-size:15px;">Table ${esc(g.table)} is Clean & Ready for New Customers</strong>
          <p class="panel-sub" style="margin:6px 0 14px;font-size:12px;">No ongoing orders on Table ${esc(g.table)}. When guests place an order from the table QR or staff enters an order, ongoing batches will appear here in real time.</p>
          <button type="button" class="primary btn-take-order-table" data-pos-table="${esc(g.table)}" style="font-size:12px;padding:9px 18px;border-radius:8px;font-weight:700;">${icon('plus-circle')} Take Order for Table ${esc(g.table)}</button>
        </div>
      </div>` : ''}
    </article>`;
  }

  // Active Dining Table Session (Only ongoing orders)
  const isNewTable = g.hasNew;
  const statusCls = statusClass(g.status);
  const bd = g.breakdown || calculateOrderBreakdown(g.orders.flatMap(o => o.items || []), cafe().id);

  return `<article class="table-order-card ${isNewTable ? 'has-new-alert' : ''} ${isExpanded ? 'expanded' : ''}" data-table-card="${g.table}">
    <header class="table-card-head" data-toggle-table="${g.table}">
      <div class="table-head-left">
        <div class="table-badge-large ${isNewTable ? 'glow-ring' : ''}">
          <span class="tbl-lbl">TABLE</span>
          <span class="tbl-num">${esc(g.table)}</span>
        </div>
        <div class="table-info-meta">
          <div class="table-title-row">
            <h3 class="table-guest-name">${esc(g.customerName)}</h3>
            <span class="status ${statusCls}">${esc(g.status === 'New' ? '🔔 New Order' : g.status)}</span>
            ${isNewTable ? `<span class="table-ring-badge animate-ring" title="New order placed by table">${icon('bell-ring')} <span class="ring-pulse-dot"></span> <b>New Items Added!</b></span>` : ''}
          </div>
          <div class="table-sub-meta">
            <span>${icon('clipboard-list')} ${g.orders.length} ongoing ${g.orders.length === 1 ? 'order' : 'orders'} (${g.totalItems} items)</span>
            <span>·</span>
            <span>${icon('clock-3')} Latest: ${esc(g.latestTime)}</span>
            <span>·</span>
            <strong class="table-running-total" style="color:#1b683f;font-size:13.5px;">Active Bill: ${money(g.total)}</strong>
          </div>
        </div>
      </div>
      <div class="table-head-right" style="display:flex;align-items:center;gap:8px;">
        <button type="button" class="outline btn-print-table-bill" data-print-table="${esc(g.table)}" style="padding:6px 12px;font-size:11.5px;border-radius:8px;font-weight:700;background:#fff;display:inline-flex;align-items:center;gap:4px;" title="Print Customer Bill Receipt for Table ${esc(g.table)}">
          ${icon('printer')} Print Bill
        </button>
        <button type="button" class="outline btn-add-items-table" data-pos-table="${esc(g.table)}" style="padding:6px 12px;font-size:11.5px;border-radius:8px;font-weight:700;background:#fff;">${icon('plus')} + Add Items</button>
        <button type="button" class="table-expand-btn" data-toggle-table="${g.table}">
          <span>${isExpanded ? 'Hide Details' : 'View Orders'}</span>
          ${icon(isExpanded ? 'chevron-up' : 'chevron-down')}
        </button>
      </div>
    </header>
    ${isExpanded ? `<div class="table-card-body">
      <div class="table-orders-timeline">
        ${g.orders.map((ord, idx) => {
          const ordIsNew = ord.status === 'New' || ord.isNew;
          return `<div class="table-order-batch ${ordIsNew ? 'batch-new-highlight' : ''}">
            <div class="batch-header">
              <div class="batch-title">
                <strong>Order #${esc(ord.id)}</strong>
                <span class="batch-time">${esc(ord.time ? `${formatOrderDate(ord)} · ${ord.time}` : formatOrderDate(ord))}</span>
                ${ordIsNew ? `<span class="order-ring-pill animate-ring">${icon('bell-ring')} New Batch</span>` : `<span class="batch-num-badge">Batch #${g.orders.length - idx}</span>`}
              </div>
              <div class="batch-actions" style="display:flex;align-items:center;gap:8px;">
                <button type="button" class="outline btn-print-order-bill" data-print-order="${esc(ord.id)}" style="padding:3px 8px;font-size:10.5px;font-weight:700;height:30px;background:#fff;" title="Print this specific batch receipt">${icon('printer')} Batch Slip</button>
                <select class="select order-status-select" data-order="${ord.id}" data-table="${g.table}" style="height:32px;padding:2px 28px 2px 10px;">
                  <option ${ord.status==='New'?'selected':''}>New</option>
                  <option ${ord.status==='Preparing'?'selected':''}>Preparing</option>
                  <option ${ord.status==='Ready'?'selected':''}>Ready</option>
                  <option ${ord.status==='Completed'?'selected':''}>Completed</option>
                  <option ${ord.status==='Cancelled'?'selected':''}>Cancelled</option>
                </select>
              </div>
            </div>
            <div class="batch-items-list">
              ${(ord.items || []).map(item => {
                const itemIsNew = ordIsNew || item.isNew;
                return `<div class="batch-item-row ${itemIsNew ? 'item-new-ring-row' : ''}">
                  <div class="item-details">
                    <span class="item-qty-badge">${item.qty}×</span>
                    <span class="item-name-text">${esc(item.name)}</span>
                    ${itemIsNew ? `<span class="item-ring-badge animate-ring" title="Newly added product">${icon('bell-ring')} <b>Added Product</b></span>` : ''}
                  </div>
                  <div class="item-price-col">
                    <span class="item-unit-price">${money(item.price)} each</span>
                    <strong class="item-subtotal-price">${money(item.qty * item.price)}</strong>
                  </div>
                </div>`;
              }).join('')}
            </div>
          </div>`;
        }).join('')}
      </div>
      <div class="table-bill-settlement-card">
        <div class="bill-summary-left">
          <div class="bill-title-row">
            <span class="bill-heading">${icon('receipt')} Current Guest Bill (${esc(g.customerName)})</span>
            <span class="bill-status-tag ${g.activeOrdersCount === 0 ? 'paid' : 'unpaid'}">${g.activeOrdersCount === 0 ? '✓ Orders Fulfilled' : '● Bill Pending Settlement'}</span>
          </div>
          <div class="bill-amounts-grid">
            <div class="bill-stat"><span>Subtotal:</span><b>${money(bd.subtotal)}</b></div>
            ${bd.charges.map(ch => `
              <div class="bill-stat"><span>${esc(ch.name)}:</span><b>${money(ch.amount)}</b></div>
            `).join('')}
            <div class="bill-stat grand"><span>Grand Total:</span><strong>${money(g.total)}</strong></div>
          </div>
        </div>
        <div class="bill-actions-right">
          <button type="button" class="outline btn-print-table-bill" data-print-table="${esc(g.table)}" style="font-size:12px;padding:9px 14px;border-radius:8px;font-weight:700;display:inline-flex;align-items:center;gap:6px;" title="Print official dining bill receipt">
            ${icon('printer')} Print Bill
          </button>
          <button type="button" class="outline btn-add-items-table" data-pos-table="${esc(g.table)}" style="font-size:12px;padding:9px 14px;border-radius:8px;font-weight:700;">${icon('plus-circle')} + Add Items for Table ${esc(g.table)}</button>
          ${isNewTable ? `<button type="button" class="outline btn-ack-table" data-ack-table="${g.table}">${icon('check')} Acknowledge & Start Preparing</button>` : ''}
          <button type="button" class="primary btn-complete-table" data-complete-table="${g.table}" title="Generate/print official bill and reset table for the next guest.">${icon('printer')} Complete & Restart Table (Print Bill)</button>
        </div>
      </div>
    </div>` : ''}
  </article>`;
}

function renderTableSections(filteredGroups) {
  if (!filteredGroups.length) {
    return `<div class="empty table-empty-state">
      <div style="font-size:32px;margin-bottom:8px;">🛋️</div>
      <strong>No table orders match your current filter.</strong>
      <p class="panel-sub" style="margin-top:6px;">New orders placed by guests from table QR standees or staff will automatically appear here organized by table.</p>
    </div>`;
  }
  return `<div class="table-sections-grid">
    ${filteredGroups.map(g => {
      // Auto-expand any active table or table with new orders so full menu request and items are open by default
      const isExpanded = state.expandedTables[g.table] !== undefined
        ? !!state.expandedTables[g.table]
        : (!g.isVacant);
      return tableSectionView(g, isExpanded);
    }).join('')}
  </div>`;
}

function ordersPage(){
  let dateScope = state.orderDateScope || 'today';
  let activeFilter = state.orderStatusFilter || 'all';
  let searchQuery = (state.orderSearchQuery || '').toLowerCase().trim();

  let allCafeOrders = myOrders();
  let todaysOrders = myTodaysOrders();
  let targetOrders = dateScope === 'today' ? todaysOrders : allCafeOrders;

  let groups = getCafeTableGroups();
  let totalActiveTables = groups.filter(g => !g.isVacant).length;
  let newTablesCount = groups.filter(g => g.hasNew).length;
  let vacantTablesCount = groups.filter(g => g.isVacant).length;

  let todaysCount = todaysOrders.length;
  let todaysRevenue = todaysOrders.filter(o => o.status !== 'Cancelled').reduce((sum, o) => sum + (Number(o.total) || 0), 0);
  let allCount = allCafeOrders.length;

  // Filter groups for Table Section view
  let filteredGroups = groups.filter(g => {
    if (activeFilter === 'new' && !g.hasNew) return false;
    if (activeFilter === 'active' && g.isVacant) return false;
    if (activeFilter === 'vacant' && !g.isVacant) return false;
    if (searchQuery) {
      const rawTable = String(g.table || '').toLowerCase();
      const numTable = String(parseInt(rawTable, 10) || '');
      const matchTable = rawTable.includes(searchQuery) ||
        `table ${rawTable}`.includes(searchQuery) ||
        (numTable && `table ${numTable}`.includes(searchQuery)) ||
        `t-${rawTable}`.includes(searchQuery) ||
        (numTable && `t${numTable}`.includes(searchQuery));
      const matchGuest = (g.customerName || '').toLowerCase().includes(searchQuery);
      const matchOrder = g.orders.some(o => (o.id || '').toLowerCase().includes(searchQuery) || (o.items || []).some(i => (i.name || '').toLowerCase().includes(searchQuery)));
      if (!matchTable && !matchGuest && !matchOrder) return false;
    }
    return true;
  });

  // Filter orders list for Flat List view
  let filteredOrders = targetOrders.filter(o => {
    if (activeFilter === 'new' && o.status !== 'New') return false;
    if (activeFilter === 'active' && !['New', 'Preparing', 'Processing', 'Ready'].includes(o.status)) return false;
    if (activeFilter === 'vacant') return false;
    if (searchQuery) {
      const rawTable = String(o.table || '').toLowerCase();
      const numTable = String(parseInt(rawTable, 10) || '');
      const text = `${o.id || ''} table ${rawTable} ${numTable ? `table ${numTable} t${numTable}` : ''} ${o.customerName || ''} ${(o.items || []).map(i => i.name).join(' ')}`.toLowerCase();
      if (!text.includes(searchQuery)) return false;
    }
    return true;
  });

  return `<section class="panel table-orders-panel">
    <div class="orders-management-header">
      <div class="orders-title-block">
        <h2 class="panel-title">Table Orders & Service Board</h2>
        <p class="panel-sub">Each dining table session is independently tracked with live ring alerts & offline bill settlement</p>
      </div>
      <div class="orders-header-actions" style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
        <button type="button" class="primary" id="btn-orders-take-order" style="padding:10px 18px;font-size:13px;border-radius:10px;font-weight:700;background:var(--coffee);">${icon('plus-circle')} Take Order for Table</button>
        <div class="orders-quick-metrics">
          <div class="metric-pill ${newTablesCount > 0 ? 'alert' : ''}">
            <span class="metric-icon">${icon('bell-ring')}</span>
            <span><b>${newTablesCount}</b> New Table ${newTablesCount === 1 ? 'Alert' : 'Alerts'}</span>
          </div>
          <div class="metric-pill active">
            <span class="metric-icon">${icon('armchair')}</span>
            <span><b>${totalActiveTables}</b> Active Dining</span>
          </div>
          <div class="metric-pill">
            <span class="metric-icon">${icon('receipt')}</span>
            <span><b>${todaysCount}</b> ${todaysCount === 1 ? 'Order' : 'Orders'} Today</span>
          </div>
          <div class="metric-pill">
            <span class="metric-icon">${icon('receipt-indian-rupee')}</span>
            <span><b>${money(todaysRevenue)}</b> Today's Sales</span>
          </div>
          <div class="metric-pill">
            <span class="metric-icon">${icon('shield-check')}</span>
            <span><b>${vacantTablesCount}</b> Ready / Vacant</span>
          </div>
        </div>
      </div>
    </div>
    <div class="section-bar orders-filter-bar">
      <div class="filter-row" style="gap:12px;align-items:center;">
        <div class="search-wrap">
          ${icon('search')}
          <input class="search" id="order-search-input" placeholder="Search table, guest, item or Order ID..." value="${esc(state.orderSearchQuery || '')}">
        </div>
        <div class="date-scope-pills">
          <button type="button" class="date-scope-btn ${dateScope === 'today' ? 'active' : ''}" data-date-scope="today">
            ${icon('calendar')} Today's Orders (${todaysCount})
          </button>
          <button type="button" class="date-scope-btn ${dateScope === 'all' ? 'active' : ''}" data-date-scope="all">
            ${icon('history')} All Time (${allCount})
          </button>
        </div>
        <div class="filter-tabs-pills">
          <button type="button" class="filter-tab-pill ${activeFilter === 'all' ? 'active' : ''}" data-filter-tab="all">All (${state.orderViewMode === 'list' ? filteredOrders.length : groups.length})</button>
          <button type="button" class="filter-tab-pill ${activeFilter === 'new' ? 'active' : ''} ${newTablesCount > 0 ? 'has-badge' : ''}" data-filter-tab="new">${icon('bell-ring')} Needs Action (${newTablesCount})</button>
          <button type="button" class="filter-tab-pill ${activeFilter === 'active' ? 'active' : ''}" data-filter-tab="active">Active Dining (${totalActiveTables})</button>
          <button type="button" class="filter-tab-pill ${activeFilter === 'vacant' ? 'active' : ''}" data-filter-tab="vacant">Ready / Vacant (${vacantTablesCount})</button>
        </div>
      </div>
      <div class="view-mode-toggle">
        <button type="button" class="outline ${state.orderViewMode !== 'list' ? 'active' : ''}" id="view-mode-tables" title="Organized Table View">${icon('layout-grid')} Table Sections</button>
        <button type="button" class="outline ${state.orderViewMode === 'list' ? 'active' : ''}" id="view-mode-list" title="Flat List View">${icon('list')} Orders List</button>
      </div>
    </div>
    <div id="orders-content-container">
      ${state.orderViewMode === 'list' ? ordersTable(filteredOrders) : renderTableSections(filteredGroups)}
    </div>
  </section>`;
}

function restartTableOrder(tableNum) {
  const cleanTbl = String(tableNum).padStart(2, '0');
  const cId = cafe().id;
  const currentResetTime = (db.tableResets && db.tableResets[`${cId}_${cleanTbl}`]) || 0;
  
  // 1. Gather all active orders for this dining table session
  const tableOrders = db.orders.filter(o => 
    o.cafeId === cId && 
    String(o.table).padStart(2, '0') === cleanTbl &&
    (o.timestamp || 0) > currentResetTime
  );

  // 2. ALWAYS retrieve and print the official dining bill receipt BEFORE resetting the table
  const billData = getBillData('table', cleanTbl);
  if (billData && billData.items && billData.items.length > 0) {
    printBillWindow(billData);
  }
  
  const now = Date.now();
  tableOrders.forEach(o => {
    o.status = 'Completed';
    o.isNew = false;
    o.completedAt = now;
    o.settledAt = now;
    o.paymentType = 'Offline (Paid at counter)';
    if (Array.isArray(o.items)) {
      o.items.forEach(i => i.isNew = false);
    }
  });

  db.tableResets = db.tableResets || {};
  db.tableResets[`${cId}_${cleanTbl}`] = now;

  if (state.cafeId === cId && String(state.table).padStart(2, '0') === cleanTbl) {
    state.placedOrderIds = [];
    state.confirmed = null;
    state.cart = [];
    state.customerName = '';
  }

  if (String(state.staffTable || '').padStart(2, '0') === cleanTbl) {
    state.staffCustomerName = '';
    state.staffCustomerNotes = '';
  }

  saveSession();
  save();
  playNotificationSound();
  toast(`🖨️ Bill printed & Table ${cleanTbl} successfully restarted for next guest!`);
  render();
}

function acknowledgeTableOrders(tableNum) {
  const cleanTbl = String(tableNum).padStart(2, '0');
  const cId = cafe().id;
  const tableOrders = db.orders.filter(o => o.cafeId === cId && String(o.table).padStart(2, '0') === cleanTbl);
  tableOrders.forEach(o => {
    if (o.status === 'New') o.status = 'Preparing';
    o.isNew = false;
    if (Array.isArray(o.items)) {
      o.items.forEach(i => i.isNew = false);
    }
  });
  save();
  toast(`Table ${cleanTbl} orders acknowledged & marked as Preparing`);
  render();
}

function ordersTable(data){
  const c = cafe();
  return `<div style="overflow:auto"><table class="table"><thead><tr><th>Order</th><th>Table</th><th>Date & Time</th><th>Items</th><th>Charges Breakdown</th><th>Total</th><th>Status</th><th>Print / Actions</th></tr></thead><tbody>${data.length?data.map(o=>{
    const bd = calculateOrderBreakdown(o.items || [], o.cafeId || c.id);
    const dateStr = formatOrderDate(o);
    return `<tr>
      <td><div class="cell-title">${esc(o.id)}</div><div class="cell-sub">${esc(o.customerName || 'Walk-in')}</div></td>
      <td><div class="table-badge">${esc(o.table || '01')}</div></td>
      <td><div class="cell-title" style="font-size:12px;font-weight:600;">${esc(dateStr)}</div><div class="cell-sub">${esc(o.time || '')}</div></td>
      <td>${(o.items || []).map(i=>`<div class="cell-sub">${i.qty}× ${esc(i.name)} (${money(i.price)})</div>`).join('')}</td>
      <td>
        <div style="font-size:11.5px;display:flex;flex-direction:column;gap:2px;">
          <span style="color:var(--muted);">Subtotal: <b>${money(bd.subtotal)}</b></span>
          ${bd.charges.map(ch => `<span style="color:#6a584c;">${esc(ch.name)}: <b>${money(ch.amount)}</b></span>`).join('')}
        </div>
      </td>
      <td class="cell-title" style="color:#1b683f;font-weight:800;">${money(o.total || bd.total)}</td>
      <td>
        <select class="select order-status-select" data-order="${o.id}" style="height:34px">
          <option ${o.status==='New'?'selected':''}>New</option>
          <option ${o.status==='Preparing'?'selected':''}>Preparing</option>
          <option ${o.status==='Ready'?'selected':''}>Ready</option>
          <option ${o.status==='Completed'?'selected':''}>Completed</option>
          <option ${o.status==='Cancelled'?'selected':''}>Cancelled</option>
        </select>
      </td>
      <td>
        <div style="display:flex;gap:6px;">
          <button type="button" class="outline btn-print-order-bill" data-print-order="${esc(o.id)}" style="padding:6px 10px;font-size:11px;font-weight:700;display:inline-flex;align-items:center;gap:4px;" title="Print Bill Receipt for Order #${esc(o.id)}">
            ${icon('printer')} Print Bill
          </button>
        </div>
      </td>
    </tr>`;
  }).join(''):`<tr><td colspan="8"><div class="empty">No orders match those filters.</div></td></tr>`}</tbody></table></div>`;
}

// ========================================================
// CAFÉ PORTAL — TAKE ORDER / COUNTER POS SYSTEM
// ========================================================
function syncStaffFormState() {
  const domName = $('#pos-customer-name')?.value;
  if (domName !== undefined && domName !== null) {
    state.staffCustomerName = domName.trim();
  }
  const domNotes = $('#pos-customer-notes')?.value;
  if (domNotes !== undefined && domNotes !== null) {
    state.staffCustomerNotes = domNotes.trim();
  }
}

function addStaffCartItem(menuId) {
  syncStaffFormState();
  const item = myMenu().find(m => m.id === menuId);
  if (!item) return;
  state.staffCart = state.staffCart || [];
  const existing = state.staffCart.find(x => x.id === menuId);
  if (existing) {
    existing.qty += 1;
  } else {
    state.staffCart.push({ id: item.id, name: item.name, price: item.price, image: item.image, qty: 1, category: item.category, veg: item.veg });
  }
  saveSession();
  render();
  toast(`Added ${item.name} to Table ${state.staffTable || '01'} order`);
}

function changeStaffCartQty(menuId, change) {
  syncStaffFormState();
  state.staffCart = state.staffCart || [];
  const existing = state.staffCart.find(x => x.id === menuId);
  if (existing) {
    existing.qty += change;
    if (existing.qty <= 0) {
      state.staffCart = state.staffCart.filter(x => x.id !== menuId);
    }
    saveSession();
    render();
  }
}

function removeStaffCartItem(menuId) {
  syncStaffFormState();
  state.staffCart = (state.staffCart || []).filter(x => x.id !== menuId);
  saveSession();
  render();
}

function clearStaffCart() {
  if (state.staffCart && state.staffCart.length > 0) {
    if (confirm('Clear current order draft?')) {
      state.staffCart = [];
      state.staffCustomerName = '';
      state.staffCustomerNotes = '';
      saveSession();
      render();
      toast('Order draft cleared');
    }
  }
}

async function placeStaffOrder() {
  const cleanTable = String(state.staffTable || '01').trim().padStart(2, '0');
  if (!cleanTable || cleanTable === '00') {
    return toast('⚠️ Please select or enter a valid table number');
  }
  if (!state.staffCart || !state.staffCart.length) {
    return toast('⚠️ Please add at least one menu item to the order');
  }

  const domName = ($('#pos-customer-name')?.value || '').trim();
  const sessionName = (state.staffCustomerName || '').trim();
  const existingTableGuest = getActiveTableGuestName(cleanTable, cafe().id);
  
  // Prioritize directly typed guest name, then session name, then existing table session guest, then default
  const customerName = domName || sessionName || existingTableGuest || `Guest (Table ${cleanTable})`;
  const notes = ($('#pos-customer-notes')?.value || state.staffCustomerNotes || '').trim();

  state.staffCustomerName = customerName;
  saveSession();

  const items = state.staffCart.map(x => {
    const m = myMenu().find(item => item.id === x.id);
    return {
      name: m ? m.name : x.name,
      qty: x.qty,
      price: m ? m.price : x.price,
      isNew: true,
      notes: notes || undefined
    };
  });

  const breakdown = calculateOrderBreakdown(items, cafe().id);
  const id = `ORD-${Math.max(1000, ...db.orders.map(o => +o.id.split('-')[1] || 0)) + 1}`;

  const o = {
    id,
    cafeId: cafe().id,
    customerName: customerName,
    notes: notes || undefined,
    table: cleanTable,
    qrVerified: true,
    isStaffCreated: true,
    items,
    subtotal: breakdown.subtotal,
    charges: breakdown.charges,
    tax: breakdown.tax,
    total: breakdown.total,
    status: 'New',
    isNew: true,
    time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    date: 'Today',
    timestamp: Date.now()
  };

  db.orders.unshift(o);
  save(true);
  playToingSound();

  // Try pushing to /api/orders
  try {
    fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...o,
        cafeName: cafe().name,
        subtotal: breakdown.subtotal,
        tax: breakdown.tax,
        createdAt: new Date().toLocaleString('en-IN')
      })
    }).catch(() => {});
  } catch (error) {}

  // Reset staff cart and draft notes (keep staffCustomerName set for this table session)
  state.staffCart = [];
  state.staffCustomerNotes = '';
  state.staffSearchQuery = '';

  // Expand table in Order Management board so staff sees it open immediately
  state.expandedTables[cleanTable] = true;
  state.page = 'orders';
  render();

  toast(`✨ Order #${o.id} placed for ${customerName} (Table ${cleanTable}) & sent to Order Management!`);
}

function posPage() {
  const c = cafe();
  const menu = myMenu();
  const cats = ['All', ...categories()];
  const currentTable = String(state.staffTable || '01').padStart(2, '0');
  const staffCart = state.staffCart || [];
  const activeCategory = state.staffCategory || 'All';
  const searchQuery = (state.staffSearchQuery || '').toLowerCase().trim();

  // Get table status lookup for all tables (01 to 15)
  const groups = getCafeTableGroups();
  const groupMap = new Map();
  groups.forEach(g => groupMap.set(g.table, g));

  const sampleTables = Array.from({ length: 15 }, (_, i) => String(i + 1).padStart(2, '0'));

  // Calculate cart totals with dynamic café charges
  const breakdown = calculateOrderBreakdown(staffCart, c);
  const totalItemsCount = staffCart.reduce((sum, item) => sum + item.qty, 0);

  // Filter menu items
  const filteredMenu = menu.filter(m => {
    const matchCat = activeCategory === 'All' || m.category === activeCategory;
    const matchSearch = !searchQuery || (m.name + ' ' + m.category + ' ' + (m.description || '')).toLowerCase().includes(searchQuery);
    return matchCat && matchSearch;
  });

  const currentTableGroup = groupMap.get(currentTable);
  const isTableCurrentlyActive = currentTableGroup && !currentTableGroup.isVacant;

  return `<div class="pos-screen-layout">
    <div class="pos-main-column">
      <!-- 1. Table & Guest Selector Section -->
      <section class="panel pos-table-control-card">
        <div class="pos-card-head">
          <div>
            <h2 class="panel-title">${icon('utensils')} 1. Select Dining Table & Customer</h2>
            <p class="panel-sub">Choose table to associate with this order or add to an ongoing table bill</p>
          </div>
          <div class="pos-table-badge-preview">
            <span class="tbl-chip-label">ORDERING FOR</span>
            <strong class="tbl-chip-num">TABLE ${esc(currentTable)}</strong>
          </div>
        </div>

        <div class="pos-table-selector-row">
          <div class="pos-tables-chips-container">
            ${sampleTables.map(t => {
              const grp = groupMap.get(t);
              const isOccupied = grp && !grp.isVacant;
              const hasAlert = grp && grp.hasNew;
              return `<button type="button" class="pos-tbl-chip ${t === currentTable ? 'active' : ''} ${isOccupied ? 'occupied' : 'vacant'}" data-staff-select-table="${t}">
                <span class="chip-status-dot ${hasAlert ? 'pulse' : isOccupied ? 'occupied' : 'vacant'}"></span>
                <span class="chip-name">T-${t}</span>
                <small class="chip-meta">${isOccupied ? `${grp.orders.length} ord (${money(grp.total)})` : 'Vacant'}</small>
              </button>`;
            }).join('')}
          </div>
        </div>

        <div class="pos-guest-details-grid">
          <div class="field" style="margin-bottom:0;">
            <label>${icon('user')} Customer / Guest Name (Optional)</label>
            <input type="text" id="pos-customer-name" placeholder="e.g. Rahul Sen / Walk-in Guest" value="${esc(state.staffCustomerName !== undefined && state.staffCustomerName !== '' ? state.staffCustomerName : (getActiveTableGuestName(currentTable, c.id) || ''))}" maxlength="80">
          </div>
          <div class="field" style="margin-bottom:0;">
            <label>${icon('clipboard-list')} Table Number (Manual / Custom)</label>
            <div style="display:flex;gap:8px;">
              <input type="text" id="pos-manual-table" placeholder="e.g. 04" value="${esc(currentTable)}" maxlength="6" style="max-width:120px;">
              <button type="button" class="outline" id="pos-apply-manual-table" style="font-size:12px;padding:6px 12px;">Set Table</button>
            </div>
          </div>
          <div class="field" style="margin-bottom:0;grid-column:1 / -1;">
            <label>${icon('pencil')} Kitchen / Special Notes (Optional)</label>
            <input type="text" id="pos-customer-notes" placeholder="e.g. Less sugar, extra ice, serve pasta first" value="${esc(state.staffCustomerNotes || '')}" maxlength="120">
          </div>
        </div>

        ${isTableCurrentlyActive ? `<div class="pos-active-table-notice">
          ${icon('bell-ring')} <span>Table <b>${esc(currentTable)}</b> currently has <b>${currentTableGroup.orders.length} active ${currentTableGroup.orders.length === 1 ? 'batch' : 'batches'}</b> (Running Bill: <b>${money(currentTableGroup.total)}</b>). This new order will be added to Table ${esc(currentTable)} running tab as a new batch.</span>
        </div>` : ''}
      </section>

      <!-- 2. Menu Options & Picker Section -->
      <section class="panel pos-menu-section">
        <div class="pos-menu-toolbar">
          <div class="pos-category-tabs">
            ${cats.map(cat => {
              const count = cat === 'All' ? menu.length : menu.filter(m => m.category === cat).length;
              return `<button type="button" class="pos-cat-btn ${activeCategory === cat ? 'active' : ''}" data-staff-cat="${esc(cat)}">
                <span>${esc(cat)}</span>
                <span class="cat-count-pill">${count}</span>
              </button>`;
            }).join('')}
          </div>
          <div class="search-wrap pos-search-wrap">
            ${icon('search')}
            <input type="text" class="search" id="pos-menu-search" placeholder="Search menu items..." value="${esc(state.staffSearchQuery || '')}">
          </div>
        </div>

        <div class="pos-menu-grid">
          ${filteredMenu.length ? filteredMenu.map(item => {
            const inCart = staffCart.find(x => x.id === item.id);
            return `<article class="pos-menu-item-card ${inCart ? 'in-cart' : ''}">
              <div class="pos-item-media">
                <img src="${item.image}" alt="${esc(item.name)}" loading="lazy">
                <span class="pos-item-veg-tag ${item.veg ? 'veg' : 'nonveg'}">${item.veg ? '🟢 Veg' : '🔴 Non-veg'}</span>
                ${inCart ? `<span class="pos-item-cart-qty-badge">${inCart.qty} in order</span>` : ''}
              </div>
              <div class="pos-item-body">
                <div class="pos-item-header">
                  <h4 class="pos-item-name">${esc(item.name)}</h4>
                  <span class="pos-item-price">${money(item.price)}</span>
                </div>
                <div class="pos-item-category-tag">${esc(item.category)}</div>
                <p class="pos-item-desc">${esc(item.description || '')}</p>
                <div class="pos-item-actions">
                  ${inCart ? `
                    <div class="pos-item-stepper">
                      <button type="button" class="pos-stepper-btn" data-staff-qty="${item.id}" data-change="-1">−</button>
                      <b class="pos-stepper-val">${inCart.qty}</b>
                      <button type="button" class="pos-stepper-btn" data-staff-qty="${item.id}" data-change="1">+</button>
                    </div>
                  ` : `
                    <button type="button" class="primary pos-btn-add" data-staff-add="${item.id}">
                      ${icon('plus')} Add to Order
                    </button>
                  `}
                </div>
              </div>
            </article>`;
          }).join('') : `<div class="panel empty" style="grid-column: 1 / -1; padding: 40px 20px; text-align: center;">
            <div style="font-size:28px;margin-bottom:8px;">🔍</div>
            <strong>No menu items match your filter.</strong>
            <p class="panel-sub" style="margin-top:4px;">Try searching for a different item name or select another category.</p>
          </div>`}
        </div>
      </section>
    </div>

    <!-- Right Side / Slip Column: Live Order Slip -->
    <aside class="pos-slip-column">
      <div class="panel pos-order-slip-card">
        <header class="pos-slip-header">
          <div class="pos-slip-header-title">
            <div class="pos-slip-table-tag">TABLE ${esc(currentTable)}</div>
            <div class="pos-slip-guest-info">
              <strong>${esc((state.staffCustomerName !== undefined && state.staffCustomerName !== '' ? state.staffCustomerName : (getActiveTableGuestName(currentTable, c.id) || '')) || `Walk-in Guest`)}</strong>
              <small>${totalItemsCount} ${totalItemsCount === 1 ? 'item' : 'items'} selected</small>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:6px;">
            ${staffCart.length > 0 ? `<button type="button" class="soft pos-btn-clear-cart" id="pos-btn-preview-bill" title="Print/Preview Current Slip" style="background:rgba(255,255,255,0.15);color:#fff;">${icon('printer')}</button>` : ''}
            ${staffCart.length > 0 ? `<button type="button" class="soft pos-btn-clear-cart" id="pos-btn-clear-order" title="Clear order draft">${icon('trash-2')}</button>` : ''}
          </div>
        </header>

        <div class="pos-slip-body">
          ${staffCart.length ? `
            <div class="pos-slip-items-list">
              ${staffCart.map(item => `
                <div class="pos-slip-item-row">
                  <img src="${item.image}" class="pos-slip-item-thumb" alt="${esc(item.name)}">
                  <div class="pos-slip-item-info">
                    <div class="pos-slip-item-name">${esc(item.name)}</div>
                    <div class="pos-slip-item-unit">${money(item.price)} each</div>
                    <div class="pos-slip-stepper">
                      <button type="button" class="pos-slip-step-btn" data-staff-qty="${item.id}" data-change="-1">−</button>
                      <span class="pos-slip-qty">${item.qty}</span>
                      <button type="button" class="pos-slip-step-btn" data-staff-qty="${item.id}" data-change="1">+</button>
                    </div>
                  </div>
                  <div class="pos-slip-item-right">
                    <strong class="pos-slip-item-subtotal">${money(item.qty * item.price)}</strong>
                    <button type="button" class="pos-slip-item-remove" data-staff-remove="${item.id}" title="Remove item">${icon('x')}</button>
                  </div>
                </div>
              `).join('')}
            </div>
          ` : `
            <div class="pos-slip-empty-state">
              <div class="pos-empty-icon">${icon('shopping-bag')}</div>
              <strong>Order Slip is Empty</strong>
              <p>Select items from the menu options on the left to build this table order.</p>
            </div>
          `}
        </div>

        <footer class="pos-slip-footer">
          <div class="pos-bill-summary-rows">
            <div class="pos-bill-row">
              <span>Items Subtotal (${totalItemsCount} items)</span>
              <b>${money(breakdown.subtotal)}</b>
            </div>
            ${breakdown.charges.map(ch => `
              <div class="pos-bill-row">
                <span>${esc(ch.name)}</span>
                <b>${money(ch.amount)}</b>
              </div>
            `).join('')}
            <div class="pos-bill-row total">
              <span>Grand Total</span>
              <strong class="pos-grand-total">${money(breakdown.total)}</strong>
            </div>
          </div>

          <div class="pos-slip-actions-group">
            <button type="button" class="primary pos-btn-dispatch-order" id="btn-staff-submit-order" ${staffCart.length === 0 ? 'disabled' : ''}>
              ${icon('clipboard-check')} <span>Place Order for Table ${esc(currentTable)} (${money(breakdown.total)})</span>
            </button>
            <div class="pos-dispatch-hint">
              ${icon('shield-check')} <span>Directly dispatches to Order Management table board with live kitchen tracking.</span>
            </div>
          </div>
        </footer>
      </div>
    </aside>
  </div>`;
}

function menuPage(){
  let menu = myMenu();
  let q = (state.menuSearchQuery || '').toLowerCase().trim();
  let cat = state.menuCategoryFilter || 'All categories';
  let filtered = menu.filter(m => {
    const matchSearch = !q || (m.name + ' ' + m.category + ' ' + (m.description || '')).toLowerCase().includes(q);
    const matchCat = cat === 'All categories' || m.category === cat;
    return matchSearch && matchCat;
  });
  return `<section class="section-bar"><div class="filter-row"><div class="search-wrap">${icon('search')}<input class="search" id="menu-search" placeholder="Search menu" value="${esc(state.menuSearchQuery || '')}"></div><select class="select" id="menu-filter"><option ${cat==='All categories'?'selected':''}>All categories</option>${categories().map(c=>`<option ${cat===c?'selected':''}>${esc(c)}</option>`).join('')}</select></div><span class="panel-sub">${filtered.filter(x=>x.available).length} items live</span></section><section class="grid menu-grid" id="menu-grid">${menuCards(filtered)}</section>`;
}

function menuCards(items){
  return items.length?items.map(m=>`<article class="menu-card"><img class="menu-img" src="${m.image}" alt="${esc(m.name)}"><div class="menu-info"><div style="display:flex;justify-content:space-between;gap:8px"><span class="menu-name">${esc(m.name)}</span><span class="price">${money(m.price)}</span></div><p class="menu-desc">${esc(m.description)}</p><div class="menu-bottom"><span class="availability">${m.available?'● Available':'● Unavailable'} · ${esc(m.category)}</span><button class="dots edit-menu" data-menu="${m.id}">${icon('ellipsis')}</button></div><div class="card-actions"><button class="soft edit-menu" data-menu="${m.id}">${icon('pencil')} Edit</button><button class="${m.available?'outline':'primary'} toggle-menu" data-menu="${m.id}">${m.available?'Hide':'Publish'}</button></div></div></article>`).join(''):`<div class="panel empty">No menu items match your search.</div>`;
}

function categories(){ return [...new Set(myMenu().map(m=>m.category))]; }

function categoriesPage(){
  let cats = categories(), menu = myMenu();
  return `<section class="grid settings-grid">${cats.map(c=>`<article class="panel"><div class="panel-head"><div><h2 class="panel-title">${esc(c)}</h2><p class="panel-sub">${menu.filter(m=>m.category===c).length} menu items</p></div><button class="dots category-del" data-category="${esc(c)}">${icon('trash-2')}</button></div><div class="availability">● Active category</div></article>`).join('')}</section><button class="outline" id="add-category" style="margin-top:20px">${icon('plus')} Add category</button>`;
}

// QR Code & Table Standee Studio Page
function qrPage(){
  const c = cafe();
  const mainUrl = getCafeUrl(c.id);
  const selectedTable = state.selectedQrTable || '01';
  const tableUrl = getCafeUrl(c.id, selectedTable);

  const sampleTables = Array.from({length: 15}, (_, i) => String(i + 1).padStart(2, '0'));

  return `<section class="panel"><div class="panel-head"><div><h2 class="panel-title">QR Scanner Studio & Table Standees</h2><p class="panel-sub">Generate unique, tamper-proof QR codes for ${esc(c.name)} entrance and every dining table</p></div><button class="primary" id="btn-print-batch">${icon('printer')} Print Table Standees (Batch)</button></div><div class="qr-security-banner"><div><strong>${icon('shield-check')} Cryptographic Anti-Tamper Protection Active</strong><p>Each table QR link contains a unique signed security token. Guests cannot alter the table number in the URL to order for other tables.</p></div></div><div class="qr-grid"><article class="qr-hero-card"><h3>${icon('store')} Main Café Menu QR</h3><p class="panel-sub" style="margin-top:4px">Guests scan this QR to directly access ${esc(c.name)} menu</p><div class="qr-canvas-box"><canvas id="main-qr-canvas" width="180" height="180"></canvas></div><div class="qr-url-pill"><span>${esc(mainUrl)}</span><button class="outline" id="btn-copy-main-url" style="padding:4px 8px;font-size:11px">${icon('copy')}</button></div><div class="qr-actions-row"><button class="primary" id="btn-download-main-qr">${icon('download')} Download QR (PNG)</button><button class="outline" id="btn-test-main-menu">${icon('external-link')} Test Menu</button></div></article><article class="qr-hero-card"><h3>${icon('armchair')} Table-Specific QR Scanner</h3><p class="panel-sub" style="margin-top:4px">Locks the table number with signature token for ${esc(c.name)} only</p><div style="width:100%;margin-top:14px;"><label style="font-size:11px;font-weight:700;text-transform:uppercase;color:var(--muted)">Select Table Number</label><div class="table-chips-scroll">${sampleTables.map(t => `<button class="table-chip ${t === selectedTable ? 'active' : ''}" data-select-table="${t}">Table ${t}</button>`).join('')}</div></div><div class="standee-preview-card"><div class="standee-gold-border"><div class="standee-brand">${esc(c.name)}</div><span class="standee-table-badge">TABLE ${esc(selectedTable)}</span><div class="standee-tagline">Scan with Camera to Order & Pay</div><div class="qr-canvas-box" style="margin:8px auto;padding:8px;"><canvas id="table-qr-canvas" width="150" height="150"></canvas></div><div class="standee-steps"><span>1. Scan QR</span><span>2. Pick Items</span><span>3. Order Placed</span></div><div class="standee-wifi-info"><b>${icon('wifi')} Free Wi-Fi:</b> ${esc(c.wifi.ssid)}<br><b>Password:</b> ${esc(c.wifi.password)}</div></div></div><div class="qr-url-pill"><span>${esc(tableUrl)}</span><button class="outline" id="btn-copy-table-url" style="padding:4px 8px;font-size:11px">${icon('copy')}</button></div><div class="qr-actions-row"><button class="primary" id="btn-print-single-standee">${icon('printer')} Print Table ${esc(selectedTable)} Standee</button><button class="outline" id="btn-download-table-qr">${icon('download')} Download PNG</button></div></article></div></section>`;
}

function wifiPage(){
  let w = cafe().wifi;
  return `<section class="panel form-panel"><h2 class="panel-title">Guest Wi-Fi</h2><p class="panel-sub">Shown to guests only after their order is successfully placed or on their table standees.</p><form id="wifi-form" style="margin-top:24px"><div class="field"><label>Network name / SSID</label><input name="ssid" required value="${esc(w.ssid)}"></div><div class="field"><label>Wi-Fi password</label><input name="password" required value="${esc(w.password)}"></div><button class="primary" type="submit">Save Wi-Fi details</button></form></section>`;
}

function profilePage(){
  let c = cafe();
  const gstRate = c.gstRate !== undefined ? Number(c.gstRate) : 5;
  const gstEnabled = c.gstEnabled !== undefined ? !!c.gstEnabled : true;
  const scRate = c.serviceChargeRate !== undefined ? Number(c.serviceChargeRate) : 5;
  const scEnabled = c.serviceChargeEnabled !== undefined ? !!c.serviceChargeEnabled : true;
  const gstin = c.gstin || '';
  const customCount = Array.isArray(c.customCharges) ? c.customCharges.filter(x => x && x.enabled).length : 0;

  return `<section class="panel form-panel">
    <div class="panel-head">
      <div>
        <h2 class="panel-title">Your Café Profile & Billing Settings</h2>
        <p class="panel-sub">These details belong to your café, are printed on customer bills, and presented to guests on your menu.</p>
      </div>
      <button type="button" class="outline edit-cafe-charges" data-cafe="${c.id}" style="padding:6px 12px;font-size:12px;font-weight:700;display:inline-flex;align-items:center;gap:6px;">
        ${icon('settings-2')} Advanced Charges Studio
      </button>
    </div>

    <form id="profile-form" style="margin-top:20px">
      <div class="field"><label>Guest menu café name</label><input name="name" required value="${esc(c.name)}"></div>
      <div class="field"><label>Café slug / identifier</label><input name="slug" required value="${esc(c.slug || c.username)}"></div>
      <div class="field"><label>Short description</label><textarea name="description">${esc(c.description)}</textarea></div>
      <div class="settings-grid">
        <div class="field"><label>Opens at</label><input name="opensAt" type="time" value="${c.opensAt}"></div>
        <div class="field"><label>Open until</label><input name="closesAt" type="time" value="${c.closesAt}"></div>
      </div>
      <div class="field"><label>Contact number</label><input name="contact" value="${esc(c.contact)}"></div>
      <div class="field"><label>Address</label><input name="address" required value="${esc(c.address)}"></div>

      <div class="profile-billing-section" style="margin-top:20px;padding-top:16px;border-top:1px dashed var(--line);">
        <h3 style="font-family:var(--serif);font-size:17px;color:var(--coffee-dark);margin:0 0 12px;display:flex;align-items:center;gap:8px;">
          ${icon('receipt')} Taxes & Charges on Bills
        </h3>
        
        <div class="settings-grid">
          <div class="field">
            <label>GST Rate (%)</label>
            <div style="display:flex;gap:8px;align-items:center;">
              <input name="gstRate" type="number" step="0.1" min="0" max="100" value="${gstRate}">
              <label class="toggle-control-label" style="margin:0;white-space:nowrap;font-size:11.5px;">
                <input name="gstEnabled" type="checkbox" ${gstEnabled ? 'checked' : ''}> Active
              </label>
            </div>
          </div>
          <div class="field">
            <label>Service Charge (%)</label>
            <div style="display:flex;gap:8px;align-items:center;">
              <input name="serviceChargeRate" type="number" step="0.1" min="0" max="100" value="${scRate}">
              <label class="toggle-control-label" style="margin:0;white-space:nowrap;font-size:11.5px;">
                <input name="serviceChargeEnabled" type="checkbox" ${scEnabled ? 'checked' : ''}> Active
              </label>
            </div>
          </div>
        </div>

        <div class="field">
          <label>GSTIN / Tax Registration Number</label>
          <input name="gstin" placeholder="e.g. 19AAACH7409R1ZZ" value="${esc(gstin)}">
        </div>
      </div>

      <div class="profile-billing-section" style="margin-top:20px;padding-top:16px;border-top:1px dashed var(--line);">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:12px;">
          <div>
            <h3 style="font-family:var(--serif);font-size:17px;color:var(--coffee-dark);margin:0 0 4px;display:flex;align-items:center;gap:8px;">
              ${icon('qr-code')} UPI Payment QR Code on Printed Bills
            </h3>
            <p class="panel-sub" style="margin:0;font-size:12px;">Printed directly on customer bills and receipts so guests can scan with GPay, PhonePe, Paytm or BHIM to pay offline.</p>
          </div>
          <button type="button" class="outline edit-cafe-upi" data-cafe="${c.id}" style="padding:5px 11px;font-size:11.5px;font-weight:700;display:inline-flex;align-items:center;gap:5px;white-space:nowrap;">
            ${icon('eye')} Live Bill QR Studio
          </button>
        </div>

        <div class="settings-grid">
          <div class="field">
            <label>Business UPI ID / VPA</label>
            <input name="upiId" required placeholder="e.g. eatngreet@okhdfcbank" value="${esc(c.upiId || '')}">
            <small style="font-size:11px;color:var(--muted)">Your merchant UPI address that receives bill payments.</small>
          </div>
          <div class="field">
            <label>Payee / Merchant Display Name</label>
            <input name="upiName" placeholder="e.g. Eat 'N Greet" value="${esc(c.upiName || c.name || '')}">
            <small style="font-size:11px;color:var(--muted)">Account name shown to customer in their UPI app.</small>
          </div>
        </div>

        <div class="field" style="margin-top:8px;">
          <label class="toggle-control-label" style="font-size:12.5px;font-weight:600;display:inline-flex;align-items:center;gap:8px;cursor:pointer;">
            <input name="upiEnabled" type="checkbox" ${c.upiEnabled !== false ? 'checked' : ''}> Print Scan-to-Pay UPI QR on Receipts & Bills
          </label>
        </div>
      </div>

      <div style="display:flex;justify-content:space-between;align-items:center;margin-top:20px;flex-wrap:wrap;gap:10px;">
        <button class="primary" type="submit">Save profile & charges</button>
        <button type="button" class="outline edit-cafe-charges" data-cafe="${c.id}" style="font-size:12px;padding:8px 14px;">
          ${icon('settings-2')} Configure Custom Add-on Charges (${customCount})
        </button>
      </div>
    </form>
  </section>`;
}

function customerView(){
  let c = cafe(), menu = myMenu(), cats = ['All', ...categories()];
  let locationSummary = c.address ? (c.address.split(',')[0].trim() || c.address) : 'Local Café';
  let fullAddress = c.address || 'Park Street, Kolkata';
  let cartCount = state.cart.reduce((a,i)=>a+i.qty, 0);
  let cartSubtotal = state.cart.reduce((a,x)=>{
    let itm = myMenu().find(m=>m.id===x.id);
    return a + (itm ? itm.price * x.qty : 0);
  }, 0);

  const sessionOrders = getSessionOrders();
  const latestOrder = sessionOrders[0];
  const hasReady = sessionOrders.some(o => o.status === 'Ready');
  const hasPrep = sessionOrders.some(o => o.status === 'Preparing' || o.status === 'Processing');
  const bannerStatus = hasReady ? 'Ready' : hasPrep ? 'Preparing' : (latestOrder?.status || 'New');
  const totalItemsCount = sessionOrders.reduce((sum, ord) => sum + (ord.items || []).reduce((isum, itm) => isum + itm.qty, 0), 0);
  const grandTotal = sessionOrders.reduce((sum, ord) => sum + (ord.total || 0), 0);

  const hasCart = cartCount > 0;
  const hasOrders = sessionOrders.length > 0;
  const showFloatingArea = (hasCart || hasOrders) && !state.cartOpen;

  const floatingMarkup = showFloatingArea ? `
    <aside class="mobile-cart-bar-wrap">
      <!-- Mini Peek Float Pill (Shows when boat is sunk) -->
      <button type="button" class="boat-peek-pill ${state.boatAfloat ? 'peek-hidden' : ''}" id="boat-peek-trigger" aria-label="Show Order Details" title="Tap to show order / bill summary">
        ${hasCart ? `
          <span class="peek-icon-wrap">${icon('shopping-bag')}</span>
          <span class="peek-text"><b>${cartCount}</b> ${cartCount === 1 ? 'item' : 'items'} · <b>${money(cartSubtotal)}</b></span>
          <span class="peek-arrow">${icon('chevron-up')}</span>
        ` : `
          <span class="peek-icon-wrap" style="background:#deb57b;color:#281811;">${icon('receipt')}</span>
          <span class="peek-text">Table <b>${esc(state.table)}</b> · <b>${money(grandTotal)}</b></span>
          <span class="peek-arrow">${icon('chevron-up')}</span>
        `}
      </button>

      <!-- Main Floating Boat Bar (Pop Up & Sink in water effect) -->
      <div class="mobile-cart-bar ${state.boatAfloat ? 'boat-floating' : 'boat-sunk'}" id="${hasCart ? 'floating-cart-btn' : 'floating-track-btn'}" style="${!hasCart && hasOrders ? 'background:linear-gradient(135deg, #2c1b12, #1b0f0a);border-color:#b99264;' : ''}" role="button" tabindex="0" aria-label="${hasCart ? 'View Cart and Checkout' : 'View Table Orders and Running Bill'}">
        <div class="mobile-cart-left">
          <div class="mobile-cart-badge" style="${!hasCart && hasOrders ? 'background:#deb57b;color:#281811;' : ''}">
            ${hasCart ? cartCount : sessionOrders.length}
          </div>
          <div class="mobile-cart-info">
            <div class="mobile-cart-heading">
              ${hasCart ? `${cartCount} ${cartCount === 1 ? 'item' : 'items'} in order` : `Table ${esc(state.table)} · ${totalItemsCount} items ordered`}
            </div>
            <div class="mobile-cart-total" style="${!hasCart && hasOrders ? 'color:#d5f3df;' : ''}">
              ${money(hasCart ? cartSubtotal : grandTotal)}
            </div>
          </div>
        </div>

        <div class="mobile-cart-right-group">
          <div class="mobile-cart-right">
            <span>${hasCart ? 'View Order' : 'View Bill'}</span>
            ${icon('arrow-right')}
          </div>
          <button type="button" class="boat-sink-btn" id="boat-sink-action" title="Sink down" aria-label="Minimize and sink window">
            ${icon('chevron-down')}
          </button>
        </div>
      </div>
    </aside>
  ` : '';

  return `<main class="customer"><nav class="customer-nav"><div class="customer-brand-group"><button type="button" class="customer-brand" id="customer-home"><span class="brand-title">${esc(c.name)}</span><span class="brand-sub">${icon('map-pin')} ${esc(locationSummary)}</span></button></div><div class="customer-nav-actions">${sessionOrders.length > 0 ? `<button type="button" class="outline" id="nav-btn-orders-tracker" style="padding:6px 14px;font-size:12px;border-radius:20px;font-weight:700;display:inline-flex;align-items:center;gap:6px;background:#fbf6ef;color:#704214;border-color:#d5bc9f;" title="View all ordered items and running table bill">${icon('clipboard-list')} <span>Table Orders (${sessionOrders.length}) · ${money(grandTotal)}</span></button>` : ''}<button type="button" class="outline" id="btn-switch-table" style="padding:6px 12px;font-size:12px;border-radius:20px;font-weight:600;" title="Switch Table QR">${icon('camera')} <span>Switch Table</span></button><button type="button" class="cart-trigger" id="cart-open" aria-label="Cart">${icon('shopping-bag')}<span class="cart-label">Cart</span><b class="cart-count">${cartCount}</b></button><button type="button" class="staff-link-btn" id="go-login" title="Staff Portal" aria-label="Staff Login">${icon('key-round')} <span class="staff-label">Staff</span></button></div></nav><div style="text-align:center;padding:8px 12px 0;"><span class="scanned-table-pill">${icon('shield-check')} <span>Table <b>${esc(state.table)}</b> · Active QR Session</span></span></div>${sessionOrders.length > 0 ? `<div class="active-order-banner ${statusClass(bannerStatus)}" id="active-order-bar" style="cursor:pointer;" title="Click to view all table orders and running bill"><div class="banner-info"><span class="pulse-dot"></span><div class="banner-text"><span class="banner-title">Table <b>${esc(state.table)}</b>: ${sessionOrders.length} ${sessionOrders.length === 1 ? 'Order Active' : 'Orders Active'} (${totalItemsCount} items) · Running Total: <b>${money(grandTotal)}</b></span><span class="banner-sub">${hasReady ? '🎉 Your food is ready for you!' : hasPrep ? '☕ Baristas and kitchen are preparing your items' : 'Orders received at the counter'}</span></div></div><button type="button" class="banner-btn" id="banner-track-btn"><span>Track Orders & Bill (${money(grandTotal)})</span> ${icon('arrow-right')}</button></div>` : ''}<section class="customer-hero"><div class="hero-image" style="background-image:linear-gradient(180deg,rgba(31,23,18,.25),rgba(31,23,18,.8)),url('${c.image}')"><div class="hero-content"><div class="eyebrow" style="color:#e5bd7d">A considered café experience</div><h1>${esc(c.name)}</h1><p>${esc(c.description)}</p><div class="hero-meta"><span>${icon('map-pin')} ${esc(fullAddress)}</span><span>${icon('clock-3')} Open until ${clockLabel(c.closesAt)}</span></div></div></div></section><section class="customer-content"><div class="category-tabs">${cats.map(x=>`<button type="button" class="customer-cat ${state.customerCategory===x?'active':''}" data-cat="${esc(x)}">${esc(x)}</button>`).join('')}</div><div class="menu-header"><div><h2>Made for the moment</h2><p>Choose something you’ll look forward to.</p></div><span class="panel-sub">${menu.filter(m=>m.available).length} items</span></div><div class="customer-menu">${menu.filter(m=>m.available&&(state.customerCategory==='All'||m.category===state.customerCategory)).map(m=>{
    const inCart = state.cart.find(x => x.id === m.id);
    const inCartQty = inCart ? inCart.qty : 0;
    return `<article class="customer-card ${inCartQty > 0 ? 'in-cart' : ''}">
      <div class="customer-card-media">
        <img src="${m.image}" alt="${esc(m.name)}" loading="lazy">
        ${inCartQty > 0 ? `<span class="customer-item-cart-qty-badge">${inCartQty} in cart</span>` : ''}
      </div>
      <div class="customer-card-content">
        <div class="tag">${esc(m.category)} · ${m.veg?'Vegetarian':'Non-vegetarian'}</div>
        <h3>${esc(m.name)}</h3>
        <p>${esc(m.description)}</p>
        <div class="customer-card-footer">
          <strong class="price">${money(m.price)}</strong>
          ${inCartQty > 0 ? `
            <div class="customer-item-stepper" aria-label="${esc(m.name)} quantity: ${inCartQty}">
              <button type="button" class="customer-stepper-btn" data-customer-qty="${m.id}" data-change="-1" title="Decrease quantity" aria-label="Decrease ${esc(m.name)} quantity">−</button>
              <b class="customer-stepper-val">${inCartQty}</b>
              <button type="button" class="customer-stepper-btn" data-customer-qty="${m.id}" data-change="1" title="Increase quantity" aria-label="Increase ${esc(m.name)} quantity">+</button>
            </div>
          ` : `
            <button type="button" class="add-btn" data-add="${m.id}" title="Add ${esc(m.name)} to cart" aria-label="Add ${esc(m.name)}">+</button>
          `}
        </div>
      </div>
    </article>`;
  }).join('')}</div></section>${cartDrawer()}${floatingMarkup}</main>`;
}

function cartDrawer(){
  let items = state.cart.map(x=>({...myMenu().find(m=>m.id===x.id),qty:x.qty}));
  let breakdown = calculateOrderBreakdown(items, cafe());
  const currentGuest = state.customerName || (state.table ? getActiveTableGuestName(state.table, cafe().id) : '') || '';

  return `<div class="drawer-backdrop ${state.cartOpen?'open':''}" id="cart-backdrop"></div><aside class="cart-drawer ${state.cartOpen?'open':''}"><div class="drawer-head"><h2>Your order</h2><button class="icon-btn" id="cart-close">${icon('x')}</button></div><div class="cart-items">${items.length?items.map(x=>`<div class="cart-item"><img src="${x.image}"><div><strong>${esc(x.name)}</strong><div class="cell-sub">${money(x.price)}</div><div class="qty"><button data-qty="${x.id}" data-change="-1">−</button><b>${x.qty}</b><button data-qty="${x.id}" data-change="1">+</button></div></div><button class="remove" data-remove="${x.id}">Remove</button></div>`).join(''):`<div class="empty">Your cart is waiting for something delicious.</div>`}</div>${items.length?`<div class="cart-summary"><div class="table-lock-box"><div class="table-lock-header"><span>Dining Table</span><span class="table-verified-status">${icon('shield-check')} QR Verified</span></div><div class="table-display-value"><span>Table ${esc(state.table)}</span><small style="font-size:11px;font-weight:600;color:var(--muted)">🔒 Locked to Standee</small></div></div><div class="field table-input"><label>Your name</label><input id="customer-name" maxlength="80" required placeholder="e.g. Ananya Sharma" value="${esc(currentGuest)}"></div><div class="sum-row"><span>Subtotal</span><span>${money(breakdown.subtotal)}</span></div>${breakdown.charges.map(ch => `<div class="sum-row"><span>${esc(ch.name)}</span><span>${money(ch.amount)}</span></div>`).join('')}<div class="sum-row total"><span>Grand total</span><span>${money(breakdown.total)}</span></div><button class="primary place-order" id="place-order">Place order ${icon('arrow-right')}</button></div>`:''}</aside>`;
}

function confirmationView(){
  let c = cafe();
  let locationSummary = c.address ? (c.address.split(',')[0].trim() || c.address) : 'Local Café';
  const sessionOrders = getSessionOrders();
  const latestOrder = sessionOrders[0] || state.confirmed || {};
  const status = latestOrder.status || 'New';

  const isPrep = sessionOrders.some(o => o.status === 'Preparing' || o.status === 'Processing');
  const isReady = sessionOrders.some(o => o.status === 'Ready');
  const isAllDone = sessionOrders.length > 0 && sessionOrders.every(o => o.status === 'Completed');

  // Aggregate all items across all session orders for Table XX
  const itemMap = new Map();
  let totalItemsCount = 0;

  sessionOrders.forEach(ord => {
    (ord.items || []).forEach(itm => {
      totalItemsCount += (itm.qty || 1);
      const key = `${itm.name}__${itm.price}`;
      if (itemMap.has(key)) {
        const prev = itemMap.get(key);
        itemMap.set(key, { name: itm.name, qty: prev.qty + (itm.qty || 1), price: itm.price });
      } else {
        itemMap.set(key, { name: itm.name, qty: (itm.qty || 1), price: itm.price });
      }
    });
  });
  const allOrderedItems = Array.from(itemMap.values());
  const breakdown = calculateOrderBreakdown(allOrderedItems, c);
  const grandTotal = breakdown.total;

  let statusMessage = 'We’ve sent your order straight to the kitchen & barista bar. Make yourself comfortable.';
  let statusBadgeColor = '#9a671f';
  let statusBadgeBg = '#fbf2dc';
  let statusBadgeText = 'Order received';

  if (isReady) {
    statusMessage = '🎉 Your items are ready! Please collect at the counter or enjoy table service.';
    statusBadgeColor = '#2e7a57';
    statusBadgeBg = '#e2f4ea';
    statusBadgeText = 'Ready for you';
  } else if (isPrep) {
    statusMessage = '☕ Our baristas and kitchen are actively preparing your items!';
    statusBadgeColor = '#735091';
    statusBadgeBg = '#f1eafa';
    statusBadgeText = 'Preparing now';
  } else if (isAllDone) {
    statusMessage = 'All table items fulfilled. Thank you for dining with us!';
    statusBadgeColor = '#597263';
    statusBadgeBg = '#e9f0eb';
    statusBadgeText = 'Completed';
  } else if (status === 'Cancelled') {
    statusMessage = 'This order has been cancelled. Please speak to our staff if you have questions.';
    statusBadgeColor = '#a25044';
    statusBadgeBg = '#f9e8e6';
    statusBadgeText = 'Cancelled';
  }

  if (sessionOrders.length === 0) {
    return `<main class="customer"><nav class="customer-nav"><div class="customer-brand-group"><button type="button" class="customer-brand" id="customer-home"><span class="brand-title">${esc(c.name)}</span><span class="brand-sub">${icon('map-pin')} ${esc(locationSummary)}</span></button></div><div class="customer-nav-actions"><button type="button" class="primary" id="browse-menu-btn" style="padding:6px 14px;font-size:12px;border-radius:18px;">${icon('plus')} Explore Menu</button><button type="button" class="staff-link-btn" id="go-login" title="Staff Portal">${icon('key-round')}</button></div></nav><section class="confirmation"><div class="confirm-icon" style="background:#eef3ef;color:#35714f;">${icon('circle-check')}</div><span style="font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#35714f;background:#eef3ef;padding:5px 12px;border-radius:15px;display:inline-block;margin-bottom:10px;">Table Session Reset</span><h1>Table ${esc(state.table)} Ready for New Guests</h1><p>Your previous table session has been settled offline and completed by the café. You can now browse the menu and start a new order.</p><div style="margin-top:24px;"><button type="button" class="primary" id="browse-menu-btn" style="padding:12px 24px;border-radius:12px;font-weight:700;font-size:14px;">${icon('utensils')} Open Guest Menu</button></div></section></main>`;
  }

  return `<main class="customer"><nav class="customer-nav"><div class="customer-brand-group"><button class="customer-brand" id="customer-home"><span class="brand-title">${esc(c.name)}</span><span class="brand-sub">${icon('map-pin')} ${esc(locationSummary)}</span></button></div><div class="customer-nav-actions"><button type="button" class="outline btn-print-table-bill" data-print-table="${esc(state.table)}" style="padding:6px 14px;font-size:12px;border-radius:18px;font-weight:700;background:#fff;">${icon('printer')} Print Bill</button><button class="primary" id="browse-menu-btn" style="padding:6px 14px;font-size:12px;border-radius:18px;">${icon('plus')} + Order More</button><button class="staff-link-btn" id="go-login" title="Staff Portal">${icon('key-round')}</button></div></nav><section class="confirmation"><div class="confirm-icon" style="${isReady ? 'background:#d7eee1;color:#287449;' : isPrep ? 'background:#ece1fa;color:#6b3bb8;' : ''}">${icon(isReady ? 'bell' : isPrep ? 'coffee' : 'check')}</div><span style="font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${statusBadgeColor};background:${statusBadgeBg};padding:5px 12px;border-radius:15px;display:inline-block;margin-bottom:10px;">${statusBadgeText}</span><h1>Table ${esc(state.table)} — Active Dining Orders</h1><p>${statusMessage}</p><div class="session-cumulative-card guest-total-bill-card"><div class="session-cumulative-head"><div><h3>${icon('receipt')} Table ${esc(state.table)} Running Bill & Item Summary</h3><p class="panel-sub" style="margin:4px 0 0;font-size:11.5px;color:var(--muted);">All items ordered for this table across ${sessionOrders.length} ${sessionOrders.length === 1 ? 'order batch' : 'order batches'} until bill settlement</p></div><div style="display:flex;gap:6px;align-items:center;"><button type="button" class="outline btn-print-table-bill" data-print-table="${esc(state.table)}" style="padding:4px 10px;font-size:11px;border-radius:6px;font-weight:700;background:#fff;">${icon('printer')} Print Receipt</button><span class="session-cumulative-badge">${totalItemsCount} total items</span></div></div><div class="session-order-items">${allOrderedItems.map(i => `<div class="session-item-row"><span class="session-item-name"><b class="guest-qty-pill">${i.qty}×</b> ${esc(i.name)} <small class="item-unit-pill">(${money(i.price)} ea)</small></span><strong class="session-item-price">${money(i.price * i.qty)}</strong></div>`).join('')}</div><div class="guest-bill-breakdown"><div class="guest-bill-row"><span>Items Subtotal</span><b>${money(breakdown.subtotal)}</b></div>${breakdown.charges.map(ch => `<div class="guest-bill-row"><span>${esc(ch.name)}</span><b>${money(ch.amount)}</b></div>`).join('')}<div class="session-cumulative-total"><div style="display:flex;flex-direction:column;gap:2px;"><span style="font-size:14px;color:var(--coffee-dark);">Total Table Bill (Running Total)</span><small style="font-size:11px;font-weight:600;color:var(--muted);">💳 Pay at counter / offline when finished dining</small></div><strong class="grand-total-amount">${money(grandTotal)}</strong></div></div></div><div class="session-orders-wrap"><h3 style="margin:0 0 10px;font-size:16px;font-family:var(--serif);color:var(--coffee-dark);display:flex;justify-content:space-between;align-items:center;"><span>${icon('clipboard-list')} Order Batches Placed (${sessionOrders.length})</span><span class="session-order-count-chip">${sessionOrders.length} ${sessionOrders.length === 1 ? 'Batch' : 'Batches'}</span></h3>${sessionOrders.map((ord, idx) => `<article class="session-order-card ${idx === 0 ? 'latest-batch-card' : ''}"><div class="session-order-head"><div class="session-order-id-group"><span class="session-order-id">Order #${esc(ord.id)} ${idx === 0 ? '<span class="latest-tag-badge">Latest Order</span>' : `<span class="batch-num-badge">Batch #${sessionOrders.length - idx}</span>`}</span><span class="session-order-time">${icon('clock-3')} Placed at ${esc(ord.time || 'Today')} · Table ${esc(ord.table)}</span></div><div style="display:flex;gap:6px;align-items:center;"><button type="button" class="outline btn-print-order-bill" data-print-order="${esc(ord.id)}" style="padding:2px 8px;font-size:10px;font-weight:700;border-radius:6px;background:#fff;" title="Print batch slip">${icon('printer')} Slip</button><span class="status ${statusClass(ord.status)}">${ord.status === 'Ready' ? '🎉 Ready' : ord.status === 'Preparing' ? '☕ Preparing' : ord.status}</span></div></div><div class="order-mini-tracker"><div class="tracker-step ${['New','Preparing','Processing','Ready','Completed'].includes(ord.status)?'active':''}">Received</div><div class="tracker-step ${['Preparing','Processing','Ready','Completed'].includes(ord.status)?(ord.status==='Preparing'?'preparing active':'active'):''}">Preparing</div><div class="tracker-step ${['Ready','Completed'].includes(ord.status)?(ord.status==='Ready'?'ready active':'active'):''}">Ready</div><div class="tracker-step ${ord.status==='Completed'?'active':''}">Served</div></div><div class="session-order-items">${(ord.items || []).map(i => `<div class="session-item-row"><span class="session-item-name"><b>${i.qty}×</b> ${esc(i.name)}</span><span class="session-item-price">${money(i.price * i.qty)}</span></div>`).join('')}</div><div class="session-order-subtotal"><span>Batch Amount (incl. taxes & charges)</span><strong>${money(ord.total)}</strong></div></article>`).join('')}</div><div class="wifi-box"><h3>${icon('wifi')} Café Wi-Fi</h3><div class="wifi-detail">Network: <b>${esc(c.wifi.ssid)}</b></div><div class="wifi-detail">Password: <b id="wifi-pass">${esc(c.wifi.password)}</b> <button type="button" class="outline" id="copy-wifi" style="padding:4px 8px;margin-left:6px;font-size:11px;border-radius:6px;">Copy</button></div></div><div style="display:flex;flex-direction:column;gap:10px;align-items:center;margin-top:22px;width:100%;max-width:380px;"><button type="button" class="primary" id="new-order" style="width:100%;border-radius:12px;padding:13px 20px;font-size:14px;font-weight:700;">${icon('plus')} + Order More Items for Table ${esc(state.table)}</button><button type="button" class="outline" id="btn-refresh-guest-status" style="width:100%;border-radius:12px;padding:10px 16px;font-size:12px;font-weight:600;">${icon('refresh-cw')} Refresh Order Status</button></div></section></main>`;
}

function bind(){
  $$('[data-role]').forEach(b => b.onclick = () => {
    state.role = b.dataset.role;
    render();
  });

  $('#show-pass')?.addEventListener('click', () => {
    let i = $('#password');
    if(i) i.type = i.type === 'password' ? 'text' : 'password';
  });

  $('#go-customer')?.addEventListener('click', () => {
    state.view = 'customer';
    render();
  });

  $('#go-login')?.addEventListener('click', () => {
    state.view = 'login';
    saveSession();
    render();
  });

  $('#header-visit-menu')?.addEventListener('click', () => {
    const url = getCafeUrl(cafe().id);
    window.open(url, '_blank');
  });

  $('#banner-track-btn')?.addEventListener('click', () => {
    state.view = 'confirmation';
    render();
  });

  $('#browse-menu-btn')?.addEventListener('click', () => {
    state.view = 'customer';
    render();
  });

  $('#floating-cart-btn')?.addEventListener('click', (e) => {
    if (e.target.closest('#boat-sink-action')) return;
    state.cartOpen = true;
    render();
  });

  $('#floating-track-btn')?.addEventListener('click', (e) => {
    if (e.target.closest('#boat-sink-action')) return;
    state.view = 'confirmation';
    render();
  });

  $('#boat-peek-trigger')?.addEventListener('click', (e) => {
    e.stopPropagation();
    triggerBoatPopUp(5000);
  });

  $('#boat-sink-action')?.addEventListener('click', (e) => {
    e.stopPropagation();
    sinkBoat();
  });

  const floatingBarEl = $('.mobile-cart-bar');
  if (floatingBarEl) {
    floatingBarEl.addEventListener('mouseenter', () => {
      clearTimeout(boatSinkTimeout);
    });
    floatingBarEl.addEventListener('mouseleave', () => {
      if (state.boatAfloat) {
        clearTimeout(boatSinkTimeout);
        boatSinkTimeout = setTimeout(sinkBoat, 3000);
      }
    });
  }
  
  $('#login-form')?.addEventListener('submit', e => {
    e.preventDefault();
    let u = ($('#username')?.value || '').trim();
    let p = $('#password')?.value || '';
    let matchingCafe = db.cafes.find(c => (c.username === u || (u === 'juniper' && c.username === 'eatngreet') || (u === 'eatngreet' && c.username === 'eatngreet') || c.slug === u) && c.password === p && c.status === 'Active');
    let adminUser = (db.platform.adminUsername || 'admin').trim();
    let adminPass = db.platform.adminPassword || 'admin123';
    let valid = state.role === 'admin' ? (u.toLowerCase() === adminUser.toLowerCase() && p === adminPass) : !!matchingCafe;
    if(!valid) return toast('Please check your username and password');
    if(matchingCafe) state.cafeId = matchingCafe.id;
    state.view = 'dashboard';
    state.page = state.role === 'cafe' ? 'orders' : 'dashboard';
    render();
    let welcomeName = state.role === 'admin' ? (db.platform.adminName || 'Aarav') : cafe().name;
    toast(`Welcome ${state.role === 'admin' ? `back, ${welcomeName}` : `to ${welcomeName}`}`);
  });

  $$('.nav-item[data-page]').forEach(b => b.onclick = () => {
    state.page = b.dataset.page;
    render();
  });

  $('#logout')?.addEventListener('click', () => {
    localStorage.removeItem('juniper-session');
    state.view = 'customer';
    state.role = 'cafe';
    state.page = 'orders';
    render();
    toast('You’ve been signed out');
  });
  
  $('#add-cafe')?.addEventListener('click', () => cafeModal());
  $$('.edit-cafe').forEach(b => b.onclick = () => cafeModal(db.cafes.find(c => c.id === b.dataset.cafe)));
  $$('.edit-cafe-charges').forEach(b => b.onclick = () => cafeChargesModal(db.cafes.find(c => c.id === b.dataset.cafe) || cafe()));
  $$('.edit-cafe-upi').forEach(b => b.onclick = () => cafeUpiModal(db.cafes.find(c => c.id === b.dataset.cafe) || cafe()));
  $$('.status-toggle').forEach(b => b.onclick = () => {
    let c = db.cafes.find(c => c.id === b.dataset.cafe);
    c.status = c.status === 'Active' ? 'Inactive' : 'Active';
    save();
    render();
    toast(`Café ${c.status.toLowerCase()}`);
  });

  // Printable Bill Receipt Actions
  $$('.btn-print-table-bill').forEach(b => {
    b.onclick = (e) => {
      e.stopPropagation();
      const tbl = b.dataset.printTable;
      const billData = getBillData('table', tbl);
      printBillWindow(billData);
    };
  });

  $$('.btn-print-order-bill').forEach(b => {
    b.onclick = (e) => {
      e.stopPropagation();
      const ordId = b.dataset.printOrder;
      const billData = getBillData('order', ordId);
      printBillWindow(billData);
    };
  });

  $('#pos-btn-preview-bill')?.addEventListener('click', () => {
    const billData = getBillData('pos');
    printBillWindow(billData);
  });

  $$('.view-cafe-qr').forEach(b => b.onclick = () => qrModal(db.cafes.find(c => c.id === b.dataset.cafe)));
  $$('.copy-cafe-link').forEach(b => b.onclick = () => copyToClipboard(b.dataset.url, 'Café menu link copied!'));
  $$('.visit-cafe-menu').forEach(b => b.onclick = () => {
    state.cafeId = b.dataset.cafe;
    state.view = 'customer';
    render();
  });

  $('#add-menu')?.addEventListener('click', () => menuModal());
  $$('.edit-menu').forEach(b => b.onclick = () => menuModal(myMenu().find(m => m.id === b.dataset.menu)));
  $$('.toggle-menu').forEach(b => b.onclick = () => {
    let m = myMenu().find(m => m.id === b.dataset.menu);
    m.available = !m.available;
    save();
    render();
    toast(`${m.name} ${m.available ? 'published' : 'hidden'}`);
  });

  $('#menu-search')?.addEventListener('input', (e) => {
    state.menuSearchQuery = e.target.value;
    render();
  });
  $('#menu-filter')?.addEventListener('change', (e) => {
    state.menuCategoryFilter = e.target.value;
    render();
  });
  $('#cafe-search')?.addEventListener('input', (e) => {
    state.cafeSearchQuery = e.target.value;
    render();
  });
  $('#cafe-status-filter')?.addEventListener('change', (e) => {
    state.cafeStatusFilter = e.target.value;
    render();
  });
  
  // Table Section Controls & Ring Actions
  $$('[data-toggle-table]').forEach(el => {
    el.onclick = (e) => {
      e.stopPropagation();
      const tbl = el.dataset.toggleTable;
      const curExp = state.expandedTables[tbl] !== undefined 
        ? state.expandedTables[tbl] 
        : true;
      state.expandedTables[tbl] = !curExp;
      render();
    };
  });

  $$('.btn-complete-table').forEach(b => {
    b.onclick = (e) => {
      e.stopPropagation();
      restartTableOrder(b.dataset.completeTable);
    };
  });

  $$('.btn-ack-table').forEach(b => {
    b.onclick = (e) => {
      e.stopPropagation();
      acknowledgeTableOrders(b.dataset.ackTable);
    };
  });

  $$('.order-status-select').forEach(sel => {
    sel.onchange = (e) => {
      e.stopPropagation();
      let o = db.orders.find(ord => ord.id === sel.dataset.order);
      if(o){
        o.status = sel.value;
        if(o.status !== 'New'){
          o.isNew = false;
          if(Array.isArray(o.items)){
            o.items.forEach(i => i.isNew = false);
          }
        }
        save();
        toast(`Order ${o.id} status updated to ${o.status}`);
        render();
      }
    };
  });

  $('#order-search-input')?.addEventListener('input', (e) => {
    state.orderSearchQuery = e.target.value;
    render();
  });

  $$('.date-scope-btn').forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      state.orderDateScope = btn.dataset.dateScope;
      render();
    };
  });

  $$('.filter-tab-pill').forEach(btn => {
    btn.onclick = () => {
      state.orderStatusFilter = btn.dataset.filterTab;
      render();
    };
  });

  $('#view-mode-tables')?.addEventListener('click', () => {
    state.orderViewMode = 'tables';
    render();
  });

  $('#view-mode-list')?.addEventListener('click', () => {
    state.orderViewMode = 'list';
    render();
  });
  
  $$('.order-status').forEach(sel => sel.onchange = () => {
    let o = db.orders.find(ord => ord.id === sel.dataset.order);
    if(o){
      o.status = sel.value;
      if(o.status !== 'New'){
        o.isNew = false;
        if(Array.isArray(o.items)){
          o.items.forEach(i => i.isNew = false);
        }
      }
      save();
      toast(`${o.id} is now ${o.status}`);
      filterOrders();
    }
  });

  $('#add-category')?.addEventListener('click', () => {
    let n = prompt('New category name');
    if(n && !categories().includes(n)){
      db.menu.push({
        id: 'placeholder-' + Date.now(),
        cafeId: cafe().id,
        name: 'First item',
        description: 'Add your first item to this category.',
        price: 0,
        category: n,
        image: imgs.cappuccino,
        available: false,
        veg: true
      });
      save();
      render();
      toast('Category added');
    }
  });

  $$('.category-del').forEach(b => b.onclick = () => {
    let c = b.dataset.category;
    if(confirm(`Remove ${c} and its menu items?`)){
      db.menu = db.menu.filter(m => m.cafeId !== cafe().id || m.category !== c);
      save();
      render();
      toast('Category removed');
    }
  });

  $('#toggle-admin-pass')?.addEventListener('click', () => {
    const input = $('#admin-password-input');
    if (input) {
      const isPass = input.type === 'password';
      input.type = isPass ? 'text' : 'password';
      const btn = $('#toggle-admin-pass');
      if (btn) btn.innerHTML = isPass ? icon('eye-off') : icon('eye');
    }
  });

  const handleAdminSettingsSubmit = e => {
    e.preventDefault();
    let f = new FormData(e.target);
    let companyName = (f.get('companyName') || '').trim();
    let adminName = (f.get('adminName') || '').trim();
    let adminEmail = (f.get('adminEmail') || '').trim();
    let adminUsername = (f.get('adminUsername') || '').trim();
    let adminPassword = (f.get('adminPassword') || '').trim();

    if (!adminUsername) {
      return toast('Admin username cannot be empty');
    }
    if (!adminPassword) {
      return toast('Admin password cannot be empty');
    }

    if (companyName) db.platform.companyName = companyName;
    if (adminName) db.platform.adminName = adminName;
    if (adminEmail) db.platform.adminEmail = adminEmail;
    db.platform.adminUsername = adminUsername;
    db.platform.adminPassword = adminPassword;

    save(true);
    render();
    toast('Admin credentials & settings saved! Synced to Cloudflare.');
  };

  $('#brand-form')?.addEventListener('submit', handleAdminSettingsSubmit);
  $('#admin-settings-form')?.addEventListener('submit', handleAdminSettingsSubmit);

  $('#wifi-form')?.addEventListener('submit', e => {
    e.preventDefault();
    let f = new FormData(e.target);
    cafe().wifi = { ssid: f.get('ssid'), password: f.get('password') };
    save();
    toast('Wi-Fi details saved');
  });

  $('#profile-form')?.addEventListener('submit', e => {
    e.preventDefault();
    let f = new FormData(e.target);
    let data = Object.fromEntries(f);
    data.gstRate = parseFloat(data.gstRate) || 0;
    data.gstEnabled = !!f.get('gstEnabled');
    data.serviceChargeRate = parseFloat(data.serviceChargeRate) || 0;
    data.serviceChargeEnabled = !!f.get('serviceChargeEnabled');
    data.upiId = (f.get('upiId') || '').trim();
    data.upiName = (f.get('upiName') || '').trim();
    data.upiEnabled = !!f.get('upiEnabled');
    Object.assign(cafe(), data);
    save();
    render();
    toast('Café profile, UPI & billing charges updated');
  });

  // QR Studio specific binds
  if (state.view === 'dashboard' && state.page === 'qr') {
    const mainCanvas = $('#main-qr-canvas');
    const tableCanvas = $('#table-qr-canvas');
    const mainUrl = getCafeUrl(cafe().id);
    const selectedTable = state.selectedQrTable || '01';
    const tableUrl = getCafeUrl(cafe().id, selectedTable);

    renderQr(mainCanvas, mainUrl, 180);
    renderQr(tableCanvas, tableUrl, 150);

    $('#btn-copy-main-url')?.addEventListener('click', () => copyToClipboard(mainUrl, 'Main Café Menu link copied!'));
    $('#btn-copy-table-url')?.addEventListener('click', () => copyToClipboard(tableUrl, `Table ${selectedTable} link copied!`));
    $('#btn-download-main-qr')?.addEventListener('click', () => downloadCanvasAsPng(mainCanvas, `${cafe().slug || cafe().id}-main-menu-qr.png`));
    $('#btn-download-table-qr')?.addEventListener('click', () => downloadCanvasAsPng(tableCanvas, `${cafe().slug || cafe().id}-table-${selectedTable}-qr.png`));
    $('#btn-test-main-menu')?.addEventListener('click', () => window.open(mainUrl, '_blank'));

    $$('[data-select-table]').forEach(b => b.onclick = () => {
      state.selectedQrTable = b.dataset.selectTable;
      render();
    });

    $('#btn-print-single-standee')?.addEventListener('click', () => {
      printSingleStandee(cafe(), selectedTable);
    });

    $('#btn-print-batch')?.addEventListener('click', () => {
      printBatchStandees(cafe(), 12);
    });
  }

  $$('.customer-cat').forEach(b => b.onclick = (e) => {
    e.preventDefault();
    state.customerCategory = b.dataset.cat;
    render();
  });

  $$('[data-add]').forEach(b => b.onclick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let ex = state.cart.find(x => x.id === b.dataset.add);
    ex ? ex.qty++ : state.cart.push({id: b.dataset.add, qty: 1});
    state.cartOpen = false;
    state.boatAfloat = true;
    saveSession();
    render();
    triggerBoatPopUp(4500);
  });

  $$('[data-customer-qty]').forEach(b => {
    b.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const itemId = b.dataset.customerQty;
      const change = parseInt(b.dataset.change, 10) || 0;
      let x = state.cart.find(x => x.id === itemId);
      if (x) {
        x.qty += change;
        if (x.qty <= 0) {
          state.cart = state.cart.filter(i => i.id !== itemId);
        }
        state.boatAfloat = state.cart.length > 0;
        saveSession();
        render();
        if (state.cart.length > 0) {
          triggerBoatPopUp(4500);
        }
      }
    };
  });
  
  $('#btn-gatekeeper-flip')?.addEventListener('click', async () => {
    currentFacingMode = currentFacingMode === "environment" ? "user" : "environment";
    if (availableCameras && availableCameras.length > 1) {
      const currentIndex = availableCameras.findIndex(c => c.id === selectedCameraId);
      const nextIndex = (currentIndex + 1) % availableCameras.length;
      selectedCameraId = availableCameras[nextIndex]?.id || null;
    }
    await initGatekeeperCamera();
  });

  $('#btn-switch-table')?.addEventListener('click', () => {
    if(confirm('Scan a different table QR standee?')){
      stopLiveCameraScanner();
      state.table = '';
      state.tableVerified = false;
      state.qrToken = null;
      state.tableFromQr = false;
      saveSession();
      render();
    }
  });

  $$('.admin-rotate-key').forEach(b => b.onclick = () => {
    let c = db.cafes.find(c => c.id === b.dataset.cafe);
    if(c && confirm(`Rotate QR security key for ${c.name}? All previously printed QR table standees for this café will be invalidated and must be reprinted.`)){
      c.qrSecret = `eng_sec_${c.id.toLowerCase()}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
      save();
      render();
      toast(`Security key for ${c.name} rotated!`);
    }
  });

  $('#cart-open')?.addEventListener('click', () => { state.cartOpen = true; render(); });
  $('#cart-close')?.addEventListener('click', () => { state.cartOpen = false; render(); });
  $('#cart-backdrop')?.addEventListener('click', () => { state.cartOpen = false; render(); });
  
  const handleCustomerNameChange = (e) => {
    state.customerName = e.target.value;
    saveSession();
  };
  $('#customer-name')?.addEventListener('input', handleCustomerNameChange);
  $('#customer-name')?.addEventListener('change', handleCustomerNameChange);
  $('#customer-name')?.addEventListener('blur', handleCustomerNameChange);

  $$('[data-qty]').forEach(b => b.onclick = () => {
    let x = state.cart.find(x => x.id === b.dataset.qty);
    if(x){
      x.qty += +b.dataset.change;
      if(x.qty <= 0) state.cart = state.cart.filter(i => i !== x);
      saveSession();
      render();
    }
  });

  $$('[data-remove]').forEach(b => b.onclick = () => {
    state.cart = state.cart.filter(x => x.id !== b.dataset.remove);
    saveSession();
    render();
  });

  $('#nav-btn-orders-tracker')?.addEventListener('click', () => {
    state.view = 'confirmation';
    render();
  });

  $$('#browse-menu-btn').forEach(btn => {
    btn.onclick = () => {
      state.view = 'customer';
      render();
    };
  });

  $('#banner-track-btn')?.addEventListener('click', (e) => {
    e.stopPropagation();
    state.view = 'confirmation';
    render();
  });

  $('#active-order-bar')?.addEventListener('click', () => {
    state.view = 'confirmation';
    render();
  });

  $('#floating-track-btn')?.addEventListener('click', (e) => {
    if (e.target.closest('#boat-sink-action')) return;
    state.view = 'confirmation';
    render();
  });

  $('#btn-refresh-guest-status')?.addEventListener('click', async () => {
    toast('Refreshing order status...');
    await syncCloudDb();
    render();
    toast('Order status up to date!');
  });

  $('#place-order')?.addEventListener('click', placeOrder);
  $('#customer-home')?.addEventListener('click', () => {
    state.view = 'customer';
    state.cartOpen = false;
    render();
  });

  $('#copy-wifi')?.addEventListener('click', () => {
    copyToClipboard(cafe().wifi.password, 'Wi-Fi Password copied!');
  });

  $('#new-order')?.addEventListener('click', () => {
    state.view = 'customer';
    state.cart = [];
    saveSession();
    render();
  });

  // Topbar and Orders page Take Order triggers
  $('#header-take-order')?.addEventListener('click', () => {
    state.page = 'pos';
    render();
  });

  $('#btn-orders-take-order')?.addEventListener('click', () => {
    state.page = 'pos';
    render();
  });

  const handleSelectStaffTable = (rawTable) => {
    let clean = String(rawTable || '01').trim();
    if (/^\d+$/.test(clean)) clean = clean.padStart(2, '0');
    state.staffTable = clean;
    const activeGuest = getActiveTableGuestName(clean, cafe().id);
    state.staffCustomerName = activeGuest || '';
    state.staffCustomerNotes = '';
    saveSession();
    render();
  };

  $$('[data-pos-table]').forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      handleSelectStaffTable(btn.dataset.posTable);
      state.page = 'pos';
      render();
    };
  });

  // POS Screen Interactive Event Handlers
  $$('[data-staff-select-table]').forEach(btn => {
    btn.onclick = () => {
      handleSelectStaffTable(btn.dataset.staffSelectTable);
    };
  });

  $('#pos-apply-manual-table')?.addEventListener('click', () => {
    const val = ($('#pos-manual-table')?.value || '').trim();
    if (val) {
      handleSelectStaffTable(val);
      toast(`Ordering table set to Table ${state.staffTable}`);
    }
  });

  $('#pos-manual-table')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const val = (e.target.value || '').trim();
      if (val) {
        handleSelectStaffTable(val);
        toast(`Ordering table set to Table ${state.staffTable}`);
      }
    }
  });

  const handlePosCustomerNameChange = (e) => {
    state.staffCustomerName = e.target.value;
    saveSession();
  };
  $('#pos-customer-name')?.addEventListener('input', handlePosCustomerNameChange);
  $('#pos-customer-name')?.addEventListener('change', handlePosCustomerNameChange);
  $('#pos-customer-name')?.addEventListener('blur', handlePosCustomerNameChange);

  const handlePosNotesChange = (e) => {
    state.staffCustomerNotes = e.target.value;
    saveSession();
  };
  $('#pos-customer-notes')?.addEventListener('input', handlePosNotesChange);
  $('#pos-customer-notes')?.addEventListener('change', handlePosNotesChange);
  $('#pos-customer-notes')?.addEventListener('blur', handlePosNotesChange);

  $$('[data-staff-cat]').forEach(btn => {
    btn.onclick = () => {
      state.staffCategory = btn.dataset.staffCat;
      render();
    };
  });

  $('#pos-menu-search')?.addEventListener('input', (e) => {
    state.staffSearchQuery = e.target.value;
    render();
  });

  $$('[data-staff-add]').forEach(btn => {
    btn.onclick = () => {
      addStaffCartItem(btn.dataset.staffAdd);
    };
  });

  $$('[data-staff-qty]').forEach(btn => {
    btn.onclick = () => {
      changeStaffCartQty(btn.dataset.staffQty, parseInt(btn.dataset.change, 10));
    };
  });

  $$('[data-staff-remove]').forEach(btn => {
    btn.onclick = () => {
      removeStaffCartItem(btn.dataset.staffRemove);
    };
  });

  $('#pos-btn-clear-order')?.addEventListener('click', () => {
    clearStaffCart();
  });

  $('#btn-staff-submit-order')?.addEventListener('click', () => {
    placeStaffOrder();
  });
}

function filterMenu(){
  let q = ($('#menu-search')?.value || '').toLowerCase();
  let cat = $('#menu-filter')?.value || 'All categories';
  let el = $('#menu-grid');
  if(el) el.innerHTML = menuCards(myMenu().filter(m => (m.name + m.category).toLowerCase().includes(q) && (cat === 'All categories' || m.category === cat)));
}

function filterOrders(){
  let q = ($('#order-search-input')?.value || $('#order-search')?.value || '').toLowerCase().trim();
  let s = state.orderStatusFilter || $('#status-filter')?.value || 'all';
  let dateScope = state.orderDateScope || 'today';
  let targetOrders = dateScope === 'today' ? myTodaysOrders() : myOrders();
  let el = $('#orders-table');
  let countLabel = $('#order-count-label');
  let filtered = targetOrders.filter(o => {
    const text = (o.id + ' table ' + o.table + ' ' + (o.customerName || '') + ' ' + (o.items || []).map(i => i.name).join(' ')).toLowerCase();
    const matchesSearch = !q || text.includes(q);
    const matchesStatus = s === 'all' || s === 'All orders' || 
      (s === 'new' ? o.status === 'New' : 
       s === 'active' ? ['New', 'Preparing', 'Processing', 'Ready'].includes(o.status) : 
       s === 'completed' ? o.status === 'Completed' : 
       o.status.toLowerCase() === s.toLowerCase());
    return matchesSearch && matchesStatus;
  });
  if(el){
    el.innerHTML = ordersTable(filtered);
    $$('.order-status-select, .order-status', el).forEach(sel => sel.onchange = () => {
      let o = db.orders.find(ord => ord.id === sel.dataset.order);
      if(o){
        o.status = sel.value;
        if(o.status !== 'New'){
          o.isNew = false;
          if(Array.isArray(o.items)){
            o.items.forEach(i => i.isNew = false);
          }
        }
        save();
        toast(`Order ${o.id} status updated to ${o.status}`);
        render();
      }
    });
    $$('.btn-print-order-bill', el).forEach(b => {
      b.onclick = (e) => {
        e.stopPropagation();
        const ordId = b.dataset.printOrder;
        const billData = getBillData('order', ordId);
        printBillWindow(billData);
      };
    });
  }
  if(countLabel){
    countLabel.textContent = `${myTodaysOrders().length} orders today`;
  }
}

// Interactive Charges & Surcharges Management Modal
function cafeChargesModal(cafeObj){
  if (!cafeObj) return;
  const cfg = getCafeCharges(cafeObj);
  let currentCustom = JSON.parse(JSON.stringify(cfg.customCharges || []));

  function getModalHtml() {
    return `<div class="charges-modal-container">
      <header class="charges-modal-header" style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px;">
        <div>
          <h2 style="font-family:var(--serif);font-size:22px;color:var(--coffee-dark);margin:0 0 4px;display:flex;align-items:center;gap:8px;">
            ${icon('receipt')} Taxes & Charges Studio — ${esc(cafeObj.name)}
          </h2>
          <p class="panel-sub" style="margin:0;font-size:12px;">Configure GST %, Service Charge %, custom surcharges, and tax identification number for printable bills and guest checkout.</p>
        </div>
        <button type="button" class="icon-btn modal-close" style="padding:6px;border-radius:8px;">${icon('x')}</button>
      </header>

      <form id="charges-config-form">
        <!-- Section 1: Standard Govt & Service Charges -->
        <div class="charges-config-section">
          <div class="charge-section-title">${icon('shield-check')} 1. Standard Taxes & Service Charge</div>
          
          <div class="settings-grid">
            <div class="field" style="margin-bottom:12px;">
              <label>GST / Tax Rate (%)</label>
              <div style="display:flex;gap:8px;align-items:center;">
                <input name="gstRate" id="cfg-gst-rate" type="number" step="0.1" min="0" max="100" value="${cfg.gstRate}" required>
                <label class="toggle-control-label" style="margin:0;white-space:nowrap;font-size:12px;">
                  <input name="gstEnabled" id="cfg-gst-enabled" type="checkbox" ${cfg.gstEnabled ? 'checked' : ''}> Active
                </label>
              </div>
            </div>

            <div class="field" style="margin-bottom:12px;">
              <label>Service Charge (%)</label>
              <div style="display:flex;gap:8px;align-items:center;">
                <input name="serviceChargeRate" id="cfg-sc-rate" type="number" step="0.1" min="0" max="100" value="${cfg.serviceChargeRate}" required>
                <label class="toggle-control-label" style="margin:0;white-space:nowrap;font-size:12px;">
                  <input name="serviceChargeEnabled" id="cfg-sc-enabled" type="checkbox" ${cfg.serviceChargeEnabled ? 'checked' : ''}> Active
                </label>
              </div>
            </div>
          </div>

          <div class="field" style="margin-bottom:0;">
            <label>GSTIN / Tax Registration Number (Printed on Bills)</label>
            <input name="gstin" id="cfg-gstin" placeholder="e.g. 19AAACH7409R1ZZ" value="${esc(cfg.gstin || '')}" maxlength="30">
          </div>
        </div>

        <!-- Section 2: Custom Add-on Surcharges -->
        <div class="charges-config-section">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
            <div class="charge-section-title" style="margin-bottom:0;">${icon('plus-circle')} 2. Custom Surcharges & Add-on Fees</div>
            <button type="button" class="outline" id="btn-add-custom-charge" style="font-size:11.5px;padding:4px 10px;font-weight:700;display:inline-flex;align-items:center;gap:4px;">
              ${icon('plus')} Add Fee
            </button>
          </div>
          <p class="panel-sub" style="font-size:11.5px;margin:0 0 10px;">Add packaging fees, AC restaurant surcharge, night convenience fees, or local municipal cess.</p>

          <div class="custom-charges-list" id="custom-charges-container">
            ${currentCustom.length ? currentCustom.map((c, idx) => `
              <div class="custom-charge-row" data-index="${idx}">
                <div class="field" style="margin:0;flex:2;">
                  <label style="font-size:10.5px;">Charge Name</label>
                  <input type="text" class="custom-ch-name" value="${esc(c.name || '')}" placeholder="e.g. Packaging Fee" required>
                </div>
                <div class="field" style="margin:0;flex:1.2;">
                  <label style="font-size:10.5px;">Type</label>
                  <select class="select custom-ch-type" style="height:38px;">
                    <option value="percent" ${c.type === 'percent' ? 'selected' : ''}>Percentage (%)</option>
                    <option value="flat" ${c.type === 'flat' ? 'selected' : ''}>Flat Amount (₹)</option>
                  </select>
                </div>
                <div class="field" style="margin:0;flex:1;">
                  <label style="font-size:10.5px;">Rate / Amount</label>
                  <input type="number" step="0.1" min="0" class="custom-ch-rate" value="${c.rate !== undefined ? c.rate : 0}" required>
                </div>
                <div class="field" style="margin:0;display:flex;flex-direction:column;justify-content:flex-end;">
                  <label class="toggle-control-label" style="margin-bottom:8px;font-size:11px;">
                    <input type="checkbox" class="custom-ch-enabled" ${c.enabled ? 'checked' : ''}> Active
                  </label>
                </div>
                <button type="button" class="soft btn-del-custom-charge" data-index="${idx}" style="color:#a83232;height:38px;padding:0 8px;margin-top:19px;" title="Remove this charge">${icon('trash-2')}</button>
              </div>
            `).join('') : `<div class="empty" style="padding:14px;font-size:12px;text-align:center;border:1px dashed var(--line);border-radius:8px;">No custom charges added yet. Click "+ Add Fee" above to create packaging fees, cess, or delivery charges.</div>`}
          </div>
        </div>

        <!-- Section 3: Live Bill Calculation Simulation -->
        <div class="charges-config-section">
          <div class="charge-section-title">${icon('calculator')} 3. Live Bill Calculation Preview (Sample ₹500 Order)</div>
          <div class="live-bill-calc-simulation" id="live-simulation-box">
            <!-- Dynamic simulation content rendered via JS -->
          </div>
        </div>

        <div class="modal-actions" style="margin-top:20px;display:flex;justify-content:space-between;align-items:center;">
          <button type="button" class="outline modal-close">Cancel</button>
          <button type="submit" class="primary" style="padding:10px 24px;font-weight:700;">${icon('check')} Save Charges & Rates</button>
        </div>
      </form>
    </div>`;
  }

  modal(getModalHtml());

  function syncAndSimulate() {
    const form = $('#charges-config-form');
    if (!form) return;
    const gstRate = parseFloat($('#cfg-gst-rate')?.value) || 0;
    const gstEnabled = $('#cfg-gst-enabled')?.checked || false;
    const scRate = parseFloat($('#cfg-sc-rate')?.value) || 0;
    const scEnabled = $('#cfg-sc-enabled')?.checked || false;

    // Collect custom charges
    const customRows = $$('.custom-charge-row');
    const customList = [];
    customRows.forEach(row => {
      const name = ($('.custom-ch-name', row)?.value || '').trim();
      const type = $('.custom-ch-type', row)?.value || 'percent';
      const rate = parseFloat($('.custom-ch-rate', row)?.value) || 0;
      const enabled = $('.custom-ch-enabled', row)?.checked || false;
      if (name) {
        customList.push({ name, type, rate, enabled });
      }
    });

    const mockCafe = {
      ...cafeObj,
      gstRate,
      gstEnabled,
      serviceChargeRate: scRate,
      serviceChargeEnabled: scEnabled,
      customCharges: customList
    };

    const mockItems = [{ name: 'Sample Item (Cold Brew & Croissant)', price: 500, qty: 1 }];
    const breakdown = calculateOrderBreakdown(mockItems, mockCafe);

    const simBox = $('#live-simulation-box');
    if (simBox) {
      simBox.innerHTML = `
        <div class="sim-row"><span>Items Subtotal:</span><b>${money(breakdown.subtotal)}</b></div>
        ${breakdown.charges.map(ch => `
          <div class="sim-row"><span style="color:#7a4e21;">${esc(ch.name)}:</span><b>${money(ch.amount)}</b></div>
        `).join('')}
        <div class="sim-row total" style="margin-top:6px;padding-top:6px;border-top:1.5px solid var(--line);font-size:14px;color:#1b683f;">
          <span>Sample Grand Total:</span><strong>${money(breakdown.total)}</strong>
        </div>
      `;
    }
  }

  function bindModalEvents() {
    $('.modal-close')?.addEventListener('click', closeModal);

    $('#btn-add-custom-charge')?.addEventListener('click', () => {
      // Pull latest custom list before re-rendering
      const rows = $$('.custom-charge-row');
      const updated = [];
      rows.forEach(r => {
        const name = ($('.custom-ch-name', r)?.value || '').trim();
        const type = $('.custom-ch-type', r)?.value || 'percent';
        const rate = parseFloat($('.custom-ch-rate', r)?.value) || 0;
        const enabled = $('.custom-ch-enabled', r)?.checked || false;
        updated.push({ name, type, rate, enabled });
      });
      updated.push({ name: 'Packaging Fee', type: 'flat', rate: 20, enabled: true });
      currentCustom = updated;
      modal(getModalHtml());
      bindModalEvents();
      syncAndSimulate();
    });

    $$('.btn-del-custom-charge').forEach(btn => {
      btn.onclick = () => {
        const idx = parseInt(btn.dataset.index, 10);
        currentCustom.splice(idx, 1);
        modal(getModalHtml());
        bindModalEvents();
        syncAndSimulate();
      };
    });

    $('#charges-config-form')?.addEventListener('input', syncAndSimulate);
    $('#charges-config-form')?.addEventListener('change', syncAndSimulate);

    $('#charges-config-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const gstRate = parseFloat($('#cfg-gst-rate')?.value) || 0;
      const gstEnabled = $('#cfg-gst-enabled')?.checked || false;
      const scRate = parseFloat($('#cfg-sc-rate')?.value) || 0;
      const scEnabled = $('#cfg-sc-enabled')?.checked || false;
      const gstin = ($('#cfg-gstin')?.value || '').trim();

      const customRows = $$('.custom-charge-row');
      const customCharges = [];
      customRows.forEach(row => {
        const name = ($('.custom-ch-name', row)?.value || '').trim();
        const type = $('.custom-ch-type', row)?.value || 'percent';
        const rate = parseFloat($('.custom-ch-rate', row)?.value) || 0;
        const enabled = $('.custom-ch-enabled', row)?.checked || false;
        if (name) {
          customCharges.push({ name, type, rate, enabled });
        }
      });

      cafeObj.gstRate = gstRate;
      cafeObj.gstEnabled = gstEnabled;
      cafeObj.serviceChargeRate = scRate;
      cafeObj.serviceChargeEnabled = scEnabled;
      cafeObj.gstin = gstin;
      cafeObj.customCharges = customCharges;

      save();
      closeModal();
      render();
      toast(`✅ Taxes and billing charges for "${cafeObj.name}" successfully updated!`);
    });
  }

  bindModalEvents();
  syncAndSimulate();
}

function cafeUpiModal(c) {
  if (!c) return;
  const currentUpi = c.upiId || `${(c.slug || c.username || 'cafe').toLowerCase()}@upi`;
  const currentName = c.upiName || c.name || '';
  const isEnabled = c.upiEnabled !== false;
  const sampleUrl = `upi://pay?pa=${encodeURIComponent(currentUpi)}&pn=${encodeURIComponent(currentName || c.name)}&cu=INR`;
  const sampleQrUrl = getQrServiceUrl(sampleUrl, 220);

  modal(`
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
      <div>
        <h2 style="margin:0;font-size:20px;font-family:var(--serif);color:var(--coffee-dark);">${icon('qr-code')} Configure UPI Payment QR</h2>
        <p class="panel-sub" style="margin:4px 0 0;font-size:12px;">Dynamic Scan-to-Pay QR printed on customer bills for <strong>${esc(c.name)}</strong></p>
      </div>
    </div>
    
    <form id="cafe-upi-form">
      <div style="display:grid;grid-template-columns:1fr 140px;gap:18px;align-items:start;margin-top:14px;">
        <div>
          <div class="field">
            <label>Business UPI ID / VPA</label>
            <input id="input-modal-upi-id" name="upiId" required placeholder="e.g. eatngreet@okhdfcbank" value="${esc(currentUpi)}">
            <small style="font-size:11px;color:var(--muted)">Enter GPay, PhonePe, Paytm, BHIM or Bank VPA.</small>
          </div>
          
          <div class="field">
            <label>Payee / Merchant Display Name</label>
            <input id="input-modal-upi-name" name="upiName" required placeholder="e.g. Eat 'N Greet" value="${esc(currentName)}">
            <small style="font-size:11px;color:var(--muted)">Merchant name shown in customer's UPI app.</small>
          </div>

          <div class="field" style="margin-top:10px;">
            <label class="toggle-control-label" style="font-size:12.5px;font-weight:600;display:inline-flex;align-items:center;gap:8px;cursor:pointer;">
              <input type="checkbox" name="upiEnabled" id="input-modal-upi-enabled" ${isEnabled ? 'checked' : ''}>
              Enable Dynamic UPI QR on Printed Bills
            </label>
          </div>
        </div>

        <div style="text-align:center;background:#faf6f0;padding:12px;border:1.5px dashed #d5c8b8;border-radius:10px;">
          <small style="font-size:10px;font-weight:700;letter-spacing:0.5px;text-transform:uppercase;color:var(--coffee);display:block;margin-bottom:6px;">Live Bill QR</small>
          <img id="modal-upi-qr-preview" src="${sampleQrUrl}" alt="UPI Preview" style="width:110px;height:110px;display:block;margin:0 auto;border-radius:6px;background:#fff;border:1px solid #e2d7c9;">
          <span style="font-size:10px;color:var(--muted);display:block;margin-top:4px;">GPay • PhonePe • Paytm</span>
        </div>
      </div>

      <div class="modal-actions" style="margin-top:20px;">
        <button type="button" class="outline modal-close">Cancel</button>
        <button type="submit" class="primary">Save UPI QR Settings</button>
      </div>
    </form>
  `);

  const closeBtn = $('.modal-close');
  if(closeBtn) closeBtn.onclick = closeModal;

  const upiInput = $('#input-modal-upi-id');
  const nameInput = $('#input-modal-upi-name');
  const qrImg = $('#modal-upi-qr-preview');

  const updatePreview = () => {
    const uId = (upiInput?.value || '').trim() || 'example@upi';
    const uNm = (nameInput?.value || '').trim() || c.name;
    const testUrl = `upi://pay?pa=${encodeURIComponent(uId)}&pn=${encodeURIComponent(uNm)}&cu=INR`;
    if (qrImg) qrImg.src = getQrServiceUrl(testUrl, 220);
  };

  upiInput?.addEventListener('input', updatePreview);
  nameInput?.addEventListener('input', updatePreview);

  const form = $('#cafe-upi-form');
  if(form){
    form.onsubmit = e => {
      e.preventDefault();
      const f = new FormData(e.target);
      c.upiId = (f.get('upiId') || '').trim();
      c.upiName = (f.get('upiName') || '').trim();
      c.upiEnabled = !!f.get('upiEnabled');
      save();
      closeModal();
      render();
      toast(`UPI payment QR updated for ${c.name}`);
    };
  }
}

function cafeModal(edit){
  let isEdit = !!edit;
  modal(`<h2>${isEdit ? 'Edit café' : 'Create a café account'}</h2><form id="cafe-form"><div class="field"><label>Café name</label><input name="name" required value="${esc(edit?.name || '')}"></div><div class="settings-grid"><div class="field"><label>Username / Slug</label><input name="username" required value="${esc(edit?.username || '')}"></div><div class="field"><label>Password</label><input name="password" required value="${esc(edit?.password || '')}"></div></div><div class="field"><label>Contact</label><input name="contact" required value="${esc(edit?.contact || '')}"></div><div class="field"><label>Address</label><input name="address" required value="${esc(edit?.address || '')}"></div><div class="settings-grid"><div class="field"><label>UPI ID (for Printed Bill QR)</label><input name="upiId" placeholder="e.g. eatngreet@okhdfcbank" value="${esc(edit?.upiId || '')}"></div><div class="field"><label>UPI Payee / Merchant Name</label><input name="upiName" placeholder="e.g. Eat 'N Greet" value="${esc(edit?.upiName || edit?.name || '')}"></div></div><div class="field" style="margin-top:4px;"><label class="toggle-control-label" style="font-size:12px;font-weight:600;display:inline-flex;align-items:center;gap:6px;cursor:pointer;"><input name="upiEnabled" type="checkbox" ${edit?.upiEnabled !== false ? 'checked' : ''}> Print UPI Payment QR on Bills</label></div>${isEdit ? `<div class="field"><label>Anti-Tamper Security Key (Admin Only)</label><div style="display:flex;gap:8px;align-items:center"><input id="modal-key-display" value="${esc(edit.qrSecret || '')}" readonly style="background:#f5f3ef;font-family:monospace;font-size:11px;"><button type="button" class="outline" id="modal-btn-rotate-key" style="white-space:nowrap;padding:6px 12px;font-size:11px;">${icon('refresh-cw')} Rotate Key</button></div><small style="font-size:11px;color:var(--muted)">Rotating this key will invalidate older physical QR standees for this café.</small></div><div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap;"><button type="button" class="outline edit-cafe-upi" data-cafe="${edit.id}" style="font-size:11.5px;padding:6px 12px;font-weight:700;">${icon('qr-code')} Configure UPI QR</button><button type="button" class="outline edit-cafe-charges" data-cafe="${edit.id}" style="font-size:11.5px;padding:6px 12px;font-weight:700;">${icon('settings-2')} Configure GST & Charges</button></div>` : ''}<div class="modal-actions"><button type="button" class="outline modal-close">Cancel</button>${isEdit ? `<button type="button" class="danger" id="delete-cafe">Delete</button>` : ''}<button class="primary">${isEdit ? 'Save changes' : 'Create café'}</button></div></form>`);
  const closeBtn = $('.modal-close');
  if(closeBtn) closeBtn.onclick = closeModal;

  $('#modal-btn-rotate-key')?.addEventListener('click', () => {
    if(confirm(`Rotate QR security key for ${edit.name}? All previously printed QR table standees will be invalidated.`)){
      edit.qrSecret = `eng_sec_${edit.id.toLowerCase()}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
      const keyInput = $('#modal-key-display');
      if(keyInput) keyInput.value = edit.qrSecret;
      save();
      toast('Security key rotated!');
    }
  });

  $('.edit-cafe-upi')?.addEventListener('click', () => {
    closeModal();
    cafeUpiModal(edit);
  });

  $('.edit-cafe-charges')?.addEventListener('click', () => {
    closeModal();
    cafeChargesModal(edit);
  });

  const form = $('#cafe-form');
  if(form){
    form.onsubmit = e => {
      e.preventDefault();
      let v = Object.fromEntries(new FormData(e.target));
      v.upiEnabled = !!new FormData(e.target).get('upiEnabled');
      v.upiId = (v.upiId || '').trim();
      v.upiName = (v.upiName || '').trim();
      if(isEdit) Object.assign(edit, v);
      else {
        let id = `CAF-${String(db.cafes.length + 1).padStart(3, '0')}`;
        db.cafes.push({
          id,
          ...v,
          slug: v.username.toLowerCase(),
          qrSecret: `eng_sec_${id.toLowerCase()}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`,
          status: 'Active',
          gstRate: 5,
          gstEnabled: true,
          serviceChargeRate: 5,
          serviceChargeEnabled: true,
          gstin: '',
          customCharges: [],
          upiId: v.upiId || `${v.username.toLowerCase()}@upi`,
          upiName: v.upiName || v.name,
          upiEnabled: v.upiEnabled,
          wifi: { ssid: `${v.name.replace(/\s+/g,'_')}_Guest`, password: 'Welcome@123' },
          description: 'A beautiful local café.',
          image: cafe().image
        });
      }
      save();
      closeModal();
      render();
      toast(isEdit ? 'Café updated' : 'Café account created');
    };
  }
  $('#delete-cafe')?.addEventListener('click', () => {
    if(confirm('Delete this café account?')){
      db.cafes = db.cafes.filter(c => c !== edit);
      db.menu = db.menu.filter(m => m.cafeId !== edit.id);
      db.orders = db.orders.filter(o => o.cafeId !== edit.id);
      save();
      closeModal();
      render();
      toast('Café account deleted');
    }
  });
}

function menuModal(edit){
  let isEdit = !!edit;
  modal(`<h2>${isEdit ? 'Edit menu item' : 'Add menu item'}</h2><form id="menu-form"><div class="field"><label>Item name</label><input name="name" required value="${esc(edit?.name || '')}"></div><div class="settings-grid"><div class="field"><label>Price (₹)</label><input name="price" type="number" min="0" required value="${esc(edit?.price || '')}"></div><div class="field"><label>Category</label><input name="category" required value="${esc(edit?.category || 'Coffee')}"></div></div><div class="field"><label>Description</label><textarea name="description" required>${esc(edit?.description || '')}</textarea></div><div class="field"><label>Image URL</label><input name="image" required value="${esc(edit?.image || imgs.cappuccino)}"></div><div class="modal-actions"><button type="button" class="outline modal-close">Cancel</button>${isEdit ? `<button type="button" class="danger" id="delete-menu">Delete</button>` : ''}<button class="primary">${isEdit ? 'Save changes' : 'Add item'}</button></div></form>`);
  const closeBtn = $('.modal-close');
  if(closeBtn) closeBtn.onclick = closeModal;
  const form = $('#menu-form');
  if(form){
    form.onsubmit = e => {
      e.preventDefault();
      let v = Object.fromEntries(new FormData(e.target));
      v.price = +v.price;
      if(isEdit) Object.assign(edit, v);
      else db.menu.push({ id: 'm' + Date.now(), cafeId: cafe().id, ...v, available: true, veg: true });
      save();
      closeModal();
      render();
      toast(isEdit ? 'Menu item saved' : 'Menu item added');
    };
  }
  $('#delete-menu')?.addEventListener('click', () => {
    if(confirm(`Remove ${edit.name} from the menu?`)){
      db.menu = db.menu.filter(m => m !== edit);
      save();
      closeModal();
      render();
      toast('Menu item removed');
    }
  });
}

// QR Code Hub Modal for Any Café
function qrModal(c){
  if (!c) return;
  const mainUrl = getCafeUrl(c.id);
  modal(`<h2>${icon('qr-code')} QR Ordering & Scanners — ${esc(c.name)}</h2><p class="panel-sub" style="margin-bottom:16px">Unique QR code links for this café location.</p><div class="qr-canvas-box" style="margin:10px auto;display:flex;"><canvas id="modal-qr-canvas" width="180" height="180"></canvas></div><div class="qr-url-pill"><span>${esc(mainUrl)}</span><button class="outline" id="modal-copy-link" style="padding:4px 8px;font-size:11px">${icon('copy')}</button></div><div class="modal-actions" style="justify-content:center;gap:8px;"><button class="outline modal-close">Close</button><button class="outline" id="modal-download-qr">${icon('download')} Download PNG</button><button class="primary" id="modal-open-menu">${icon('external-link')} Open Menu</button></div>`);
  
  const canvas = $('#modal-qr-canvas');
  renderQr(canvas, mainUrl, 180);

  $('.modal-close')?.addEventListener('click', closeModal);
  $('#modal-copy-link')?.addEventListener('click', () => copyToClipboard(mainUrl, 'Café link copied!'));
  $('#modal-download-qr')?.addEventListener('click', () => downloadCanvasAsPng(canvas, `${c.slug || c.id}-qr.png`));
  $('#modal-open-menu')?.addEventListener('click', () => {
    closeModal();
    state.cafeId = c.id;
    state.view = 'customer';
    render();
  });
}

// Printable Single Standee Window
function printSingleStandee(c, tableNum) {
  const tableUrl = getCafeUrl(c.id, tableNum);
  const qrImgUrl = getQrServiceUrl(tableUrl, 400);
  const win = window.open('', '_blank', 'width=800,height=900');
  if (!win) return alert('Please allow popups to print table standees');
  
  win.document.write(`<!DOCTYPE html><html><head><title>Table ${tableNum} Standee — ${esc(c.name)}</title><link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet"><style>
    body { margin: 0; padding: 40px; font-family: 'DM Sans', sans-serif; background: #fff; display: flex; justify-content: center; align-items: center; min-height: 90vh; }
    .standee { width: 340px; border: 3px solid #2a1811; border-radius: 20px; padding: 28px 24px; text-align: center; background: #fff; box-shadow: 0 10px 30px rgba(0,0,0,0.08); }
    .inner { border: 1.5px solid #c8a77a; border-radius: 14px; padding: 22px 16px; }
    h1 { font-family: 'Playfair Display', serif; font-size: 24px; margin: 0 0 4px; color: #2a1811; }
    .table-pill { display: inline-block; background: #2a1811; color: #fff; font-size: 14px; font-weight: 700; padding: 6px 18px; border-radius: 20px; margin: 8px 0; letter-spacing: 0.5px; }
    .tagline { font-size: 11.5px; color: #6b5344; margin: 4px 0 12px; font-weight: 600; }
    .qr-img { display: block; margin: 12px auto; border-radius: 8px; width: 170px; height: 170px; }
    .steps { display: flex; justify-content: space-between; border-top: 1px solid #eee; border-bottom: 1px solid #eee; padding: 10px 0; margin: 16px 0; font-size: 11px; font-weight: 600; color: #443328; }
    .wifi { background: #fbf8f3; border: 1px dashed #d5c3b0; border-radius: 10px; padding: 10px 12px; font-size: 11.5px; text-align: left; color: #4a3b30; }
    @media print { body { padding: 0; } .standee { box-shadow: none; border-color: #000; } }
  </style></head><body><div class="standee"><div class="inner"><h1>${esc(c.name)}</h1><div class="table-pill">TABLE ${esc(tableNum)}</div><div class="tagline">SCAN WITH PHONE CAMERA TO ORDER</div><img class="qr-img" src="${qrImgUrl}" alt="Table ${esc(tableNum)} QR Code" onload="setTimeout(() => window.print(), 350);" /><div class="steps"><span>1. Scan QR</span><span>2. Select Food</span><span>3. Order Placed!</span></div><div class="wifi"><b>📶 Free Wi-Fi:</b> ${esc(c.wifi.ssid)}<br><b>🔑 Password:</b> ${esc(c.wifi.password)}</div></div></div></body></html>`);
  win.document.close();
}

// Printable Batch Table Standees Studio
function printBatchStandees(c, count = 12) {
  const win = window.open('', '_blank', 'width=1000,height=900');
  if (!win) return alert('Please allow popups to print table standees');

  const tables = Array.from({length: count}, (_, i) => String(i + 1).padStart(2, '0'));
  
  win.document.write(`<!DOCTYPE html><html><head><title>Batch Table Standees — ${esc(c.name)}</title><link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet"><style>
    body { margin: 0; padding: 20px; font-family: 'DM Sans', sans-serif; background: #fff; }
    .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
    .standee { border: 2px solid #2a1811; border-radius: 16px; padding: 18px; text-align: center; background: #fff; page-break-inside: avoid; }
    .inner { border: 1px solid #c8a77a; border-radius: 12px; padding: 14px 10px; }
    h2 { font-family: 'Playfair Display', serif; font-size: 18px; margin: 0 0 2px; color: #2a1811; }
    .table-pill { display: inline-block; background: #2a1811; color: #fff; font-size: 13px; font-weight: 700; padding: 4px 14px; border-radius: 14px; margin: 6px 0; }
    .tagline { font-size: 10.5px; color: #7a6555; margin: 4px 0 8px; font-weight: 600; }
    .qr-img { display: block; margin: 8px auto; border-radius: 6px; width: 140px; height: 140px; }
    .steps { display: flex; justify-content: space-around; border-top: 1px solid #eee; border-bottom: 1px solid #eee; padding: 6px 0; margin: 10px 0; font-size: 9.5px; font-weight: 600; color: #443328; }
    .wifi { background: #fbf8f3; border: 1px dashed #d5c3b0; border-radius: 8px; padding: 7px 10px; font-size: 10px; text-align: left; color: #4a3b30; }
    @media print { body { padding: 0; } .grid { gap: 16px; } }
  </style></head><body><h1 style="text-align:center;font-size:18px;margin-bottom:16px;" class="no-print">Printing ${count} Table Standees for ${esc(c.name)}</h1><div class="grid">${tables.map(t => `<div class="standee"><div class="inner"><h2>${esc(c.name)}</h2><div class="table-pill">TABLE ${t}</div><div class="tagline">SCAN WITH PHONE CAMERA TO ORDER</div><img class="qr-img" src="${getQrServiceUrl(getCafeUrl(c.id, t), 300)}" alt="Table ${t} QR Code" /><div class="steps"><span>1. Scan QR</span><span>2. Select Food</span><span>3. Order Placed!</span></div><div class="wifi"><b>📶 Free Wi-Fi:</b> ${esc(c.wifi.ssid)}<br><b>🔑 Password:</b> ${esc(c.wifi.password)}</div></div></div>`).join('')}</div><script>
    setTimeout(() => window.print(), 500);
  </script></body></html>`);
  win.document.close();
}

function modal(content){
  const el = $('#modal-root');
  if(el) el.innerHTML = `<div class="modal-backdrop"><div class="modal">${content}</div></div>`;
}
function closeModal(){
  const el = $('#modal-root');
  if(el) el.innerHTML = '';
}

async function placeOrder(){
  if(!state.table || !state.tableVerified || !state.qrToken || !verifyTableToken(cafe().id, state.table, state.qrToken)){
    toast('🔒 Please scan the physical QR code on your dining table to place an order');
    state.table = '';
    state.tableVerified = false;
    state.qrToken = null;
    saveSession();
    render();
    return;
  }
  let table = state.table;
  let customerName = ($('#customer-name')?.value || state.customerName || (state.table ? getActiveTableGuestName(state.table, cafe().id) : '') || '').trim();
  if(!customerName) return toast('Please enter your name');
  state.customerName = customerName;
  saveSession();

  let items = state.cart.map(x => {
    let m = myMenu().find(m => m.id === x.id);
    return { name: m.name, qty: x.qty, price: m.price, isNew: true };
  });
  let breakdown = calculateOrderBreakdown(items, cafe().id);
  let id = `ORD-${Math.max(1000, ...db.orders.map(o => +o.id.split('-')[1] || 0)) + 1}`;
  let o = {
    id,
    cafeId: cafe().id,
    customerName,
    table: String(table).padStart(2, '0'),
    qrVerified: true,
    items,
    subtotal: breakdown.subtotal,
    charges: breakdown.charges,
    tax: breakdown.tax,
    total: breakdown.total,
    status: 'New',
    isNew: true,
    time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    date: 'Today',
    timestamp: Date.now()
  };
  db.orders.unshift(o);
  state.placedOrderIds = state.placedOrderIds || [];
  if(!state.placedOrderIds.includes(o.id)){
    state.placedOrderIds.unshift(o.id);
  }
  state.confirmed = o;
  state.orderPlacedAt = Date.now();
  save(true);
  playToingSound();
  try {
    fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...o, cafeName: cafe().name, subtotal: breakdown.subtotal, tax: breakdown.tax, createdAt: new Date().toLocaleString('en-IN') })
    }).catch(()=>{});
  } catch(error) {}
  state.cart = [];
  state.cartOpen = false;
  state.view = 'confirmation';
  saveSession();
  render();
}

// Full Cloud Cross-Device Real-Time Synchronization
let isSyncing = false;
let lastDbSnapshot = JSON.stringify(db);

async function syncCloudDb(){
  if(isSyncing) return;
  isSyncing = true;
  try {
    const res = await fetch(`/api/db?_t=${Date.now()}`, {
      cache: 'no-store',
      headers: { 'Cache-Control': 'no-cache, no-store' }
    });
    if(res.ok){
      const serverDb = await res.json();
      if(serverDb && typeof serverDb === 'object' && serverDb.cafes && serverDb.menu){
        const serverSnapshot = JSON.stringify(serverDb);
        if(serverSnapshot !== lastDbSnapshot){
          const oldOrders = db.orders || [];
          const oldIds = new Set(oldOrders.map(o => o.id));
          
          if(serverDb.platform){
            serverDb.platform = Object.assign({
              companyName: "Eat 'N Greet",
              adminName: "Aarav Mehta",
              adminEmail: "aarav@eatngreet.console",
              adminUsername: "admin",
              adminPassword: "admin123"
            }, serverDb.platform);
          }
          db = serverDb;
          lastDbSnapshot = serverSnapshot;
          localStorage.setItem('juniper-db', JSON.stringify(db));

          // Check if cafe received new orders
          const newOrders = (db.orders || []).filter(o => !oldIds.has(o.id) && o.cafeId === cafe().id);
          if(state.role === 'cafe' && newOrders.length > 0){
            playNotificationSound();
            const latestNew = newOrders[0];
            const tbl = String(latestNew.table || '01').padStart(2, '0');
            state.expandedTables[tbl] = true;
            toast(`🔔 New Order received from Table ${tbl} (${latestNew.customerName || 'Guest'})!`);
          }

          // Check if any guest session orders updated
          const sessionOrders = getSessionOrders();
          let orderUpdated = false;
          sessionOrders.forEach(ord => {
            let updated = (db.orders || []).find(o => o.id === ord.id);
            if(updated && updated.status !== ord.status){
              orderUpdated = true;
              playNotificationSound();
              toast(`🔔 Order ${updated.id} is now ${updated.status}!`);
            }
          });

          // Instantly re-render active interface
          render();
        }
      } else {
        pushCloudDb(true);
      }
    }
  } catch(e){}
  finally {
    isSyncing = false;
  }
}

// Cross-tab real-time sync via StorageEvent on same device (instant <1ms sync)
window.addEventListener('storage', e => {
  if(e.key === 'juniper-db'){
    try {
      const freshDb = JSON.parse(e.newValue);
      if(freshDb && freshDb.orders){
        if(freshDb.platform){
          freshDb.platform = Object.assign({
            companyName: "Eat 'N Greet",
            adminName: "Aarav Mehta",
            adminEmail: "aarav@eatngreet.console",
            adminUsername: "admin",
            adminPassword: "admin123"
          }, freshDb.platform);
        }
        const oldOrders = db.orders || [];
        const oldIds = new Set(oldOrders.map(o => o.id));
        const newOrders = (freshDb.orders || []).filter(o => !oldIds.has(o.id) && o.cafeId === cafe().id);

        db = freshDb;
        lastDbSnapshot = JSON.stringify(db);
        
        if(state.role === 'cafe' && newOrders.length > 0){
          playNotificationSound();
          const latestNew = newOrders[0];
          const tbl = String(latestNew.table || '01').padStart(2, '0');
          state.expandedTables[tbl] = true;
          toast(`🔔 New Order from Table ${tbl} (${latestNew.customerName || 'Guest'})!`);
        }
        render();
      }
    } catch(err){}
  }
});

// Fast 1-second cloud polling for instantaneous multi-device order alerts
setInterval(syncCloudDb, 1000);
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    syncCloudDb();
  }
});
window.addEventListener('focus', () => {
  syncCloudDb();
});
syncCloudDb();

render();
