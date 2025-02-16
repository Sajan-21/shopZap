const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin-controller');
const accessController = require('../utils/access-controller').accessController;

function setAccessController(accessType) {
    return (req, res, next) => {
        accessController(accessType, req, res, next);
    }
}

router.get('/get-users',setAccessController("1"),adminController.getAllusers);
router.get('/get-user/:userId',setAccessController("1"),adminController.getUser);
router.post('/add-category',setAccessController("1"), adminController.addCategory);
router.post('/add-subCategory/:categoryName', setAccessController("1"), adminController.addSubCategory);
router.patch('/block-user/:userId',setAccessController("1"), adminController.blockUser);
router.patch('/block-user/:userId',setAccessController("1"), adminController.unBlockUser);
router.patch('/block-user/:productId',setAccessController("1"), adminController.blockProduct);
router.patch('/block-user/:productId',setAccessController("1"), adminController.unBlockProduct);

module.exports = router;