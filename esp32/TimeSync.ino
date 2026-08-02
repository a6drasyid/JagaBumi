#include <time.h>

void initTime()
{
    Serial.println();
    Serial.println("================================");
    Serial.println("Sinkronisasi Waktu (NTP)");

    configTime(GMT_OFFSET_SEC, DAYLIGHT_OFFSET_SEC, NTP_SERVER);

    struct tm timeinfo;

    while (!getLocalTime(&timeinfo))
    {
        Serial.print(".");
        delay(500);
    }

    currentDay = timeinfo.tm_mday;

    Serial.println();
    Serial.println("Sinkronisasi berhasil");

    Serial.print("Tanggal : ");
    Serial.println(timeinfo.tm_mday);

    Serial.print("Bulan   : ");
    Serial.println(timeinfo.tm_mon + 1);

    Serial.print("Tahun   : ");
    Serial.println(timeinfo.tm_year + 1900);

    Serial.print("Jam     : ");
    Serial.printf("%02d:%02d:%02d\n",
                  timeinfo.tm_hour,
                  timeinfo.tm_min,
                  timeinfo.tm_sec);

    Serial.println("================================");
}


void checkNewDay()
{
    if (millis() - lastTimeCheck < 60000)
        return;

    lastTimeCheck = millis();

    struct tm timeinfo;

    if (!getLocalTime(&timeinfo))
        return;

    if (timeinfo.tm_mday != currentDay)
    {
        currentDay = timeinfo.tm_mday;

        noInterrupts();

        rainTip = 0;

        interrupts();

        rainBaseMM = 0;
        rainMM = 0;

        Serial.println();
        Serial.println("================================");
        Serial.printf(
            "Hari berganti : %02d-%02d-%04d\n",
            timeinfo.tm_mday,
            timeinfo.tm_mon + 1,
            timeinfo.tm_year + 1900
        );

        Serial.println("Curah hujan direset");
        Serial.println("Rain Base : 0.0 mm");
        Serial.println("Rain Tip  : 0");
        Serial.println("Rain MM   : 0.0 mm");
        Serial.println("================================");

        if (WiFi.status() == WL_CONNECTED)
        {
            sendToServer();
        }
    }
}


//=====================================================
// Mengambil tanggal dan waktu dalam format
// YYYY-MM-DD HH:MM:SS
//=====================================================

String getDateTime()
{
    struct tm timeinfo;

    if (!getLocalTime(&timeinfo))
    {
        return "";
    }

    char buffer[20];

    strftime(buffer, sizeof(buffer), "%Y-%m-%d %H:%M:%S", &timeinfo);

    return String(buffer);
}