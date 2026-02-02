const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const enquiryRoutes = require('./App/Routes/web/enquiryRoute');

const { getAllEnquiries,enquiryInsert,enquiryDelete,enquiryUpdate } = require('./App/Controller/web/enquiryController');


const app = express();
app.use(express.json());                            
const PORT = process.env.PORT || 3004;

app.use('/web/api/', enquiryRoutes);


mongoose.connect(process.env.dbUrl, {}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
