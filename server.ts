import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';

const path = require("path");
const fs = require("fs");
const axios = require('axios');
require("dotenv").config();

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  let env = process.env;

  const distPath = "dist/level-up";

  const files = fs.readdirSync(`${distPath}/`);

  let mainjs: any = null;

  let mainFullPath = files.find((file: any) => file.match("main.*.js"));

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


  server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
  });

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });

  server.get('/games', async (req, res) => {
    try {
      const response = await axios.get('https://www.freetogame.com/api/games');
      res.json(response.data);
    } catch (error) {
      console.error('Erro ao obter os jogos:', error);
      res.status(500).json({ error: 'Erro ao obter os jogos' });
    }
});

server.get('/games/:id', async (req, res) => {
  const gameId = req.params.id;

  try {
    const response = await axios.get(`https://www.freetogame.com/api/game?id=${gameId}`);
    res.json(response.data);
  } catch (error) {
    console.error('Erro ao obter os dados do jogo:', error);
    res.status(500).json({ error: 'Erro ao obter o jogo' });
  }
});

server.get('/games/category/:category', async (req, res) => {
  const category = req.params.category;

  try {
    const response = await axios.get(`https://www.freetogame.com/api/games?category=${category}`);
    res.json(response.data);
  } catch (error) {
    console.error('Erro ao obter os jogos por categoria:', error);
    res.status(500).json({ error: 'Erro ao obter os jogos por categoria' });
  }
});

server.get('/games/order/:order', async (req, res) => {
  const order = req.params.order;

  try {
    const response = await axios.get(`https://www.freetogame.com/api/games?sort-by=${order}`);
    res.json(response.data);
  } catch (error) {
    console.error('Erro ao obter os jogos por categoria:', error);
    res.status(500).json({ error: 'Erro ao obter os jogos por categoria' });
  }
});

  // Serve static files from /browser
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Angular engine
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
