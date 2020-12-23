const assert = require("assert");
const ProductInfo = require("../models/product");
const mongoose = require("mongoose");

describe("-------------Product information-----------", () => {
  let createProductInfo;
  before((done) => {
    mongoose.connection.collections.products.drop(() => {
      console.log(
        "-----------previous data is dropped to save the storage----------"
      );
      done();
    });
  });

  //---------------Creating and saving the data to the database----------------
  it("creating and saving the product info to the DB", (done) => {
    createProductInfo = new ProductInfo({
      productName: "Mobile",
      Price: "$1000",
      Description: "its a touch screen phone",
      category: [{ categoryName: "touch screen" }],
      Quantity: 10,
    });
    createProductInfo.save().then(() => {
      ProductInfo.findById({ _id: createProductInfo._id }).then((data) => {
        console.log(`saved data is : ${data}`);
        assert(data.category.length === 1);
        assert(data.productName === "Mobile");
        console.log("     (C) product info creation and saving is tested");
        done();
      });
    });
  });

  //---------------Reading the data from the database------------------
  it("reading the data from the DB", (done) => {
    ProductInfo.findOne({ _id: createProductInfo._id }).then((data) => {
      const { productName, Price, category } = data;
      assert(data.productName === "Mobile");
      assert(data.Price === "$1000");
      // assert(data.category() === "touch screen");
      console.log("     (R) reading the data from the DB");
      done();
    });
  });

  //--------------Updating the data of  database------------------
  it("updating the data of DB", (done) => {
    ProductInfo.findOne({ _id: createProductInfo._id }).then((data) => {
      data.category.push({ categoryName: "keypad" });
      data.save().then(() => {
        ProductInfo.findOne({ productName: "Mobile" }).then((data) => {
          assert(data.category.length === 2);
        });
      });
    });
    ProductInfo.findOneAndUpdate(
      { _id: createProductInfo._id },
      { Price: "$2000", Quantity: 25 }
    ).then(() => {
      ProductInfo.findOne({ productName: "Mobile" }).then((data) => {
        // console.log(data)
        assert(data.Price === "$2000" && data.Quantity === 25);
        console.log("     (U) updating the data of DB is tested");
        done();
      });
    });
  });


  //--------------deleting the data from the DB------------------
  it('deleting the data from the DB', (done) =>{
    ProductInfo.findOneAndDelete({Quantity: 25}).then(() => {
      ProductInfo.findById({_id:createProductInfo._id}).then((data) => {
        // console.log(data);
        console.log("     (D) deleting the data from the DB is tested");
        assert(data === null);
        done();
      })
    })
  })
});
