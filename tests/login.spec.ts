import { test, expect } from '@playwright/test';
// @ts-ignore
import dotenv from 'dotenv';
dotenv.config();

test.describe('Negative scenarios',async ()=>{

  test.beforeEach(async ({page})=>{
    await page.goto(process.env.URL+'user/login');
  })

  test('Email is not valid email error',async ({page})=>{
    await page.locator('#normal_login_email').fill('email')
    await page.locator('#normal_login_password').fill('password')
    await expect( page.locator('.ant-form-item-explain-error')).toBeVisible();
  })

})
