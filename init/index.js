const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = 'mongodb://127.0.0.1:27017/wonderlust'
main()
.then(()=>{
    console.log("connected to DB");
})
.catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);

}
 
const initDB = async () => {
  await Listing.deleteMany({});
  
  initData.data = initData.data.map((obj) => ({
  ...obj,
  owner: "6878a8d5435f27d32197e273",
}));

await Listing.insertMany(initData.data);
  console.log("Data was initialized");
};


initDB();