import { test, expect } from '@playwright/test';
require('dotenv').config();

const url = process.env.URL as string



test.describe('Negative scenarios registration',async ()=>{

    test.beforeEach(async ({page})=>{
        await page.goto(url,{ waitUntil: 'load' })
        expect( page.url()).toBe(url )
    })

    test('Verify requre errors',async ({page})=>{
        const allInputs = page.locator('input')
        for (const input of await allInputs.all()){
            await input.fill('test')
            await input.clear()
        }
        const requiredError = page.locator('[class="ant-form-item-explain-error"]')
        await expect(requiredError).toBeDefined();
        await expect(requiredError).toHaveCount(5)
        for(const error of await requiredError.all()){
            await expect(error).toBeVisible()
            await expect(error).toHaveCSS('color','rgb(255, 77, 79)')
        }



    })



})