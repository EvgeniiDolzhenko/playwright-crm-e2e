import {test as base,expect} from '@playwright/test'
import { LoginPage } from '../pages/login'
import { ClientsPage } from '../pages/clients'

export type TestOptions = {
    loginPage: LoginPage
    clientsPage : ClientsPage
}

const test = base.extend<TestOptions>({
    loginPage: async({page},use)=>{
        await use(new LoginPage(page))
    },
    clientsPage : async({page},use)=>{
        await use(new ClientsPage(page))
    }
})

export{test,expect}