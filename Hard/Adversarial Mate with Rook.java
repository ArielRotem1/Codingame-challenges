import java.util.*;
import java.io.*;
import java.math.*;

/**
 * Playing as white, perform moves leading to the fastest checkmate.
 **/

class Pos{
    public byte x;
    public byte y;

    public Pos(byte x, byte y){
        this.x = x;
        this.y = y;
    }
}

class State{
    public Pos whiteKing;
    public Pos whiteRook;
    public Pos blackKing;
    public byte depth = 0;

    public List<State> childs;

    public State(char[] whiteKing, char[] whiteRook, char[] blackKing){
        this.whiteKing = convertToPos(whiteKing);
        this.whiteRook = convertToPos(whiteRook);
        this.blackKing = convertToPos(blackKing);
    }

    public State(Pos whiteKing, Pos whiteRook, Pos blackKing){
        this.whiteKing = whiteKing;
        this.whiteRook = whiteRook;
        this.blackKing = blackKing;
    }

    public State(State state){
        this.whiteKing = new Pos(state.whiteKing.x, state.whiteKing.y);
        this.whiteRook = new Pos(state.whiteRook.x, state.whiteRook.y);
        this.blackKing = new Pos(state.blackKing.x, state.blackKing.y);
        this.depth = state.depth;

        this.childs = new ArrayList<State>(state.childs);
    }



    public static Pos convertToPos(char[] chessRepresention){
        byte y = (byte) Math.abs(8 - Character.getNumericValue(chessRepresention[1]));
        byte x = (byte) (((int) chessRepresention[0]) - 97);

        return new Pos(x, y);
    }

    public List<State> getChildrens(boolean maximazingPlayer){
        List<State> childrens = new ArrayList<State>();

        List<Pos> whiteKingMoves = canGoTo(whiteKing, true);
        List<Pos> blackKingMoves = canGoTo(blackKing, true);
        List<Pos> whiteRookMoves = canGoTo(whiteRook, false);

        if(maximazingPlayer){
            //white king moves
            for (Pos pos : whiteKingMoves) {
                boolean canGoThere = true;
                for (Pos pos2 : blackKingMoves) {
                    if(pos2.x == pos.x && pos2.y == pos.y){
                        canGoThere = false;
                        break;
                    }
                }

                if(!canGoThere || (pos.x == whiteRook.x && pos.y == whiteRook.y)) continue;

                childrens.add(new State(pos, whiteRook, blackKing));
            }

            //white rook moves
            for (Pos pos : whiteRookMoves) {
                boolean canGoThere = true;
                for (Pos pos2 : blackKingMoves) {
                    if(pos2.x == pos.x && pos2.y == pos.y){
                        canGoThere = false;
                        break;
                    }
                }

                if(!canGoThere || (pos.x == blackKing.x && pos.y == blackKing.y)) continue;

                childrens.add(new State(whiteKing, pos, blackKing));
            }
        }
        else{
            for (Pos pos : blackKingMoves) {
                boolean canGoThere = true;
                for (Pos pos2 : whiteKingMoves) {
                    if(pos2.x == pos.x && pos2.y == pos.y){
                        canGoThere = false;
                        break;
                    }
                }

                if(!canGoThere) continue;

                for (Pos pos2 : whiteRookMoves) {
                    if(pos2.x == pos.x && pos2.y == pos.y){
                        canGoThere = false;
                        break;
                    }
                }

                if(!canGoThere) continue;

                if(pos.x == whiteRook.x && pos.y == whiteRook.y){
                    childrens.add(new State(whiteKing, null, pos));
                }
                else{
                    childrens.add(new State(whiteKing, whiteRook, pos));
                }
            }
        }

        return childrens;
    }

