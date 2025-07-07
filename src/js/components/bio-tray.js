let tray;

function initBioTray() {
  let trayCloseBtns = document.querySelectorAll('#tray-close');
  let trayOpenBtns = document.querySelectorAll('.mobile-bio-trigger');

  trayOpenBtns.forEach(btn => btn.addEventListener('click', function() {
    tray = document.querySelector(`.mobile-bio-tray#${this.dataset.trayId}`)
    openBioTray();
  }));
  trayCloseBtns.forEach(btn => btn.addEventListener('click', closeBioTray));
}

function openBioTray() {
  gsap.to(overlay, {display: 'block', opacity: 1, duration: 0.5, delay: 0});
  gsap.to(tray, {transform: 'translateX(0)', duration: 0.4, ease: Power1.easeOut, delay: 0.3});
}

function closeBioTray() {
  gsap.to(overlay, {display: 'none', opacity: 0, duration: 0.25, delay: 0});
  gsap.to(tray, {transform: 'translateX(-100vw)', duration: 0.3, ease: Power0.easeNone, delay: 0});
}