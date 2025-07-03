import connectDb from './connectDb';

export default async function connectDb_API(res) {
  try {
    await connectDb();
  } catch (error) {
    console.log(`\n❌ db connection failed : ${error.message}\n`);
    res.status(500).json({ status: 'failed', message: 'error in connectiong to database' });
    return true;
  }
}
