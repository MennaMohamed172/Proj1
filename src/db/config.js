const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

// mongoose.connect(process.env.MONGO_URL);
mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) {
      console.log("connected to db");
    } else {
      console.log("ERROR" + err);
    }
  }
);
