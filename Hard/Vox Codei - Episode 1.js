/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

 function Solve(Gird, Bombs, Action, Options){

    Options.sort((a,b) => b.NumberOfNodesDetroy - a.NumberOfNodesDetroy)

    for(let k = 0; k < Options.length; k++){
        let i = Options[k].i;
        let j = Options[k].j;
        Grid[i][j] = '1';
                let Nodes = [];
                //Up
                let mone = 0;
                for(let y = i - 1; y > -1; y--){
                    if(mone == 3){
                        break;
                    }
                    else if(Grid[y][j] == '@'){
                        Grid[y][j] = '1';
                        Nodes.push({y, x: j})
                    }
                    else if(Grid[y][j] == '#'){
                        break;
                    }
                    mone++;
                }
                //Down
                mone = 0;
                for(let y = i + 1; y < height; y++){
                    if(mone == 3){
                        break;
                    }
                    else if(Grid[y][j] == '@'){
                        Grid[y][j] = '1';
                        Nodes.push({y, x: j})
                    }
                    else if(Grid[y][j] == '#'){
                        break;                          
                    }
                    mone++;
                }
                //Right
                mone = 0;
                for(let x = j + 1; x < width; x++){
                    if(mone == 3){
                        break;
                    }
                    else if(Grid[i][x] == '@'){
                        Grid[i][x] = '1';
                        Nodes.push({y: i, x})
                    }
                    else if(Grid[i][x] == '#'){
                        break;
                    }
                    mone++;
                }
                //Left
                mone = 0;
                for(let x = j - 1; x > -1; x--){
                    if(mone == 3){
                        break;
                    }
                    else if(Grid[i][x] == '@'){
                        Grid[i][x] = '1';
                        Nodes.push({y: i, x})
                    }
                    else if(Grid[i][x] == '#'){
                        break;
                    }
                    mone++;
                }
                let ResultAction;
                if(Action.length == 0){
                    ResultAction = Solve(Gird, Bombs - 1, [i, j], GetOptionsToPutBombs(Grid));
                }
                else{
                    ResultAction = Solve(Gird, Bombs - 1, Action, GetOptionsToPutBombs(Grid));
                }
                if(ResultAction.length != 0){
                    return ResultAction;
                }
                for(let z = 0; z < Nodes.length; z++){
                    Grid[Nodes[z].y][Nodes[z].x] = '@'
                }
    }

    let NumberOfNodes = 0;
    
    for(let i = 0; i < Gird.length; i++){
        for(let j = 0; j < Gird[i].length; j++){
            if(Grid[i][j] == '1'){
                Gird[i][j] = '2';
            }
            else if(Grid[i][j] == '2'){
                Gird[i][j] = '3';
            }
            else if(Grid[i][j] == '3'){
                Gird[i][j] = '.';
            }
            else if(Grid[i][j] == '@'){
                NumberOfNodes++;
            }
        }
    }

    if(NumberOfNodes == 0 && Bombs >= 0){
        return Action;
    }
    else{
        return [];
    }

}

function NumberOfNodesDetroyed(Grid, i, j){

    let mone = 0;

    let Nodes = [];

                    //Up
                    mone = 0;
                    for(let y = i - 1; y > -1; y--){
                        if(mone == 3){
                            break;
                        }
                        else if(Grid[y][j] == '@'){
                            Nodes.push({y, x: j});
                        }
                        else if(Grid[y][j] == '#'){
                            break;
                        }
                        mone++;
                    }
                    //Down
                    mone = 0;
                    for(let y = i + 1; y < height; y++){
                        if(mone == 3){
                            break;
                        }
                        else if(Grid[y][j] == '@'){
                            Nodes.push({y, x: j});
                        }
                        else if(Grid[y][j] == '#'){
                            break;
                        }
                        mone++;
                    }
                    //Right
                    mone = 0;
                    for(let x = j + 1; x < width; x++){
                        if(mone == 3){
                            break;
                        }
                        else if(Grid[i][x] == '@'){
                            Nodes.push({y: i, x});
                        }
                        else if(Grid[i][x] == '#'){
                            break;
                        }
                        mone++;
                    }
                    //Left
                    mone = 0;
                    for(let x = j - 1; x > -1; x--){
                        if(mone == 3){
                            break;
                        }
                        else if(Grid[i][x] == '@'){
                            Nodes.push({y: i, x});
                        }
                        else if(Grid[i][x] == '#'){
                            break;
                        }
                        mone++;
                    }
    return Nodes;
}

