const express = require("express");
const router = express.Router();
const subCategoryModel = require("../Models/subCategoryModel");

router.post("/insertSubCategory", async (req, res) => {
  try {
    let { body } = req;
    // Json creation for storing it in database
    let payload = {
      CategoryId: body.CategoryId,
      Sub_Category_name: body.Sub_Category_name
    };
    const data = await subCategoryModel.find(payload);
    if (data.length > 0) {
      res
        .status(409)
        .json({ error: "Data is already exists with the same Sub-Category name" });
    } else {
      await subCategoryModel.create(payload)
        .then((savedUser) => {
          // Handle successful save
          res.json({
            status: 200,
            data: savedUser,
          });
        })
        .catch((error) => {
          // Handle error
          console.log("error", error);
        });
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.post("/updateSubCategory", async (req, res) => {
  try {
    let { body } = req;
    // Json creation for storing it in database
    let payload = {
      CategoryId: body.CategoryId,
      Sub_Category_name: body.Sub_Category_name
    };

    // update the data in database
    let whereQuery = { _id: body._id };
    await subCategoryModel.findOneAndUpdate(whereQuery, payload, { new: true })
      .then((savedUser) => {
        // Handle successful save
        res.json({
          status: 200,
          data: savedUser,
        });
      })
      .catch((error) => {
        // Handle error
        console.log("error", error);
      });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.post("/deleteSubCategory", async (req, res) => {
    try {
      let { body } = req;
      // Json creation for storing it in database
      let payload = {
        _id: body._id,
      };

      await subCategoryModel.findByIdAndDelete(payload)
        .then((savedUser) => {
          // Handle successful save
          res.json({
            status: 200,
          });
        })
        .catch((error) => {
          // Handle error
          console.log("error", error);
        });
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "An error occurred" });
    }
  });

router.get("/SubCategory", async (req, res) => {
  try {
    const pages = await subCategoryModel.find();
    res.json({
      status: 200,
      data: pages,
    });
  } catch (error) {
    console.error("Error fetching pages:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;