import path from 'path';
import { execSync } from 'child_process';
import fs from 'fs';
const backup = require('mongodb-backup-4x');

const BACKUP_ROOT = path.join(__dirname, 'dbbackup');
const INDIVIDUAL_BSON_DIR = path.join(__dirname, 'dbbackup/balanced_gym');

export function backupDB(uri: string): void {
  console.log(`Backing up database: ${uri}`);
  backup({
    uri,
    root: BACKUP_ROOT,
  });
}

export function restoreDB(uri: string): void {
  console.log(`Restoring database from backup to: ${uri}`);

  const tmpDir = '/tmp/balanced_gym_restore';
  if (fs.existsSync(tmpDir)) fs.rmSync(tmpDir, { recursive: true });
  fs.mkdirSync(tmpDir);

  const collections = fs.readdirSync(INDIVIDUAL_BSON_DIR).filter((f) =>
    fs.statSync(path.join(INDIVIDUAL_BSON_DIR, f)).isDirectory()
  );

  for (const collection of collections) {
    const collDir = path.join(INDIVIDUAL_BSON_DIR, collection);
    const files = fs.readdirSync(collDir).filter((f) => f.endsWith('.bson'));
    const outPath = path.join(tmpDir, `${collection}.bson`);
    const fd = fs.openSync(outPath, 'w');
    for (const file of files) {
      const data = fs.readFileSync(path.join(collDir, file));
      fs.writeSync(fd, data);
    }
    fs.closeSync(fd);
    console.log(`  ${collection}: ${files.length} documents`);
  }

  const cmd = `mongorestore --drop --uri="${uri}" --db=balanced_gym ${tmpDir}`;
  execSync(cmd, { stdio: 'inherit' });

  fs.rmSync(tmpDir, { recursive: true });
}
