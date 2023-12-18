function carousel() {
    // Open Carousel Clients \\

    const carouselWrapper = document.querySelector('.clients__card-wrapper');

    function createCarousel() {

        const carouselWrapperWidth = parseFloat(window.getComputedStyle(carouselWrapper).width),
            carouselInner = document.querySelector('.clients__card-inner'),
            btnPrev = document.querySelector('.slider__btn_left'),
            btnNext = document.querySelector('.slider__btn_right'),
            bgCards = document.querySelectorAll('.bg');

        const cardToSlide = 3,
            bgCardArray = [];

        let position = 0,
            cardToShow;

        if (carouselWrapperWidth > 1200) {
            cardToShow = 3;
        } else if (carouselWrapperWidth < 1200 && carouselWrapperWidth >= 700) {
            cardToShow = 2;
        } else if (carouselWrapperWidth < 700) {
            cardToShow = 1;
        }

        bgCards.forEach(item => {
            const bgItemsWidth = item.style.minWidth = (carouselWrapperWidth / cardToShow) + 'px';
            bgCardArray.push(bgItemsWidth);
        });

        let bgCardArrayLength;

        if (carouselWrapperWidth < 1200 && carouselWrapperWidth >= 700) {
            bgCardArrayLength = bgCardArray.length - 2;
        } else if (carouselWrapperWidth < 700) {
            bgCardArrayLength = bgCardArray.length - 1;
        } else {
            bgCardArrayLength = bgCardArray.length - 3;
        }

        let itemWidth = bgCardArray[cardToSlide],
            cardWidth = parseFloat(itemWidth.slice(0, itemWidth.length - 2));

        function nextCard() {
            position += cardWidth;
            carouselInner.style.left = `-${position}px`;

            if (position > cardWidth * (bgCardArrayLength)) {
                position = 0;
                carouselInner.style.left = `${position}px`;
            }
        }

        function prevCard() {
            if (position <= 0) {
                position = position + cardWidth * (bgCardArrayLength);
                carouselInner.style.left = `-${position}px`;
            } else {
                position = position - cardWidth;
                carouselInner.style.left = `-${position}px`;
            }
        }

        btnNext.addEventListener('click', () => {
            nextCard();
        });

        btnPrev.addEventListener('click', () => {
            prevCard();
        });

        return {
            nextCard,
            prevCard,
            bgCardArray,
        };
    }

    const carousel = createCarousel();

    // Close Carousel Clients \\

    // Open Swipe Carousel \\

    let touchStartX;

    carouselWrapper.addEventListener('touchstart', handleTouchStart);
    carouselWrapper.addEventListener('touchmove', handleTouchMove);
    carouselWrapper.addEventListener('touchend', handleTouchEnd);


    function handleTouchStart(event) {
        touchStartX = event.touches[0].clientX;
    }

    function handleTouchMove(event) {
        if (!touchStartX) return;

        const touchEndX = event.touches[0].clientX;
        const deltaX = touchEndX - touchStartX;

        if (deltaX > 0) {
            carousel.prevCard();
        } else if (deltaX < 0) {
            carousel.nextCard();
        }

        touchStartX = null;
    }

    function handleTouchEnd() {
        touchStartX = null;
    }

    window.addEventListener('resize', () => {
        createCarousel();
    });

    // Close Swipe Carousel \\
}

module.exports = carousel;