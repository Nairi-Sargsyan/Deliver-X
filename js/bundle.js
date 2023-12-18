/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/carousel.js":
/*!*********************************!*\
  !*** ./src/modules/carousel.js ***!
  \*********************************/
/***/ ((module) => {

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

/***/ }),

/***/ "./src/modules/data-client-response-form.js":
/*!**************************************************!*\
  !*** ./src/modules/data-client-response-form.js ***!
  \**************************************************/
/***/ ((module) => {

function dataClientResponseForm() {
    // Open Get Data Client Response Form  \\

    const clentRensposeForm = document.querySelector('.block__textarea_content'),
        cardsInner = document.querySelector('.clients__card-inner'),
        warningtext = document.querySelector('.warning__text'),
        responseClient = document.querySelector('#clientTextarea'),
        clientNameInput = document.querySelector('#clientName'),
        clientAddressInput = document.querySelector('#clientAddress'),
        counterLength = document.querySelector('.counter__length');

    function createClientCard(text, name, address) {
        cardsInner.insertAdjacentHTML('afterbegin', `
            <div class="bg">
                <div class="clients__card">
                    <div class="card__user d-flex justify-content-between align-items-center mb-4">
                        <div class="user__info d-flex">
                            <div class="user__image me-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                                </svg>
                            </div>
                            <div class="user__name d-flex flex-column justify-content-center">
                                <h5 class="name">${name.value}</h5>
                                <p class="addres">${address.value}</p>
                            </div>
                        </div>
                        <div class="card__mark">
                            <input type="checkbox" name="" id="client__mark">
                            <span class="mark_heart"></span>
                        </div>
                    </div>
                    <div class="card__user-text">
                        <p class="card_md_text text-start">${text.value}</p>
                    </div>
                </div>
            </div>
        `);
    }

    function checkEmptyClientsInput(input) {
        const inputEmpty = input.value.trim() == '';
        if (inputEmpty) {
            warningtext.innerHTML = 'The field must be filled';
        } else {
            warningtext.innerHTML = '';
        }

        return !inputEmpty;
    }

    function countLength(input, counter, maxLength) {
        input.addEventListener('input', () => {
            let inputTextLength = input.value.length;
            counter.innerHTML = inputTextLength + ' / ' + maxLength
        });
    }

    countLength(responseClient, counterLength, 150);

    clientNameInput.addEventListener('input', () => {
        checkEmptyClientsInput(clientNameInput);
    });

    clientAddressInput.addEventListener('input', () => {
        checkEmptyClientsInput(clientAddressInput);
    });

    responseClient.addEventListener('input', () => {
        checkEmptyClientsInput(responseClient);
    });

    function postClientResponseData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const isClientNameInputEmpty = checkEmptyClientsInput(clientNameInput),
                isClientAddressInputEmpty = checkEmptyClientsInput(clientAddressInput),
                isResponseClientEmpty = checkEmptyClientsInput(responseClient);


            if (isClientNameInputEmpty && isClientAddressInputEmpty && isResponseClientEmpty) {
                const singUpData = new FormData(form);
                const jsonSingUp = JSON.stringify(Object.fromEntries(singUpData.entries()));

                postData('http://localhost:3000/requestClietnResponse', jsonSingUp)
                    .then(data => {
                        console.log(data);
                        createClientCard(responseClient, clientNameInput, clientAddressInput);
                        createCarousel();
                    })
                    .catch(() => {
                        console.log('Щось пішло не так!');
                    })
                    .finally(() => {
                        form.reset();
                    });
            } else {
                warningtext.innerHTML = 'The field must be filled';
            }
        });
    }

    postClientResponseData(clentRensposeForm);

    // Close Get Data Client Response Form  \\
}

module.exports = dataClientResponseForm;

/***/ }),

/***/ "./src/modules/data-register-form.js":
/*!*******************************************!*\
  !*** ./src/modules/data-register-form.js ***!
  \*******************************************/
