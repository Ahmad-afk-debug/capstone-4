import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async(req, res) => {
    try {
        const response = await axios.get("https://v2.jokeapi.dev/joke/Any?format=txt&type=single");
        const result = response.data;
        res.render("index.ejs", { 
            joke : result,
         });
      } catch (error) {
        res.render("index.ejs", {
            joke: error.message,
        });
      }
  });

  app.post("/", async (req, res) => { 
  
    try {
      var categories = req.body.categories;
      var flags = req.body.flags;
      if(Array.isArray(categories)){
        categories = categories.join(',');
      }
      if(Array.isArray(flags)){
        flags = flags.join(',');
      }
      const url = `https://v2.jokeapi.dev/joke/${categories}?blacklistFlags=${flags}&format=txt&type=single`;
      const response = await axios.get(url);

      console.log('url => ', url);
      const result = response.data;
      res.render("index.ejs", { 
        joke : result,
        filters: 'categories: ' + categories + ' flags: ' + flags
      });
    } catch (error) {
      res.render("index.ejs", {
        joke: error.message,
      });
    }
  });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
