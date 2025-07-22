function updateActiveNavLink(id) {
  if (patPages.includes(document.querySelector('.wrapper').dataset.pageId)) id = 'progression';

  if (IS_MOBILE) {
    document.querySelector(`#mobile-menu .menu-item[data-nav-id=${id}]`).classList.add('active');
  } else {
    document.querySelector(`.page-links [data-nav-id=${id}]`).classList.add('active');
  }
}

document.querySelectorAll('.nav-el').forEach(el => el.addEventListener('click', function(e) {
  e.stopPropagation();
  goToPage(this.dataset.navUrl, this.dataset.urlParam);
}));

document.querySelectorAll('#contact-btn').forEach(btn => btn.addEventListener('click', function() {
  window.open('https://nephu.org/about/contact-our-team/', '_blank');
}));

document.querySelectorAll('#nephu-link').forEach(link => link.addEventListener('click', function() {
  window.open('https://nephu.org/iga-nephropathy/', '_blank');
}));

function goToPage(url, param='') {
  let stagingFolder = IS_STAGING ? '/GSW_OTSUKA_SIMULATOR_WEB_CHINA_VERSION' : '';
  let urlParam = param.length > 0 ? `#${param}` : '';
  window.open(window.location.origin + stagingFolder + `/${url}.html` + urlParam, '_self');

  if (pageId === 'pathogenesis') {
    if (param === 'april') {
      window.unity.SendMessage('ProjectRoot', 'RemoteSkipToChapter');
    } else if (param === 'about-igan') {
      window.unity.SendMessage('ProjectRoot', 'RemoteSkipToTop');
    }
  }
}

// MOBILE NAV FUNC
let mobileMenu = document.querySelector('#mobile-menu');
let mobileClose = document.querySelector('#mobile-menu-close');
let mobileOpen = document.querySelector('#mobile-menu-icon')
mobileOpen.addEventListener('click', function() {
  mobileMenu.classList.add('visible');
  mobileClose.classList.remove('hidden');
  mobileOpen.classList.add('hidden');
});
mobileClose.addEventListener('click', function() {
  mobileMenu.classList.remove('visible');
  mobileClose.classList.add('hidden');
  mobileOpen.classList.remove('hidden');
});

// NAV DROPDOWN HOVER FUNC
let triggers = document.querySelectorAll('.dropdown-trigger');
triggers.forEach(el => {
  el.addEventListener('mouseover', function() {
    el.querySelector('.nav-dropdown').classList.add('active');
  });
  el.addEventListener('mouseout', function() {
    el.querySelector('.nav-dropdown').classList.remove('active');
  });
});

let mobileNavAccTriggers = document.querySelectorAll('.mobile-acc-trigger');
mobileNavAccTriggers.forEach(el => el.addEventListener('click', function() {
  let active = document.querySelector('.mobile-acc.active');
  if (active) active.classList.remove('active');
  let openMobileTrigger = document.querySelector('.mobile-acc-trigger.open');
  if (openMobileTrigger) openMobileTrigger.classList.remove('open');
  document.querySelector(`.mobile-acc#${el.dataset.navId}`).classList.add('active');
  el.classList.add('open');
}));