const { Product } = require('../models');
const fs = require('fs')

exports.addProduct = async (req, res) => {
    try {
        const { productName, Price, Stock } = req.body;

        // console.log('Body: ', req.body);
        // console.log('File: ', req.file);
        const file = req.file.path;

        const product = await Product.create({
            productName,
            Price,
            Stock,
            productimage: file
        });

        res.status(201).json({
            message: 'Product Added Successfully',
            data: product
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.getOneProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            })
        }

        res.status(200).json({
            message: 'Product found',
            data: product
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.getAllProduct = async (req, res) => {
  try {
    const products = await Product.findAll();

    if (!products) {
      return res.status(404).json({
        message: 'No products found'
      })
    }

    res.status(200).json({
      message: 'Products found',
      data: products
    })
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
}

exports.updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const { productName, Stock, Price } = req.body;

        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            })
        }

        const data = {
            Price,
            productName,
            Stock
        }

        // When The request sees a file, that is only when it should try to change the file

        if (req.file) {
            const oldFilePath = product.productimage
            fs.unlinkSync(oldFilePath);
            // console.log(req.file.path)
            data.productimage = req.file.path
        }

        await product.update(data)

        res.status(200).json({
            message: "Product Updated",
            data: product
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


exports.deleteProduct = async (req, res) => {
    try {
        const id = req.params.id
        const product = await Product.findByPk(id)

        if (!product) {
            return res.status(404).json({
                message:'product not found'
            })
        }

        const oldfilePath = product.productimage
        fs.unlinkSync(oldfilePath);

        await product.destroy()
        
        res.status(200).json({
            message:'product deleted'
        })
  
    } catch (error) {
        res.status(500).json({
          error:error.message
        })
    }
}