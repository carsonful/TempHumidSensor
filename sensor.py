import time 
import adafruit_dht
import board

dht = adafruit_dht.DHT11(board.D4)


def getTemp():
    try:
        temperature = dht.temperature
        return temperature
    except RuntimeError as e:
        return 0
    
def getHumid():
    try: 
        humidity = dht.humidity
        return humidity
    except RuntimeError as e:
        return 0
