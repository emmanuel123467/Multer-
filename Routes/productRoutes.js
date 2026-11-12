const router = require('express'). Router () ;
const { addProduct, updateProduct, getOneProduct, getAllProduct, deleteProduct} = require('../controllers/productcontroller');
const upload = require('../Middleware/multer');

router.post('/product', upload.single('productimage'), addProduct); 
router.patch('/updateproduct/:id', upload.single('productimage'), updateProduct);
router.get('/allproduct', getAllProduct);
router.get('/oneproduct/:id', getOneProduct);
router.delete('/deleteproduct/:id', upload.single('productimage'), deleteProduct);


module.exports = router
