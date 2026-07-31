#include <HTTPClient.h>
#include <ArduinoJson.h>

void loadLatestRain()
{
    if (WiFi.status() != WL_CONNECTED)
    {
        Serial.println("WiFi belum terhubung.");
        return;
    }

    HTTPClient http;

    String url = String(SERVER_HOST) + "/api/sensor/latest";

    Serial.println();
    Serial.println("================================");
    Serial.println("Restore Rain Data");
    Serial.println(url);

    http.begin(url);

    int httpCode = http.GET();

    if (httpCode == HTTP_CODE_OK)
    {
        String payload = http.getString();

        Serial.println(payload);

        DynamicJsonDocument doc(256);

        DeserializationError err = deserializeJson(doc, payload);

        if (!err)
        {
            rainTip = doc["rain_tip"] | 0;
            rainMM = doc["rain"] | 0.0;

            Serial.println("Restore berhasil.");

            Serial.print("Rain Tip : ");
            Serial.println(rainTip);

            Serial.print("Rain MM  : ");
            Serial.println(rainMM);
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