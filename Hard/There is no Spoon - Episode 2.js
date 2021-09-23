/**
 * The machines are gaining ground. Time to show them what we're really made of...
 **/

class Node{

    constructor(Value, x, y){
        this.Value = Value;
        this.x = x;
        this.y = y;
        this.Connections = [];
        this.CanConnectTo = [];
    }

    FindCanConnectTo(Nodes, Grid){

        //Up
        for(let i = this.y - 1; i > -1; i--){
            if(Grid[i][this.x] != '.'){
                let node = FindNode(i, this.x, Nodes);
                if(!this.IsConnectTo(node)){
                    this.AddCanConnect(node);
                    node.AddCanConnect(this);
                }

                break;
            }
        }

        //Down
        for(let i = this.y + 1; i < height; i++){
            if(Grid[i][this.x] != '.'){
                let node = FindNode(i, this.x, Nodes);
                if(!this.IsConnectTo(node)){
                    this.AddCanConnect(node);
                    node.AddCanConnect(this);
                }

                break;
            }
        }

        //Left
        for(let j = this.x - 1; j > -1; j--){
            if(Grid[this.y][j] != '.'){
                let node = FindNode(this.y, j, Nodes);
                if(!this.IsConnectTo(node)){
                    this.AddCanConnect(node);
                    node.AddCanConnect(this);
                }

                break;
            }
        }

        //Right
        for(let j = this.x + 1; j < width; j++){
            if(Grid[this.y][j] != '.'){
                let node = FindNode(this.y, j, Nodes);
                if(!this.IsConnectTo(node)){
                    this.AddCanConnect(node);
                    node.AddCanConnect(this);
                }

                break;
            }
        }
    }

    AddCanConnect(node){
        let XY = [];
        XY.push(node.x);
        XY.push(node.y);
        this.CanConnectTo.push(XY);
    }

    IsConnectTo(node){
        for(let i = 0; i < this.CanConnectTo.length; i++){
            if(this.CanConnectTo[i][0] == node.x && 
            this.CanConnectTo[i][1] == node.y) return true;
        }
        return false;
    }

    DoConnection(node, NumberOfConnection){

        node.Value -= NumberOfConnection;
        this.Value -= NumberOfConnection;

        let XY = [];
        XY.push(node.x);
        XY.push(node.y);

        this.Connections.push(XY);

        XY = [];
        XY.push(this.x);
        XY.push(this.y);

        node.Connections.push(XY);

        return "" + this.x + " " + this.y + " " + node.x + " " + node.y + " " + NumberOfConnection;
    }

}

let Nodes = [];
let Grid = [];
const width = +(readline()); // the number of cells on the X axis
const height = +(readline()); // the number of cells on the Y axis
for (let i = 0; i < height; i++) {
    // width characters, each either a number or a '.'

    let line = readline();

    let arr = [];

    for(let j = 0; j < width; j++){
        if(Number.isInteger((+line[j]))){
            let node = new Node(+(line[j]), j, i);
            Nodes.push(node);
            arr[j] = node;
        }
        else{
           arr[j] = line[j];
        }
    }

    Grid[i] = arr;
}


//Find for each Node to who he can be connected
for(let i = 0; i < Nodes.length; i++){
    Nodes[i].FindCanConnectTo(Nodes, Grid);
}

// Write an action using console.log()
// To debug: console.error('Debug messages...');

let check = true;
while(check){
    check = false;

    for(let i = 0; i < Nodes.length; i++){
        let node = Nodes[i];
        if(node.Value == 0) continue;

        if(GetMaxConnections(node) == node.Value){
            for(let j = 0; j < node.CanConnectTo.length; j++){
                let XY = node.CanConnectTo[j];
                let node2 = FindNode(XY[1], XY[0], Nodes);
                
                if(node2.Value == 0) continue;
                if(CantPass(Nodes, node, node2)) continue;

                check = true;

                let MaxConnect = 2;

                if(node.Value < 2 || node2.Value < 2)
                    MaxConnect = 1;

                let com = node.DoConnection(node2, MaxConnect);

                console.log(com);
            }


            //erase all connections
            for(let j = node.CanConnectTo.length - 1; j > -1; j--){
                let XY = node.CanConnectTo[j];
                let node2 = FindNode(XY[1], XY[0], Nodes);

                //erase the connection from the other node
                for(let k = 0; k < node2.CanConnectTo.length; k++){
                    if(node2.CanConnectTo[k][0] == node.x &&
                    node2.CanConnectTo[k][1] == node.y){
                        node2.CanConnectTo.splice(k, 1);
                        break;
                    }
                }

                if(node2.Value == 0){

                    for(let z = node2.CanConnectTo.length - 1; z > -1; z--){
                        let XY = node2.CanConnectTo[z];
                        let node3 = FindNode(XY[1], XY[0], Nodes);

                        //erase the connection from the other node
                        for(let b = 0; b < node3.CanConnectTo.length; b++){
                            if(node3.CanConnectTo[b][0] == node2.x &&
                            node3.CanConnectTo[b][1] == node2.y){
                                node3.CanConnectTo.splice(b, 1);
                                break;
                            }
                        }

                        node2.CanConnectTo.splice(z, 1);
                    }
                }

                node.CanConnectTo.splice(j, 1);
            }
        }
    }
}



