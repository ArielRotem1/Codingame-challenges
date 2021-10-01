using System;
using System.Linq;
using System.IO;
using System.Text;
using System.Collections;
using System.Collections.Generic;

/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/
class Solution
{

    static void ShowTab(char [,] Tab){
        for (int i = 0; i < Tab.GetLength(0); i++)
        {
            for(int j = 0; j < Tab.GetLength(1); j++){
                Console.Error.Write(Tab[i,j]);
            }
            Console.Error.WriteLine();
        }
    }

    static int HowMuchBalls(char [,] Tab){

        int mone = 0;
        for (int i = 0; i < Tab.GetLength(0); i++)
        {
            for(int j = 0; j < Tab.GetLength(1); j++){
               if(Convert.ToInt32(Tab[i,j]) > 48 && Convert.ToInt32(Tab[i,j]) < 58){
                   mone++;
               }
            }
        }
        return mone;
    }

    static bool ThereIsH(char [,] Tab){

        for (int i = 0; i < Tab.GetLength(0); i++)
        {
            for(int j = 0; j < Tab.GetLength(1); j++){
               if(Tab[i,j] == 'H'){
                   return true;
               }
            }
        }
        return false;
    }

    static char[,] CopyTab(char [,] Tab){

        char [,] TempTab = new char [Tab.GetLength(0),Tab.GetLength(1)];

        for (int i = 0; i < Tab.GetLength(0); i++)
        {
            for(int j = 0; j < Tab.GetLength(1); j++){
               TempTab[i,j] = Tab[i,j];
            }
        }
        return TempTab;
    }

    static char [,] ClearX(char [,] Tab){

        for (int i = 0; i < Tab.GetLength(0); i++)
        {
            for(int j = 0; j < Tab.GetLength(1); j++){
                if(Tab[i,j] == 'X'){
                    Tab[i,j] = '.';
                }
            }
        }
        return Tab;
    }

    static bool Compare(char [,] Tab1, char [,] Tab2){

        for (int i = 0; i < Tab1.GetLength(0); i++)
        {
            for(int j = 0; j < Tab1.GetLength(1); j++){
                if(Tab1[i,j] != Tab2[i,j]){
                    return false;
                }
            }
        }
        return true;
    }

    static bool CanBallGoLeft(int LocI,int LocJ,int NumberOfSteps,char [,] Tab){

        if(LocJ - NumberOfSteps < 0 || Tab[LocI,LocJ-NumberOfSteps] == 'X'){
            return false;
        }

        for(int i = 1; i <= NumberOfSteps; i++){
            if(Tab[LocI,LocJ-i] == 'v' || Tab[LocI,LocJ-i] == '^' || Tab[LocI,LocJ-i] == '<' || Tab[LocI,LocJ-i] == '>' || (Convert.ToInt32(Tab[LocI,LocJ-i]) > 47 && Convert.ToInt32(Tab[LocI,LocJ-i]) < 58)){
                return false;
            }
        }

        for(int i = 1; i < NumberOfSteps; i++){
            if(Tab[LocI,LocJ-i] == 'H'){
                return false;
            }
        }

        return true;
    }

    static bool CanBallGoRight(int LocI,int LocJ,int NumberOfSteps,char [,] Tab){

       if(LocJ + NumberOfSteps > Tab.GetLength(1) - 1 || Tab[LocI,LocJ+NumberOfSteps] == 'X'){
            return false;
        }

        for(int i = 1; i <= NumberOfSteps; i++){
            if(Tab[LocI,LocJ+i] == 'v' || Tab[LocI,LocJ+i] == '^' || Tab[LocI,LocJ+i] == '<' || Tab[LocI,LocJ+i] == '>' || (Convert.ToInt32(Tab[LocI,LocJ+i]) > 47 && Convert.ToInt32(Tab[LocI,LocJ+i]) < 58)){
                return false;
            }
        }

        for(int i = 1; i < NumberOfSteps; i++){
            if(Tab[LocI,LocJ+i] == 'H'){
                return false;
            }
        }

        return true;
    }

