using System;
using System.Linq;
using System.IO;
using System.Text;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;

class Pos{

    public int y;
    public int x;

    public Pos(int y, int x){
        this.y = y;
        this.x = x;
    }

    public override string ToString(){
        return "y: " + y + " x: " + x;
    }

}

class State{

    public Cell[,] Grid;
    public int length;

    public State(Cell[,] Grid){
        length = Grid.GetLength(0);
        this.Grid = new Cell[length, length];
        for(int i = 0; i < length; i++){
            for(int j = 0; j < length; j++){
                this.Grid[i, j] = new Cell(Grid[i, j].sign, Grid[i, j].num, Grid[i, j].id);
            }
        }
    }

    public bool equal(State state){

        for(int i = 0; i < length; i++){
            for(int j = 0; j < length; j++){
                if(Grid[i, j].num != state.Grid[i, j].num){
                    return false;
                }
            }
        }

        return true;
    }

    public void ShowGrid(){
        for(int i = 0; i < length; i++){
            for(int j = 0; j < length; j++){
                Console.Error.Write(Grid[i, j].sign);
            }
            Console.Error.WriteLine();
        }
    }

}

class Cell{

    public char sign; 
    public int num;
    public int id;

    public Cell(char sign, int num, int id){
        this.sign = sign;
        this.num = num;
        this.id = id;
    }

    public override string ToString(){
        return "sign: " + sign + " num: " + num + " id: " + id;
    }

}

class Board{

    public Cell[,] Grid;
    public int length;
    public List<State> States;

    public Board(Cell[,] Grid, int length){
        this.Grid = Grid;
        this.length = length;
        States = null;
    }

    public void Output(){

        for(int i = 0; i < length; i++){
            for(int j = 0; j < length; j++){
                Console.Write(Grid[i, j].sign);
            }
            if(i != length - 1)
                Console.WriteLine();
        }

    }

    public int FinishIslands(){

        int Change = 0;

        for(int i = 0; i < length; i++){
            for(int j = 0; j < length; j++){
                if(Grid[i, j].num > 0){
                    int num = Grid[i, j].num;
                    int sur = Surface(i, j, Grid[i, j]);
                    if(sur == num){
                        //up
                        if(i - 1 > -1 && Grid[i - 1, j].num == 0){
                            Change = 1;
                            Grid[i - 1, j].num = -1;
                            Grid[i - 1, j].sign = '~';
                        }
                        //down
                        if(i + 1 < length && Grid[i + 1, j].num == 0){
                            Change = 1;
                            Grid[i + 1, j].num = -1;
                            Grid[i + 1, j].sign = '~';
                        }
                        //left
                        if(j - 1 > -1 && Grid[i, j - 1].num == 0){
                            Change = 1;
                            Grid[i, j - 1].num = -1;
                            Grid[i, j - 1].sign = '~';
                        }
                        //right
                        if(j + 1 < length && Grid[i, j + 1].num == 0){
                            Change = 1;
                            Grid[i, j + 1].num = -1;
                            Grid[i, j + 1].sign = '~';
                        }
                    }
                }
            }
        }

        return Change;
    }

    public int Surface(int i, int j, Cell cell){

        int mone = 0;

        for(int y = 0; y < length; y++){
            for(int x = 0; x < length; x++){
                if(Grid[y, x].id == cell.id){
                    mone++;
                }
            }
        }

        return mone;
    }

    public int SurfaceConnected(int i, int j, int num){
        List<Pos> Visited = new List<Pos>();
        Visited.Add(new Pos(i, j));

        List<Pos> Queue = new List<Pos>();
        Queue.Add(new Pos(i, j));

        int mone = 0;

        while(Queue.Count != 0){

            Pos CurrPos = Queue[0];
            Queue.RemoveAt(0);
            mone++;

            int y = CurrPos.y;
            int x = CurrPos.x;

            //up
            if(y - 1 > -1 && Grid[y - 1, x].num == num
            && !InList(Visited, new Pos(y - 1, x))){
                Pos pos = new Pos(y - 1, x);
                Visited.Add(pos);
                Queue.Add(pos);
            }
            //down
            if(y + 1 < length && Grid[y + 1, x].num == num
            && !InList(Visited, new Pos(y + 1, x))){
                Pos pos = new Pos(y + 1, x);
                Visited.Add(pos);
                Queue.Add(pos);
            }
            //left
            if(x - 1 > -1 && Grid[y, x - 1].num == num
            && !InList(Visited, new Pos(y, x - 1))){
                Pos pos = new Pos(y, x - 1);
                Visited.Add(pos);
                Queue.Add(pos);
            }
            //right
            if(x + 1 < length && Grid[y, x + 1].num == num
            && !InList(Visited, new Pos(y, x + 1))){
                Pos pos = new Pos(y, x + 1);
                Visited.Add(pos);
                Queue.Add(pos);
            }
        }

        return mone;
    }