/***/ ((module) => {

function dataRegisterForm() {
    // Open Get Data Register Form  \\

    const formSingUp = document.querySelector('.sing-up__modal-body'),
        formLogIn = document.querySelector('.sing-in__modal-body');

    const inputFullName = document.querySelector('#input__full-name'),
        inputPassword = document.querySelector('#inputPassword'),
        inputConfirmPassword = document.querySelector('#inputConfirmPassword'),
        inputEmailAddress = document.querySelector('#input__email-address'),
        inputCheckPrivasy = document.querySelector('#checkbox__privacy'),
        blockNameMark = document.querySelector('.input__full-name'),
        blockEmailMark = document.querySelector('.input__email'),
        blockPasswordMark = document.querySelector('#block__password'),
        blockConfirmMark = document.querySelector('#block__confirm-password'),
        btnPassswordHide = document.querySelectorAll('.password__hide');

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: data
        });

        return await res.json();
    }

    function postLogInData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const logInData = new FormData(form);
            const jsonLogIn = JSON.stringify(Object.fromEntries(logInData.entries()));

            postData('http://localhost:3000/requestsLogIn', jsonLogIn)
                .then(data => {
                    console.log(data);
                })
                .catch(() => {
                    console.log('Щось пішло не так!');
                })
                .finally(() => {
                    form.reset();
                })
        });
    }

    function checkEmptyInput(input, parentBlock) {
        const emptyInput = input.value.trim() == '';

        if (emptyInput) {
            parentBlock.classList.remove('success');
            parentBlock.classList.add('warning');
        } else {
            parentBlock.classList.remove('warning');
            parentBlock.classList.add('success');
        }
        console.log(!emptyInput);
        return !emptyInput;
    }

    function showPassword(checkbox) {
        const checkboxTarget = checkbox.getAttribute('data-target');
        let inputPass = document.getElementById(checkboxTarget);


        if (checkbox.checked) {
            inputPass.type = 'text';
        } else {
            inputPass.type = 'password';
        }
    }

    function checkSamePasswords(input) {

        const samePasswords = inputPassword.value === inputConfirmPassword.value;
        const passwordMinLength = input.value.length >= 8;

        if (samePasswords && passwordMinLength) {
            blockPasswordMark.classList.remove('warning');
            blockPasswordMark.classList.add('success');

            blockConfirmMark.classList.remove('warning');
            blockConfirmMark.classList.add('success');
        } else {
            blockPasswordMark.classList.remove('success');
            blockPasswordMark.classList.add('warning');

            blockConfirmMark.classList.remove('success');
            blockConfirmMark.classList.add('warning');
        }
        console.log(samePasswords && passwordMinLength);
        return samePasswords && passwordMinLength;
    }

    function checkEmailCondition(input, parentBlock) {
        const reg = /@gmail\.com/ig;
        const text = reg.test(input.value);
        if (text) {
            parentBlock.classList.remove('warning');
            parentBlock.classList.add('success');
        } else {
            parentBlock.classList.remove('success');
            parentBlock.classList.add('warning');
        }
        console.log(text);
        return text;
    }

    function removeSucceseClass(block) {
        block.classList.remove('success', 'warning');
    }

    btnPassswordHide.forEach(item => {
        item.addEventListener('click', () => {
            showPassword(item);
        });
    });

    inputFullName.addEventListener('input', () => {
        checkEmptyInput(inputFullName, blockNameMark);
    });

    inputEmailAddress.addEventListener('input', () => {
        checkEmptyInput(inputEmailAddress, blockEmailMark);
        checkEmailCondition(inputEmailAddress, blockEmailMark);
    });

    inputPassword.addEventListener('input', () => {
        checkSamePasswords(inputPassword);
    });

    inputConfirmPassword.addEventListener('input', () => {
        checkSamePasswords(inputConfirmPassword);
    });

    function postSingUpData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const isFullNameValid = checkEmptyInput(inputFullName, blockNameMark),
                isEmailValid = checkEmptyInput(inputEmailAddress, blockEmailMark),
                isPasswordValid = checkSamePasswords(inputPassword),
                isEmailCondition = checkEmailCondition(inputEmailAddress, blockEmailMark),
                isConfirmPasswordValid = checkSamePasswords(inputConfirmPassword),
                isCheckboxChecked = inputCheckPrivasy.checked;

            if (isFullNameValid && isEmailValid && isEmailCondition && isConfirmPasswordValid && isPasswordValid && isCheckboxChecked) {
                const singUpData = new FormData(form);
                const jsonSingUp = JSON.stringify(Object.fromEntries(singUpData.entries()));

                postData('http://localhost:3000/requestsSingUp', jsonSingUp)
                    .then(data => {
                        console.log(data);
                    })
                    .catch(() => {
                        console.log('Щось пішло не так!');
                    })
                    .finally(() => {
                        form.reset();
                        removeSucceseClass(blockNameMark);
                        removeSucceseClass(blockEmailMark);
                        removeSucceseClass(blockPasswordMark);
                        removeSucceseClass(blockConfirmMark);
                        closeModal();
                    });
            } else {
                console.log('Не виконані умови для відправлення форми.');
            }
        });
    }

    postSingUpData(formSingUp);
    postLogInData(formLogIn);

    // Close Get Data Register Form  \\
}

