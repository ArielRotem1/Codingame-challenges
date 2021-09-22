/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

const N = parseInt(readline());
let Arr = readline().split(' ').map(x=>parseInt(x));

let carsOrder = [];

let longestLen = 1;

for(let i = 0; i < Arr.length; i++){
    let carVal = Arr[i];


    let arrBig_Front = [[carVal]];
    let arrSmall_Rear = [[carVal]];

    for(let j = i + 1; j < Arr.length; j++){
        let carV = Arr[j];

        if(carV > carVal){
            //arrBig_Front
            let mone = arrBig_Front.length - 1;
            while(mone > -1){
                let arr = arrBig_Front[mone];
                let len_arr = arr.length;

                let cantAdd = false;

                if(carV > arr[len_arr - 1]){
                    if(arrBig_Front[len_arr] != undefined){
                        let len = arrBig_Front[len_arr].length;
                        let lastItemInArray = arrBig_Front[len_arr][len - 1];
                        let secondLastItemInArray = arrBig_Front[len_arr][len - 2];

                        if(lastItemInArray > carV 
                        && (secondLastItemInArray == undefined || secondLastItemInArray < carV)){
                            arrBig_Front[len_arr][len - 1] = carV;
                            cantAdd = true;
                        }

                        if(lastItemInArray < carV){
                            cantAdd = true;
                        }
                    }

                    if(cantAdd == false){
                        let new_arr = arr.slice();
                        new_arr.push(carV);
                        arrBig_Front[len_arr] = new_arr;
                    }
                }
                mone--;
            }
        }
        else{
            //arrSmall_Rear
            let mone = arrSmall_Rear.length - 1;
            while(mone > -1){
                let arr = arrSmall_Rear[mone];
                let len_arr = arr.length;

                let cantAdd = false;

                if(carV < arr[len_arr - 1]){
                    if(arrSmall_Rear[len_arr] != undefined){
                        let len = arrSmall_Rear[len_arr].length;
                        let lastItemInArray = arrSmall_Rear[len_arr][len - 1];
                        let secondLastItemInArray = arrSmall_Rear[len_arr][len - 2];

                        if(lastItemInArray < carV 
                        && (secondLastItemInArray == undefined || secondLastItemInArray > carV)){
                            arrSmall_Rear[len_arr][len - 1] = carV;
                            cantAdd = true;
                        }
                        
                        if(lastItemInArray > carV){
                            cantAdd = true;
                        }
                    }

                    if(cantAdd == false){
                        let new_arr = arr.slice();
                        new_arr.push(carV);
                        arrSmall_Rear[len_arr] = new_arr;
                    }
                    else if(arr[arr.length - 1] > arrSmall_Rear[mone + 1][arrSmall_Rear[mone + 1].length - 2]){
                        let new_arr = arr.slice();
                        new_arr.push(carV);
                        arrSmall_Rear[len_arr] = new_arr;
                    }
                }
                else{
                    if(arr[len_arr - 2] != undefined && arr[len_arr - 1] != undefined 
                    && arr[len_arr - 2] > carV && arr[len_arr - 1] < carV){
                        arrSmall_Rear[mone][len_arr - 1] = carV;
                    }
                }
                mone--;
            }
        }
    }

    let leng = arrBig_Front[arrBig_Front.length - 1].length + 
               arrSmall_Rear[arrSmall_Rear.length - 1].length - 1;

    if(longestLen < leng){
        longestLen = leng;
    }
}

console.log(longestLen)
