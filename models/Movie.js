const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String },
    img: { type: String , default:"https://www.bing.com/ck/a?!&&p=27fad8e856f67293JmltdHM9MTcwNjQwMDAwMCZpZ3VpZD0xYzk0OWZlMC1kZTVlLTY1ZGUtMzE5OC04YzcxZGYyMjY0ZDcmaW5zaWQ9NTYzOQ&ptn=3&ver=2&hsh=3&fclid=1c949fe0-de5e-65de-3198-8c71df2264d7&u=a1L2ltYWdlcy9zZWFyY2g_cT1kZWZ1YWx0IG1vdmllIHBvc3RlciZGT1JNPUlRRlJCQSZpZD03MUFBQ0MwMUU5NDFGN0EwRjlENEQ2OUM5NkI4MkE4Rjk3QTIyNDdD&ntb=1"},
    imgTitle: { type: String },
    imgSm: { type: String },
    trailer: { type: String }, 
    video: { type: String },
    year: { type: String },
    duration:{type:String},
    limit: { type: Number },
    genre: { type: String },
    isSeries: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("movie", MovieSchema);