    static bool CanBallGoUp(int LocI,int LocJ,int NumberOfSteps,char [,] Tab){

        if(LocI - NumberOfSteps < 0 || Tab[LocI-NumberOfSteps,LocJ] == 'X'){
            return false;
        }

        for(int i = 1; i <= NumberOfSteps; i++){
            if(Tab[LocI-i,LocJ] == 'v' || Tab[LocI-i,LocJ] == '^' || Tab[LocI-i,LocJ] == '<' || Tab[LocI-i,LocJ] == '>' || (Convert.ToInt32(Tab[LocI-i,LocJ]) > 47 && Convert.ToInt32(Tab[LocI-i,LocJ]) < 58)){
                return false;
            }
        }

        for(int i = 1; i < NumberOfSteps; i++){
            if(Tab[LocI-i,LocJ] == 'H'){
                return false;
            }
        }

        return true;
    }

    static bool CanBallGoDown(int LocI,int LocJ,int NumberOfSteps, char [,] Tab){
        
        if(LocI + NumberOfSteps > Tab.GetLength(0) - 1  || Tab[LocI+NumberOfSteps,LocJ] == 'X'){
            return false;
        }

        for(int i = 1; i <= NumberOfSteps; i++){
            if(Tab[LocI+i,LocJ] == 'v' || Tab[LocI+i,LocJ] == '^' || Tab[LocI+i,LocJ] == '<' || Tab[LocI+i,LocJ] == '>' || (Convert.ToInt32(Tab[LocI+i,LocJ]) > 47 && Convert.ToInt32(Tab[LocI+i,LocJ]) < 58)){
                return false;
            }
        }

        for(int i = 1; i < NumberOfSteps; i++){
            if(Tab[LocI+i,LocJ] == 'H'){
                return false;
            }
        }

        return true;
    }

