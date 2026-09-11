//=====================================================
// EXTERNAL VARIABLE
//=====================================================

extern String status;


//=====================================================
// BUZZER
//=====================================================

unsigned long buzzerTimer = 0;

bool buzzerActive = false;

String lastStatus = "";

const unsigned long BAHAYA_NOTIFICATION_TIME = 300; // 0,3 detik


//=====================================================
// SETUP BUZZER
//=====================================================

void setupBuzzer()
{
    pinMode(PIN_BUZZER, OUTPUT);

    digitalWrite(PIN_BUZZER, LOW);

    lastStatus = status;
}


//=====================================================
// MULAI NOTIFIKASI BAHAYA
//=====================================================

void startBahayaNotification()
{
    buzzerActive = true;

    buzzerTimer = millis();

    digitalWrite(PIN_BUZZER, HIGH);
}


//=====================================================
// UPDATE BUZZER
//=====================================================

void updateBuzzer()
{
    //=================================================
    // BUZZER DINONAKTIFKAN
    //=================================================

    if (!ENABLE_BUZZER)
    {
        digitalWrite(PIN_BUZZER, LOW);

        buzzerActive = false;

        return;
    }


    unsigned long now = millis();


    //=================================================
    // CEK PERUBAHAN STATUS
    //=================================================

    if (status != lastStatus)
    {
        // Hanya aktif jika status berubah menjadi BAHAYA
        if (status == "BAHAYA")
        {
            startBahayaNotification();
        }

        // Simpan status terbaru
        lastStatus = status;
    }


    //=================================================
    // MATIKAN BUZZER SETELAH 0,3 DETIK
    //=================================================

    if (buzzerActive)
    {
        if (now - buzzerTimer >= BAHAYA_NOTIFICATION_TIME)
        {
            digitalWrite(PIN_BUZZER, LOW);

            buzzerActive = false;
        }
    }
}