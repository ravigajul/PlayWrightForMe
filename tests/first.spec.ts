import { test, expect } from '@playwright/test';

// Use the test.beforeEach hook to run setup code before each test.
test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/pages/iot-dashboard');
        await page.getByText('Forms').click();
        await page.getByText('Form Layouts').click();
})

test('Locator Syntax Rules', async ({ page }) => {
    // By tagname
   //await page.locator('input').fill('Ravi');

   // By id
   await page.locator('#inputEmail1').fill('ravi.gajul@test.com')

   //By class 
   // await page.locator('.input-full-width').fill('Ravi Gajul')

    //By attribute
   // await page.locator('[placeholder="Email"]').fill('Ravi.gajul@test.com')

    //combine different selectors
    await page.locator('input#inputPassword2').fill('Password')

    //By xpath not recommended
   // await page.locator('//input[@id=inputEmail1').fill('Ravi Gajul')

    //by partial text
    await page.locator(':text("Using")').click()

    //by exact text
    await page.locator(':text("Using the Grid")').click()
    
})

test('User Facing locators', async ({ page }) => {  
   await page.getByRole('textbox',{name:"Email"}).first().click();   
   await page.getByRole('button',{name:"Sign in"}).first().click();    
   await page.getByLabel('Email').first().fill('Ravi.gajul@test.com');  
   await page.getByPlaceholder('Password').first().fill('Ravipassword');  
   await page.getByText('Sign in').first().click();     
   await page.getByTitle('IOT Dashboard').first().click();                             
})                                      