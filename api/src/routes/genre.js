require('dotenv').config();
const { Router } = require('express');
const axios = require('axios');
const { Genre } = require('../db')
const { API_KEY } = process.env;
const router = Router();

router.get('/', async (req,res,next) => {
    try {
        const apiGenres = (await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`)).data.results
        const filteredApiGenres = apiGenres.map(genre => {
            return {
                name : genre.name,
            }
        })
        filteredApiGenres.forEach(async (genre) => {
            await Genre.findOrCreate({
                where : {name : genre.name},
                defaults: {
                    name : genre.name
                }
            })
        })
        const localGenres = await Genre.findAll()
        res.send(localGenres)
    } catch (error) {
        next(error)
    }
})

module.exports = router;