let Conn = Solve([], 0);

for(let i = 0; i < Conn.length; i++){
    console.log(Conn[i]);
}
// Two coordinates and one integer: a node, one of its neighbors, the number of links connecting them.

function FindNode(i, j, nodes){
    for(let k = 0; k < nodes.length; k++){
        if(nodes[k].x == j && nodes[k].y == i){
            return nodes[k];
        }
    }
}

function GetMaxConnections(node){

    let Max = 0;

    for(let i = 0; i < node.CanConnectTo.length; i++){
        let XY = node.CanConnectTo[i];
        let node2 = FindNode(XY[1], XY[0], Nodes);
        if(node2.Value == 0) continue;
        if(CantPass(Nodes, node, node2)) continue;

        let MaxConnect = 2;

        if(node.Value < 2 || node2.Value < 2)
            MaxConnect = 1;

        Max += MaxConnect;
    }

    return Max;
}

function CopyNodes(nodes, bool){

    let copy = [];

    if(bool){
        Nodes = [];
    }

    for(let i = 0; i < nodes.length; i++){
        let n = nodes[i];

        let Connections = n.Connections;
        let ConnectionsArr = [];
        for(let j = 0; j < Connections.length; j++){
            ConnectionsArr[j] = Connections[j].slice();
        }

        let CanConnectTo = n.CanConnectTo;
        let CanConnectToArr = [];
        for(let j = 0; j < CanConnectTo.length; j++){
            CanConnectToArr[j] = CanConnectTo[j].slice();
        }

        let newNode = new Node(n.Value, n.x, n.y);
        newNode.CanConnectTo = CanConnectToArr;
        newNode.Connections = ConnectionsArr;

        if(!bool)
            copy[i] = newNode;
        else
            Nodes.push(newNode);
    }

    if(!bool)
        return copy;
}

function NoEnoughConnections(node, node2){

    if(GetMaxConnections(node) < node.Value) return true;

    for(let i = 0; i < node.CanConnectTo.length; i++){
        let XY =  node.CanConnectTo[i];
        let n = FindNode(XY[1], XY[0], Nodes);
        if(GetMaxConnections(n) < n.Value) return true;
    }

    if(GetMaxConnections(node2) < node2.Value) return true;

    for(let i = 0; i < node2.CanConnectTo.length; i++){
        let XY =  node2.CanConnectTo[i];
        let n = FindNode(XY[1], XY[0], Nodes);
        if(GetMaxConnections(n) < n.Value) return true;
    }

    return false;
}

