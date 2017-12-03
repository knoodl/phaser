var GetTilesWithin = require('./GetTilesWithin');

/**
 * Randomizes the indexes of a rectangular region of tiles (in tile coordinates) within the
 * specified layer. Each tile will recieve a new index. New indexes are drawn from the given
 * weightedIndexes array. An example weighted array:
 *
 * [
 *  { index: 6, weight: 4 },    // Probability of index 6 is 4 / 8
 *  { index: 7, weight: 2 },    // Probability of index 7 would be 2 / 8
 *  { index: 8, weight: 1.5 },  // Probability of index 8 would be 1.5 / 8
 *  { index: 26, weight: 0.5 }  // Probability of index 27 would be 0.5 / 8
 * ]
 *
 * The probability of any index being choose is (the index's weight) / (sum of all weights). This
 * method only modifies tile indexes and does not change collisioninformation.
 *
 * @param {integer} [tileX=0] - [description]
 * @param {integer} [tileY=0] - [description]
 * @param {integer} [width=max width based on tileX] - [description]
 * @param {integer} [height=max height based on tileY] - [description]
 * @param {object[]} [weightedIndexes] - An array of objects to randomly draw from during
 * randomization. They should be in the form: { index: 0, weight: 4 }.
 * @param {LayerData} layer - [description]
 */
var WeightedRandomize = function (tileX, tileY, width, height, weightedIndexes, layer)
{
    if (weightedIndexes === undefined) { return; }

    var i;
    var tiles = GetTilesWithin(tileX, tileY, width, height, null, layer);

    var weightTotal = 0;
    for (i = 0; i < weightedIndexes.length; i++)
    {
        weightTotal += weightedIndexes[i].weight;
    }

    if (weightTotal <= 0) { return; }

    for (i = 0; i < tiles.length; i++)
    {
        var rand = Math.random() * weightTotal;
        var sum = 0;
        var randomIndex = -1;
        for (var j = 0; j < weightedIndexes.length; j++)
        {
            sum += weightedIndexes[j].weight;
            if (rand <= sum)
            {
                randomIndex = weightedIndexes[j].index;
                break;
            }
        }

        tiles[i].index = randomIndex;
    }
};

module.exports = WeightedRandomize;
