
exports.up = async function(knex) {
  const check = await knex.schema.hasTable('sessions')

  if (!check) {
    return await knex.schema.createTable('sessions', table => {
      table.string('sid').primary()
      table.json('sess')
      table.timestamp('expired', { useTz: true })

      table.index('sid', 'session_pkey', 'btree')
      table.index('expired', 'sessions_expired_index', 'btree')

      /*
      alter table sessions add primary key (sid);
      create index session_pkey on sessions using btree (sid);
      create index sessions_expired_index on sessions using btree (expired);
      */
    })
  }
};

exports.down = async function(knex) {
  return await knex.schema.dropTableIfExists('sessions')
};
