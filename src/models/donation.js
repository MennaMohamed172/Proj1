const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  FullName: {
    type: String,
    unique: true,
    minlength: 8,
    maxlenght: 200,
    trim: true,
  },
  DrugName: {
    type: String,
    required: true,
    trim: true,
  },
  ExpirationDate: {
    type: Date,
    required: true,
    trim: true,
    // default: function() {
    //     const now = new Date();
    //     return new Date(now.getFullYear(), now.getMonth(), now.getDate());
    //   }
  },
  Quantity: {
    type: Number,
    required: true,
    trim: true,
  },
  Phone: {
    type: String,
    required: true,
    trim: true,
    length: 11,
  },

  Address: {
    type: String,
    required: true,
    trim: true,
  },
  Charity: {
    type: String,
    enum: ["رساله", "اهل الخير", "مصر الخير"],
    default: "resala",
    required: true,
    trim: true,
  },
});

const Donat = mongoose.model("Donat", donationSchema);

module.exports = Donat;
