import {Login} from "../pages/Login";
import { test, expect } from '@playwright/test';
import { pages as pg } from '../data/pagesURLs';



test('Login in Account', async ({ page }) => {
    const loginInstance = new Login();
    await loginInstance.login(page, pg.loginPage);
})