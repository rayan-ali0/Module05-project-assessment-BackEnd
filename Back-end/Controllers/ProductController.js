import Product from "../Models/Product.js";
import fs from "fs"
import slugify from "slugify";
export const productController = {
    createProduct: async (req, res) => {
        try {
            // Extract product details from the request body
            const {
                title,
                description,
                price,
            } = req.body;

            const titleExist = await Product.find({ title: title })
            if (titleExist.length>0) {
                return res.status(400).json({ message: "Title already exist" })

            }

            const slug = slugify(`${title}`, {
                lower: true,
            })
            const newProduct = new Product({
                title,
                description,
                image:req.file.path,
                price
            });
            const savedProduct = await newProduct.save();

           return res.status(200).json(savedProduct);
        } catch (error) {
            console.error("Error creating product:", error);
           return res.status(500).json( {message:error.message});
        }
    }

    ,
    getProductById: async (req, res) => {
        const { id } = req.params
        try {
            const product = await Product.findById(id);
            if (!product) {
                return  res.status(400).json({ message: "Product Not Found" })
            }
           return res.status(200).json(product)
        }
        catch (error) {
         return   res.status(404).json({ message: error.message })
        }
    }
    ,
    getProducts: async (req, res) => {
        try {
            const offset= req.offset || 0;
            const limit = req.limit || 10
            // const products = await Product.find().limit(limit).skip(offset)exec();
            const products = await Product.find();
            if (products.length === 0) {
                return res.status(404).json("Products Not Found");
            }

         return   res.status(200).json(products);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    ,

    deleteProduct: async (req, res) => {
        const { id } = req.params
        try {
            const deletedProduct = await Product.findByIdAndDelete(id);
            if (!deletedProduct) {
             return   res.status(404).json({ error: 'Product not found' })
            }
            fs.unlinkSync(deletedProduct.image)
           return res.status(200).json({ message: "Product Deleted" })
        }
        catch (error) {
          return  res.status(404).json(error.message)
        }
    }
    ,
    editProduct: async (req, res) => {
        const id=req.body._id
        const updatedFields = {...req.body }
        delete updatedFields._id;

        const editedProduct = await Product.findById(id)
        if (req.file) {
            updatedFields.image = req.file.path
        }

        const titleExist = await Product.findOne({ title: req.body.title })
        if (titleExist && titleExist._id.toString()!==id) {
            return res.status(400).json({ message: "Title already exist" })
        }
        if (req.body.title) {
            const slug = slugify(`${req.body.title}`, { lower: true })
            updatedFields.slug = slug
        }
        if (editedProduct) {
            const oldImage = editedProduct.image
            try {
                const updated = await Product.findByIdAndUpdate(id, updatedFields, { new: true })
                if (updated && req.file) {
                    fs.unlinkSync(oldImage)
                }
               return res.status(200).json(updated)
            }
            catch (error) {
                return res.status(500).json({ message: error.message })
            }
        }
        if(!editedProduct) {
          return  res.status(500).json({ message: "Product Not Found" })

        }
    }



}