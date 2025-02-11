const express = require('express');
const router = express.Router();
const sellerController = require('../controllers/seller-controller');
const upload = require('../utils/file-uploads');
const accessController = require('../utils/access-controller').accessController;

function setAccessController(accessType){
    return (req, res, next) => {
        accessController(accessType, req, res, next);
    }
}

router.post('/add-product/:userId',upload.array("images", 4),setAccessController("2"), sellerController.addProduct);
router.get('/get-seller-products/:sellerId', setAccessController("1,2"), sellerController.getSellerProducts);
router.patch('/update-product/:userId/:productId',setAccessController("2"), sellerController.updateProduct);
router.patch('/update-product-image/:productId/:imageIndex',upload.single("image"), setAccessController("2"), sellerController.updateProductImages);
router.delete('/delete-product/:productId',setAccessController("1,2"), sellerController.deleteProduct);

module.exports = router;