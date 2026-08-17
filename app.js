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
    adminEmail: "aarav@eatngreet.console"
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
    {id:'ORD-1048',cafeId:'CAF-001',table:'04',customerName:'Ananya Sharma',items:[{name:'House Cappuccino',qty:2,price:180},{name:'Butter Croissant',qty:1,price:155}],total:515,status:'Preparing',time:'10:42 AM',date:'Today',timestamp:Date.now()-1000*60*25},
    {id:'ORD-1047',cafeId:'CAF-001',table:'11',customerName:'Rahul Sen',items:[{name:'Truffle Cream Pasta',qty:1,price:410,isNew:true}],total:410,status:'New',isNew:true,time:'10:31 AM',date:'Today',timestamp:Date.now()-1000*60*10},
    {id:'ORD-1046',cafeId:'CAF-002',table:'07',customerName:'Priya Patel',items:[{name:'Spanish Cortado',qty:1,price:195},{name:'Classic Basque Cheesecake',qty:1,price:240}],total:435,status:'Ready',time:'10:18 AM',date:'Today',timestamp:Date.now()-1000*60*45},
    {id:'ORD-1045',cafeId:'CAF-003',table:'02',customerName:'Vikram Das',items:[{name:'Avocado Sourdough Toast',qty:1,price:310}],total:310,status:'Completed',time:'09:52 AM',date:'Today',timestamp:Date.now()-1000*60*90}
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
  adminEmail: "aarav@eatngreet.console"
}, db.platform);

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
  selectedQrTable: '01',
  orderViewMode: 'tables',
  orderStatusFilter: 'all',
  orderSearchQuery: '',
  expandedTables: {}
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
const clockLabel = value => new Date(`2000-01-01T${value}`).toLocaleTimeString('en-IN', {hour:'numeric', minute:'2-digit'});

function toast(msg){
  const el = $('#toast');
  if(!el) return;
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2600);
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

function render(){
  document.title = `${db.platform.companyName || "Eat 'N Greet"} — Café Console`;
  saveSession();
  const app = $('#app');
  if(!app) return;

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
    ['orders', 'Orders', 'clipboard-list'],
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
  return `<div class="app-shell">${sidebar()}<main class="main"><header class="topbar"><div><div class="eyebrow">${state.role==='admin'?`Welcome back, ${esc(adminName)}`:`Good morning, ${esc(cafe().name)}`}</div><h1 class="page-title">${titleForPage()}</h1></div><div class="top-actions"><span class="date-chip">${new Date().toLocaleDateString('en-IN',{weekday:'short',month:'short',day:'numeric'})}</span><button class="outline" id="header-visit-menu" title="Open Guest Menu" style="font-size:12px;padding:8px 12px;">${icon('external-link')} View Live Menu</button>${state.role==='admin'&&state.page==='cafes'?`<button class="primary" id="add-cafe">${icon('plus')} Add café</button>`:state.role==='cafe'&&state.page==='menu'?`<button class="primary" id="add-menu">${icon('plus')} Add item</button>`:''}</div></header>${pageContent()}</main></div>`;
}

