import { expect } from '@playwright/test';
import {logindata} from '../data/data_login.js';
const { chromium } = require('playwright');


class Login {

constructor (page) {
    this.page = page;
    this.inputEmail = page.locator("//input[@name='email']"); 
    this.inputPassword = page.locator("//input[@name='password']");
    this.loginSubmitButton = page.locator("//input[@type='submit']");

}

async openPage(page, targetPage){
    try {
        let response = await this.page.goto(`${targetPage}`);
        if (response && response.status() == 404) throw new Error('Страница не загрузилась или вернула ошибку 404');
        //await page.waitForLoadState('networkidle'); // Ожидание полной загрузки страницы
        await this.page.waitForLoadState('load');
    } catch (error) {
        throw new Error('Произошла ошибка при загрузке страницы:', error);
    }
   }


async login( targetPage){
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await this.page.goto(`${targetPage}`);
    await this.page.fill(inputEmail, logindata.email);
    await this.page.fill(inputPassword, logindata.password);
    await this.page.click(loginSubmitButton);
    await expect(page).toHaveURL(/.*account/)
}


}

module.exports = {
    Login}
