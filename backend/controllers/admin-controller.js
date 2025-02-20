const products = require("../db/models/products");
const users = require("../db/models/users");
const category = require("../db/models/category");
const subCategory = require("../db/models/subCategory");
const orders = require("../db/models/orders");
const mongoose = require("mongoose");

exports.getAllusers = async function(req, res) {
    try {
        let usersList = await users.find().populate('orders').populate('wishList').populate('cartList');

        return res.status(200).json({
            success : true,
            statusCode : 200,
            data : usersList
        });
    } catch (error) {
        console.log("error : ",error);
        
        return res.status(500).json({
            success : false,
            statusCode : 500,
            message : error.message ? error.message : error
        })
    }
}

exports.getUser = async function(req, res) {
    try {
        let userId = req.params.userId;
        let user = await users.findOne({_id : userId}).populate('orders').populate('wishList').populate('cartList');

        return res.status(200).json({
            success : true,
            statusCode : 200,
            data : user
        })
    } catch (error) {
        console.log("error : ",error);
        
        return res.status(500).json({
            success : false,
            statusCode : 500,
            message : error.messagge ? error.message : error
        });
    }
}

exports.getOrders = async function(req, res) {
    try {
        let ordersList = await orders.find().populate("product").populate("buyer").populate("seller");
        return res.status(200).json({
            success : true,
            statusCode : 200,
            data : ordersList
        });
    } catch (error) {
        console.log("error : ",error);
        return res.status(500).json({
            success : false,
            statusCode : 500,
            message : error.message ? error.message : error
        });
    }
}

exports.addCategory = async function(req, res) {
    try {
        let body = req.body;
        if(!body.category){
            return res.status(400).json({
                success : false,
                statusCode : 400,
                message : "please enter the categoryName"
            });
        }
        let addCategory = await category.create(body);

        return res.status(200).json({
            success : true,
            statusCode : 200,
            message : "category added successfully"
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

exports.addSubCategory = async function (req, res) {
    try {
        let categoryName = req.params.categoryName;
        console.log("categoryName:", categoryName);
        
        let categoryCollection = await category.findOne({ category: categoryName });
        if (!categoryCollection) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }
        console.log("category collection:", categoryCollection);

        let subCategories = req.body.subCategory;
        console.log("subCategories:", subCategories);

        for (const subCategoryName of subCategories) {
            let subCategoryObj = {
                subCategory: subCategoryName,
                category: new mongoose.Types.ObjectId(categoryCollection._id),
            };

            let newSubCategory = await subCategory.create(subCategoryObj);
            console.log("New subCategory ID:", newSubCategory._id);

            let updatedCategory = await category.findByIdAndUpdate(categoryCollection._id,{ $push: { subCategories: newSubCategory._id } },{ new: true, useFindAndModify: false } );

            console.log("Updated Category:", updatedCategory);
        }

        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: `SubCategory added to ${categoryCollection.category} category`,
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

exports.blockUser = async function(req, res) {
    try {
        let userId = req.params.userId;
        let blockUser = await users.findByIdAndUpdate({_id : userId}, {$set : {permission : false}});
        return res.status(200).json({
            success : true,
            statusCode : 200,
            message : "user blocked",
        });
    } catch (error) {
        console.log("error : ",error);
        return res.status(500).json({
            success : false,
            statusCode : 500,
            message : error.message ? error.message : error
        });
    }
}

exports.blockProduct = async function(req, res) {
    try {
        let productId = req.params.productId;
        let blockProduct = await products.findByIdAndUpdate({_id : productId}, {$set : {permission : false}});
        return res.status(200).json({
            success : true,
            statusCode : 200,
            message : "product blocked",
        });
    } catch (error) {
        console.log("error : ",error);
        return res.status(500).json({
            success : false,
            statusCode : 500,
            message : error.message ? error.message : error
        });
    }
}

exports.unBlockUser = async function(req, res) {
    try {
        let userId = req.params.userId;
        let unBlockUser = await users.findByIdAndUpdate({_id : userId}, {$set : {permission : true}});
        return res.status(200).json({
            success : true,
            statusCode : 200,
            message : "user unblocked",
        });
    } catch (error) {
        console.log("error : ",error);
        return res.status(500).json({
            success : false,
            statusCode : 500,
            message : error.message ? error.message : error
        });
    }
}

exports.unBlockProduct = async function(req, res) {
    try {
        let productId = req.params.productId;
        let unBlockProduct = await products.findByIdAndUpdate({_id : productId}, {$set : {permission : true}});
        return res.status(200).json({
            success : true,
            statusCode : 200,
            message : "product unblocked",
        });
    } catch (error) {
        console.log("error : ",error);
        return res.status(500).json({
            success : false,
            statusCode : 500,
            message : error.message ? error.message : error
        });
    }
}