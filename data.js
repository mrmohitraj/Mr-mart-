/* ===================================================================
   MR FASAL WALA — DATA MODULE
   Static catalog data + helpers. In a backend-connected build this
   file would be replaced by API/Firestore/Supabase calls, which is
   why every read goes through the DataAPI functions below.
=================================================================== */

const CROP_CATEGORIES = [
  { id:'wheat',     name:'Wheat',     icon:'🌾', unit:'quintal' },
  { id:'paddy',     name:'Paddy',     icon:'🌾', unit:'quintal' },
  { id:'rice',      name:'Rice',      icon:'🍚', unit:'quintal' },
  { id:'maize',     name:'Maize',     icon:'🌽', unit:'quintal' },
  { id:'mustard',   name:'Mustard',   icon:'🌼', unit:'quintal' },
  { id:'gram',      name:'Gram',      icon:'🫘', unit:'quintal' },
  { id:'lentils',   name:'Lentils',   icon:'🫘', unit:'quintal' },
  { id:'soybean',   name:'Soybean',   icon:'🌱', unit:'quintal' },
  { id:'bajra',     name:'Bajra',     icon:'🌾', unit:'quintal' },
  { id:'jowar',     name:'Jowar',     icon:'🌾', unit:'quintal' },
  { id:'potato',    name:'Potato',    icon:'🥔', unit:'quintal' },
  { id:'onion',     name:'Onion',     icon:'🧅', unit:'quintal' },
  { id:'tomato',    name:'Tomato',    icon:'🍅', unit:'quintal' },
  { id:'garlic',    name:'Garlic',    icon:'🧄', unit:'quintal' },
  { id:'ginger',    name:'Ginger',    icon:'🫚', unit:'quintal' },
  { id:'fruits',    name:'Fruits',    icon:'🍎', unit:'quintal' },
  { id:'vegetables',name:'Vegetables',icon:'🥦', unit:'quintal' },
];

const WASTE_CATEGORIES = [
  { id:'paddy-husk',      name:'Paddy Husk',       icon:'🌾', unit:'ton' },
  { id:'rice-bran',       name:'Rice Bran',        icon:'🌾', unit:'ton' },
  { id:'wheat-straw',     name:'Wheat Straw',      icon:'🌿', unit:'ton' },
  { id:'bagasse',         name:'Bagasse',          icon:'🎋', unit:'ton' },
  { id:'corn-cob',        name:'Corn Cob',         icon:'🌽', unit:'ton' },
  { id:'corn-husk',       name:'Corn Husk',        icon:'🌽', unit:'ton' },
  { id:'mustard-cake',    name:'Mustard Cake',     icon:'🟤', unit:'ton' },
  { id:'groundnut-shell', name:'Groundnut Shell',  icon:'🥜', unit:'ton' },
  { id:'coconut-shell',   name:'Coconut Shell',    icon:'🥥', unit:'ton' },
  { id:'coconut-fiber',   name:'Coconut Fiber',    icon:'🥥', unit:'ton' },
  { id:'cotton-waste',    name:'Cotton Waste',     icon:'☁️', unit:'ton' },
  { id:'saw-dust',        name:'Saw Dust',         icon:'🪵', unit:'ton' },
  { id:'wood-chips',      name:'Wood Chips',       icon:'🪵', unit:'ton' },
  { id:'bamboo-waste',    name:'Bamboo Waste',     icon:'🎍', unit:'ton' },
];

const LOCATIONS = [
  ['Ludhiana','Punjab'], ['Karnal','Haryana'], ['Meerut','Uttar Pradesh'],
  ['Indore','Madhya Pradesh'], ['Nashik','Maharashtra'], ['Kota','Rajasthan'],
  ['Guntur','Andhra Pradesh'], ['Mysuru','Karnataka'], ['Coimbatore','Tamil Nadu'],
  ['Patna','Bihar'], ['Bhopal','Madhya Pradesh'], ['Rajkot','Gujarat'],
  ['Amritsar','Punjab'], ['Hisar','Haryana'], ['Nagpur','Maharashtra'],
  ['Jalgaon','Maharashtra'], ['Bathinda','Punjab'], ['Kanpur','Uttar Pradesh'],
];

const SELLERS = [
  'Ramesh Farms','Green Valley Agro','Punjab AgriTrust','Suresh Kisan Bhandar',
  'Kaveri Organic Farms','Annapurna Agro Co.','Bharat Crop Traders','Sunrise Agri Exports',
  'Malwa Farmers Collective','Deccan Grain House','Godavari Fresh Produce','Himalayan Harvest Co.'
];

