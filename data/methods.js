import { logo, loginLocators, successItemAddMessage, quantityValue,updateQuantity, successItemUpdateMessage, couponCodeInput, couponCodeApply,couponApplyMessage, useCoupon} from './locators';
import { expect } from '@playwright/test';
import {logindata} from '../data/data_login.js';

 /** Метод открывает страницу
 * @param {*} page - дефолтный параметр
 * @param {String} targetPage - целевой адрес страницы
 */ 
export async function openPage(page, targetPage){
    try {
        let response = await page.goto(`${targetPage}`);
        if (response && response.status() == 404) throw new Error('Страница не загрузилась или вернула ошибку 404');
        //await page.waitForLoadState('networkidle'); // Ожидание полной загрузки страницы
        await page.waitForLoadState('load');
    } catch (error) {
        throw new Error('Произошла ошибка при загрузке страницы:', error);
    }
   }


/** Метод проверяет наличие логотипа
 * @param {*} page - дефолтный параметр
 */
export async function checkLogo(page){
  const element = await page.$(logo.img); //Поиск селектора на странице
    if (element) {
      true  ;

  const link = await page.$eval(logo.imgLink, link => link.href); //Получение ссылки
    if (link) {
  
      const response = await page.goto(link, { timeout: 5000, waitUntil: 'domcontentloaded' }).catch(() => null); //Проверка валидности ссылки
        if (response) {
          true;
        } else {
          throw new Error(`${link} - невалидная ссылка`)
      }
     } else {
       throw new Error('Ссылка не найдена')
     }

     } else {
      throw new Error('Селектор не найден на странице')
  }
}

/**
 * Метод проверки наличия и кликабельности элемента
 * @param {*} page 
 * @param {String} button - селектор
 * @param {Boolean} clickable - признак кликабельности элемента, по умолчанию true
 */
export async function checkButton(page, button, clickable = true){
  const element = await page.$(`${button}`); //Поиск селектора на странице

  await expect(`${button}`).toBeVisible()
  console.log(`${button}`)
  //console.log(await page.$(`${button}`))
    /*
  if (element) {
      true ;
    } else {
      throw new Error(`Селектор ${button} не найден на странице`)
    }
  const isClickable = await element.isIntersectingViewport();//проверка кликабельности
    if (isClickable && clickable){
      true;
    } else {
      throw new Error(`Элемент ${button} не сщщтветсвует условиям кликабельности`)
    } 
    */
  }

export async function login(page, targetPage){
    await page.goto(`${targetPage}`);
    await page.fill(loginLocators.email, logindata.email);
    await page.fill(loginLocators.password, logindata.password);
    await page.click(loginLocators.submit);
    await expect(page).toHaveURL(/.*account/)
}

export async function addItemToCart(page, targetPage, selectedItem, item){
    await page.goto(`${targetPage}`);
    await page.click(`${selectedItem}`);
    const message = await page.locator(successItemAddMessage).textContent();
    console.log(message)
    expect(message).toContain(`Success: You have added ${item} to your shopping cart!`)
}

export async function changeQuantityValue(page, targetPage, value){
    await page.goto(`${targetPage}`);
    await page.locator(quantityValue).clear()
    await page.fill(quantityValue, `${value}`);
    await page.click(updateQuantity);
    const message = await page.locator(successItemUpdateMessage).textContent();
    console.log(message);
    expect(message).toContain('Success: You have modified your shopping cart!')
}

export async function deleteCart(page, targetPage){
    await page.goto(`${targetPage}`);
    const fullShoppingCart = await page.locator("(//div[@id='cart'])[1]").innerText();
    console.log(fullShoppingCart);
    if(fullShoppingCart === " 0 item(s) - $0.00"){
       true;
    }else{
      await page.locator("//*[@data-original-title='Remove']").click();
    }
}

export async function openSelectedItem(page, targetPage, selectedItem, item){
    await page.goto(`${targetPage}`);
    await page.click(`${selectedItem}`);
    await expect(page).toHaveTitle(`${item}`);

}

export async function applyCouponCode(page, targetPage, couponCode){
    await page.goto(`${targetPage}`);
    await page.click(useCoupon);
    await page.fill(couponCodeInput, `${couponCode}`);
    await page.click(couponCodeApply);
    if(`${couponCode}` === "C1111" || `${couponCode}` === "C2222" || `${couponCode}` === "C3333"){
      const successMessage = await page.locator(couponApplyMessage).textContent();
      expect (successMessage).toContain(" Success: Your coupon discount has been applied!")
    }else{
      const failedMessage = await page.locator(couponApplyMessage).textContent();
      expect (failedMessage).toContain(" Warning: Coupon is either invalid, expired or reached its usage limit!")
    }
}


