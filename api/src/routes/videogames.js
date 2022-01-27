require('dotenv').config();
const axios = require('axios');
const { Router } = require('express');
const { Op } = require("sequelize");
const { Videogame, Genre } = require('../db')
const router = Router();
const { API_KEY } = process.env;


// /videogames debe obtener un listado de al menos 100
router.get('/', async (req,res,next) => {
    try {
    const {name,page} = req.query
    let apiVideogames = [],localVideogames = []
    const condition = { where: { name: { [Op.iLike]: `%${name}%`} },
                        includes: Genre}
    if(name){
        apiVideogames = await axios(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)
        localVideogames = await Videogame.findAll(condition)
    } else {
        apiVideogames = await axios(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=40&page=${page}`)
        if(page == 1) localVideogames = await Videogame.findAll({includes: Genre})
    }
    const filteredApiVideogames = apiVideogames.data.results.map(game => {
        return {
            id : game.id,
            name : game.name,
            // released : game.released,
            // rating : game.rating,
            // platforms : game.platforms,
            genres : game.genres,
            background_image : game.background_image
        }
    })
    const videogames = [...localVideogames,...filteredApiVideogames]
    if(name) {
        if(videogames.length > 0) return res.send(videogames.slice(0,15))
        return res.status(404).send("No se consiguio este videojuego")
    }
    res.send(videogames)
    } catch (error) {
        next(error)
    }
})

router.get('/:id',async (req,res,next) => {
    const { id } = req.params
    let videogame
    try {
        if(isNaN(id)){
            videogame = await Videogame.findByPk(id)
            // res.send(localVideogame)
        } else {
            const apiVideogame = (await axios(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)).data
            videogame = {
                    id : apiVideogame.id,
                    name : apiVideogame.name,
                    genres : apiVideogame.genres,
                    background_image : apiVideogame.background_image,
                    description: apiVideogame.description,
                    released : apiVideogame.released,
                    rating : apiVideogame.rating,
                    platforms : apiVideogame.platforms,
            }
        }
        res.send(videogame)
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req,res,next) => {
    const { name, description, released, rating, platforms, genres} = req.body
    const newVideogame = await Videogame.create({
        // where: {name: name},
        // defaults: {
            name,
            description,
            released,
            rating,
            platforms
        // }
    })
    genres.forEach(async (genre) => {
        const actualGenre = await Genre.findOne({
                                where: {name : genre.name}
                            })
        await newVideogame.addGenre(actualGenre.id)
    });
    res.send(newVideogame)
})

module.exports = router;