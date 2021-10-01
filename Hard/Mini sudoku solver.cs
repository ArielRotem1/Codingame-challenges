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
        string line1 = Console.ReadLine();
        string line2 = Console.ReadLine();
        string line3 = Console.ReadLine();
        string line4 = Console.ReadLine();
        
        int [,] Tab = new int [4,4];
        int l = 0;
        for(int i = 0;i<4;i++)
        {
            if(i == 0)
            {
                for(int x = 0;x<4;x++)
                {
                    Tab[x,l] = Convert.ToInt32(line1[x])-48; 
                }
            }
            else if(i == 1)
            {
                for(int x = 0;x<4;x++)
                {
                    Tab[x,l] = Convert.ToInt32(line2[x])-48; 
                }
            }
            else if(i == 2)
            {
                for(int x = 0;x<4;x++)
                {
                    Tab[x,l] = Convert.ToInt32(line3[x])-48; 
                }
            }
            else
            {
                for(int x = 0;x<4;x++)
                {
                    Tab[x,l] = Convert.ToInt32(line4[x])-48; 
                }
            }
            l++;
        }

        
        bool o = true;
        bool B = false;
        
        bool a = false;
        bool b = false;
        bool c = false;
        bool d = false;
        
        while(o == true)
        {
           o = false;                            
           
           for(int i = 0;i<4;i++)
            {
                for(int x = 0;x<4;x++)
                {
                    if(Tab[i,x] == 0)
                    {
                        
                        for(int t = 0;t<4;t++)
                        {
                            if(Tab[t,x] == 1)
                            {
                                a = true;
                            }
                            else if(Tab[t,x] == 2)
                            {
                                b = true;
                            }
                            else if(Tab[t,x] == 3)
                            {
                                c = true;
                            }
                            else if(Tab[t,x] == 4)
                            {
                                d = true;
                            }
                        }
                        
                        for(int t = 0;t<4;t++)
                        {
                            if(Tab[i,t] == 1)
                            {
                                a = true;
                            }
                            else if(Tab[i,t] == 2)
                            {
                                b = true;
                            }
                            else if(Tab[i,t] == 3)
                            {
                                c = true;
                            }
                            else if(Tab[i,t] == 4)
                            {
                                d = true;
                            }
                        }
                        
                        if(a == true && b == true && c == true && d == false)
                        {
                           Tab[i,x] = 4; 
                        }
                        else if (a == true && b == true && c == false && d == true)
                        {
                           Tab[i,x] = 3; 
                        }
                        else if (a == true && b == false && c == true && d == true)
                        {
                           Tab[i,x] = 2; 
                        }
                        else if (a == false && b == true && c == true && d == true)
                        {
                           Tab[i,x] = 1; 
                        }
                        
                        a = false;
                        b = false;                        
                        c = false; 
                        d = false;
                    }
                }
            }
           
           for(int i = 0;i<4;i++)
            {
                for(int x = 0;x<4;x++)
                {
                    if(Tab[i,x] == 0)
                    {
                        o = true;
                        B = true;
                        break;
                    }
                }
                if(B == true)
                {
                    B = false;
                    break;
                }
            } 
        }
        
        for(int i = 0;i<4;i++)
        {
            for(int x = 0;x<4;x++)
                {
                    Console.Write(Tab[x,i]); 
                }
                Console.WriteLine();
        }

        // Write an answer using Console.WriteLine()
        // To debug: Console.Error.WriteLine("Debug messages...");

    }
}
