const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3004;

// Habilitar CORS para permitir solicitudes del frontend
app.use(cors());
app.use(express.json());

// Configuración de Multer para guardar archivos en la carpeta "songs"
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'songs/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Ruta para subir archivos MP3
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No se ha subido ningún archivo' });
    }
    res.json({ filePath: `/songs/${req.file.filename}` });
});

// Servir archivos estáticos desde la carpeta "songs"
app.use('/songs', express.static('songs'));

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
