function closeModal(logIn, singUp) {
    const modalLogIn = document.querySelector(logIn),
        modalSingUp = document.querySelector(singUp);

    modalLogIn.classList.remove('show');
    modalLogIn.classList.remove('show-two');
    modalSingUp.classList.remove('show-two');
    document.body.style.overflow = '';
}


function modal(logIn, singUp) {
    // Open Modal \\

    const modalLogIn = document.querySelector(logIn),
        modalSingUp = document.querySelector(singUp),
        btnOpenModal = document.querySelectorAll('[data-btn-register]'),
        btnCloseModal = document.querySelectorAll('[data-close-modal]'),
        btnLogIn = document.querySelector('[data-open-log-in]'),
        btnSingUp = document.querySelector('[data-open-sing-up]');


    function openModal() {
        modalLogIn.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    btnOpenModal.forEach(item => {
        item.addEventListener('click', () => {
            openModal();
        });
    });

    btnCloseModal.forEach(item => {
        item.addEventListener('click', () => {
            closeModal(logIn, singUp);
        });
    });

    btnSingUp.addEventListener('click', () => {
        modalLogIn.classList.add('show-two');
        modalSingUp.classList.add('show-two');
    });

    btnLogIn.addEventListener('click', () => {
        modalLogIn.classList.remove('show-two');
        modalSingUp.classList.remove('show-two');
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modalLogIn.classList.contains('show')) {
            closeModal();
        }
    });

    // Close Modal \\
}

export default modal;
export { closeModal }