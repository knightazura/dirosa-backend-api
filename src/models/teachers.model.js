const { Model } = require('objection');
const { v4: uuidv4 } = require('uuid');

class Teachers extends Model {

  static get tableName() {
    return 'teachers';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'full_name',
        'dpd_area',
        'phone_number',
      ],

      properties: {
        id: { type: 'string' },
        full_name: { type: 'string' },
        age: { type: 'number' },
        phone_number: { type: 'string' },
        address: {
          type: 'object',
          properties: {
            street_name: { type: 'string' },
            province: {
              type: 'object',
              properties: {
                id: { type: 'number'|'string' },
                name: { type: 'string' }
              }
            },
            city: {
              type: 'object',
              properties: {
                id: { type: 'number'|'string' },
                name: { type: 'string' }
              }
            },
            district: {
              type: 'object',
              properties: {
                id: { type: 'number'|'string' },
                name: { type: 'string' }
              }
            },
            zipcode: { type: 'number'|'string' }
          }
        },
        dpd_area: {
          type: 'object',
          properties: {
            id: { type: 'number'|'string' },
            name: { type: 'string' }
          },
        },
        occupation: { type: 'string' },
      }
    };
  }

  static get relationMappings() {
    const User = require('./users.model')
    const AvailableTime = require('./available-time.model')

    return {
      account: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'teachers.account_id',
          to: 'users.id'
        }
      },
      availableTimes: {
        relation: Model.HasManyRelation,
        model: AvailableTime,
        join: {
          from: 'teachers.id',
          to: 'available_time.teacher_id'
        }
      },
    }
  }

  $beforeInsert() {
    this.id = uuidv4();
    this.createdAt = this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
}

module.exports = function (app) {
  const db = app.get('knex');

  db.schema.hasTable('teachers').then(exists => {
    if (!exists) {
      db.schema.createTable('teachers', table => {
        table.uuid('id');
        table.integer('account_id').references('users.id');
        table.string('full_name');
        table.integer('age');
        table.string('phone_number');
        table.json('address');
        table.json('dpd_area');
        table.string('occupation');
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
      })
        .then(() => console.log('Created teachers table')) // eslint-disable-line no-console
        .catch(e => console.error('Error creating teachers table', e)); // eslint-disable-line no-console
    }

    /**
     * UPDATING SCHEMA!!
     if (db.schema.hasColumn('students', 'new_column')) {
       db.schema.table('students', table => {
         table.string('new_column')
        })
      }
    */

  })
    .catch(e => console.error('Error creating teachers table', e)); // eslint-disable-line no-console

  return Teachers;
};
