    const multer = require("multer");
    const path = require("path");

    const fotoDir = path.resolve(__dirname, "../../fotosProduto");

    const produtoStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, fotoDir, "../fotosProduto");
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        }
    });

    const upload = multer({storage: produtoStorage});

    module.exports = {
        upload
    };
