
var inputs = readline().split(' ');
const TX = parseInt(inputs[0]);
const TY = parseInt(inputs[1]);

let Tx = TX
let Ty = TY

let width = 40;
let height = 18;

let H;
let N;

// game loop
while (true) {
    let map = [];
    for(let i = 0; i < height; i++){
        map[i] = Array(width).fill('.');
    }

    map[Ty][Tx] = 'T';
    var inputs = readline().split(' ');
    H = parseInt(inputs[0]); // the remaining number of hammer strikes.
    N = parseInt(inputs[1]); // the number of giants which are still present on the map.
    let Monsters = [];
    for (let i = 0; i < N; i++) {
        var inputs = readline().split(' ');
        const X = parseInt(inputs[0]);
        const Y = parseInt(inputs[1]);
        Monsters.push({x: X, y: Y});
        map[Y][X] = 'M';
    }



    let StrikeOrMove = Solve(map, Monsters);

    // Write an action using console.log()
    // To debug: console.error('Debug messages...');

    // The movement or action to be carried out: WAIT STRIKE N NE E SE S SW W or N

    if(StrikeOrMove == "N"){
        Ty--; 
    }
    else if(StrikeOrMove == "S"){
        Ty++; 
    }
    else if(StrikeOrMove == "W"){
        Tx--; 
    }
    else if(StrikeOrMove == "E"){
        Tx++; 
    }
    else if(StrikeOrMove == "NW"){
        Ty--; 
        Tx--; 
    }
    else if(StrikeOrMove == "NE"){
        Ty--; 
        Tx++; 
    }
    else if(StrikeOrMove == "SW"){
        Ty++; 
        Tx--; 
    }
    else if(StrikeOrMove == "SE"){
        Ty++; 
        Tx++; 
    }

    console.log(StrikeOrMove);

}

function Solve(map, Monsters){

    let StrikesMap = [];

    let StartingNode;

    for(let i = 0; i < map.length; i++){
        let arr = [];
        for(let j = 0; j < map[i].length; j++){
            if(map[i][j] == 'T'){
                StartingNode = {x: j, y: i};
            }
            arr.push(map[i][j]);
        }
        StrikesMap[i] = arr;
    }

    let Queue = [StartingNode];

    let Visited = [];
    Visited[StartingNode.y * width + StartingNode.x] = 1;

    while(Queue.length != 0){

        let CurrNode = Queue.shift();

        StrikesMap[CurrNode.y][CurrNode.x] = HowMuchMonstersKill(map, StartingNode, Monsters, CurrNode);

        if(StrikesMap[CurrNode.y][CurrNode.x] == -1){
            continue;
        }

        let Neighbors = GetNeighbors(map, CurrNode);

        for(let i = 0; i < Neighbors.length; i++){
            let Neighbor = Neighbors[i];
            if(Visited[Neighbor.y * width + Neighbor.x] == undefined){
                Queue.push(Neighbor);
                Visited[Neighbor.y * width + Neighbor.x] = 1;
            }
        }
    }

    let MaxMonstersStrike = 0;
    let Location = {x: -1, y: -1};

    for(let i = 0; i < StrikesMap.length; i++){
        for(let j = 0; j < StrikesMap[i].length; j++){
            let num = +StrikesMap[i][j];

            if(isNaN(num) || num == -1)
                continue;

            if(num > MaxMonstersStrike){
                if(H > 1){
                    MaxMonstersStrike = num;
                    Location = {x: j, y: i};
                }
                else if(H == 1 && num == N){
                    MaxMonstersStrike = num;
                    Location = {x: j, y: i};
                }
            }

            if(H == 1 && MaxMonstersStrike != N){
                let H1 = h(Location.x,Location.y, StartingNode.x,StartingNode.y);
                let H2 = h(j,i, StartingNode.x,StartingNode.y);
                if(Location.x == -1 || H1 < H2){
                    MaxMonstersStrike = num;
                    Location = {x: j, y: i};
                }
            }

        }
    }

        
    if(Location.x == StartingNode.x && Location.y == StartingNode.y && EatMeNextTurn(Location, StrikesMap)){
        return "STRIKE";
    }
    else if(Location.x == StartingNode.x && Location.y == StartingNode.y){
        return "WAIT";
    }
    //Down - Right
    else if(Location.x > StartingNode.x && Location.y > StartingNode.y){
        return "SE";
    }
    //Down - Left
    else if(Location.x < StartingNode.x && Location.y > StartingNode.y){
        return "SW";
    }
    //Up - Right
    else if(Location.x > StartingNode.x && Location.y < StartingNode.y){
        return "NE";
    }
    //Up - Left
    else if(Location.x < StartingNode.x && Location.y < StartingNode.y){
        return "NW";
    }
    //Up
    else if(Location.x == StartingNode.x && Location.y < StartingNode.y){
        return "N";
    }
    //Down
    else if(Location.x == StartingNode.x && Location.y > StartingNode.y){
        return "S";
    }
    //Right
    else if(Location.x > StartingNode.x && Location.y == StartingNode.y){
        return "E";
    }
    //Left
    else if(Location.x < StartingNode.x && Location.y == StartingNode.y){
        return "W";
    }

}

