var player = { score: 1, name: "Jeff" }

var newPlayer = Object.assign({}, player, { score: 2 })

// Now player is unchanged,
// but newPlayer is {score: 2, name: 'Jeff'}

// Or if you are using object spread syntax proposal:
// var newPlayer = {...player, score: 2};
