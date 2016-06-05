
exports.up = function(knex, Promise) {
   return knex.schema.createTable('places', function(places){
    table.string('yelp-id').primary();
   }
  
};

exports.down = function(knex, Promise) {
  
};
