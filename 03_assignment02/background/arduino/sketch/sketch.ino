const int TOLERANCE  = 5;

int sensor1 = A0;    
int sensor2 = A1;
int sensor3 = A2;
int sensor4 = A3;

/* Global values for the pot's values */

void setup() {
  Serial.begin(9600);
  pinMode(13, OUTPUT);
}

void loop() {
  

  int val1 = analogRead( sensor1 );    // read the value from the sensor 0
  int val2 = analogRead( sensor2 );    // read the value from the sensor 1
  int val3 = analogRead( sensor3 );    // read the value from the sensor 1
  int val4 = analogRead( sensor4 );    // read the value from the sensor 1
    
  Serial.print( val1 );
  Serial.print( "," );
  Serial.print( val2 );
  Serial.print( "," );
  Serial.print( val3 );
  Serial.print( "," );
  Serial.println( val4 );
    
  // Turn on the LED

  if(val1 > 1000 && val2 > 1000 && val3 > 1000 && val4 > 1000) {
    digitalWrite(13, HIGH);
  } else {
    digitalWrite(13, LOW);
  }

  delay(250);
}



