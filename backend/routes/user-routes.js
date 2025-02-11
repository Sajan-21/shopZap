const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');
const accessController = require('../utils/access-controller').accessController;

function setAccessController(accessType) {
    return (req, res, next) =>  {
        accessController(accessType, req, res, next);
    }
}

router.get('/get-products/:userId/:role/:categoryName/:subCategoryName', userController.getProducts);
router.get('/get-product/:productId',userController.getProduct);
router.patch('/add-to-wishList/:userId/:productId',setAccessController("1,2"), userController.addToWishList);
router.get('/wish-list/:userId',setAccessController("*"), userController.getWishListProducts);
router.patch('/add-to-cart/:userId/:productId', setAccessController("1,2"), userController.addToCart);
router.get('/cart-list/:userId',setAccessController("*"), userController.getCartListProducts);
router.patch('/buy-product/:buyerId',setAccessController("1,2"), userController.buyProduct);
router.get('/orders/:userId', setAccessController("*"), userController.getOrderedProducts);
router.get('/category-collection',userController.getCategoryCollection);
router.get('/subCategory-collection',userController.subCategoryCollection);

module.exports = router;