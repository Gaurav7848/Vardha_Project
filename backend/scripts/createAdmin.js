require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');
const Admin = require('../models/Admin');

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const adminData = {
      name: 'Vardha Admin',
      email: 'admin@vardha.com',
      password: 'Vardha@1234',
      role: 'admin',
      company: 'Vardha Warehousing',
    };

    const admin = new Admin(adminData);
    await admin.save();

    console.log('Admin created successfully');
    console.log('Email:', admin.email);
    console.log('Password:', adminData.password);
    console.log('Role:', admin.role);

    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error.message);
    if (error.code === 11000) {
      console.log('Admin with this email already exists');
    }
    process.exit(1);
  }
};

createAdmin();
