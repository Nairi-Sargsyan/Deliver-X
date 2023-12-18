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