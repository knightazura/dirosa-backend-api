// Initializes the `available-time` service on path `/available-time`
const { AvailableTime } = require('./available-time.class');
const createModel = require('../../models/available-time.model');
const hooks = require('./available-time.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/available-time', new AvailableTime(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('available-time');

  service.hooks(hooks);
};
