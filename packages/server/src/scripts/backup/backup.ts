import dotenv from 'dotenv';
dotenv.config();

import { backupDB } from './backupUtils';

const useRemote = process.argv.includes('--remote');
const uri = useRemote ? process.env.MONGO_URI_REMOTE : process.env.MONGO_URI;

if (!uri) {
  console.error(`${useRemote ? 'MONGO_URI_REMOTE' : 'MONGO_URI'} not set in .env`);
  process.exit(1);
}

console.log(`Using ${useRemote ? 'remote (Atlas)' : 'local'} database`);
backupDB(uri);
console.log('Finished doing backup.');
