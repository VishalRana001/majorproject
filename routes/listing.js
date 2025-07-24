const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middlewares.js");
const listingController = require("../controllers/listings.js")
const multer  = require('multer');
const {storage} = require("../cloudconfig.js");
const upload = multer({ storage });

router.get("/", wrapAsync(async (req, res) => {
    const { category } = req.query;
    let listings;

    if (category) {
        listings = await Listing.find({ category });
    } else {
        listings = await Listing.find({});
    }

    res.render("listings/index", { listings, category: category || "All" });
}));

router.route("/")

.post(
    isLoggedIn,
    upload.single('image'),
    //  validateListing, 
     wrapAsync(listingController.createListing));


    //new routes
router.get("/new", isLoggedIn, listingController.renderNewForm); 


router.route("/:id")
.get( wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner, upload.single('image'),
// validateListing,
 wrapAsync(listingController.updateListing))
.delete( isLoggedIn,isOwner, wrapAsync( listingController.destroyListing)
);


// Edit routes
router.get("/:id/edit",  isLoggedIn,isOwner, wrapAsync(listingController.renderEditForm)
);



module.exports = router;