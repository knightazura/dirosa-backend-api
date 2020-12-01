
exports.up = async function(knex) {
    const check = await knex.schema.hasColumn('available_time', 'total_candidate')
    
    if (!check) {
        return knex.schema.table('available_time', table => {
            table.integer('total_candidate')
        })
    }
};

exports.down = async function(knex) {
    const check = await knex.schema.hasColumn('available_time', 'total_candidate')
    
    if (check)
        return knex.schema.table('available_time', table => table.dropColumn('total_candidate'))
};
