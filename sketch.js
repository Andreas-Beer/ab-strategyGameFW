// ----- Preparing -----

// logical game structure.
const config = {
    buildingsBuildParallel: 2,
    buildings: [
        {
            id: 4,
            name: loc.building('kaserne').name,
            description: loc.building('kaserne').description,
            requirements: [
                { type: 'playerLevel', level: 2 },
                { type: 'building', id: 13, level: 5 }
            ],
            price: [
                { ressourceId: 2, ammount: 300 },
                { ressourceId: 1, ammount: 100 },
            ],
            effects: []
        }
    ],
    units: [
        {
            id: 2,
            name: loc.unit('mercenary').name
        }
    ],
    items: [ ],

};

// previous saved data
const data = {
    player: {
        name: 'Bob',
        level: 4,
        avatarId: 6,
        groupId: 5397
    },
    towns: [
        {
            name: 'Funky Town',
            location: [ 1682, 2864 ],
            units: [],
            buildings: [
                {
                    id: 15,
                    buildingId: 4,
                    level: 3,
                    location: 25,
                    content: { unitsInCreation: [] },
                    updateProgress: 37,
                },
                {
                    id: 8,
                    buildingId: 6,
                    location: 11,
                    constructionProgress: 60
                }
            ]
        }
    ]
};

// create a new game
const game = new Game(config, data)
    .on('error', onGameError);


// ----- Game Config -----
const buildingTypeId = 4;
const unitBuilding01 = game
    .createBuilding(buildingTypeId)
    .on('finish', onUnitBuildingFinish)
    .on('progress', onUnitBuildingProgress);

const unitTypeId = 2;
game.createUnit(unitTypeId, unitBuilding01);


