# Red Badger Coding Challenge

## Thought process:
Requires a file reader to read line by line through the Robot Instruction File:
Startup
    Read line 1 (push the space separated characters into an array)
    Verify and Save co ordinates of the grid to mapGridX and mapGridY
    Initialise a hash for the Scent Matrix
    Iterate through the lines of the file 
        ForEach robot
            Read the start point of the robot (push the space separated characters into an array)
            Set the current co ordinates and direction of the robot from above array elements
            For the next line (push each character into an array element - set the instruction pointer)
                Execute instruction
                    Is the instruction an "F"? (use is contained in a list of movements)
                        Is the co ordinate in the scent matrix?
                            does the orientation exist in the scent matrix string?
                                yes - ignore the instruction
                        calculate new position
                            is it off the grid?
                                yes - output current co ordinates and orientation and "lost"
                                    update scent matrix (hash) with orientation when lost
                                no - set the current co ordinates of the robot 
                    Is the instruction an orientation instruction? (use is contained in a list of orientations)
                        set the robot orientation

## Instructions for use:
Install Node and git
Checkout using "git clone git@github.com:darrellvermaak/RBCodeChallenge.git"
Change into the RBCodeChallenge directory and execute "npm i"
Create a robot instruction file as per the specifications and save it in a file in dist/instructions/instruction.txt
Compile the app using "npm run build"
Run the app using "npm run start" 