/**
* Template Name: iConstruction
* Template URL: https://bootstrapmade.com/iconstruction-bootstrap-construction-template/
* Updated: Jul 27 2025 with Bootstrap v5.3.7
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

})();

// ============ solar quote modal ====================
const systemPrices = {
      basic: {
        name: '2.5KVA Basic Solar System',
        price: 18500,
        components: [
          { name: '2kW Solar Panels (4x 500W)', price: 5200 },
          { name: '2kW Hybrid Inverter', price: 4800 },
          { name: 'Lithium Battery 3kWh', price: 6500 },
          { name: 'Mounting & Cabling Exclusive', price: 2000 }
        ]
      },
      standard: {
        name: '3.5kVA Standard Solar System',
        price: 28900,
        components: [
          { name: '5 x 585W Solar Panels', price: 2925},
          { name: '3.5kW Hybrid Inverter', price: 7500 },
          { name: '10kWh 25.6v 150AH Lithium Battery ', price: 10200 },
          { name: 'Mounting Kit', price: 2300 },
          { name: 'Protection Kit', price: 2300 }
        ]
      },
      premium: {
        name: '6kVA Premium Solar System',
        price: 42500,
        components: [
          { name: '5kW Solar Panels (10x 500W)', price: 12500 },
          { name: '5kW Hybrid Inverter', price: 11000 },
          { name: 'Lithium Battery 15kWh', price: 15500 },
          { name: 'Mounting & Advanced Cabling', price: 3500 }
        ]
      }
    };

    const additionalPrices = {
      geyser: { name: 'Geyser Installation (150L)', price: 3500 },
      cctv: { name: 'CCTV System (4 Cameras + DVR)', price: 4800 },
      automation: { name: 'Home Automation System', price: 6200 },
      surge: { name: 'Surge Protection Upgrade', price: 1800 }
    };

    function openSolarModal() {
      document.getElementById('solarModal').classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeSolarModal() {
      document.getElementById('solarModal').classList.remove('active');
      document.body.style.overflow = 'auto';
    }

    function resetQuote() {
      document.getElementById('solarQuoteForm').reset();
      document.querySelectorAll('.system-card').forEach(c => c.classList.remove('selected'));
      document.getElementById('quoteResult').classList.remove('show');
      document.getElementById('solarQuoteForm').style.display = 'block';
    }

    // Close modal when clicking outside
    window.onclick = function(event) {
      const modal = document.getElementById('solarModal');
      if (event.target === modal) {
        closeSolarModal();
      }
    }

    // System card selection
    document.querySelectorAll('.system-card').forEach(card => {
      card.addEventListener('click', function() {
        document.querySelectorAll('.system-card').forEach(c => c.classList.remove('selected'));
        this.classList.add('selected');
        document.getElementById('systemType').value = this.dataset.system;
      });
    });

    // Form submission
    document.getElementById('solarQuoteForm').addEventListener('submit', function(e) {
      e.preventDefault();

      const systemType = document.getElementById('systemType').value;
      if (!systemType) {
        alert('Please select a solar system size');
        return;
      }

      // Generate quote reference
      const quoteRef = 'VE-' + Date.now().toString().slice(-8);
      const today = new Date().toLocaleDateString('en-GB');

      // Display client info
      document.getElementById('quoteRef').textContent = quoteRef;
      document.getElementById('quoteDate').textContent = today;
      document.getElementById('displayName').textContent = document.getElementById('solarName').value;
      document.getElementById('displayPhone').textContent = document.getElementById('solarPhone').value;
      document.getElementById('displayEmail').textContent = document.getElementById('solarEmail').value || 'N/A';
      document.getElementById('displayLocation').textContent = document.getElementById('solarLocation').value;

      // Build line items
      const system = systemPrices[systemType];
      let lineItemsHtml = '';
      let subtotal = 0;

      // Add system components
      system.components.forEach(comp => {
        lineItemsHtml += `
          <div class="line-item">
            <span class="item-name">${comp.name}</span>
            <span class="item-price">K${comp.price.toLocaleString()}</span>
          </div>
        `;
        subtotal += comp.price;
      });

      document.getElementById('lineItemsList').innerHTML = lineItemsHtml;

      // Calculate totals
      const installation = Math.round(subtotal * 0.28);
      const vat = Math.round((subtotal + installation) * 0.16);
      const grandTotal = subtotal + installation;

      document.getElementById('subtotal').textContent = 'K' + subtotal.toLocaleString();
      document.getElementById('installation').textContent = 'K' + installation.toLocaleString();
      document.getElementById('grandTotal').textContent = 'K' + grandTotal.toLocaleString();

      // WhatsApp message
      const whatsappMsg = `Hello VoltaElectrical! I received quote ${quoteRef} for ${system.name}. Total: K${grandTotal.toLocaleString()}. Name: ${document.getElementById('solarName').value}, Location: ${document.getElementById('solarLocation').value}. Please send a detailed quotation for this on my whatsApp.`;
      document.getElementById('whatsappBtn').onclick = function() {
        window.open(`https://wa.me/260978195399?text=${encodeURIComponent(whatsappMsg)}`, '_blank');
      };

      // Show quotation and hide form
      document.getElementById('solarQuoteForm').style.display = 'none';
      document.getElementById('quoteResult').classList.add('show');
      document.getElementById('quoteResult').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    // ============== end solar quote modal ====================
    // System card selection
document.querySelectorAll('.system-card').forEach(card => {
  card.addEventListener('click', function() {
    document.querySelectorAll('.system-card').forEach(c => c.classList.remove('selected'));
    this.classList.add('selected');
    const systemType = this.dataset.system;
    document.getElementById('systemType').value = systemType;
    
    // Show selected package details
    const system = systemPrices[systemType];
    const displayDiv = document.getElementById('selectedPackage');
    displayDiv.innerHTML = `
      <h5>✓ Selected Package: ${system.name}</h5>
      <p><strong>Includes:</strong></p>
      <ul style="margin: 10px 0; padding-left: 20px;">
        ${system.components.map(comp => `<li>${comp.name}</li>`).join('')}
      </ul>
      <div class="package-price">K${system.price.toLocaleString()}</div>
    `;
    displayDiv.classList.add('show');
  });
});
