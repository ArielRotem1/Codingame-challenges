import java.util.*;
import java.io.*;
import java.math.*;

/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

class ResearchTime{
    public int startDay;
    public int endDay;

    public ResearchTime(int startDay, int duration){
        this.startDay = startDay;
        this.endDay = startDay + duration - 1;
    }
}

class Solution {

    private static ResearchTime[] researchs;
    private static int indexResearchs = 0;
    public static int N;

    public static void main(String args[]) {
        Scanner in = new Scanner(System.in);
        N = in.nextInt();
        researchs = new ResearchTime[N];
        for (int k = 0; k < N; k++) {
            int startDay = in.nextInt();
            int duration = in.nextInt();
            ResearchTime researchTime = new ResearchTime(startDay, duration);

            researchs[indexResearchs] = researchTime;
            indexResearchs++;
        }

        Arrays.sort(researchs, (a, b) -> a.endDay < b.endDay ? -1 : a.endDay == b.endDay ? 0 : 1);

        int counter = 0;

        int prevEndDay = -1;

        for(int i = 0; i < N; i++){
            if(researchs[i].startDay > prevEndDay){
                prevEndDay = researchs[i].endDay;
                counter++;
            }
        }

        System.out.println(counter);
    }
}
