
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('mcus').del().then(()=>{
    return knex('mcus').insert([
      {description:"Seed Rack"}
      //,{description:"Garden"}
    ]);
  });
};