    public int ValidSurface(int i, int j, Cell cell){
        List<Pos> Visited = new List<Pos>();
        Visited.Add(new Pos(i, j));

        List<Pos> Queue = new List<Pos>();
        Queue.Add(new Pos(i, j));

        int mone = 0;

        int num = cell.num;
        int id = cell.id;

        while(Queue.Count != 0){

            Pos CurrPos = Queue[0];
            Queue.RemoveAt(0);

            mone++;

            if(mone > num){
                return mone;
            }

            int y = CurrPos.y;
            int x = CurrPos.x;

            //up
            if(y - 1 > -1 && (Grid[y - 1, x].num == num || Grid[y - 1, x].num == 0)
            && neighbors(y - 1, x, id)
            && !InList(Visited, new Pos(y - 1, x))){
                Pos pos = new Pos(y - 1, x);
                Visited.Add(pos);
                Queue.Add(pos);
            }
            //down
            if(y + 1 < length && (Grid[y + 1, x].num == num || Grid[y + 1, x].num == 0)
            && neighbors(y + 1, x, id)
            && !InList(Visited, new Pos(y + 1, x))){
                Pos pos = new Pos(y + 1, x);
                Visited.Add(pos);
                Queue.Add(pos);
            }
            //left
            if(x - 1 > -1 && (Grid[y, x - 1].num == num || Grid[y, x - 1].num == 0)
            && neighbors(y, x - 1, id)
            && !InList(Visited, new Pos(y, x - 1))){
                Pos pos = new Pos(y, x - 1);
                Visited.Add(pos);
                Queue.Add(pos);
            }
            //right
            if(x + 1 < length && (Grid[y, x + 1].num == num || Grid[y, x + 1].num == 0)
            && neighbors(y, x + 1, id)
            && !InList(Visited, new Pos(y, x + 1))){
                Pos pos = new Pos(y, x + 1);
                Visited.Add(pos);
                Queue.Add(pos);
            }
        }

        return mone;
    }

    public void FillValidSurface(int i, int j, Cell cell){

        List<Pos> Visited = new List<Pos>();
        Visited.Add(new Pos(i, j));

        List<Pos> Queue = new List<Pos>();
        Queue.Add(new Pos(i, j));

        int num = cell.num;
        int id = cell.id;

        while(Queue.Count != 0){

            Pos CurrPos = Queue[0];
            Queue.RemoveAt(0);

            int y = CurrPos.y;
            int x = CurrPos.x;

            //up
            if(y - 1 > -1 && (Grid[y - 1, x].num == num || Grid[y - 1, x].num == 0)
            && neighbors(y - 1, x, id)
            && !InList(Visited, new Pos(y - 1, x))){
                Grid[y - 1, x].sign = Convert.ToChar(48 + num);
                Grid[y - 1, x].num = num;
                Grid[y - 1, x].id = id;
                Pos pos = new Pos(y - 1, x);
                Visited.Add(pos);
                Queue.Add(pos);
            }
            //down
            if(y + 1 < length && (Grid[y + 1, x].num == num || Grid[y + 1, x].num == 0)
            && neighbors(y + 1, x, id)
            && !InList(Visited, new Pos(y + 1, x))){
                Grid[y + 1, x].sign = Convert.ToChar(48 + num);
                Grid[y + 1, x].num = num;
                Grid[y + 1, x].id = id;
                Pos pos = new Pos(y + 1, x);
                Visited.Add(pos);
                Queue.Add(pos);
            }
            //left
            if(x - 1 > -1 && (Grid[y, x - 1].num == num || Grid[y, x - 1].num == 0)
            && neighbors(y, x - 1, id)
            && !InList(Visited, new Pos(y, x - 1))){
                Grid[y, x - 1].sign = Convert.ToChar(48 + num);
                Grid[y, x - 1].num = num;
                Grid[y, x - 1].id = id;
                Pos pos = new Pos(y, x - 1);
                Visited.Add(pos);
                Queue.Add(pos);
            }
            //right
            if(x + 1 < length && (Grid[y, x + 1].num == num || Grid[y, x + 1].num == 0)
            && neighbors(y, x + 1, id)
            && !InList(Visited, new Pos(y, x + 1))){
                Grid[y, x + 1].sign = Convert.ToChar(48 + num);
                Grid[y, x + 1].num = num;
                Grid[y, x + 1].id = id;
                Pos pos = new Pos(y, x + 1);
                Visited.Add(pos);
                Queue.Add(pos);
            }
        }
    }

    public int WaterSurface(int i, int j){
        List<Pos> Visited = new List<Pos>();
        Visited.Add(new Pos(i, j));

        List<Pos> Queue = new List<Pos>();
        Queue.Add(new Pos(i, j));

        int mone = 0;

        while(Queue.Count != 0){

            Pos CurrPos = Queue[0];
            Queue.RemoveAt(0);
            mone++;

            int y = CurrPos.y;
            int x = CurrPos.x;

            //up
            if(y - 1 > -1 && Grid[y - 1, x].num == -1
            && !InList(Visited, new Pos(y - 1, x))){
                Pos pos = new Pos(y - 1, x);
                Visited.Add(pos);
                Queue.Add(pos);
            }
            //down
            if(y + 1 < length && Grid[y + 1, x].num == -1
            && !InList(Visited, new Pos(y + 1, x))){
                Pos pos = new Pos(y + 1, x);
                Visited.Add(pos);
                Queue.Add(pos);
            }
            //left
            if(x - 1 > -1 && Grid[y, x - 1].num == -1
            && !InList(Visited, new Pos(y, x - 1))){
                Pos pos = new Pos(y, x - 1);
                Visited.Add(pos);
                Queue.Add(pos);
            }
            //right
            if(x + 1 < length && Grid[y, x + 1].num == -1
            && !InList(Visited, new Pos(y, x + 1))){
                Pos pos = new Pos(y, x + 1);
                Visited.Add(pos);
                Queue.Add(pos);
            }
        }

        return mone;
    }

