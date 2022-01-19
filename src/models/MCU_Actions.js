const { Model } = require('objection');

class MCU_Actions extends Model {
    static get tableName() {
        return 'mcu_actions';
    }

    static get relationMappings() {
        const MCU = require('./MCU')
    
        return {
            actions: {
                relation: Model.BelongsToOneRelation,
                modelClass: MCU,
                join: {
                    from: 'mcu_actions.mcu_id',
                    to: 'mcu.id',
                }
            }
        }
    } 
}

module.exports = MCU_Actions