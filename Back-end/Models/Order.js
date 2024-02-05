// import { Schema, model } from 'mongoose'
import mongoose from "mongoose";

const Schema = mongoose.Schema;


const Order = new Schema(
    {
        userPhone:{
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ['pending', 'accepted', 'rejected'],
            default: "pending"
        },
        total: {
            type: Number,
            required:true
        },
        productsOrdered: [{
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "Product"
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            }
        }],
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
    }
    ,
{
    timestamps:true
}

)

export default mongoose.model("Order", Order);