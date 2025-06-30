import mongoose from 'mongoose';

const connectdb = async (DATABASE_URL) => {
    try {
        await mongoose.connect(DATABASE_URL);
        console.log('✅ Database connected successfully');
    } catch (error) {
        console.error('❌ Database connection error:', error);
        process.exit(1);
    }
};

export default connectdb;
