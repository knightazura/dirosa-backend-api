const { Service } = require('feathers-objection');

exports.Halaqah = class Halaqah extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
