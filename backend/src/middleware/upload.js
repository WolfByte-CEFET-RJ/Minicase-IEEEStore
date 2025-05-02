const multer = require("multer");
const path = require("path");

const fotoDir = path.resolve(__dirname, "../../fotosProduto");
const comprovanteDir = path.resolve(__dirname, "../../comprovantesPedido");

const normalizeFilename = (originalname) => {
    return originalname.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_.-]/g, "");
};

const produtoStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, fotoDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${normalizeFilename(file.originalname)}`);
    }
});

const comprovanteStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, comprovanteDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${normalizeFilename(file.originalname)}`);
    }
});

const imageFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Apenas arquivos de imagem (JPG, JPEG, PNG) são permitidos"), false);
    }
};

const pdfFilter = (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
        cb(null, true);
    } else {
        cb(new Error("Apenas arquivos PDF são permitidos"), false);
    }
};

const uploadProduto = multer({ storage: produtoStorage, fileFilter: imageFilter });
const uploadComprovante = multer({ storage: comprovanteStorage, fileFilter: pdfFilter });

module.exports = {
    uploadProduto,
    uploadComprovante
};