    public int SepreateIslands(){

        int Change = 0;

        for(int i = 0; i < length; i++){
            for(int j = 0; j < length; j++){
                if(Grid[i, j].num == 0){
                    //from left and right
                    if(j - 1 > -1 && j + 1 < length
                    && Grid[i, j - 1].num > 0 && Grid[i, j + 1].num > 0
                    && Grid[i, j - 1].id != Grid[i, j + 1].id){
                        Change = 1;
                        Grid[i, j].num = -1;
                        Grid[i, j].sign = '~';
                    }
                    //from up and down
                    if(i - 1 > -1 && i + 1 < length
                    && Grid[i - 1, j].num > 0 && Grid[i + 1, j].num > 0
                    && Grid[i - 1, j].id != Grid[i + 1, j].id){
                        Change = 1;
                        Grid[i, j].num = -1;
                        Grid[i, j].sign = '~';
                    }
                    //from left and down
                    if(j - 1 > -1 && i + 1 < length
                    && Grid[i, j - 1].num > 0 && Grid[i + 1, j].num > 0
                    && Grid[i, j - 1].id != Grid[i + 1, j].id){
                        Change = 1;
                        Grid[i, j].num = -1;
                        Grid[i, j].sign = '~';
                    }
                    //from right and down
                    if(j + 1 < length && i + 1 < length
                    && Grid[i, j + 1].num > 0 && Grid[i + 1, j].num > 0
                    && Grid[i, j + 1].id != Grid[i + 1, j].id){
                        Change = 1;
                        Grid[i, j].num = -1;
                        Grid[i, j].sign = '~';
                    }
                    //from left and up
                    if(j - 1 > -1 && i - 1 > -1
                    && Grid[i, j - 1].num > 0 && Grid[i - 1, j].num > 0
                    && Grid[i, j - 1].id != Grid[i - 1, j].id){
                        Change = 1;
                        Grid[i, j].num = -1;
                        Grid[i, j].sign = '~';
                    }
                    //from right and up
                    if(j + 1 < length && i - 1 > -1
                    && Grid[i, j + 1].num > 0 && Grid[i - 1, j].num > 0
                    && Grid[i, j + 1].id != Grid[i - 1, j].id){
                        Change = 1;
                        Grid[i, j].num = -1;
                        Grid[i, j].sign = '~';
                    }
                }
            }
        }

        return Change;
    }

    public int WaterCanConnectOneSpot(){

        bool Change = true;
        int change = 0;

        while(Change){
            Change = false;

            for(int i = 0; i < length; i++){
                for(int j = 0; j < length; j++){
                    if(Grid[i, j].num == -1){

                        int mone = 0;
                        Pos ConnectTo = null;

                        //up
                        if(i - 1 > -1 && Grid[i - 1, j].num == 0){
                            ConnectTo = new Pos(i - 1, j);
                            mone++;
                        }
                        //down
                        if(i + 1 < length && Grid[i + 1, j].num == 0){
                            ConnectTo = new Pos(i + 1, j);
                            mone++;
                        }
                        //left
                        if(j - 1 > -1 && Grid[i, j - 1].num == 0){
                            ConnectTo = new Pos(i, j - 1);
                            mone++;
                        }
                        //right
                        if(j + 1 < length && Grid[i, j + 1].num == 0){
                            ConnectTo = new Pos(i, j + 1);
                            mone++;
                        }

                        if(mone == 1){
                            int WaterCount = CountWater();
                            int Watersurface = WaterSurface(i, j);

                            if(WaterCount != Watersurface){
                                int NumberOfSpotsToConnect = SurfaceWaterConnect(i, j);

                                if(NumberOfSpotsToConnect == 1){
                                    Grid[ConnectTo.y, ConnectTo.x].num = -1;
                                    Grid[ConnectTo.y, ConnectTo.x].sign = '~';
                                    Change = true;
                                }
                            }
                        }
                    }
                }
            }

            if(Change){
                change = 1;
            }
        }

        return change;
    }

    public int CountWater(){

        int mone = 0;

        for(int i = 0; i < length; i++){
            for(int j = 0; j < length; j++){
                if(Grid[i, j].num == -1){
                    mone++;
                }
            }
        }
        return mone;
    }

