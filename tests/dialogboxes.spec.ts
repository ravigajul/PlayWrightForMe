import {test,expect} from '@playwright/test'

test('Dialog Box',async({page})=>{
    await page.goto("http://localhost:4200/pages/iot-dashboard");
    await page.getByText("Tables & Data").click();
    await page.getByText("Smart Table").click();

    page.on('dialog',dialog=>{
        expect(dialog.message()).toEqual('Are you sure you want to delete?');
        dialog.accept();
    })
    //the dialog box is dismissed by default
    await page.getByRole('table').locator('tr',{hasText:"fat@yandex.ru"}).locator('.nb-trash').click();
    await expect(page.locator('table tr').first()).not.toHaveText('fat@yandex.ru');

})