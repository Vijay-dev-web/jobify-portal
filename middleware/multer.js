import multer from "multer";
import DataParser from "datauri/parser.js";
import path from "path";
import { log } from "console";

const storage = multer.memoryStorage();
const multerUpload = multer({ storage });
const parser = new DataParser();

export const formatImgae = (file) => {
  log(file);
  const fileExtension = path.extname(file.originalname).toString();
  return parser.format(fileExtension, file.buffer).content;
}

export default multerUpload;
