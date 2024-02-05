import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Product = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true

    },
    image: {
        type: String,
        required: true
    }
    ,
    price: {
        type: Number,
        min: 1,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique:true
    },
    stock:{
        type: Number,
        min: 1,
        required: true,
        default:5
    }

},
{
    timestamps:true
}
)

export default mongoose.model('Product', Product)