import { test as base } from "@playwright/test";

export type TestOptions = {
  globalsQAUrl: string;
};

export const test = base.extend<TestOptions>({
  globalsQAUrl: ["", { option: true }],
});
