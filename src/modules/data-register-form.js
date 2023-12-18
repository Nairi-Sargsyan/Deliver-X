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