function Solve(Connections, depth){

    if(depth != 0){
        let check = true;
        while(check){
            check = false;

            for(let i = 0; i < Nodes.length; i++){
                let node = Nodes[i];
                if(node.Value == 0) continue;

                let MaxConnections = GetMaxConnections(node);

                if(MaxConnections == node.Value){
                    for(let j = 0; j < node.CanConnectTo.length; j++){
                        let XY = node.CanConnectTo[j];
                        let node2 = FindNode(XY[1], XY[0], Nodes);

                        if(node2.Value == 0) continue;
                        if(CantPass(Nodes, node, node2)) continue;

                        check = true;

                        let MaxConnect = 2;

                        if(node.Value < 2 || node2.Value < 2)
                            MaxConnect = 1;

                        let com = node.DoConnection(node2, MaxConnect);
                        if(NoEnoughConnections(node, node2) || Try(node) == false)
                            return "";
                        Connections.push(com);
                    }
                    //erase all connections
                    for(let j = node.CanConnectTo.length - 1; j > -1; j--){
                        let XY = node.CanConnectTo[j];
                        let node2 = FindNode(XY[1], XY[0], Nodes);

                        //erase the connection from the other node
                        for(let k = 0; k < node2.CanConnectTo.length; k++){
                            if(node2.CanConnectTo[k][0] == node.x &&
                            node2.CanConnectTo[k][1] == node.y){
                                node2.CanConnectTo.splice(k, 1);
                                break;
                            }
                        }

                        if(node2.Value == 0){

                            for(let z = node2.CanConnectTo.length - 1; z > -1; z--){
                                let XY = node2.CanConnectTo[z];
                                let node3 = FindNode(XY[1], XY[0], Nodes);

                                //erase the connection from the other node
                                for(let b = 0; b < node3.CanConnectTo.length; b++){
                                    if(node3.CanConnectTo[b][0] == node2.x &&
                                    node3.CanConnectTo[b][1] == node2.y){
                                        node3.CanConnectTo.splice(b, 1);
                                        break;
                                    }
                                }

                                node2.CanConnectTo.splice(z, 1);
                            }
                        }

                        node.CanConnectTo.splice(j, 1);
                    }
                }
                else if(MaxConnections < node.Value){
                    return "";
                }
            }
        }
    }

    let SavedNodes = CopyNodes(Nodes);
    let SavedConnections = Connections.slice();

    let Good = true;

    for(let i = 0; i < Nodes.length; i++){
        let node = Nodes[i];
        if(node.Value == 0) continue;

        /*console.error()
        console.error("node:")
        console.error(node)
        console.error()*/

        Good = false;

        let CanConnectTo = [];
        for(let j = 0; j < node.CanConnectTo.length; j++){
            CanConnectTo[j] = node.CanConnectTo[j].slice();
        }
        

        for(let a = CanConnectTo.length - 1; a > -1; a--){
            let XY = CanConnectTo[a];
            let node2 = FindNode(XY[1], XY[0], Nodes);

            if(node2.Value == 0) continue;

            if(node.Value >= 2 && node2.Value >= 2){

                //2
                let Connection = node.DoConnection(node2, 2);

                //console.error()
                //console.error("Connection 2: "+Connection)
                //console.error()

                if(node.Value == 0){
                    //erase all connections
                    for(let j = node.CanConnectTo.length - 1; j > -1; j--){
                        let XY = node.CanConnectTo[j];
                        let node2 = FindNode(XY[1], XY[0], Nodes);

                        if(node2.Value == 0){

                            for(let z = node2.CanConnectTo.length - 1; z > -1; z--){
                                let XY = node2.CanConnectTo[z];
                                let node3 = FindNode(XY[1], XY[0], Nodes);

                                //erase the connection from the other node
                                for(let b = 0; b < node3.CanConnectTo.length; b++){
                                    if(node3.CanConnectTo[b][0] == node2.x &&
                                    node3.CanConnectTo[b][1] == node2.y){
                                        node3.CanConnectTo.splice(b, 1);
                                        break;
                                    }
                                }

                                node2.CanConnectTo.splice(z, 1);
                            }
                        }
                        else{
                            //erase the connection from the other node
                            for(let k = 0; k < node2.CanConnectTo.length; k++){
                                if(node2.CanConnectTo[k][0] == node.x &&
                                node2.CanConnectTo[k][1] == node.y){
                                    node2.CanConnectTo.splice(k, 1);
                                    break;
                                }
                            }
                        }

                        node.CanConnectTo.splice(j, 1);
                    }
                }
                else{
                    for(let k = 0; k < node2.CanConnectTo.length; k++){
                        if(node2.CanConnectTo[k][0] == node.x &&
                        node2.CanConnectTo[k][1] == node.y){
                            node2.CanConnectTo.splice(k, 1);
                            break;
                        }
                    }

                    node.CanConnectTo.splice(a, 1);
                }

                if(NoEnoughConnections(node, node2) || Try(node) == false
                || CantPass(Nodes, node, node2)){
                    CopyNodes(SavedNodes, true);

                    node = Nodes[i];
                    let XY = CanConnectTo[a];
                    node2 = FindNode(XY[1], XY[0], Nodes);
                }
                else{
                    Connections.push(Connection);

                    let Worked = Solve(Connections, depth + 1);

                    if(Worked != "")
                        return Worked;

                    Connections = SavedConnections.slice();
                    CopyNodes(SavedNodes, true);

                    node = Nodes[i];
                    let XY = CanConnectTo[a];
                    node2 = FindNode(XY[1], XY[0], Nodes);
                }
            }
            //1
            Connection = node.DoConnection(node2, 1);
            //console.error()
            //console.error("Connection 11: "+Connection)
            //console.error()

            if(node.Value == 0){
                    //erase all connections
                    for(let j = node.CanConnectTo.length - 1; j > -1; j--){
                        let XY = node.CanConnectTo[j];
                        let node2 = FindNode(XY[1], XY[0], Nodes);

                        if(node2.Value == 0){

                            for(let z = node2.CanConnectTo.length - 1; z > -1; z--){
                                let XY = node2.CanConnectTo[z];
                                let node3 = FindNode(XY[1], XY[0], Nodes);

                                //erase the connection from the other node
                                for(let b = 0; b < node3.CanConnectTo.length; b++){
                                    if(node3.CanConnectTo[b][0] == node2.x &&
                                    node3.CanConnectTo[b][1] == node2.y){
                                        node3.CanConnectTo.splice(b, 1);
                                        break;
                                    }
                                }

                                node2.CanConnectTo.splice(z, 1);
                            }
                        }
                        else{
                            //erase the connection from the other node
                            for(let k = 0; k < node2.CanConnectTo.length; k++){
                                if(node2.CanConnectTo[k][0] == node.x &&
                                node2.CanConnectTo[k][1] == node.y){
                                    node2.CanConnectTo.splice(k, 1);
                                    break;
                                }
                            }
                        }

                        node.CanConnectTo.splice(j, 1);
                    }
            }
            else{
                    for(let k = 0; k < node2.CanConnectTo.length; k++){
                        if(node2.CanConnectTo[k][0] == node.x &&
                        node2.CanConnectTo[k][1] == node.y){
                            node2.CanConnectTo.splice(k, 1);
                            break;
                        }
                    }

                    node.CanConnectTo.splice(a, 1);
            }

            if(NoEnoughConnections(node, node2) || Try(node) == false
            || CantPass(Nodes, node, node2)){
                    CopyNodes(SavedNodes, true);

                    node = Nodes[i];
                    let XY = CanConnectTo[a];
                    node2 = FindNode(XY[1], XY[0], Nodes);
            }
            else{
                    Connections.push(Connection);

                    let Worked = Solve(Connections, depth + 1);

                    if(Worked != "")
                        return Worked;

                    Connections = SavedConnections.slice();
                    CopyNodes(SavedNodes, true);

                    node = Nodes[i];
                    let XY = CanConnectTo[a];
                    node2 = FindNode(XY[1], XY[0], Nodes);
            }
        }
    }

    if(Good)
        return Connections;
    else
        return "";
}

