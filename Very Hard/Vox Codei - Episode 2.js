/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

var inputs = readline().split(' ');
const width = parseInt(inputs[0]); // width of the firewall grid
const height = parseInt(inputs[1]); // height of the firewall grid

let NumberBombs;
let NumberNodes = 0;

let Start = true;

let Bombs = [];

let Grids = [];
let CurrGridIndex = 0;

let DirectionsGrid = [];

let States = [];

let BestGrade = 0;

let Action;

let Time;

// game loop
while (true) {
    var inputs = readline().split(' ');
    Time = Date.now();
    //const rounds = +inputs[0]; // number of rounds left before the end of the game
    NumberBombs = +inputs[1]; // number of bombs left
    let Grid = [];
    for (let i = 0; i < height; i++) {
        const mapRow = readline(); // one line of the firewall grid
        if(CurrGridIndex <= 5){
            if(Start){
                Grid[i] = [];
                for(let j = 0; j < width; j++){
                    if(mapRow[j] == '@')
                        NumberNodes++;
                    Grid[i][j] = mapRow[j];
                }
            }
            else{
                Grid[i] = mapRow.split('');
            }
        }
    }

    Start = false;

    Action = "WAIT";


    if(CurrGridIndex <= 5){
        Grids[CurrGridIndex] = Grid;
    }

    if(CurrGridIndex == 5){
        FindDirections(Grids);
    }

    if(CurrGridIndex >= 5){

        let B = [];

        for(let i = 0; i < Bombs.length; i++){
            B[i] = Bombs[i];
        }

        States = [];
        BestGrade = 100000;
        
        if(NumberBombs != 0 && NumberNodes != 0)
            DFS(DirectionsGrid, B, 10, NumberNodes, NumberBombs, undefined);

        let DirectionsGridAndBombs = SimulateGame(DirectionsGrid, Bombs);
        DirectionsGrid = DirectionsGridAndBombs.grid;
        Bombs = DirectionsGridAndBombs.bombs;
        
    }

    CurrGridIndex++;

    if(Action != "WAIT"){
        NumberNodes -= Action.Nodes;
        Bombs[Action.i * width + Action.j] = 2;
        Action = "" + Action.j + " " + Action.i;
    }

    console.log(Action);
    console.error("Time: "+ (Date.now() - Time))
}

