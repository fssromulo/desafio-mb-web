const express = require("express");
const routes = express.Router();

routes.post("/registration", async (req, res) => {
  try {
    console.log("post...", req.body);
    /**
     * Aqui faria validações necessárias e faria o insert no banco de dados;
     */
    const allFieldValid = Object.values(req.body).every((item) => !!item);

    if (!allFieldValid) {
      return res
        .status(400)
        .json({ message: "Campos precisam ser preenchidos" });
    }
    return res.status(200).json({ message: "Cadastro realizado com sucesso" });
  } catch (error) {
    console.log("error post ", error);
  }
});

routes.get("/registration", async (req, res) => {
  try {
    console.log("get...");
  } catch (error) {
    console.log("error get", error);
  }
});

module.exports = routes;
