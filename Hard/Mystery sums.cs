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
        // Write an answer using Console.WriteLine()
        // To debug: Console.Error.WriteLine("Debug messages...");

        string expression = Console.ReadLine();

        char[] exp = new char[expression.Length];

        for(int i = 0; i < exp.Length; i++){
            exp[i] = expression[i];
        }

        int Result = GetResult(exp);
        char Sign = GetSign(exp);


        char[] NewExp = GetNewExp(Result, Sign, exp);

        for(int i = 0; i < NewExp.Length; i++){
            Console.Write(NewExp[i]);
        }
    }



    static char[] GetNewExp(int Result, char Sign, char[] exp){

        char[] SavedExp = new char[exp.Length];

        for(int i = 0; i < exp.Length; i++){
            SavedExp[i] = exp[i];
        }

        for(int i = 0; i < SavedExp.Length; i++){
            if(SavedExp[i] == '?'){
                for(int j = 0; j <= 9; j++){
                    SavedExp[i] = Convert.ToChar(j + 48);

                    bool Q = NoMoreQMark(SavedExp);

                    char[] TempExp = new char[SavedExp.Length];


                    for(int z = 0; z < SavedExp.Length; z++){
                        TempExp[z] = SavedExp[z];
                    }

                    if(!Q){
                        TempExp = GetNewExp(Result, Sign, TempExp);
                        if(Compare(TempExp, SavedExp)){
                            continue;
                        }
                    }

                    if(SolveExp(TempExp, Result, Sign)){
                        return TempExp;
                    }
                }

                return exp;
            }
        }

        return exp;

    }

    static bool Compare(char[] exp1, char[] exp2){

        for(int i = 0; i < exp1.Length; i++){
            if(exp1[i] != exp2[i])
                return false;
        }

        return true;
    }

    static bool SolveExp(char[] exp, int Result, char Sign){

        int[] Nums = new int[5];
        int IndexNums = 0;

        string num = "";

        for(int i = 0; i < exp.Length; i++){
            if(exp[i] == ' '){
                if(num != ""){
                    Nums[IndexNums] = int.Parse(num);
                    IndexNums++;
                }

                num = "";
            }
            else if(Convert.ToInt32(exp[i]) > 47 && Convert.ToInt32(exp[i]) < 60){
                num += exp[i];
            }
            else if(exp[i] == '=')
                break;
        }

        int MyResult = Nums[0];

        for(int i = 1; i < IndexNums; i++){
            if(Sign == '+'){
            MyResult += Nums[i];
            }
            else if(Sign == '*'){
            MyResult *= Nums[i];
            }
            else if(Sign == '-'){
            MyResult -= Nums[i];
            }
            else if(Sign == '/'){
            MyResult /= Nums[i];
            }
        }

        return MyResult == Result;
    }


    static bool NoMoreQMark(char[] exp){

        for(int i = 0; i < exp.Length; i++){
            if(exp[i] == '?')
                return false;
        }

        return true;
    }

    static int GetResult(char[] exp){

        string result = "";

        for(int i = exp.Length - 1; i > 0 && exp[i] != ' '; i--){
            result += exp[i];
        }

        string Result = "";

        for(int i = result.Length - 1; i > -1; i--){
            Result += result[i];
        }

        int R = int.Parse(Result);

        return R;

    }

    static char GetSign(char[] exp){
        char Sign = ' ';

        for(int i = 0; i < exp.Length; i++){
            if(exp[i] == '+' || exp[i] == '-' || exp[i] == '*' || exp[i] == '/'){
                Sign = exp[i];
                break;
            }
        }

        return Sign;

    }
}
