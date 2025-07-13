package org.lebo.fsync.util;

import java.util.function.Consumer;
import java.util.function.Function;

public class Utils {
    public static void invokeProcedure(Procedure procedure, 
                                       boolean printStackTrace){
        try{
            procedure.invoke();
        }catch(Exception err){
            if(printStackTrace){
                err.printStackTrace();
            }
        }
    }

    // public static void invokeProcedure(Procedure procedure,
    //                                    Procedure catchProcedure){
    //     try{
    //         procedure.invoke();
    //     }catch(Exception err){
    //         err.printStackTrace();
    //         catchProcedure.invoke();
    //     }
    // }

    // public static void invokeProcedure(Procedure procedure, 
    //                                    boolean printStackTrace,
    //                                    Procedure catchProcedure,
    //                                    Procedure finallyProcedure){
    //     try{
    //         procedure.invoke();
    //     }catch(Exception err){
    //         if(printStackTrace){
    //             err.printStackTrace();
    //         }
    //     }
    // }
}

