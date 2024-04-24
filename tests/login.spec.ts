import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login';
import { beforeEach, describe } from 'node:test';

require('dotenv').config();

const url = process.env.URL as string
const apiUrl = process.env.API_URL as string
const email = process.env.EMAIL as string
const pass = process.env.PASS as string
test.describe('Negative scenarios',async ()=>{
  let loginPage: LoginPage

  test.beforeEach(async ({page})=>{
    loginPage = new LoginPage(page)
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

// test.describe('e2e Login with API and setting token',()=>{
//   let loginPage: LoginPage

//   test.beforeEach(async ({page})=>{
//     // 
//     loginPage = new LoginPage(page)
//     await loginPage.apiLogin(url, email, pass)
//   })

//   test.only('e2e login',async({page})=>{
//     await page.goto(url+'client')
//     expect(page.url()).toContain('/client')

//   })
// })

test.only('test',async ({page})=>{
const loginPage = new LoginPage(page)
await loginPage.apiLogin(apiUrl, email, pass,url)
await page.goto(url+'client')

})
