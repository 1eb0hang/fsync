package org.lebo.fsync.util;

public class Colour{
    private Colour() throws Exception{
        throw new Exception("Cannot intialize Colour class");
    }

    /*
     * Colours
     * Colours 0 -7:
     *  0 - BLACK
     *  1 - RED
     *  2 - GREEN
     *  3 - YELLOW
     *  4 - BLUE
     *  5 - MAGENTA
     *  6 - CYAN
     *  7 - WHITE
     * 
     * Colours 8 - 15 are the same but "brighter"
     * 
     * COLOUR CODE SYNTAX
     *  3_  - Text       - Standard
     *  4_  - Backgound  - Standard
     *  9_  - Text       - Bright
     *  10_ - Background - Bright
     * 
     * EG
     * Colour Red Text Standard:       \x1b[31m
     * Colour Red Background Standard: \x1b[41m
     * Colour Red Text Bright:         \x1b[91m
     * Colour Red Background Bright:   \x1b[101m
     * 
     * NOTE: "\x1b[" indicates the start of the sequencw, also called
     *        "Control Sequence Introducer"(CSI)
     * 
     * NOTE: "m" ends the sequence and calls graphics function 
     *       "Select Graphic Rendition"(SGR) 
     * 
     * \x1b[ {Colour type (3,4,9,10)} {Colour index(0-7)} m
     * 
     * NOTE: "\x1b[0m" is default terminal colour
     */
    public static String DEFAULT = "";
    public static String RED = "";
}

// public class Colour {
//     private String current;

//     public Colour(){}
// }
