const express = require("express");
const router = express.Router();
const dataModel=require('../model/data')
router.use(express.json());
const bodyparser = require("body-parser");
router.get("/alldata/", async (req, res) => {
  try {
    const data = await dataModel.find()
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.get("/all", async (req, res) => {
    try {
      const { page } = req.query;
      const data = await dataModel
        .find()
        .skip((page - 1) * 8)
        .limit(8);
      res.json(data);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
});
router.get("/alldata/:flatNo", async (req, res) => {
  try {
    const data = await dataModel.find({flatNo:req.params.flatNo})
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post('/add',async(req, res)=>{
    try {
        const data=await dataModel.create(req.body)
        res.json(data)
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})
  
router.delete("/delete/:id", async (req, res) => {
  try {
    const data=await dataModel.deleteOne({_id:req.params.id})
    res.json({ message: "success" ,
  data})
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
module.exports = router;
