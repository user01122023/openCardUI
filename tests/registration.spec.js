import { test,expect } from '@playwright/test';

test.skip('Login', async ({ page, baseURL }) => {

    await page.goto(baseURL);
    await page.locator("(//li[@class='dropdown'])[1]").click();
    await page.locator("(//a[normalize-space()='Register'])[1]").click();
    
    await expect(page).toHaveURL("https://eurosmeta.com/index.php?route=account/register")

})