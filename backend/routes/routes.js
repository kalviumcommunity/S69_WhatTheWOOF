const express=require('express');
const router=express.Router();
const Item=require('../Model/items');

// GET

router.get('/items',(req,res)=>{
    Item.find()
    .then((items)=>{
        res.status(200).json({ message: 'Items received successfully.', items});
})
.catch((err)=>{
    res.status(500).json({message: 'Error occured: ', err});
})
})

// GET by Id

router.get('/items/:id',(req, res)=>{
    const {id}=req.params;
    Item.findById(id)
    .then((item)=>{
        if (!item){
            return res.status(400).json({message: `Item  with ${id} not found`})
        }
        res.status(200).status(200).json({message: `Item with ${id} retrieved succesfully`, item});
    })
    .catch((err)=>{
        res.status(500).json({message: "Error Occured: ", err})
    })
});

// POST 
router.post('/items',(req,res)=>{
    const {name}=req.body;
    const newItem=new Item({name});

    newItem.save()
    .then(()=>{

        res.status(201).json({ message: 'Item created successfully', newItem });
    })
    .catch((error)=>{
        res.status(500).json({ message: 'Error creating item',error});
        
    });
    
    
});

// PUT

router.put('/items/:id',(req,res)=>{
    const {id}=req.params;
    const {name}=req.body;
    Item.findByIdAndUpdate(id, { name }, { new: true })
        .then((item) => {
            if (!item) {
                return res.status(404).json({ message: `Item with ID ${id} not found `});
            }
            res.status(200).json({ message: `Item ${id} updated successfully`, item });
        })
        .catch((error) => {
            res.status(500).json({ message: "Error updating item", error });
        });

});

// DELETE 
router.delete('/items/:id',(req,res)=>{
    const {id}=req.params;
    Item.findByIdAndDelete(id)
        .then((item) => {
            if (!item) {
                return res.status(404).json({ message: `Item with ID ${id} not found` });
            }
            res.status(200).json({ message: `Item ${id} deleted successfully` });
        })
        .catch((error) => {
            res.status(500).json({ message: 'Error deleting item', error});
        });
   
});

module.exports=router;