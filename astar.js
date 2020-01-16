const canvas = document.getElementById("cvs");
const ctx = canvas.getContext("2d");

const width = 400;
const height = 400;
const cols = 120;
const rows = 120;
const res = ((width+height)/2)/((cols+rows)/2);

canvas.width = width;
canvas.height = height;

const grid = []

for (let i = 0; i < cols; i++){
    grid.push([]);
    for (let j = 0; j < rows; j++){
        grid[i].push(new Node(i, j));
    }
}


const start = grid[0][0];
start.wall = false;
const end = grid[cols - 1][rows - 1];
end.wall = false;

const openSet = [start];
const closedSet = []

let running = true;

for (let i = 0; i < grid.length; i++){
    for (let j = 0; j < grid[i].length; j++){
        grid[i][j].h = heuristic(grid[i][j], end);
        grid[i][j].addNeighbors(grid);
    }
}

function animate(time = 0){
    if (openSet.length > 0 && running){

        var current = findLowestF()

        if (current === end){
            console.log("DONE");
            running = false;
            console.log(time);
        }

        removeCurrent(openSet, current);
        closedSet.push(current);

        for (let i = 0; i < current.neighbors.length; i++){
            
            if (!closedSet.includes(current.neighbors[i]) && !current.neighbors[i].wall){
                let tempG = current.neighbors[i].g + heuristic(current.neighbors[i], current);

                let newPath = false;
                if (openSet.includes(current.neighbors[i])){
                    if (tempG < current.neighbors[i].g){
                        current.neighbors[i].g = tempG;
                        newPath = true
                    } 
                } else {
                    current.neighbors[i].g = tempG;
                    newPath = true
                    openSet.push(current.neighbors[i])
                }

                if (newPath){
                    current.neighbors[i].f = current.neighbors[i].g + current.neighbors[i].h;
                    current.neighbors[i].prev = current;
                }
            }
        }
    }

    for (let i = 0; i < grid.length; i++){
        for (let j = 0; j < grid[i].length; j++){
            grid[i][j].show(ctx, "white")

            if (openSet.includes(grid[i][j])){
                grid[i][j].show(ctx, "green")
            }

            
            if (closedSet.includes(grid[i][j])){
                grid[i][j].show(ctx, "red")
            }
        }
    }

    if (running){
        path = [];
        let temp = current;
        path.push(temp);
        while (temp.prev) {
            path.push(temp.prev);
            temp = temp.prev;
        }
    }

    for (let i = 0; i < path.length; i++){
        path[i].show(ctx, "blue");
    }

    requestAnimationFrame(animate)
}

animate();

function removeCurrent(arr, current){
    for (let i = arr.length - 1; i >= 0; i--){
        if (arr[i] == current){
            arr.splice(i, 1);
        }
    }
}

function heuristic(a, b){
    // return Math.abs(a.i*res - b.i*res) + Math.abs(a.j*res - b.j*res); //manhatten distance
    return Math.sqrt(Math.pow(a.i*res - b.i*res, 2) + Math.pow(a.j*res - b.j*res, 2))
}

function findLowestF(){
    let lowestF = 0;
    for (let i = 0; i < openSet.length; i++){
        if (openSet[i].f < openSet[lowestF].f){
            lowestF = i
        }
    }

    return openSet[lowestF];
}