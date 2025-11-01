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

    // Match the current URL path with link href
    if (linkPath === currentPage) {
      link.classList.add(
        'bg-blue-600', 'text-white', 'dark:bg-blue-700', 'font-semibold'
      );
      link.classList.remove(
        'text-gray-600', 'dark:text-gray-300', 'hover:bg-gray-100', 'dark:hover:bg-gray-800'
      );
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