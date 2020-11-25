// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class WaitingList extends Model {

  static setup(app) {
    this.app = app
  }

  static get tableName() {
    return 'waiting_list';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['candidate_id', 'schedule_id'],

      properties: {
        candidate_id: { type: 'string' },
        schedule_id: { type: 'string' }
      }
    };
  }

  static get relationMappings() {
    const Student = require('./students.model')();
    const AvailableTime = require('./available-time.model')();

    return {
      candidate: {
        relation: Model.BelongsToOneRelation,
        model: Student,
        join: {
          from: 'waiting_list.candidate_id',
          to: 'students.id'
        }
      },
      selectedSchedule: {
        relation: Model.HasManyRelation,
        model: AvailableTime,
        join: {
          from: 'waiting_list.schedule_id',
          to: 'available_time.id'
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
    WaitingList.setup(app);

    const db = app.get('knex');
  
    db.schema.hasTable('waiting_list').then(exists => {
      if (!exists) {
        db.schema.createTable('waiting_list', table => {
          table.increments('id');
          table.string('candidate_id');
          table.string('schedule_id');
          table.timestamp('createdAt');
          table.timestamp('updatedAt');
        })
          .then(() => console.log('Created waiting_list table')) // eslint-disable-line no-console
          .catch(e => console.error('Error creating waiting_list table', e)); // eslint-disable-line no-console
      }
    })
      .catch(e => console.error('Error creating waiting_list table', e)); // eslint-disable-line no-console

  }

  return WaitingList;
};
