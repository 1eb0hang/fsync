package org.lebo.fsync.command;

import java.util.Arrays;

import org.lebo.fsync.command.exceptions.InvalidCommandException;


public abstract class Commands {
    public static String[] COMMANDS = new String[]{"EXIT","PRINT","HOST","PULL"}; 

    public abstract boolean execute();
    public static boolean handleCommand(String command) throws InvalidCommandException{
        
        final String action = command.strip().toUpperCase();
        final boolean validCommand = Arrays.stream(COMMANDS).anyMatch(action::equals);
        if(!validCommand) throw new InvalidCommandException(
            String.format("Ivalid command: %s", command));
        
        System.out.println(String.format("Executing command: %s", command));
        
        if(action.equals("EXIT")){
            return false;
        }

        return true;
    }
}
