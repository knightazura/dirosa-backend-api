// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');
const { v4: uuidv4 } = require('uuid');

class Students extends Model {

  static get tableName() {
    return 'students';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'full_name',
        'age', 
        'phone_number', 
        'occupation'
      ],

      properties: {
        id: { type: 'string' },
        full_name: { type: 'string' },
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
        age: { type: 'number' },
        phone_number: { type: 'string' },
        occupation: { type: 'string' },
      }
    };
  }

  static get relationMappings() {
    const User = require('./users.model')

    return {
      account: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'students.account_id',
          to: 'users.id'
        }
      }
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

  db.schema.hasTable('students').then(exists => {
    if (!exists) {
      db.schema.createTable('students', table => {
        table.uuid('id');
        table.integer('account_id').references('users.id');
        table.json('address');
        table.string('full_name');
        table.integer('age');
        table.string('phone_number');
        table.string('occupation');
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
      })
        .then(() => console.log('Created students table')) // eslint-disable-line no-console
        .catch(e => console.error('Error creating students table', e)); // eslint-disable-line no-console
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
    .catch(e => console.error('Error creating students table', e)); // eslint-disable-line no-console

  return Students;
};
