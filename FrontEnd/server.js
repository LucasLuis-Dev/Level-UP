const express = require('express');
const path = require("path");
const fs = require("fs");
const axios = require('axios');
require("dotenv").config();


const server = express()

const port = process.env['PORT'] || 4000;

  let env = process.env;

  const distPath = "dist/level-up/browser";

  const files = fs.readdirSync(`${distPath}/`);

  let mainjs = null;

  let mainFullPath = files.find((file) => file.match("main.*.js"));

  if (mainFullPath) {
    mainFullPath = `${distPath}/${mainFullPath}`;

    mainjs = fs.readFileSync(mainFullPath).toString();

    fs.copyFileSync(mainFullPath, "dist/main.cache.js");

    
    Object.keys(env).forEach((key) => {
      if (key.startsWith("RP_")) {
        var regex = new RegExp("\\$" + key, "g");
        console.log(`replacing ${key} with ${env[key]}`);
        mainjs = mainjs.replaceAll(regex, env[key]);
      }
    });
    
    fs.writeFileSync(mainFullPath, mainjs);
  }

  function cleanUp() {
    try {
      fs.copyFileSync("dist/main.cache.js", mainFullPath);

      fs.rmSync("dist/main.cache.js");
    } catch (error) {}
  }

  process.on("SIGTERM", () => {
    cleanUp();
  });
  process.on("SIGINT", () => {
    cleanUp();
  });

  
  server.use(express.static(path.join(__dirname, distPath)));

  server.get("/*", (request, response) => {
    response.sendFile(path.join(`${__dirname}/${distPath}/index.html`));
  });

  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });