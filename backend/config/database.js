const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
      socketTimeoutMS: 45000,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`   Database: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`\n❌ MongoDB Connection Error: ${error.message}`);
    console.error('\n📋 Fix MongoDB Atlas Connection:');
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.error('1. Go to: https://cloud.mongodb.com/');
    console.error('2. Select your cluster → Network Access');
    console.error('3. Click "Add IP Address"');
    console.error('4. Select "Allow Access from Anywhere" (0.0.0.0/0)');
    console.error('5. Save and wait 2-3 minutes');
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    throw error;
  }
};

module.exports = connectDB;
