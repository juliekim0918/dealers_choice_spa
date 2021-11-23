const express = require("express");
const app = express.Router();
const {
  db,
  syncAndSeed,
  models: { Animal, Trainer },
} = require("../db");
const path = require('path')
app.use(require('method-override')('_method'))
app.get("/animals", async (req, res, next) => {
    res.send(await Animal.findAll({include: Trainer}))
});

app.delete("/animals/:id", async (req, res, next) => {
    try {
        const animal = await Animal.findByPk(req.params.id)
        console.log(animal)
        await animal.destroy();
        res.redirect('../../../')
     
    } catch (e) {
        console.log(e)
 }
});

app.get('/trainers', async (req, res, next) => {
    res.send(await Trainer.findAll({include: Animal}))
})

module.exports = app;
