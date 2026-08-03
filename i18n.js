/* ===================================================================
   MR FASAL WALA — LANGUAGE (i18n) SYSTEM
   Simple key-based translation for Hindi / English.
   Usage: t('key') returns the string in the currently selected language.
   Add more keys to both `en` and `hi` below to extend translation
   coverage to more of the site.
=================================================================== */

const TRANSLATIONS = {
  en: {
    home: "Home", buy: "Buy", buyCrops: "Buy Crops", sell: "Sell", sellProduct: "Sell Product",
    cart: "Cart", myCart: "My Cart", wishlist: "Wishlist", profile: "Profile",
    myOrders: "My Orders", cropWaste: "Crop Waste", sellerDashboard: "Seller Dashboard",
    buyerDashboard: "Buyer Dashboard", aboutUs: "About Us", contact: "Contact", faq: "FAQ",
    privacyPolicy: "Privacy Policy", terms: "Terms", login: "Login / Signup", logout: "Logout",
    welcome: "Welcome!", loginToShop: "Login to buy & sell crops", selectLocation: "Select Location",
    searchPlaceholder: "Search crops, waste, sellers...",
    addToCart: "Add to Cart", buyNow: "Buy Now", add: "Add", startShopping: "Start Shopping",
    topCategories: "Top Categories", trendingProducts: "Trending Products", seeAll: "See all",
    todaysMarketPrices: "Today's Market Prices", popularCropWaste: "Popular Crop Waste",
    topSellers: "Top Sellers", whatFarmersSaying: "What Farmers Are Saying",
    haveCropsToSell: "Have crops or crop waste to sell?",
    listProduceDesc: "List your produce in minutes and reach verified buyers across India.",
    proceedToCheckout: "Proceed to Checkout", yourCartEmpty: "Your cart is empty",
    browseFreshCrops: "Browse fresh crops and crop waste to get started.",
    noProductsListed: "No products listed yet", beFirstToList: "Be the first to list your crops for sale.",
    noWasteListed: "No crop waste listed yet", sellWasteDesc: "Sell your crop waste to buyers looking for it.",
    productsFound: "products found",
  },
  hi: {
    home: "होम", buy: "खरीदें", buyCrops: "फ़सल खरीदें", sell: "बेचें", sellProduct: "उत्पाद बेचें",
    cart: "कार्ट", myCart: "मेरा कार्ट", wishlist: "पसंदीदा", profile: "प्रोफ़ाइल",
    myOrders: "मेरे ऑर्डर", cropWaste: "फ़सल अवशेष", sellerDashboard: "विक्रेता डैशबोर्ड",
    buyerDashboard: "खरीदार डैशबोर्ड", aboutUs: "हमारे बारे में", contact: "संपर्क करें", faq: "सामान्य प्रश्न",
    privacyPolicy: "गोपनीयता नीति", terms: "नियम व शर्तें", login: "लॉगिन / साइनअप", logout: "लॉगआउट",
    welcome: "स्वागत है!", loginToShop: "फ़सल खरीदने-बेचने के लिए लॉगिन करें", selectLocation: "स्थान चुनें",
    searchPlaceholder: "फ़सल, अवशेष, विक्रेता खोजें...",
    addToCart: "कार्ट में डालें", buyNow: "अभी खरीदें", add: "जोड़ें", startShopping: "खरीदारी शुरू करें",
    topCategories: "मुख्य श्रेणियाँ", trendingProducts: "ट्रेंडिंग उत्पाद", seeAll: "सभी देखें",
    todaysMarketPrices: "आज के बाज़ार भाव", popularCropWaste: "लोकप्रिय फ़सल अवशेष",
    topSellers: "टॉप विक्रेता", whatFarmersSaying: "किसान क्या कहते हैं",
    haveCropsToSell: "फ़सल या फ़सल अवशेष बेचना है?",
    listProduceDesc: "मिनटों में अपनी उपज लिस्ट करें और पूरे भारत के खरीदारों तक पहुँचें।",
    proceedToCheckout: "चेकआउट करें", yourCartEmpty: "आपका कार्ट खाली है",
    browseFreshCrops: "शुरू करने के लिए ताज़ी फ़सलें और अवशेष देखें।",
    noProductsListed: "अभी कोई उत्पाद नहीं है", beFirstToList: "अपनी फ़सल बेचने वाले सबसे पहले व्यक्ति बनें।",
    noWasteListed: "अभी कोई फ़सल अवशेष नहीं है", sellWasteDesc: "फ़सल अवशेष खरीदने वालों को अपना अवशेष बेचें।",
    productsFound: "उत्पाद मिले",
  }
};

function getLang(){ return localStorage.getItem('mfw_lang') || 'en'; }
function setLang(lang){ localStorage.setItem('mfw_lang', lang); location.reload(); }
function t(key){
  const lang = getLang();
  return (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || TRANSLATIONS.en[key] || key;
}

// Apply translations to any static element marked with data-i18n="key"
function applyStaticTranslations(){
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.getAttribute('data-i18n'));
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.setAttribute('placeholder', t(el.getAttribute('data-i18n-placeholder')));
  });
}
document.addEventListener('DOMContentLoaded', applyStaticTranslations);
