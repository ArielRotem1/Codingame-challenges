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
    static void Main(string[] args)
    {
        char[,] Tab = new char[8,8];
        int Row = 0;
        int Col = 0;
        string B = Console.ReadLine() + '/';
        string row = "";
        for(int i = 0; i < B.Length; i++){
            if(B[i] == '/'){
                for(int j = 0; j < row.Length; j++){
                    if(Convert.ToInt32(row[j]) > 48 && Convert.ToInt32(row[j]) < 58){
                        int n = Convert.ToInt32(row[j]) - 48;
                        while(n!=0){
                            Tab[Row,Col] = '.';
                            Col++;
                            n--;
                        }
                    }
                    else{
                        Tab[Row,Col] = row[j];
                        Col++;
                    }
                }
                row = "";
                Row++;
                Col = 0;
            }
            else{
                row += B[i];
            }
        }

        int N = int.Parse(Console.ReadLine());
        for (int i = 0; i < N; i++){
            string M = Console.ReadLine();

            int TRow = 8 - (Convert.ToInt32(M[1]) - 48);
            int TCol = Convert.ToInt32(M[0]) - 97;
            int DesTRow = 8 - (Convert.ToInt32(M[3]) - 48);
            int DesTCol = Convert.ToInt32(M[2]) - 97;

            char Tool = Tab[TRow,TCol];

            Tab[TRow,TCol] = '.';

            if((Tool == 'K' || Tool == 'k') && DesTCol - TCol == 2){
                char R = Tab[DesTRow,DesTCol + 1];
                Tab[DesTRow,DesTCol + 1] = '.';
                Tab[DesTRow,DesTCol - 1] = R;
            }
            else if((Tool == 'K' || Tool == 'k') && TCol - DesTCol == 2){
                char R = Tab[DesTRow,DesTCol - 2];
                Tab[DesTRow,DesTCol - 2] = '.';
                Tab[DesTRow,DesTCol + 1] = R;
            }
            else if((Tool == 'P' || Tool == 'p') && Math.Abs(TCol - DesTCol) == 1 && Tab[DesTRow,DesTCol] == '.'){
                if(TCol - DesTCol == 1){
                    //P
                    Tab[DesTRow + 1,DesTCol] = '.';
                }
                else{
                    //p
                    Tab[DesTRow - 1,DesTCol] = '.';
                }
            }
            else if((Tool == 'P' && DesTRow == 0) || (Tool == 'p' && DesTRow == 7)){
                Tool = 'N';
            }

            Tab[DesTRow,DesTCol] = Tool;
        }

        // Write an answer using Console.WriteLine()
        // To debug: Console.Error.WriteLine("Debug messages...");

        string Result = "";

        for(int i = 0; i < 8; i++){
            for(int j = 0; j < 8; j++){
                if(Tab[i,j] == '.'){
                    int mone = 0;
                    while(j < 8 && Tab[i,j] == '.'){
                        j++;
                        mone++;
                    }
                    j--;
                    Result+= Convert.ToString(mone);
                }
                else{
                    Result += Tab[i,j];
                }
            }
            if(i != 7)
                Result+= "/";
        }

        Console.WriteLine(Result);
    }

}
