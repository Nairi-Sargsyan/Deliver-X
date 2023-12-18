function slider() {
    // Open Slider Retaurant \\

    const cards = document.querySelectorAll('.why-our__card'),
        nextBtn = document.querySelector('.btn__next'),
        prevBtn = document.querySelector('.btn__prev');

    let cardIndex = 1;

    showCards(cardIndex);

    function showCards(n) {
        if (n > cards.length) {
            cardIndex = 1;
        }

        if (n < 1) {
            cardIndex = cards.length;
        }

        cards.forEach(item => item.style.cssText = `
            opacity: 0;
        `);

        cards[cardIndex - 1].style.cssText = `
            opacity: 1;
        `;
    }

    function plusCards(n) {
        showCards(cardIndex += n);
    }

    prevBtn.addEventListener('click', () => {
        plusCards(-1);
    });

    nextBtn.addEventListener('click', () => {
        plusCards(1);
    });

    // Close Slider Retaurant \\
}

module.exports = slider;