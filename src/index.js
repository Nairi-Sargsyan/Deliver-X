'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const slider = require('./modules/slider'),
        navBar = require('./modules/navbar'),
        modal = require('./modules/modal'),
        dataRegisterForm = require('./modules/data-register-form'),
        dataCleintResponseForm = require('./modules/data-client-response-form'),
        carousel = require('./modules/carousel');

    slider();
    navBar();
    modal();
    dataRegisterForm();
    dataCleintResponseForm();
    carousel();
})



