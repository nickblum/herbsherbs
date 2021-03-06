
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('mcu_actions').del()
    .then(function () {
      return knex('mcu_actions').insert([
        {mcu_id:1,action_id:1,title:"Water Rack 1",description:"Opens rack 1 solenoid for specified duration (ms)",param_min: 100, param_max: 5000},
        {mcu_id:1,action_id:2,title:"Water Rack 2",description:"Opens rack 2 solenoid for specified duration (ms)",param_min: 100, param_max: 5000},
        // weather station
        // {mcu_id:1,action_id:1,title:"Temperature",description:"Reads temperature from DHT11 - accurate withing 2 degrees C"},
        // {mcu_id:1,action_id:2,title:"Humidity",description:"Reads humidity from DHT11"},
        // // garden module
        // {mcu_id:2,action_id:1,title:"Water Valve 1",description:"Opens valve for specifified duration",param_min: 100, param_max: 5000}
      ]);
    });
};
