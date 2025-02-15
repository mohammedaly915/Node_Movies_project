const mongoose = require("mongoose");

const RegionSchema = new mongoose.Schema(
  {
    name_en: { type: String, required: true },
    name_ar: { type: String, required: true },
    googleMapLocation: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("region", RegionSchema);
