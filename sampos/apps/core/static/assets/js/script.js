document.addEventListener('DOMContentLoaded', () => {
  // --- Initialize Lucide Icons ---
  lucide.createIcons();
  
  // --- State ---
  let isSidebarOpen = false;
  let activeDropdown = null;

  // --- Sidebar ---
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebar-overlay');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const toggleSidebar = () => {
    isSidebarOpen = !isSidebarOpen;
    if (isSidebarOpen) {
      sidebar.classList.remove('-translate-x-full');
      sidebarOverlay.classList.remove('hidden');
    } else {
      sidebar.classList.add('-translate-x-full');
      sidebarOverlay.classList.add('hidden');
    }
  };

  hamburgerBtn.addEventListener('click', toggleSidebar);
  sidebarOverlay.addEventListener('click', toggleSidebar);

  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const linkPath = new URL(link.href, window.location.origin).pathname;
    const currentPage = window.location.pathname;

    // Remove any previous active styles
    link.classList.remove(
      'bg-blue-600', 'text-white', 'dark:bg-blue-700', 'font-semibold'
    );
    link.classList.add(
      'text-gray-600', 'dark:text-gray-300', 'hover:bg-gray-100', 'dark:hover:bg-gray-800'
    );

<<<<<<< HEAD
    // Match the current URL path with link href
    if (linkPath === currentPage) {
      link.classList.add(
        'bg-blue-600', 'text-white', 'dark:bg-blue-700', 'font-semibold'
      );
      link.classList.remove(
        'text-gray-600', 'dark:text-gray-300', 'hover:bg-gray-100', 'dark:hover:bg-gray-800'
      );
=======
  // component scrollbar start
  if (document.querySelector('.component-list-card .scroll-div')) {
    new SimpleBar(document.querySelector('.component-list-card .scroll-div'));
  }
  // component- dropdown scrollbar end

  // for sidebar close
  var sidebarHideBtn = document.querySelector('#sidebar-hide');
  var sidebar = document.querySelector('.pc-sidebar');

  // Check session storage on load
  if (sessionStorage.getItem('sidebarHidden') === 'true') {
    sidebar.classList.add('pc-sidebar-hide');
  } else {
    sidebar.classList.remove('pc-sidebar-hide');
  }

  // Add click event to toggle sidebar visibility
  if (sidebarHideBtn) {
    sidebarHideBtn.addEventListener('click', function () {
      sidebar.classList.toggle('pc-sidebar-hide');

      // Save state in session storage
      if (sidebar.classList.contains('pc-sidebar-hide')) {
        sessionStorage.setItem('sidebarHidden', 'true');
      } else {
        sessionStorage.setItem('sidebarHidden', 'false');
      }
    });
  }

  // for input focus add when click search icon
  if (document.querySelector('.trig-drp-search')) {
    const search_drp = document.querySelector('.trig-drp-search');
    search_drp.addEventListener('shown.bs.dropdown', (event) => {
      document.querySelector('.drp-search input').focus();
    });
  }

  // layout options (when click customizer layout options according to that set value in local storage)
  setLayout();
  var if_layout = document.querySelectorAll('.theme-main-layout');
  var layoutValue = 'vertical';
  if (if_layout) {
    var preset_layout = document.querySelectorAll('.theme-main-layout > a');
    preset_layout.forEach(function (element) {
      element.addEventListener('click', function () {
        // Reload the page after setting the layout for the first time to sync in all open tabs
        location.reload();

        document.querySelectorAll('.theme-main-layout > a').forEach(function (el) {
          el.classList.remove('active');
        });
        this.classList.add('active');
        if (this.getAttribute('data-value') == 'horizontal') {
          layoutValue = 'horizontal';
        } else if (this.getAttribute('data-value') == 'compact') {
          layoutValue = 'compact';
        } else if (this.getAttribute('data-value') == 'tab') {
          layoutValue = 'tab';
        } else if (this.getAttribute('data-value') == 'color-header') {
          layoutValue = 'color-header';
        } else {
          layoutValue = 'vertical';
        }

        // Set data to localStorage
        localStorage.setItem('layout', layoutValue);

        setLayout();
      });
    });
  }
});

// Function to set the layout based on data stored in localStorage
function setLayout() {
  var layout = localStorage.getItem('layout'); // Retrieve layout data from localStorage

  // Pass the layout value to main_layout_change function
  main_layout_change(layout);

  // Load corresponding scripts or perform actions based on the layout value
  if (layout !== null && layout !== '') {
    var script = document.createElement('script');
    if (layout === 'horizontal') {
      document.querySelector('.pc-sidebar').classList.add('d-none');
      script.src = '../assets/js/layout-horizontal.js'; // Load script for horizontal layout
      document.body.appendChild(script);
    } else if (layout === 'color-header') {
      // Change logo color for color-header layout
      if (document.querySelector('.pc-sidebar .m-header .logo-lg')) {
        document.querySelector('.pc-sidebar .m-header .logo-lg').setAttribute('src', '../assets/images/logo-white.svg');
      }
    } else if (layout === 'compact') {
      script.src = '../assets/js/layout-compact.js'; // Load script for compact layout
      document.body.appendChild(script);
    } else if (layout === 'tab') {
      script.src = '../assets/js/layout-tab.js'; // Load script for tab layout
      document.body.appendChild(script);
    }
  }

  // If no layout data found in localStorage, set default layout to 'vertical'
  if (layout === null) {
    main_layout_change('vertical');
    localStorage.setItem('layout', 'vertical');
  }
}

