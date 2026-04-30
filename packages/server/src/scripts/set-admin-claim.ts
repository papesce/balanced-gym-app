import dotenv from 'dotenv';
dotenv.config();

import * as admin from 'firebase-admin';

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
});

async function setAdminClaim() {
  const uid = process.argv[2];
  const email = process.argv[3];

  if (!uid && !email) {
    console.log('Usage:');
    console.log('  By UID:   npx ts-node src/scripts/set-admin-claim.ts <firebase-uid>');
    console.log('  By email: npx ts-node src/scripts/set-admin-claim.ts --email <email>');
    process.exit(1);
  }

  let targetUid = uid;

  if (uid === '--email' && email) {
    const userRecord = await admin.auth().getUserByEmail(email);
    targetUid = userRecord.uid;
    console.log(`Found user: ${userRecord.email} (uid: ${targetUid})`);
  }

  await admin.auth().setCustomUserClaims(targetUid, { admin: true });
  console.log(`Admin claim set for uid: ${targetUid}`);
  console.log('The user must sign out and sign back in for the claim to take effect.');
  process.exit(0);
}

setAdminClaim().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
