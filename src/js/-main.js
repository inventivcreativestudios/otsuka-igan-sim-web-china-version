gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

// Init global vars
let wrapper, pageId, pathLevel, dotsContainer;
const IS_STAGING = false;
const IS_MOBILE = window.innerWidth >= 475 ? false : true;
const IS_TABLET = window.innerWidth >= 700 && window.innerWidth <= 1100 ? true : false;
let patPages = [
  'pat-profile-carlos',
  'pat-profile-mark',
  'pat-profile-sarah'
];

document.addEventListener('DOMContentLoaded', function() {
  // Ensure page opens at top
  // window.scrollTo(0, 0);

  // Define global vars
  wrapper = document.querySelector('[data-page-id]');
  pageId = wrapper.dataset.pageId;
  pathLevel = Number(wrapper.dataset.pathLevel);
  if (pageId !== 'site-map') updateActiveNavLink(pageId);

  browserDetection();
  formatUrls();

  // Show interstitial on page load if it has not already been dismissed
  if (localStorage.getItem('hcpConfirmed') !== 'true') {
    showInterstitial();
  } else {
    if (pageId === 'pathogenesis') {
      document.body.classList.add('overflow-unset');
    }
  }

  // console.log(pageId);

  function updatePaths() {
    document.querySelectorAll('.update-path').forEach(el => {
      let srcTail = el.src.split('assets')[1];
      let stagingFolder = IS_STAGING ? '/GSW_OTSUKA_SIMULATOR_WEB_v2' : '';
      el.src = window.location.origin + stagingFolder + '/assets' + srcTail;
    });
  }
  
  if (pathLevel !== 0) updatePaths();

  // Dynamically create progress dots 
  function buildProgressDots() {
    dotsContainer = wrapper.querySelector('.progress-dots-container');

    // Get count of sections, minus the patient-switch section at the end
    let sectionCount = Array.from(wrapper.querySelectorAll('section')).length - 1;
    for (let i = 0; i < sectionCount; i++) {
      let container = document.createElement('div');
      container.classList.add('dot-container');

      let label = document.createElement('p');
      label.classList.add('label');
      label.innerHTML = document.querySelector(`[data-section-id="${i + 1}"]`).dataset.dotLabel;

      let dot = document.createElement('div');
      dot.classList.add('progress-dot');
      dot.dataset.sectionId = i + 1;

      dot.addEventListener('mouseover', function() {
        this.parentElement.querySelector('.label').classList.add('show');
      });
      dot.addEventListener('mouseout', function() {
        this.parentElement.querySelector('.label').classList.remove('show');
      });
      dot.addEventListener('click', function() {
        let targetSect = document.querySelector(`section[data-section-id="${i + 1}"`);
        targetSect.scrollIntoView({behavior: 'smooth'});
        updateDots(targetSect);
      });
      
      if (i === 0) dot.classList.add('active');

      appendNode(container, label);
      appendNode(container, dot);

      appendNode(dotsContainer, container);
    }
  }

  // Helper function to clear active progress dot
  function clearActiveDot() {
    let activeDot = document.querySelector('.progress-dot.active');
    if (activeDot) activeDot.classList.remove('active');
  }

  function updateDots(el) {
    clearActiveDot();

    // Hide progress dots when viewing last section
    if (el.id !== 'switch-pat') {
      document.querySelector(`.progress-dot[data-section-id="${el.dataset.sectionId}"]`).classList.add('active');
    }
  }

  // Patho-page styling update
  if (pageId === 'pathogenesis') {
    document.querySelector('#footer').classList.add('hidden');
    document.body.classList.add('dk-purple');

    const PATHO_SECTION_ID_CONFIG = {
      'id_0': 'Patho About IgAN Start',
      'id_1': 'Patho About IgAN frame 1',
      'id_2': 'Patho About IgAN frame 2',
      'id_4': 'Patho APRIL/4-Hit Section Start',
      'id_6': 'Patho APRIL frame 1',
      'id_7': 'Patho APRIL frame 2',
      'id_8': 'Patho APRIL frame 3',
      'id_9': 'Patho Hit 1',
      'id_10': 'Patho Hit 2',
      'id_11': 'Patho Hit 3',
      'id_13': 'Patho Hit 4',
      'id_14': 'Patho Conclusion frame 1',
      'id_15': 'Patho Conclusion frame 2',
      'id_17': 'Patho IgAN Patient Selection',
      'id_18': 'Patho Page Footer'
    }

    // Receive JS calls from Unity backend
    window.CallExternalJS = function(msg) {
      // console.log(msg);
      switch (msg) {
        case 'patient_1':
          window.dataLayer = window.dataLayer || [];   
          window.dataLayer.push({
              'event': 'custom_event', 
              'eventName': 'cta_link_click',      
              'eventLabel': 'Sarah'
          });
          goToPage('progression/sarah');
          break;
        case 'patient_2':
          window.dataLayer = window.dataLayer || [];   
          window.dataLayer.push({
              'event': 'custom_event', 
              'eventName': 'cta_link_click',      
              'eventLabel': 'Carlos'
          });
          goToPage('progression/carlos');
          break;
        case 'patient_3':
          window.dataLayer = window.dataLayer || [];   
          window.dataLayer.push({
              'event': 'custom_event', 
              'eventName': 'cta_link_click',      
              'eventLabel': 'Mark'
          });
          goToPage('progression/mark');
          break;
        case 'privpolicy':
          window.open('https://www.otsuka-us.com/privacy-policy', '_blank');
          break;
        case 'sitemap':
          goToPage('site-map');
          break;
        case 'terms':
          window.open('https://www.otsuka-us.com/terms-and-conditions', '_blank');
          break;
        case 'logoclick':
          window.open('https://www.otsuka-us.com/', '_blank');
          break;
        case 'skip_to_top':
          // Fire on Carousel
          window.dataLayer = window.dataLayer || [];   
          window.dataLayer.push({
              'event': 'custom_event', 
              'eventName': 'carousel_click',      
              'eventLabel': 'Patho About IgAN Start'
          });
          break;
        case 'skip_to_chapter':
          // Fire on Carousel
          window.dataLayer = window.dataLayer || [];   
          window.dataLayer.push({
              'event': 'custom_event', 
              'eventName': 'carousel_click',      
              'eventLabel': 'Patho APRIL/4-Hit Section Start'
          });
          break;
        case 'cta_link_click':
          window.dataLayer = window.dataLayer || [];   
          window.dataLayer.push({
              'event': 'custom_event', 
              'eventName': 'cta_link_click',      
              'eventLabel': 'Learn more about the role of APRIL and other cytokines in B-cell development.'
          });
          break;
        case 'arrow_up':
          window.dataLayer = window.dataLayer || [];   
          window.dataLayer.push({
              'event': 'custom_event', 
              'eventName': 'cta_link_click',      
              'eventLabel': 'Up Arrow'
          });
          break;
        case 'arrow_down':
          window.dataLayer = window.dataLayer || [];   
          window.dataLayer.push({
              'event': 'custom_event', 
              'eventName': 'cta_link_click',      
              'eventLabel': 'Down Arrow'
          });
          break;
        default:
          break;
      }

      if (Object.keys(PATHO_SECTION_ID_CONFIG).includes(msg)) {
        window.dataLayer = window.dataLayer || [];   
        window.dataLayer.push({
            'event': 'custom_event', 
            'eventName': 'section_view',      
            'eventLabel': PATHO_SECTION_ID_CONFIG[msg]
        });
      }
    }
  }

  // Patient-page functions to run
  if (patPages.includes(pageId)) {
    if (!IS_MOBILE) buildProgressDots();

    if (IS_MOBILE || IS_TABLET) initBioTray();
    
    let carousel = $(".owl-carousel").owlCarousel({
      loop: true,
      center: true,
      dots: true,
      items: 1,
      responsive: {
        0: {
          stagePadding: 15,
          margin: 10,
          nav: false,
          autoWidth: false
        },
        750: {
          nav: true,
          stagePadding: 25,
          margin: 15
        },
        992: {
          stagePadding: 40,
          margin: 15,
          nav: true
        }
      }
    });

    carousel.on('changed.owl.carousel', function(e) {

      // On carousel change, update the corresponding stat in the baseline assessment bio info
      setTimeout(function() {
        document.querySelectorAll('.active-stat').forEach(stat => stat.classList.remove('active-stat'));
        let activeCarItem = document.querySelector('.owl-item.active');
        let targetId = activeCarItem.querySelector('.carousel-block').id;
        document.querySelectorAll(`.bio-info-stat[data-stat-id="${targetId}"]`).forEach(stat => stat.classList.add('active-stat'));
      }, 100);
    });

    // Replace default carousel arrows with svg arrows
    document.querySelectorAll('.owl-nav button').forEach((btn) => {
      let arrow = document.createElement('div');
      arrow.classList.add('custom-car-arrow');
      btn.innerHTML = '';
      appendNode(btn, arrow);
    });

    
    if (!IS_MOBILE) {
      setTimeout(function() {
        addPatPageBottomScrollTrigger();
        addPatPageProgressScrollTriggers();
      }, 1500);
    }

    // Add hotspot link functionality to MEST-C Score Modal
    document.querySelectorAll('[data-modal-id="mest-c-score"] .hotspot').forEach(link => {
      link.addEventListener('click', function() {
        window.open('https://www.sciencedirect.com/journal/american-journal-of-kidney-diseases', '_blank');
      });
    });

    // Carlos & Mark Pages Only
    if (pageId === 'pat-profile-mark' || pageId === 'pat-profile-carlos') {
      // Accordion functionality
      let accBtn = document.querySelector('.acc-header');
      let accContent = document.querySelector('.acc-content');
      accBtn.addEventListener('click', function() {
        document.querySelector('.acc-content').classList.contains('open') ? closeAccordion() : openAccordion();
      });

      function openAccordion() {
        gsap.to(accContent, {height: 'auto', duration: 0.5, ease: Power1.easeOut});
        gsap.to('.acc-header .acc-arrow', {transformOrigin: 'center', transform: 'rotateX(180deg)', duration: 0.5, ease: Power0.easeNone, onComplete: function() {
          accContent.classList.add('open');
          if (!IS_MOBILE) {
            ScrollTrigger.killAll();
            addPatPageBottomScrollTrigger();
            addPatPageProgressScrollTriggers();
          }
        }});
      }

      function closeAccordion() {
        gsap.to(accContent, {height: '0', duration: 0.25, ease: Power1.easeOut});
        gsap.to('.acc-header .acc-arrow', {transformOrigin: 'center', transform: 'rotateX(0)', duration: 0.25, ease: Power0.easeNone, onComplete: function() {
          accContent.classList.remove('open');
          if (!IS_MOBILE) {
            ScrollTrigger.killAll();
            addPatPageBottomScrollTrigger();
            addPatPageProgressScrollTriggers();
          }
        }});
      }

      // Histopathological labels
      let histoTags = document.querySelectorAll('.histo-tag');
      histoTags.forEach(tag => tag.addEventListener('click', function() {
        this.classList.contains('open') ? this.classList.remove('open') : this.classList.add('open');
      }));
    }
  }

  function addPatPageBottomScrollTrigger() {
    // Add a scroll trigger to hide/show the scroll arrow and progress dots 
    ScrollTrigger.create({
      trigger: '.switch-pat-section',
      start: 'top 60%',
      onEnter: function() {
        if (!IS_MOBILE) dotsContainer.classList.add('hidden');
      },
      onLeaveBack: function() {
        if (!IS_MOBILE) dotsContainer.classList.remove('hidden');
      }
    });
  }

  function addPatPageProgressScrollTriggers() {
    document.querySelectorAll('section[data-section-id]').forEach(sect => {
      // If on desktop, create a scroll trigger for each section to trigger its progress dot
      ScrollTrigger.create({
        trigger: sect,
        start: 'top 40%',
        end: 'bottom 40%',
        onEnter: function() {
          updateDots(sect);
        },
        onEnterBack: function() {
          updateDots(sect);
        }
      });
    });
  }

});