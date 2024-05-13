import { test, expect } from '../common/test';
require('dotenv').config();

const url = process.env.URL as string
const apiUrl = process.env.API_URL as string
const email = process.env.EMAIL as string
const pass = process.env.PASS as string

test.describe('Create new client',async ()=>{
    let clientID : string
    
    test.beforeEach(async ({loginPage})=>{
        await loginPage.apiLogin(apiUrl, email, pass,url)
    })
    test('Create new client',async ({page,clientsPage})=>{
        await page.goto(url+'client')
        const response = await page.waitForResponse('**/client/search')
        expect(page.url()).toContain('/client')
        const body = await response.json()
        expect(response.status()).toEqual(200)
        expect(body.message).toEqual('ClientSearch ok')
        await clientsPage.createButton.click()
        await page.waitForTimeout(500)
        expect(await page.locator('[class="ant-drawer-content-wrapper"]').isVisible()).toBeTruthy()
        await clientsPage.clientName.fill('Testing Name')
        await clientsPage.clientPhone.fill('1234567890')
        await clientsPage.createClientButton.click()
        const newClient = await page.waitForResponse('**/client')
        expect(newClient.status()).toEqual(200)
        const newClientBody = await newClient.json()
        clientID = await newClientBody.payload
        await page.locator(`[href="/v5/client/${clientID}"]`).click()
        expect(page.url()).toContain(clientID)
        await expect( page.locator('h1',{hasText:'Testing Name'})).toBeVisible()
        await page.close()
    })
  })
