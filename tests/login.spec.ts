import { test, expect } from '@playwright/test';
require('dotenv').config();

const url = process.env.URL as string
test.describe('Negative scenarios',async ()=>{

  test.beforeEach(async ({page})=>{
    await page.goto(url+'user/login',{ waitUntil: 'load' });
  })

  test('Email is not valid email error',async ({page})=>{
    await page.locator('#normal_login_email').fill('email')
    await page.locator('#normal_login_password').fill('password')
    await expect( page.locator('.ant-form-item-explain-error')).toBeVisible();
  })

  test('Required error', async ({page}) => {
    await page.locator('#normal_login_email').fill('email@email.com');
    await page.locator('#normal_login_email').clear()
    await expect( page.locator('.ant-form-item-explain-error')).toBeVisible()
    await expect( page.locator('.ant-form-item-explain-error')).toHaveCSS('color','rgb(255, 77, 79)')
  })

})

