import time
import sys

# argv[0] === file path
nodeID = sys.argv[1]

#raise ValueError('A very specific bad thing happened.')

time.sleep(1.4)
print("Printed after 1.4 seconds for node: " + nodeID)