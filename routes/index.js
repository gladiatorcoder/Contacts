const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

//CREATE CONTACT
router.post('/create', async (req, res) => {
    try{

        const contact = await new Contact(req.body);
        const result = await contact.save();
        console.log(result);
        res.status(200).send(result);

    }catch(err){
        console.log(err);
        res.status(400).send(err);
    }
});

//GET ALL CONTACTS
router.get('/contacts', async (req, res) => {
    try{
        const contacts = await Contact.find();
        res.status(200).send(contacts);
    }catch(err){
        console.log(err);
        res.status(400).send(err);
    }
});

//EDIT CONTACT
router.patch('/contact/:id', async (req, res) => {
        const allowedUpdates = ['name', 'contact', 'email', 'job'];
        const updates = Object.keys(req.body);
        const isValidOperation = updates.every((update) => {
            return allowedUpdates.includes(update);
        })
        if (!isValidOperation) {
            return res.status(400).send('Error: Invalid updates!');
        }
    try{
        const contact = await Contact.findById(req.params.id);
        console.log(contact);
        updates.forEach((update) => {
            contact[update] = req.body[update];
        });
        const updatedContact = await contact.save();
        console.log(updatedContact);
        res.status(201).send(updatedContact);
    }catch(err){
        res.status(400).send(err);
    }
});

//DELETE A CONTACT
router.delete('/contact/:id', async (req, res) => {
    try{
        await Contact.findByIdAndDelete(req.params.id);
        res.status(204).send('Deleted');
    }catch(err){
        res.status(400).send(err);
    }
})

module.exports = router;