import { createWriteStream } from "fs";
import { mkdirpSync } from "fs-extra";
import { resolve } from "path";
import { browser, Config } from "protractor";
const date = new Date();
const locale = "en-us";
const month = date.toLocaleString(locale, { month: "long" });
const timeStamp =
  date.getDate() +
  "-" +
  month +
  "-" +
  date.getFullYear() +
  "_" +
  date.getHours() +
  "h_" +
  date.getMinutes() +
  "m_" +
  date.getSeconds() +
  "s_" +
  date.getMilliseconds() +
  "ms";
const filepath = "./reports/reports_" + timeStamp + "/";
export let config: Config = {
  // getPageTimeout: 30000,
  beforeLaunch: async () => {
    try {
      // mkdirSync(filepath);
      mkdirpSync(filepath + "screenshots");
      await browser.sleep(5000);
    } catch (e) {
      console.log("path already exist");
    }
  },
  onPrepare: async () => {
    await browser.manage().timeouts().implicitlyWait(35000);
    await browser.manage().timeouts().pageLoadTimeout(45000);
    const SpecReporter = require("jasmine-spec-reporter").SpecReporter;
    jasmine
      .getEnv()
      .addReporter(new SpecReporter({ displayStacktrace: "all" }));
    // Script to create JUnit xml
    const jasmineReporters = require("jasmine-reporters");
    jasmine.getEnv().addReporter(
      new jasmineReporters.JUnitXmlReporter({
        consolidateAll: true,
        savePath: filepath,
        filePrefix: "xmloutput",
      })
    );
    jasmine.getEnv().addReporter({
      specDone: async (result) => {
        if (result.status === "failed") {
          const caps = await browser.getCapabilities();
          const browserName = caps.get("browserName");
          const png = await browser.takeScreenshot();
          const stream = createWriteStream(
            `${filepath}screenshots/${browserName}-${result.fullName}.png`
          );
          stream.write(Buffer.from(png, "base64"));
          stream.end();
        }
      },
    });
  },
  capabilities: { browserName: "chrome" },
  framework: "jasmine2",
  specs: [resolve("dist/e2e/specs/scenario2.spec.js")],
  exclude: [resolve("dist/e2e/specs/scenario1.spec.js")],
  jasmineNodeOpts: { defaultTimeoutInterval: 2500000 },
  onComplete: async () => {
    const capsPromise = await browser.getCapabilities();
    const browserName = capsPromise.get("browserName");
    const browserVersion = capsPromise.get("version");
    const HTMLReport = require("protractor-html-reporter-2");
    const testConfig = {
      reportTitle: "TestReport_" + timeStamp,
      outputPath: filepath,
      screenshotPath: resolve(filepath + "screenshots"),
      testBrowser: browserName,
      browserVersion,
      modifiedSuiteName: false,
      screenshotsOnlyOnFailure: true,
      outputFilename: `${browserName}`,
    };
    new HTMLReport().from(filepath + "xmloutput.xml", testConfig);
    await browser.quit();
  },
};
