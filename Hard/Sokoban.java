import java.util.*;
import java.io.*;
import java.math.*;

/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

class Path{
    public int position;
    public int dir;

    public Path(int position, int dir){
        this.position = position;
        this.dir = dir;
    }
}

class State{
    public int[] boxPositions;
    public int pusherPosition;
    public State parent;
    public int[] move = new int[2];

    public State(int pusherPosition, int[] boxPositions, State parent){
        this.pusherPosition = pusherPosition;
        this.boxPositions = boxPositions;
        this.parent = parent;
    }

    public void show(){
        /*System.err.println();
        System.err.println("pusherPosition: " + pusherPosition);
        System.err.println();
        System.err.print("boxPositions: {");
        for (int i : boxPositions) {
            System.err.print(" " + i);
        }
        System.err.print(" }");
        System.err.println();
        System.err.println();*/

        System.err.println();

        for(int i = 0; i < Player.height; i++){
            String s = "";
            for(int j = 0; j < Player.width; j++){
                int pos = i * Player.width + j;
                if(pusherPosition == pos) s += "X";
                else if(Player.grid[pos] == 0) s += "#";
                else{
                    Boolean box = false;
                    for (int k : boxPositions) {
                        if(pos == k){
                            box = true;
                            break;
                        }
                    }

                    if(box && Player.grid[pos] == 9) s += "&";
                    else if(box) s += "@";
                    else s += ".";
                }
            }

            System.err.println(s);
        }

        System.err.println();
    }
}

class Player {

    public static int height;
    public static int width;
    public static int length;
    public static int boxCount;
    public static int[] grid;

    public static int statesLength;
    public static State[] states;
    public static int indexStates;


    public static int timeOfTurn = 1000;

    public static long startTime;

    public static Queue<State> primerQue = new ArrayDeque<State>();

    public static void main(String args[]) {
        Scanner in = new Scanner(System.in);
        width = in.nextInt();
        height = in.nextInt();
        
        boxCount = in.nextInt();
        if (in.hasNextLine()) {
            in.nextLine();
        }
        length = width * height;
        grid = new int[length];
        int indexGrid = 0;
        for (int i = 0; i < height; i++) {
            char[] line = in.nextLine().toCharArray();
            for(int j = 0; j < line.length; j++){
                int val = 1;
                if(line[j] == '*') val = 9;
                else if(line[j] == '#') val = 0;

                grid[indexGrid] = val;
                indexGrid++;
            }
        }

        int haveSomthingToDo = -2;
        char Dir = '?';

        State path = null;

        // game loop
        while (true) {
            startTime = System.nanoTime();
            
            int pusherX = in.nextInt();
            int pusherY = in.nextInt();
            int pusherPosition = convert2DInto1D(pusherX, pusherY);
            int[] boxPositions = new int[boxCount];
            for (int i = 0; i < boxCount; i++) {
                int boxX = in.nextInt();
                int boxY = in.nextInt();
                boxPositions[i] = convert2DInto1D(boxX, boxY);
            }

            State startState = new State(pusherPosition, boxPositions, null);

            startState.pusherPosition = leastInField(startState);

            if(path == null){
                if(primerQue.isEmpty()){
                    statesLength = 1000 * (length / 10 + boxCount);
                    states = new State[statesLength];
                    states[0] = startState;
                    indexStates = 1;
                    primerQue.add(startState);
                }
                
                path = solve();

                timeOfTurn = 50;

                if(grid[pusherPosition - width] != 0 && !isThereBox(pusherPosition - width, startState)){
                    System.out.println('U');
                }
                else if(grid[pusherPosition + width] != 0 && !isThereBox(pusherPosition + width, startState)){
                    System.out.println('D');
                }
                else if(grid[pusherPosition - 1] != 0 && !isThereBox(pusherPosition - 1, startState)){
                    System.out.println('L');
                }
                else if(grid[pusherPosition + 1] != 0 && !isThereBox(pusherPosition + 1, startState)){
                    System.out.println('R');
                }
                else{
                    if(grid[pusherPosition - width] != 0 && canPushBox(startState, pusherPosition - width, 0)
                    && !isDeadSpot(pusherPosition - width - width)){
                        System.out.println('U');
                    }
                    else if(grid[pusherPosition + width] != 0 && canPushBox(startState, pusherPosition + width, 1)
                    && !isDeadSpot(pusherPosition + width + width)){
                        System.out.println('D');
                    }
                    else if(grid[pusherPosition - 1] != 0 && canPushBox(startState, pusherPosition - 1, 2)
                    && !isDeadSpot(pusherPosition - 1 - 1)){
                        System.out.println('L');
                    }
                    else if(grid[pusherPosition + 1] != 0 && canPushBox(startState, pusherPosition + 1, 3)
                    && !isDeadSpot(pusherPosition + 1 + 1)){
                        System.out.println('R');
                    }
                }
            }
            else{
                if(haveSomthingToDo == -2){
                    State oneBeforeFirstState = path;

                    while(oneBeforeFirstState.parent.parent != null){
                        oneBeforeFirstState = oneBeforeFirstState.parent;
                    }

                    int[] output = getWhereNeedToBe(oneBeforeFirstState);

                    oneBeforeFirstState.parent = null;

                    int positionPusher = output[0];

                    char dir = '?';

                    if(output[1] == 0){
                        dir = 'U';
                    }
                    else if(output[1] == 1){
                        dir = 'D';
                    }
                    else if(output[1] == 2){
                        dir = 'L';
                    }
                    else if(output[1] == 3){
                        dir = 'R';
                    }

                    if(pusherPosition == positionPusher){
                        System.out.println(dir);
                    }
                    else{
                        haveSomthingToDo = positionPusher;
                        Dir = dir;
                        char c = pusherGoTo(pusherPosition, positionPusher, startState);
                        System.out.println(c);
                    }
                }
                else{
                    if(pusherPosition == haveSomthingToDo){
                        haveSomthingToDo = -2;
                        System.out.println(Dir);
                        Dir = '?';
                    }
                    else{
                        char c = pusherGoTo(pusherPosition, haveSomthingToDo, startState);
                        System.out.println(c);
                    }
                }
            }
        }
    }

