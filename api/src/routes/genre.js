require('dotenv').config();
const { Router } = require('express');
const axios = require('axios');
const { Genre } = require('../db')
const { API_KEY } = process.env;
const router = Router();

router.get('/', async (req,res,next) => {
    try {
        const genres = await Genre.findAll()
        if(genres.length < 1){
            const apiGenres = (await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`)).data.results
            for await(let genre of apiGenres) {
                await Genre.create({
                        name : genre.name
                })
            }
            const localGenres = await Genre.findAll()
            return res.send(localGenres)
        } else res.send(genres)
    } catch (error) {
        next(error)
    }
})

module.exports = router;