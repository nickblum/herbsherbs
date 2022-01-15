import sys
import time
import struct
import json
from RF24 import RF24, RF24_PA_MAX

CE_PIN = 22
CS_PIN = 0
radio = RF24(CE_PIN, CS_PIN)
transmit_timeout = 5
listen_timeout = 10

def awaitResponse():
    radio.startListening()  # put radio in RX mode
  
    timeout = time.time() + listen_timeout  # keep trying for 10 seconds
    response = -500.0
    while time.time() < timeout:
        has_payload, pipe_number = radio.available_pipe()
        if has_payload:
            buffer = radio.read(radio.payloadSize)

            # use struct.unpack() to convert the buffer into usable data
            # expecting a little endian float, thus the format string "<f"
            # buffer[:4] truncates padded 0s in case payloadSize was not set
            response = struct.unpack("<f", buffer[:4])[0]
            hasResponse = True
            break

    if response >= -200:
        print(json.dumps({"status": 200, "message": "OK", "body":response}))
    else:
        print(json.dumps({"status": abs(int(response)), "message": "MCU Error"}))

    radio.powerDown()
        
if __name__ == "__main__":
    # initialize the nRF24L01 on the spi bus
    if not radio.begin():
        print(json.dumps({"status": 500, "message": "Radio hardware is not responding"}))
        sys.exit()

    mcuID = sys.argv[1]
    mcuPath = str(mcuID).zfill(5) # nodeID=25 ==> '00025'
    mcuAction = int(sys.argv[2])
    mcuArg = int(sys.argv[3])

    radio.setPALevel(RF24_PA_MAX)  # set transmission power
    radio.openWritingPipe(str.encode(mcuPath))     # pipe 0, 
    radio.openReadingPipe(1, b"nodes")  # pipe 1, 

    radio.stopListening()  # put radio in TX mode
    buffer = struct.pack('HH', *[mcuAction,mcuArg]) # H == short; that is, 2 bytes per int
    radio.payloadSize = len(buffer)
     
    timeout = time.time() + transmit_timeout # keep trying for xx seconds
    while time.time() < timeout:
        result = radio.write(buffer)
        if not result:
            time.sleep(.2)
        else:
            awaitResponse()
            break
    
    if not result:
        print(json.dumps({"status": 408, "message": "Transmission timeout"}))