    static int[] getWhereNeedToBe(State second){
        int position = second.move[0];

        int dir = -1;

        if(position - width == second.move[1]){
            dir = 0;
            position = position + width;
        }
        else if(position + width == second.move[1]){
            dir = 1;
            position = position - width;
        }
        else if(position - 1 == second.move[1]){
            dir = 2;
            position = position + 1;
        }
        else if(position + 1 == second.move[1]){
            dir = 3;
            position = position - 1;
        }

        int[] output = new int[2];
        output[0] = position;
        output[1] = dir;
        
        return output;
    }


    static char pusherGoTo(int start, int end, State st){

        int[] visited = new int[length];
        visited[start] = 1;
        Queue<Path> Que = new ArrayDeque<Path>();
        Que.add(new Path(start, -1));

        Boolean Start = true;

        while(!Que.isEmpty()){
            Path path = Que.remove();
            int position = path.position;


            if(position == end){
                System.err.println();
                System.err.println("finish!!");
                System.err.println("path.dir: " + path.dir);
                System.err.println();
                if(path.dir == 0) return 'U';
                else if(path.dir == 1) return 'D';
                else if(path.dir == 2) return 'L';
                else if(path.dir == 3) return 'R';
                break;
            }

            //up
            if(grid[position - width] != 0 && visited[position - width] == 0){
                Boolean isThereBox = isThereBox(position - width, st);
                if(!isThereBox){
                    int dir = path.dir;
                    if(Start) dir = 0;

                    Que.add(new Path((position - width), dir));
                    visited[position - width] = 1;
                }
            }

            //down
            if(grid[position + width] != 0 && visited[position + width] == 0){
                Boolean isThereBox = isThereBox(position + width, st);
                if(!isThereBox){
                    int dir = path.dir;
                    if(Start) dir = 1;

                    Que.add(new Path((position + width), dir));
                    visited[position + width] = 1;
                }
            }

            //left
            if(grid[position - 1] != 0 && visited[position - 1] == 0){
                Boolean isThereBox = isThereBox(position - 1, st);
                if(!isThereBox){
                    int dir = path.dir;
                    if(Start) dir = 2;

                    Que.add(new Path((position - 1), dir));
                    visited[position - 1] = 1;
                }
            }

            //right
            if(grid[position + 1] != 0 && visited[position + 1] == 0){
                Boolean isThereBox = isThereBox(position + 1, st);
                if(!isThereBox){
                    int dir = path.dir;
                    if(Start) dir = 3;

                    Que.add(new Path((position + 1), dir));
                    visited[position + 1] = 1;
                }
            }

            Start = false;
        }

        return 'U';
    }

