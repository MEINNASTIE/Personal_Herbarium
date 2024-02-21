import mongoose from "mongoose";

const {Schema} = mongoose;

const plantSchema = new Schema({
    name: {type: String, required: true, trim: true},
    type: {type: String,  trim: true}, 
    categorie: {type: String,  trim: true}, 
    latinName: {type: String, required: true, trim: true},
    description: {type: String,  trim: true}, 
    image: {type: String, }, 
    imagePublicId: { type: String },  
    userId: { type: Schema.Types.ObjectId, ref: 'User' }
},

      
{timestamps: true}
)

const Plant = mongoose.model('Plant', plantSchema);
export default  Plant;

