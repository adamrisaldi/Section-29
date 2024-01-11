import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://pokeapi.co/api/v2/pokemon";

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get("/", async (req, res) => {
    try{
        const result = await axios.get(API_URL);
        res.render('list-pokemon', {pokemons: result.data});
    } catch (error) {
        res.status(404).send(error.message);
    }
});

app.get("/:id", async (req, res) => {
    const{id} = req.params;
    try{
        const result = await axios.get(`${API_URL}/${id}`);
        res.render('detail-pokemon', {pokemon: result.data});
    } catch (error) {
        res.status(404).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});