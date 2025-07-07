setTimeout(function() {
  if (pageId === 'pat-profile-carlos') {
    let mobileClass= IS_MOBILE ? '.mobile-graph' : '';

    ////////////////////////////////////////////////////////////////////////////////////////
    // Section 3 Functionality
    let section3 = document.querySelector('section[data-section-id="3"]');
    let s3Hotspots = section3.querySelectorAll('.hotspot');
    
    s3Hotspots.forEach(hotspot => {
      hotspot.addEventListener('click', function() {
        hideS3ActiveSliderContent();
        section3.querySelector(`.graph#${this.id}${mobileClass}`).classList.add('visible');
      });
    });

    function hideS3ActiveSliderContent() {
      section3.querySelector(`.graph.visible${mobileClass}`).classList.remove('visible');
    }

    ////////////////////////////////////////////////////////////////////////////////////////
    // Section 4 Functionality
    let section4 = document.querySelector('section[data-section-id="4"]');
    let s4Hotspots = section4.querySelectorAll('.hotspot');
    
    s4Hotspots.forEach(hotspot => {
      hotspot.addEventListener('click', function() {
        hideS4ActiveSliderContent();
        section4.querySelector(`.graph#${this.id}${mobileClass}`).classList.add('visible');
      });
    });

    function hideS4ActiveSliderContent() {
      section4.querySelector(`.graph.visible${mobileClass}`).classList.remove('visible');
    }

    ////////////////////////////////////////////////////////////////////////////////////////
    // Section 5 Functionality
    let section5 = document.querySelector('section[data-section-id="5"]');
    // let s5Hotspots = section5.querySelectorAll('.slider-hotspot');
    let s5Sliders = section5.querySelectorAll('.range-slider');
    
    s5Sliders.forEach(slider => {
      slider.addEventListener('input', function(e) {
        let inputId = 'section-5-state-' + e.target.value;
        let gtmVal;
        hideS5ActiveSliderContent();

        section5.querySelector(`.slider-lower#${inputId}${mobileClass}`).classList.add('visible');
        section5.querySelector(`.slider-upper#${inputId}${mobileClass}`).classList.add('visible');
        section5.querySelector(`.text-bubble#${inputId}`).classList.add('visible');
        section5.querySelector(`.graphic#${inputId}`).classList.add('visible');
        section5.querySelectorAll(`.graph#${inputId}${mobileClass}`).forEach(graph => graph.classList.add('visible'));

        switch (e.target.value) {
          case '1':
            gtmVal = 'At Biopsy';
            document.querySelectorAll('.group-1').forEach(tag => tag.classList.remove('hidden'));
            document.querySelectorAll('.group-3').forEach(tag => tag.classList.add('hidden'));
            break;
          case '2':
            gtmVal = '2 Years';
            document.querySelectorAll('.group-1').forEach(tag => tag.classList.add('hidden'));
            document.querySelectorAll('.group-3').forEach(tag => tag.classList.add('hidden'));
            break;
          case '3':
            gtmVal = '4 Years';
            document.querySelectorAll('.group-1').forEach(tag => tag.classList.add('hidden'));
            document.querySelectorAll('.group-3').forEach(tag => tag.classList.remove('hidden'));
            break;
          case '4':
            gtmVal = '6 Years';
            document.querySelectorAll('.group-1').forEach(tag => tag.classList.add('hidden'));
            document.querySelectorAll('.group-3').forEach(tag => tag.classList.add('hidden'));
            break;
          default:
            break;
        }
  
        //Pass below code on every slider interaction/click on any page
        window.dataLayer = window.dataLayer || [];  
        window.dataLayer.push({
          'event': 'slider_hotspot_click', 
          'sectionId': 'section-5',
          'title': 'Histopathological Changes Caused by IgAN',
          'value': gtmVal
        });
      });
    });

    function hideS5ActiveSliderContent() {
      section5.querySelector(`.slider-lower.visible${mobileClass}`).classList.remove('visible');
      section5.querySelector(`.slider-upper.visible${mobileClass}`).classList.remove('visible');
      section5.querySelector('.graphic.visible').classList.remove('visible');
      section5.querySelector(`.text-bubble.visible`).classList.remove('visible');
      section5.querySelectorAll(`.graph.visible${mobileClass}`).forEach(graph => graph.classList.remove('visible'));
    }

    ////////////////////////////////////////////////////////////////////////////////////////
    // Section 6 Functionality
    let section6 = document.querySelector('section[data-section-id="6"] #content-box');
    let s6Hotspots = section6.querySelectorAll('.content-hotspot');
    
    s6Hotspots.forEach(hotspot => {
      hotspot.addEventListener('click', function() {
        hideS6ActiveSliderContent();
        section6.querySelector(`.content-img#${this.id}${mobileClass}`).classList.add('visible');
      });
    });

    function hideS6ActiveSliderContent() {
      section6.querySelector(`.content-img.visible${mobileClass}`).classList.remove('visible');
    }

        ////////////////////////////////////////////////////////////////////////////////////////
    // Section 7 Functionality
    let section7 = document.querySelector('section[data-section-id="7"]');
    let s7Hotspots = section7.querySelectorAll('.hotspot');
    
    s7Hotspots.forEach(hotspot => {
      hotspot.addEventListener('click', function() {
        hideS7ActiveSliderContent();
        section7.querySelector(`.graph#${this.id}${mobileClass}`).classList.add('visible');
      });
    });

    function hideS7ActiveSliderContent() {
      section7.querySelector(`.graph.visible${mobileClass}`).classList.remove('visible');
    }
    
  }
}, 100);