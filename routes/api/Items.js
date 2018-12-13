const express = require('express');

const router = express.Router();

// Import Items Model 
const Item = require('../../model/Items');

// @routes GET api/items
// desc GET all posts 
// @access Public
router.get('/', (req, res) => {
    // this is where we basically have all the posts from the database 
    Item.find()
    .sort({date: -1})
    .then(items => res.json(items))
});

// @routes POST api/items
// desc POST to the database 
// @access Public
router.post('/', (req, res) => {
   // here we need to construct an items that will be sent to the database 
   const newItem = new Item({
       name: req.body.name,
    
   });

   // we need to save all those into the database now
   newItem.save().then(item => res.json(item))
});


// @routes DELETE /api/Items
// desc DELETE An Item
// @access Public
router.delete('/:id', (req, res) => {
   // to delete an items we first need to find that items 
   // according to this example we are gonna find it by id 
   Item.findById(req.params.id)
   .then(item => item.remove().then(() => res.json({success: true})))
   .catch(err => res.status(404).json({success: false}));

 })


 // @routes PUT /api/Items
// desc UPDATE An Item
// @access Public
router.put('/:id', (req, res) => {
    // to update we are gonna use the mongodb update method
    // 
    Item.updateOne({_id: req.params.id}, {name: req.body.name}, {upsert: true} ).then(() => res.json({updated: true}))
    .catch(err => res.status(404).json({update: false}))
    
  })




module.exports = router;