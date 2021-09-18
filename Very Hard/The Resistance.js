/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

 var Alphabet = [
  ".-", "-...", "-.-.", "-..", ".", "..-.", "--.", "....",
  "..", ".---", "-.-", ".-..", "--", "-.", "---", ".--.",
  "--.-", ".-.", "...", "-", "..-", "...-", ".--", "-..-",
  "-.--", "--.."
];

const L = readline();
const N = parseInt(readline());
var words = new Array(N);
for (let i = 0; i < N; i++) {
    words[i] = readline();
}

// Write an answer using console.log()
// To debug: console.error('Debug messages...');

console.error(L);
console.error();
console.log(solve(0, L, {}));

function morse(s) {
    //Turning regular word to morse code
    var res = "";
    for (var i = 0; i < s.length; i++) {
        res+= Alphabet[s.charCodeAt(i) - 65];
    }
    return res;
}

function solve(start, str, dp) {

    if (start === str.length){
        return 1;
    }

    if (dp[start] !== undefined){
        return dp[start];
    }

    var res = 0;
    for (var i = 0; i < words.length; i++) {
        //console.error("word: "+words[i]);
        let MorseWord = morse(words[i]);
        //console.error("MorseWord: "+MorseWord);
        //console.error(str.substr(start, MorseWord.length));
        if (str.substr(start, MorseWord.length) === MorseWord) {
            res += solve(start + MorseWord.length, str, dp);
            //console.error(res);
        }
    }
    return dp[start] = res;
}