// Function to handle menu click and scrollbar initialization
function add_scroller() {
  // Initialize scrollbar if navbar-content exists
  if (document.querySelector('.navbar-content')) {
    new SimpleBar(document.querySelector('.navbar-content'));
  }
}

// Function to hide mobile menu (sidebar hide on click overlay)
function rm_menu() {
  // Remove active class from mobile menu elements
  var sidebar = document.querySelector('.pc-sidebar');
  var topbar = document.querySelector('.topbar');

  if (sidebar) {
    sidebar.classList.remove('mob-sidebar-active');
  }
  if (topbar) {
    topbar.classList.remove('mob-sidebar-active');
  }

  // Remove menu overlay elements with error checking
  var sidebarOverlay = document.querySelector('.pc-sidebar .pc-menu-overlay');
  var topbarOverlay = document.querySelector('.topbar .pc-menu-overlay');

  if (sidebarOverlay) {
    sidebarOverlay.remove();
  }
  if (topbarOverlay) {
    topbarOverlay.remove();
  }
}

// Function to remove overlay menu
function remove_overlay_menu() {
  // Remove active class from sidebar and topbar if they exist
  var sidebar = document.querySelector('.pc-sidebar');
  var topbar = document.querySelector('.topbar');

  if (sidebar) {
    sidebar.classList.remove('pc-over-menu-active');
    var sidebarOverlay = sidebar.querySelector('.pc-menu-overlay');
    if (sidebarOverlay) {
      sidebarOverlay.remove();
    }
  }

  if (topbar) {
    topbar.classList.remove('mob-sidebar-active');
    var topbarOverlay = topbar.querySelector('.pc-menu-overlay');
    if (topbarOverlay) {
      topbarOverlay.remove();
    }
  }
}

// Event listener to initialize tooltips, popovers, and toasts on window load
window.addEventListener('load', function () {
  // Remove pre-loader after page load with a fade-out effect
  var loader = document.querySelector('.loader-bg');
  if (loader) {
    loader.style.transition = 'opacity 0.5s ease';
    loader.style.opacity = '0';

    // Wait for the fade-out transition to complete before removing the element
    setTimeout(function () {
      loader.remove();
    }, 500); // Duration matches the CSS transition duration
  }
});

