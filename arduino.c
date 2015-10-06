/*
  Example Bluetooth Serial Passthrough Sketch
 by: Jim Lindblom
 SparkFun Electronics
 date: February 26, 2013
 license: Public domain

 This example sketch converts an RN-42 bluetooth module to
 communicate at 9600 bps (from 115200), and passes any serial
 data between Serial Monitor and bluetooth module.
 */
#include <SoftwareSerial.h>

int GPSTx = 2;        // TX-O pin of Grove GPS, Arduino D2
int GPSRx = 3;        // RX-I pin of Grove GPS, Arduino D3
int bluetoothTx = 8;  // TX-O pin of bluetooth mate, Arduino D4
int bluetoothRx = 9;  // RX-I pin of bluetooth mate, Arduino D5

//GPS
unsigned char buffer[500];                   // buffer array for data receive over serial port
unsigned char temp;
int count=0, i=0;                            // counter for buffer array

SoftwareSerial GPS(GPSTx, GPSRx);
SoftwareSerial bluetooth(bluetoothTx, bluetoothRx);

void setup()
{
  Serial.begin(9600);  // Begin the serial monitor at 9600bps

  bluetooth.begin(115200);  // The Bluetooth Mate defaults to 115200bps
  bluetooth.print("$");     // Print three times individually
  bluetooth.print("$");
  bluetooth.print("$");     // Enter command mode
  delay(100);               // Short delay, wait for the Mate to send back CMD
  bluetooth.println("U,9600,N");  // Temporarily Change the baudrate to 9600, no parity
  bluetooth.begin(9600);    // Start bluetooth serial at 9600
  GPS.begin(9600);          // Start GPS serial at 9600
}

void loop()
{
  if (GPS.available())                     // if date is coming from software serial port ==> data is coming from SoftSerial shield
    {
        while(GPS.available())             // reading data into char array
        {
            buffer[count++]=GPS.read();    // writing data into array
            if(count == 500)break;
        }

        //Serial.print(count);

        count = 0;

        do
        {
          if(buffer[count] == 'G' && buffer[count+1] == 'G' && buffer[count+2] == 'A')
          {
            count = count+15;
            for(i=0;i<22;i++)
            {
              switch (i)

              {
                case 0: if(buffer[count+10] == 'S') {
                  Serial.print('-');
                }
                break;

                case 2: Serial.print(' ');
                 break;

                case 9: Serial.print(' ');
                  i = i+2;
                  break;

                case 12: if(buffer[count+i+11] == 'W') {
                  Serial.print('-');
                }
                break;

                case 15: Serial.print(' ');
                  break;

                case 22: Serial.print(' ');
                  i = i+2;
                  break;
              }
              Serial.print((char)buffer[count+i]);
            }
            Serial.println(' ');
            break;
          }
          count++;
        } while(count<500);


        clearBufferArray();                // call clearBufferArray function to clear the stored data from the array
        count = 0;                         // set counter of while loop to zero
        delay(100);


    }
}

void clearBufferArray()                     // function to clear buffer array
{
    for (int i=0; i<count;i++)
    { buffer[i]=NULL;}                      // clear all index of array with command NULL
}
