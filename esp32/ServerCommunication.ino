void connectWiFi()
{
    Serial.println();
    Serial.println("================================");
    Serial.println("Menghubungkan ke WiFi...");
    Serial.println(WIFI_SSID);

    WiFi.mode(WIFI_STA);
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.print(".");
    }

    Serial.println();
    Serial.println("================================");
    Serial.println("WiFi Connected");
    Serial.print("IP Address : ");
    Serial.println(WiFi.localIP());
    Serial.println("================================");
}

void reconnectWiFi()
{
    if (WiFi.status() == WL_CONNECTED)
        return;

    Serial.println("WiFi Terputus... reconnect");

    WiFi.disconnect();

    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.print(".");
    }

    Serial.println();
    Serial.println("WiFi Connected");
}

void sendToServer()
{
    if (WiFi.status() != WL_CONNECTED)
        return;

    HTTPClient http;

    String url = String(SERVER_HOST) + "/api/sensor";

    http.begin(url);

    http.addHeader("Content-Type", "application/json");

    String json = "{";

json += "\"rain_tip\":" + String(rainTip);

json += ",";

json += "\"rain\":" + String(rainMM, 1);
json += ",";
json += "\"rain_fuzzy\":\"" + rainFuzzy + "\"";

json += ",";
json += "\"soil\":" + String(soilPercent);
json += ",";
json += "\"soil_fuzzy\":\"" + soilFuzzy + "\"";

json += ",";
json += "\"tilt\":" + String(tilt, 1);
json += ",";
json += "\"tilt_fuzzy\":\"" + tiltFuzzy + "\"";

json += ",";
json += "\"fuzzy_value\":" + String(fuzzyOutput, 1);

json += ",";
json += "\"status\":\"" + status + "\"";

json += "}";

    int httpCode = http.POST(json);

    Serial.println("================================");
    Serial.println("SEND TO SERVER");

    Serial.print("HTTP Code : ");
    Serial.println(httpCode);

    Serial.println(json);

    if (httpCode > 0)
    {
        String response = http.getString();

        Serial.println(response);
    }
    else
    {
        Serial.println("POST gagal.");
    }

    Serial.println("================================");

    http.end();
}