function Try(node){

    let Visited = [];

    let XY = [];
    XY.push(node.x);
    XY.push(node.y);

    Visited.push(XY);

    let Queue = [];
    Queue.push(XY);

    while(Queue.length != 0){
        let XY = Queue.shift();
        let n = FindNode(XY[1], XY[0], Nodes);
        let connections = n.Connections;

        if(n.CanConnectTo != 0){
            return true;
        }

        for(let i = 0; i < connections.length; i++){
            if(!InSet(connections[i], Visited)){
                let NextNode = FindNode(connections[i][1], connections[i][0], Nodes);
                if(NextNode.Value != 0){
                    return true;
                }

                Visited.push(connections[i]);
                Queue.push(connections[i]);
            }
        }
    }

    return false;
}

function CantPass(nodes, Node, Node2){

    if(Node.y == Node2.y){
        let StartX = Math.min(Node.x, Node2.x);
        let EndX = Math.max(Node.x, Node2.x);

        for(let i = 0; i < nodes.length; i++){
            let n = nodes[i];
            if(n.x > StartX && n.x < EndX){
                let connections = n.Connections;
                for(let j = 0; j < connections.length; j++){
                    if(connections[j][0] == n.x){
                        if(n.y > Node.y && connections[j][1] < Node.y){
                            return true;
                        }
                        else if(n.y < Node.y && connections[j][1] > Node.y){
                            return true;
                        }
                    }
                }
            }
        }
    }
    else{
        let StartY = Math.min(Node.y, Node2.y);
        let EndY = Math.max(Node.y, Node2.y);


        for(let i = 0; i < nodes.length; i++){
            let n = nodes[i];
            if(n.y > StartY && n.y < EndY){
                let connections = n.Connections;
                for(let j = 0; j < connections.length; j++){
                    if(connections[j][1] == n.y){
                        if(n.x > Node.x && connections[j][0] < Node.x){
                            return true;
                        }
                        else if(n.x < Node.x && connections[j][0] > Node.x){
                            return true;
                        }
                    }
                }
            }
        }
    }

    return false;
}

function InSet(connection, Visited){

    for(let i = 0; i < Visited.length; i++){
        if(Visited[i][0] == connection[0] &&
        Visited[i][1] == connection[1]) return true;
    }
    return false;
}
