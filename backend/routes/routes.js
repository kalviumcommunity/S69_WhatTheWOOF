const express = require('express');
const router = express.Router();
const Item = require('../Model/')

// ✅ GET All Items
router.get('/items', (req, res) => {
    Item.find()
        .then((items) => {
            res.status(200).json({ message: 'Items received successfully.', items });
        })
        .catch((err) => {
            res.status(500).json({ message: 'Error occurred', error: err });
        });
});

// ✅ GET Item by ID
router.get('/items/:id', (req, res) => {
    const { id } = req.params;
    Item.findById(id)
        .then((item) => {
            if (!item) {
                return res.status(404).json({ message: `Item with ID ${id} not found` });
            }
            res.status(200).json({ message: `Item retrieved successfully`, item });
        })
        .catch((err) => {
            res.status(500).json({ message: "Error occurred", error: err });
        });
});

// ✅ POST Create a New Item
router.post('/items', (req, res) => {
    const { name, breed, age, img, caption } = req.body;

    if (!name || !breed || !age || !img || !caption) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const newItem = new Item({ name, breed, age, image: img, caption });

    newItem.save()
        .then((savedItem) => {
            res.status(201).json({ message: 'Item created successfully', newItem: savedItem });
        })
        .catch((error) => {
            res.status(500).json({ message: 'Error creating item', error });
        });
});

// ✅ PUT Update an Item
router.put('/items/:id', (req, res) => {
    const { id } = req.params;
    const { name, breed, age, img, caption } = req.body;

    Item.findByIdAndUpdate(id, { name, breed, age, image: img, caption }, { new: true })
        .then((item) => {
            if (!item) {
                return res.status(404).json({ message: `Item with ID ${id} not found` });
            }
            res.status(200).json({ message: `Item updated successfully`, item });
        })
        .catch((error) => {
            res.status(500).json({ message: "Error updating item", error });
        });
});

// ✅ DELETE Remove an Item
router.delete('/items/:id', (req, res) => {
    const { id } = req.params;
    Item.findByIdAndDelete(id)
        .then((item) => {
            if (!item) {
                return res.status(404).json({ message: `Item with ID ${id} not found` });
            }
            res.status(200).json({ message: `Item deleted successfully` });
        })
        .catch((error) => {
            res.status(500).json({ message: 'Error deleting item', error });
        });
});


module.exports = router;
