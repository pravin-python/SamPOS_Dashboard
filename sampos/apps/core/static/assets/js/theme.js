/**
=========================================================================
=========================================================================
Template Name: Datta Able - Tailwind Admin Template
Author: CodedThemes
Support: https://codedthemes.support-hub.io/
File: themes.js
=========================================================================
=========================================================================
*/
'use strict';
var rtl_flag = false;
var dark_flag = false;

// Utility: get value from sessionStorage first, fallback to localStorage
function getStored(key, fallback) {
  try { const s = sessionStorage.getItem(key); if (s !== null) return s; } catch (e) {}
  try { const l = localStorage.getItem(key); if (l !== null) return l; } catch (e) {}
  return fallback;
}
// Utility: set value to both sessionStorage and localStorage
function setStored(key, value) {
  try { sessionStorage.setItem(key, value); } catch (e) {}
  try { localStorage.setItem(key, value); } catch (e) {}
}

// This event listener executes when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', function () {
  if (typeof Storage !== 'undefined') {
    // Theme: read from session first, then local
    const savedTheme = getStored('theme');
    if (savedTheme) {
      layout_change(savedTheme);
    } else {
      const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      layout_change(system);
      setStored('theme', system);
    }
  }
  var if_exist = document.querySelectorAll('.preset-color');
  if (if_exist) {
    var preset_color = document.querySelectorAll('.preset-color > a');
    for (var h = 0; h < preset_color.length; h++) {
      var c = preset_color[h];
      c.addEventListener('click', function (event) {
        var targetElement = event.target;
        if (targetElement.tagName == 'I') { targetElement = targetElement.parentNode; }
        var presetValue = targetElement.getAttribute('data-value');
        preset_change(presetValue);
      });
    }
    var layout_btn = document.querySelectorAll('.theme-layout .btn');
    for (var t = 0; t < layout_btn.length; t++) {
      if (layout_btn[t]) {
        layout_btn[t].addEventListener('click', function (event) {
          event.stopPropagation();
          var targetElement = event.target;
          if (targetElement.tagName == 'SPAN') { targetElement = targetElement.parentNode; }
          if (targetElement.getAttribute('data-value') == 'true') {
            setStored('theme', 'light');
            document.documentElement.setAttribute('data-theme', 'light');
            layout_change('light');
          } else {
            setStored('theme', 'dark');
            document.documentElement.setAttribute('data-theme', 'dark');
            layout_change('dark');
          }
        });
      }
    }
  }
  if (document.querySelector('.pct-body')) { new SimpleBar(document.querySelector('.pct-body')); }
  var layout_reset = document.querySelector('#layoutreset');
  if (layout_reset) {
    layout_reset.addEventListener('click', function (e) {
      try { sessionStorage.clear(); } catch (err) {}
      try { localStorage.clear(); } catch (err) {}
      location.reload();
      try { localStorage.setItem('layout', 'vertical'); } catch (err) {}
    });
  }
  // Header color
  var header_exist = document.querySelectorAll('.header-color');
  if (header_exist) {
    var header_links = document.querySelectorAll('.header-color > a');
    for (var h1 = 0; h1 < header_links.length; h1++) {
      header_links[h1].addEventListener('click', function (event) {
        var el = event.target;
        if (el.tagName == 'SPAN' || el.tagName == 'I') { el = el.parentNode; }
        var val = el.getAttribute('data-value');
        header_change(val);
        setStored('header', val);
      });
    }
  }
  // Navbar color
  var navbar_exist = document.querySelectorAll('.navbar-color');
  if (navbar_exist) {
    var navbar_links = document.querySelectorAll('.navbar-color > a');
    for (var h2 = 0; h2 < navbar_links.length; h2++) {
      navbar_links[h2].addEventListener('click', function (event) {
        var el = event.target;
        if (el.tagName == 'SPAN' || el.tagName == 'I') { el = el.parentNode; }
        var val = el.getAttribute('data-value');
        navbar_change(val);
        setStored('navbar', val);
      });
    }
  }
  // Logo color
  var logo_exist = document.querySelectorAll('.logo-color');
  if (logo_exist) {
    var logo_links = document.querySelectorAll('.logo-color > a');
    for (var h3 = 0; h3 < logo_links.length; h3++) {
      logo_links[h3].addEventListener('click', function (event) {
        var el = event.target;
        if (el.tagName == 'SPAN' || el.tagName == 'I') { el = el.parentNode; }
        var val = el.getAttribute('data-value');
        logo_change(val);
        setStored('logo', val);
      });
    }
  }
  // Caption color
  var caption_exist = document.querySelectorAll('.caption-color');
  if (caption_exist) {
    var caption_links = document.querySelectorAll('.caption-color > a');
    for (var h4 = 0; h4 < caption_links.length; h4++) {
      caption_links[h4].addEventListener('click', function (event) {
        var el = event.target;
        if (el.tagName == 'SPAN' || el.tagName == 'I') { el = el.parentNode; }
        var val = el.getAttribute('data-value');
        caption_change(val);
        setStored('caption', val);
      });
    }
  }
  // Navbar image
  var navimg_exist = document.querySelectorAll('.navbar-img');
  if (navimg_exist) {
    var navimg_links = document.querySelectorAll('.navbar-img > a');
    for (var h5 = 0; h5 < navimg_links.length; h5++) {
      navimg_links[h5].addEventListener('click', function (event) {
        var el = event.target;
        if (el.tagName == 'SPAN' || el.tagName == 'I') { el = el.parentNode; }
        var val = el.getAttribute('data-value');
        nav_image_change(val);
        setStored('navimg', val);
      });
    }
  }
  // Dropdown menu icon
  var drp_icon_exist = document.querySelectorAll('.drp-menu-icon');
  if (drp_icon_exist) {
    var drp_icon_links = document.querySelectorAll('.drp-menu-icon > a');
    for (var h6 = 0; h6 < drp_icon_links.length; h6++) {
      drp_icon_links[h6].addEventListener('click', function (event) {
        var el = event.target;
        if (el.tagName == 'SPAN' || el.tagName == 'I') { el = el.parentNode; }
        var val = el.getAttribute('data-value');
        drp_menu_icon_change(val);
        setStored('drp-menu-icon', val);
      });
    }
  }
  // Dropdown menu link icon
  var drp_link_icon_exist = document.querySelectorAll('.drp-menu-link-icon');
  if (drp_link_icon_exist) {
    var drp_link_icon_links = document.querySelectorAll('.drp-menu-link-icon > a');
    for (var h7 = 0; h7 < drp_link_icon_links.length; h7++) {
      drp_link_icon_links[h7].addEventListener('click', function (event) {
        var el = event.target;
        if (el.tagName == 'SPAN' || el.tagName == 'I') { el = el.parentNode; }
        var val = el.getAttribute('data-value');
        drp_menu_link_icon_change(val);
        setStored('drp-menu-link-icon', val);
      });
    }
  }

  // On load: apply persisted values
  const persistedHeader = getStored('header'); if (persistedHeader) header_change(persistedHeader);
  const persistedNavbar = getStored('navbar'); if (persistedNavbar) navbar_change(persistedNavbar);
  const persistedLogo = getStored('logo'); if (persistedLogo) logo_change(persistedLogo);
  const persistedCaption = getStored('caption'); if (persistedCaption) caption_change(persistedCaption);
  const persistedNavimg = getStored('navimg'); if (persistedNavimg) nav_image_change(persistedNavimg);
  const persistedDrpIcon = getStored('drp-menu-icon'); if (persistedDrpIcon) drp_menu_icon_change(persistedDrpIcon);
  const persistedDrpLinkIcon = getStored('drp-menu-link-icon'); if (persistedDrpLinkIcon) drp_menu_link_icon_change(persistedDrpLinkIcon);
});

