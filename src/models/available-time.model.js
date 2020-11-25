// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class AvailableTime extends Model {

  static setup(app) {
    this.app = app
  }

  static get tableName() {
    return 'available_time';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'teacher_id',
        'class_type',
        'frequency',
        'implementation',
        'schedules',
      ],

      properties: {
        teacher_id: { type: 'string' },
        class_type: { type: 'number' },
        frequency: { type: 'number' },
        implementation: { type: 'number' },
        schedules: { type: 'array' },
      }
    };
  }

  static get relationMappings() {
    const Teacher = require('./teachers.model')();
    const WaitingList = require('./waiting-list.model')();

    return {
      teacher: {
        relation: Model.HasManyRelation,
        model: Teacher,
        join: {
          from: 'available_time.teacher_id',
          to: 'teachers.id'
        }
      },
      candidates: {
        relation: Model.HasManyRelation,
        model: WaitingList,
        join: {
          from: 'available_time.id',
          to: 'waiting_list.schedule_id'
        }
      }
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
    AvailableTime.setup(app);

    const db = app.get('knex');
  
    db.schema.hasTable('available_time').then(exists => {
      if (!exists) {
        db.schema.createTable('available_time', table => {
          table.increments('id');
          table.uuid('teacher_id');
          table.integer('class_type');
          table.integer('frequency');
          table.integer('implementation');
          table.json('schedules');
          table.string('status');
          table.timestamp('createdAt');
          table.timestamp('updatedAt');
        })
          .then(() => console.log('Created available_time table')) // eslint-disable-line no-console
          .catch(e => console.error('Error creating available_time table', e)); // eslint-disable-line no-console
      }
    })
      .catch(e => console.error('Error creating available_time table', e)); // eslint-disable-line no-console
  }

  return AvailableTime;
};