function seededRandom(seed){
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

const CROP_DESCRIPTIONS = {
  wheat:'Premium quality wheat, sun-dried and cleaned, ideal for flour milling with high gluten content.',
  paddy:'Freshly harvested paddy with uniform grain size, low moisture content, suitable for milling.',
  rice:'Aromatic, long-grain rice, properly polished and sorted for consistent cooking quality.',
  maize:'Bright yellow maize kernels, hybrid variety, high starch content, ideal for feed and food processing.',
  mustard:'Golden mustard seeds with high oil content, cold-pressed grade, cleaned and sieved.',
  gram:'Bold chickpea (gram) grains, uniform size, low broken percentage, great for dal and besan.',
  lentils:'Split and whole lentils, machine-cleaned, high protein content, ready for retail packaging.',
  soybean:'Non-GMO soybean, high protein yield, suitable for oil extraction and animal feed.',
  bajra:'Pearl millet (bajra), drought-resistant crop variety, rich in iron and fibre.',
  jowar:'Sorghum (jowar) grain, gluten-free, ideal for flour and poultry feed.',
  potato:'Farm-fresh potatoes, medium to large size, low sprouting, cold-storage ready.',
  onion:'Red onions, firm and well-cured, low moisture, ideal for long-distance transport.',
  tomato:'Vine-ripened tomatoes, firm texture, deep red colour, minimal blemishes.',
  garlic:'Solid garlic bulbs, strong aroma, well-cured with minimal moisture loss.',
  ginger:'Fresh ginger rhizomes, high pungency, cleaned and graded for export quality.',
  fruits:'Seasonal, orchard-fresh fruit, hand-picked and graded for size and sweetness.',
  vegetables:'Farm-fresh, pesticide-tested vegetables harvested within 24 hours of listing.',
};
const WASTE_DESCRIPTIONS = {
  'paddy-husk':'Clean paddy husk, ideal for biomass fuel, boiler firing and packaging filler.',
  'rice-bran':'De-oiled rice bran, high fibre content, suitable for cattle feed and oil extraction.',
  'wheat-straw':'Baled wheat straw, dry and pest-free, used for cattle fodder and mushroom cultivation.',
  'bagasse':'Sugarcane bagasse, fibrous residue perfect for paper pulp and biomass briquettes.',
  'corn-cob':'Dried corn cob, ground-ready, used in biomass pellets and abrasive manufacturing.',
  'corn-husk':'Dried corn husk, lightweight and biodegradable, ideal for packaging and craft use.',
  'mustard-cake':'Mustard oil cake, protein-rich residue, excellent organic manure and cattle feed.',
  'groundnut-shell':'Crushed groundnut shell, low ash content, used as boiler fuel and filler material.',
  'coconut-shell':'Sun-dried coconut shell, high calorific value, ideal for charcoal and activated carbon.',
  'coconut-fiber':'Coir coconut fiber, durable and biodegradable, used in mats, ropes and geotextiles.',
  'cotton-waste':'Ginned cotton waste, soft fibre residue, used in yarn spinning and stuffing.',
  'saw-dust':'Fine dry saw dust, uniform texture, ideal for briquettes, particle board and composting.',
  'wood-chips':'Seasoned wood chips, consistent size, used for biomass boilers and mulching.',
  'bamboo-waste':'Chipped bamboo waste, renewable biomass source for pulp, board and fuel pellets.',
};

const STATIC_PRODUCTS = []; // Demo products removed — only seller-added listings show here now.

const MARKET_PRICES = CROP_CATEGORIES.slice(0,8).map((c,i)=>({
  name:c.name,
  price: Math.round((900+seededRandom(i*3+1)*3200)/10)*10,
  unit:c.unit,
  change: (seededRandom(i*9+2)*6 - 3).toFixed(1),
}));

const REVIEWS = [
  { name:'Harpreet Singh', text:'Bought 5 quintals of wheat — quality was exactly as described and delivery was quick.', stars:5 },
  { name:'Lakshmi Naidu',  text:'Great platform for selling paddy husk directly to buyers, no middlemen commission.', stars:5 },
  { name:'Manoj Patel',    text:'Onion prices were fair and the seller was verified. Will order again next season.', stars:4 },
  { name:'Ayesha Khatoon', text:'Sold my cotton waste stock within two days of listing. Very smooth experience.', stars:5 },
  { name:'Ravi Teja',      text:'The app made comparing mandi prices across districts really simple.', stars:4 },
  { name:'Devinder Kaur',  text:'Customer support helped resolve a delivery delay quickly. Appreciate the service.', stars:4 },
];

/* ============== DataAPI — swap internals for a real backend later ============== */
const DataAPI = {
  getAllProducts(){
    const custom = Storage.get('customListings', []);
    return [...custom, ...STATIC_PRODUCTS];
  },
  getProductById(id){
    return this.getAllProducts().find(p => p.id === id);
  },
  getByCategory(category){
    return this.getAllProducts().filter(p => p.category === category);
  },
  search(query, list){
    const src = list || this.getAllProducts();
    if(!query) return src;
    const q = query.toLowerCase();
    return src.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.subCategoryName.toLowerCase().includes(q) ||
      p.district.toLowerCase().includes(q) ||
      p.state.toLowerCase().includes(q) ||
      p.seller.toLowerCase().includes(q)
    );
  },
  getRelated(product, count=6){
    return this.getAllProducts()
      .filter(p => p.subCategory === product.subCategory && p.id !== product.id)
      .concat(this.getAllProducts().filter(p=>p.category===product.category && p.subCategory!==product.subCategory))
      .slice(0, count);
  },
  getTrending(count=8){
    return [...this.getAllProducts()].sort((a,b)=>b.rating-a.rating).slice(0,count);
  },
  getTopSellers(count=8){
    const map = {};
    this.getAllProducts().forEach(p=>{ map[p.seller] = (map[p.seller]||0) + (p.reviewCount||1); });
    return Object.entries(map).sort((a,b)=>b[1]-a[1]).slice(0,count).map(([name,score])=>({name,score}));
  }
};

/* WhatsApp number that receives order notifications. Replace with your own number
   in international format, no + or spaces — e.g. 919876543210 for +91 98765 43210 */
const OWNER_WHATSAPP_NUMBER = "916200873964";