function EatMeNextTurn(Location, strikesMap){

    let Lx = Location.x;
    let Ly = Location.y;

    if(Lx - 1 > -1 && strikesMap[Ly][Lx - 1] == 'M'){
        return true;
    }
    else if(Ly - 1 > -1 && strikesMap[Ly - 1][Lx] == 'M'){
        return true;
    }
    else if(Ly + 1 < height && strikesMap[Ly + 1][Lx] == 'M'){
        return true;
    }
    else if(Lx + 1 < width && strikesMap[Ly][Lx + 1] == 'M'){
        return true;
    }
    else if(Ly - 1 > -1 && Lx + 1 < width && strikesMap[Ly - 1][Lx + 1] == 'M'){
        return true;
    }
    else if(Ly + 1 < height && Lx + 1 < width && strikesMap[Ly + 1][Lx + 1] == 'M'){
        return true;
    }
    else if(Ly - 1 > -1 && Lx - 1 > -1 && strikesMap[Ly - 1][Lx - 1] == 'M'){
        return true;
    }
    else if(Ly + 1 < height &&Lx - 1 > -1 &&  strikesMap[Ly + 1][Lx - 1] == 'M'){
        return true;
    }

    return false;

}

function GetNeighbors(map, CurrNode){

    let X = CurrNode.x;
    let Y = CurrNode.y;

    let Neighbors = [];

    //Up
    if(Y - 1 > -1 && map[Y - 1][X] != 'M'){
        Neighbors.push({x: X, y: Y - 1, gScore: Infinity, fScore: Infinity, cameFrom: undefined});
    }
    //Down
    if(Y + 1 < height && map[Y + 1][X] != 'M'){
        Neighbors.push({x: X, y: Y + 1, gScore: Infinity, fScore: Infinity, cameFrom: undefined});
    }
    //Left
    if(X - 1 > -1 && map[Y][X - 1] != 'M'){
        Neighbors.push({x: X - 1, y: Y, gScore: Infinity, fScore: Infinity, cameFrom: undefined});
    }
    //Right
    if(X + 1 < width && map[Y][X + 1] != 'M'){
        Neighbors.push({x: X + 1, y: Y, gScore: Infinity, fScore: Infinity, cameFrom: undefined});
    }
    //Up - Right
    if(Y - 1 > -1 && X + 1 < width && map[Y - 1][X + 1] != 'M'){
        Neighbors.push({x: X + 1, y: Y - 1, gScore: Infinity, fScore: Infinity, cameFrom: undefined});
    }
    //Up - Left
    if(Y - 1 > -1 && X - 1 > -1 && map[Y - 1][X - 1] != 'M'){
        Neighbors.push({x: X - 1, y: Y - 1, gScore: Infinity, fScore: Infinity, cameFrom: undefined});
    }
    //Down - Right
    if(Y + 1 < height && X + 1 < width && map[Y + 1][X + 1] != 'M'){
        Neighbors.push({x: X + 1, y: Y + 1, gScore: Infinity, fScore: Infinity, cameFrom: undefined});
    }
    //Down - Left
    if(Y + 1 < height && X - 1 > -1 && map[Y + 1][X - 1] != 'M'){
        Neighbors.push({x: X - 1, y: Y + 1, gScore: Infinity, fScore: Infinity, cameFrom: undefined});
    }

    return Neighbors;
}