    private List<Pos> canGoTo(Pos pos, boolean king){
        List<Pos> avalibalePositions = new ArrayList<Pos>();
        if(king){
            //up
            if(pos.y - 1 > -1){
                avalibalePositions.add(new Pos(pos.x, (byte)(pos.y - 1)));
            }
            //down
            if(pos.y + 1 < Player.LENGTH){
                avalibalePositions.add(new Pos(pos.x, (byte)(pos.y + 1)));
            }
            //left
            if(pos.x - 1 > -1){
                avalibalePositions.add(new Pos((byte)(pos.x - 1), pos.y));
            }
            //right
            if(pos.x + 1 < Player.LENGTH){
                avalibalePositions.add(new Pos((byte)(pos.x + 1), pos.y));
            }
            //up - left
            if(pos.y - 1 > -1 && pos.x - 1 > -1){
                avalibalePositions.add(new Pos((byte)(pos.x - 1), (byte)(pos.y - 1)));
            }
            //up - right
            if(pos.y - 1 > -1 && pos.x + 1 < Player.LENGTH){
                avalibalePositions.add(new Pos((byte)(pos.x + 1), (byte)(pos.y - 1)));
            }
            //down - left
            if(pos.y + 1 < Player.LENGTH && pos.x - 1 > -1){
                avalibalePositions.add(new Pos((byte)(pos.x - 1), (byte)(pos.y + 1)));
            }
            //down - right
            if(pos.y + 1 < Player.LENGTH && pos.x + 1 < Player.LENGTH){
                avalibalePositions.add(new Pos((byte)(pos.x + 1), (byte)(pos.y + 1)));
            }
        }
        else{
            //up
            for(byte y = (byte)(pos.y - 1); y > -1; y--){
                if(pos.x == whiteKing.x && y == whiteKing.y) break;
                avalibalePositions.add(new Pos(pos.x, y));
            }
            //down
            for(byte y = (byte)(pos.y + 1); y < Player.LENGTH; y++){
                if(pos.x == whiteKing.x && y == whiteKing.y) break;
                avalibalePositions.add(new Pos(pos.x, y));
            }
            //left
            for(byte x = (byte)(pos.x - 1); x > -1; x--){
                if(x == whiteKing.x && pos.y == whiteKing.y) break;
                avalibalePositions.add(new Pos(x, pos.y));
            }
            //right
            for(byte x = (byte)(pos.x + 1); x < Player.LENGTH; x++){
                if(x == whiteKing.x && pos.y == whiteKing.y) break;
                avalibalePositions.add(new Pos(x, pos.y));
            }
        }

        return avalibalePositions;
    }

    public boolean isOver(){
        List<Pos> whiteRookMoves = canGoTo(whiteRook, false);

        for (Pos pos : whiteRookMoves) {
            if(blackKing.y == pos.y && blackKing.x == pos.x) return true;
        }
        return false;
    }


    public State output(){
        State child = childs.get(0);

        if(child.whiteKing.x != whiteKing.x || child.whiteKing.y != whiteKing.y){
            System.out.println(convertToChessCommand(whiteKing, child.whiteKing));
            return child;
        }
        else{
            System.out.println(convertToChessCommand(whiteRook, child.whiteRook));
            return child;
        }
    }

    private String convertToChessCommand(Pos start, Pos end){

        String yStart = "" + Math.abs(8 - start.y);
        String xStart = "" + (char) (start.x + 97);

        String yEnd = "" + Math.abs(8 - end.y);
        String xEnd = "" + (char) (end.x + 97);

        return xStart + yStart + xEnd + yEnd;
    }


    public int getMaxDepth(int depth){
        if(childs != null){
            int maxDepth = -1;
            for(State child : childs){
                maxDepth = Math.max(maxDepth, child.getMaxDepth(depth + 1));
            }
            return maxDepth;
        }

        return depth;
    }

    public void showGridState(){
        System.err.println();
        System.err.println("depth: " + depth);
        char[][] grid = new char[8][8];
        for(int i = 0; i < 8; i++){
            for(int j = 0; j < 8; j++){
                grid[i][j] = '.';
                if(i == whiteKing.y && j == whiteKing.x){
                    grid[i][j] = 'K';
                }
                else if(i == whiteRook.y && j == whiteRook.x){
                    grid[i][j] = 'R';
                }
                else if(i == blackKing.y && j == blackKing.x){
                    grid[i][j] = 'k';
                }
            }
        }

        for(int i = 0; i < 8; i++){
            String s = "";
            for(int j = 0; j < 8; j++){
                s += grid[i][j];
            }
            System.err.println(s);
        }
        System.err.println();
    }