    public int SurfaceWaterConnect(int i, int j){

        List<Pos> Visited = new List<Pos>();
        Visited.Add(new Pos(i, j));

        List<Pos> Queue = new List<Pos>();
        Queue.Add(new Pos(i, j));

        int mone = 0;

        while(Queue.Count != 0){

            Pos CurrPos = Queue[0];
            Queue.RemoveAt(0);

            int y = CurrPos.y;
            int x = CurrPos.x;

            //up
            if(y - 1 > -1 && Grid[y - 1, x].num == -1
            && !InList(Visited, new Pos(y - 1, x))){
                Pos pos = new Pos(y - 1, x);
                Visited.Add(pos);
                Queue.Add(pos);
            }
            else if(y - 1 > -1 && Grid[y - 1, x].num == 0
            && !InList(Visited, new Pos(y - 1, x))){
                mone++;
                if(mone > 1){
                    return mone;
                }
                Visited.Add(new Pos(y - 1, x));
            }
            //down
            if(y + 1 < length && Grid[y + 1, x].num == -1
            && !InList(Visited, new Pos(y + 1, x))){
                Pos pos = new Pos(y + 1, x);
                Visited.Add(pos);
                Queue.Add(pos);
            }
            else if(y + 1 < length && Grid[y + 1, x].num == 0
            && !InList(Visited, new Pos(y + 1, x))){
                mone++;
                if(mone > 1){
                    return mone;
                }
                Visited.Add(new Pos(y + 1, x));
            }
            //left
            if(x - 1 > -1 && Grid[y, x - 1].num == -1
            && !InList(Visited, new Pos(y, x - 1))){
                Pos pos = new Pos(y, x - 1);
                Visited.Add(pos);
                Queue.Add(pos);
            }
            else if(x - 1 > -1 && Grid[y, x - 1].num == 0
            && !InList(Visited, new Pos(y, x - 1))){
                mone++;
                if(mone > 1){
                    return mone;
                }
                Visited.Add(new Pos(y, x - 1));
            }
            //right
            if(x + 1 < length && Grid[y, x + 1].num == -1
            && !InList(Visited, new Pos(y, x + 1))){
                Pos pos = new Pos(y, x + 1);
                Visited.Add(pos);
                Queue.Add(pos);
            }
            else if(x + 1 < length && Grid[y, x + 1].num == 0
            && !InList(Visited, new Pos(y, x + 1))){
                mone++;
                if(mone > 1){
                    return mone;
                }
                Visited.Add(new Pos(y, x + 1));
            }
        }

        return mone;

    }

    public int IslandsCanConnectOneSpot(){

        bool Change = true;
        int change = 0;

        while(Change){
            Change = false;

            for(int i = 0; i < length; i++){
                for(int j = 0; j < length; j++){
                    if(Grid[i, j].num > 0 && Surface(i, j, Grid[i, j]) < Grid[i, j].num){

                        int mone = 0;
                        Pos ConnectTo = null;

                        //up
                        if(i - 1 > -1 && Grid[i - 1, j].num == 0){
                            ConnectTo = new Pos(i - 1, j);
                            mone++;
                        }
                        //down
                        if(i + 1 < length && Grid[i + 1, j].num == 0){
                            ConnectTo = new Pos(i + 1, j);
                            mone++;
                        }
                        //left
                        if(j - 1 > -1 && Grid[i, j - 1].num == 0){
                            ConnectTo = new Pos(i, j - 1);
                            mone++;
                        }
                        //right
                        if(j + 1 < length && Grid[i, j + 1].num == 0){
                            ConnectTo = new Pos(i, j + 1);
                            mone++;
                        }

                        if(mone == 1){
                            int NumberOfSpotsToConnect = SurfaceIslandsConnect(i, j, Grid[i, j]);

                            if(NumberOfSpotsToConnect == 1){
                                Grid[ConnectTo.y, ConnectTo.x].num = Grid[i, j].num;
                                Grid[ConnectTo.y, ConnectTo.x].id = Grid[i, j].id;
                                Grid[ConnectTo.y, ConnectTo.x].sign = Convert.ToChar(Grid[i, j].num + 48);
                                Change = true;
                            }
                        }
                    }
                }
            }

            if(Change){
                change = 1;
            }
        }

        return change;
    }

