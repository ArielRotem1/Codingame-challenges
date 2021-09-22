using System;
using System.Linq;
using System.IO;
using System.Text;
using System.Collections;
using System.Collections.Generic;

class Command{
    public int floor;
    public int position;
    public int command;

    public Command(int floor, int position, int command){
        this.floor = floor;
        this.position = position;
        this.command = command;
    }
}

class State{
    public int floor;
    public int position;
    public bool dir;
    public int elevatorsLeft;
    public int clonesLeft;
    public int rounds;

    public Command command = null;

    public State(int floor, int position, bool dir, int elevatorsLeft, int clonesLeft, int rounds){
        this.floor = floor;
        this.position = position;
        this.dir = dir;
        this.elevatorsLeft = elevatorsLeft;
        this.clonesLeft = clonesLeft;
        this.rounds = rounds;
    }
}

class Player
{
    public static int width;
    public static int nbFloors;
    public static int exitFloor;
    public static int exitPos;
    public static int nbRounds;
    public static int nbTotalClones;
    public static int nbAdditionalElevators;

    public static List<int>[] fields;

    public static BitArray elevators;


    static void Main(string[] args)
    {
        string[] inputs;
        inputs = Console.ReadLine().Split(' ');
        nbFloors = int.Parse(inputs[0]); // number of floors
        width = int.Parse(inputs[1]); // width of the area
        nbRounds = int.Parse(inputs[2]); // maximum number of rounds
        exitFloor = int.Parse(inputs[3]); // floor on which the exit is found
        exitPos = int.Parse(inputs[4]); // position of the exit on its floor
        nbTotalClones = int.Parse(inputs[5]); // number of generated clones
        nbAdditionalElevators = int.Parse(inputs[6]); // number of additional elevators that you can build
        int nbElevators = int.Parse(inputs[7]); // number of elevators

        fields = new List<int>[nbFloors];

        elevators = new BitArray(nbFloors * width);

        elevators.SetAll(false);

        for (int i = 0; i < nbElevators; i++)
        {
            inputs = Console.ReadLine().Split(' ');
            int elevatorFloor = int.Parse(inputs[0]); // floor on which this elevator is found
            int elevatorPos = int.Parse(inputs[1]); // position of the elevator on its floor
            elevators.Set(elevatorFloor * width + elevatorPos, true);
            if(fields[elevatorFloor] == null)
                fields[elevatorFloor] = new List<int>();
            fields[elevatorFloor].Add(elevatorPos);
        }

        for (int i = 0; i < nbFloors; i++)
        {
            if(fields[i] == null)
                fields[i] = new List<int>();
            fields[i].Sort();
        }

        Command command = null;

        // game loop
        while (true)
        {
            inputs = Console.ReadLine().Split(' ');
            int cloneFloor = int.Parse(inputs[0]); // floor of the leading clone
            int clonePos = int.Parse(inputs[1]); // position of the leading clone on its floor
            bool direction = inputs[2] == "RIGHT"; // direction of the leading clone: LEFT or RIGHT

            State startState = new State(cloneFloor, clonePos, direction, nbAdditionalElevators, nbTotalClones, 0);
            if(clonePos != -1 && command == null){
                command = Solve(startState);
            }

            // Write an action using Console.WriteLine()
            // To debug: Console.Error.WriteLine("Debug messages...");

            nbRounds--;

            if(command == null || clonePos == -1){
                Console.WriteLine("WAIT");
            }
            else{
                if(command.position == clonePos && command.floor == cloneFloor){
                    if(command.command == 1){
                        nbAdditionalElevators--;
                        elevators.Set(cloneFloor * width + clonePos, true);
                        int index = 0;
                        for(; index < fields[cloneFloor].Count && fields[cloneFloor][index] < clonePos; index++);
                        fields[cloneFloor].Insert(index, clonePos);

                        command = new Command(cloneFloor, clonePos, 0);

                        Console.WriteLine("ELEVATOR");
                    }
                    else{
                        command = null;
                        Console.WriteLine("WAIT");
                    }
                }
                else if(command.floor == cloneFloor){
                    if((command.position < clonePos && !direction) ||
                    (command.position > clonePos && direction)){
                        Console.WriteLine("WAIT");
                    }
                    else{
                        nbTotalClones--;
                        Console.WriteLine("BLOCK");
                    }
                }
                else{
                    Console.WriteLine("WAIT");
                }
            }
        }
    }