function DFS(CurrGrid, bombs, depth, numberNodes, numberBombs, action){

    /*console.error()
    console.error("depth: "+depth)
    console.error("numberNodes: "+numberNodes)
    console.error("bombs: ")
    console.error(bombs)
    console.error("action: ")
    console.error(action)
    console.error("numberBombs: "+numberBombs)
    console.error()
    console.error()
    Show(CurrGrid, bombs);*/

    if(depth == 0){

        if(numberNodes < BestGrade){
            BestGrade = numberNodes;
            Action = action;
        }

        return false;
    }


    if(Date.now() - Time >= 150) return false;

    /*if(SameState(CurrGrid, bombs, depth, numberBombs)){
        //console.error("Stop!!!!")
        return false;
    }

    States.push({grid: CurrGrid, B: bombs, D: depth, NumberB: numberBombs});*/

    let GridAfterThreeTurnsAndBombs = SimulateGame(CurrGrid, bombs);
    let GridAfterThreeTurns = GridAfterThreeTurnsAndBombs.grid;
    let BombsAfterThreeTurns = GridAfterThreeTurnsAndBombs.bombs;


    for(let i = 1; i <= 2; i++){
        GridAfterThreeTurnsAndBombs = SimulateGame(GridAfterThreeTurns, BombsAfterThreeTurns);
        GridAfterThreeTurns = GridAfterThreeTurnsAndBombs.grid;
        BombsAfterThreeTurns = GridAfterThreeTurnsAndBombs.bombs;
    }


    let BestBomb;

    let Max = 0;

    for(let i = 0; i < height; i++){
        for(let j = 0; j < width; j++){
            //if I can put bomb there
            if(CurrGrid[i][j] == '.' 
            && ColideWithOtherBombs(CurrGrid, i, j, bombs) == false){
                let NumberOfNodesDestroyedAndValue = GetNodesDestroyed(i, j, GridAfterThreeTurns);
                let Value = NumberOfNodesDestroyedAndValue[1];
            
                if(Max < Value){
                    Max = Value;
                    BestBomb = {Value, i, j, Nodes: NumberOfNodesDestroyedAndValue[0]};
                }
            }
        }
    }

    if(BestBomb.Nodes == numberNodes){
        BestGrade = 0;
        //console.error("YEAH!!!!!")
        if(action == undefined)
            Action = BestBomb;
        else
            Action = action;

        return true;
    }
    else if(numberBombs != 1){
        bombs[BestBomb.i * width + BestBomb.j] = 3;
        let GridAfterOneTurnAndBombs = SimulateGame(CurrGrid, bombs);
        let GridAfterOneTurn = GridAfterOneTurnAndBombs.grid;
        let BombsAfterOneTurn = GridAfterOneTurnAndBombs.bombs;

        

        if(action == undefined){
            let bool = DFS(GridAfterOneTurn, BombsAfterOneTurn, depth - 1, numberNodes - BestBomb.Nodes, numberBombs - 1, BestBomb);
            if(bool){
                Action = BestBomb;
                return;
            }
        }
        else{
            let bool = DFS(GridAfterOneTurn, BombsAfterOneTurn, depth - 1, numberNodes - BestBomb.Nodes, numberBombs - 1, action);
            if(bool){
                return true;
            }
        }

        bombs[BestBomb.i * width + BestBomb.j] = undefined;
    }

    GridAfterOneTurnAndBombs = SimulateGame(CurrGrid, bombs);
    GridAfterOneTurn = GridAfterOneTurnAndBombs.grid;
    BombsAfterOneTurn = GridAfterOneTurnAndBombs.bombs;

    if(action == undefined){
        let bool = DFS(GridAfterOneTurn, BombsAfterOneTurn, depth - 1, numberNodes, numberBombs, "WAIT");
        if(bool){
            Action = "WAIT";
            return;
        }
    }
    else{
        let bool = DFS(GridAfterOneTurn, BombsAfterOneTurn, depth - 1, numberNodes, numberBombs, action);
        if(bool){
            return true;
        }
    }

    return false;
}


/*function SameState(CurrGrid, bombs, depth, numberBombs){

    for(let i = 0; i < States.length; i++){

        let b = States[i].B;

        if(States[i].D < depth || States[i].NumberB < numberBombs || 
        b.length != bombs.length){
            continue;
        }

        let con = false;

        //bombs
        for(let k = 0; k < bombs.length; k++){
            let Skip = false;
            for(let j = 0; j < bombs[k].length; j++){
                if(b[k][j] != bombs[k][j]){
                    Skip = true;
                    break;
                }
            }
            if(Skip){
                con = true;
                break;
            }
        }

        if(con) continue;

        let Grid = States[i].grid;

        //grid
        for(let y = 0; y < height; y++){
            let Skip = false;
            for(let x = 0; x < width; x++){
                if(typeof Grid[y][x] == "object"){

                    let skip = false;

                    for(let k = 0; k < Grid[y][x].length; k++){
                        if(Grid[y][x][k] != CurrGrid[y][x][k]){
                            skip = true;
                            break;
                        }
                    }

                    if(skip){
                        Skip = true;
                        break;
                    }
                }
                else{
                    if(Grid[y][x] != CurrGrid[y][x]){
                        Skip = true;
                        break;
                    }
                }
            }

            if(Skip){
                con = true;
                break;
            }
        }

        if(con) continue;

        return true;
    }

    return false;

}*/

function Show(Grid, bombs){

    console.error();
    for(let i = 0; i < height; i++){
        let line = "";
        for(let j = 0; j < width; j++){
            if(typeof Grid[i][j] == "object"){
                line += Grid[i][j];
            }
            else{
                if(InSet(bombs, i, j))
                    line += 'B';
                else
                    line += Grid[i][j];
            }
        }
        console.error(line);
    }
    console.error();

}


