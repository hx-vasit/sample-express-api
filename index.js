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
    const api =
      "https://6mosj0s8n4.execute-api.ap-southeast-1.amazonaws.com/dev/v1/enquque";
    const recaptchaResponse = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${req.body._token}`
    );

    if (!recaptchaResponse.data.success) {
      return res.status(400).send(recaptchaResponse.data);
    }

    const { data } = await axios.post(api, req.body);

    res.send(data);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.listen(8080);
