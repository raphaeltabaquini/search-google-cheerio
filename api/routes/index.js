var express = require('express');
var router = express.Router();
const cheerio = require('cheerio');
const axios = require('axios');

router.post('/', async (req, res) => {
  try {
    const promptEncoded = encodeURIComponent(req.body.prompt);
    const urlPesquisa = `https://www.google.com/search?q=${promptEncoded}`;

    axios.get(urlPesquisa, {responseEncoding: "latin1"}).then(({data: html}) => {
        const $ = cheerio.load(html);
        
        const data = [...$(".egMi0")].slice(0, 10).map(e => ({
            title: $(e).find("h3").text().trim(),
            href: $(e).find("a").attr("href").slice(7).split("&sa")[0]
          }
        ));

        res.json({message: "Success", results: data })
      }).catch(err => {
        console.error(err);
    });
  } catch (error) {
    res.json(error);
  }
})

module.exports = router;