function ColideWithOtherBombs(CurrGrid, I, J, bombs){

    //Up
    for(let i = I; i >= I - 3; i--){
        if(i == -1 || CurrGrid[i][J] == '#'){
            break;
        }
        else if(InSet(bombs, i, J)){
            return true;
        }
    }

    //Down
    for(let i = I + 1; i <= I + 3; i++){
        if(i == height || CurrGrid[i][J] == '#'){
            break;
        }
        else if(InSet(bombs, i, J)){
            return true;
        }
    }

    //Right
    for(let j = J + 1; j <= J + 3; j++){
        if(j == width || CurrGrid[I][j] == '#'){
            break;
        }
        else if(InSet(bombs, I, j)){
            return true;
        }
    }

    //Left
    for(let j = J - 1; j >= J - 3; j--){
        if(j == -1 || CurrGrid[I][j] == '#'){
            break;
        }
        else if(InSet(bombs, I, j)){
            return true;
        }
    }

    return false;

}

function InSet(set, i, j){
    return set[i * width + j] != undefined;
}

function GetNodesDestroyed(I, J, GridAfterThreeTurns){

    let Mone = 0;

    let value = 0;

    //Up
    for(let i = I; i >= I - 3; i--){
        if(i == -1 || GridAfterThreeTurns[i][J] == '#'){
            break;
        }
        else if(typeof GridAfterThreeTurns[i][J] == "object"){
            Mone += GridAfterThreeTurns[i][J].length;
            value += GridAfterThreeTurns[i][J].length * 2.1;
        }
        else if(GridAfterThreeTurns[i][J] == '@'){
            Mone++;
            value++;
        }
    }

    //Down
    for(let i = I + 1; i <= I + 3; i++){
        if(i == height || GridAfterThreeTurns[i][J] == '#'){
            break;
        }
        else if(typeof GridAfterThreeTurns[i][J] == "object"){
            Mone += GridAfterThreeTurns[i][J].length;
            value += GridAfterThreeTurns[i][J].length * 2.1;
        }
        else if(GridAfterThreeTurns[i][J] == '@'){
            Mone++;
            value++;
        }
    }

    //Right
    for(let j = J + 1; j <= J + 3; j++){
        if(j == width || GridAfterThreeTurns[I][j] == '#'){
            break;
        }
        else if(typeof GridAfterThreeTurns[I][j] == "object"){
            Mone += GridAfterThreeTurns[I][j].length;
            value += GridAfterThreeTurns[I][j].length * 2.1;
        }
        else if(GridAfterThreeTurns[I][j] == '@'){
            Mone++;
            value++;
        }
    }

    //Left
    for(let j = J - 1; j >= J - 3; j--){
        if(j == -1 || GridAfterThreeTurns[I][j] == '#'){
            break;
        }
        else if(typeof GridAfterThreeTurns[I][j] == "object"){
            Mone += GridAfterThreeTurns[I][j].length;
            value += GridAfterThreeTurns[I][j].length * 2.1;
        }
        else if(GridAfterThreeTurns[I][j] == '@'){
            Mone++;
            value++;
        }
    }

    return [Mone, value];
}