    public int SurfaceIslandsConnect(int i, int j, Cell cell){

        List<Pos> Visited = new List<Pos>();
        Visited.Add(new Pos(i, j));

        List<Pos> Queue = new List<Pos>();
        Queue.Add(new Pos(i, j));

        int mone = 0;

        while(Queue.Count != 0){

            Pos CurrPos = Queue[0];
            Queue.RemoveAt(0);

            int y = CurrPos.y;
            int x = CurrPos.x;

            //up
            if(y - 1 > -1 && Grid[y - 1, x].num == cell.num
            && !InList(Visited, new Pos(y - 1, x))){
                Pos pos = new Pos(y - 1, x);
                Visited.Add(pos);
                Queue.Add(pos);
            }
            else if(y - 1 > -1 && Grid[y - 1, x].num == 0
            && !InList(Visited, new Pos(y - 1, x))){
                mone++;
                if(mone > 1){
                    return mone;
                }
                Visited.Add(new Pos(y - 1, x));
            }
            //down
            if(y + 1 < length && Grid[y + 1, x].num == cell.num
            && !InList(Visited, new Pos(y + 1, x))){
                Pos pos = new Pos(y + 1, x);
                Visited.Add(pos);
                Queue.Add(pos);
            }
            else if(y + 1 < length && Grid[y + 1, x].num == 0
            && !InList(Visited, new Pos(y + 1, x))){
                mone++;
                if(mone > 1){
                    return mone;
                }
                Visited.Add(new Pos(y + 1, x));
            }
            //left
            if(x - 1 > -1 && Grid[y, x - 1].num == cell.num
            && !InList(Visited, new Pos(y, x - 1))){
                Pos pos = new Pos(y, x - 1);
                Visited.Add(pos);
                Queue.Add(pos);
            }
            else if(x - 1 > -1 && Grid[y, x - 1].num == 0
            && !InList(Visited, new Pos(y, x - 1))){
                mone++;
                if(mone > 1){
                    return mone;
                }
                Visited.Add(new Pos(y, x - 1));
            }
            //right
            if(x + 1 < length && Grid[y, x + 1].num == cell.num
            && !InList(Visited, new Pos(y, x + 1))){
                Pos pos = new Pos(y, x + 1);
                Visited.Add(pos);
                Queue.Add(pos);
            }
            else if(x + 1 < length && Grid[y, x + 1].num == 0
            && !InList(Visited, new Pos(y, x + 1))){
                mone++;
                if(mone > 1){
                    return mone;
                }
                Visited.Add(new Pos(y, x + 1));
            }
        }

        return mone;

    }

    public int CantReachThere(){

        int change = 0;

        List<Pos> FreePlaces = new List<Pos>();
        List<Pos> ClosedPlaces = new List<Pos>();

        for(int i = 0; i < length; i++){
            for(int j = 0; j < length; j++){
                if(Grid[i, j].num > 0){
                    int num = Grid[i, j].num;
                    int surface = Surface(i, j, Grid[i, j]);
                    int SurfaceToComplete = num - surface;

                    if(SurfaceToComplete > 0){
                        List<Pos> Places = GetAllWays(i, j, num, SurfaceToComplete);

                        foreach(Pos pos in Places){
                            ClosedPlaces.Add(pos);
                        }
                    }
                }
                else if(Grid[i, j].num == 0){
                    FreePlaces.Add(new Pos(i, j));
                }
            }
        }

        foreach(Pos FreePos in FreePlaces){
            if(!InList(ClosedPlaces, FreePos)){
                Grid[FreePos.y, FreePos.x].num = -1;
                Grid[FreePos.y, FreePos.x].sign = '~';
                change = 1;
            }
        }

        return change;
    }

    public List<Pos> GetAllWays(int i, int j, int num, int SurfaceToComplete){

        List<Pos> Visited = new List<Pos>();
        Visited.Add(new Pos(i, j));

        return GetAllWays2(i, j, num, SurfaceToComplete, Visited);
    }

    public List<Pos> GetAllWays2(int y, int x, int num, int SurfaceToComplete,
    List<Pos> Visited){

        List<Pos> list = new List<Pos>();


        if(SurfaceToComplete == 0){
            return list;
        }

        //up
        if(y - 1 > -1 && Grid[y - 1, x].num == 0){
            Pos pos = new Pos(y - 1, x);
            list.Add(pos);
            Visited.Add(pos);
            List<Pos> newList = GetAllWays2(y - 1, x, num, SurfaceToComplete - 1,
             Visited);

            foreach(Pos p in newList){
                list.Add(p);
            }
        }
        //down
        if(y + 1 < length && Grid[y + 1, x].num == 0){
            Pos pos = new Pos(y + 1, x);
            list.Add(pos);
            Visited.Add(pos);

            List<Pos> newList = GetAllWays2(y + 1, x, num, SurfaceToComplete - 1,
             Visited);

            foreach(Pos p in newList){
                list.Add(p);
            }
        }

        //left
        if(x - 1 > -1 && Grid[y, x - 1].num == 0){
            Pos pos = new Pos(y, x - 1);
            list.Add(pos);
            Visited.Add(pos);
            List<Pos> newList = GetAllWays2(y, x - 1, num, SurfaceToComplete - 1,
             Visited);

            foreach(Pos p in newList){
                list.Add(p);
            }
        }
        //right
        if(x + 1 < length && Grid[y, x + 1].num == 0){
            Pos pos = new Pos(y, x + 1);
            list.Add(pos);
            Visited.Add(pos);

            List<Pos> newList = GetAllWays2(y, x + 1, num, SurfaceToComplete - 1,
             Visited);

            foreach(Pos p in newList){
                list.Add(p);
            }
        }


        return list;
    }

    public void Solve(){

        States = new List<State>();

        bool result = Backtracking();
    }

