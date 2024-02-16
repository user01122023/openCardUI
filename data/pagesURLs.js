import{ use } from '../playwright.config.js';

const pages = {
    mainPage: use.baseURL,
    registerPage: use.baseURL + 'index.php?route=account/register',
    contactsPage: use.baseURL + 'index.php?route=information/contact',
    loginPage: use.baseURL + 'index.php?route=account/login',
    shoppingCartPage: use.baseURL + 'index.php?route=checkout/cart',
    accountPage: use.baseURL + 'index.php?route=account/account',
   }

export{ pages }