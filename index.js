import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.restcountries.com/countries/v5?q=Thailand&pretty=1",
      {
        headers: {
          Authorization: "Bearer rc_live_bcfacee4624d4b3c8449dddbc546655f",
        },
      },
    );
    const result = response.data.data.objects[0];
    res.render("index.ejs", {
      result: result,
    });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.post("/search", async (req, res) => {
  const answer = req.body.answer;
  try {
    const response = await axios.get(
      `https://api.restcountries.com/countries/v5?q=${answer}&pretty=1`,
      {
        headers: {
          Authorization: "Bearer rc_live_bcfacee4624d4b3c8449dddbc546655f",
        },
      },
    );
    const result = response.data.data.objects[0];
    res.render("index.ejs", {
      result: result,
    });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${PORT}`);
});
