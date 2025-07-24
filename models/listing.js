const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js")
const listingSchema = new Schema({
  title: { 
    type: String,
    required: true
  },
  description: String,
  image: {
    filename: { type: String, default: 'listingimage' },
    url: {
      type: String,
      default: 'https://images.unsplash.com/photo-...'
    }
  },
  price: {
    type: Number,
    min: 0
  },
  location: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review"
    },
  ],
  owner:{
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  geometry:{
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    },
  },
}, { timestamps: true }); // ✅ Adds createdAt and updatedAt

listingSchema.post("findOneAndDelete", async(listing)=>{
  if(listing){
     await Review.deleteMany({_id : {$in: listing.reviews}});
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
