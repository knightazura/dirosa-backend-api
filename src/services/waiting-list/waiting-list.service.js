// Initializes the `waiting-list` service on path `/waiting-list`
const { WaitingList } = require('./waiting-list.class');
const createModel = require('../../models/waiting-list.model');
const hooks = require('./waiting-list.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ['$eager', '$joinRelation'],
    allowedEager: '[candidate, selectedSchedule]'
  };

  // Initialize our service with any options it requires
  app.use('/waiting-list', new WaitingList(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('waiting-list');

  service.hooks(hooks);
};
