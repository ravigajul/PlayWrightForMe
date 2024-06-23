import {expect} from '@playwright/test'
import {test} from '../test-options'


//This test is picking data from test-options as a fixture
test('test-options test go to globalqa url',async({page,globalsQAUrl})=>{
    await page.goto(globalsQAUrl);
})

