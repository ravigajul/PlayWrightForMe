import {test,Page} from '@playwright/test'

/** This test is 
 * reading data from .env file as environment variable */
test('test-options test go to base url',async({page})=>{

    //this is getting the base url from test config process.env.URL and navigating to /ajax
    await page.goto('/ajax');
    console.log(process.env.NAME)
    console.log(process.env.EMAIL)
})