let grid = [];
let newGrid = [];

let cell = {
  width: 0,
  height: 0,
};

let waypoints = [
  {x: 156.40625, y: 301.7777777777778}, //1
  {x: 156.40625, y: 129.33333333333334}, //2
  {x: 406.65625, y: 129.33333333333334}, //3
  {x: 406.65625, y: 474.2222222222223}, //4
  {x: 281.53125, y: 474.2222222222223}, //5
  {x: 281.53125, y: 646.6666666666667}, //6
  {x: 782.03125, y: 646.6666666666667}, //7
  {x: 782.03125, y: 388}, //8
  {x: 656.90625, y: 388}, //9
  {x: 656.90625, y: 215.55555555555557}, //10
  {x: 969.71875, y: 215.55555555555557}, //11
];

let map = {
  width: 16,
  height: 9,
  path: false,
  easy: "easy map",
};

function cellCenter(x, y) {
  let middle = {
    x: 0,
    y: 0,
  };
  middle.x = x * cell.width + cell.width/2;
  middle.y = y * cell.height + cell.height/2;
  return middle;
}

function setupWaypoints() {
  waypoints[0].x = cellCenter(2, 3).x;
  waypoints[0].y = cellCenter(2, 3).y;

  waypoints[1].x = cellCenter(2, 1).x;
  waypoints[1].y = cellCenter(2, 1).y;

  waypoints[2].x = cellCenter(6, 1).x;
  waypoints[2].y = cellCenter(6, 1).y;

  waypoints[3].x = cellCenter(6, 5).x;
  waypoints[3].y = cellCenter(6, 5).y;

  waypoints[4].x = cellCenter(4, 5).x;
  waypoints[4].y = cellCenter(4, 5).y;

  waypoints[5].x = cellCenter(4, 7).x;
  waypoints[5].y = cellCenter(4, 7).y;

  waypoints[6].x = cellCenter(12, 7).x;
  waypoints[6].y = cellCenter(12, 7).y;

  waypoints[7].x = cellCenter(12, 4).x;
  waypoints[7].y = cellCenter(12, 4).y;

  waypoints[8].x = cellCenter(10, 4).x;
  waypoints[8].y = cellCenter(10, 4).y;

  waypoints[9].x = cellCenter(10, 2).x;
  waypoints[9].y = cellCenter(10, 2).y;

  waypoints[10].x = cellCenter(15, 2).x;
  waypoints[10].y = cellCenter(15, 2).y;
}

//the map, used to easily distinguish path cell from non path cell
class Cells {
  constructor(x, y, width, height, placeable) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.canPlace = placeable;
  }
}