// Functions to handle layout caption change (caption hide/show in sidebar)
function layout_caption_change(value) {
  if (value == 'true') {
    document.getElementsByTagName('html')[0].setAttribute('data-pc-sidebar-caption', 'true');
  } else {
    document.getElementsByTagName('html')[0].setAttribute('data-pc-sidebar-caption', 'false');
  }
  var control = document.querySelector('.theme-nav-caption .btn.active');
  if (control) { control.classList.remove('active'); }
  var newActiveButton = document.querySelector(`.theme-nav-caption .btn[data-value='${value}']`);
  if (newActiveButton) { newActiveButton.classList.add('active'); }
}

function preset_change(value) {
  document.getElementsByTagName('html')[0].setAttribute('class', value);
  var control = document.querySelector('.pct-offcanvas');
  if (control) {
    document.querySelector('.preset-color > a.active').classList.remove('active');
    document.querySelector(".preset-color > a[data-value='" + value + "']").classList.add('active');
  }
}

function main_layout_change(value) {
  document.getElementsByTagName('html')[0].setAttribute('data-pc-layout', value);
  var control = document.querySelector('.pct-offcanvas');
  if (control) {
    var activeLink = document.querySelector('.theme-main-layout > a.active');
    if (activeLink) { activeLink.classList.remove('active'); }
    var newActiveLink = document.querySelector(".theme-main-layout > a[data-value='" + value + "']");
    if (newActiveLink) { newActiveLink.classList.add('active'); }
  }
}

