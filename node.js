class Node{
    constructor(i, j){
        this.i = i;
        this.j = j;
        this.h = 0;
        this.g = 0;
        this.f = 0;
        this.prev = undefined;
        this.neighbors = [];
        this.wall = Math.random() < 0.15? true : false;
    }

    show(ctx, col){
        if (this.wall){
            ctx.fillStyle = "black";
            ctx.fillRect(this.i*res, this.j*res, res, res);
        } else {
            ctx.fillStyle = col;
            ctx.fillRect(this.i*res, this.j*res, res, res);
        }
    }

    addNeighbors(grid) {
        if (this.i < cols - 1) {
          this.neighbors.push(grid[this.i + 1][this.j]);
        }
        if (this.i > 0) {
          this.neighbors.push(grid[this.i - 1][this.j]);
        }
        if (this.j < rows - 1) {
          this.neighbors.push(grid[this.i][this.j + 1]);
        }
        if (this.j > 0) {
          this.neighbors.push(grid[this.i][this.j - 1]);
        }
        // if (i > 0 && j > 0) {
        //   this.neighbors.push(grid[i - 1][j - 1]);
        // }
        // if (i < cols - 1 && j > 0) {
        //   this.neighbors.push(grid[i + 1][j - 1]);
        // }
        // if (i > 0 && j < rows - 1) {
        //   this.neighbors.push(grid[i - 1][j + 1]);
        // }
        // if (i < cols - 1 && j < rows - 1) {
        //   this.neighbors.push(grid[i + 1][j + 1]);
        // }
      };
}