import dotenv from 'dotenv';
dotenv.config();

import * as admin from 'firebase-admin';
import mongoose from 'mongoose';
import { SerieDocumentModel } from '../api/mongoose/serie.mongoose';

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
});

async function backfillSerieUserId() {
  const email = 'papesce@gmail.com';

  const userRecord = await admin.auth().getUserByEmail(email);
  const userId = userRecord.uid;
  console.log(`Found user: ${email} (uid: ${userId})`);

  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    console.error('MONGO_URI not set in .env');
    process.exit(1);
  }

  await mongoose.connect(mongoUri);
  console.log('Connected to MongoDB');

  const result = await SerieDocumentModel.updateMany(
    { userId: { $exists: false } },
    { $set: { userId } }
  );

  console.log(`Updated ${result.modifiedCount} series with userId: ${userId}`);

  await mongoose.disconnect();
  process.exit(0);
}

backfillSerieUserId().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
