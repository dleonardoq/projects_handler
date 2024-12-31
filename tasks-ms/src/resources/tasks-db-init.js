db = db.getSiblingDB('tasks-ms');
db.createUser({
  user: 'tsmroot',
  pwd: 'toormst',
  roles: [{ role: 'readWrite', db: 'tasks-ms' }],
});
db.createCollection('tasks-ms');
