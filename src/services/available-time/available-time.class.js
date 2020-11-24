const { Service } = require('feathers-objection');

exports.AvailableTime = class AvailableTime extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
