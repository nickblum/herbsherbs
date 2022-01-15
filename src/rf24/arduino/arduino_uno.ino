/*
   See documentation at https://nRF24.github.io/RF24
   See License information at root directory of this library
   Author: Brendan Doherty (2bndy5)
*/
#include <SPI.h>
#include "printf.h"
#include "RF24.h"

RF24 radio(7, 8); // using pin 7 for the CE pin, and pin 8 for the CSN pin
const int RELAY_PIN = 6;
unsigned int payload[2]; // shape of receiving payload 
float nodeID = 2.0;
uint8_t addresses[][6] = {"nodes", "00002"};

void setup() {
  Serial.begin(9600);
  while (!Serial) {
    // some boards need to wait to ensure access to serial over USB
  }

  // initialize the transceiver on the SPI bus
  if (!radio.begin()) {
    Serial.println(F("radio hardware is not responding!!"));
    while (1) {} // hold in infinite loop
  }

  radio.setPALevel(RF24_PA_MAX);  // power level
  radio.setPayloadSize(sizeof(payload)); // [unsigned int, unsigned int] == 4 bytes
  radio.openWritingPipe(addresses[0]);    // pipe 0
  radio.openReadingPipe(1,addresses[1]);  // pipe 1

  radio.startListening();

  pinMode(RELAY_PIN, OUTPUT);

} // setup

void loop() {
  uint8_t pipe;
  if (radio.available(&pipe)) {             // is there a payload? get the pipe number that recieved it
    radio.read(&payload, radio.getPayloadSize());            // fetch payload from FIFO

    switch (payload[0]) {
      case 0:
        sendResponse(nodeID);
        break; // just testing communication
      case 1:
        openValve(payload[1]);
        break;
      default:
        sendResponse(-404.0);
        break;
    }
  }
}

void sendResponse(float response) {
  radio.stopListening();
  
  bool report = radio.write(&response, sizeof(float));
  if (report){
    Serial.println(F("Transmission success"));
  } else {
    Serial.print(F("Failed to send"));
  } 
  radio.startListening();
}

void openValve(int arg){
  digitalWrite(RELAY_PIN, HIGH);
  delay(arg);
  digitalWrite(RELAY_PIN, LOW);
  sendResponse(200);
}