// Initializes the `halaqah` service on path `/halaqah`
const { Halaqah } = require('./halaqah.class');
const createModel = require('../../models/halaqah.model');
const hooks = require('./halaqah.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ['$eager', '$joinRelation'],
    allowedEager: 'teacher'
  };

  // Initialize our service with any options it requires
  app.use('/halaqah', new Halaqah(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('halaqah');

  service.hooks(hooks);
};