    static Boolean isThereBox(int pos, State st){
        for(int i = 0; i < st.boxPositions.length; i++){
            if(pos == st.boxPositions[i])
                return true;
        }
        return false;
    }


    static State solve(){

        while(!primerQue.isEmpty() && (System.nanoTime() - startTime) / 1000000 < timeOfTurn){
            State st = primerQue.remove();

            if(finish(st)){
                System.err.println();
                System.err.println("FINISH!!!!!!!");
                System.err.println();
                return st;
            }

            List<Integer> possibleStates = getPossibleStates(st);

            for(int i = 0; i < possibleStates.size(); i += 2){
                int position = possibleStates.get(i);
                int nextPosition = possibleStates.get(i + 1);

                State newState = generateState(position, nextPosition, st);

                if(!inHashTable(newState)){
                    newState.move[0] = position;
                    newState.move[1] = nextPosition;
                    primerQue.add(newState);
                    if(indexStates < statesLength){
                        states[indexStates] = newState;
                        indexStates++;
                    }
                }
            }
        }

        return null;
    }

    
    static int leastInField(State state){
        int[] visited = new int[length];
        visited[state.pusherPosition] = 1;
        Queue<Integer> Que = new ArrayDeque<Integer>();
        Que.add(state.pusherPosition);

        int least = length;

        while(!Que.isEmpty()){
            int position = Que.remove();

            least = Math.min(least, position);

            //up
            if(grid[position - width] != 0 && !isThereBox(position - width, state) && visited[position - width] == 0){
                Que.add((position - width));
                visited[position - width] = 1;
            }

            //down
            if(grid[position + width] != 0 && !isThereBox(position + width, state) && visited[position + width] == 0){
                Que.add((position + width));
                visited[position + width] = 1;
            }

            //left
            if(grid[position - 1] != 0 && !isThereBox(position - 1, state) && visited[position - 1] == 0){
                Que.add((position - 1));
                visited[position - 1] = 1;
            }

            //right
            if(grid[position + 1] != 0 && !isThereBox(position + 1, state) && visited[position + 1] == 0){
                Que.add((position + 1));
                visited[position + 1] = 1;
            }
        }

        return least;
    }


    static Boolean inHashTable(State newState){
        for(int i = 0; i < states.length; i++){
            if(states[i] == null) break;
            State s = states[i];

            if(s.pusherPosition == newState.pusherPosition){
                Boolean same = true;

                for(int j = 0; j < boxCount; j++){
                    Boolean thereIs = false;
                    int pos1 = newState.boxPositions[j];

                    for(int k = 0; k < boxCount; k++){
                        int pos2 = s.boxPositions[k];
                        if(pos1 == pos2){
                            thereIs = true;
                            break;
                        } 
                    }

                    if(!thereIs){
                        same = false;
                        break;
                    }
                }

                if(same) 
                    return true;
            }
        }

        return false;
    }


    static State generateState(int position, int nextPosition, State st){
        
        int pusherNewPosition = position;

        int[] boxNewPositions = new int[boxCount];

        for(int i = 0; i < st.boxPositions.length; i++){
            boxNewPositions[i] = st.boxPositions[i];
            
            if(st.boxPositions[i] == position)
                boxNewPositions[i] = nextPosition;
        }

        State output = new State(pusherNewPosition, boxNewPositions, st);

        output.pusherPosition = leastInField(output);

        return output;
    }