function layout_rtl_change(value) {
  var htmlElement = document.getElementsByTagName('html')[0];
  if (value === 'true') {
    rtl_flag = true;
    htmlElement.setAttribute('data-pc-direction', 'rtl');
    htmlElement.setAttribute('dir', 'rtl');
    htmlElement.setAttribute('lang', 'ar');
    var activeButton = document.querySelector('.theme-direction .btn.active');
    if (activeButton) { activeButton.classList.remove('active'); }
    var rtlButton = document.querySelector(".theme-direction .btn[data-value='true']");
    if (rtlButton) { rtlButton.classList.add('active'); }
  } else {
    rtl_flag = false;
    htmlElement.setAttribute('data-pc-direction', 'ltr');
    htmlElement.setAttribute('dir', 'ltr');
    htmlElement.removeAttribute('lang');
    var activeButton = document.querySelector('.theme-direction .btn.active');
    if (activeButton) { activeButton.classList.remove('active'); }
    var ltrButton = document.querySelector(".theme-direction .btn[data-value='false']");
    if (ltrButton) { ltrButton.classList.add('active'); }
  }
}

// Function to handle layout change (dark/light) and update related elements
function layout_change(layout) {
  setStored('theme', layout);
  document.getElementsByTagName('html')[0].setAttribute('data-pc-theme', layout);
  var btn_control = document.querySelector('.theme-layout .btn[data-value="default"]');
  if (btn_control) { btn_control.classList.remove('active'); }
  var isDark = layout === 'dark';
  dark_flag = isDark;
  var logoSrc = isDark ? LightImageUrl : DarkImageUrl;
  function updateLogo(selector) {
    var element = document.querySelector(selector);
    if (element) { element.setAttribute('src', logoSrc); }
  }
  updateLogo('.pc-sidebar .m-header .logo-lg');
  updateLogo('.navbar-brand .logo-lg');
  updateLogo('.auth-main.v1 .auth-sidefooter img');
  updateLogo('.auth-logo');
  updateLogo('.footer-top .footer-logo');
  var activeControl = document.querySelector('.theme-layout .btn.active');
  if (activeControl) { activeControl.classList.remove('active'); }
  var newActiveControl = document.querySelector(`.theme-layout .btn[data-value='${isDark ? 'false' : 'true'}']`);
  if (newActiveControl) { newActiveControl.classList.add('active'); }
}

function change_box_container(value) {
  var contentElement = document.querySelector('.pc-content');
  var footerElement = document.querySelector('.footer-wrapper');
  if (contentElement && footerElement) {
    if (value === 'true') {
      contentElement.classList.add('container');
      footerElement.classList.add('container');
      footerElement.classList.remove('container-fluid');
    } else {
      contentElement.classList.remove('container');
      footerElement.classList.remove('container');
      footerElement.classList.add('container-fluid');
    }
    var activeButton = document.querySelector('.theme-container .btn.active');
    if (activeButton) { activeButton.classList.remove('active'); }
    var newActiveButton = document.querySelector(`.theme-container .btn[data-value='${value}']`);
    if (newActiveButton) { newActiveButton.classList.add('active'); }
  }
}

function layout_theme_sidebar_change(value) {
  if (value == 'true') {
    document.getElementsByTagName('html')[0].setAttribute('data-pc-sidebar_theme', 'true');
    if (document.querySelector('.pc-sidebar .m-header .logo-lg')) {
      document.querySelector('.pc-sidebar .m-header .logo-lg').setAttribute('src', DarkImageUrl);
    }
    var control = document.querySelector('.theme-nav-layout .btn.active');
    if (control) {
      document.querySelector('.theme-nav-layout .btn.active').classList.remove('active');
      document.querySelector(".theme-nav-layout .btn[data-value='true']").classList.add('active');
    }
  } else {
    document.getElementsByTagName('html')[0].setAttribute('data-pc-sidebar_theme', 'false');
    if (document.querySelector('.pc-sidebar .m-header .logo-lg')) {
      document.querySelector('.pc-sidebar .m-header .logo-lg').setAttribute('src', LightImageUrl);
    }
    var control = document.querySelector('.theme-nav-layout .btn.active');
    if (control) {
      document.querySelector('.theme-nav-layout .btn.active').classList.remove('active');
      document.querySelector(".theme-nav-layout .btn[data-value='false']").classList.add('active');
    }
 
  }
}