
exports.up = async function(knex) {
  const check = await knex.schema.hasColumn('students', 'telegram_data')
    
  if (!check) {
      return knex.schema.table('students', table => {
          table.json('telegram_data')
      })
  }
};

exports.down = async function(knex) {
  const check = await knex.schema.hasColumn('students', 'telegram_data')
    
  if (check)
      return knex.schema.table('students', table => table.dropColumn('telegram_data'))
};
