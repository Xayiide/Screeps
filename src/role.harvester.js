var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.spawning)
            creep.memory.estado = 'spawning';
        else if (creep.store[RESOURCE_ENERGY] < creep.store.getCapacity())
            creep.memory.estado = 'con_espacio';
        else if (creep.store[RESOURCE_ENERGY] == creep.store.getCapacity())
            creep.memory.estado = 'lleno';
        
        switch (creep.memory.estado) {
            case 'spawning': {
                /* Todavía está apareciendo */
                break;
            }
            case 'con_espacio': {
                let fuentes = creep.room.find(FIND_SOURCES);
                
                if (fuentes.length == 0) {
                    creep.say('❌ fuentes');
                }
                
                if (creep.harvest(fuentes[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(fuentes[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                    //creep.say('⚡ minando');
                }
                break;
            }
            case 'lleno': {
                let objetivos = creep.room.find(FIND_STRUCTURES, {
                   filter: (structure) => {
                       return (structure.structureType == STRUCTURE_EXTENSION ||
                               structure.structureType == STRUCTURE_SPAWN     ||
                               structure.structureType == STRUCTURE_TOWER)
                               &&
                               (structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
                   }
                });
                // Si hay objetivos donde guardar la energía, hazlo
                if (objetivos.length > 0) {
                    if (creep.transfer(objetivos[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(objetivos[0], {visualizePathStyle :{stroke: '#ffffff'}});
                        //creep.say('🔽 descarga');
                    }
                }
                // En otro caso, te quejas y buscas si puedes upgradear un RCL
                else {
                    creep.say('❌ almacén');
                    if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ff00ff'}}); // TODO: Poner un color de excepción
                    }
                }
                break;
            }
            
            default:
                creep.memory.estado = 'spawning';
                break;
        }
    }
};

module.exports = roleHarvester;