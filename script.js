var swiper = new Swiper(".coming-container", {
  spaceBetween: 20,
  loop: true,
  centeredSlides: true,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  breakpoints: {
      0: {
          slidesPerView: 2,
      },
      568: {
          slidesPerView: 3,
      },
      768: {
          slidesPerView: 4,
      },
      968: {
          slidesPerView: 5,
      },

  }
});


 
var swiper = new Swiper(".coming-container3", {
    spaceBetween: 29,
    loop: true,
    centeredSlides: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    breakpoints: {
        0: {
            slidesPerView: 2,
        },
        568: {
            slidesPerView: 3,
        },
        768: {
            slidesPerView: 4,
        },
        968: {
            slidesPerView: 5,
        },
  
    }
  });


var swiper = new Swiper(".coming-container2", {
    spaceBetween: 20,
    loop: true,
    centeredSlides: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    breakpoints: {
        0: {
            slidesPerView: 2,
        },
        568: {
            slidesPerView: 3,
        },
        768: {
            slidesPerView: 4,
        },
        968: {
            slidesPerView: 5,
        },
  
    }
  });
  
  function img(anything){
    document.querySelector('.sidel').src = anything;
  }
  function change (change){
    const line=document.querySelector('.home');
  }


    // --- CART LOGIC START ---
    const CART_KEY = 'falcurmart_cart';
    let cartProducts = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    
    function updateCartCount() {
      const count = cartProducts.length;
      document.querySelectorAll('.cart-count').forEach(el => el.textContent = count);
    }
    
    function updateCartModal() {
      const cartItems = document.querySelector('.cart-items');
      const totalAmount = document.querySelector('.total-amount');
      if (!cartItems || !totalAmount) return;
      cartItems.innerHTML = '';
      let total = 0;
      cartProducts.forEach((item, idx) => {
        total += item.price;
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
          <img src="${item.img}" alt="" style="width:50px;height:50px;object-fit:cover;margin-right:10px;border-radius:6px;">
          <div class="cart-item-details">
            <h4>${item.title}</h4>
            <p style="font-size:12px;">${item.desc}</p>
            <p class="cart-item-price">₦${item.price.toLocaleString()}</p>
          </div>
          <button class="remove-item" data-idx="${idx}">Remove</button>
        `;
        cartItems.appendChild(cartItem);
      });
      totalAmount.textContent = total.toLocaleString();
      // Remove item logic
      cartItems.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', function() {
          const idx = parseInt(btn.getAttribute('data-idx'));
          cartProducts.splice(idx, 1);
          localStorage.setItem(CART_KEY, JSON.stringify(cartProducts));
          updateCartCount();
          updateCartModal();
        });
      });
    }
    
    function addToCart(product) {
      cartProducts.push(product);
      localStorage.setItem(CART_KEY, JSON.stringify(cartProducts));
      updateCartCount();
      updateCartModal();
    }
    
    // Attach event listeners to all add-to-cart buttons
    function setupAddToCartButtons() {
      document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
          const productCard = button.closest('.product-card');
          const productTitle = productCard.querySelector('h3') ? productCard.querySelector('h3').textContent : '';
          const productDesc = productCard.querySelector('.pro-tit') ? productCard.querySelector('.pro-tit').textContent : '';
          const productPrice = productCard.querySelector('p span.nir') ? productCard.querySelector('p span.nir').nextSibling.textContent.replace(/[^\d.]/g, '') : '';
          const priceNum = parseFloat(productPrice.replace(/,/g, '')) || 0;
          const productImg = productCard.querySelector('img') ? productCard.querySelector('img').src : '';
          addToCart({ title: productTitle, desc: productDesc, price: priceNum, img: productImg });
          // Toast
          if (typeof showCartToast === 'function') showCartToast(`${productTitle} added to cart`);
          // Animation for button
          button.style.transform = 'scale(0.95)';
          setTimeout(() => { button.style.transform = 'scale(1)'; }, 100);
          button.textContent = 'Added to Cart';
          setTimeout(() => { button.textContent = 'Add to Cart'; }, 1000);
        });
      });
    }
    
    // Cart modal open/close logic (all cart icons)
    function setupCartModal() {
      const cartModal = document.querySelector('.cart-modal');
      if (!cartModal) return;
      document.querySelectorAll('.cart-icon').forEach(icon => {
        icon.addEventListener('click', e => {
          e.preventDefault();
          cartModal.classList.add('active');
          updateCartModal();
        });
      });
      const closeCartBtn = document.querySelector('.close-cart');
      if (closeCartBtn) {
        closeCartBtn.addEventListener('click', () => {
          cartModal.classList.remove('active');
        });
      }
      // Prevent modal from closing when clicking inside
      cartModal.addEventListener('click', function(e) {
        e.stopPropagation();
      });
      // Optional: close modal when clicking outside
      window.addEventListener('click', function(e) {
        if (cartModal.classList.contains('active') && !cartModal.contains(e.target) && !e.target.closest('.cart-icon')) {
          cartModal.classList.remove('active');
        }
      });
    }
    
    // Restore cart on page load
    updateCartCount();
    updateCartModal();
    setupAddToCartButtons();
    setupCartModal();
    
    // --- CART LOGIC END ---
