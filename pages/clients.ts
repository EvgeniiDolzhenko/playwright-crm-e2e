import {  Locator, Page } from "@playwright/test"

export class ClientsPage{
    readonly page : Page
    readonly locator : Locator
    readonly createButton : Locator
    readonly clientName : Locator
    readonly clientPhone : Locator
    readonly createClientButton : Locator
    

    constructor(page:Page){
        this.page = page
        this.createButton = this.page.locator('button',{hasText:'Create Client'})
        this.clientName = this.page.locator('[class="ant-drawer-content-wrapper"] [id="name"]')
        this.clientPhone = this.page.locator('[class="ant-drawer-content-wrapper"] [id="phone"]')
        this.createClientButton = this.page.locator('[class="ant-drawer-content-wrapper"] button',{hasText:'Create'})
    }

}