    static List<Integer> getPossibleStates(State state){
        List<Integer> lst = new ArrayList<Integer>();

        int[] visited = new int[length];
        visited[state.pusherPosition] = 1;
        Queue<Integer> Que = new ArrayDeque<Integer>();
        Que.add(state.pusherPosition);

        while(!Que.isEmpty()){
            int position = Que.remove();

            Boolean[] thereIsBox = new Boolean[4];
            for (int i = 0; i < 4; i++) {
                thereIsBox[i] = false;
            }

            for(int i = 0; i < state.boxPositions.length; i++){
                //up
                if(position - width == state.boxPositions[i]){
                    if(canPushBox(state, state.boxPositions[i], 0)
                    && !isDeadSpot(state.boxPositions[i] - width)){
                        lst.add(state.boxPositions[i]);
                        lst.add((state.boxPositions[i] - width));
                    }
                    thereIsBox[0] = true;
                }

                //down
                if(position + width == state.boxPositions[i]){
                    if(canPushBox(state, state.boxPositions[i], 1)
                    && !isDeadSpot(state.boxPositions[i] + width)){
                        lst.add(state.boxPositions[i]);
                        lst.add((state.boxPositions[i] + width));
                    }
                    thereIsBox[1] = true;
                }

                //left
                if(position - 1 == state.boxPositions[i]){
                    if(canPushBox(state, state.boxPositions[i], 2)
                    && !isDeadSpot(state.boxPositions[i] - 1)){
                        lst.add(state.boxPositions[i]);
                        lst.add((state.boxPositions[i] - 1));
                    }
                    thereIsBox[2] = true;
                }

                //left
                if(position + 1 == state.boxPositions[i]){
                    if(canPushBox(state, state.boxPositions[i], 3)
                    && !isDeadSpot(state.boxPositions[i] + 1)){
                        lst.add(state.boxPositions[i]);
                        lst.add((state.boxPositions[i] + 1));
                    }
                    thereIsBox[3] = true;
                }
            }

            //up
            if(grid[position - width] != 0 && !thereIsBox[0] && visited[position - width] == 0){
                Que.add((position - width));
                visited[position - width] = 1;
            }

            //down
            if(grid[position + width] != 0 && !thereIsBox[1] && visited[position + width] == 0){
                Que.add((position + width));
                visited[position + width] = 1;
            }

            //left
            if(grid[position - 1] != 0 && !thereIsBox[2] && visited[position - 1] == 0){
                Que.add((position - 1));
                visited[position - 1] = 1;
            }

            //right
            if(grid[position + 1] != 0 && !thereIsBox[3] && visited[position + 1] == 0){
                Que.add((position + 1));
                visited[position + 1] = 1;
            }
        }

        return lst;
    }

    static Boolean isDeadSpot(int pos){
        if((grid[pos - width] == 0 || grid[pos + width] == 0) && 
            (grid[pos - 1] == 0 || grid[pos + 1] == 0) && grid[pos] != 9){
            return true;
        }

        return false;
    }

    static Boolean canPushBox(State state, int boxPosition, int dir){
        if(dir == 0 && grid[boxPosition - width] != 0){
            for(int i = 0; i < state.boxPositions.length; i++)
                if(boxPosition - width == state.boxPositions[i]) return false;

            return true;
        }
        else if(dir == 1 && grid[boxPosition + width] != 0){
            for(int i = 0; i < state.boxPositions.length; i++)
                if(boxPosition + width == state.boxPositions[i]) return false;

            return true;
        }
        else if(dir == 2 && grid[boxPosition - 1] != 0){
            for(int i = 0; i < state.boxPositions.length; i++)
                if(boxPosition - 1 == state.boxPositions[i]) return false;

            return true;
        }
        else if(dir == 3 && grid[boxPosition + 1] != 0){
            for(int i = 0; i < state.boxPositions.length; i++)
                if(boxPosition + 1 == state.boxPositions[i]) return false;

            return true;
        }

        return false;
    }


    static Boolean finish(State state){
        for(int i = 0; i < state.boxPositions.length; i++){
            if(grid[state.boxPositions[i]] != 9) return false;
        }
        return true;
    }

    static int convert2DInto1D(int x, int y){ return y * width + x; }
}
