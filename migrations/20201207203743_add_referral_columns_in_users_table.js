
exports.up = async function (knex) {
    const rcCheck = await knex.schema.hasColumn('users', 'referral_code');
    if (!rcCheck) {
        await knex.schema.table('users', table => {
            table.string('referral_code');
        })
    }

    const rrCheck = await knex.schema.hasColumn('users', 'referrer');
    if (!rcCheck) {
        return knex.schema.table('users', table => {
            table.string('referrer');
        })
    }
};

exports.down = async function (knex) {
    const rcCheck = await knex.schema.hasColumn('users', 'referral_code');
    if (rcCheck)
        await knex.schema.table('users', table => table.dropColumn('referral_code'));

    const rrCheck = await knex.schema.hasColumn('users', 'referrer');
    if (rrCheck)
        return await knex.schema.table('users', table => table.dropColumn('referrer'));
};