function SimulateGame(Grid, bombs){

    let NewGrid = [];
    
    //Fill New Grid
    for(let i = 0; i < height; i++){
        NewGrid[i] = [];
    }

    for(let i = 0; i < height; i++){
        for(let j = 0; j < width; j++){
            if(typeof Grid[i][j] == "object"){
                if(typeof NewGrid[i][j] != "object")
                    NewGrid[i][j] = '.';

                for(let k = 0; k < Grid[i][j].length; k++){
                    let Dir = Grid[i][j][k];

                    if(Dir == "U"){
                        if(i - 1 == -1 || Grid[i - 1][j] == '#'){
                            if(typeof NewGrid[i + 1][j] != "object")
                                NewGrid[i + 1][j] = ["D"];
                            else
                                NewGrid[i + 1][j].push("D");
                        }
                        else{
                            if(typeof NewGrid[i - 1][j] != "object")
                                NewGrid[i - 1][j] = ["U"];
                            else
                                NewGrid[i - 1][j].push("U");
                        }
                    }
                    else if(Dir == "D"){
                        if(i + 1 == height || Grid[i + 1][j] == '#'){
                            if(typeof NewGrid[i - 1][j] != "object")
                                NewGrid[i - 1][j] = ["U"];
                            else
                                NewGrid[i - 1][j].push("U");
                        }
                        else{
                            if(typeof NewGrid[i + 1][j] != "object")
                                NewGrid[i + 1][j] = ["D"];
                            else
                                NewGrid[i + 1][j].push("D");
                        }
                    }
                    else if(Dir == "L"){
                        if(j - 1 == -1 || Grid[i][j - 1] == '#'){
                            if(typeof NewGrid[i][j + 1] != "object")
                                NewGrid[i][j + 1] = ["R"];
                            else
                                NewGrid[i][j + 1].push("R");
                        }
                        else{
                            if(typeof NewGrid[i][j - 1] != "object")
                                NewGrid[i][j - 1] = ["L"];
                            else
                                NewGrid[i][j - 1].push("L");
                        }
                    }
                    else if(Dir == "R"){
                        if(j + 1 == width || Grid[i][j + 1] == '#'){
                            if(typeof NewGrid[i][j - 1] != "object")
                                NewGrid[i][j - 1] = ["L"];
                            else
                                NewGrid[i][j - 1].push("L");
                        }
                        else{
                            if(typeof NewGrid[i][j + 1] != "object")
                                NewGrid[i][j + 1] = ["R"];
                            else
                                NewGrid[i][j + 1].push("R");

                        }
                    }
                }
            }
            else{
                if(typeof NewGrid[i][j] != "object")
                    NewGrid[i][j] = Grid[i][j];
            }
        }
    }

    let b = [];

    for(let i = 0; i < bombs.length; i++){
        b[i] = bombs[i];
    }


    for(let k = b.length - 1; k > -1; k--){
        if(b[k] == undefined) continue;
        b[k]--;

        if(b[k] == 0){
            //Bomb Explode

            let J = k % width;
            let I = (k - J) / width;

            NewGrid[I][J] = '.';

            //Up
            for(let i = I; i >= I - 3; i--){
                if(i == -1 || NewGrid[i][J] == '#'){
                    break;
                }
                else if(typeof NewGrid[i][J] == "object" || NewGrid[i][J] == '@'){
                    NewGrid[i][J] = '.';
                }
            }

            //Down
            for(let i = I; i <= I + 3; i++){
                if(i == height || NewGrid[i][J] == '#'){
                    break;
                }
                else if(typeof NewGrid[i][J] == "object" || NewGrid[i][J] == '@'){
                    NewGrid[i][J] = '.';
                }
            }

            //Right
            for(let j = J; j <= J + 3; j++){
                if(j == width || NewGrid[I][j] == '#'){
                    break;
                }
                else if(typeof NewGrid[I][j] == "object" || NewGrid[I][j] == '@'){
                    NewGrid[I][j] = '.';
                }
            }

            //Left
            for(let j = J; j >= J - 3; j--){
                if(j == -1 || NewGrid[I][j] == '#'){
                    break;
                }
                else if(typeof NewGrid[I][j] == "object" || NewGrid[I][j] == '@'){
                    NewGrid[I][j] = '.';
                }
            }

            b[k] = undefined;
        }
    }

    return {grid: NewGrid, bombs: b};
}



