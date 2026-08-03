/* ===================================================================
   MR FASAL WALA — CART PAGE LOGIC
=================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const listWrap = document.getElementById('cartList');
  const summaryWrap = document.getElementById('cartSummary');
  const stickyWrap = document.getElementById('stickyCheckout');
  if(!listWrap) return;

  function render(){
    const items = Cart.getItems();
    if(items.length === 0){
      listWrap.innerHTML = `<div class="empty-state">
        <div class="icon">🛒</div><h3>${t('yourCartEmpty')}</h3>
        <p>${t('browseFreshCrops')}</p>
        <a href="buy-crops.html" class="btn btn-primary">Start Shopping</a>
      </div>`;
      if(summaryWrap) summaryWrap.innerHTML = '';
      if(stickyWrap) stickyWrap.style.display = 'none';
      updateBadgeCounts();
      return;
    }
    if(stickyWrap) stickyWrap.style.display = 'flex';
    listWrap.innerHTML = items.map(i => `
      <div class="cart-item" data-id="${i.id}">
        <img src="${i.image}" alt="${i.name}">
        <div class="ci-info">
          <h4>${i.name}</h4>
          <p class="text-muted" style="font-size:11.5px;margin:0 0 6px;">Seller: ${i.seller}</p>
          <div class="pc-price-row" style="margin-bottom:8px;">
            <span class="pc-price" style="font-size:14px;">₹${i.price.toLocaleString('en-IN')}</span>
            <span class="pc-unit">/${i.unit}</span>
          </div>
          <div class="d-flex align-center justify-between">
            <div class="qty-stepper">
              <button class="qm" data-id="${i.id}">−</button><span>${i.qty}</span><button class="qp" data-id="${i.id}">+</button>
            </div>
            <button class="btn btn-sm btn-outline rm-btn" data-id="${i.id}" style="color:var(--danger);border-color:var(--danger);">Remove</button>
          </div>
        </div>
      </div>`).join('');

    listWrap.querySelectorAll('.qm').forEach(b=>b.addEventListener('click', ()=>{
      const id = b.getAttribute('data-id');
      const item = Cart.getItems().find(i=>i.id===id);
      Cart.updateQty(id, item.qty - 1);
      render();
    }));
    listWrap.querySelectorAll('.qp').forEach(b=>b.addEventListener('click', ()=>{
      const id = b.getAttribute('data-id');
      const item = Cart.getItems().find(i=>i.id===id);
      Cart.updateQty(id, item.qty + 1);
      render();
    }));
    listWrap.querySelectorAll('.rm-btn').forEach(b=>b.addEventListener('click', ()=>{
      Cart.remove(b.getAttribute('data-id'));
      showToast('Item removed from cart', '');
      render();
    }));

    const subtotal = Cart.subtotal();
    const delivery = subtotal > 0 ? 199 : 0;
    const total = subtotal + delivery;
    if(summaryWrap){
      summaryWrap.innerHTML = `
        <div class="cart-summary">
          <div class="summary-row"><span>Subtotal</span><span>₹${subtotal.toLocaleString('en-IN')}</span></div>
          <div class="summary-row"><span>Delivery Fee</span><span>₹${delivery}</span></div>
          <div class="summary-row total"><span>Total</span><span>₹${total.toLocaleString('en-IN')}</span></div>
        </div>`;
    }
    if(stickyWrap){
      stickyWrap.innerHTML = `
        <div><div class="text-muted" style="font-size:11px;">Total</div><div style="font-weight:800;font-size:16px;">₹${total.toLocaleString('en-IN')}</div></div>
        <button class="btn btn-primary" id="checkoutBtn" style="flex:1;max-width:220px;">${t('proceedToCheckout')}</button>`;
      document.getElementById('checkoutBtn').addEventListener('click', checkout);
    }
    updateBadgeCounts();
  }

  function checkout(){
    if(!Auth.isLoggedIn()){
      showToast('Please login to place an order', 'error');
      setTimeout(()=> location.href = 'login.html', 800);
      return;
    }
    const cu = Auth.currentUser();
    const address = prompt('Enter delivery address:', cu.name + ', ' + (Storage.get('location') || 'India'));
    if(!address) return;

    const items = Cart.getItems();
    const order = Orders.create(items, address);

    // Build a WhatsApp message with the full order so the owner receives it directly
    let msg = `🌾 *New Order — Mr Fasal Wala*\n`;
    msg += `Order ID: ${order.id}\n`;
    msg += `Buyer: ${cu.name} (${cu.phone})\n`;
    msg += `Delivery Address: ${address}\n\n`;
    msg += `*Items:*\n`;
    items.forEach(i => { msg += `• ${i.name} — ${i.qty} ${i.unit} x ₹${i.price} = ₹${(i.qty*i.price).toLocaleString('en-IN')}\n`; });
    msg += `\n*Total: ₹${order.total.toLocaleString('en-IN')}*`;

    const waUrl = `https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    Cart.clear();
    showToast('Opening WhatsApp to confirm your order...', 'success');
    setTimeout(()=>{ window.location.href = waUrl; }, 700);
  }

  render();
});
