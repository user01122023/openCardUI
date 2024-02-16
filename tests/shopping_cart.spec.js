import { test, expect } from '@playwright/test';
import { pages as pg } from '../data/pagesURLs';
import { openPage, login, addItemToCart, changeQuantityValue, deleteCart, openSelectedItem, applyCouponCode } from '../data/methods';
import {removeItemFromCart,addToCart } from '../data/locators';


test.describe('Shopping cart tests', () => {

    test.beforeEach('Login in Account', async ({ page }) => {
        await login(page, pg.loginPage);
        
    });

    test.afterEach('Remove items from a cart', async ({ page }) => {
        await deleteCart(page, pg.shoppingCartPage);
    })

    test('Open shopping cart page', async ({ page }) => {
        await openPage(page, pg.shoppingCartPage);
        await expect(page).toHaveURL(/.*cart/)
    })

    test('Check if the specific item was added to a shopping cart', async ({ page }) => {
        // GIVEN
        const itemName = "iPhone 3GS 16Gb";
        const selectedItem = "//button[@onclick=\"cart.add('40');\"]";
        const itemInTheCart = `(//a[contains(text(),'${itemName}')])[2]`;

        // WHEN
        await addItemToCart(page, pg.mainPage, selectedItem, itemName);
        await openPage(page, pg.shoppingCartPage);
        
        // THEN
        expect(itemInTheCart).toContain(itemName)
    })

    test('Check if the specific added item was added in the desired quantity', async ({ page }) => {
        // GIVEN
        const itemName = "MacBook";
        const selectedItem = "//button[@onclick=\"cart.add('43');\"]";
        const quantityValue = page.locator("//input[contains(@name,'quantity')]");
        const value = "1";

        // WHEN
        await addItemToCart(page, pg.mainPage, selectedItem, itemName);
        await openPage(page, pg.shoppingCartPage);
        
        // THEN
        await expect(page.getByText(itemName).first()).toContainText(itemName);
        const expectedValue = await quantityValue.inputValue();
        console.log(expectedValue)
        expect(expectedValue).toEqual(value)
    })

    test('Check if the added item has a correct price', async ({ page }) => {
        // GIVEN
        const itemPrice = '123.20';
        const itemName = "iPhone 3GS 16Gb";
        const selectedItem = "//button[@onclick=\"cart.add('40');\"]";

        // WHEN
        await addItemToCart(page, pg.mainPage, selectedItem, itemName);
        await openPage(page, pg.shoppingCartPage);
        const result = await page.locator(`(//td[contains(text(),'${itemPrice}')])[3]`).textContent(); 
        
        // THEN
        console.log(result)
        expect(result).toContain(itemPrice)
    })

    test('Check if the added item could be removed from the shopping cart', async ({ page }) => {
        // GIVEN
        const itemName = "iPhone 3GS 16Gb";
        const selectedItem = "//button[@onclick=\"cart.add('40');\"]";

        // WHEN
        await addItemToCart(page, pg.mainPage, selectedItem, itemName);
        await openPage(page, pg.shoppingCartPage);
        await page.locator(removeItemFromCart).click();

        //THEN
        await expect(page.locator("(//p[contains(text(),'Your shopping cart is empty!')])[2]")).toHaveText('Your shopping cart is empty!')
        // const result = await page.locator("(//p[contains(text(),'Your shopping cart is empty!')])[2]").textContent();
        // console.log(result)
        // expect (result).toContain('Your shopping cart is empty!') 

    })

    test('Check if the quantity of aded item in the shopping cart could be changed', async ({ page }) => {
        // GIVEN
        const itemName = "MacBook";
        const selectedItem = "//button[@onclick=\"cart.add('43');\"]";
        const quantityValue = page.locator("//input[contains(@name,'quantity')]");
        const value = "3";

        // WHEN
        await addItemToCart(page, pg.mainPage, selectedItem, itemName);
        await changeQuantityValue(page, pg.shoppingCartPage, value);

        // THEN
        expect(await quantityValue.inputValue()).toContain(value)
    })

    test.skip('Check if the selected item could be added to a shopping cart from the item page with selecting additional options', async ({ page }) => {
        // GIVEN
        const itemName = "Canon EOS 5D";
        const selectedItem = "//button[@onclick=\"cart.add('30');\"]";

        // WHEN
        await openSelectedItem(page, pg.mainPage, selectedItem, itemName);
        ///READ/FIND HOW TO WORK WITH SELECT ELEMENT AND DROP BOX
    })

    test('Check if the valid coupon code could be applied', async ({ page }) => {
        // GIVEN
        const couponCode = "C1111";
        const itemName = "MacBook";
        const selectedItem = "//button[@onclick=\"cart.add('43');\"]";
        
        // WHEN
        await addItemToCart(page, pg.mainPage, selectedItem, itemName);
        await applyCouponCode(page, pg.shoppingCartPage, couponCode);

        // THEN
        console.log(await page.locator(`//*[contains(text(),'Coupon (${couponCode}):')]`).textContent())
        expect(await page.locator(`//*[contains(text(),'Coupon (${couponCode}):')]`).textContent()).toContain(couponCode)
        // const result = await page.locator(`//*[contains(text(),'Coupon (${couponCode}):')]`).textContent();
        // console.log(result)
        // expect(result).toBeTruthy();
        // expect(result).toContain(couponCode)

    })
    /// Separate test for each coupon??
    test.skip('Applied coupon should be calculated correctly', async ({ page }) => {
        // GIVEN
        const couponCode = "C1111";
        const itemName = "MacBook";
        const selectedItem = "//button[@onclick=\"cart.add('43');\"]";

        // WHEN
        await addItemToCart(page, pg.mainPage, selectedItem, itemName);
        await applyCouponCode(page, pg.shoppingCartPage, couponCode);

        // THEN
        // if C1111 => discount = -$10
        // if C2222 => discount = -10%
        // if C3333 => discount = free shipping
    })

    // NEGATIVE TESTS
    test('Check if the selected item could NOT be added to a shopping cart from the item page without selecting additional options', async ({ page }) => {
        // GIVEN
        const itemName = "Apple Cinema 30";
        const selectedItem = "(//a[normalize-space()=\'Apple Cinema 30\"'])[1]";

        // WHEN
        await openSelectedItem(page, pg.mainPage, selectedItem, itemName);
        await page.locator(addToCart).click();
        await expect(page.locator("(//*[@class='text-danger'])[1]")).toBeVisible();

    })

    test('The invalid coupon code should NOT be applied', async ({ page }) => {

    })

    
})