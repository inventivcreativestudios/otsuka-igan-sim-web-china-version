setTimeout(function() {
  if (pageId === 'pat-profile-sarah') {
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
    let s4Blurb = section4.querySelector('#state-1-blurb');
    let s4Slider = section4.querySelector('.range-slider');
    let ffHotspots;

    // Firefox-specific functionality
    if (document.body.classList.contains('isFirefox')) {
      ffHotspots = section4.querySelector('.ff-hotspots');
      ffHotspots.classList.remove('hidden');
      s4Slider.classList.add('hidden');

      ffHotspots.querySelectorAll('.hotspot').forEach(el => el.addEventListener('click', function() {
        hideS4ActiveSliderContent();
        section4.querySelector(`.risk-radial#${this.id}`).classList.add('visible');
        section4.querySelector(`.slider#${this.id}`).classList.add('visible');

        pushToGTM(this.dataset.value);
      }));

    } else {
      s4Slider.addEventListener('input', (e) => {
        let inputId = 'section-4-state-' + e.target.value;
        let gtmVal;
        hideS4ActiveSliderContent();
    
        if (inputId === 'section-4-state-1') s4Blurb.classList.add('visible');
        section4.querySelector(`.slider#${inputId}`).classList.add('visible');
        section4.querySelector(`.risk-radial#${inputId}`).classList.add('visible');
  
        switch (e.target.value) {
          case '1':
            gtmVal = '0.5 g/d';
            break;
          case '2':
            gtmVal = '0.75 g/d';
            break;
          case '3':
            gtmVal = '1.0 g/d';
            break;
          default:
            break;
        }

        pushToGTM(gtmVal);
      });
    }

    function pushToGTM(val) {
      //Pass below code on every slider interaction/click on any page
      window.dataLayer = window.dataLayer || [];  
      window.dataLayer.push({
        'event': 'slider_hotspot_click', 
        'sectionId': 'section-4',   //Pass id of that section e.g. section-5, section-6  
        'title': 'Impact of Proteinuria',   //Pass h1 header title; e.g., Impact of Proteinuria, Change in Proteinuria and eGFR Over Time 
        'value': val //Pass the text Value such as 0.5 g/d, 0.75 g/d, At Biopsy, 2 Years, 3 Years
      });
    }

    function hideS4ActiveSliderContent() {
      s4Blurb.classList.remove('visible');
      section4.querySelector(`.slider.visible`).classList.remove('visible');
      section4.querySelector('.risk-radial.visible').classList.remove('visible');
    }

    ////////////////////////////////////////////////////////////////////////////////////////
    // Section 5 Functionality
    let section5 = document.querySelector('section[data-section-id="5"]');
    // let s5Hotspots = section5.querySelectorAll('.slider-hotspot');
    let s5Slider = section5.querySelector('.range-slider');
    
    s5Slider.addEventListener('input', (e) => {
      let inputId = 'section-5-state-' + e.target.value;
      let gtmVal;
      hideS5ActiveSliderContent();

      section5.querySelector(`.slider#${inputId}${mobileClass}`).classList.add('visible');
      section5.querySelectorAll(`.graph#${inputId}${mobileClass}`).forEach(graph => graph.classList.add('visible'));

      switch (e.target.value) {
        case '1':
          gtmVal = 'At Biopsy';
          break;
        case '2':
          gtmVal = '2 Years';
          break;
        case '3':
          gtmVal = '4 Years';
          break;
        case '4':
          gtmVal = '6 Years';
          break;
        default:
          break;
      }

      //Pass below code on every slider interaction/click on any page
      window.dataLayer = window.dataLayer || [];  
      window.dataLayer.push({
        'event': 'slider_hotspot_click', 
        'sectionId': 'section-5',
        'title': 'Changes in Proteinuria and eGFR Over Time',
        'value': gtmVal
      });

    });

    function hideS5ActiveSliderContent() {
      section5.querySelector(`.slider.visible${mobileClass}`).classList.remove('visible');
      section5.querySelectorAll(`.graph.visible${mobileClass}`).forEach(graph => graph.classList.remove('visible'));
    }

    ////////////////////////////////////////////////////////////////////////////////////////
    // Section 6 Functionality
    let section6 = document.querySelector('section[data-section-id="6"]');
    let s6Hotspots = section6.querySelectorAll('.hotspot');
    
    s6Hotspots.forEach(hotspot => {
      hotspot.addEventListener('click', function() {
        hideS6ActiveSliderContent();
        section6.querySelector(`.graph#${this.id}${mobileClass}`).classList.add('visible');
      });
    });

    function hideS6ActiveSliderContent() {
      section6.querySelector(`.graph.visible${mobileClass}`).classList.remove('visible');
    }
  }
}, 100);
