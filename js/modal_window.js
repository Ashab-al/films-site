const modalController = ({modal, btnOpen, btnClose, time = 300}) => {
  const buttonElements = document.querySelectorAll(btnOpen);
  const modalElement  = document.querySelector(modal)

  modalElement.style.cssText = `
    display: flex;
    visibility: hidden;
    opacity: 0;
    transition: opacity ${time}ms ease-in-out;
  `;

  const closeModal = event =>{
    const target = event.target;

    if (target === modalElement || 
      (btnClose && target.closest(btnClose)) ||
      event.code === 'Escape'
      ) {
      modalElement.style.opacity = 0;

      setTimeout(() => {
        modalElement.style.visibility = 'hidden';
      }, time)

      window.removeEventListener('keydown', closeModal);
    }
  }

  const openModal = () => {
    modalElement.style.visibility = 'visible';
    modalElement.style.opacity = 1;
    window.addEventListener('keydown', closeModal)
  };

  buttonElements.forEach(btn => {
    btn.addEventListener('click', openModal);
  })
  
  modalElement.addEventListener('click', closeModal);
}


modalController({
  modal: '.modal1',
  btnOpen: '.entrance',
  btnClose: '.modal__close'
});

modalController({
  modal: '.modal2',
  btnOpen: '.registration',
  btnClose: '.modal__close'
});
