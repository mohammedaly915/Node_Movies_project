const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    // Fname:{type:String,required:true},
    // Lname:{type:String,required:true},
    userName: { type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: "https://img.freepik.com/free-psd/3d-rendering-boy-avatar-emoji_23-2150603381.jpg?t=st=1720053065~exp=1720056665~hmac=0b6e658052e7c5767f5aca64fecb24b34abd5576edac75c99ddc1ecf49321109&w=740" },
    // region_id: { type:(mongoose.Schema.Types.ObjectId),ref:'region', default: null },
    region_id: { type:Number, default: null },
    isAdmin: { type: Boolean, default: false },
    token:{ type:String }
  },
  {timestamps:true}
)

module.exports= mongoose.model("user",UserSchema)