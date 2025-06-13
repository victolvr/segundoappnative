const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

mongoose.connect(
  "mongodb+srv://pvictorolv1:uYzjEzgzcXhpjh2X@cluster0.c1iqvxu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

// Modelo para Locais de Acúmulo de Lixo
const Lixo = mongoose.model("Lixo", {
  nomeLocal: String,
  descricao: String,
  foto: String,
  latitude: Number,
  longitude: Number,
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// Listar todos os locais de lixo
app.get("/lixo", async (req, res) => {
  const locais = await Lixo.find();
  res.json(locais);
});

// Registrar novo local de lixo
app.post("/lixo", upload.single("foto"), async (req, res) => {
  const { nomeLocal, descricao, latitude, longitude } = req.body;
  const foto = req.file ? req.file.path : null;
  const lixo = new Lixo({ nomeLocal, descricao, foto, latitude, longitude });
  await lixo.save();
  res.json(lixo);
});

app.listen(3000, () => console.log("Backend listening on port 3000"));
