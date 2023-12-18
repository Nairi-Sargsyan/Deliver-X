function modal() {
    // Open Modal \\

    const modalLogIn = document.querySelector('.modal__sing-in'),
        modalSingUp = document.querySelector('.modal__sing-up'),
        btnOpenModal = document.querySelectorAll('[data-btn-register]'),
        btnCloseModal = document.querySelectorAll('[data-close-modal]'),
        btnLogIn = document.querySelector('[data-open-log-in]'),
        btnSingUp = document.querySelector('[data-open-sing-up]');


    function openModal() {
        modalLogIn.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modalLogIn.classList.remove('show');
        modalLogIn.classList.remove('show-two');
        modalSingUp.classList.remove('show-two');
        document.body.style.overflow = '';
    }

    btnOpenModal.forEach(item => {
        item.addEventListener('click', () => {
            openModal();
        });
    });

    btnCloseModal.forEach(item => {
        item.addEventListener('click', () => {
            closeModal();
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

module.exports = modal;