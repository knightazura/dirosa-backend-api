const { Service } = require('feathers-objection');

exports.WaitingList = class WaitingList extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
