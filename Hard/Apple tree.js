/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

var inputs = readline().split(' ');
let N = parseInt(inputs[0]);
const index = parseInt(inputs[1]);
let Apples = [];
let FallingApples = [];
for (let i = 0; i < N; i++) {
    var inputs = readline().split(' ');
    const x = parseInt(inputs[0]);
    const y = parseInt(inputs[1]);
    const z = parseInt(inputs[2]);
    const r = parseInt(inputs[3]);
    if(index != i){
        Apples.push({x,y,z,r});
    }
    else{
        FallingApples.push({x,y,z,r});
    }
    
}

let NumberOfApplesDrop = 1;

while(FallingApples.length != 0){
    let FallingApple = FallingApples.shift();

    for(let i = Apples.length - 1; i > -1; i--){

        let dis = Dis(Apples[i].x, Apples[i].y, FallingApple.x, FallingApple.y);
        if(dis - Apples[i].r - FallingApple.r <= 0 && Apples[i].z < FallingApple.z){
            NumberOfApplesDrop++;
            FallingApples.push(Apples.splice(i,1)[0]);
        }
    }
}


console.log(N - NumberOfApplesDrop);

function Dis(x1, y1, x2, y2){

    return Math.sqrt(Math.pow(x1-x2,2) + Math.pow(y1-y2,2));
}