    static Command Solve(State startState){

        Queue<State> Que = new Queue<State>();
        Que.Enqueue(startState);

        bool start = true;       

        while(Que.Count != 0){
            State st = Que.Dequeue();

            if(st.rounds >= nbRounds || st.floor > exitFloor || st.clonesLeft <= -1) continue;

            if(Finish(st)){
                return st.command;
            }

            //check if stand on elevator
            if(elevators.Get(st.floor * width + st.position)){
                State newState = new State(st.floor + 1, st.position, st.dir, st.elevatorsLeft, st.clonesLeft, st.rounds + 1);
                newState.command = st.command;
                Que.Enqueue(newState);
                continue;
            }

            List<int> possibleStates = GetPossibleStates(st);

            for(int i = 0; i < possibleStates.Count; i += 2){
                int pos = possibleStates[i];
                int createElev = possibleStates[i + 1];

                State newState = GenerateState(pos, createElev, st);
                if(start)
                    newState.command = new Command(st.floor, pos, createElev);
                else
                    newState.command = st.command;

                Que.Enqueue(newState);
            }

            start = false;
        }

        return null;
    }



    static State GenerateState(int desiredPos, int createElev, State state){

        int newPos = desiredPos;
        int newFloor = state.floor;
        if(createElev == 1 || elevators.Get(newFloor * width + desiredPos)) newFloor++;
        bool newDir = state.dir;
        int newElevatorsLeft = state.elevatorsLeft - createElev;
        int newClonesLeft = state.clonesLeft - createElev;
        int newRounds = state.rounds + Math.Abs(state.position - newPos) + 1;

        if(desiredPos < state.position){
            if(state.dir){
                newRounds += 3;
                newClonesLeft--;
            }
            newDir = false;
        }
        else if(desiredPos > state.position){
            if(!state.dir){
                newRounds += 3;
                newClonesLeft--;
            }
            newDir = true;
        }

        if(createElev == 1){
            newRounds += 3;
        }


        State st = new State(newFloor, newPos, newDir, newElevatorsLeft, newClonesLeft, newRounds);

        return st;
    }

    static List<int> GetPossibleStates(State state){
        List<int> res = new List<int>();

        bool hasAdditionalElev = state.elevatorsLeft > 0;

        int stateFloor = state.floor;

        if(hasAdditionalElev){
            List<int> hasField = new List<int>();

            //right
            for(int pos = state.position; pos < width; pos++){
                if(elevators.Get(stateFloor * width + pos) || (stateFloor == exitFloor && pos == exitPos)){
                    res.Add(pos);
                    res.Add(0);
                    break;
                }
                else{
                    bool inField = false;
                    int least = 0;
                    if(stateFloor + 1 < nbFloors){
                        for(int i = 0; i < fields[stateFloor + 1].Count && fields[stateFloor + 1][i] < pos; i++){
                            least = fields[stateFloor + 1][i];
                        }

                        foreach(int num in hasField){
                            if(num == least){
                                inField = true;
                                break;
                            }
                        }

                        if(elevators.Get((stateFloor + 1) * width + pos)) inField = false;
                    }
                    if(!inField){
                        if(stateFloor + 1 >= nbFloors || !elevators.Get((stateFloor + 1) * width + pos))
                            hasField.Add(least);
                        res.Add(pos);
                        res.Add(1);
                    }
                }
            }

            //left
            for(int pos = state.position - 1; pos > -1; pos--){
                if(elevators.Get(stateFloor * width + pos) || (stateFloor == exitFloor && pos == exitPos)){
                    res.Add(pos);
                    res.Add(0);
                    break;
                }
                else{
                    bool inField = false;
                    int least = 0;
                    if(stateFloor + 1 < nbFloors){
                        for(int i = 0; i < fields[stateFloor + 1].Count && fields[stateFloor + 1][i] < pos; i++){
                            least = fields[stateFloor + 1][i];
                        }

                        foreach(int num in hasField){
                            if(num == least){
                                inField = true;
                                break;
                            }
                        }

                        if(elevators.Get((stateFloor + 1) * width + pos)) inField = false;
                    }
                    if(!inField){
                        if(stateFloor + 1 >= nbFloors || !elevators.Get((stateFloor + 1) * width + pos))
                            hasField.Add(least);
                        res.Add(pos);
                        res.Add(1);
                    }
                }
            }
        }
        else{
            //right
            for(int pos = state.position; pos < width; pos++){
                if(elevators.Get(stateFloor * width + pos) || (stateFloor == exitFloor && pos == exitPos)){
                    res.Add(pos);
                    res.Add(0);
                    break;
                }
            }

            //left
            for(int pos = state.position - 1; pos > -1; pos--){
                if(elevators.Get(stateFloor * width + pos) || (stateFloor == exitFloor && pos == exitPos)){
                    res.Add(pos);
                    res.Add(0);
                    break;
                }
            }
        }

        return res;
    }

    static bool Finish(State state){ return state.floor == exitFloor && state.position == exitPos; }
}
