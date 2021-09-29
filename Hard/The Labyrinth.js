/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

var inputs = readline().split(' ');
const R = parseInt(inputs[0]); // number of rows.
const C = parseInt(inputs[1]); // number of columns.
const A = parseInt(inputs[2]); // number of rounds between the time the alarm countdown is activated and the time the alarm goes off.

let StartX = -1;
let StartY = -1;

let GotToControlRoom = false;

// game loop
while (true) {

    var inputs = readline().split(' ');
    const KR = parseInt(inputs[0]); // row where Kirk is located.
    const KC = parseInt(inputs[1]); // column where Kirk is located.

    if(StartX == -1){
        StartX = KC;
        StartY = KR;
    }

    let Grid = Array(R);

    for (let i = 0; i < R; i++) {
        const ROW = readline(); // C of the characters in '#.TC?' (i.e. one line of the ASCII maze).
        Grid[i] = ROW.split('')
    }

    if(Grid[KR][KC] == 'C'){
        GotToControlRoom = true;
    }

    Grid[KR][KC] = 'H';

    //Show(Grid);

    if(GotToControlRoom == false){
        let Dir = WhereCanIgo(Grid, KR, KC);
        console.log(Dir);
    }
    else{
        let Dir = FindQuickestWayBack(Grid, KR, KC, StartX, StartY);
        console.log(Dir);
    }



    // Write an action using console.log()
    // To debug: console.error('Debug messages...');

    // Kirk's next move (UP DOWN LEFT or RIGHT).

}

function Show(G){

    console.error();
    console.error("Grid:");
    for(let i = 0; i < G.length; i++){
        let line = "";
        for(let j = 0; j < G[i].length; j++){
            line += G[i][j]
        }
        console.error(line);
    }
    console.error();

}

function WhereCanIgo(Grid, KR, KC){


    Grid[KR][KC] = '.';

    let LocControlRoom = ImSeeingControlRoom(Grid);

    if(LocControlRoom.i == -1 || ThereAreSteelQuestionsMarksThatIcanReachTo(Grid, KR, KC)){
        console.error("BFS");
        return BFS(Grid, KR, KC);
    }
    else{
        console.error("ControlRoom");
        let Dir = FindQuickestWayBack(Grid, KR, KC, LocControlRoom.j, LocControlRoom.i);
        if(Dir == "NONE"){
            console.error("Don't know the way to control room so using BFS");
            return BFS(Grid, KR, KC);
        }
        return Dir;
    }
    

}

function BFS(Grid, KR, KC){

    let Queue = [{row: KR, col: KC}];

    let Visited = [{row: KR, col: KC}];

    while(Queue.length != 0){

        let Node = Queue.splice(0,1)[0];

        if(HowMuchquestionsMarksDiscover(Grid, Node.row, Node.col) > 0){
            return FindQuickestWayBack(Grid, KR, KC, Node.col, Node.row);
        }

        let Neighbors = GetNeighbors(Node, Grid);

        for(let i = 0; i < Neighbors.length; i++){
            if(NeighborNotInOpenSet(Neighbors[i], Visited)){
                Visited.push(Neighbors[i]);
                Queue.push(Neighbors[i])
            }
        }
    }

}

function ThereAreSteelQuestionsMarksThatIcanReachTo(Grid, KR, KC){

    let Queue = [{row: KR, col: KC}];

    let Visited = [{row: KR, col: KC}];

    while(Queue.length != 0){

        let Node = Queue.splice(0,1)[0];

        if(HowMuchquestionsMarksDiscover(Grid, Node.row, Node.col) > 0){
            return true;
        }

        let Neighbors = GetNeighbors(Node, Grid);

        for(let i = 0; i < Neighbors.length; i++){
            if(NeighborNotInOpenSet(Neighbors[i], Visited) && Grid[Neighbors[i].row][Neighbors[i].col] != 'C'){
                Visited.push(Neighbors[i]);
                Queue.push(Neighbors[i])
            }
        }
    }

    return false;

}

function HowMuchquestionsMarksDiscover(Grid, KR, KC){

    let mone = 0;

    for(let i = KR - 2; i <= KR + 2; i++){
        if(i < R && i > -1){
            for(let j = KC - 2; j <= KC + 2; j++){
                if(j < C && j > -1){
                    if(Grid[i][j] == '?'){
                        mone++;
                    }
                }
            }
        }
    }

    return mone;

}

function ImSeeingControlRoom(Grid){

    for(let i = 0; i < R; i++){
        for(let j = 0; j < C; j++){
            if(Grid[i][j] == 'C'){
                return {i, j};
            }
        }
    }

     return {i: -1, j: -1};

}