function GetOptionsToPutBombs(Grid){

    let Options = [];

    let NodesDestroyed = [];

    for(let i = 0; i < Grid.length; i++){
        for(let j = 0; j < Grid[i].length; j++){
            if(Grid[i][j] == '.' || Grid[i][j] == '1' || Grid[i][j] == '2' || Grid[i][j] == '3'){
                let NodesDestroy = NumberOfNodesDetroyed(Grid, i, j);
                if(NodesDestroy.length > 0 && NotSubSetOfNodesDestroyed(NodesDestroyed, NodesDestroy)){
                    NodesDestroyed.push(NodesDestroy);
                    Options.push({i, j, NumberOfNodesDetroy: NodesDestroy.length});
                }
            }
        }
    }

    return Options;
}

function NotSubSetOfNodesDestroyed(NodesDestroyed, NodesDestroy){

    for(let i = 0; i < NodesDestroyed.length; i++){
        let Nodes = NodesDestroyed[i];
        let check = true;
        for(let j = 0; j < NodesDestroy.length; j++){
            let Skip = false;
            for(let k = 0; k < Nodes.length; k++){
                if(NodesDestroy[j].y != Nodes[k].y ||  NodesDestroy[j].x != Nodes[k].x){
                    check = false;
                    Skip = true;
                    break;
                }
            }
            if(Skip){
                break;
            }
        }
        if(check){
            return false;
        }
    }

    return true;

}

var inputs = readline().split(' ');
const width = parseInt(inputs[0]); // width of the firewall grid
const height = parseInt(inputs[1]); // height of the firewall grid
let Grid = [];
for (let i = 0; i < height; i++) {
    const mapRow = readline(); // one line of the firewall grid
    Grid.push(mapRow.split(''));
}



// game loop
while (true) {
    var inputs = readline().split(' ');
    const rounds = parseInt(inputs[0]); // number of rounds left before the end of the game
    const bombs = parseInt(inputs[1]); // number of bombs left

    // Write an action using console.log()
    // To debug: console.error('Debug messages...');

    let SavedGrid = [];

    for(let i = 0; i < Grid.length; i++){
        let Arr = [];
        for(let j = 0; j < Grid[i].length; j++){
            if(Grid[i][j] == '1'){
                Arr.push('2');
            }
            else if(Grid[i][j] == '2'){
                Arr.push('3');
            }
            else if(Grid[i][j] == '3'){
                Arr.push('.');
            }
            else{
                Arr.push(Grid[i][j])
            }
        }
        SavedGrid[i] = Arr;
    }

    let Action = Solve(Grid, bombs, [], GetOptionsToPutBombs(Grid));

    for(let i = 0; i < SavedGrid.length; i++){
        Grid[i] = SavedGrid[i].slice();
    }

    if(Action.length != 0 && Grid[Action[0]][Action[1]] == '.'){

        let i = Action[0];
        let j = Action[1];

        let mone = 0;
        //Up
        mone = 0;
        for(let y = i - 1; y > -1; y--){
            if(mone == 3){
                break;
            }
            else if(Grid[y][j] == '@'){
                Grid[y][j] = '1'
            }
            else if(Grid[y][j] == '#'){
                break;
            }
            mone++;
        }
        //Down
        mone = 0;
        for(let y = i + 1; y < height; y++){
            if(mone == 3){
                break;
            }
            else if(Grid[y][j] == '@'){
                Grid[y][j] = '1'
            }
            else if(Grid[y][j] == '#'){
                break;
            }
            mone++;
        }
        //Right
        mone = 0;
        for(let x = j + 1; x < width; x++){
            if(mone == 3){
                break;
            }
            else if(Grid[i][x] == '@'){
                Grid[i][x] = '1'
            }
            else if(Grid[i][x] == '#'){
                    break;
            }
            mone++;
        }
        //Left
        mone = 0;
        for(let x = j - 1; x > -1; x--){
            if(mone == 3){
                break;
            }
            else if(Grid[i][x] == '@'){
                Grid[i][x] = '1'
            }
            else if(Grid[i][x] == '#'){
                break;
            }
            mone++;
        }

        Grid[i][j] = '1';
        console.log(Action[1] + " " + Action[0]);
    }
    else
        console.log("WAIT");
}

