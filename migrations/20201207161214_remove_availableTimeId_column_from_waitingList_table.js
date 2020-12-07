
exports.up = async function(knex) {
  const check = await knex.schema.hasColumn('waiting_list', 'available_time_id')

  if (check)
    return knex.schema.table('waiting_list', table => {
      table.dropColumn('available_time_id')
    })
};

exports.down = function(knex) {
  // 
};
