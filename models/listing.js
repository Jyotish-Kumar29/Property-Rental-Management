const mongoose = require('mongoose');
const Review = require('./reviews.js')
const Schema = mongoose.Schema;
const User = require('./user.js');
const ListingSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:
    {
        filename:String,
        url:String,
    },
    price:Number,
    location:String,
    country:String,

    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:'Review',
        }
    ],
    owner:
    {
        type:Schema.Types.ObjectId,
        ref:'User',
    },
    geometry: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
    coordinates: 
    {
        type: [Number],
        required: true
    }
    }
});


ListingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing)
    {
        await Review.deleteMany({_id:{$in:listing.reviews}});
    }
    
})
const Listing = mongoose.model("Listing",ListingSchema);
module.exports = Listing;