/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

const N = parseInt(readline());
let Rooms = [];
let Exists = [];
for (let i = 0; i < N; i++) {
    const room = readline();
    let s = "";
    let RoomNumber = -1;
    let Money = -1;
    let EnterRooms = [];
    for(let j = 0; j < room.length; j++){
        if(room[j] == ' '){
            if(RoomNumber == -1){
                RoomNumber = parseInt(s);
                s = "";
            }
            else if(Money == -1){
                Money = parseInt(s);
                s = "";
            }
            else{
                EnterRooms.push(s);
                s = "";
            }
        }
        else{
            s += room[j];
        }
    }

    EnterRooms.push(s);

    Rooms[RoomNumber] = {RoomNumber, Money, EnterRooms, BestValue: Money};
    
    if(EnterRooms[0] == 'E' || EnterRooms[1] == 'E'){
        Exists.push(RoomNumber);
    }
}


// Write an answer using console.log()
// To debug: console.error('Debug messages...');

let Max = 0;

GetMax(Rooms[0].Money, 0)

console.log(Max);

function GetMax(Sum, RoomN){

    let NextRoomOptions = Rooms[RoomN].EnterRooms;

    Rooms[RoomN].BestValue = Sum;

    for(let i = 0; i < NextRoomOptions.length; i++){
        if(NextRoomOptions[i] == 'E'){
            NextRoomOptions[i].BestValue = Sum;
            if(Sum > Max){
                Max = Sum;
            }
        }
        else{
            let RoomN = parseInt(NextRoomOptions[i]);
            if(Rooms[RoomN].BestValue < Sum + Rooms[RoomN].Money)
                GetMax(Sum + Rooms[RoomN].Money, RoomN);
        }
    }

}
