db = db.getSiblingDB('users-ms');
db.createUser({
  user: 'usmroot',
  pwd: 'toormsu',
  roles: [{ role: 'readWrite', db: 'users-ms' }],
});
db.createCollection('users-ms');
