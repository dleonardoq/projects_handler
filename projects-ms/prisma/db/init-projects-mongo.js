db.createUser({
  user: 'pjmroot',
  pwd: 'toormjp',
  roles: [
    {
      role: 'readWrite',
      db: 'projectsdb',
    },
  ],
});

db = db.getSiblingDB('projectsdb');
db.createCollection('projectsCollection');
