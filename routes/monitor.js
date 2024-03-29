var express = require('express');
var router = express.Router();
const { body } = require('express-validator');
const passportJWT = require('../middleware/passportJWT');
const checkAdmin = require('../middleware/checkAdmin');

const MoRouter = require("../controllers/monitorController");

//get Producr
router.get('/', MoRouter.get);
// router.get('/:id', MoRouter.getbrand);
router.get('/product/:id', MoRouter.product);
router.get('/getDproduct/:id', MoRouter.getdetailproduct);
router.get('/repro/:id', MoRouter.getproduct);
//delete
router.delete('/:id',[passportJWT.isLogin, checkAdmin.isAdmin], MoRouter.destroy);
router.delete('/detail/:id',[passportJWT.isLogin, checkAdmin.isAdmin], MoRouter.detaildestroy);

//add brand
router.post('/',
    [passportJWT.isLogin, checkAdmin.isAdmin,
    body("title")
        .not().isEmpty()
        .withMessage("Name's brand cannot be empty."),
        // body("modelName")
        //     .not()
        //     .isEmpty()
        //     .withMessage("cannot be empty."),
        // body("price")
        //     .not()
        //     .isEmpty()
        //     .withMessage(" cannot be empty.")
        //     .isNumeric()
        //     .withMessage("must be a number"),
        // body("amount")
        //     .not()
        //     .isEmpty()
        //     .withMessage(" cannot be empty.")
        //     .isNumeric()
        //     .withMessage(" must be a number")

    ]
    , MoRouter.insert);
//add brand Detail
router.post("/:id", [passportJWT.isLogin, checkAdmin.isAdmin,
body('model')
    .not()
    .isEmpty()
    .withMessage("Model cannot be empty"),
body('price')
    .not().isEmpty()
    .withMessage("Price cannot be empty")
    .isNumeric()
    .withMessage(" must be a number"),
body('quantity')
    .not()
    .isEmpty()
    .withMessage("Quanity cannot be empty")
    .isNumeric()
    .withMessage(" must be a number"),
], MoRouter.insertDetail);

//update product
router.put('/:id', [passportJWT.isLogin, checkAdmin.isAdmin,], MoRouter.update);
//update product detail
router.put('/detail/:id', [passportJWT.isLogin, checkAdmin.isAdmin,], MoRouter.updatedetail);

module.exports = router;