    public bool Backtracking(){
        //-----Check if State seen before
        State state = new State(Grid);

        foreach(State sta in States){
            if(sta.equal(state)){
                return false;
            }
        }

        States.Add(state);

        //-----Save the Grid to restore him to his previous
        //-----State after changing him
        Cell[,] SavedGrid = new Cell[length,length];

        for(int i = 0 ; i < length; i++){
            for(int j = 0 ; j < length; j++){
                SavedGrid[i, j] = new Cell(Grid[i, j].sign, Grid[i, j].num, Grid[i, j].id);
            }
        }

        int change = 1;

        while(change == 1){
            change = 0;

            //1
            change = Math.Max(change, FinishIslands());

            //2
            change = Math.Max(change, SepreateIslands());

            //3
            change = Math.Max(change, WaterCanConnectOneSpot());

            //4
            change = Math.Max(change, IslandsCanConnectOneSpot());

            //6
            change = Math.Max(change, CantReachThere());

            //5
            change = Math.Max(change, Water3());
        }

        //HaveValidSurface
        for(int i = 0; i < length; i++){
            for(int j = 0; j < length; j++){
                if(Grid[i, j].num > 0
                 && Surface(i, j, Grid[i, j]) < Grid[i, j].num){
                    int validSurface = ValidSurface(i, j, Grid[i, j]);

                    if(validSurface <  Grid[i, j].num){
                        for(int y = 0 ; y < length; y++){
                            for(int x = 0 ; x < length; x++){
                                Grid[y, x] = new Cell(SavedGrid[y, x].sign,
                                SavedGrid[y, x].num, SavedGrid[y, x].id);
                            }
                        }
                        return false;
                    }
                    else if(validSurface == Grid[i, j].num){
                        FillValidSurface(i, j, Grid[i, j]);
                    }
                }
            }
        }

        if(Water4()){
            for(int i = 0 ; i < length; i++){
                for(int j = 0 ; j < length; j++){
                    Grid[i, j] = new Cell(SavedGrid[i, j].sign,
                    SavedGrid[i, j].num, SavedGrid[i, j].id);
                }
            }
            return false;
        }

        int Min = 10;
        int MinId = 10;
        List<Pos> MinPosList = new List<Pos>();

        for(int i = 0; i < length; i++){
            for(int j = 0; j < length; j++){
                if(Grid[i, j].num > 0){
                    Pos pos = new Pos(i, j);

                    int num = Grid[i, j].num;
                    List<Pos> visited = new List<Pos>();
                    visited.Add(pos);
                    
                    int surface = Surface(i, j, Grid[i, j]);

                    if(surface < num && Min > num){
                        MinPosList = new List<Pos>();
                        Min = num;
                        MinId = Grid[i, j].id;
                        MinPosList.Add(pos);
                    }
                    else if(surface < num && Min == num){
                        MinPosList.Add(pos);
                    }
                }
            }
        }

        if(Min == 10){

            int moneWater = 0;
            Pos PosWater = null;

            for(int i = 0; i < length; i++){
                for(int j = 0; j < length; j++){
                    if(Grid[i, j].num == 0){
                        Grid[i, j].num = -1;
                        Grid[i, j].sign = '~';
                        moneWater++;

                        if(PosWater == null){
                            PosWater = new Pos(i, j);
                        }
                    }
                    else if(Grid[i, j].num == -1){
                        if(PosWater == null){
                            PosWater = new Pos(i, j);
                        }
                        moneWater++;
                    }
                    else{
                        if(SurfaceConnected(i, j, Grid[i, j].num) != Grid[i, j].num){
                            for(int y = 0 ; y < length; y++){
                                for(int x = 0 ; x < length; x++){
                                    Grid[y, x] = new Cell(SavedGrid[y, x].sign,
                                    SavedGrid[y, x].num, SavedGrid[y, x].id);
                                }
                            }
                            return false;
                        }
                    }
                }
            }


            if(moneWater != WaterSurface(PosWater.y, PosWater.x)){
                for(int i = 0 ; i < length; i++){
                    for(int j = 0 ; j < length; j++){
                        Grid[i, j] = new Cell(SavedGrid[i, j].sign,
                        SavedGrid[i, j].num, SavedGrid[i, j].id);
                    }
                }
                return false;
            }

            if(Water4()){
                for(int i = 0 ; i < length; i++){
                    for(int j = 0 ; j < length; j++){
                        Grid[i, j] = new Cell(SavedGrid[i, j].sign,
                        SavedGrid[i, j].num, SavedGrid[i, j].id);
                    }
                }
                return false;
            }

            return true;
        }


        //-----Gussing Place
        List<Pos> VisitedPlaces = new List<Pos>();

        foreach(Pos MinPos in MinPosList){
            
            //up
            if(MinPos.y - 1 > -1 && Grid[MinPos.y - 1, MinPos.x].num == 0
            && neighbors(MinPos.y - 1,  MinPos.x, MinId)
            && InList(VisitedPlaces, new Pos(MinPos.y - 1, MinPos.x)) == false){

                int sur = Surface(MinPos.y - 1, MinPos.x, new Cell(Convert.ToChar(Min + 48), Min, MinId)) + 1;

                int SurConnected = SurfaceConnected(MinPos.y - 1, MinPos.x, Min);

                if(sur == Min && SurConnected != Min){

                }
                else{
                    char c = Convert.ToChar(Min + 48);
                    Grid[MinPos.y - 1, MinPos.x].num = Min;
                    Grid[MinPos.y - 1, MinPos.x].id = MinId;
                    Grid[MinPos.y - 1, MinPos.x].sign = c;

                    bool Worked = Backtracking();

                    if(!Worked){
                        Grid[MinPos.y - 1, MinPos.x].num = 0;
                        Grid[MinPos.y - 1, MinPos.x].id = 0;
                        Grid[MinPos.y - 1, MinPos.x].sign = '.';
                    }
                    else{
                        return true;
                    }
                }
            }
            //down
            if(MinPos.y + 1 < length && Grid[MinPos.y + 1, MinPos.x].num == 0
            && neighbors(MinPos.y + 1, MinPos.x, MinId)
            && InList(VisitedPlaces, new Pos(MinPos.y + 1, MinPos.x)) == false){


                int sur = Surface(MinPos.y + 1, MinPos.x, new Cell(Convert.ToChar(Min + 48), Min, MinId)) + 1;

                int SurConnected = SurfaceConnected(MinPos.y + 1, MinPos.x, Min);

                if(sur == Min && SurConnected != Min){
                    
                }
                else{
                    char c = Convert.ToChar(Min + 48);
                    Grid[MinPos.y + 1, MinPos.x].num = Min;
                    Grid[MinPos.y + 1, MinPos.x].id = MinId;
                    Grid[MinPos.y + 1, MinPos.x].sign = c;

                    bool Worked = Backtracking();

                    if(!Worked){
                        Grid[MinPos.y + 1, MinPos.x].num = 0;
                        Grid[MinPos.y + 1, MinPos.x].id = 0;
                        Grid[MinPos.y + 1, MinPos.x].sign = '.';
                    }
                    else{
                        return true;
                    }
                }
            }
            //left
            if(MinPos.x - 1 > -1 && Grid[MinPos.y, MinPos.x - 1].num == 0
            && neighbors(MinPos.y, MinPos.x - 1, MinId)
            && InList(VisitedPlaces, new Pos(MinPos.y, MinPos.x - 1)) == false){

                int sur = Surface(MinPos.y, MinPos.x - 1, new Cell(Convert.ToChar(Min + 48), Min, MinId)) + 1;

                int SurConnected = SurfaceConnected(MinPos.y, MinPos.x - 1, Min);

                if(sur == Min && SurConnected != Min){
                    
                }
                else{
                    char c = Convert.ToChar(Min + 48);
                    Grid[MinPos.y, MinPos.x - 1].num = Min;
                    Grid[MinPos.y, MinPos.x - 1].id = MinId;
                    Grid[MinPos.y, MinPos.x - 1].sign = c;

                    bool Worked = Backtracking();

                    if(!Worked){
                        Grid[MinPos.y, MinPos.x - 1].num = 0;
                        Grid[MinPos.y, MinPos.x - 1].id = 0;
                        Grid[MinPos.y, MinPos.x - 1].sign = '.';
                    }
                    else{
                        return true;
                    }
                }
            }
            //right
            if(MinPos.x + 1 < length && Grid[MinPos.y, MinPos.x + 1].num == 0
            && neighbors(MinPos.y, MinPos.x + 1, MinId)
            && InList(VisitedPlaces, new Pos(MinPos.y, MinPos.x + 1)) == false){


                int sur = Surface(MinPos.y, MinPos.x + 1, new Cell(Convert.ToChar(Min + 48), Min, MinId)) + 1;
                
                int SurConnected = SurfaceConnected(MinPos.y, MinPos.x + 1, Min);


                if(sur == Min && SurConnected != Min){
                    
                }
                else{
                    char c = Convert.ToChar(Min + 48);
                    Grid[MinPos.y, MinPos.x + 1].num = Min;
                    Grid[MinPos.y, MinPos.x + 1].id = MinId;
                    Grid[MinPos.y, MinPos.x + 1].sign = c;

                    bool Worked = Backtracking();

                    if(!Worked){
                        Grid[MinPos.y, MinPos.x + 1].num = 0;
                        Grid[MinPos.y, MinPos.x + 1].id = 0;
                        Grid[MinPos.y, MinPos.x + 1].sign = '.';
                    }
                    else{
                        return true;
                    }
                }
            }
        }

        for(int i = 0 ; i < length; i++){
            for(int j = 0 ; j < length; j++){
                Grid[i, j] = new Cell(SavedGrid[i, j].sign,
                 SavedGrid[i, j].num, SavedGrid[i, j].id);
            }
        }

        return false;
    }

