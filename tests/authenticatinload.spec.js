import {test} from '@playwright/test'
test.use({storageState:'auth.json'});

test('test',async ({page})=>{
    await page.goto ('https://github.com/microsoft/playwright')
})