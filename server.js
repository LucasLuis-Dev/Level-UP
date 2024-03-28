const express = require('express');
const path = require("path");
const fs = require("fs");
const axios = require('axios');
require("dotenv").config();


const server = express()

server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

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

  server.get("/", (request, response) => {
    response.sendFile(path.join(`${__dirname}/${distPath}/index.html`));
  });

  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });