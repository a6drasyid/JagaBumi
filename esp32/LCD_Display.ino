
const unsigned long LCD_PAGE_INTERVAL = 5000;
const unsigned long LCD_REFRESH_INTERVAL = 250;
const unsigned long LCD_INFO_DURATION = 2000;

byte lcdPage = 0;

unsigned long lcdPageMillis = 0;
unsigned long lcdRefreshMillis = 0;
unsigned long lcdInfoStart = 0;

bool lcdInfoActive = false;

String lcdLastLine1 = "";
String lcdLastLine2 = "";

void displayLCD(String line1, String line2)
{
    if (line1.length() > 16)
        line1 = line1.substring(0, 16);

    if (line2.length() > 16)
        line2 = line2.substring(0, 16);

    while (line1.length() < 16)
        line1 += " ";

    while (line2.length() < 16)
        line2 += " ";

    if (line1 != lcdLastLine1)
    {
        lcd.setCursor(0, 0);
        lcd.print(line1);

        lcdLastLine1 = line1;
    }

    if (line2 != lcdLastLine2)
    {
        lcd.setCursor(0, 1);
        lcd.print(line2);

        lcdLastLine2 = line2;
    }
}

void forceLCD(String line1, String line2)
{
    lcdLastLine1 = "";
    lcdLastLine2 = "";

    displayLCD(line1, line2);
}

void initLCD()
{
    lcd.init();
    lcd.backlight();
    lcd.clear();

    forceLCD(
        "Inisialisasi",
        "Sistem..."
    );

    delay(1500);
}

void showWiFiConnecting()
{
    forceLCD(
        "Menghubungkan",
        "WiFi..."
    );
}

void showWiFiConnected()
{
    forceLCD(
        "WiFi",
        "Terhubung"
    );

    delay(1500);
}

void showWiFiDisconnected()
{
    if (status == "BAHAYA")
        return;

    forceLCD(
        "WiFi Terputus",
        "Koneksi Ulang..."
    );

    lcdInfoActive = true;
    lcdInfoStart = millis();
}

void showSoilSensorOK()
{
    forceLCD(
        "Sensor Tanah",
        "OK"
    );

    delay(1500);
}

void showRainGaugeOK()
{
    forceLCD(
        "Rain Gauge",
        "OK"
    );

    delay(1500);
}

void showMPU6050OK()
{
    forceLCD(
        "MPU6050",
        "OK"
    );

    delay(1500);
}

void showMPU6050Failed()
{
    forceLCD(
        "MPU6050",
        "Gagal"
    );

    delay(1500);
}

void showSystemReady()
{
    forceLCD(
        "Sistem Siap",
        "Monitoring..."
    );

    delay(1500);

    lcdPage = 0;

    lcdPageMillis = millis();
    lcdRefreshMillis = millis();

    lcdInfoActive = false;

    forceLCD(
        "Curah Hujan",
        String(rainMM, 1) + " mm/hari"
    );
}

void showDataSent()
{
    if (status == "BAHAYA")
        return;

    forceLCD(
        "Data Berhasil",
        "Dikirim"
    );

    lcdInfoActive = true;
    lcdInfoStart = millis();
}

void showDataFailed()
{
    if (status == "BAHAYA")
        return;

    forceLCD(
        "Pengiriman Data",
        "Gagal"
    );

    lcdInfoActive = true;
    lcdInfoStart = millis();
}

void showRainPage()
{
    displayLCD(
        "Curah Hujan",
        String(rainMM, 1) + " mm/hari"
    );
}

void showSoilPage()
{
    displayLCD(
        "Kelembapan",
        String(soilPercent) + " %"
    );
}

void showTiltPage()
{
    String line2 = String(tilt, 1);
    line2 += (char)223;

    displayLCD(
        "Kemiringan",
        line2
    );
}

void showStatusPage()
{
    if (status == "AMAN")
    {
        displayLCD(
            "Status Longsor",
            "AMAN"
        );
    }
    else if (status == "WASPADA")
    {
        displayLCD(
            "Status Longsor",
            "WASPADA"
        );
    }
    else if (status == "BAHAYA")
    {
        displayLCD(
            "!!! BAHAYA !!!",
            "RISIKO LONGSOR"
        );
    }
    else
    {
        displayLCD(
            "Status Longsor",
            "Memproses..."
        );
    }
}

void showCurrentLCDPage()
{
    switch (lcdPage)
    {
        case 0:
            showRainPage();
            break;

        case 1:
            showSoilPage();
            break;

        case 2:
            showTiltPage();
            break;

        case 3:
            showStatusPage();
            break;
    }
}

void updateLCD()
{
    unsigned long now = millis();

    if (status == "BAHAYA")
    {
        lcdInfoActive = false;

        displayLCD(
            "!!! BAHAYA !!!",
            "RISIKO LONGSOR"
        );

        return;
    }

    if (lcdInfoActive)
    {
        if (now - lcdInfoStart < LCD_INFO_DURATION)
            return;

        lcdInfoActive = false;

        lcdPage = 0;

        lcdPageMillis = now;
        lcdRefreshMillis = now;

        forceLCD(
            "Curah Hujan",
            String(rainMM, 1) + " mm/hari"
        );

        return;
    }

    if (now - lcdPageMillis >= LCD_PAGE_INTERVAL)
    {
        lcdPageMillis = now;

        lcdPage++;

        if (lcdPage > 3)
            lcdPage = 0;

        lcdLastLine1 = "";
        lcdLastLine2 = "";

        showCurrentLCDPage();
    }

    if (now - lcdRefreshMillis >= LCD_REFRESH_INTERVAL)
    {
        lcdRefreshMillis = now;

        showCurrentLCDPage();
    }
}

void resetLCDMonitoring()
{
    lcdInfoActive = false;

    lcdPage = 0;

    lcdPageMillis = millis();
    lcdRefreshMillis = millis();

    forceLCD(
        "Curah Hujan",
        String(rainMM, 1) + " mm/hari"
    );
}