    static char[,] GetPath(int[][] Balls, int IndexBalls, char [,] Tab, int LocI, int LocJ, int NumberOfSteps, char[,] OldTab){

        //1. Get Location of the current ball (LocI, LocJ) => 2
        //2. Get His number of steps => 5

        //3. Ball reach a H ? instead of H put . and Check if there is next Ball => 9 : => 4
        //4. number of steps - 1 > 0 (Ball can steel go) => 5 (reduce 1 in the number of steps) : => return to where the ball can go and erase the marking
        //9. There is next Ball ? (reduce 1 in IndexBalls) => 1 : => 10
        //10. return Tab


        //5. Ball can go left ? Ball go left number of steps and Mark the way in Tab => 3 : => 6
        //6. Ball can go right ? Ball go right number of steps and Mark the way in Tab => 3 : => 7
        //7. Ball can go up ? Ball go up number of steps and Mark the way in Tab => 3 : => 8
        //8. Ball can go down ? Ball go down number of steps and Mark the way in Tab => 3 : => return to where the ball can go and erase the marking

        /*Console.Error.WriteLine();
        Console.Error.WriteLine("OldTab: ");
        ShowTab(OldTab);
        Console.Error.WriteLine();*/

        Console.Error.WriteLine();
        Console.Error.WriteLine("Tab: ");
        ShowTab(Tab);
        Console.Error.WriteLine();


        /*Console.Error.WriteLine();
        Console.Error.WriteLine();
        Console.Error.WriteLine("OldTab: ");
        ShowTab(OldTab);
        Console.Error.WriteLine();*/



        char[,] SavedTab = CopyTab(Tab);
        int SavedLocI = LocI;
        int SavedLocJ = LocJ;
        int SavedIndexBalls = IndexBalls;

        // STEP 5
        if(CanBallGoLeft(LocI, LocJ, NumberOfSteps, Tab)){
            //Ball go left number of steps and Mark the way in Tab
            for(int z = 0; z < NumberOfSteps; z++){
                Tab[LocI,LocJ] = '<';
                LocJ--;
            }
            // STEP 3
            if(Tab[LocI,LocJ] == 'H'){
                //instead of H put . and Check if there is next Ball
                Tab[LocI,LocJ] = '.';
                // STEP 9
                if(IndexBalls - 1 > -1){
                    // STEP 1
                    IndexBalls--;
                    Tab = CopyTab(GetPath(Balls, IndexBalls, Tab, Balls[IndexBalls][0], Balls[IndexBalls][1], Balls[IndexBalls][2], SavedTab));
                    if(Compare(Tab, SavedTab)){
                        LocI = SavedLocI;
                        LocJ = SavedLocJ;
                        IndexBalls = SavedIndexBalls;
                    }
                }
                if(!ThereIsH(Tab)){
                    // STEP 10
                    return Tab;
                }
            }
            else{
                // STEP 4
                if(NumberOfSteps - 1 > 0){
                    // STEP 5
                    Tab = CopyTab(GetPath(Balls, IndexBalls, Tab, LocI, LocJ, NumberOfSteps - 1, SavedTab));
                    if(Compare(Tab, SavedTab)){
                        LocI = SavedLocI;
                        LocJ = SavedLocJ;
                        IndexBalls = SavedIndexBalls;
                    }
                    if(!ThereIsH(Tab)){
                        // STEP 10
                        return Tab;
                    }
                }
                //return to where the ball can go and erase the marking
                else{
                    Tab = CopyTab(SavedTab);
                    LocI = SavedLocI;
                    LocJ = SavedLocJ;
                }
            }
        }
        // STEP 6 
        if(CanBallGoRight(LocI, LocJ, NumberOfSteps, Tab)){
            //Ball go right number of steps and Mark the way in Tab
            for(int z = 0; z < NumberOfSteps; z++){
                Tab[LocI,LocJ] = '>';
                LocJ++;
            }
            // STEP 3
            if(Tab[LocI,LocJ] == 'H'){
                //instead of H put . and Check if there is next Ball
                Tab[LocI,LocJ] = '.';
                // STEP 9
                if(IndexBalls - 1 > -1){
                    // STEP 1
                   IndexBalls--;
                    Tab = CopyTab(GetPath(Balls, IndexBalls, Tab, Balls[IndexBalls][0], Balls[IndexBalls][1], Balls[IndexBalls][2], SavedTab));
                    if(Compare(Tab, SavedTab)){
                        LocI = SavedLocI;
                        LocJ = SavedLocJ;
                        IndexBalls = SavedIndexBalls;
                    }
                }
                if(!ThereIsH(Tab)){
                    // STEP 10
                    return Tab;
                }
            }
            else{
                // STEP 4
                if(NumberOfSteps - 1 > 0){
                    // STEP 5
                    Tab = CopyTab(GetPath(Balls, IndexBalls, Tab, LocI, LocJ, NumberOfSteps - 1, SavedTab));
                    if(Compare(Tab, SavedTab)){
                        LocI = SavedLocI;
                        LocJ = SavedLocJ;
                        IndexBalls = SavedIndexBalls;
                    }
                    if(!ThereIsH(Tab)){
                        // STEP 10
                        return Tab;
                    }
                }
                //return to where the ball can go and erase the marking
                else{
                    Tab = CopyTab(SavedTab);
                    LocI = SavedLocI;
                    LocJ = SavedLocJ;
                }
            }
        }
        // STEP 7 
        if(CanBallGoUp(LocI, LocJ, NumberOfSteps, Tab)){
            //Ball go up number of steps and Mark the way in Tab
            for(int z = 0; z < NumberOfSteps; z++){
                Tab[LocI,LocJ] = '^';
                LocI--;
            }
            // STEP 3
            if(Tab[LocI,LocJ] == 'H'){
                //instead of H put . and Check if there is next Ball
                Tab[LocI,LocJ] = '.';
                // STEP 9

                if(IndexBalls - 1 > -1){
                    // STEP 1
                    IndexBalls--;
                    Tab = CopyTab(GetPath(Balls, IndexBalls, Tab, Balls[IndexBalls][0], Balls[IndexBalls][1], Balls[IndexBalls][2], SavedTab));
                    if(Compare(Tab, SavedTab)){
                        LocI = SavedLocI;
                        LocJ = SavedLocJ;
                        IndexBalls = SavedIndexBalls;
                    }
                }
                if(!ThereIsH(Tab)){
                    // STEP 10
                    return Tab;
                }
            }
            else{
                // STEP 4
                if(NumberOfSteps - 1 > 0){
                    // STEP 5
                    Tab = CopyTab(GetPath(Balls, IndexBalls, Tab, LocI, LocJ, NumberOfSteps - 1, SavedTab));

                    if(Compare(Tab, SavedTab)){
                        LocI = SavedLocI;
                        LocJ = SavedLocJ;
                        IndexBalls = SavedIndexBalls;
                    }
                    if(!ThereIsH(Tab)){
                        // STEP 10
                        return Tab;
                    }
                }
                //return to where the ball can go and erase the marking
                else{
                    Tab = CopyTab(SavedTab);
                    LocI = SavedLocI;
                    LocJ = SavedLocJ;
                }
            }
        }
        // STEP 8 
        if(CanBallGoDown(LocI, LocJ, NumberOfSteps, Tab)){
            //Ball go down number of steps and Mark the way in Tab
            for(int z = 0; z < NumberOfSteps; z++){
                Tab[LocI,LocJ] = 'v';
                LocI++;
            }
            // STEP 3
            if(Tab[LocI,LocJ] == 'H'){
                //instead of H put . and Check if there is next Ball
                Tab[LocI,LocJ] = '.';
                // STEP 9
                if(IndexBalls - 1 > -1){
                    // STEP 1
                    IndexBalls--;
                    Tab = CopyTab(GetPath(Balls, IndexBalls, Tab, Balls[IndexBalls][0], Balls[IndexBalls][1], Balls[IndexBalls][2], SavedTab));
                    if(Compare(Tab, SavedTab)){
                        LocI = SavedLocI;
                        LocJ = SavedLocJ;
                        IndexBalls = SavedIndexBalls;
                    }
                }
                if(!ThereIsH(Tab)){
                        // STEP 10
                        return Tab;
                }
            }
            else{
                // STEP 4
                if(NumberOfSteps - 1 > 0){
                    // STEP 5
                    Tab = CopyTab(GetPath(Balls, IndexBalls, Tab, LocI, LocJ, NumberOfSteps - 1, SavedTab));
                    if(Compare(Tab, SavedTab)){
                        LocI = SavedLocI;
                        LocJ = SavedLocJ;
                        IndexBalls = SavedIndexBalls;
                    }
                    if(!ThereIsH(Tab)){
                        // STEP 10
                        return Tab;
                    }
                }
                //return to where the ball can go and erase the marking
                else{
                    Tab = CopyTab(SavedTab);
                    LocI = SavedLocI;
                    LocJ = SavedLocJ;
                }
            }
        }

        if(Compare(Tab, SavedTab)){
            /*Console.Error.WriteLine();
            Console.Error.WriteLine("RETURN OldTab!!!");
            Console.Error.WriteLine();
            Console.Error.WriteLine("Tab: ");
            ShowTab(Tab);
            Console.Error.WriteLine();
            Console.Error.WriteLine();
            Console.Error.WriteLine("SavedTab: ");
            ShowTab(SavedTab);
            Console.Error.WriteLine();
            Console.Error.WriteLine();
            Console.Error.WriteLine("OldTab: ");
            ShowTab(OldTab);
            Console.Error.WriteLine();*/
            return OldTab;
        }

        return Tab;
    }

