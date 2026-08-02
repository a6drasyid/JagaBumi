#include <Wire.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <time.h>

#include <LiquidCrystal_I2C.h>
#include <Adafruit_MPU6050.h>
#include <Adafruit_Sensor.h>

#include "Config.h"

LiquidCrystal_I2C lcd(LCD_ADDRESS, LCD_COLS, LCD_ROWS);
Adafruit_MPU6050 mpu;

//============================
// Variabel Global
//============================
volatile long rainTip = 0;
volatile unsigned long lastRainInterrupt = 0;

float rainMM = 0;
float rainBaseMM = 0;


int soilADC = 0;
int soilPercent = 0;

float pitch = 0;
float roll = 0;

unsigned long lastSensor = 0;
unsigned long lastLCD = 0;
unsigned long lastSerial = 0;
unsigned long lastServer = 0;

// bool lcdPage = false;
int currentDay = -1;
unsigned long lastTimeCheck = 0;

void loadLatestRain();

void setup()
{
    Serial.begin(115200);

    Wire.begin(SDA_PIN, SCL_PIN);

    initLCD();

    showWiFiConnecting();

    connectWiFi();

    if (WiFi.status() == WL_CONNECTED)
    {
        showWiFiConnected();
    }
    else
    {
        displayLCD(
            "WiFi",
            "Tidak Terhubung"
        );

        delay(1500);
    }

    initRainGauge();
    showRainGaugeOK();

    displayLCD(
        "Sensor Tanah",
        "OK"
    );
    delay(1500);

    initMPU();
    showMPU6050OK();

    setupBuzzer();

    initTime();

    loadLatestRain();

    showSystemReady();

    Serial.println();
    Serial.println("=======================================");
    Serial.println(" LANDSLIDE EWS READY ");
    Serial.println("=======================================");
}


void loop()
{
    checkNewDay();

    unsigned long now = millis();

    if (now - lastSensor >= SENSOR_INTERVAL)
    {
        lastSensor = now;

        readRain();
        readSoil();
        readMPU();

        updateFuzzyInput();
        fuzzyInference();
    }

    updateLCD();

    if (now - lastSerial >= SERIAL_INTERVAL)
    {
        lastSerial = now;

        printSerial();
    }

    updateBuzzer();

    if (now - lastServer >= SERVER_INTERVAL)
    {
        lastServer = now;

        reconnectWiFi();
        sendToServer();
    }
}