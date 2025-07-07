let overlay = document.querySelector('#overlay');
overlay.addEventListener('click', closeModal);
document.querySelectorAll('.modal-close').forEach(el => el.addEventListener('click', closeModal));
document.querySelectorAll('.modal-trigger').forEach(el => el.addEventListener('click', function() {
  openModal(`[data-modal-id=${this.dataset.triggerId}`);
}));

function openModal(id) {
  let modal = document.querySelector(id);
  modal.style.display = 'block';
  let topPos = calcModalCenter(modal) + 'px';
  gsap.to(overlay, {display: 'block', opacity: 1, duration: 0.5, delay: 0});
  gsap.fromTo(modal, {top: 0}, {display: 'flex', opacity: 1, top: topPos, duration: 0.35, delay: 0.2});
  modal.classList.add('active-modal');

  if (pageId === 'pathogenesis') document.querySelector('html').style.overflow = 'hidden';
}

function closeModal() {
  let activeModal = document.querySelector('.modal.active-modal');

  if (activeModal) {
    gsap.to(activeModal, {display: 'none', opacity: 0, duration: 0.25, delay: 0});
    gsap.to(overlay, {display: 'none', opacity: 0, duration: 0.25, delay: 0});
    activeModal.classList.remove('active-modal');
  } else {
    closeBioTray();
  }

  if (pageId === 'pathogenesis') document.querySelector('html').style.overflow = 'auto';
}

function calcModalCenter(el) {
  let modalHeight = parseInt(window.getComputedStyle(el).height);
  let centerPos = (window.innerHeight - modalHeight) / 2;
  return centerPos;
}