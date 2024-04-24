import {  Page } from "@playwright/test"


export class LoginPage{

    readonly page:Page
    readonly localStorage : Storage



    constructor(page : Page){
        this.page = page
        this.localStorage = this.localStorage
        
    }

    async apiLogin(url:string,email:string,pass:string, uiUrl:string){
        const response = await this.page.request.post(url+'/user/login',{
            data:{
                email:email,
                password:pass 
            }
        })
     

        const responseBody = await response.json()
        const token = responseBody.payload.token
        await this.page.goto(uiUrl)
    
        await this.page.evaluate((token) => {
            localStorage.setItem('token', token);
        }, token);
  


    

    }


}