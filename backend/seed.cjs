const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGO_URI = 'mongodb+srv://husam_db_user:3yBKg7N5f0qcVvac@cluster0.oxey1us.mongodb.net/tafaseel-home?retryWrites=true&w=majority';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  role: String,
  isVerified: { type: Boolean, default: true }
});

const User = mongoose.model('User', userSchema);

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log('✅ Connected');
  
  await User.deleteMany({ email: { $in: ['admin1@tafasel.ps', 'staff1@tafasel.ps'] } });
  
  const h1 = await bcrypt.hash('admin123', 10);
  await User.create({ name: 'Admin', email: 'admin1@tafasel.ps', password: h1, phone: '0599000000', role: 'admin', isVerified: true });
  
  const h2 = await bcrypt.hash('staff123', 10);
  await User.create({ name: 'Staff', email: 'staff1@tafasel.ps', password: h2, phone: '0599000000', role: 'staff', isVerified: true });
  
  console.log('✅ Users created!');
  process.exit();
}

seed();