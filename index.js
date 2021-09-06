const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
cors = require("cors");
const app = express();

app.use(bodyParser());
app.use(cors());

app.post("/verify", async (req, res) => {
  try {
    const secret = "secret";
    const api = "http:/exmpale.com";
    const recaptchaResponse = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${req.body._token}`
    );

    if (!recaptchaResponse.data.success) {
      return res.status(400).send(recaptchaResponse.data);
    }

    const { data } = await axios.post(api, req.body);

    res.send(data.test.sdfasfd);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.listen(8080);