function HowMuchMonstersKill(map, StartingNode, Monsters, Goal){

    let StepsItTakeMe = A_Star(map, StartingNode, Goal);

    let Mone = 0;

    for(let i = 0; i < Monsters.length; i++){
        let Location = A_Star(map, {x: Monsters[i].x, y: Monsters[i].y}, Goal, StepsItTakeMe);
        if(Location == undefined || (Location.x == Goal.x && Location.y == Goal.y))
            return -1;

        else if(InsideThe9Squarw(Location, Goal)){
            Mone++;
        }
    }

    return Mone;
}

function InsideThe9Squarw(Location, Goal){

    let Lx = Location.x;
    let Ly = Location.y;

    let Gx = Goal.x;
    let Gy = Goal.y;

    //Down
    if(Gy > Ly && Ly + 4 < Gy){
        return false;
    }
    //Up
    else if(Gy < Ly && Ly - 4 > Gy){
        return false;
    }
    //Left
    else if(Gx < Lx && Lx - 4 > Gx){
        return false;
    }
    //Right
    else if(Gx > Lx && Lx + 4 < Gx){
        return false;
    }

    return true;

}

function A_Star(map, StartingNode, Goal, Steps){

    let fScore = h(StartingNode.x, StartingNode.y, Goal.x, Goal.y);

    let OpenSet = [{x: StartingNode.x, y: StartingNode.y, gScore: 0, fScore, cameFrom: undefined}];

    let ClosedSet = [];

    while(OpenSet.length != 0){

        let CurrNode = OpenSet.splice(FindLowestfScoreNode(OpenSet),1)[0];
        ClosedSet.push(CurrNode);

        if(CurrNode.y == Goal.y && CurrNode.x == Goal.x){
            return reconstruct_path(CurrNode, Steps);
        }

        let Neighbors = GetNeighbors(map, CurrNode);

        for(let i = 0 ; i < Neighbors.length; i++){

            let Neighbor = Neighbors[i];

            if(InSet(Neighbor, ClosedSet)){
                continue;
            }

            let tentative_gScore = CurrNode.gScore + 1;

            if(tentative_gScore < Neighbor.gScore){
                Neighbor.cameFrom = CurrNode;

                Neighbor.gScore = tentative_gScore;
                Neighbor.fScore = Neighbor.gScore + h(Neighbor.x, Neighbor.y, Goal.x, Goal.y);

                if(InSet(Neighbor, OpenSet) == false)
                    OpenSet.push(Neighbor)
            }
        }

    }

    return "NONE";

}

function reconstruct_path(CurrNode, MySteps){

    let Steps = 0;

    let Path = [];

    Path.unshift(CurrNode);

    while(CurrNode.cameFrom != undefined){
        Steps += 1;
        CurrNode = CurrNode.cameFrom;
        Path.unshift(CurrNode);
    }


    if(MySteps != undefined){
        return Path[MySteps];
    }

    return Steps;

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

function InSet(Neighbor, set){

    for(let i = 0; i < set.length; i++)
        if(set[i].x == Neighbor.x && set[i].y == Neighbor.y)
            return true;
    
    return false;

}
