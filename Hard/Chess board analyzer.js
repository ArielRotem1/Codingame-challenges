/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

const width = 8;
const height = 8;

const BIG = "RNBQKP";
const small = "rqnbkp";

let PosK = {i: -1, j: -1};
let Posk = {i: -1, j: -1};

let Grid = [];
for (let i = 0; i < 8; i++) {
    const boardRow = readline();
    let Arr = [];
    for(let j = 0; j < boardRow.length; j++){
        if(boardRow[j] == 'K'){
            PosK = {i,j};
        }
        else if(boardRow[j] == 'k'){
            Posk = {i,j};
        }
        Arr.push(boardRow[j]);
    }
    Grid[i] = Arr;
}

let check = false;

if(check == false){
    let TempGrid = [];
    for(let i = 0; i < height; i++){
        TempGrid[i] = Grid[i].slice();
    }

    for(let i = 0; i < height; i++){
        for(let j = 0; j < width; j++){
            if(small.includes(TempGrid[i][j])){
                let attacker = TempGrid[i][j];

                switch(attacker){

                    case 'k':

                        if(j - 1 > -1 && (TempGrid[i][j - 1] == '.' || TempGrid[i][j - 1] == 'K')){
                            TempGrid[i][j - 1] = 'X';
                        }
                        if(j + 1 < width && (TempGrid[i][j + 1] == '.' || TempGrid[i][j + 1] == 'K')){
                            TempGrid[i][j + 1] = 'X';
                        }
                        if(i - 1 > -1 && (TempGrid[i - 1][j] == '.' || TempGrid[i - 1][j] == 'K')){
                            TempGrid[i - 1][j] = 'X';
                        }
                        if(i + 1 < width && (TempGrid[i + 1][j] == '.' || TempGrid[i + 1][j] == 'K')){
                            TempGrid[i + 1][j] = 'X';
                        }
                        if(i - 1 > -1 && j - 1 > -1 &&(TempGrid[i - 1][j - 1] == '.' || TempGrid[i - 1][j - 1] == 'K')){
                            TempGrid[i - 1][j - 1] = 'X';
                        }
                        if(i - 1 > -1 && j + 1 < width && (TempGrid[i - 1][j + 1] == '.' || TempGrid[i - 1][j + 1] == 'K')){
                            TempGrid[i - 1][j + 1] = 'X';
                        }
                        if(i + 1 < height && j - 1 > -1 &&(TempGrid[i + 1][j - 1] == '.' || TempGrid[i + 1][j - 1] == 'K')){
                            TempGrid[i + 1][j - 1] = 'X';
                        }
                        if(i + 1 < height && j + 1 < width && (TempGrid[i + 1][j + 1] == '.' || TempGrid[i + 1][j + 1] == 'K')){
                            TempGrid[i + 1][j + 1] = 'X';
                        }

                    break;

                    case 'p':

                        if(i + 1 < height && j - 1 > -1 && (TempGrid[i + 1][j - 1] == '.' || TempGrid[i + 1][j - 1] == 'K')){
                            TempGrid[i][j - 1] = 'X';
                        }
                        if(i + 1 < height && j + 1 < width && (TempGrid[i + 1][j + 1] == '.' || TempGrid[i + 1][j + 1] == 'K')){
                            TempGrid[i][j + 1] = 'X';
                        }

                    break;

                    case 'r':

                        SavedJ = j;
                        //Right
                        while(SavedJ < width && (Grid[i][SavedJ] == '.' 
                        || SavedJ == j || Grid[i][SavedJ] == 'K')){
                            SavedJ++;
                            if(SavedJ < width && (Grid[i][SavedJ] == 'K' || Grid[i][SavedJ] == '.')){
                                TempGrid[i][SavedJ] = 'X';
                            }
                        }

                        SavedJ = j;
                        //Left
                        while(SavedJ > -1 && (Grid[i][SavedJ] == '.' 
                        || SavedJ == j || Grid[i][SavedJ] == 'K')){
                            SavedJ--;
                            if(SavedJ > -1 && (Grid[i][SavedJ] == 'K' || Grid[i][SavedJ] == '.')){
                                TempGrid[i][SavedJ] = 'X';
                            }
                        }

                        SavedI = i;
                        //Down
                        while(SavedI < height && (Grid[SavedI][j] == '.' 
                        || SavedI == i || Grid[SavedI][j] == 'K')){
                            SavedI++;
                            if(SavedI < height && (Grid[SavedI][j] == 'K' || Grid[SavedI][j] == '.')){
                                TempGrid[SavedI][j] = 'X';
                            }
                        }

                        SavedI = i;
                        //Up
                        while(SavedI > -1 && (Grid[SavedI][j] == '.' 
                        || SavedI == i || Grid[SavedI][j] == 'K')){
                            SavedI--;
                            if(SavedI > -1 && (Grid[SavedI][j] == 'K' || Grid[SavedI][j] == '.')){
                                TempGrid[SavedI][j] = 'X';
                            }
                        }
                    break;

                    case 'b':

                        SavedJ = j;
                        SavedI = i;
                        //Right - Up
                        while(SavedJ < width && SavedI > -1 && (Grid[SavedI][SavedJ] == '.' 
                        || (SavedI == i && SavedJ == j) || Grid[SavedI][SavedJ] == 'K')){
                            SavedJ++;
                            SavedI--;
                            if(SavedJ < width && SavedI > -1 && (Grid[SavedI][SavedJ] == 'K' || Grid[SavedI][SavedJ] == '.')){
                                TempGrid[SavedI][SavedJ] = 'X';
                            }
                        }

                        SavedJ = j;
                        SavedI = i;
                        //Left - Up
                        while(SavedJ > -1 && SavedI > -1 && (Grid[SavedI][SavedJ] == '.' 
                        || (SavedI == i && SavedJ == j) || Grid[SavedI][SavedJ] == 'K')){
                            SavedJ--;
                            SavedI--;
                            if(SavedJ > -1 && SavedI > -1 && (Grid[SavedI][SavedJ] == 'K' || Grid[SavedI][SavedJ] == '.')){
                                TempGrid[SavedI][SavedJ] = 'X';
                            }
                        }

                        SavedJ = j;
                        SavedI = i;
                        //Right - Down
                        while(SavedJ < width && SavedI < width && (Grid[SavedI][SavedJ] == '.' 
                        || (SavedI == i && SavedJ == j) || Grid[SavedI][SavedJ] == 'K')){
                            SavedJ++;
                            SavedI++;
                            if(SavedJ < width && SavedI < width && (Grid[SavedI][SavedJ] == 'K' || Grid[SavedI][SavedJ] == '.')){
                                TempGrid[SavedI][SavedJ] = 'X';
                            }
                        }

                        SavedJ = j;
                        SavedI = i;
                        //Left - Down
                        while(SavedJ > -1 && SavedI < width && (Grid[SavedI][SavedJ] == '.' 
                        || (SavedI == i && SavedJ == j) || Grid[SavedI][SavedJ] == 'K')){
                            SavedJ--;
                            SavedI++;
                            if(SavedJ > -1 && SavedI < width && (Grid[SavedI][SavedJ] == 'K' || Grid[SavedI][SavedJ] == '.')){
                                TempGrid[SavedI][SavedJ] = 'X';
                            }
                        }
                    break;
                
                    case 'q':

                        //r

                        SavedJ = j;
                        //Right
                        while(SavedJ < width && (Grid[i][SavedJ] == '.' 
                        || SavedJ == j || Grid[i][SavedJ] == 'K')){
                            SavedJ++;
                            if(SavedJ < width && (Grid[i][SavedJ] == 'K' || Grid[i][SavedJ] == '.')){
                                TempGrid[i][SavedJ] = 'X';
                            }
                        }

                        SavedJ = j;
                        //Left
                        while(SavedJ > -1 && (Grid[i][SavedJ] == '.' 
                        || SavedJ == j || Grid[i][SavedJ] == 'K')){
                            SavedJ--;
                            if(SavedJ > -1 && (Grid[i][SavedJ] == 'K' || Grid[i][SavedJ] == '.')){
                                TempGrid[i][SavedJ] = 'X';
                            }
                        }

                        SavedI = i;
                        //Down
                        while(SavedI < height && (Grid[SavedI][j] == '.' 
                        || SavedI == i || Grid[SavedI][j] == 'K')){
                            SavedI++;
                            if(SavedI < height && (Grid[SavedI][j] == 'K' || Grid[SavedI][j] == '.')){
                                TempGrid[SavedI][j] = 'X';
                            }
                        }

                        SavedI = i;
                        //Up
                        while(SavedI > -1 && (Grid[SavedI][j] == '.' 
                        || SavedI == i || Grid[SavedI][j] == 'K')){
                            SavedI--;
                            if(SavedI > -1 && (Grid[SavedI][j] == 'K' || Grid[SavedI][j] == '.')){
                                TempGrid[SavedI][j] = 'X';
                            }
                        }

                        //b

                        SavedJ = j;
                        SavedI = i;
                        //Right - Up
                        while(SavedJ < width && SavedI > -1 && (Grid[SavedI][SavedJ] == '.' 
                        || (SavedI == i && SavedJ == j) || Grid[SavedI][SavedJ] == 'K')){
                            SavedJ++;
                            SavedI--;
                            if(SavedJ < width && SavedI > -1 && (Grid[SavedI][SavedJ] == 'K' || Grid[SavedI][SavedJ] == '.')){
                                TempGrid[SavedI][SavedJ] = 'X';
                            }
                        }

                        SavedJ = j;
                        SavedI = i;
                        //Left - Up
                        while(SavedJ > -1 && SavedI > -1 && (Grid[SavedI][SavedJ] == '.' 
                        || (SavedI == i && SavedJ == j) || Grid[SavedI][SavedJ] == 'K')){
                            SavedJ--;
                            SavedI--;
                            if(SavedJ > -1 && SavedI > -1 && (Grid[SavedI][SavedJ] == 'K' || Grid[SavedI][SavedJ] == '.')){
                                TempGrid[SavedI][SavedJ] = 'X';
                            }
                        }

                        SavedJ = j;
                        SavedI = i;
                        //Right - Down
                        while(SavedJ < width && SavedI < width && (Grid[SavedI][SavedJ] == '.' 
                        || (SavedI == i && SavedJ == j) || Grid[SavedI][SavedJ] == 'K')){
                            SavedJ++;
                            SavedI++;
                            if(SavedJ < width && SavedI < width && (Grid[SavedI][SavedJ] == 'K' || Grid[SavedI][SavedJ] == '.')){
                                TempGrid[SavedI][SavedJ] = 'X';
                            }
                        }

                        SavedJ = j;
                        SavedI = i;
                        //Left - Down
                        while(SavedJ > -1 && SavedI < width && (Grid[SavedI][SavedJ] == '.' 
                        || (SavedI == i && SavedJ == j) || Grid[SavedI][SavedJ] == 'K')){
                            SavedJ--;
                            SavedI++;
                            if(SavedJ > -1 && SavedI < width && (Grid[SavedI][SavedJ] == 'K' || Grid[SavedI][SavedJ] == '.')){
                                TempGrid[SavedI][SavedJ] = 'X';
                            }
                        }


                    break;
                
                    case 'n':

                        //Up - Right
                        if(i - 2 > -1 && j + 1 < width && (TempGrid[i - 2][j + 1] == 'K' || TempGrid[i - 2][j + 1] == '.')){
                            TempGrid[i - 2][j + 1] = 'X'; 
                        }
                        //Up - Left
                        if(i - 2 > -1 && j - 1 > -1 && (TempGrid[i - 2][j - 1] == 'K' || TempGrid[i - 2][j - 1] == '.')){
                            TempGrid[i-2][j-1] = 'X';
                        }
                        //Down - Right
                        if(i + 2 < height && j + 1 < width && (TempGrid[i + 2][j + 1] == 'K' || TempGrid[i + 2][j + 1] == '.')){
                            TempGrid[i+2][j+1] = 'X';
                        }
                        //Down - Left
                        if(i + 2 < height && j - 1 > -1 && (TempGrid[i + 2][j - 1] == 'K' || TempGrid[i + 2][j - 1] == '.')){
                            TempGrid[i+2][j-1] = 'X';
                        }
                        if(i + 1 < height && j - 2 > -1 && (TempGrid[i + 1][j - 2] == 'K' || TempGrid[i + 1][j - 2] == '.')){
                            TempGrid[i+1][j-2] = 'X';
                        }
                        if(i - 1 > -1 && j - 2 > -1 && (TempGrid[i - 1][j - 2] == 'K' || TempGrid[i - 1][j - 2] == '.')){
                            TempGrid[i-1][j-2] = 'X';
                        }
                        if(i + 1 < height && j + 2 < width && (TempGrid[i + 1][j + 2] == 'K' || TempGrid[i + 1][j + 2] == '.')){
                            TempGrid[i+1][j+2] = 'X';
                        }
                        if(i - 1 > -1 && j + 2 < width && (TempGrid[i - 1][j + 2] == 'K' || TempGrid[i - 1][j + 2] == '.')){
                            TempGrid[i-1][j+2] = 'X';
                        }

                    break;
            
                }
            }
        }
    }

    if(TempGrid[PosK.i][PosK.j] == 'X'){

        let Y = PosK.i;
        let X = PosK.j;

        check = true;

        if(Y - 1 > -1 && (TempGrid[Y - 1][X] == '.' || (small.includes(TempGrid[Y - 1][X]) && !IsProtected(TempGrid[Y - 1][X], Y - 1, X)))){
            check = false;
        }
        else if(Y + 1 < height && (TempGrid[Y + 1][X] == '.' || (small.includes(TempGrid[Y + 1][X]) && !IsProtected(TempGrid[Y + 1][X], Y + 1, X)))){
            check = false;
        }
        else if(X - 1 > -1 && (TempGrid[Y][X - 1] == '.' || (small.includes(TempGrid[Y][X - 1]) && !IsProtected(TempGrid[Y][X - 1], Y, X - 1)))){
            check = false;
        }
        else if(X + 1 < width && (TempGrid[Y][X + 1] == '.' || (small.includes(TempGrid[Y][X + 1]) && !IsProtected(TempGrid[Y][X + 1], Y, X + 1)))){
            check = false;
        }
        else if(X - 1 > -1 && Y - 1 > -1 && (TempGrid[Y - 1][X - 1] == '.' || (small.includes(TempGrid[Y - 1][X - 1]) && !IsProtected(TempGrid[Y - 1][X - 1], Y - 1, X - 1)))){
            check = false;
        }
        else if(X - 1 > -1 && Y + 1 < height && (TempGrid[Y + 1][X - 1] == '.' || (small.includes(TempGrid[Y + 1][X - 1]) && !IsProtected(TempGrid[Y + 1][X - 1], Y + 1, X - 1)))){
            check = false;
        }
        else if(X + 1 < width && Y - 1 > -1 && (TempGrid[Y - 1][X + 1] == '.' || (small.includes(TempGrid[Y - 1][X + 1]) && !IsProtected(TempGrid[Y - 1][X + 1], Y - 1, X + 1)))){
            check = false;
        }
        else if(X + 1 < width && Y + 1 < height && (TempGrid[Y + 1][X + 1] == '.' || (small.includes(TempGrid[Y + 1][X + 1]) && !IsProtected(TempGrid[Y + 1][X + 1], Y + 1, X + 1)))){
            check = false;
        }

        if(check)
            console.log('B');
    }

}
if(check == false){
    
    let TempGrid = [];
    for(let i = 0; i < height; i++){
        TempGrid[i] = Grid[i].slice();
    }

    for(let i = 0; i < height; i++){
        for(let j = 0; j < width; j++){
            if(BIG.includes(TempGrid[i][j])){
                let attacker = TempGrid[i][j];

                switch(attacker){

                    case 'K':

                        if(j - 1 > -1 && (TempGrid[i][j - 1] == '.' || TempGrid[i][j - 1] == 'k')){
                            TempGrid[i][j - 1] = 'X';
                        }
                        if(j + 1 < width && (TempGrid[i][j + 1] == '.' || TempGrid[i][j + 1] == 'k')){
                            TempGrid[i][j + 1] = 'X';
                        }
                        if(i - 1 > -1 && (TempGrid[i - 1][j] == '.' || TempGrid[i - 1][j] == 'k')){
                            TempGrid[i - 1][j] = 'X';
                        }
                        if(i + 1 < width && (TempGrid[i + 1][j] == '.' || TempGrid[i + 1][j] == 'k')){
                            TempGrid[i + 1][j] = 'X';
                        }
                        if(i - 1 > -1 && j - 1 > -1 &&(TempGrid[i - 1][j - 1] == '.' || TempGrid[i - 1][j - 1] == 'k')){
                            TempGrid[i - 1][j - 1] = 'X';
                        }
                        if(i - 1 > -1 && j + 1 < width && (TempGrid[i - 1][j + 1] == '.' || TempGrid[i - 1][j + 1] == 'k')){
                            TempGrid[i - 1][j + 1] = 'X';
                        }
                        if(i + 1 < height && j - 1 > -1 &&(TempGrid[i + 1][j - 1] == '.' || TempGrid[i + 1][j - 1] == 'k')){
                            TempGrid[i + 1][j - 1] = 'X';
                        }
                        if(i + 1 < height && j + 1 < width && (TempGrid[i + 1][j + 1] == '.' || TempGrid[i + 1][j + 1] == 'k')){
                            TempGrid[i + 1][j + 1] = 'X';
                        }

                    break;

                    case 'P':

                        if(i - 1 > -1 && j - 1 > -1 && (TempGrid[i - 1][j - 1] == '.' || TempGrid[i - 1][j - 1] == 'k')){
                            TempGrid[i][j - 1] = 'X';
                        }
                        if(i - 1 > -1 && j + 1 < width && (TempGrid[i - 1][j + 1] == '.' || TempGrid[i - 1][j + 1] == 'k')){
                            TempGrid[i][j + 1] = 'X';
                        }
                    break;

                    case 'R':

                        SavedJ = j;
                        //Right
                        while(SavedJ < width && (Grid[i][SavedJ] == '.' 
                        || SavedJ == j || Grid[i][SavedJ] == 'k')){
                            SavedJ++;
                            if(SavedJ < width && (Grid[i][SavedJ] == 'k' || Grid[i][SavedJ] == '.')){
                                TempGrid[i][SavedJ] = 'X';
                            }
                        }

                        SavedJ = j;
                        //Left
                        while(SavedJ > -1 && (Grid[i][SavedJ] == '.' 
                        || SavedJ == j || Grid[i][SavedJ] == 'k')){
                            SavedJ--;
                            if(SavedJ > -1 && (Grid[i][SavedJ] == 'k' || Grid[i][SavedJ] == '.')){
                                TempGrid[i][SavedJ] = 'X';
                            }
                        }

                        SavedI = i;
                        //Down
                        while(SavedI < height && (Grid[SavedI][j] == '.' 
                        || SavedI == i || Grid[SavedI][j] == 'k')){
                            SavedI++;
                            if(SavedI < height && (Grid[SavedI][j] == 'k' || Grid[SavedI][j] == '.')){
                                TempGrid[SavedI][j] = 'X';
                            }
                        }

                        SavedI = i;
                        //Up
                        while(SavedI > -1 && (Grid[SavedI][j] == '.' 
                        || SavedI == i || Grid[SavedI][j] == 'k')){
                            SavedI--;
                            if(SavedI > -1 && (Grid[SavedI][j] == 'k' || Grid[SavedI][j] == '.')){
                                TempGrid[SavedI][j] = 'X';
                            }
                        }
                    break;

                    case 'B':

                        SavedJ = j;
                        SavedI = i;
                        //Right - Up
                        while(SavedJ < width && SavedI > -1 && (Grid[SavedI][SavedJ] == '.' 
                        || (SavedI == i && SavedJ == j) || Grid[SavedI][SavedJ] == 'k')){
                            SavedJ++;
                            SavedI--;
                            if(SavedJ < width && SavedI > -1 && (Grid[SavedI][SavedJ] == 'k' || Grid[SavedI][SavedJ] == '.')){
                                TempGrid[SavedI][SavedJ] = 'X';
                            }
                        }

                        SavedJ = j;
                        SavedI = i;
                        //Left - Up
                        while(SavedJ > -1 && SavedI > -1 && (Grid[SavedI][SavedJ] == '.' 
                        || (SavedI == i && SavedJ == j) || Grid[SavedI][SavedJ] == 'k')){
                            SavedJ--;
                            SavedI--;
                            if(SavedJ > -1 && SavedI > -1 && (Grid[SavedI][SavedJ] == 'k' || Grid[SavedI][SavedJ] == '.')){
                                TempGrid[SavedI][SavedJ] = 'X';
                            }
                        }

                        SavedJ = j;
                        SavedI = i;
                        //Right - Down
                        while(SavedJ < width && SavedI < width && (Grid[SavedI][SavedJ] == '.' 
                        || (SavedI == i && SavedJ == j) || Grid[SavedI][SavedJ] == 'k')){
                            SavedJ++;
                            SavedI++;
                            if(SavedJ < width && SavedI < width && (Grid[SavedI][SavedJ] == 'k' || Grid[SavedI][SavedJ] == '.')){
                                TempGrid[SavedI][SavedJ] = 'X';
                            }
                        }

                        SavedJ = j;
                        SavedI = i;
                        //Left - Down
                        while(SavedJ > -1 && SavedI < width && (Grid[SavedI][SavedJ] == '.' 
                        || (SavedI == i && SavedJ == j) || Grid[SavedI][SavedJ] == 'k')){
                            SavedJ--;
                            SavedI++;
                            if(SavedJ > -1 && SavedI < width && (Grid[SavedI][SavedJ] == 'k' || Grid[SavedI][SavedJ] == '.')){
                                TempGrid[SavedI][SavedJ] = 'X';
                            }
                        }
                    break;
                
                    case 'Q':

                        //R

                        SavedJ = j;
                        //Right
                        while(SavedJ < width && (Grid[i][SavedJ] == '.' 
                        || SavedJ == j || Grid[i][SavedJ] == 'k')){
                            SavedJ++;
                            if(SavedJ < width && (Grid[i][SavedJ] == 'k' || Grid[i][SavedJ] == '.')){
                                TempGrid[i][SavedJ] = 'X';
                            }
                        }

                        SavedJ = j;
                        //Left
                        while(SavedJ > -1 && (Grid[i][SavedJ] == '.' 
                        || SavedJ == j || Grid[i][SavedJ] == 'k')){
                            SavedJ--;
                            if(SavedJ > -1 && (Grid[i][SavedJ] == 'k' || Grid[i][SavedJ] == '.')){
                                TempGrid[i][SavedJ] = 'X';
                            }
                        }

                        SavedI = i;
                        //Down
                        while(SavedI < height && (Grid[SavedI][j] == '.' 
                        || SavedI == i || Grid[SavedI][j] == 'k')){
                            SavedI++;
                            if(SavedI < height && (Grid[SavedI][j] == 'k' || Grid[SavedI][j] == '.')){
                                TempGrid[SavedI][j] = 'X';
                            }
                        }

                        SavedI = i;
                        //Up
                        while(SavedI > -1 && (Grid[SavedI][j] == '.' 
                        || SavedI == i || Grid[SavedI][j] == 'k')){
                            SavedI--;
                            if(SavedI > -1 && (Grid[SavedI][j] == 'k' || Grid[SavedI][j] == '.')){
                                TempGrid[SavedI][j] = 'X';
                            }
                        }

                        //B

                        SavedJ = j;
                        SavedI = i;
                        //Right - Up
                        while(SavedJ < width && SavedI > -1 && (Grid[SavedI][SavedJ] == '.' 
                        || (SavedI == i && SavedJ == j) || Grid[SavedI][SavedJ] == 'k')){
                            SavedJ++;
                            SavedI--;
                            if(SavedJ < width && SavedI > -1 && (Grid[SavedI][SavedJ] == 'k' || Grid[SavedI][SavedJ] == '.')){
                                TempGrid[SavedI][SavedJ] = 'X';
                            }
                        }

                        SavedJ = j;
                        SavedI = i;
                        //Left - Up
                        while(SavedJ > -1 && SavedI > -1 && (Grid[SavedI][SavedJ] == '.' 
                        || (SavedI == i && SavedJ == j) || Grid[SavedI][SavedJ] == 'k')){
                            SavedJ--;
                            SavedI--;
                            if(SavedJ > -1 && SavedI > -1 && (Grid[SavedI][SavedJ] == 'k' || Grid[SavedI][SavedJ] == '.')){
                                TempGrid[SavedI][SavedJ] = 'X';
                            }
                        }

                        SavedJ = j;
                        SavedI = i;
                        //Right - Down
                        while(SavedJ < width && SavedI < width && (Grid[SavedI][SavedJ] == '.' 
                        || (SavedI == i && SavedJ == j) || Grid[SavedI][SavedJ] == 'k')){
                            SavedJ++;
                            SavedI++;
                            if(SavedJ < width && SavedI < width && (Grid[SavedI][SavedJ] == 'k' || Grid[SavedI][SavedJ] == '.')){
                                TempGrid[SavedI][SavedJ] = 'X';
                            }
                        }

                        SavedJ = j;
                        SavedI = i;
                        //Left - Down
                        while(SavedJ > -1 && SavedI < width && (Grid[SavedI][SavedJ] == '.' 
                        || (SavedI == i && SavedJ == j) || Grid[SavedI][SavedJ] == 'k')){
                            SavedJ--;
                            SavedI++;
                            if(SavedJ > -1 && SavedI < width && (Grid[SavedI][SavedJ] == 'k' || Grid[SavedI][SavedJ] == '.')){
                                TempGrid[SavedI][SavedJ] = 'X';
                            }
                        }


                    break;
                
                    case 'N':

                        //Up - Right
                        if(i - 2 > -1 && j + 1 < width && (TempGrid[i - 2][j + 1] == 'k' || TempGrid[i - 2][j + 1] == '.')){
                            TempGrid[i - 2][j + 1] = 'X'; 
                        }
                        //Up - Left
                        if(i - 2 > -1 && j - 1 > -1 && (TempGrid[i - 2][j - 1] == 'k' || TempGrid[i - 2][j - 1] == '.')){
                            TempGrid[i-2][j-1] = 'X';
                        }
                        //Down - Right
                        if(i + 2 < height && j + 1 < width && (TempGrid[i + 2][j + 1] == 'k' || TempGrid[i + 2][j + 1] == '.')){
                            TempGrid[i+2][j+1] = 'X';
                        }
                        //Down - Left
                        if(i + 2 < height && j - 1 > -1 && (TempGrid[i + 2][j - 1] == 'k' || TempGrid[i + 2][j - 1] == '.')){
                            TempGrid[i+2][j-1] = 'X';
                        }
                        if(i + 1 < height && j - 2 > -1 && (TempGrid[i + 1][j - 2] == 'k' || TempGrid[i + 1][j - 2] == '.')){
                            TempGrid[i+1][j-2] = 'X';
                        }
                        if(i - 1 > -1 && j - 2 > -1 && (TempGrid[i - 1][j - 2] == 'k' || TempGrid[i - 1][j - 2] == '.')){
                            TempGrid[i-1][j-2] = 'X';
                        }
                        if(i + 1 < height && j + 2 < width && (TempGrid[i + 1][j + 2] == 'k' || TempGrid[i + 1][j + 2] == '.')){
                            TempGrid[i+1][j+2] = 'X';
                        }
                        if(i - 1 > -1 && j + 2 < width && (TempGrid[i - 1][j + 2] == 'k' || TempGrid[i - 1][j + 2] == '.')){
                            TempGrid[i-1][j+2] = 'X';
                        }

                    break;
            
                }
            }
        }
    }

    if(TempGrid[Posk.i][Posk.j] == 'X'){

        let Y = Posk.i;
        let X = Posk.j;

        check = true;

        if(Y - 1 > -1 && (TempGrid[Y - 1][X] == '.' || (BIG.includes(TempGrid[Y - 1][X]) && !IsProtected(TempGrid[Y - 1][X], Y - 1, X)))){
            check = false;
        }
        else if(Y + 1 < height && (TempGrid[Y + 1][X] == '.' || (BIG.includes(TempGrid[Y + 1][X]) && !IsProtected(TempGrid[Y + 1][X], Y + 1, X)))){
            check = false;
        }
        else if(X - 1 > -1 && (TempGrid[Y][X - 1] == '.' || (BIG.includes(TempGrid[Y][X - 1]) && !IsProtected(TempGrid[Y][X - 1], Y, X - 1)))){
            check = false;
        }
        else if(X + 1 < width && (TempGrid[Y][X + 1] == '.' || (BIG.includes(TempGrid[Y][X + 1]) && !IsProtected(TempGrid[Y][X + 1], Y, X + 1)))){
            check = false;
        }
        else if(X - 1 > -1 && Y - 1 > -1 && (TempGrid[Y - 1][X - 1] == '.' || (BIG.includes(TempGrid[Y - 1][X - 1]) && !IsProtected(TempGrid[Y - 1][X - 1], Y - 1, X - 1)))){
            check = false;
        }
        else if(X - 1 > -1 && Y + 1 < height && (TempGrid[Y + 1][X - 1] == '.' || (BIG.includes(TempGrid[Y + 1][X - 1]) && !IsProtected(TempGrid[Y + 1][X - 1], Y + 1, X - 1)))){
            check = false;
        }
        else if(X + 1 < width && Y - 1 > -1 && (TempGrid[Y - 1][X + 1] == '.' || (BIG.includes(TempGrid[Y - 1][X + 1]) && !IsProtected(TempGrid[Y - 1][X + 1], Y - 1, X + 1)))){
            check = false;
        }
        else if(X + 1 < width && Y + 1 < height && (TempGrid[Y + 1][X + 1] == '.' || (BIG.includes(TempGrid[Y + 1][X + 1]) && !IsProtected(TempGrid[Y + 1][X + 1], Y + 1, X + 1)))){
            check = false;
        }

        if(check)
            console.log('W');

    }

}
if(check == false){
    console.log("N");
}

