import time
import sys

# argv[0] === file path
nodeID = sys.argv[1]
actionID = sys.argv[2]

#raise ValueError('A very specific bad thing happened.')

time.sleep(0.4)
print("Action " + actionID + " was completed in 0.4 seconds for node " + nodeID )