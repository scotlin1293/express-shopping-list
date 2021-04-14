const express = require("express");
const ExpressError = require("./expressError");
const router = new express.Router();
const items=require('./fakeDb');



//get list of items*/

router.get("/", function(req, res) {
    res.send("welcome");
    return res.json(items);
});

// get an item with a name of name
router.get("/:name", function(req, res) {
    const item=items.find(i => i.name === req.params.name);
    if(item === undefined){
        throw new ExpressError("Item not found", 404);
    }
    req.params.name;
    return res.json(item);
  });;

//create a new item

router.post("/", function(req, res) {
    if(!req.body.name) {
        throw new ExpressError("Item must have a name", 404);
    }
    if(!req.body.price) {
        throw new ExpressError("Item must have a price", 404);
    }
    const newItem = {name: req.body.name, price: req.body.price};
    items.push(newItem);
    return res.status(201).json( {"added": newItem });
});


//update the item
router.patch("/:name", function(req,res){
    const item=items.find(i => i.name === req.params.name);
    if(item === undefined){
        throw new ExpressError("Item not found", 404);
    }
    item.name=req.body.name;
    item.price=req.body.price;
    return res.json({"updated": item});
});

//delete the item
router.delete("/:name", function(req, res) {
  const index = items.findIndex(u => u.name === req.params.name);
  if(index === -1){
      throw new ExpressError("Item not found", 404);
  };
  items.splice(index, 1);
  return res.json({ message: "Deleted" });
});


module.exports = router;