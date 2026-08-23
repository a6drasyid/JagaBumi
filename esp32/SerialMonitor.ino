//=====================================================
// PROGRESS BAR
//=====================================================

void printProgressBar(float value)
{
    const byte width = 20;

    int filled = round(value * width);

    Serial.print("[");

    for (int i = 0; i < width; i++)
    {
        if (i < filled)
            Serial.print("#");
        else
            Serial.print("-");
    }

    Serial.printf("] %.3f", value);
}

//=====================================================
// SERIAL MONITOR
//=====================================================

void printSerial()
{
    Serial.println();
    Serial.println("======================================================================");
    Serial.println("            SISTEM PERINGATAN DINI LONGSOR BERBASIS IoT");
    Serial.println("======================================================================");

    //====================================================
// DATA SENSOR / MODE PENGUJIAN
//====================================================

Serial.println();

if (TEST_MODE)
{
    Serial.println("[MODE PENGUJIAN - INPUT MANUAL]");
    Serial.println("----------------------------------------------------------------------");

    Serial.printf("%-25s : %.2f mm\n", "Curah Hujan", rainMM);
    Serial.printf("%-25s : %d %%\n", "Kelembaban Tanah", soilPercent);
    Serial.printf("%-25s : %.2f derajat\n", "Kemiringan", tilt);
}
else
{
    Serial.println("[DATA SENSOR]");
    Serial.println("----------------------------------------------------------------------");

    Serial.printf("%-25s : %ld Tip\n", "Rain Gauge", rainTip);
    Serial.printf("%-25s : %.2f mm\n", "Curah Hujan", rainMM);

    Serial.println();

    Serial.printf("%-25s : %d\n", "ADC Kelembaban", soilADC);
    Serial.printf("%-25s : %d %%\n", "Kelembaban Tanah", soilPercent);

    Serial.println();

    Serial.printf("%-25s : %.2f derajat\n", "Pitch", pitch);
    Serial.printf("%-25s : %.2f derajat\n", "Roll", roll);
    Serial.printf("%-25s : %.2f derajat\n", "Kemiringan Maksimum", tilt);
}

    //====================================================
    // FUZZIFIKASI
    //====================================================

    Serial.println();
    Serial.println("[FUZZIFIKASI]");
    Serial.println("----------------------------------------------------------------------");

    Serial.println();
    Serial.println("Curah Hujan");

    Serial.print("Rendah   ");
    printProgressBar(hujanRendah());
    Serial.println();

    Serial.print("Sedang   ");
    printProgressBar(hujanSedang());
    Serial.println();

    Serial.print("Tinggi   ");
    printProgressBar(hujanTinggi());
    Serial.println();

    Serial.println();

    Serial.println("Kelembaban Tanah");

    Serial.print("Kering   ");
    printProgressBar(soilKering());
    Serial.println();

    Serial.print("Lembab   ");
    printProgressBar(soilLembab());
    Serial.println();

    Serial.print("Basah    ");
    printProgressBar(soilBasah());
    Serial.println();

    Serial.println();

    Serial.println("Kemiringan");

Serial.print("Normal       ");
printProgressBar(tiltNormal());
Serial.println();

Serial.print("Significant  ");
printProgressBar(tiltSignificant());
Serial.println();

Serial.print("Extreme      ");
printProgressBar(tiltExtreme());
Serial.println();

    //====================================================
// HASIL FUZZIFIKASI
//====================================================

Serial.println();
Serial.println("[HASIL FUZZIFIKASI]");
Serial.println("----------------------------------------------------------------------");

Serial.printf("%-25s : %s\n",
              "Curah Hujan",
              rainFuzzy.c_str());

Serial.printf("%-25s : %s\n",
              "Kelembaban Tanah",
              soilFuzzy.c_str());

Serial.printf("%-25s : %s\n",
              "Kemiringan",
              tiltFuzzy.c_str());

    //====================================================
    // RULE AKTIF
    //====================================================

    Serial.println();
    Serial.println("[RULE YANG AKTIF]");
    Serial.println("----------------------------------------------------------------------");

    Serial.println("No  Curah Hujan  Kelembaban   Kemiringan   Output      Alpha");
    Serial.println("----------------------------------------------------------------------");

    bool active = false;

    float maxAlpha = 0;
    byte maxRule = 255;

    for (byte i = 0; i < TOTAL_RULE; i++)
    {
        if (rule[i] > 0.001)
        {
            active = true;

            Serial.printf("%02d  %-12s  %-11s  %-11s  %-9s  %.3f\n",
                          i + 1,
                          rainName(ruleTable[i].rain),
                          soilName(ruleTable[i].soil),
                          tiltName(ruleTable[i].tilt),
                          outputName(ruleTable[i].output),
                          rule[i]);

            if (rule[i] > maxAlpha)
            {
                maxAlpha = rule[i];
                maxRule = i;
            }
        }
    }

    if (!active)
    {
        Serial.println("Tidak ada rule yang aktif.");
    }
    else
    {
        Serial.println("----------------------------------------------------------------------");

        Serial.printf("Rule Dominan   : %02d\n", maxRule + 1);

        Serial.printf("Output Rule    : %s\n",
                      outputName(ruleTable[maxRule].output));

        Serial.printf("Nilai Alpha    : %.3f\n",
                      maxAlpha);
    }

    //====================================================
    // AGREGASI
    //====================================================

    Serial.println();
    Serial.println("[AGREGASI]");
    Serial.println("----------------------------------------------------------------------");

    Serial.print("AMAN      ");
    printProgressBar(amanValue);
    Serial.println();

    Serial.print("WASPADA   ");
    printProgressBar(waspadaValue);
    Serial.println();

    Serial.print("BAHAYA    ");
    printProgressBar(bahayaValue);
    Serial.println();

    //====================================================
    // DEFUZZIFIKASI
    //====================================================

    Serial.println();
    Serial.println("[HASIL DEFUZZIFIKASI]");
    Serial.println("----------------------------------------------------------------------");

    Serial.printf("%-25s : %.2f\n",
                  "Nilai Centroid",
                  fuzzyOutput);

    Serial.printf("%-25s : %.2f %%\n",
                  "Indeks Risiko",
                  fuzzyOutput);

    Serial.printf("%-25s : %s\n",
                  "Status",
                  status.c_str());

    Serial.println();
    Serial.println("======================================================================");
}