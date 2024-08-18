/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('memory');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    
    clear: function() {
        // Borra la memoria de los creeps difuntos
        for (let name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log("Limpiando memoria de creeps difuntos.");
            }
        }
    }
    
}