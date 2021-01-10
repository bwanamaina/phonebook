const express = require('express');
const router = express.Router();
const PhoneBook = require('../models/phonebook');

// get whole phonebook
router.get('/', async (req, res) => {
  try {
    const phones = await PhoneBook.find();
    res.json(phones);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get one phone
router.get('/:id', getPhoneNumber, (req, res) => {
  res.json(res.phone);
});

// add new phone number
router.post('/', async (req, res) => {
   // TODO : validate phone, email & website
  const { name, phone, email, website } = req.body;
  const phoneBook = new PhoneBook({
    name,
    phone,
    email,
    website,
  });
  try {
    const newPhone = await phoneBook.save();
    res.status(201).json(newPhone);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// update phone
router.patch('/:id', getPhoneNumber, async (req, res) => {
  const { name, phone, email, website } = req.body;
  // TODO : use loop to validate this
  // TODO : validate phone, email & website
  console.log(res.phone)
  if (name) {
    res.phone.name = name;
  }
  if (phone) {
    res.phone.phone = phone;
  }
  if (email) {
    res.phone.email = email;
  }
  if (website) {
    res.phone.website = website;
  }
  try {
    const updatedPhone = await res.phone.save();
    res.json(updatedPhone);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// delete phone
router.delete('/:id', getPhoneNumber, async (req, res) => {
  try {
    await res.phone.remove();
    res.json({ message: 'Phone Number Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getPhoneNumber(req, res, next) {
  let phone;
  try {
    phone = await PhoneBook.findById(req.params.id);
    if (phone == null) {
      return res.status(404).json({ message: 'Cannot find phone number' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.phone = phone;
  next();
}

module.exports = router;
