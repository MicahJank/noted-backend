
exports.up = function(knex) {
  return knex.schema.table('notes', tbl => {
      tbl.dropColumn('imgBase64');
      tbl.string('aws_imgURL').notNullable().unique().defaultTo('');
  })
};

exports.down = function(knex) {
  knex.schema.table('notes', tbl => {
      tbl.dropColumn('aws_imgURL');
      tbl.string("imgBase64").notNullable().unique();
  })
};
