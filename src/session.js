const session = require('express-session')
const KnexSessionStore = require('connect-session-knex')(session);
const Knex = require('knex');

module.exports = function (app) {
  const { client, connection } = app.get('postgres');

  const knex = Knex({ client, connection });
  
  const store = new KnexSessionStore({
    knex,
    tablename: 'sessions', // optional. Defaults to 'sessions'
    createtable: false
  });

  app.use(session({
    secret: app.get('session').secret,
    cookie: {
      maxAge: parseInt(app.get('session').maxAge)
    },
    store,
    resave: true,
    saveUninitialized: false
  }))
}