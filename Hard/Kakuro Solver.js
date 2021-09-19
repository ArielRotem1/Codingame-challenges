
function solve(){ // Good old backtracking
    for (let y = 0; y < H; y++)
        for (let x = 0; x < W; x++) {
            //If there is no value in the current pos (X, or sum)
            //or there is already number there (not empty)
            if (!Kakuro[y][x].isValue || Kakuro[y][x].value) 
                continue;
            let first = true;
            let options = new Set();
            let temp;
            for (const constraint of Kakuro[y][x].constraints) {
                //Our options for the current cell
                const cOptions = constraint.getOptions();
                if (!cOptions || !cOptions.length) 
                    return null;
                if (first) {
                    first = false;
                    cOptions.forEach(o => options.add(o));
                }
                else {
                    temp = options;
                    options = new Set();
                    cOptions.forEach(o => { 
                        if (temp.has(o)) 
                            options.add(o) 
                    });
                }
            }
            for (const option of options) {
                Kakuro[y][x].value = option;
                if (solve()) 
                    return Kakuro;
            }
            Kakuro[y][x].value = 0;
            return null;
        }
    return Kakuro;
}

const SUMINV = [9, 17, 24, 30, 35, 39, 42, 44, 45];

let Kakuro = [];

let constraints = [];

const SUM = [0, 1, 3, 6, 10, 15, 21, 28, 36, 45, 55];

//Creating a class
class Constraint {
    constructor(x, y, dx, dy, total) {
        this.x = x; 
        this.y = y; 
        this.dx = dx; 
        this.dy = dy; 
        this.total = total; 
        this.cells = []; 
    }

    init(Kakuro){
        let x1 = this.x + this.dx;
        let y1 = this.y + this.dy;
        while (y1 < H && x1 < W && Kakuro[y1][x1].isValue) {
            this.cells.push(Kakuro[y1][x1]);
            Kakuro[y1][x1].constraints.push(this);
            x1 += this.dx;
            y1 += this.dy;
        }
    }

    getOptions(){
        let values = 0;
        let sum = 0;
        for (const cell of this.cells)
            if (cell.value) {
                values++; 
                sum += cell.value; 
            }
        //calc how many cells need to be filled
        const avail = this.cells.length - values;
        //calc the current sum after decarising him
        //by the values already been found
        const rest = this.total - sum;
        //if there is just one cell remaining to fill
        if (avail == 1) {
            //if the value should be greater or equal to ten or
            //there is already the same value in the current row or column
            //of cells
            if (rest >= 10 || this.cells.some(c => c.value === rest)) 
                return null;
            return [rest];
        }
        const result = [];
        for (let i = Math.max(1, rest - SUMINV[avail - 1]); i <= Math.min(9, rest - SUM[avail - 1]); i++)
            if (!this.cells.some(c => c.value === i))
                result.push(i);
        return result;
    }
}

var inputs = readline().split(' ');
const H = parseInt(inputs[0]);
const W = parseInt(inputs[1]);
for (let i = 0; i < H; i++) {
    const line = readline();

    let Row = [];

    let tokens = line.split('|');
    tokens = tokens.slice(1, tokens.length - 1);

    for(let j = 0; j < tokens.length; j++){
        let token = tokens[j].trim();

        let cell = {isValue: false, value: token}

        if(token != 'X'){
            if(token.includes('\\')){
                //Sum
                let match = [token.slice(0,token.indexOf('\\')), 
                token.slice(token.indexOf('\\') + 1,token.length)];

                if (match[0])
                    //Sum Down
                    constraints.push(new Constraint(j, i, 0, 1, +match[0]));

                if (match[1])
                    //Sum Right
                    constraints.push(new Constraint(j, i, 1, 0, +match[1]));
            }
            else{
                //Empty
                cell.isValue = true;
                cell.value = +token || 0;
                cell.constraints = [];
            }
        }
        Row[j] = cell;
    }
    Kakuro[i] = Row;
}

// Write an answer using console.log()
// To debug: console.error('Debug messages...');


constraints.forEach(constraint => constraint.init(Kakuro));

//Calling the solve function
const result = solve();

//Showing the output
for(let i = 0; i < H; i++){
    let line = "";
    for(let j = 0; j < W; j++){
        

        let cell = "";

        if(result[i][j].value == 'X'){
            line += "X";
        }
        else if(result[i][j].isValue == true){
            line += result[i][j].value;
        }
        else{
            let token = result[i][j].value;
            let match = [token.slice(0,token.indexOf('\\')), 
            token.slice(token.indexOf('\\') + 1,token.length)];
            line += match[0] + "\\" + match[1];
        }

        if(j != W - 1){
            line += ',';
        }

    }
    console.log(line);
}
