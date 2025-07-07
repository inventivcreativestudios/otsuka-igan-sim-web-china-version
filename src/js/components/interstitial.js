  // Interstitial Functionality
  let inter = document.querySelector('#interstitial');

  document.querySelector('#hcp-confirm').addEventListener('click', function() {
    hideInterstitial();
    localStorage.setItem('hcpConfirmed', 'true');
  });
  document.querySelector('#pat-redirect').addEventListener('click', function() {
    window.open('https://www.otsukapatiented.com/kidney-disease', '_self');
  });

  function hideInterstitial() {
    gsap.to(inter, {opacity: 0, display: 'none', duration: 0.25, ease: Power0.easeNone, delay: 0.1});
    if (pageId === 'pathogenesis') {
      document.body.classList.remove('overflow-hidden');
      document.body.classList.add('overflow-unset');
    }
  }

  function showInterstitial() {
    gsap.to(inter, {opacity: 1, display: 'flex', duration: 0.2, ease: Power0.easeNone, delay: 0.1});
    if (pageId === 'pathogenesis') {
      document.body.classList.add('overflow-hidden');
      document.body.classList.remove('overflow-unset');
    }
  }