// Function to mark active menu items based on current page URL
var elem = document.querySelectorAll('.pc-sidebar .pc-navbar a');
for (var l = 0; l < elem.length; l++) {
  // Check if current URL matches menu item URL
  var pageUrl = window.location.href.split(/[?#]/)[0];
  if (elem[l].href == pageUrl && elem[l].getAttribute('href') != '') {
    // Add active class to matching menu item and its parent elements
    elem[l].parentNode.classList.add('active');
    elem[l].parentNode.parentNode.parentNode.classList.add('pc-trigger');
    elem[l].parentNode.parentNode.parentNode.classList.add('active');
    elem[l].parentNode.parentNode.style.display = 'block';
    elem[l].parentNode.parentNode.parentNode.parentNode.parentNode.classList.add('pc-trigger');
    elem[l].parentNode.parentNode.parentNode.parentNode.style.display = 'block';
  }
}

// Change authentication logo
document.querySelectorAll('.auth-main.v2 .img-brand').forEach((img) => {
  img.setAttribute('src', '../assets/images/logo-white.svg');
});

// Function to remove CSS classes with a given prefix from a DOM node
function removeClassByPrefix(node, prefix) {
  // Create a copy of the class list to avoid issues with dynamic length
  node.classList.forEach((value) => {
    if (value.startsWith(prefix)) {
      node.classList.remove(value);
>>>>>>> 84827e5eae05edf48b30bfdedf2c6462710ead0a
    }
  });

  // Dropdowns
  const notificationBtn = document.getElementById('notification-btn');
  const notificationDropdown = document.getElementById('notification-dropdown');
  const userBtn = document.getElementById('user-btn');
  const userDropdown = document.getElementById('user-dropdown');
  // --- Dropdowns ---
  const toggleDropdown = (dropdown, btn) => {
    if (activeDropdown && activeDropdown !== dropdown) {
      activeDropdown.classList.add('hidden');
    }

    dropdown.classList.toggle('hidden');

    if (!dropdown.classList.contains('hidden')) {
      activeDropdown = dropdown;
    } else {
      activeDropdown = null;
    }
  };
  notificationBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleDropdown(notificationDropdown, notificationBtn);
  });

  userBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleDropdown(userDropdown, userBtn);
  });

  // Close dropdowns on window click
  window.addEventListener('click', () => {
    if (activeDropdown) {
      activeDropdown.classList.add('hidden');
      activeDropdown = null;
    }
  });

  const modalContainer = document.getElementById('modal-container');
  const modalBox = document.getElementById('modal-box');
  const modalOverlay = document.getElementById('modal-overlay');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalCancelBtn = document.getElementById('modal-cancel-btn');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const modalTriggers = document.querySelectorAll('.modal-trigger');
  let currentModal = undefined;

  const openModal = (templateId, title) => {
      const template = document.getElementById(`modal-template-${templateId}`);
      if (!template) {
          console.error('Modal template not found:', templateId);
          return;
      }
      
      const content = template.content.cloneNode(true);
      modalBody.innerHTML = ''; // Clear previous content
      modalBody.appendChild(content);
      modalTitle.textContent = title;
      
      modalContainer.classList.remove('hidden');
      // Trigger transition
      setTimeout(() => {
          modalBox.classList.remove('scale-95', 'opacity-0');
          modalBox.classList.add('scale-100', 'opacity-100');
      }, 10);
  };
  const closeModal = () => {
      modalBox.classList.add('scale-95', 'opacity-0');
      modalBox.classList.remove('scale-100', 'opacity-100');
      setTimeout(() => {
          modalContainer.classList.add('hidden');
      }, 200);
  };
  modalTriggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
          const target = trigger.dataset.modalTarget;
          let title = 'Add New';
          if (target === 'add-customer') title = 'Add New Customer';
          if (target === 'add-plan') title = 'Add New Plan';
          if (target === 'add-coupon') title = 'Create New Coupon';
          if (target === 'add-product') title = 'Add New Product';
          currentModal = target;
          openModal(target, title);
      });
  });

  modalCloseBtn.addEventListener('click', closeModal);
  modalCancelBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', closeModal);

  const modalSaveBtn = document.querySelector('#modal-save-btn')
  modalSaveBtn.addEventListener('click', (e) => {
    e.preventDefault()
    switch(currentModal) {
      case 'add-plan' : 
        addNewPlan();
    }
  })

  const addNewPlan = async () => {
    const form = document.querySelector('#add-new-plan-form')

    const name = form.querySelector('[name="name"]').value
    const amount = form.querySelector('[name="amount"]').value
    const duration = form.querySelector('[name="duration"]').value
    const features = form.querySelector('[name="features"]').value

    const alert = document.querySelector('#toast-alert .message')
    alert.innerHTML = 'Subscription saved successfully!'
    alert.parentElement.classList.remove('hidden')
    if (!name.length) {
      return false;
    }
    if (!amount.length) {
      return false
    }
    if (!features.length){
      return false;
    }
    const response = await fetch('http://10.0.101.109:8001/api/subscription/save/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token 76fb2a1c297444e6698accf775440394689e2811',
        'X-API-Key': 'SAMPOS-API-12345'
      },
      body: JSON.stringify({
        name : name,
        amount : amount,
        duration : duration,
        features : features,
      })
    })
    console.log(response)
  }
  // Modals
  // const modalContainer = document.getElementById('modal-container');
  // const modalBox = document.getElementById('modal-box');
  // const modalOverlay = document.getElementById('modal-overlay');
  // const modalCloseBtn = document.getElementById('modal-close-btn');
  // const modalCancelBtn = document.getElementById('modal-cancel-btn');
  // const modalTitle = document.getElementById('modal-title');
  // const modalBody = document.getElementById('modal-body');
  // const modalTriggers = document.querySelectorAll('.modal-trigger');


  // // --- Modals ---
  // const openModal = (templateId, title) => {
  //   const template = document.getElementById(`modal-template-${templateId}`);
  //   if (!template) {
  //     console.error('Modal template not found:', templateId);
  //     return;
  //   }

  //   const content = template.content.cloneNode(true);
  //   modalBody.innerHTML = ''; // Clear previous content
  //   modalBody.appendChild(content);
  //   modalTitle.textContent = title;

  //   modalContainer.classList.remove('hidden');
  //   // Trigger transition
  //   setTimeout(() => {
  //     modalBox.classList.remove('scale-95', 'opacity-0');
  //     modalBox.classList.add('scale-100', 'opacity-100');
  //   }, 10);
  // };

  // const closeModal = () => {
  //   modalBox.classList.add('scale-95', 'opacity-0');
  //   modalBox.classList.remove('scale-100', 'opacity-100');
  //   setTimeout(() => {
  //     modalContainer.classList.add('hidden');
  //   }, 200); // Wait for transition
  // };

  // modalTriggers.forEach(trigger => {
  //   trigger.addEventListener('click', () => {
  //     const target = trigger.dataset.modalTarget;
  //     let title = 'Add New';
  //     if (target === 'add-customer') title = 'Add New Customer';
  //     if (target === 'add-plan') title = 'Add New Plan';
  //     if (target === 'add-coupon') title = 'Create New Coupon';
  //     if (target === 'add-product') title = 'Add New Product';
  //     openModal(target, title);
  //   });
  // });

  // modalCloseBtn.addEventListener('click', closeModal);
  // modalCancelBtn.addEventListener('click', closeModal);
  // modalOverlay.addEventListener('click', closeModal);

  

});