    public bool neighbors(int i, int j, int MinId){

        //up
        if(i - 1 > -1 && Grid[i - 1, j].num > 0 &&
        Grid[i - 1, j].id != MinId){
            return false;
        }
        //down
        else if(i + 1 < length && Grid[i + 1, j].num > 0 &&
        Grid[i + 1, j].id != MinId){
            return false;
        }
        //left
        else if(j - 1 > -1 && Grid[i, j - 1].num > 0 &&
        Grid[i, j - 1].id != MinId){
            return false;
        }
        //right
        else if(j + 1 < length && Grid[i, j + 1].num > 0 &&
        Grid[i, j + 1].id != MinId){
            return false;
        }

        return true;
    }

    public bool Water4(){

        for(int i = 0; i < length; i++){
            for(int j = 0; j < length; j++){
                if(Grid[i, j].num == -1){
                    //1#
                    //##
                    if(j + 1 < length && i + 1 < length &&
                    Grid[i, j + 1].num == -1 && Grid[i + 1, j].num == -1
                    && Grid[i + 1, j + 1].num == -1){
                        return true;
                    }
                    //#1
                    //##
                    else if(j - 1 > -1 && i + 1 < length &&
                    Grid[i, j - 1].num == -1 && Grid[i + 1, j].num == -1
                    && Grid[i + 1, j - 1].num == -1){
                        return true;
                    }
                    //##
                    //1#
                    else if(j + 1 < length && i - 1 > -1 &&
                    Grid[i, j + 1].num == -1 && Grid[i - 1, j].num == -1
                    && Grid[i - 1, j + 1].num == -1){
                        return true;
                    }
                    //##
                    //#1
                    else if(j - 1 > -1 && i - 1 > -1 &&
                    Grid[i, j - 1].num == -1 && Grid[i - 1, j].num == -1
                    && Grid[i - 1, j - 1].num == -1){
                        return true;
                    }
                }
            }
        }

        return false;
    }

