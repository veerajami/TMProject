import { resolve } from "path";
import { browser, Config } from "protractor";

export let config: Config = {
  getPageTimeout: 30000,
  onPrepare: () => {
    browser.manage().timeouts().implicitlyWait(35000);
    browser.manage().timeouts().pageLoadTimeout(100000);
  },
  capabilities: {browserName: "chrome" },
  framework : "jasmine2",
  specs : [resolve("dist/e2e/specs/*.spec.js")],
  exclude : [resolve("dist/e2e/specs/scenario1.spec.js")],
  jasmineNodeOpts: { defaultTimeoutInterval: 2500000 },
  onComplete: async () => {
    await browser.quit();
  }
};