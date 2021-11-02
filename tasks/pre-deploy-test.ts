import directory from "../src/directory/directory";
const handler = require("serve-handler");
const puppeteer = require("puppeteer");
const http = require("http");
const generatePathMap = require("../generatePathMap.cjs");

const pathmap = generatePathMap(directory);
const paths: string[] = [];
Object.keys(pathmap).forEach((path) => {
  paths.push(path);
});

const buildPath = "client/www/next-build";

const server = http.createServer((request, response) => {
  return handler(request, response, {
    public: buildPath,
  });
});

server.listen(3000, () => {
  console.log("Running at http://localhost:3000");
  checkPages(server);
});

async function checkPages(server) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.on("response", (response) => {
    if (response.status() !== 200) {
      console.warn(
        `Found broken link: ${response.url()} on page ${response
          .request()
          .url()}`,
      );
    }
  });

  for (let i = 0; i < paths.length; i++) {
    let path = paths[i];

    console.log("Testing: ", `http://localhost:3000${path}`);

    await page.goto(`http://localhost:3000${path}`);

    if (path !== "/404") {
      const content = await page.$eval("body", (el) => el.textContent.trim());

      const textOn404Page =
        "Apologies––we can't seem to find the page for which you're looking.";
      const textOnErrorPage = "An unexpected error has occurred.";

      const error404 = content.includes(textOn404Page);
      const errorRuntime = content.includes(textOnErrorPage);
      const buildError = error404 || errorRuntime;

      if (buildError) {
        console.error("Found error on:", path);
        console.error("404:", error404);
        console.error("Error:", errorRuntime);
        process.exit(1);
      }
    }
  }

  await browser.close();
  server.close(() => {
    console.log("Server closed!");
  });
}
