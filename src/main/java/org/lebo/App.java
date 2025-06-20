package org.lebo;

// import java.io.BufferedInputStream;
// import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.InputStreamReader;
// import java.lang.reflect.Array;

public class App{
    // private static final String[] COMMANDS = new String[]{"exit","print"};

    public static void main(String[] args){
        boolean running = true;
        BufferedReader reader;

        try{
            reader = new BufferedReader(new InputStreamReader(System.in));
            while(running){
                System.out.print(">> ");
                String str = reader.readLine();

                switch(str.toLowerCase().split(" ")[0]){
                    case "print":
                        System.out.println("Print: " + str);
                        break;
                    
                    case "exit":
                        System.out.println("Exiting...");
                        running = false;
                        break;
                    
                    default:
                        System.out.println("Command not valid");
                }
            }
            reader.close();
        }catch(Exception err){
            err.printStackTrace();
            return;
        }
    }
}