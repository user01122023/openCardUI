import { test } from '@playwright/test';
test('login',async ({page, baseURL}) => {
    await page.goto(baseURL);
} )