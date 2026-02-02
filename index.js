const express = require('express');
const mongoose = require('mongoose');
const enquiryModel = require('./models/enquiry.model');
require('dotenv').config();


const app = express();
app.use(express.json());                            
const PORT = process.env.PORT || 3004;

app.get('/api/', async (req, res) => {
  try {
    const enquiryUser = await enquiryModel.find();
    if (enquiryUser) {
      res.send( enquiryUser);
    } else {
      res.send('Welcome to the Enquiry API');
    }
  } catch (error) {
    res.status(500).send('Error retrieving enquiry user');
  }
})

app.post('/api/enquiry-insert', async (req, res) => {
    
  try {
    const newEnquiry = new enquiryModel({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        message: req.body.message
    });
    
    const savedEnquiry = await newEnquiry.save();
    res.status(201).json(savedEnquiry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/enquiry-delete/:id', async (req, res) => {
  try {
    const deletedEnquiry = await enquiryModel.findByIdAndDelete(req.params.id);
    if (!deletedEnquiry) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }
    res.json({ message: 'Enquiry deleted successfully', deletedEnquiry });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/enquiry-update/:id', async (req, res) => {
  try {
    const updatedEnquiry = await enquiryModel.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        message: req.body.message
      },
      { new: true }
    );
    if (!updatedEnquiry) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }
    res.json(updatedEnquiry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose.connect(process.env.dbUrl, {}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
