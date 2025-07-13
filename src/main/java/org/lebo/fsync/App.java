package org.lebo.fsync;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import org.lebo.fsync.command.Commands;
import org.lebo.fsync.command.exceptions.InvalidCommandException;
import org.lebo.fsync.util.Utils;

public class App{

    public static void main(String[] args){
        boolean running = true;
        BufferedReader reader;

        reader = new BufferedReader(new InputStreamReader(System.in));

        while(running){
            try{
                
                System.out.print(">> ");
                String str = reader.readLine();
    
                running = Commands.handleCommand(str);
            }catch(InvalidCommandException err){
                err.printStackTrace();
            }catch(IOException err){
                err.printStackTrace();
            }
        }

        Utils.invokeProcedure(reader::close, true);
    }
}