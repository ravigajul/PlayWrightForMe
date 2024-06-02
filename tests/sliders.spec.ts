import { test, expect } from "@playwright/test";

test('Sliders', async ({ page }) => {
  await page.goto("http://localhost:4200/pages/iot-dashboard");
  
  //update attributes using javascript
  const tempGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')
  await tempGauge.evaluate(node=>{
    node.setAttribute('cx','232.630'),
    node.setAttribute('cy','232.630')
  }) //this will just slide the circle but event is not triggered
  await tempGauge.click(); //this will trigger the event
  
  //simulating mouse movement
  const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
  await tempBox.scrollIntoViewIfNeeded() //scrolling into view 

  const box = await tempBox.boundingBox();
  if(box){
    const x = box.x + box.width/2;
    const y = box.y + box.height/2;
    await page.mouse.move(x+100, y);
    await page.mouse.down();
    await page.mouse.move(x + 100, y);
    await page.mouse.move(x + 100, y+100);
    await page.mouse.up();
    await expect(tempBox).toContainText('30');
  }

 

});