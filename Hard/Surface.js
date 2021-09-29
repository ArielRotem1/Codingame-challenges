/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

//Make a table
let SavedTab = [];
let Tab = [];

const L = parseInt(readline());
const H = parseInt(readline());
for (let i = 0; i < H; i++) {
    const row = readline();
    let Arr = [];
    for(let j = 0; j < row.length; j++){
        if(row[j] != 'O')
        Arr.push(row[j]);
        else
        Arr.push('+');
    }
    //Fill the grid
    SavedTab.push(Arr);
}
const N = parseInt(readline());
//Make an array to store all the location  that I need to check
let locationsToCheck = [];
for (let i = 0; i < N; i++) {
    var inputs = readline().split(' ');
    const X = parseInt(inputs[0]);
    const Y = parseInt(inputs[1]);
    //Store X and Y inside an Object
    let data = {X, Y};
    //Store the Object inside the array that store the locations
    locationsToCheck.push(data);
}

let Char = 65;

for (let i = 0; i < N; i++) {


        let X = locationsToCheck[i].X;
        let Y = locationsToCheck[i].Y;

        let NowCharPos = "" + SavedTab[Y][X];

        if(NowCharPos == "+"){
            SavedTab[Y][X] = String.fromCharCode(Char);
            let Qu = [];
            let data = {x: X, y: Y};
            Qu.unshift(data);
            console.log(Q(Qu));
            Char++;
        }
        else if(NowCharPos.charCodeAt(0) > 64){

            let surface = 0;

            for(let z = 0; z < H; z++){
                for(let j = 0; j < L; j++){
                    let NowChar = "" + SavedTab[z][j];
                    if(NowChar == NowCharPos){
                        surface++;
                    }
                }
            }

            console.log(surface);

        }
        else{
            console.log(0);
        }

        
}

function Q(Qu){

    let Surface = 1;

    while(Qu.length != 0){

        let data = Qu.pop();
        let X = data.x;
        let Y = data.y;

        if(Y - 1 > -1 && SavedTab[Y - 1][X] == '+'){
            SavedTab[Y - 1][X] = String.fromCharCode(Char);
            Surface++;
            let NewData = {x: X, y: Y - 1};

            Qu.unshift(NewData);
        }
        if(Y + 1 < H && SavedTab[Y + 1][X] == '+'){
            SavedTab[Y + 1][X] = String.fromCharCode(Char);
            Surface++;
            let NewData = {x: X, y: Y + 1};

            Qu.unshift(NewData);
        }
        if(X + 1 < L && SavedTab[Y][X + 1] == '+'){
            SavedTab[Y][X + 1] = String.fromCharCode(Char);
            Surface++;
            let NewData = {x: X + 1, y: Y};

            Qu.unshift(NewData);
        }
        if(X - 1 > -1 && SavedTab[Y][X - 1] == '+'){
            SavedTab[Y][X - 1] = String.fromCharCode(Char);
            Surface++;
            let NewData = {x: X - 1, y: Y};

            Qu.unshift(NewData);
        }

    }

    return Surface;

}
