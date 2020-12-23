const mongoose = require("mongoose");
const URL =
  "mongodb+srv://AmitYadav:passwordforDatabase@cluster0.puooj.mongodb.net/assignment-3?retryWrites=true&w=majority";

before((done) => {
  mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true, 'useFindAndModify': false });

  mongoose.connection
    .once("open",  () => {
      console.log("*****connection to the database is successful*****");
      done();
    })
    .on("error", (error) => {
      console.log("enable to connect", error);
    });
});

