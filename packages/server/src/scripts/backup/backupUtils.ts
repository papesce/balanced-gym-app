import path from 'path';
const backup = require('mongodb-backup-4x');
const restore = require('mongodb-restore');

const BACKUP_ROOT = path.join(__dirname, 'dbbackup');
const RESTORE_ROOT = path.join(__dirname, 'dbbackup/balanced_gym');
const LOG_PATH = path.join(__dirname, 'log');

export function backupDB(uri: string): void {
  console.log(`Backing up database: ${uri}`);
  backup({
    uri,
    root: BACKUP_ROOT,
  });
}

export function restoreDB(uri: string): void {
  console.log(`Restoring database from backup to: ${uri}`);
  restore({
    uri,
    root: RESTORE_ROOT,
    drop: true,
    logger: LOG_PATH,
  });
}
