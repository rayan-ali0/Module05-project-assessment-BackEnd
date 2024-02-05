import Order from "../Models/Order.js"
import Product from '../Models/Product.js'

export const orderController = {
    createOrder: async (req, res) => {
        const { userId, userPhone, address,total,  productsOrdered } = req.body
        try {
            const newOrder = await Order.create({
                userPhone,
                address,
                status: 'pending',
                total,
                userId,
                productsOrdered
            })
            if (newOrder) {
                for (let i = 0; i < productsOrdered.length; i++) {
                    const product = await Product.findById(productsOrdered[i].productId)
                    if (product) {
                        product.stock -= Number(productsOrdered[i].quantity)
                        await product.save()
                    }
                    else {
                        return res.status(404).json({ message: "Product Not Found" })
                    }
                }
            }
            await newOrder.save()
            return res.status(200).json({ message: 'Your Order has been created successfuly!', Order: newOrder })

        }
        catch (error) {
            return res.status(404).json({ message: error.message })
        }
    },

    getAllOrders: async (req, res) => {
        try {
            const orders = await Order.find()
            return res.status(200).json({ Orders: orders })
        }
        catch (error) {
            return res.status(404).json({ status: 404, error: error })
        }
    },
    getOrderById: async (req, res) => {
        const id = req.params.id
        try {
            const order = await Order.findById(id)
            if (order) {
                return res.status(200).json({ Order: order })
            }
            else {
                return res.status(404).send(`Order with ID ${id} is not found!`)

            }

        }
        catch (error) {
            return res.status(404).json({ status: 404, error: error })
        }
    },
    updateOrder: async (req, res) => {
        const id = req.params.id;
        const { status } = req.body;
        let deliverDate = null;

        try {

            if (status === 'rejected') {
                const order = await Order.findById(id);
                if (order) {
                    for (let i = 0; i < order.productsOrdered.length; i++) {
                        const product = await Product.findById(order.productsOrdered[i].productId);
                        if (product) {
                            product.stock += order.productsOrdered[i].quantity;
                            await product.save();
                        }
                    }
                }
            }

            const editOrder = await Order.findByIdAndUpdate(id, {
                status,
            });

            if (editOrder) {
                return res.status(200).json({ message: "Your Order has been successfully updated" });
            }

            return res.status(400).send(`Error occurred or Order with ID ${id} is not found!`);
        } catch (error) {
            return res.status(404).json({ message: error.message });
        }
    },


    deleteOrder: async (req, res) => {
        const id = req.params.id;
        try {
            const removeOrder = await Order.findById(id)
            if (removeOrder) {
                if (removeOrder.status !== "rejected") {
                    return res.status(400).json({ message: "You can only delete rejected Orders" })

                }
                else {
                    await Order.deleteOne({ _id: removeOrder._id })
                    return res.status(200).send(`Order with ID ${id} has been deleted successfully!`)

                }
            }
            else {
                return res.status(400).json({ message: "Order not found" })

            }
        }
        catch (error) {
            return res.status(404).json({ status: 404, error: error })
        }
    }

}