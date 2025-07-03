import mongoose from 'mongoose';

export default async function connectDb() {
  if (mongoose.connections[0].readyState) {
    return;
  }
  await mongoose.connect(process.env.MONGO_URI);
  console.log('\n✅ database connected successfuly \n');
}