module.exports = dataRegisterForm;

/***/ }),

/***/ "./src/modules/modal.js":
/*!******************************!*\
  !*** ./src/modules/modal.js ***!
  \******************************/
/***/ ((module) => {

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

/***/ }),

/***/ "./src/modules/navbar.js":
/*!*******************************!*\
  !*** ./src/modules/navbar.js ***!
  \*******************************/
/***/ ((module) => {


function navBar() {
    // Open Navbar Toggle \\

    const navbarBtn = document.querySelector('.navbar__toggler'),
        navbarMenu = document.querySelector('.navbar'),
        body = document.querySelector('body'),
        navLink = document.querySelectorAll('.nav-link'),
        checkBox = document.querySelector('.mode__control'),
        mode = document.querySelector('.mode');

    // Open Navbar Checkbox Toggle \\

    if (localStorage.getItem('darkMode') === ('change')) {
        mode.classList.add('anim__checkbox');
        body.classList.add('anim__mode');
    }

    checkBox.addEventListener('click', (e) => {
        e.preventDefault();
        if (localStorage.getItem('darkMode') === ('change')) {
            localStorage.removeItem('darkMode');
            mode.classList.remove('anim__checkbox');
            body.classList.remove('anim__mode');
        } else {
            localStorage.setItem('darkMode', 'change');
            mode.classList.add('anim__checkbox');
            body.classList.add('anim__mode');
        }
    })

    // Close Navbar Checkbox Toggle \\

    navbarBtn.addEventListener('click', (e) => {
        e.preventDefault();
        navbarMenu.classList.toggle('active__toggler_menu');
        body.classList.toggle('lock');
        navLink.forEach(item => {
            item.classList.toggle('anim_border');
        })
    })

    // Close Navbar Toggle \\
}

module.exports = navBar;

/***/ }),

/***/ "./src/modules/slider.js":
/*!*******************************!*\
  !*** ./src/modules/slider.js ***!
  \*******************************/
/***/ ((module) => {

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

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/


document.addEventListener('DOMContentLoaded', () => {
    const slider = __webpack_require__(/*! ./modules/slider */ "./src/modules/slider.js"),
        navBar = __webpack_require__(/*! ./modules/navbar */ "./src/modules/navbar.js"),
        modal = __webpack_require__(/*! ./modules/modal */ "./src/modules/modal.js"),
        dataRegisterForm = __webpack_require__(/*! ./modules/data-register-form */ "./src/modules/data-register-form.js"),
        dataCleintResponseForm = __webpack_require__(/*! ./modules/data-client-response-form */ "./src/modules/data-client-response-form.js"),
        carousel = __webpack_require__(/*! ./modules/carousel */ "./src/modules/carousel.js");

    slider();
    navBar();
    modal();
    dataRegisterForm();
    dataCleintResponseForm();
    carousel();
})




})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map