    static void Main(string[] args)
    {
        string[] inputs = Console.ReadLine().Split(' ');
        int width = int.Parse(inputs[0]);
        int height = int.Parse(inputs[1]);
        char [,] Tab = new char [height,width];
        for (int i = 0; i < height; i++)
        {
            string row = Console.ReadLine();
            for(int j = 0; j < width; j++){
                Tab[i,j] = row[j];
            }
        }

        //ShowTab(Tab);
       //Console.Error.WriteLine();

        int[][] Balls = new int[HowMuchBalls(Tab)][];
        int IndexBalls = 0;

        for (int i = 0; i < Tab.GetLength(0); i++){ //Put all the balls in 'Balls'
            for(int j = 0; j < Tab.GetLength(1); j++){
                if(Convert.ToInt32(Tab[i,j]) > 48 && Convert.ToInt32(Tab[i,j]) < 58){
                    int CurrShotCount = Convert.ToInt32(Tab[i,j]) - 48;
                    int[] data = {i, j, CurrShotCount};
                    Balls[IndexBalls] = data;
                    IndexBalls++;
                }
            }
        }

        /*for(int i = 0; i < Balls.Length; i++){
            
            Console.WriteLine(Balls[i][2]);
        }

        Console.WriteLine();*/

        for(int i = 0; i < Balls.Length; i++){  //Sort from biggest shot to lowest shot 
            
            int index = i;
            int BiggestShotCount = Balls[i][2];

            for(int j = i + 1; j < Balls.Length; j++){
                if(Balls[j][2] < BiggestShotCount){
                    BiggestShotCount = Balls[j][2];
                    index = j; 
                }
            }

            int[] Temp = Balls[i];
            Balls[i] = Balls[index];
            Balls[index] = Temp;

        }

        IndexBalls = Balls.Length-1;    // Begin from the smallest

        Tab = CopyTab(GetPath(Balls, IndexBalls, Tab, Balls[IndexBalls][0], Balls[IndexBalls][1], Balls[IndexBalls][2], Tab));

        Tab = ClearX(Tab);

        for (int i = 0; i < Tab.GetLength(0); i++)
        {
            for(int j = 0; j < Tab.GetLength(1); j++){
                Console.Write(Tab[i,j]);
            }
            Console.WriteLine();
        }

    }
}
