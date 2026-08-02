
void IRAM_ATTR rainISR()
{
    unsigned long now = micros();

    if (now - lastRainInterrupt > 250000)
    {
        rainTip++;
        lastRainInterrupt = now;
    }
}

void initRainGauge()
{
    pinMode(RAIN_PIN, INPUT_PULLUP);

    noInterrupts();

    rainTip = 0;
    lastRainInterrupt = 0;

    interrupts();

    attachInterrupt(
        digitalPinToInterrupt(RAIN_PIN),
        rainISR,
        FALLING
    );
}

void readRain()
{
    long tip;

    noInterrupts();

    tip = rainTip;

    interrupts();

    rainMM = rainBaseMM + (tip * MM_PER_TIP);
}
