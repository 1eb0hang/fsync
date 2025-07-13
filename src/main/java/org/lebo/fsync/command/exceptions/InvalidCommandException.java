package org.lebo.fsync.command.exceptions;

public class InvalidCommandException extends Exception{
    public InvalidCommandException(String errMessage){
        super(errMessage);
    }

    public InvalidCommandException(String errMessage, Throwable err){
        super(errMessage, err);
    }
}
