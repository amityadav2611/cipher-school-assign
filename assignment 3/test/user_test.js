const assert = require("assert");
const UserInfo = require("../models/user");
const mongoose = require("mongoose");

describe("-------------user record-----------", () => {
  let createUserInfo;
  before((done) => {
    mongoose.connection.collections.users.drop(() => {
      console.log("------previous data is dropped to save the storage----");
      done();
    });
  });


  //-------------Creating the data and saving into the database--------------
  it("creates an user information and saving to DB", (done) => {
    createUserInfo = new UserInfo({
      name: "Chandler Bing",
      email: "notsofunny@gmail.com",
      password: "bingbing",
      contry: "New York city"
    });

    createUserInfo.save().then((data) => {
      console.log("------data is saved to your database");
      console.log(`and the saved data is: ${data}`);
      UserInfo.findOne({ name: "Chandler Bing" }).then((data) => {
        assert(data.password === "bingbing");
        assert(data.email === "notsofunny@gmail.com");
        assert(data.contry === "New York city");
        console.log("     (C) data is created and saved to DB");
        done();
      });
    });
  });


  //--------------Reading the data from the database------------------------
  it("Reading the record from DB", (done) => {
    UserInfo.findOne({ name: "Chandler Bing" }).then((data) => {
      assert(data.contry === "New York city");
      console.log("     (R) Reading the data from DB is tested");
      done();
    });
  });


  //-------------Update the data which is already in the database-----------
  it("update the data of the database", (done) => {
    UserInfo.findByIdAndUpdate(
      { _id: createUserInfo._id },
      { contry: "New Mexico" }
    ).then(() => {
      UserInfo.findOne({ contry: "New Mexico" }).then((data) => {
        assert(data.contry === "New Mexico");
        // console.log(`and the updated data is: ${data}`);
        console.log("     (U) updating the data of DB is tested");
        done();
      });
    });
  });


  //-------------Delete the data from database-----------------------------
  it('deleting the data from the database', (done) => {
    UserInfo.findOneAndDelete({ name: "Chandler Bing" }).then(() => {
      UserInfo.findById({ _id: createUserInfo._id }).then((data) => {
        assert(data === null);
        // console.log(data)
        console.log("     (D) deleting the data of DB is tested");
        done();
      });
    });
  })
});
