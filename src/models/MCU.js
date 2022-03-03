const { Model } = require('objection');

class MCU extends Model {
    static get tableName() {
        return 'mcus';
    }

    static get relationMappings() {
        const MCU_Actions = require('./MCU_Actions')
    
        return {
            actions: {
                relation: Model.HasManyRelation,
                modelClass: MCU_Actions,
                join: {
                    from: 'mcus.id',
                    to: 'mcu_actions.mcu_id',
                }
            }
        }
    }
}

module.exports = MCU