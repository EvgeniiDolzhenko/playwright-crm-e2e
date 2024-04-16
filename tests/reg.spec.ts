import { test, expect } from '@playwright/test';
// @ts-ignore
import dotenv from 'dotenv';
dotenv.config();

test.describe('Negative scenarios registration',async ()=>{

    test.beforeEach(async ({page})=>{
        await page.goto(process.env.URL)
        expect(await page.url()).toBe(process.env.URL)
    })

    test('Email is not valid email error',async ({page})=>{

        const allInputs = page.locator('input')
        for (const input of await allInputs.all()){
            await input.fill('test')
            await input.clear()
        }
        const requiredError = page.locator('[class="ant-form-item-explain-error"]')
        for(const error of await requiredError.all()){
            await expect(error).toBeVisible()
            await expect(error).toHaveCSS('color','rgb(255, 77, 79)')
        }



    })



})