    public void showPath(){
        this.showGridState();
        if(childs != null){
            System.err.println("childs: ");
            for (State state : childs) {
                state.showPath();
            }
        }
        System.err.println();
    }
}

class HashState{

    public byte depth;
    public boolean maximazinPlayer;

    public HashState(byte depth, boolean maximazinPlayer){
        this.depth = depth;
        this.maximazinPlayer = maximazinPlayer;
    }
}

class Player {

    public static final int LENGTH = 8;
    public static int depthLimit = 14;
    public static Hashtable<Integer, HashState> states = new Hashtable<Integer, HashState>();

    public static void main(String args[]) {
        Scanner in = new Scanner(System.in);
        String whiteKing = in.next(); // Position of the white king, e.g. a2
        String whiteRook = in.next(); // Position of the white rook
        String blackKing = in.next(); // Position of the black king

        State rootNode = new State(whiteKing.toCharArray(), whiteRook.toCharArray(), blackKing.toCharArray());

        boolean result = solve(rootNode, true);

        State savedRootNode = null;

        while(result){
            savedRootNode = rootNode;
            depthLimit--;
            rootNode = new State(whiteKing.toCharArray(), whiteRook.toCharArray(), blackKing.toCharArray());
            states.clear();
            result = solve(rootNode, true);
        }

        rootNode = savedRootNode;

        rootNode = rootNode.output();

        // game loop
        while (true) {
            String opponentMove = in.next(); // A move made by the opponent, e.g. a2b1

            char[] charArrayMove = opponentMove.toCharArray();
            char[] afterMovePosition = new char[2];
            afterMovePosition[0] = charArrayMove[2];
            afterMovePosition[1] = charArrayMove[3];

            Pos enemyNewPos = State.convertToPos(afterMovePosition);
            for(State state : rootNode.childs){
                if(state.blackKing.x == enemyNewPos.x && state.blackKing.y == enemyNewPos.y){
                    rootNode = state;
                    break;
                }
            }

            int maxDepth = rootNode.getMaxDepth(0);

            if(maxDepth <= 5){
                depthLimit = maxDepth + 1;

                rootNode.depth = 0;

                State savedRootNodeStateParms = new State(rootNode);

                states.clear();
                result = solve(rootNode, true);

                savedRootNode = null;

                while(result){
                    savedRootNode = rootNode;
                    depthLimit--;
                    rootNode = new State(savedRootNodeStateParms);
                    states.clear();
                    result = solve(rootNode, true);
                }

                rootNode = savedRootNode;
            }

            rootNode = rootNode.output();
        }
    }


    public static boolean solve(State currState, boolean maximazingPlayer){        

        if(currState.depth == depthLimit || currState.whiteRook == null){
            return false;
        }

        int key = currState.whiteKing.y + currState.whiteKing.x * 10 +
        currState.whiteRook.y * 100 + currState.whiteRook.x * 1000 +
        currState.blackKing.y * 10000 + currState.blackKing.x * 100000;
        
        if(states.containsKey(key)){
            HashState value = states.get(key);
            if(value.maximazinPlayer == maximazingPlayer && value.depth <= currState.depth){
                return false;
            }
        }

        if(maximazingPlayer){

            List<State> childerns = currState.getChildrens(maximazingPlayer);

            for (State node : childerns) {
                node.depth = (byte) (currState.depth + 1);
                boolean res = solve(node, !maximazingPlayer);
                if(res){
                    currState.childs = new ArrayList<State>();
                    currState.childs.add(node);
                    return true;
                }
            }

            states.put(key, new HashState(currState.depth, maximazingPlayer));
            return false;
        }
        else{
            List<State> childerns = currState.getChildrens(maximazingPlayer);

            if(childerns.isEmpty()){
                if(currState.isOver()) return true;
                states.put(key, new HashState(currState.depth, maximazingPlayer));
                return false;
            }

            for (State node : childerns) {
                node.depth = (byte) (currState.depth + 1);
                boolean res = solve(node, !maximazingPlayer);
                if(!res){
                    states.put(key, new HashState(currState.depth, maximazingPlayer));
                    return false;
                }
            }

            currState.childs = new ArrayList<State>(childerns);

            return true;
        }
    }
}
