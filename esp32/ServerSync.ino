
#include <HTTPClient.h>
#include <ArduinoJson.h>

void loadLatestRain()
{
    if (WiFi.status() != WL_CONNECTED)
    {
        Serial.println("WiFi belum terhubung.");
        return;
    }

    struct tm timeinfo;

    if (!getLocalTime(&timeinfo))
    {
        Serial.println("Waktu belum tersedia.");
        return;
    }

    char dateBuffer[11];

    strftime(
        dateBuffer,
        sizeof(dateBuffer),
        "%Y-%m-%d",
        &timeinfo
    );

    String today = String(dateBuffer);

    HTTPClient http;

    String url =
        String(SERVER_HOST) +
        "/api/sensor/latest?date=" +
        today;

    Serial.println();
    Serial.println("================================");
    Serial.println("Restore Rain Data");

    Serial.print("Tanggal : ");
    Serial.println(today);

    Serial.println(url);

    http.begin(url);

    int httpCode = http.GET();

    if (httpCode == HTTP_CODE_OK)
    {
        String payload = http.getString();

        Serial.println(payload);

        DynamicJsonDocument doc(512);

        DeserializationError err =
            deserializeJson(doc, payload);

        if (!err)
        {
            float lastRain =
                doc["rain"] | 0.0;

            String createdAt =
                doc["created_at"] | "";

            noInterrupts();

            rainTip = 0;

            interrupts();

            if (createdAt.length() >= 10)
            {
                rainBaseMM = lastRain;
                rainMM = rainBaseMM;

                Serial.println();
                Serial.println("Data hari ini ditemukan.");
                Serial.println("Curah hujan dilanjutkan.");
            }
            else
            {
                rainBaseMM = 0;
                rainMM = 0;

                Serial.println();
                Serial.println("Belum ada data hari ini.");
                Serial.println("Curah hujan mulai dari 0.");
            }

            Serial.print("Rain Base : ");
            Serial.print(rainBaseMM, 1);
            Serial.println(" mm");

            Serial.print("Rain Tip  : ");
            Serial.println(rainTip);

            Serial.print("Rain MM   : ");
            Serial.print(rainMM, 1);
            Serial.println(" mm");
        }
        else
        {
            Serial.println("JSON Error");
        }
    }
    else
    {
        Serial.print("HTTP Error : ");
        Serial.println(httpCode);
    }

    http.end();

    Serial.println("================================");
}