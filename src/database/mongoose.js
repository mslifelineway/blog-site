const mongoose = require("mongoose");

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.nhny3.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const rules = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
};
mongoose.connect(url, rules, function (err) {
  if (err) {
    console.log(
      "\n\tDatabase connection failed! Please start the mongodb server."
    );
    console.log("--------------------------------------------------");
    process.exit(1);
  } else {
    console.log(
      "\n\t",
      mongoose.connection.readyState,
      "DB Connection Successfully"
    );
    console.log("--------------------------------------------------");
  }
});
