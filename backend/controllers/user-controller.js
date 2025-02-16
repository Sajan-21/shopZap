const products = require("../db/models/products");
const subCategory = require("../db/models/subCategory");
const category = require('../db/models/category');
const users = require('../db/models/users');
const orders = require('../db/models/orders');
const reviews = require('../db/models/reviews');
const mongoose = require("mongoose");

exports.getProducts = async function(req, res) {
    try {
        let {userId, role, subCategoryName, categoryName} = req.params;
        let filter = {};
        if(role == "Seller" && categoryName !== "null" && subCategoryName !== "null"){
            let subCategoryData = await subCategory.findOne({ subCategory : subCategoryName }).populate('category');
            let subCategoryId = subCategoryData._id;
            let categoryId = subCategoryData.category._id;
            filter = {sellerId : {$ne : userId}}, {category : categoryId, subCategory : subCategoryId}
        }
        else if(role == "Seller" && categoryName !== "null" && subCategoryName == "null"){
            let categoryData = await category.findOne({category : categoryName});
            let categoryId = categoryData._id;
            filter = {sellerId : {$ne : userId}}, {category : categoryId}
        }
        else if(role == "Seller" && categoryName == "null" && subCategoryName !== "null"){
            let subCategoryData = await subCategory.findOne({ subCategory : subCategoryName }).populate('category');
            let subCategoryId = subCategoryData._id;
            filter = {sellerId : {$ne : userId}}, {subCategory : subCategoryId}
        }
        else if(role == "Seller" && categoryName == "null" && subCategoryName == "null"){
            filter = {sellerId : {$ne : userId}}
        }
        else if(role == "Buyer" && categoryName !== "null" && subCategoryName !== "null"){
            let subCategoryData = await subCategory.findOne({ subCategory : subCategoryName }).populate('category');
            let subCategoryId = subCategoryData._id;
            let categoryId = subCategoryData.category._id;
            filter = {category : categoryId, subCategory : subCategoryId}
        }
        else if(role == "Buyer" && categoryName !== "null" && subCategoryName == "null"){
            let categoryData = await category.findOne({category : categoryName});
            let categoryId = categoryData._id;
            filter = {category : categoryId}
        }
        else if(role == "Buyer" && categoryName == "null" && subCategoryName !== "null"){
            let subCategoryData = await subCategory.findOne({ subCategory : subCategoryName }).populate('category');
            let subCategoryId = subCategoryData._id;
            filter = {subCategory : subCategoryId}
        }
        else{
            filter = {}
        }

        let productsList = await products.find(filter).populate('category').populate('subCategory').populate('reviews');

        return res.status(201).json({
            success : true,
            statusCode : 201,
            data : productsList,
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

exports.getProduct = async function(req, res) {
    try {
        let _id = req.params.productId;
        let productData = await products.findOne({_id}).populate('category', 'subCategory', 'reviews');
        return res.status(201).json({
            success : true,
            statusCode : 201,
            data : productData,
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

exports.addToWishList = async function (req, res) {
    try {
        let { productId, userId } = req.params;

        let user = await users.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: "User not found",
            });
        }

        if (user.cartLists.includes(productId)) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: "Product already in wishList",
            });
        }

        await users.findByIdAndUpdate(userId,{ $addToSet: { wishList: new mongoose.Types.ObjectId(productId) } },{ new: true });

        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Product added to wishList",
        });

    } catch (error) {
        console.log("error:", error);
        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: error.message || error,
        });
    }
}

exports.getWishListProducts = async function(req, res) {
    try {
        let _id = req.params.userId;
        let user = await users.findOne({_id}).populate('wishList');

        let wishListProducts = user.wishList;
        return res.status(200).json({
            success : true,
            statusCode : 200,
            data : wishListProducts,
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

exports.addToCart = async function (req, res) {
    try {
        let { productId, userId } = req.params;

        let user = await users.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: "User not found",
            });
        }

        if (user.cartLists.includes(productId)) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: "Product already in cart",
            });
        }

        await users.findByIdAndUpdate(userId,{ $addToSet: { cartList : new mongoose.Types.ObjectId(productId) } },{ new: true });

        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Product added to cart",
        });

    } catch (error) {
        console.log("error:", error);
        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: error.message || error,
        });
    }
}

exports.getCartListProducts = async function(req, res) {
    try {
        let _id = req.params.userId;
        let user = await users.findOne({_id}).populate('cartList');

        let cartListProducts = user.cartList;
        return res.status(200).json({
            success : true,
            statusCode : 200,
            data : cartListProducts,
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

exports.buyProduct = async function (req, res) {
    try {
        let productsList = req.body.productsList;
        let buyerId = req.params.buyerId;

        for (const item of productsList) {
            let productId = item.productId;
            let quantity = item.quantity;
            let paymentMethod = item.paymentMethod;
            let totalPrice = item.price * quantity;

            let product = await products.findOne({ _id: productId }).populate('sellerId');
            if (!product) {
                return res.status(404).json({
                    success: false,
                    statusCode: 404,
                    message: `Product not found`,
                });
            }

            if (product.stockCount < quantity) {
                return res.status(400).json({
                    success: false,
                    statusCode: 400,
                    message: `Sorry, we don't have this much quantity for ${product.name}`,
                });
            }

            let orderData = {
                product: new mongoose.Types.ObjectId(productId),
                quantity,
                price: totalPrice,
                paymentMethod,
                orderStatus: "pending",
                buyer: new mongoose.Types.ObjectId(buyerId),
                seller: new mongoose.Types.ObjectId(product.sellerId._id),
                date: new Date(),
            };

            await orders.create(orderData);
            await users.findByIdAndUpdate({_id : buyerId}, {$push: {orders : new mongoose.Types.ObjectId(productId)}});

            let newStockCount = product.stockCount - quantity;
            await products.updateOne(
                { _id: productId },
                { $set: { stockCount: newStockCount } }
            );

            let seller = await users.findOne({ _id: product.sellerId._id });
            if (seller) {
                let totalSellerProfit = (seller.profit || 0) + totalPrice;
                await users.updateOne(
                    { _id: seller._id },
                    { $set: { profit: totalSellerProfit } }
                );
            }
        }

        // TODO: sendEmails to admin, seller, buyer

        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Order Placed",
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: error.message || error,
        });
    }
}

exports.getOrderedProducts = async function(req, res) {
    try {
        let _id = req.params.userId;
        let user = await users.findOne({_id}).populate('orders');

        let orderedProducts = user.orders;
        return res.status(200).json({
            success : true,
            statusCode : 200,
            data : orderedProducts,
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

exports.getCategoryCollection = async function(req, res) {
    try {
        let categoryCollection = await category.find();
        return res.status(200).json({
            success : true,
            statusCode : 200,
            data : categoryCollection
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

exports.subCategoryCollection = async function(req, res) {
    try {
        let subCategoryCollection = await subCategory.find();
        return res.status(200).json({
            success : true,
            statusCode : 200,
            data : subCategoryCollection,
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