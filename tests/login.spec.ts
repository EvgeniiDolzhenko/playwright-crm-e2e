import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login';

require('dotenv').config();

const url = process.env.URL as string
const apiUrl = process.env.API_URL as string
const email = process.env.EMAIL as string
const pass = process.env.PASS as string

test.describe('Negative scenarios',async ()=>{

  test.beforeEach(async ({page})=>{
    await page.goto(url+'user/login');
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

test.describe('Verify api login',()=>{

  test.beforeEach(async ({page})=>{
    const loginPage = new LoginPage(page)
    await loginPage.apiLogin(apiUrl, email, pass,url)
  })

  test('Verify API login',async({page})=>{
    await page.goto(url+'client')
    expect(page.url()).toContain('/client')
  })

  test('Verify order page',async({page})=>{
    await page.goto(url+'order')
    expect(page.url()).toContain('/order')
  })

  test('Verify vendor page',async({page})=>{
    const loginPage = new LoginPage(page)
    await loginPage.apiLogin(apiUrl, email, pass,url)
    await page.goto(url+'vendor')
    expect(page.url()).toContain('/vendor')
  })

  test('Verify service page',async({page})=>{
    const loginPage = new LoginPage(page)
    await loginPage.apiLogin(apiUrl, email, pass,url)
    await page.goto(url+'service')
    expect(page.url()).toContain('/service')
  })



  
 
})

