var mongodb = require("mongodb");
var express = require("express");
const { connectDb, closeConnection } = require("../config");
var router = express.Router();


/* GET users listing. */
router.get("/get-data", async (req, res) => {
  try {
    const db = await connectDb();
    const data = await db.collection("history").find().toArray();
    await closeConnection();
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
});

router.post("/create-trans", async function (req, res, next) {
  try {
    const db = await connectDb();
    await db.collection("history").insertOne(req.body);
    await closeConnection();
    res.json({ message: "transaction created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
});

router.delete("/trans/:_id", async (req, res) => {
  try {
    const _id = req.params._id;
    const db = await connectDb();
    const data = db.collection("history").deleteOne({_id : mongodb.ObjectId(_id)});
    res.json("data deleted")
  } catch (error) {
    console.log(error);
    res.status(500).json({message : "something went wrong"})
  }
});

module.exports = router;
