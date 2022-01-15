exports.up = (knex) => {
    return knex.schema
        .createTable('mcus', (table) => {
            table.increments('id').primary()
            table.string('description')
        })
    
        .createTable('mcu_actions', (table) => {
            table.increments('id').primary()
            table // fk
                .integer('mcu_id')
                .unsigned()
                .references('id')
                .inTable('mcus')
                .onDelete('SET NULL')
                .index()
            table.integer('action_id').defaultTo(0),
            table.integer('param_min'),
            table.integer('param_max'),
            table.string('title'),
            table.string('description'),
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
        })
}

exports.down = (knex) => {
    return knex.schema
        .dropTableIfExists('mcus')
        .dropTableIfExists('mcu_actions')
}