db = db.getSiblingDB('users');
db.createUser({
  user: 'usmroot',
  pwd: 'toormsu',
  roles: [{ role: 'readWrite', db: 'users' }],
});
db.createCollection('users');

db.users.insertOne({
  name: 'admin',
  last_name: 'admin',
  age: 18,
  birth_date: new Date('2000-01-01'),
  active: true,
  email: 'admin@admin.com',
  password: '$2b$10$4cHyN9kQT.aZzVMw7L/JaOHr9.O3rGtAidRSKVxe8q87PzO5WCIzS', //adminPass123
  created_at: new Date('2000-01-01'),
});
