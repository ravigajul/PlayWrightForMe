import { test as base } from "@playwright/test";
import { PageManager } from "./page-objects/pageManager";

export type TestOptions = {
  globalsQAUrl: string;
  formLayoutsPage: string;
  pageManager: PageManager;
};

export const test = base.extend<TestOptions>({
  globalsQAUrl: ["", { option: true }],
  formLayoutsPage: 
    async ({ page }, use) => {
      await page.goto("/");
      await page.getByText("Forms").click();
      await page.getByText("Form Layouts").click();
    //   await use(""); //using this to activate the fixture. All lines before 
    //   this line works as initialization (beforehook/ before each even before these).Lines after this will work as tear down
    },
  pageManager: async ({ page, formLayoutsPage }, use) => { //formslayoutpage is created as a dependant fixture.
    const pageManager = new PageManager(page);
    await use(pageManager);
  },
});
