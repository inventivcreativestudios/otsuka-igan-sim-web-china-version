setTimeout(function() {
  if (pageId === 'pat-profile-mark') {
    let mobileClass= IS_MOBILE ? '.mobile-graph' : '';

    ////////////////////////////////////////////////////////////////////////////////////////
    // Section 3 Functionality
    let section3 = document.querySelector('section[data-section-id="3"]');
    // let s3Hotspots = section3.querySelectorAll('.slider-hotspot');
    let s3Sliders = section3.querySelectorAll('.range-slider');
    
    s3Sliders.forEach(slider => {
      slider.addEventListener('input', function(e) {
        let inputId = 'section-3-state-' + e.target.value;
        let gtmVal;
        hideS3ActiveSliderContent();

        section3.querySelector(`.slider-lower#${inputId}${mobileClass}`).classList.add('visible');
        section3.querySelector(`.slider-upper#${inputId}${mobileClass}`).classList.add('visible');
        section3.querySelector(`.text-bubble#${inputId}`).classList.add('visible');
        section3.querySelector(`.graphic#${inputId}`).classList.add('visible');
        section3.querySelectorAll(`.graph#${inputId}${mobileClass}`).forEach(graph => graph.classList.add('visible'));

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
          'sectionId': 'section-3',
          'title': 'Impact of Crescents on IgAN Progression',
          'value': gtmVal
        });
      });
    });

    function hideS3ActiveSliderContent() {
      section3.querySelector(`.slider-lower.visible${mobileClass}`).classList.remove('visible');
      section3.querySelector(`.slider-upper.visible${mobileClass}`).classList.remove('visible');
      section3.querySelector('.graphic.visible').classList.remove('visible');
      section3.querySelector('.text-bubble.visible').classList.remove('visible');
      section3.querySelectorAll(`.graph.visible${mobileClass}`).forEach(graph => graph.classList.remove('visible'));
    }

    ////////////////////////////////////////////////////////////////////////////////////////
    // Section 5 Functionality
    let section5 = document.querySelector('section[data-section-id="5"]');
    let s5Hotspots = section5.querySelectorAll('.hotspot');
    
    s5Hotspots.forEach(hotspot => {
      hotspot.addEventListener('click', function() {
        hideS5ActiveSliderContent();
        section5.querySelector(`.graph#${this.id}${mobileClass}`).classList.add('visible');
      });
    });

    function hideS5ActiveSliderContent() {
      section5.querySelector(`.graph.visible${mobileClass}`).classList.remove('visible');
    }
  }
}, 100);