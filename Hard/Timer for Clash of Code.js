/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

const n = parseInt(readline());
let p = 1;
let StartInSec = 0;
for (let i = 0; i < n; i++) {
    const timeStamp = readline();
    let Min = 0;
    let Sec = 0;
    let S = "";
    for(let j = 0; j < timeStamp.length; j++){
        if(timeStamp[j] == ':'){
            Min = parseInt(S);
            S = "";
        }
        else{
            S+=timeStamp[j];
        }
    }
    Sec = parseInt(S);
    let JustSec = Min * 60 + Sec;

    //t - 256 / ( 2^(p - 1) )
    let res = JustSec - 256 / (Math.pow(2,p-1));

    if(StartInSec > JustSec){
        continue;
    }

    StartInSec = res;

    if(p == 7){
        StartInSec = JustSec;
    }

    p++;

}

if(n == 0){
    console.log("NO GAME")
}
else{

// Write an answer using console.log()
// To debug: console.error('Debug messages...');

if(StartInSec < 0){
    StartInSec = 0;
}

    if(StartInSec == 0){
        let s = (Math.floor(StartInSec/60)) + ":" + (StartInSec%60);
        if(s.length != 4){
            s += "0";
        }
        console.log(s);
    }
    else if(StartInSec < 10){
        let s = (Math.floor(StartInSec/60)) + ":0" + (StartInSec%60);
        console.log(s);
    }
    else{
        let s = (Math.floor(StartInSec/60)) + ":" + (StartInSec%60);
        console.log(s);
    }
}