function FindDirections(Grids){

    let FirstGrid = Grids[0];
    let SecondGrid = Grids[1];
    let ThirdGrid = Grids[2];
    let FourthGrid = Grids[3];
    let FifthGrid = Grids[4];
    let SixthGrid = Grids[5];

    //Fill DirectionsGrid with arrays
    for(let i = 0; i < height; i++){
        DirectionsGrid[i] = [];
        for(let j = 0; j < width; j++){
            if(SixthGrid[i][j] != '@'){
                DirectionsGrid[i][j] = SixthGrid[i][j];
            }
        }
    }


    for(let i = 0; i < height; i++){
        for(let j = 0; j < width; j++){
            //if there is node
            if(FirstGrid[i][j] == '@'){
                let Directions = ["Left", "Right","Up","Down"];

                //While I don't know which direction the node is moving
                while(true){

                    //Take the first direction in Directions
                    let Dir = Directions.shift();

                    if(Dir == undefined){
                        DirectionsGrid[i][j] = '@';
                        break;
                    }


                    //Get the next place the node should be in according to this dir
                    let NextPlace = GetNextPlace(FirstGrid, Dir, i, j);

                    Dir = NextPlace.Dir;

                    if(NextPlace.i < 0 || NextPlace.i >= height ||
                    NextPlace.j < 0 || NextPlace.j >= width){
                        DirectionsGrid[i][j] = '@';
                        break;
                    }

                    //If the node is not there so the dir is worng - SecondGrid
                    if(SecondGrid[NextPlace.i][NextPlace.j] != '@'){
                        continue;
                    }


                    NextPlace = GetNextPlace(SecondGrid, Dir, NextPlace.i, NextPlace.j);

                    Dir = NextPlace.Dir;

                    if(NextPlace.i < 0 || NextPlace.i >= height ||
                    NextPlace.j < 0 || NextPlace.j >= width){
                        DirectionsGrid[i][j] = '@';
                        break;
                    }

                    //If the node is not there so the dir is worng - ThirdGrid
                    if(ThirdGrid[NextPlace.i][NextPlace.j] != '@'){
                        continue;
                    }


                    NextPlace = GetNextPlace(ThirdGrid, Dir, NextPlace.i, NextPlace.j);

                    Dir = NextPlace.Dir;

                    if(NextPlace.i < 0 || NextPlace.i >= height ||
                    NextPlace.j < 0 || NextPlace.j >= width){
                        DirectionsGrid[i][j] = '@';
                        break;
                    }

                    //If the node is not there so the dir is worng - FourthGrid
                    if(FourthGrid[NextPlace.i][NextPlace.j] != '@'){
                        continue;
                    }

                    NextPlace = GetNextPlace(FourthGrid, Dir, NextPlace.i, NextPlace.j);

                    Dir = NextPlace.Dir;

                    if(NextPlace.i < 0 || NextPlace.i >= height ||
                    NextPlace.j < 0 || NextPlace.j >= width){
                        DirectionsGrid[i][j] = '@';
                        break;
                    }

                    if(FifthGrid[NextPlace.i][NextPlace.j] != '@'){
                        continue;
                    }

                    NextPlace = GetNextPlace(FifthGrid, Dir, NextPlace.i, NextPlace.j);

                    Dir = NextPlace.Dir;

                    if(NextPlace.i < 0 || NextPlace.i >= height ||
                    NextPlace.j < 0 || NextPlace.j >= width){
                        DirectionsGrid[i][j] = '@';
                        break;
                    }

                    if(SixthGrid[NextPlace.i][NextPlace.j] != '@'){
                        continue;
                    }
                    else{
                        //Put the dir in DirectionsGrid
                        if(Dir == "Up") Dir = "U";
                        else if(Dir == "Down") Dir = "D";
                        else if(Dir == "Left") Dir = "L";
                        else Dir = "R";

                        if(typeof DirectionsGrid[NextPlace.i][NextPlace.j] == "object"){
                            DirectionsGrid[NextPlace.i][NextPlace.j].push(Dir);
                        }
                        else{
                            DirectionsGrid[NextPlace.i][NextPlace.j] = [Dir];
                        }

                        break;
                    }


                }
            }
        }
    }

}

function GetNextPlace(FirstGrid, Dir, i, j){

    if(Dir == "Up"){
        if(i - 1 == -1 || FirstGrid[i - 1][j] == '#')
            return {i: i + 1, j, Dir: "Down"};
        else
            return {i: i - 1, j, Dir: "Up"};
    }
    else if(Dir == "Down"){
        if(i + 1 == height || FirstGrid[i + 1][j] == '#')
            return {i: i - 1, j, Dir: "Up"};
        else
            return {i: i + 1, j, Dir: "Down"};
    }
    else if(Dir == "Left"){
        if(j - 1 == -1 || FirstGrid[i][j - 1] == '#')
            return {i, j: j + 1, Dir: "Right"};
        else
            return {i, j: j - 1, Dir: "Left"};
    }
    else if(Dir == "Right"){
        if(j + 1 == width || FirstGrid[i][j + 1] == '#')
            return {i, j: j - 1, Dir: "Left"};
        else
            return {i, j: j + 1, Dir: "Right"};
    }

}
