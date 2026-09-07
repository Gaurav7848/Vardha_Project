const Contact = require('../models/Contact');
const { protect, authorize } = require('../middleware/auth');

const submitContact = async (req, res) => {
  try {
    const { name, company, phone, email, message } = req.body;

    if (!name || !company || !phone || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please fill all required fields.',
      });
    }

    const contact = new Contact({
      name,
      company,
      phone,
      email,
      message,
    });

    await contact.save();

    return res.status(201).json({
      success: true,
      message: 'Contact enquiry submitted successfully',
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.',
    });
  }
};

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      data: contacts,
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch contacts.',
    });
  }
};

const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found.',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Contact deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting contact:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete contact.',
    });
  }
};

module.exports = {
  submitContact,
  getContacts,
  deleteContact,
};
