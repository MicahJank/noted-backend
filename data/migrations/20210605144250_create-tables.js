
exports.up = function(knex) {
    return knex.schema.createTable("users", tbl => {
        tbl.increments();
        tbl.string("email").unique().notNullable();
        tbl.string("password").unique().notNullable();
    })
    .createTable("notes", tbl => {
        tbl.increments();
        tbl.text("title", 128).notNullable();
        tbl.string("imgBase64").notNullable().unique();
        tbl.text("comment");
        tbl.integer("user_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("users");
    })
};

exports.down = function(knex) {
    knex.schema.dropTableIfExists("notes").dropTableIfExists("users");
  
};
