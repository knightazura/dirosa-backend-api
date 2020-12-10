
exports.up = async function(knex) {
  const check = await knex.schema.hasColumn('available_time', 'infaq')
    
    if (!check) {
        return knex.schema.table('available_time', table => {
            table.decimal('infaq', 15, 6)
        })
    }
};

exports.down = async function(knex) {
  const check = await knex.schema.hasColumn('available_time', 'infaq')
    
    if (check)
        return knex.schema.table('available_time', table => table.dropColumn('infaq'))
};