function IsProtected(char, y, x){

    if(BIG.includes(char)){

        for(let i = 0; i < height; i++){
            for(let j = 0; j < width; j++){
                if(i != y && j != x && BIG.includes(Grid[i][j])){
                    let attacker = Grid[i][j];

                    switch(attacker){

                    case 'K':

                        if(j - 1 > -1 && j - 1 == x && i == y){
                            return true;
                        }
                        if(j + 1 < width && j + 1 == x && i == y){
                            return true;
                        }
                        if(i - 1 > -1 && j == x && i - 1 == y){
                            return true;
                        }
                        if(i + 1 < width && j == x && i + 1 == y){
                            return true;
                        }
                        if(i - 1 > -1 && j - 1 > -1 && j - 1 == x && i - 1 == y){
                            return true;
                        }
                        if(i - 1 > -1 && j + 1 < width && j + 1 == x && i - 1 == y){
                            return true;
                        }
                        if(i + 1 < height && j - 1 > -1 && j - 1 == x && i + 1 == y){
                            return true;
                        }
                        if(i + 1 < height && j + 1 < width && j + 1 == x && i + 1 == y){
                            return true;
                        }

                    break;

                    case 'P':

                        if(i - 1 > -1 && j - 1 > -1 && j - 1 == x && i - 1 == y){
                            return true;
                        }
                        if(i - 1 > -1 && j + 1 < width && j + 1 == x && i - 1 == y){
                            return true;
                        }
                    break;

                    case 'R':

                        SavedJ = j;
                        //Right
                        while(SavedJ < width && (Grid[i][SavedJ] == '.' 
                        || SavedJ == j || Grid[i][SavedJ] == 'k')){
                            SavedJ++;
                            if(SavedJ < width && i == y && SavedJ == x){
                                return true;
                            }
                        }

                        SavedJ = j;
                        //Left
                        while(SavedJ > -1 && (Grid[i][SavedJ] == '.' 
                        || SavedJ == j || Grid[i][SavedJ] == 'k')){
                            SavedJ--;
                            if(SavedJ > -1 && i == y && SavedJ == x){
                                return true;
                            }
                        }

                        SavedI = i;
                        //Down
                        while(SavedI < height && (Grid[SavedI][j] == '.' 
                        || SavedI == i || Grid[SavedI][j] == 'k')){
                            SavedI++;
                            if(SavedI < height && SavedI == i && j == x){
                                return true;
                            }
                        }

                        SavedI = i;
                        //Up
                        while(SavedI > -1 && (Grid[SavedI][j] == '.' 
                        || SavedI == i || Grid[SavedI][j] == 'k')){
                            SavedI--;
                            if(SavedI > -1 && SavedI == i && j == x){
                                return true;
                            }
                        }
                    break;

                    case 'B':

                        SavedJ = j;
                        SavedI = i;
                        //Right - Up
                        while(SavedJ < width && SavedI > -1 && (Grid[SavedI][SavedJ] == '.' 
                        || (SavedI == i && SavedJ == j) || Grid[SavedI][SavedJ] == 'k')){
                            SavedJ++;
                            SavedI--;
                            if(SavedJ < width && SavedI > -1 && y == SavedI && x == SavedJ){
                                return true;
                            }
                        }

                        SavedJ = j;
                        SavedI = i;
                        //Left - Up
                        while(SavedJ > -1 && SavedI > -1 && (Grid[SavedI][SavedJ] == '.' 
                        || (SavedI == i && SavedJ == j) || Grid[SavedI][SavedJ] == 'k')){
                            SavedJ--;
                            SavedI--;
                            if(SavedJ > -1 && SavedI > -1 && y == SavedI && x == SavedJ){
                                return true;
                            }
                        }

                        SavedJ = j;
                        SavedI = i;
                        //Right - Down
                        while(SavedJ < width && SavedI < width && (Grid[SavedI][SavedJ] == '.' 
                        || (SavedI == i && SavedJ == j) || Grid[SavedI][SavedJ] == 'k')){
                            SavedJ++;
                            SavedI++;
                            if(SavedJ < width && SavedI < width && y == SavedI && x == SavedJ){
                                return true;
                            }
                        }

                        SavedJ = j;
                        SavedI = i;
                        //Left - Down
                        while(SavedJ > -1 && SavedI < width && (Grid[SavedI][SavedJ] == '.' 
                        || (SavedI == i && SavedJ == j) || Grid[SavedI][SavedJ] == 'k')){
                            SavedJ--;
                            SavedI++;
                            if(SavedJ > -1 && SavedI < width && y == SavedI && x == SavedJ){
                                return true;
                            }
                        }
                    break;
                
                    case 'Q':

                        //R

                        SavedJ = j;
                        //Right
                        while(SavedJ < width && (Grid[i][SavedJ] == '.' 
                        || SavedJ == j || Grid[i][SavedJ] == 'k')){
                            SavedJ++;
                            if(SavedJ < width && i == y && SavedJ == x){
                                return true;
                            }
                        }

                        SavedJ = j;
                        //Left
                        while(SavedJ > -1 && (Grid[i][SavedJ] == '.' 
                        || SavedJ == j || Grid[i][SavedJ] == 'k')){
                            SavedJ--;
                            if(SavedJ > -1 && i == y && SavedJ == x){
                                return true;
                            }
                        }

                        SavedI = i;
                        //Down
                        while(SavedI < height && (Grid[SavedI][j] == '.' 
                        || SavedI == i || Grid[SavedI][j] == 'k')){
                            SavedI++;
                            if(SavedI < height && SavedI == i && j == x){
                                return true;
                            }
                        }

                        SavedI = i;
                        //Up
                        while(SavedI > -1 && (Grid[SavedI][j] == '.' 
                        || SavedI == i || Grid[SavedI][j] == 'k')){
                            SavedI--;
                            if(SavedI > -1 && SavedI == i && j == x){
                                return true;
                            }
                        }

                        //B

                        SavedJ = j;
                        SavedI = i;
                        //Right - Up
                        while(SavedJ < width && SavedI > -1 && (Grid[SavedI][SavedJ] == '.' 
                        || (SavedI == i && SavedJ == j) || Grid[SavedI][SavedJ] == 'k')){
                            SavedJ++;
                            SavedI--;
                            if(SavedJ < width && SavedI > -1 && y == SavedI && x == SavedJ){
                                return true;
                            }
                        }

                        SavedJ = j;
                        SavedI = i;
                        //Left - Up
                        while(SavedJ > -1 && SavedI > -1 && (Grid[SavedI][SavedJ] == '.' 
                        || (SavedI == i && SavedJ == j) || Grid[SavedI][SavedJ] == 'k')){
                            SavedJ--;
                            SavedI--;
                            if(SavedJ > -1 && SavedI > -1 && y == SavedI && x == SavedJ){
                                return true;
                            }
                        }

                        SavedJ = j;
                        SavedI = i;
                        //Right - Down
                        while(SavedJ < width && SavedI < width && (Grid[SavedI][SavedJ] == '.' 
                        || (SavedI == i && SavedJ == j) || Grid[SavedI][SavedJ] == 'k')){
                            SavedJ++;
                            SavedI++;
                            if(SavedJ < width && SavedI < width && y == SavedI && x == SavedJ){
                                return true;
                            }
                        }

                        SavedJ = j;
                        SavedI = i;
                        //Left - Down
                        while(SavedJ > -1 && SavedI < width && (Grid[SavedI][SavedJ] == '.' 
                        || (SavedI == i && SavedJ == j) || Grid[SavedI][SavedJ] == 'k')){
                            SavedJ--;
                            SavedI++;
                            if(SavedJ > -1 && SavedI < width && y == SavedI && x == SavedJ){
                                return true;
                            }
                        }


                    break;
                
                    case 'N':

                        //Up - Right
                        if(i - 2 > -1 && j + 1 < width && i - 2 == y && j + 1 == x){
                            return true;
                        }
                        //Up - Left
                        if(i - 2 > -1 && j - 1 > -1 && i - 2 == y && j - 1 == x){
                            return true;
                        }
                        //Down - Right
                        if(i + 2 < height && j + 1 < width && i + 2 == y && j + 1 == x){
                            return true;
                        }
                        //Down - Left
                        if(i + 2 < height && j - 1 > -1 && i + 2 == y && j - 1 == x){
                            return true;
                        }
                        if(i + 1 < height && j - 2 > -1 && i + 1 == y && j - 2 == x){
                            return true;
                        }
                        if(i - 1 > -1 && j - 2 > -1 && i - 1 == y && j - 2 == x){
                            return true;
                        }
                        if(i + 1 < height && j + 2 < width && i + 1 == y && j + 2 == x){
                            return true;
                        }
                        if(i - 1 > -1 && j + 2 < width && i - 1 == y && j + 2 == x){
                            return true;
                        }

                    break;
            
                }

                }
            }
        }
    }
    else{

        for(let i = 0; i < height; i++){
            for(let j = 0; j < width; j++){
                if(i != y && j != x && small.includes(Grid[i][j])){
                    let attacker = Grid[i][j];

                    switch(attacker){

                    case 'k':

                        if(j - 1 > -1 && j - 1 == x && i == y){
                            return true;
                        }
                        if(j + 1 < width && j + 1 == x && i == y){
                            return true;
                        }
                        if(i - 1 > -1 && j == x && i - 1 == y){
                            return true;
                        }
                        if(i + 1 < width && j == x && i + 1 == y){
                            return true;
                        }
                        if(i - 1 > -1 && j - 1 > -1 && j - 1 == x && i - 1 == y){
                            return true;
                        }
                        if(i - 1 > -1 && j + 1 < width && j + 1 == x && i - 1 == y){
                            return true;
                        }
                        if(i + 1 < height && j - 1 > -1 && j - 1 == x && i + 1 == y){
                            return true;
                        }
                        if(i + 1 < height && j + 1 < width && j + 1 == x && i + 1 == y){
                            return true;
                        }

                    break;

                    case 'p':

                        if(i + 1 < height && j - 1 > -1 && j - 1 == x && i + 1 == y){
                            return true;
                        }
                        if(i + 1 < height && j + 1 < width && j + 1 == x && i + 1 == y){
                            return true;
                        }
                    break;

                    case 'r':

                        SavedJ = j;
                        //Right
                        while(SavedJ < width && (Grid[i][SavedJ] == '.' 
                        || SavedJ == j || Grid[i][SavedJ] == 'K')){
                            SavedJ++;
                            if(SavedJ < width && i == y && SavedJ == x){
                                return true;
                            }
                        }

                        SavedJ = j;
                        //Left
                        while(SavedJ > -1 && (Grid[i][SavedJ] == '.' 
                        || SavedJ == j || Grid[i][SavedJ] == 'K')){
                            SavedJ--;
                            if(SavedJ > -1 && i == y && SavedJ == x){
                                return true;
                            }
                        }

                        SavedI = i;
                        //Down
                        while(SavedI < height && (Grid[SavedI][j] == '.' 
                        || SavedI == i || Grid[SavedI][j] == 'K')){
                            SavedI++;
                            if(SavedI < height && SavedI == i && j == x){
                                return true;
                            }
                        }

                        SavedI = i;
                        //Up
                        while(SavedI > -1 && (Grid[SavedI][j] == '.' 
                        || SavedI == i || Grid[SavedI][j] == 'K')){
                            SavedI--;
                            if(SavedI > -1 && SavedI == i && j == x){
                                return true;
                            }
                        }
                    break;

                    case 'b':

                        SavedJ = j;
                        SavedI = i;
                        //Right - Up
                        while(SavedJ < width && SavedI > -1 && (Grid[SavedI][SavedJ] == '.' 
                        || (SavedI == i && SavedJ == j) || Grid[SavedI][SavedJ] == 'K')){
                            SavedJ++;
                            SavedI--;
                            if(SavedJ < width && SavedI > -1 && y == SavedI && x == SavedJ){
                                return true;
                            }
                        }

                        SavedJ = j;
                        SavedI = i;
                        //Left - Up
                        while(SavedJ > -1 && SavedI > -1 && (Grid[SavedI][SavedJ] == '.' 
                        || (SavedI == i && SavedJ == j) || Grid[SavedI][SavedJ] == 'K')){
                            SavedJ--;
                            SavedI--;
                            if(SavedJ > -1 && SavedI > -1 && y == SavedI && x == SavedJ){
                                return true;
                            }
                        }

                        SavedJ = j;
                        SavedI = i;
                        //Right - Down
                        while(SavedJ < width && SavedI < width && (Grid[SavedI][SavedJ] == '.' 
                        || (SavedI == i && SavedJ == j) || Grid[SavedI][SavedJ] == 'K')){
                            SavedJ++;
                            SavedI++;
                            if(SavedJ < width && SavedI < width && y == SavedI && x == SavedJ){
                                return true;
                            }
                        }

                        SavedJ = j;
                        SavedI = i;
                        //Left - Down
                        while(SavedJ > -1 && SavedI < width && (Grid[SavedI][SavedJ] == '.' 
                        || (SavedI == i && SavedJ == j) || Grid[SavedI][SavedJ] == 'K')){
                            SavedJ--;
                            SavedI++;
                            if(SavedJ > -1 && SavedI < width && y == SavedI && x == SavedJ){
                                return true;
                            }
                        }
                    break;
                
                    case 'q':

                        //R

                        SavedJ = j;
                        //Right
                        while(SavedJ < width && (Grid[i][SavedJ] == '.' 
                        || SavedJ == j || Grid[i][SavedJ] == 'K')){
                            SavedJ++;
                            if(SavedJ < width && i == y && SavedJ == x){
                                return true;
                            }
                        }

                        SavedJ = j;
                        //Left
                        while(SavedJ > -1 && (Grid[i][SavedJ] == '.' 
                        || SavedJ == j || Grid[i][SavedJ] == 'K')){
                            SavedJ--;
                            if(SavedJ > -1 && i == y && SavedJ == x){
                                return true;
                            }
                        }

                        SavedI = i;
                        //Down
                        while(SavedI < height && (Grid[SavedI][j] == '.' 
                        || SavedI == i || Grid[SavedI][j] == 'K')){
                            SavedI++;
                            if(SavedI < height && SavedI == i && j == x){
                                return true;
                            }
                        }

                        SavedI = i;
                        //Up
                        while(SavedI > -1 && (Grid[SavedI][j] == '.' 
                        || SavedI == i || Grid[SavedI][j] == 'K')){
                            SavedI--;
                            if(SavedI > -1 && SavedI == i && j == x){
                                return true;
                            }
                        }

                        //B

                        SavedJ = j;
                        SavedI = i;
                        //Right - Up
                        while(SavedJ < width && SavedI > -1 && (Grid[SavedI][SavedJ] == '.' 
                        || (SavedI == i && SavedJ == j) || Grid[SavedI][SavedJ] == 'K')){
                            SavedJ++;
                            SavedI--;
                            if(SavedJ < width && SavedI > -1 && y == SavedI && x == SavedJ){
                                return true;
                            }
                        }

                        SavedJ = j;
                        SavedI = i;
                        //Left - Up
                        while(SavedJ > -1 && SavedI > -1 && (Grid[SavedI][SavedJ] == '.' 
                        || (SavedI == i && SavedJ == j) || Grid[SavedI][SavedJ] == 'K')){
                            SavedJ--;
                            SavedI--;
                            if(SavedJ > -1 && SavedI > -1 && y == SavedI && x == SavedJ){
                                return true;
                            }
                        }

                        SavedJ = j;
                        SavedI = i;
                        //Right - Down
                        while(SavedJ < width && SavedI < width && (Grid[SavedI][SavedJ] == '.' 
                        || (SavedI == i && SavedJ == j) || Grid[SavedI][SavedJ] == 'K')){
                            SavedJ++;
                            SavedI++;
                            if(SavedJ < width && SavedI < width && y == SavedI && x == SavedJ){
                                return true;
                            }
                        }

                        SavedJ = j;
                        SavedI = i;
                        //Left - Down
                        while(SavedJ > -1 && SavedI < width && (Grid[SavedI][SavedJ] == '.' 
                        || (SavedI == i && SavedJ == j) || Grid[SavedI][SavedJ] == 'K')){
                            SavedJ--;
                            SavedI++;
                            if(SavedJ > -1 && SavedI < width && y == SavedI && x == SavedJ){
                                return true;
                            }
                        }


                    break;
                
                    case 'n':

                        //Up - Right
                        if(i - 2 > -1 && j + 1 < width && i - 2 == y && j + 1 == x){
                            return true;
                        }
                        //Up - Left
                        if(i - 2 > -1 && j - 1 > -1 && i - 2 == y && j - 1 == x){
                            return true;
                        }
                        //Down - Right
                        if(i + 2 < height && j + 1 < width && i + 2 == y && j + 1 == x){
                            return true;
                        }
                        //Down - Left
                        if(i + 2 < height && j - 1 > -1 && i + 2 == y && j - 1 == x){
                            return true;
                        }
                        if(i + 1 < height && j - 2 > -1 && i + 1 == y && j - 2 == x){
                            return true;
                        }
                        if(i - 1 > -1 && j - 2 > -1 && i - 1 == y && j - 2 == x){
                            return true;
                        }
                        if(i + 1 < height && j + 2 < width && i + 1 == y && j + 2 == x){
                            return true;
                        }
                        if(i - 1 > -1 && j + 2 < width && i - 1 == y && j + 2 == x){
                            return true;
                        }

                    break;
            
                }

                }
            }
        }

    }

    return false;

}
