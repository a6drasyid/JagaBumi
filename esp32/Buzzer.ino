//=====================================================
// EXTERNAL VARIABLE
//=====================================================

extern String status;
//=====================================================
// BUZZER
//=====================================================

unsigned long buzzerTimer = 0;
bool buzzerState = false;

void setupBuzzer()
{
    pinMode(PIN_BUZZER, OUTPUT);
    digitalWrite(PIN_BUZZER, LOW);
}

//=====================================================
// UPDATE BUZZER
//=====================================================


void updateBuzzer()
{
    if (!ENABLE_BUZZER)
    {
        digitalWrite(PIN_BUZZER, LOW);
        return;
    }

    if (status == "BAHAYA")
    {
        // Bunyi terus selama status BAHAYA
        digitalWrite(PIN_BUZZER, HIGH);
    }
    else
    {
        // AMAN & WASPADA
        digitalWrite(PIN_BUZZER, LOW);
    }
}