import sys
import time
import struct
from RF24 import RF24, RF24_PA_MAX

CE_PIN = 22
CS_PIN = 0
radio = RF24(CE_PIN, CS_PIN)

def awaitResponse():
    radio.startListening()  # put radio in RX mode
  
    timeout = time.time() + 10   # keep trying for 10 seconds
    hasResponse = False
    while time.time() < timeout:
        has_payload, pipe_number = radio.available_pipe()
        if has_payload:
            buffer = radio.read(radio.payloadSize)

            # use struct.unpack() to convert the buffer into usable data
            # expecting a little endian float, thus the format string "<f"
            # buffer[:4] truncates padded 0s in case payloadSize was not set
            response = struct.unpack("<f", buffer[:4])[0]
            print("Response received: {}".format(response))
            hasResponse = True
            break

    print('power down...')
    radio.powerDown()
        
if __name__ == "__main__":
    # initialize the nRF24L01 on the spi bus
    if not radio.begin():
        raise RuntimeError("radio hardware is not responding")

    radio.setPALevel(RF24_PA_MAX)  # set transmission power
    radio.openWritingPipe(b"2Node")  # always uses pipe 0
    radio.openReadingPipe(1, b"1Node")  # using pipe 1

    radio.stopListening()  # put radio in TX mode
    buffer = struct.pack('HH', *[2,3254]) # H == short; that is, 2 bytes per int
    radio.payloadSize = len(buffer)
     
    timeout = time.time() + 10   # keep trying for 10 seconds
    while time.time() < timeout:
        result = radio.write(buffer)
        if not result:
            print("Transmission failed, trying again...")
            time.sleep(.2)
        else:
            print("Transmission successful! Listening for response...")
            awaitResponse()
            break