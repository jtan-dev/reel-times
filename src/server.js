const puppeteer = require("puppeteer");
const express = require("express");

const app = express();

app.get("/showtimes", async (req, res) => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 250,
  });

  const page = await browser.newPage();

  await page.goto(
    "https://www.landmarkcinemas.com/showtimes/winnipeg-grant-park"
  );

  await page.setViewport({ width: 1080, height: 1024 });

  const filmData = await page
    .locator(".listingitem")
    .filter((div) => !div.className.includes("dn"));

  console.log(filmData);

  page.on("console", (msg) => console.log("PAGE LOG:", msg.text()));

  await browser.close();
});

app.listen(4000);
