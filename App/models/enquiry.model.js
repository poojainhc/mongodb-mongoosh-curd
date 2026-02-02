const express = require('express');
const mongoose = require('mongoose');

const userenquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
});
const enquiryModel = mongoose.model('Enquiry', userenquirySchema)

module.exports = enquiryModel;