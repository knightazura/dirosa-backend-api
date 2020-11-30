// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class Halaqah extends Model {

  static setup(app) {
    this.app = app
  }

  static get tableName() {
    return 'halaqah';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['teacher_id', 'student_id', 'name', 'fee'],

      properties: {
        teacher_id: { type: 'string' },
        students: {
          type: 'object',
          properties: {
            id: 'string',
            name: 'string'
          }
        },
        name: { type: 'string' },
        fee: { type: 'number' },
        status: { type: 'string' },
      }
    };
  }

  static get relationMappings() {
    const Teacher = require('./teachers.model')();

    return {
      teacher: {
        relation: Model.HasManyRelation,
        modelClass: Teacher,
        join: {
          from: 'halaqah.teacher_id',
          to: 'teachers.id'
        }
      },
    }
  }

  $beforeInsert() {
    this.createdAt = this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
}

module.exports = function (app) {
  if (app) {
    Halaqah.setup(app);

    const db = app.get('knex');
  
    db.schema.hasTable('halaqah').then(exists => {
      if (!exists) {
        db.schema.createTable('halaqah', table => {
          table.increments('id');
          table.string('teacher_id');
          table.json('students'); // contains id and name
          table.string('name');
          table.integer('fee');
          table.string('status');
          table.timestamp('createdAt');
          table.timestamp('updatedAt');
        })
          .then(() => console.log('Created halaqah table')) // eslint-disable-line no-console
          .catch(e => console.error('Error creating halaqah table', e)); // eslint-disable-line no-console
      }
    })
      .catch(e => console.error('Error creating halaqah table', e)); // eslint-disable-line no-console
  }

  return Halaqah;
};
