var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

const memory = require('memory');


module.exports.loop = function () {

    /* Gestiona la creación y reciclado de los creeps nuevos y difuntos */

    /*
    // Spawnea nuevos harvesters si es necesario
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('Harvesters: ' + harvesters.length);
    if (harvesters.length < 2) {
        var name = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + name);
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE, CARRY, MOVE], name,
            {memory: {role: 'harvester'}});
    }
    
    // Spawnea nuevos upgraders si es necesario
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role = 'upgrader');
    console.log('Upgraders: ' + upgraders.length);
    if (upgraders.length < 1) {
        var name = 'Upgrader' + Game.time;
        console.log('Spawning new upgrader: ' + name);
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], name,
            {memory: {role: 'upgrader'}});
    }
    
    // Spawnea nuevos builders si es necesario
    */

    memory.clear();


    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}