function FindQuickestWayBack(Grid, KR, KC, EndX, EndY){

    //console.error("EndX: "+EndX)
    //console.error("EndY: "+EndY)

    let fScore = h(KC, KR, EndX, EndY);

    let OpenSet = [{row: KR, col: KC, gScore: 0, fScore, cameFrom: undefined}];

    let ClosedSet = [];

    while(OpenSet.length != 0){

        //console.error(OpenSet);

        let CurrNode = OpenSet.splice(FindLowestfScoreNode(OpenSet),1)[0];
        ClosedSet.push(CurrNode);

        
        if(CurrNode.row == EndY && CurrNode.col == EndX){
            return reconstruct_path(CurrNode);
        }

        let Neighbors = GetNeighbors(CurrNode, Grid);

        for(let i = 0 ; i < Neighbors.length; i++){

            if(InClosedSet(Neighbors[i], ClosedSet)){
                continue;
            }

            let Neighbor = Neighbors[i];

            let tentative_gScore = CurrNode.gScore + 1;

            if(tentative_gScore < Neighbor.gScore){
                Neighbor.cameFrom = CurrNode;

                Neighbor.gScore = tentative_gScore
                Neighbor.fScore = Neighbor.gScore + h(Neighbor.col, Neighbor.row, EndX, EndY);

                if(NeighborNotInOpenSet(Neighbor, OpenSet))
                    OpenSet.push(Neighbor)
            }

        }

    }

    return "NONE";
}

function reconstruct_path(CurrNode){
    /*total_path := {CurrNode}
    while current in cameFrom.Keys:
        current := cameFrom[current]
        total_path.prepend(current)
    return total_path*/

    let PrevNode = CurrNode.cameFrom;

    while(CurrNode.cameFrom != undefined){
        //console.error("CurrNode")
        //console.error(CurrNode)
        PrevNode = CurrNode;
        CurrNode = CurrNode.cameFrom;
    }

    /*console.error()
    console.error()
    console.error("CurrNode")
    console.error(CurrNode)
    console.error("PrevNode")
    console.error(PrevNode)*/

    //RIGHT
    if(PrevNode.col - CurrNode.col == 1){
        return "RIGHT";
    }
    //LEFT
    else if(CurrNode.col - PrevNode.col == 1){
        return "LEFT";
    }
    //UP
    else if(CurrNode.row - PrevNode.row == 1){
        return "UP";
    }
    //DOWN
    else if(PrevNode.row - CurrNode.row == 1){
        return "DOWN";
    }

}

function h(x1, y1, x2, y2){
    return Math.sqrt(Math.pow(x1-x2,2) + Math.pow(y1-y2,2));
}

function FindLowestfScoreNode(OpenSet){

    let LowestfScore = 1000000;
    let IndexNodeInOpenSet = -1;

    for(let i = 0; i < OpenSet.length; i++){
        if(LowestfScore > OpenSet[i].fScore){
            LowestfScore = OpenSet[i].fScore;
            IndexNodeInOpenSet = i;
        }
    }

    return IndexNodeInOpenSet;

}

function InClosedSet(Neighbor, ClosedSet){

    for(let i = 0; i < ClosedSet.length; i++)
        if(ClosedSet[i].col == Neighbor.col && ClosedSet[i].row == Neighbor.row)
            return true;
    
    return false;

}

function GetNeighbors(Node, Grid){

    let Neighbors = [];

    //UP
    if(Node.row - 1 > -1 && Grid[Node.row - 1][Node.col] != '?' && Grid[Node.row - 1][Node.col] != '#'){
        Neighbors.push({row: Node.row - 1, col: Node.col, gScore: Infinity, fScore: Infinity, cameFrom: undefined});
    }
    //DOWN
    if(Node.row + 1 < R && Grid[Node.row + 1][Node.col] != '?' && Grid[Node.row + 1][Node.col] != '#'){
        Neighbors.push({row: Node.row + 1, col: Node.col, gScore: Infinity, fScore: Infinity, cameFrom: undefined});
    }
    //RIGHT
    if(Node.col + 1 < C && Grid[Node.row][Node.col + 1] != '?' && Grid[Node.row][Node.col + 1] != '#'){
        Neighbors.push({row: Node.row, col: Node.col + 1, gScore: Infinity, fScore: Infinity, cameFrom: undefined});
    }
    //LEFT
    if(Node.col - 1 > -1 && Grid[Node.row][Node.col - 1] != '?' && Grid[Node.row][Node.col - 1] != '#'){
        Neighbors.push({row: Node.row, col: Node.col - 1, gScore: Infinity, fScore: Infinity, cameFrom: undefined});
    }

    return Neighbors;
}

function NeighborNotInOpenSet(Neighbor, OpenSet){

    for(let i = 0; i < OpenSet.length; i++)
        if(OpenSet[i].col == Neighbor.col && OpenSet[i].row == Neighbor.row)
            return false;
    
    return true;
}