function titleForPage(){
  const map = {
    dashboard: 'Dashboard',
    cafes: 'Café directory & QR links',
    accounts: 'Café accounts',
    orders: 'Order management',
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
  let allOrders = db.orders;
  let orders = state.role === 'admin' ? allOrders : myOrders();
  let sum = orders.reduce((a, o) => a + o.total, 0);
  let data = state.role === 'admin'
    ? [['store','Total cafés',db.cafes.length],['circle-check','Active cafés',db.cafes.filter(c=>c.status==='Active').length],['qr-code','Active QR Links',db.cafes.length],['shopping-bag','Total orders',allOrders.length]]
    : [['receipt-indian-rupee','Today’s sales',money(sum)],['clock-3','Pending orders',orders.filter(o=>['New','Preparing','Processing'].includes(o.status)).length],['circle-check','Completed',orders.filter(o=>o.status==='Completed').length],['armchair','Active tables',new Set(orders.filter(o=>o.status!=='Completed'&&o.status!=='Cancelled').map(o=>o.table)).size]];
  return `<section class="grid stat-grid">${data.map(x=>`<article class="stat-card"><div class="stat-icon">${icon(x[0])}</div><div class="stat-num">${x[2]}</div><div class="stat-label">${x[1]}</div></article>`).join('')}</section>`;
}

function pageContent(){
  if(state.role === 'admin'){
    if(state.page === 'cafes' || state.page === 'accounts') return cafesPage();
    if(state.page === 'settings') return `<div class="panel form-panel"><h2 class="panel-title">Company settings</h2><p class="panel-sub">This is your company name. Café staff see it in their portal and it appears on the sign-in page. Individual cafés cannot change it.</p><form id="brand-form" style="margin-top:22px"><div class="field"><label>Company heading</label><input name="companyName" required value="${esc(db.platform.companyName)}"></div><div class="field"><label>Administrator name</label><input name="adminName" required value="${esc(db.platform.adminName || 'Aarav Mehta')}"></div><div class="field"><label>Administrator email</label><input name="adminEmail" type="email" required value="${esc(db.platform.adminEmail || 'aarav@eatngreet.console')}"></div><button class="primary" type="submit">Save company settings</button></form></div>`;
    return adminDash();
  }
  if(state.page === 'orders') return ordersPage();
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
  `).join('')}</div>` : `<div class="order-list">${myOrders().slice(0,4).map(orderRow).join('')}</div>`}</article>${chart()}</section>`;
}

function chart(){
  return `<article class="panel"><div class="panel-head"><div><h2 class="panel-title">Weekly sales</h2><p class="panel-sub">This week</p></div><strong>${money(12840)}</strong></div><div class="sales-chart">${[['M',55],['T',76],['W',44],['T',88],['F',67],['S',92],['S',73]].map((x,i)=>`<div class="bar ${i===5?'active':''}" style="height:${x[1]}%"><span>${x[0]}</span></div>`).join('')}</div><div class="legend"><span><b></b> Sales performance</span><span>+12.5% vs last week</span></div></article>`;
}

function orderRow(o){
  return `<div class="order-row"><div class="table-badge">${esc(o.table)}</div><div><div class="order-id">${esc(o.id)}</div><div class="order-time">Table ${esc(o.table)} · ${esc(o.time)}</div></div><div class="order-items">${o.items.map(i=>`${i.qty}× ${esc(i.name)}`).join(', ')}</div><strong>${money(o.total)}</strong><span class="status ${statusClass(o.status)}">${o.status}</span></div>`;
}

function cafesPage(){
  return `<section class="panel"><div class="section-bar"><div class="filter-row"><div class="search-wrap">${icon('search')}<input class="search" id="cafe-search" placeholder="Search cafes"></div><select class="select"><option>All statuses</option><option>Active</option><option>Inactive</option></select></div><span class="panel-sub">${db.cafes.length} registered cafés</span></div><div style="overflow:auto"><table class="table"><thead><tr><th>Café</th><th>Café ID</th><th>Ordering Link</th><th>QR Standees</th><th>Security Key</th><th>Status</th><th>Actions</th></tr></thead><tbody>${db.cafes.map(c=>`<tr><td><div style="display:flex;align-items:center;gap:11px"><img class="cafe-logo-sm" src="${c.image}"><div><div class="cell-title">${esc(c.name)}</div><div class="cell-sub">@${esc(c.username)} · ${esc(c.address)}</div></div></div></td><td><b>${esc(c.id)}</b></td><td><button class="outline copy-cafe-link" data-url="${getCafeUrl(c.id)}" style="padding:5px 10px;font-size:11px;">${icon('copy')} Copy Link</button></td><td><button class="primary view-cafe-qr" data-cafe="${c.id}" style="padding:5px 10px;font-size:11px;">${icon('qr-code')} View QR</button></td><td><button class="outline admin-rotate-key" data-cafe="${c.id}" title="Rotate cryptographic security key for ${esc(c.name)}" style="padding:5px 10px;font-size:11px;color:#8f4d0a;">${icon('refresh-cw')} Rotate Key</button></td><td><button class="status ${statusClass(c.status)} status-toggle" data-cafe="${c.id}">${c.status}</button></td><td><div style="display:flex;gap:6px;"><button class="outline visit-cafe-menu" data-cafe="${c.id}" title="Open guest menu" style="padding:5px 8px;font-size:11px;">${icon('external-link')}</button><button class="dots edit-cafe" data-cafe="${c.id}">${icon('ellipsis')}</button></div></td></tr>`).join('')}</tbody></table></div></section>`;
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

    // Sort active orders with latest batch first
    activeOrders.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

    if (activeOrders.length > 0) {
      let totalItems = 0;
      let total = 0;
      let hasNew = false;
      let activeOrdersCount = 0;

      activeOrders.forEach(o => {
        if (o.status === 'New' || o.isNew) hasNew = true;
        if (o.status !== 'Completed' && o.status !== 'Cancelled') {
          activeOrdersCount++;
        }
        (o.items || []).forEach(item => {
          totalItems += (item.qty || 1);
        });
        total += (o.total || 0);
      });

      const hasReady = activeOrders.some(o => o.status === 'Ready');
      const hasPrep = activeOrders.some(o => o.status === 'Preparing' || o.status === 'Processing');
      
      let status = 'Completed';
      if (hasNew) status = 'New';
      else if (hasPrep) status = 'Preparing';
      else if (hasReady) status = 'Ready';
      else if (activeOrdersCount > 0) status = 'Active';

      groups.push({
        table: tbl,
        isVacant: false,
        orders: activeOrders,
        pastOrdersCount: pastOrders.length,
        customerName: activeOrders[0]?.customerName || `Guest (Table ${tbl})`,
        hasNew,
        totalItems,
        total,
        activeOrdersCount,
        status,
        latestTime: activeOrders[0]?.time || 'Today',
        latestTimestamp: activeOrders[0]?.timestamp || 0,
        resetTime
      });
    } else {
      // Table is currently vacant / ready for next guest
      const lastPastOrder = pastOrders.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))[0];
      groups.push({
        table: tbl,
        isVacant: true,
        orders: [],
        pastOrdersCount: pastOrders.length,
        customerName: 'No active guest',
        hasNew: false,
        totalItems: 0,
        total: 0,
        activeOrdersCount: 0,
        status: 'Available',
        latestTime: lastPastOrder ? `Last settled ${lastPastOrder.time || 'earlier'}` : 'Ready for guests',
        latestTimestamp: resetTime,
        lastSettledTotal: lastPastOrder?.total || 0,
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
              <span>0 active orders</span>
              <span>·</span>
              <span>${esc(g.latestTime)}</span>
              <span>·</span>
              <strong style="color:var(--muted)">Active Bill: ₹0</strong>
            </div>
          </div>
        </div>
        <div class="table-head-right">
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
          <p class="panel-sub" style="margin:6px 0 0;font-size:12px;">Previous guest's bill has been completely settled offline and closed. When a new customer scans the Table ${esc(g.table)} QR code, their fresh order and running bill will start here cleanly from ₹0.</p>
        </div>
      </div>` : ''}
    </article>`;
  }

  // Active Dining Table Session
  const isNewTable = g.hasNew;
  const statusCls = statusClass(g.status);
  const subtotal = Math.round(g.total / 1.05);
  const tax = g.total - subtotal;

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
            <span>${icon('clipboard-list')} ${g.orders.length} ${g.orders.length === 1 ? 'order' : 'orders'} (${g.totalItems} items)</span>
            <span>·</span>
            <span>${icon('clock-3')} Latest: ${esc(g.latestTime)}</span>
            <span>·</span>
            <strong class="table-running-total" style="color:#1b683f;font-size:13.5px;">Active Bill: ${money(g.total)}</strong>
          </div>
        </div>
      </div>
      <div class="table-head-right">
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
                <span class="batch-time">${esc(ord.time || 'Today')}</span>
                ${ordIsNew ? `<span class="order-ring-pill animate-ring">${icon('bell-ring')} New Batch</span>` : `<span class="batch-num-badge">Batch #${g.orders.length - idx}</span>`}
              </div>
              <div class="batch-actions">
                <label style="font-size:11px;color:var(--muted);font-weight:600;">Status:</label>
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
            <div class="bill-stat"><span>Subtotal:</span><b>${money(subtotal)}</b></div>
            <div class="bill-stat"><span>Taxes (5%):</span><b>${money(tax)}</b></div>
            <div class="bill-stat grand"><span>Grand Total:</span><strong>${money(g.total)}</strong></div>
          </div>
        </div>
        <div class="bill-actions-right">
          ${isNewTable ? `<button type="button" class="outline btn-ack-table" data-ack-table="${g.table}">${icon('check')} Acknowledge & Start Preparing</button>` : ''}
          <button type="button" class="primary btn-complete-table" data-complete-table="${g.table}" title="Customer has paid offline. Stop this guest's bill and reset table for next customer.">${icon('circle-check')} Complete & Restart Table (Bill Paid Offline)</button>
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
      <p class="panel-sub" style="margin-top:6px;">New orders placed by guests from table QR standees will automatically appear here organized by table.</p>
    </div>`;
  }
  return `<div class="table-sections-grid">
    ${filteredGroups.map(g => {
      const isExpanded = state.expandedTables[g.table] !== undefined
        ? !!state.expandedTables[g.table]
        : (!g.isVacant && (g.hasNew || g.activeOrdersCount > 0));
      return tableSectionView(g, isExpanded);
    }).join('')}
  </div>`;
}

function ordersPage(){
  let groups = getCafeTableGroups();
  let totalActiveTables = groups.filter(g => !g.isVacant).length;
  let newTablesCount = groups.filter(g => g.hasNew).length;
  let vacantTablesCount = groups.filter(g => g.isVacant).length;
  let totalOrdersCount = myOrders().length;
  let activeFilter = state.orderStatusFilter || 'all';
  let searchQuery = (state.orderSearchQuery || '').toLowerCase().trim();

  let filtered = groups.filter(g => {
    if (activeFilter === 'new' && !g.hasNew) return false;
    if (activeFilter === 'active' && g.isVacant) return false;
    if (activeFilter === 'vacant' && !g.isVacant) return false;
    if (searchQuery) {
      const matchTable = `table ${g.table}`.includes(searchQuery) || g.table.includes(searchQuery);
      const matchGuest = (g.customerName || '').toLowerCase().includes(searchQuery);
      const matchOrder = g.orders.some(o => o.id.toLowerCase().includes(searchQuery) || (o.items || []).some(i => i.name.toLowerCase().includes(searchQuery)));
      if (!matchTable && !matchGuest && !matchOrder) return false;
    }
    return true;
  });

  return `<section class="panel table-orders-panel">
    <div class="orders-management-header">
      <div class="orders-title-block">
        <h2 class="panel-title">Table Orders & Service Board</h2>
        <p class="panel-sub">Each dining table session is independently tracked with live ring alerts & offline bill settlement</p>
      </div>
      <div class="orders-quick-metrics">
        <div class="metric-pill ${newTablesCount > 0 ? 'alert' : ''}">
          <span class="metric-icon">${icon('bell-ring')}</span>
          <span><b>${newTablesCount}</b> New Table ${newTablesCount === 1 ? 'Alert' : 'Alerts'}</span>
        </div>
        <div class="metric-pill active">
          <span class="metric-icon">${icon('armchair')}</span>
          <span><b>${totalActiveTables}</b> Active Dining ${totalActiveTables === 1 ? 'Table' : 'Tables'}</span>
        </div>
        <div class="metric-pill">
          <span class="metric-icon">${icon('shield-check')}</span>
          <span><b>${vacantTablesCount}</b> Ready / Vacant</span>
        </div>
        <div class="metric-pill">
          <span class="metric-icon">${icon('receipt')}</span>
          <span><b>${totalOrdersCount}</b> Orders Today</span>
        </div>
      </div>
    </div>
    <div class="section-bar orders-filter-bar">
      <div class="filter-row">
        <div class="search-wrap">
          ${icon('search')}
          <input class="search" id="order-search-input" placeholder="Search table, guest, item or Order ID..." value="${esc(state.orderSearchQuery || '')}">
        </div>
        <div class="filter-tabs-pills">
          <button type="button" class="filter-tab-pill ${activeFilter === 'all' ? 'active' : ''}" data-filter-tab="all">All Tables (${groups.length})</button>
          <button type="button" class="filter-tab-pill ${activeFilter === 'new' ? 'active' : ''} ${newTablesCount > 0 ? 'has-badge' : ''}" data-filter-tab="new">${icon('bell-ring')} Needs Action (${newTablesCount})</button>
          <button type="button" class="filter-tab-pill ${activeFilter === 'active' ? 'active' : ''}" data-filter-tab="active">Active Dining (${totalActiveTables})</button>
          <button type="button" class="filter-tab-pill ${activeFilter === 'vacant' ? 'active' : ''}" data-filter-tab="vacant">Ready / Vacant (${vacantTablesCount})</button>
        </div>
      </div>
      <div class="view-mode-toggle">
        <button type="button" class="outline ${state.orderViewMode !== 'list' ? 'active' : ''}" id="view-mode-tables" title="Organized Table View">${icon('layout-grid')} Table Sections</button>
        <button type="button" class="outline ${state.orderViewMode === 'list' ? 'active' : ''}" id="view-mode-list" title="Flat List View">${icon('list')} All Orders List</button>
      </div>
    </div>
    <div id="orders-content-container">
      ${state.orderViewMode === 'list' ? ordersTable(myOrders()) : renderTableSections(filtered)}
    </div>
  </section>`;
}

function restartTableOrder(tableNum) {
  const cleanTbl = String(tableNum).padStart(2, '0');
  const cId = cafe().id;
  const currentResetTime = (db.tableResets && db.tableResets[`${cId}_${cleanTbl}`]) || 0;
  
  // Find all active orders for this table session
  const tableOrders = db.orders.filter(o => 
    o.cafeId === cId && 
    String(o.table).padStart(2, '0') === cleanTbl &&
    (o.timestamp || 0) > currentResetTime
  );
  
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
  }

  save();
  playNotificationSound();
  toast(`🎉 Table ${cleanTbl} bill settled offline & session closed! Ready for next guest.`);
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
  return `<div style="overflow:auto"><table class="table"><thead><tr><th>Order</th><th>Table & time</th><th>Items</th><th>Total</th><th>Status</th><th>Update</th></tr></thead><tbody>${data.length?data.map(o=>`<tr><td><div class="cell-title">${esc(o.id)}</div><div class="cell-sub">${esc(o.date || 'Today')}</div></td><td><div class="table-badge">${esc(o.table)}</div><div class="cell-sub">${esc(o.time)}</div></td><td>${o.items.map(i=>`<div class="cell-sub">${i.qty}× ${esc(i.name)}</div>`).join('')}</td><td class="cell-title">${money(o.total)}</td><td><span class="status ${statusClass(o.status)}">${o.status}</span></td><td><select class="select order-status" data-order="${o.id}" style="height:34px"><option ${o.status==='New'?'selected':''}>New</option><option ${o.status==='Preparing'?'selected':''}>Preparing</option><option ${o.status==='Ready'?'selected':''}>Ready</option><option ${o.status==='Completed'?'selected':''}>Completed</option><option ${o.status==='Cancelled'?'selected':''}>Cancelled</option></select></td></tr>`).join(''):`<tr><td colspan="6"><div class="empty">No orders match those filters.</div></td></tr>`}</tbody></table></div>`;
}

function menuPage(){
  let menu = myMenu();
  return `<section class="section-bar"><div class="filter-row"><div class="search-wrap">${icon('search')}<input class="search" id="menu-search" placeholder="Search menu"></div><select class="select" id="menu-filter"><option>All categories</option>${categories().map(c=>`<option>${esc(c)}</option>`).join('')}</select></div><span class="panel-sub">${menu.filter(x=>x.available).length} items live</span></section><section class="grid menu-grid" id="menu-grid">${menuCards(menu)}</section>`;
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
  return `<section class="panel form-panel"><h2 class="panel-title">Your café profile</h2><p class="panel-sub">These details belong to your café and are presented to guests on your menu.</p><form id="profile-form" style="margin-top:24px"><div class="field"><label>Guest menu café name</label><input name="name" required value="${esc(c.name)}"></div><div class="field"><label>Café slug / identifier</label><input name="slug" required value="${esc(c.slug || c.username)}"></div><div class="field"><label>Short description</label><textarea name="description">${esc(c.description)}</textarea></div><div class="settings-grid"><div class="field"><label>Opens at</label><input name="opensAt" type="time" value="${c.opensAt}"></div><div class="field"><label>Open until</label><input name="closesAt" type="time" value="${c.closesAt}"></div></div><div class="field"><label>Contact number</label><input name="contact" value="${esc(c.contact)}"></div><div class="field"><label>Address</label><input name="address" required value="${esc(c.address)}"></div><button class="primary" type="submit">Save profile</button></form></section>`;
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

  return `<main class="customer"><nav class="customer-nav"><div class="customer-brand-group"><button class="customer-brand" id="customer-home"><span class="brand-title">${esc(c.name)}</span><span class="brand-sub">${icon('map-pin')} ${esc(locationSummary)}</span></button></div><div class="customer-nav-actions">${sessionOrders.length > 0 ? `<button class="outline" id="nav-btn-orders-tracker" style="padding:6px 14px;font-size:12px;border-radius:20px;font-weight:700;display:inline-flex;align-items:center;gap:6px;background:#fbf6ef;color:#704214;border-color:#d5bc9f;" title="View all ordered items and running table bill">${icon('clipboard-list')} <span>Table Orders (${sessionOrders.length}) · ${money(grandTotal)}</span></button>` : ''}<button class="outline" id="btn-switch-table" style="padding:6px 12px;font-size:12px;border-radius:20px;font-weight:600;" title="Switch Table QR">${icon('camera')} <span>Switch Table</span></button><button class="cart-trigger" id="cart-open" aria-label="Cart">${icon('shopping-bag')}<span class="cart-label">Cart</span><b class="cart-count">${cartCount}</b></button><button class="staff-link-btn" id="go-login" title="Staff Portal" aria-label="Staff Login">${icon('key-round')} <span class="staff-label">Staff</span></button></div></nav><div style="text-align:center;padding:8px 12px 0;"><span class="scanned-table-pill">${icon('shield-check')} <span>Table <b>${esc(state.table)}</b> · Active QR Session</span></span></div>${sessionOrders.length > 0 ? `<div class="active-order-banner ${statusClass(bannerStatus)}" id="active-order-bar" style="cursor:pointer;" title="Click to view all table orders and running bill"><div class="banner-info"><span class="pulse-dot"></span><div class="banner-text"><span class="banner-title">Table <b>${esc(state.table)}</b>: ${sessionOrders.length} ${sessionOrders.length === 1 ? 'Order Active' : 'Orders Active'} (${totalItemsCount} items) · Running Total: <b>${money(grandTotal)}</b></span><span class="banner-sub">${hasReady ? '🎉 Your food is ready for you!' : hasPrep ? '☕ Baristas and kitchen are preparing your items' : 'Orders received at the counter'}</span></div></div><button class="banner-btn" id="banner-track-btn"><span>Track Orders & Bill (${money(grandTotal)})</span> ${icon('arrow-right')}</button></div>` : ''}<section class="customer-hero"><div class="hero-image" style="background-image:linear-gradient(180deg,rgba(31,23,18,.25),rgba(31,23,18,.8)),url('${c.image}')"><div class="hero-content"><div class="eyebrow" style="color:#e5bd7d">A considered café experience</div><h1>${esc(c.name)}</h1><p>${esc(c.description)}</p><div class="hero-meta"><span>${icon('map-pin')} ${esc(fullAddress)}</span><span>${icon('clock-3')} Open until ${clockLabel(c.closesAt)}</span></div></div></div></section><section class="customer-content"><div class="category-tabs">${cats.map(x=>`<button class="customer-cat ${state.customerCategory===x?'active':''}" data-cat="${esc(x)}">${esc(x)}</button>`).join('')}</div><div class="menu-header"><div><h2>Made for the moment</h2><p>Choose something you’ll look forward to.</p></div><span class="panel-sub">${menu.filter(m=>m.available).length} items</span></div><div class="customer-menu">${menu.filter(m=>m.available&&(state.customerCategory==='All'||m.category===state.customerCategory)).map(m=>`<article class="customer-card"><img src="${m.image}" alt="${esc(m.name)}"><div class="customer-card-content"><div class="tag">${esc(m.category)} · ${m.veg?'Vegetarian':'Non-vegetarian'}</div><h3>${esc(m.name)}</h3><p>${esc(m.description)}</p><div class="customer-card-footer"><strong class="price">${money(m.price)}</strong><button class="add-btn" data-add="${m.id}" aria-label="Add ${esc(m.name)}">+</button></div></div></article>`).join('')}</div></section>${cartDrawer()}${cartCount > 0 && !state.cartOpen ? `<aside class="mobile-cart-bar-wrap"><button class="mobile-cart-bar" id="floating-cart-btn" aria-label="View Cart and Checkout"><div class="mobile-cart-left"><div class="mobile-cart-badge">${cartCount}</div><div class="mobile-cart-info"><div class="mobile-cart-heading">${cartCount} ${cartCount === 1 ? 'item' : 'items'} in order</div><div class="mobile-cart-total">${money(cartSubtotal)}</div></div></div><div class="mobile-cart-right"><span>View Order</span> ${icon('arrow-right')}</div></button></aside>` : (sessionOrders.length > 0 && !state.cartOpen ? `<aside class="mobile-cart-bar-wrap"><button class="mobile-cart-bar" id="floating-track-btn" style="background:#281811;border-color:#b99264;" aria-label="View Table Orders and Running Bill"><div class="mobile-cart-left"><div class="mobile-cart-badge" style="background:#deb57b;color:#281811;">${sessionOrders.length}</div><div class="mobile-cart-info"><div class="mobile-cart-heading">Table ${esc(state.table)} · ${totalItemsCount} items ordered</div><div class="mobile-cart-total" style="color:#d5f3df;">${money(grandTotal)}</div></div></div><div class="mobile-cart-right"><span>View Bill</span> ${icon('arrow-right')}</div></button></aside>` : '')}</main>`;
}

function cartDrawer(){
  let items = state.cart.map(x=>({...myMenu().find(m=>m.id===x.id),qty:x.qty})), sub = items.reduce((a,x)=>a+x.price*x.qty,0), tax = Math.round(sub*.05);

  return `<div class="drawer-backdrop ${state.cartOpen?'open':''}" id="cart-backdrop"></div><aside class="cart-drawer ${state.cartOpen?'open':''}"><div class="drawer-head"><h2>Your order</h2><button class="icon-btn" id="cart-close">${icon('x')}</button></div><div class="cart-items">${items.length?items.map(x=>`<div class="cart-item"><img src="${x.image}"><div><strong>${esc(x.name)}</strong><div class="cell-sub">${money(x.price)}</div><div class="qty"><button data-qty="${x.id}" data-change="-1">−</button><b>${x.qty}</b><button data-qty="${x.id}" data-change="1">+</button></div></div><button class="remove" data-remove="${x.id}">Remove</button></div>`).join(''):`<div class="empty">Your cart is waiting for something delicious.</div>`}</div>${items.length?`<div class="cart-summary"><div class="table-lock-box"><div class="table-lock-header"><span>Dining Table</span><span class="table-verified-status">${icon('shield-check')} QR Verified</span></div><div class="table-display-value"><span>Table ${esc(state.table)}</span><small style="font-size:11px;font-weight:600;color:var(--muted)">🔒 Locked to Standee</small></div></div><div class="field table-input"><label>Your name</label><input id="customer-name" maxlength="80" required placeholder="e.g. Ananya Sharma" value="${esc(state.customerName||'')}"></div><div class="sum-row"><span>Subtotal</span><span>${money(sub)}</span></div><div class="sum-row"><span>Taxes (5%)</span><span>${money(tax)}</span></div><div class="sum-row total"><span>Grand total</span><span>${money(sub+tax)}</span></div><button class="primary place-order" id="place-order">Place order ${icon('arrow-right')}</button></div>`:''}</aside>`;
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
  let grandTotal = 0;
  let totalItemsCount = 0;

  sessionOrders.forEach(ord => {
    grandTotal += (ord.total || 0);
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
  const subtotal = Math.round(grandTotal / 1.05);
  const tax = grandTotal - subtotal;

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

  return `<main class="customer"><nav class="customer-nav"><div class="customer-brand-group"><button class="customer-brand" id="customer-home"><span class="brand-title">${esc(c.name)}</span><span class="brand-sub">${icon('map-pin')} ${esc(locationSummary)}</span></button></div><div class="customer-nav-actions"><button class="primary" id="browse-menu-btn" style="padding:6px 14px;font-size:12px;border-radius:18px;">${icon('plus')} + Order More Items</button><button class="staff-link-btn" id="go-login" title="Staff Portal">${icon('key-round')}</button></div></nav><section class="confirmation"><div class="confirm-icon" style="${isReady ? 'background:#d7eee1;color:#287449;' : isPrep ? 'background:#ece1fa;color:#6b3bb8;' : ''}">${icon(isReady ? 'bell' : isPrep ? 'coffee' : 'check')}</div><span style="font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${statusBadgeColor};background:${statusBadgeBg};padding:5px 12px;border-radius:15px;display:inline-block;margin-bottom:10px;">${statusBadgeText}</span><h1>Table ${esc(state.table)} — Active Dining Orders</h1><p>${statusMessage}</p><div class="session-cumulative-card guest-total-bill-card"><div class="session-cumulative-head"><div><h3>${icon('receipt')} Table ${esc(state.table)} Running Bill & Item Summary</h3><p class="panel-sub" style="margin:4px 0 0;font-size:11.5px;color:var(--muted);">All items ordered for this table across ${sessionOrders.length} ${sessionOrders.length === 1 ? 'order batch' : 'order batches'} until bill settlement</p></div><span class="session-cumulative-badge">${totalItemsCount} total items</span></div><div class="session-order-items">${allOrderedItems.map(i => `<div class="session-item-row"><span class="session-item-name"><b class="guest-qty-pill">${i.qty}×</b> ${esc(i.name)} <small class="item-unit-pill">(${money(i.price)} ea)</small></span><strong class="session-item-price">${money(i.price * i.qty)}</strong></div>`).join('')}</div><div class="guest-bill-breakdown"><div class="guest-bill-row"><span>Items Subtotal</span><b>${money(subtotal)}</b></div><div class="guest-bill-row"><span>Taxes & GST (5%)</span><b>${money(tax)}</b></div><div class="session-cumulative-total"><div style="display:flex;flex-direction:column;gap:2px;"><span style="font-size:14px;color:var(--coffee-dark);">Total Table Bill (Running Total)</span><small style="font-size:11px;font-weight:600;color:var(--muted);">💳 Pay at counter / offline when finished dining</small></div><strong class="grand-total-amount">${money(grandTotal)}</strong></div></div></div><div class="session-orders-wrap"><h3 style="margin:0 0 10px;font-size:16px;font-family:var(--serif);color:var(--coffee-dark);display:flex;justify-content:space-between;align-items:center;"><span>${icon('clipboard-list')} Order Batches Placed (${sessionOrders.length})</span><span class="session-order-count-chip">${sessionOrders.length} ${sessionOrders.length === 1 ? 'Batch' : 'Batches'}</span></h3>${sessionOrders.map((ord, idx) => `<article class="session-order-card ${idx === 0 ? 'latest-batch-card' : ''}"><div class="session-order-head"><div class="session-order-id-group"><span class="session-order-id">Order #${esc(ord.id)} ${idx === 0 ? '<span class="latest-tag-badge">Latest Order</span>' : `<span class="batch-num-badge">Batch #${sessionOrders.length - idx}</span>`}</span><span class="session-order-time">${icon('clock-3')} Placed at ${esc(ord.time || 'Today')} · Table ${esc(ord.table)}</span></div><span class="status ${statusClass(ord.status)}">${ord.status === 'Ready' ? '🎉 Ready' : ord.status === 'Preparing' ? '☕ Preparing' : ord.status}</span></div><div class="order-mini-tracker"><div class="tracker-step ${['New','Preparing','Processing','Ready','Completed'].includes(ord.status)?'active':''}">Received</div><div class="tracker-step ${['Preparing','Processing','Ready','Completed'].includes(ord.status)?(ord.status==='Preparing'?'preparing active':'active'):''}">Preparing</div><div class="tracker-step ${['Ready','Completed'].includes(ord.status)?(ord.status==='Ready'?'ready active':'active'):''}">Ready</div><div class="tracker-step ${ord.status==='Completed'?'active':''}">Served</div></div><div class="session-order-items">${(ord.items || []).map(i => `<div class="session-item-row"><span class="session-item-name"><b>${i.qty}×</b> ${esc(i.name)}</span><span class="session-item-price">${money(i.price * i.qty)}</span></div>`).join('')}</div><div class="session-order-subtotal"><span>Batch Amount (incl. tax)</span><strong>${money(ord.total)}</strong></div></article>`).join('')}</div><div class="wifi-box"><h3>${icon('wifi')} Café Wi-Fi</h3><div class="wifi-detail">Network: <b>${esc(c.wifi.ssid)}</b></div><div class="wifi-detail">Password: <b id="wifi-pass">${esc(c.wifi.password)}</b> <button type="button" class="outline" id="copy-wifi" style="padding:4px 8px;margin-left:6px;font-size:11px;border-radius:6px;">Copy</button></div></div><div style="display:flex;flex-direction:column;gap:10px;align-items:center;margin-top:22px;width:100%;max-width:380px;"><button type="button" class="primary" id="new-order" style="width:100%;border-radius:12px;padding:13px 20px;font-size:14px;font-weight:700;">${icon('plus')} + Order More Items for Table ${esc(state.table)}</button><button type="button" class="outline" id="btn-refresh-guest-status" style="width:100%;border-radius:12px;padding:10px 16px;font-size:12px;font-weight:600;">${icon('refresh-cw')} Refresh Order Status</button></div></section></main>`;
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

  $('#floating-cart-btn')?.addEventListener('click', () => {
    state.cartOpen = true;
    render();
  });
  
  $('#login-form')?.addEventListener('submit', e => {
    e.preventDefault();
    let u = ($('#username')?.value || '').trim();
    let p = $('#password')?.value || '';
    let matchingCafe = db.cafes.find(c => (c.username === u || (u === 'juniper' && c.username === 'eatngreet') || (u === 'eatngreet' && c.username === 'eatngreet') || c.slug === u) && c.password === p && c.status === 'Active');
    let valid = state.role === 'admin' ? u === 'admin' && p === 'admin123' : !!matchingCafe;
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
  $$('.status-toggle').forEach(b => b.onclick = () => {
    let c = db.cafes.find(c => c.id === b.dataset.cafe);
    c.status = c.status === 'Active' ? 'Inactive' : 'Active';
    save();
    render();
    toast(`Café ${c.status.toLowerCase()}`);
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

  $('#menu-search')?.addEventListener('input', filterMenu);
  $('#menu-filter')?.addEventListener('change', filterMenu);
  $('#order-search')?.addEventListener('input', filterOrders);
  $('#status-filter')?.addEventListener('change', filterOrders);
  
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

  $('#brand-form')?.addEventListener('submit', e => {
    e.preventDefault();
    let f = new FormData(e.target);
    let companyName = f.get('companyName')?.trim();
    let adminName = f.get('adminName')?.trim();
    let adminEmail = f.get('adminEmail')?.trim();
    if(companyName) db.platform.companyName = companyName;
    if(adminName) db.platform.adminName = adminName;
    if(adminEmail) db.platform.adminEmail = adminEmail;
    save();
    render();
    toast('Company settings updated');
  });

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
    Object.assign(cafe(), Object.fromEntries(f));
    save();
    render();
    toast('Café profile updated');
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

  $$('.customer-cat').forEach(b => b.onclick = () => {
    state.customerCategory = b.dataset.cat;
    render();
  });

  $$('[data-add]').forEach(b => b.onclick = () => {
    let ex = state.cart.find(x => x.id === b.dataset.add);
    let item = myMenu().find(m => m.id === b.dataset.add);
    ex ? ex.qty++ : state.cart.push({id: b.dataset.add, qty: 1});
    state.cartOpen = false;
    render();
    toast(`Added ${item ? item.name : 'item'} to cart`);
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
  
  $('#customer-name')?.addEventListener('input', e => {
    state.customerName = e.target.value;
    saveSession();
  });

  $$('[data-qty]').forEach(b => b.onclick = () => {
    let x = state.cart.find(x => x.id === b.dataset.qty);
    if(x){
      x.qty += +b.dataset.change;
      if(x.qty <= 0) state.cart = state.cart.filter(i => i !== x);
      render();
    }
  });

  $$('[data-remove]').forEach(b => b.onclick = () => {
    state.cart = state.cart.filter(x => x.id !== b.dataset.remove);
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

  $('#floating-track-btn')?.addEventListener('click', () => {
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
    render();
  });
}

function filterMenu(){
  let q = ($('#menu-search')?.value || '').toLowerCase();
  let cat = $('#menu-filter')?.value || 'All categories';
  let el = $('#menu-grid');
  if(el) el.innerHTML = menuCards(myMenu().filter(m => (m.name + m.category).toLowerCase().includes(q) && (cat === 'All categories' || m.category === cat)));
}

function filterOrders(){
  let q = ($('#order-search')?.value || '').toLowerCase();
  let s = $('#status-filter')?.value || 'All orders';
  let el = $('#orders-table');
  let countLabel = $('#order-count-label');
  let filtered = myOrders().filter(o => (o.id + o.table).toLowerCase().includes(q) && (s === 'All orders' || o.status === s));
  if(el){
    el.innerHTML = ordersTable(filtered);
    $$('.order-status', el).forEach(sel => sel.onchange = () => {
      let o = db.orders.find(ord => ord.id === sel.dataset.order);
      if(o){
        o.status = sel.value;
        save();
        toast(`${o.id} is now ${o.status}`);
        filterOrders();
      }
    });
  }
  if(countLabel){
    countLabel.textContent = `${myOrders().length} orders today`;
  }
}

function cafeModal(edit){
  let isEdit = !!edit;
  modal(`<h2>${isEdit ? 'Edit café' : 'Create a café account'}</h2><form id="cafe-form"><div class="field"><label>Café name</label><input name="name" required value="${esc(edit?.name || '')}"></div><div class="settings-grid"><div class="field"><label>Username / Slug</label><input name="username" required value="${esc(edit?.username || '')}"></div><div class="field"><label>Password</label><input name="password" required value="${esc(edit?.password || '')}"></div></div><div class="field"><label>Contact</label><input name="contact" required value="${esc(edit?.contact || '')}"></div><div class="field"><label>Address</label><input name="address" required value="${esc(edit?.address || '')}"></div>${isEdit ? `<div class="field"><label>Anti-Tamper Security Key (Admin Only)</label><div style="display:flex;gap:8px;align-items:center"><input id="modal-key-display" value="${esc(edit.qrSecret || '')}" readonly style="background:#f5f3ef;font-family:monospace;font-size:11px;"><button type="button" class="outline" id="modal-btn-rotate-key" style="white-space:nowrap;padding:6px 12px;font-size:11px;">${icon('refresh-cw')} Rotate Key</button></div><small style="font-size:11px;color:var(--muted)">Rotating this key will invalidate older physical QR standees for this café.</small></div>` : ''}<div class="modal-actions"><button type="button" class="outline modal-close">Cancel</button>${isEdit ? `<button type="button" class="danger" id="delete-cafe">Delete</button>` : ''}<button class="primary">${isEdit ? 'Save changes' : 'Create café'}</button></div></form>`);
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

  const form = $('#cafe-form');
  if(form){
    form.onsubmit = e => {
      e.preventDefault();
      let v = Object.fromEntries(new FormData(e.target));
      if(isEdit) Object.assign(edit, v);
      else {
        let id = `CAF-${String(db.cafes.length + 1).padStart(3, '0')}`;
        db.cafes.push({
          id,
          ...v,
          slug: v.username.toLowerCase(),
          qrSecret: `eng_sec_${id.toLowerCase()}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`,
          status: 'Active',
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
  let customerName = $('#customer-name')?.value.trim();
  if(!customerName) return toast('Please enter your name');
  let items = state.cart.map(x => {
    let m = myMenu().find(m => m.id === x.id);
    return { name: m.name, qty: x.qty, price: m.price, isNew: true };
  });
  let subtotal = items.reduce((a, i) => a + i.qty * i.price, 0);
  let tax = Math.round(subtotal * 0.05);
  let id = `ORD-${Math.max(1000, ...db.orders.map(o => +o.id.split('-')[1] || 0)) + 1}`;
  let o = {
    id,
    cafeId: cafe().id,
    customerName,
    table: String(table).padStart(2, '0'),
    qrVerified: true,
    items,
    total: subtotal + tax,
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
      body: JSON.stringify({ ...o, cafeName: cafe().name, subtotal, tax, createdAt: new Date().toLocaleString('en-IN') })
    }).catch(()=>{});
  } catch(error) {}
  state.cart = [];
  state.cartOpen = false;
  state.view = 'confirmation';
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
          
          db = serverDb;
          lastDbSnapshot = serverSnapshot;
          localStorage.setItem('juniper-db', JSON.stringify(db));

          // Check if cafe received new orders
          const newOrders = (db.orders || []).filter(o => !oldIds.has(o.id) && o.cafeId === cafe().id);
          if(state.role === 'cafe' && newOrders.length > 0){
            playNotificationSound();
            const latestNew = newOrders[0];
            toast(`🔔 New Order received from Table ${latestNew.table || '01'} (${latestNew.customerName || 'Guest'})!`);
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
        const oldOrders = db.orders || [];
        const oldIds = new Set(oldOrders.map(o => o.id));
        const newOrders = (freshDb.orders || []).filter(o => !oldIds.has(o.id) && o.cafeId === cafe().id);

        db = freshDb;
        lastDbSnapshot = JSON.stringify(db);
        
        if(state.role === 'cafe' && newOrders.length > 0){
          playNotificationSound();
          const latestNew = newOrders[0];
          toast(`🔔 New Order from Table ${latestNew.table || '01'} (${latestNew.customerName || 'Guest'})!`);
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
