const ProductService = require("../services/productService");
const ImageService = require("../services/imageService");
// const Image = require("../models/Image");

let productService = new ProductService();
let imageService = new ImageService();

exports.uploadProductImage = (req, res, next) => {
  console.log("Inside upload Product Image API ");
  const product_id = req.params.product_id;
  const file = req.file;
  imageService
    .uploadFile(file)
    .then((result) => {
      const dataToInsert = {
        product_id,
        file_name: result.Key,
        date_created: new Date(),
        s3_bucket_path: result.Location,
      };

      imageService
        .insertImageInfoToDB(dataToInsert)
        .then((insertedRow) => {
          res.status(201).send(insertedRow);
        })
        .catch((err) => {
          res.status(400).send({ message: err.message });
        });
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
};

exports.getAllProductImages = (req, res) => {
  res.status(200).send({});
};

exports.getProductImage = (req, res) => {
  res.status(200).send({});
};

exports.deleteProductImage = (req, res) => {
  const product_id = req.params.product_id;
  const image_id = req.params.image_id;
  imageService
    .deleteFile(image_id, product_id)
    .then((deleteObject) => {
      console.log("Deleted Object : ", deleteObject);
      imageService
        .deleteProductInfo(image_id, product_id)
        .then((deletedRow) => {
          if (deletedRow > 0) {
            res.status(204).send({});
          } else {
            res.status(404).send({ message: "404 Not Found" });
          }
        });
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
};
