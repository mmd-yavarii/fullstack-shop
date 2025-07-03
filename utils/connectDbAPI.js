import connectDb from './connectDb';

export default async function connectDb_API(res) {
  try {
    await connectDb();
    return true;
  } catch (error) {
    console.log(`\n❌ db connection failed : ${error.message}\n`);
    res.status(500).json({ status: 'failed', message: 'خطای برقراری ارتباط' });
    return false;
  }
}
