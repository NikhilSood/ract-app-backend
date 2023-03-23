const newsModel = require('../models/newsModel')
const axios = require('axios')


const apiKey = 'd558c1e0bab74f78b8753f2b94ff2a0b';

const apiUrl = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`;

const api = async (req, res) => {
    try {
        const response = await axios.get(apiUrl)

        const articles = response.data.articles;

        //  const newsList = [];

        for (let i = 0; i < articles.length; i++) {
            const article = articles[i];

            const news = new newsModel({
                title: article.title,
                description: article.description,
                url: article.url,
                urlToImage: article.urlToImage,
                publishedAt: article.publishedAt,
            });

            await news.save()
            // newsList.push(wait.news.save())
        }

        res.json({
            msg: "success"
        });

    } catch (error) {
        console.log(error);
        res.status(500).send('error fetching news from API')
    }
}

const getData = (req, res) => {
    newsModel.find()
        .then(response => {
            res.json({
                response
            })
        })
        .catch(error => {
            res.json({
                message: "error"
            })
        })
}

module.exports = { api, getData }