    public int Water3(){

        int change = 0;

        for(int i = 0; i < length; i++){
            for(int j = 0; j < length; j++){
                if(Grid[i, j].num == 0){
                    //0#
                    //##
                    if(j + 1 < length && i + 1 < length &&
                    Grid[i, j + 1].num == -1 && Grid[i + 1, j].num == -1
                    && Grid[i + 1, j + 1].num == -1){
                        //Check how many islands can reach to this spot
                        Cell cell = HowManyIslandsCanReach(new Pos(i, j));
                        if(cell != null){
                            Grid[i, j] = cell;
                            change = 1;
                        }
                        //if just 1, then put in this spot his id, num and sign
                    }
                    //#0
                    //##
                    else if(j - 1 > -1 && i + 1 < length &&
                    Grid[i, j - 1].num == -1 && Grid[i + 1, j].num == -1
                    && Grid[i + 1, j - 1].num == -1){
                        //Check how many islands can reach to this spot
                        Cell cell = HowManyIslandsCanReach(new Pos(i, j));
                        if(cell != null){
                            Grid[i, j] = cell;
                            change = 1;
                        }
                        //if just 1, then put in this spot his id, num and sign
                    }
                    //##
                    //0#
                    else if(j + 1 < length && i - 1 > -1 &&
                    Grid[i, j + 1].num == -1 && Grid[i - 1, j].num == -1
                    && Grid[i - 1, j + 1].num == -1){
                        //Check how many islands can reach to this spot
                        Cell cell = HowManyIslandsCanReach(new Pos(i, j));
                        if(cell != null){
                            Grid[i, j] = cell;
                            change = 1;
                        }
                        //if just 1, then put in this spot his id, num and sign
                    }
                    //##
                    //#0
                    else if(j - 1 > -1 && i - 1 > -1 &&
                    Grid[i, j - 1].num == -1 && Grid[i - 1, j].num == -1
                    && Grid[i - 1, j - 1].num == -1){
                        //Check how many islands can reach to this spot
                        Cell cell = HowManyIslandsCanReach(new Pos(i, j));
                        if(cell != null){
                            Grid[i, j] = cell;
                            change = 1;
                        }
                        //if just 1, then put in this spot his id, num and sign
                    }
                }
            }
        }

        return change;
    }

    public Cell HowManyIslandsCanReach(Pos Des){

        Cell Result = null;

        for(int i = 0; i < length; i++){
            for(int j = 0; j < length; j++){
                if(Grid[i, j].num > 0){
                    int num = Grid[i, j].num ;
                    int surface = Surface(i, j, Grid[i, j]);
                    List<Pos> Ways = GetAllWays(i, j, num, num - surface);

                    if(InList(Ways, Des)){
                        if(Result != null){
                            return null;
                        }

                        Result = new Cell(Grid[i, j].sign, num, Grid[i, j].id);
                    }
                }
            }
        }

        return Result;
    }

    public bool InList(List<Pos> Visited, Pos pos){

        foreach(Pos p in Visited){
            if(pos.y == p.y && pos.x == p.x){
                return true;
            }
        }

        return false;
    }

}

class Solution
{
    static void Main(string[] args)
    {
        int N = int.Parse(Console.ReadLine());
        Cell[,] Grid = new Cell[N, N];

        int id = 1;

        for (int i = 0; i < N; i++)
        {
            string row = Console.ReadLine();
            for(int j = 0; j < row.Length; j++){
                if(Char.IsDigit(row[j])){
                    Grid[i, j] = new Cell(row[j], Convert.ToInt32(row[j]) - 48, id);
                    id++;
                }
                else
                    Grid[i, j] = new Cell(row[j], 0, 0);
            }
        }

        Board board = new Board(Grid, N);
        var clock = Stopwatch.StartNew();

        board.Solve();

        Console.Error.WriteLine($"Solved in {clock.ElapsedMilliseconds}ms");

        board.Output();
    }
}
