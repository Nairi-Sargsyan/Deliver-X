'use strict';

import slider from './modules/slider';
import navBar from './modules/navbar';
import modal from './modules/modal';
import dataRegisterForm from './modules/data-register-form';
import dataCleintResponseForm from './modules/data-client-response-form';
import carousel from './modules/carousel';

document.addEventListener('DOMContentLoaded', () => {


    slider();
    navBar();
    modal('.modal__sing-in', '.modal__sing-up');
    dataRegisterForm('.modal__sing-in', '.modal__sing-up');
    dataCleintResponseForm();
    carousel();
})



