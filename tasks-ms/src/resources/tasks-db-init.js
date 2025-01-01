db = db.getSiblingDB('tasks');
db.createUser({
  user: 'tsmroot',
  pwd: 'toormst',
  roles: [{ role: 'readWrite', db: 'tasks' }],
});
db.createCollection('tasks');
