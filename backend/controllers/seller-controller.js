const users = require('../db/models/users');
const subCategory = require('../db/models/subCategory');
const products = require('../db/models/products');
const path = require('path');
const fs = require('fs');
const { default: mongoose } = require('mongoose');

exports.addProduct = async function(req, res) {
    try {
        let _id = req.params.userId;

        if(!req.files || req.files.length > 4 || req.files.length < 4) {
            return res.status(400).json({
                message : "please upload 4 images"
            });
        }
        const imagePaths = req.files.map(file => file.path);

        let subCategoryData = await subCategory.findOne({ subCategory : req.body.subCategory }).populate('category');
        let categoryId = subCategoryData.category._id;
        let subCategoryId = subCategoryData._id;

        let user = await users.findOne({ _id });
        let brand = user.brand;

        const newProduct = new products({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category : new mongoose.Types.ObjectId(categoryId),
            subCategory : new mongoose.Types.ObjectId(subCategoryId),
            images: imagePaths,
            brand,
            sellerId : new mongoose.Types.ObjectId(_id),
            stockCount: req.body.stockCount,
            permission : true,
            createdAt : Date.now(),
        });

        await newProduct.save();
        return res.status(201).json({
            success : true,
            statusCode : 201,
            message : "product added successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to add products" });
    }
}

exports.getSellerProducts = async function(req, res){
    try {
        let sellerId = req.params.userId;
        let sellerProducts = await products.find({sellerId}).populate('category', 'subCategory', 'reviews');

        return res.status(200).json({
            success : true,
            statusCode : 200,
            data : sellerProducts,
        });

    } catch (error) {
        console.log("error : ",error);
        return res.status(500).json({
            success : false,
            statusCode : 500,
            message : error.message ? error.message : error,
        });
    }
}

exports.updateProduct = async function (req, res) {
    try {
        let productId = req.params.productId;
        let body = req.body;

        let subCategoryData = await subCategory.findOne({ subCategory: body.subCategory }).populate('category');
        if (!subCategoryData) {
            return res.status(400).json({ success: false, message: "Invalid subcategory" });
        }

        let subCategoryId = subCategoryData._id;
        let categoryId = subCategoryData.category._id;

        let user = await users.findById(body.sellerId);
        if (!user) {
            return res.status(400).json({ success: false, message: "Seller not found" });
        }

        let brand = user.brandName;

        const updatedProduct = {
            name: body.name,
            description: body.description,
            price: body.price,
            category: categoryId,
            subCategory: subCategoryId,
            brand,
            stockCount: body.stockCount,
            updatedAt: new Date(),
        };

        let response = await products.updateOne({ _id: productId }, { $set: updatedProduct });

        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Product updated successfully",
        });

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: error.message || "Failed to update product",
        });
    }
}

exports.updateProductImages = async function(req, res) {
    try {
        let { productId, imageIndex } = req.params;

        if (!req.file || imageIndex === undefined) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: "Please provide a valid image index and upload a new image",
            });
        }

        let index = parseInt(imageIndex);
        if (isNaN(index) || index < 0 || index > 3) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: "Invalid image index. Index must be between 0 and 3.",
            });
        }

        let product = await products.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: "Product not found",
            });
        }

        product.images[index] = req.file.path;
        await product.save();

        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Product image updated successfully",
        });

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: error.message || "Failed to update product image",
        });
    }
}

exports.deleteProduct = async function(req, res) {
    try {
        let productId = req.params.productId;

        let product = await products.findOne({_id : productId});
        if (!product) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: "Product not found",
            });
        }

        product.images.forEach((imagePath) => {
            let fullPath = path.join(__dirname, "..", imagePath);
            fs.unlink(fullPath, (err) => {
                return res.status(400).json({
                    success : false,
                    statusCode : 400,
                    message : err.message ? err.message : err,
                });
            })
        });

        await products.deleteOne({ _id: productId });

        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Product and images deleted successfully",
        });

    } catch (error) {
        console.log("error : ",error);
        return res.status(500).json({
            success : false,
            statusCode : 500,
            message : error.message ? error.message : error,
        });
    }
}