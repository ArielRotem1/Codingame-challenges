/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

function GetActions1(order){

    let action = "";
    for(let i = 0; i < order.length; i++){
        if(order[i] == ' '){
            break;
        }
        else{
            action += order[i];
        }
    }

    return action;
}

function GetActions2(order){

    let space1 = false;
    let space2 = false;
    let action = "";
    for(let i = 0; i < order.length; i++){
        if(order[i] == ' ' && space1 == false){
            space1 = true;
        }
        else if(order[i] == ' ' && space2 == false){
            space2 = true;
        }
        else if(space1 && space2){
            action += order[i];
        }
    }

    return action;
}

function GetAfterOrBefore(order){

    let space1 = false;
    let action = "";
    for(let i = 0; i < order.length; i++){
        if(order[i] == ' ' && space1 == false){
            space1 = true;
        }
        else if(order[i] == ' ' && space1 == true){
            break;
        }
        else if(space1){
            action += order[i];
        }
    }

    return action;
}

let Result = [];
let Actions = [];
const N = parseInt(readline());
for (let i = 0; i < N; i++) {
    const action = readline();
    let a = action;
    Actions.push(a);
}
let Orders = [];
const nbOrders = parseInt(readline());
for (let i = 0; i < nbOrders; i++) {
    const order = readline();
    let o = order;
    Orders.push(o);

}



let Order = [];

for(let i = 0; i < Actions.length; i++){
    Order[i] = i;
}

while(true){

    console.error();
    console.error("Order: "+Order);
    console.error();

    let OrderOfActions = [];

    for(let i = 0; i < Order.length; i++){
        OrderOfActions.push(Actions[Order[i]]);
    }

    console.error();
    console.error("OrderOfActions: "+OrderOfActions);
    console.error();

    if(Check(OrderOfActions, Orders)){
        for(let i = 0; i < OrderOfActions.length; i++){
            console.log(OrderOfActions[i]);
        }
        break;
    }

    let LargestX = -1;

    for(let x = 0; x < Order.length-1; x++){
        if(Order[x] < Order[x+1]){
            LargestX = x;
        }
    }

    //console.error();
    //console.error("LargestX: "+LargestX);
    //console.error();

    if(LargestX == -1){
        //Finish
        break;
    }

    let LargestY = -1;

    for(let y = 0; y < Order.length; y++){
        if(Order[LargestX] < Order[y]){
            LargestY = y;
        }
    }

    //console.error();
    //console.error("LargestY: "+LargestY);
    //console.error();

    let Temp = Order[LargestX];
    Order[LargestX] = Order[LargestY];
    Order[LargestY] = Temp;

    let ReversedOrder = (Order.slice(LargestX+1)).reverse();

    let remainOrder = Order.slice(0,LargestX+1);

    /*console.error();
    console.error("ReversedOrder: "+ReversedOrder);
    console.error();

    console.error();
    console.error("remainOrder: "+remainOrder);
    console.error();*/

    Order = remainOrder.concat(ReversedOrder).slice();

}



/*for(let i = 0; i < Actions.length; i++){
    let Arr = [];

    for(let j = 0; j < )

}*/

/*while(Result.length != N){

    for (let i = 0; i < Orders.length; i++) {
        let o = Orders[i];

        let Action1 = GetActions1(o);
        let Action2 = GetActions2(o);
        let AfterOrBefore = GetAfterOrBefore(o);

        if(Action1AlreadyInResult(Action1) && !Action2AlreadyInResult(Action2)){
            if(AfterOrBefore == "before"){
                Result.push(Action2);
            }
            else if(AfterOrBefore == "after"){
                Result.unshift(Action2);
            }
        }
        else if(Action2AlreadyInResult(Action2) && !Action1AlreadyInResult(Action1)){
            if(AfterOrBefore == "before"){
                Result.unshift(Action1);
            }
            else if(AfterOrBefore == "after"){
                Result.push(Action1);
            }
        }

        console.error();
        console.error("Action1: "+Action1);
        console.error("AfterOrBefore: "+AfterOrBefore);
        console.error("Action2: "+Action2);
        console.error();

        console.error();
        console.error("Result: "+Result);
        console.error("Result.length: "+Result.length);
        console.error();
    }

}*/

/*for(let i = 0; i < Result.length; i++){
    console.log(Result[i]);
}*/

// Write an answer using console.log()
// To debug: console.error('Debug messages...');

function Action1AlreadyInResult(Action1){

    for(let i = 0; i < Result.length; i++){
        if(Result[i] == Action1){
            return true;
        }
    }

    return false;

}

function Action2AlreadyInResult(Action2){

    for(let i = 0; i < Result.length; i++){
        if(Result[i] == Action2){
            return true;
        }
    }

    return false;

}

function Check(OrderOfActions, Orders){

    for(let i = 0; i < Orders.length; i++){
        let order = Orders[i];
        let Action1 = GetActions1(order);
        let Action2 = GetActions2(order);
        let AfterOrBefore = GetAfterOrBefore(order);

        let Action1Index = -1;
        let Action2Index = -1;

        for(let j = 0 ; j < OrderOfActions.length; j++){
            if(Action1 == OrderOfActions[j]){
                Action1Index = j
            }
            if(Action2 == OrderOfActions[j]){
                Action2Index = j;
            }
            if(Action1Index != -1 && Action2Index != -1){
                break;
            }
        }

        if(AfterOrBefore == "before"){
            if(Action1Index > Action2Index){
                return false;
            }
        }
        else if(AfterOrBefore == "after"){
            if(Action1Index < Action2Index){
                return false;
            }
        }
    }

    return true;

}
