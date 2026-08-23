//=====================================================
// FUZZY LOGIC MAMDANI
// IMPLEMENTASI SISTEM PERINGATAN DINI LONGSOR
//=====================================================

//=====================================================
// FUZZY CONFIGURATION
//=====================================================
//=====================================================
// DEFUZZIFICATION CONFIGURATION
//=====================================================

// Resolusi sampling centroid
const float DEFUZZ_STEP = 1.0;

// Rentang output fuzzy
const float OUTPUT_MIN = 0.0;
const float OUTPUT_MAX = 100.0;
//=====================================================
// CURAH HUJAN (mm)
//=====================================================

// Rendah (Trapesium)
const float MF_RAIN_LOW[4] = {0, 0, 20, 30};

// Sedang (Segitiga)
const float MF_RAIN_MEDIUM[3] = {20, 50, 80};

// Tinggi (Trapesium)
const float MF_RAIN_HIGH[4] ={60, 100, 150, 150};

//=====================================================
// KELEMBABAN TANAH (%)
//=====================================================

// Kering
const float MF_SOIL_DRY[4] = {0, 0, 25, 45 };

// Lembab
const float MF_SOIL_MOIST[3] = {30, 50, 70};

// Basah
const float MF_SOIL_WET[4] = {55, 75, 100, 100};

//=====================================================
// KEMIRINGAN TANAH
//=====================================================

// Normal
const float MF_TILT_NORMAL[4] = {0, 0, 8, 15};

// Significant
const float MF_TILT_SIGNIFICANT[3] = {10, 20, 30};

// Extreme
const float MF_TILT_EXTREME[4] = {25, 35, 45, 45};

//=====================================================
// OUTPUT FUZZY (CENTROID)
//=====================================================

const float OUTPUT_AMAN    = 25.0;
const float OUTPUT_WASPADA = 60.0;
const float OUTPUT_BAHAYA  = 90.0;

//=====================================================
// BATAS STATUS
//=====================================================

const float STATUS_AMAN_MAX     = 40.0;
const float STATUS_WASPADA_MAX  = 70.0;

//=====================================================
// ENUM
//=====================================================

// Curah Hujan
enum RainType
{
    RENDAH = 0,
    SEDANG = 1,
    TINGGI = 2
};

// Kelembaban Tanah
enum SoilType
{
    KERING = 0,
    LEMBAB = 1,
    BASAH  = 2
};

// Kemiringan
enum TiltType
{
    NORMAL     = 0,
    SIGNIFICANT = 1,
    EXTREME    = 2
};

// Output
enum OutputType
{
    AMAN    = 0,
    WASPADA = 1,
    BAHAYA  = 2
};


//=====================================================
// RULE STRUCTURE
//=====================================================

struct Rule
{
    byte rain;
    byte soil;
    byte tilt;
    byte output;
};


//=====================================================
// VARIABEL FUZZY
//=====================================================

// Input fuzzy
float tilt = 0;

// Output fuzzy
float fuzzyOutput = 0;

// Status akhir sistem
String status = "";

// Hasil fuzzifikasi setiap input
String rainFuzzy = "";
String soilFuzzy = "";
String tiltFuzzy = "";


//=====================================================
// MEMBERSHIP ARRAY
//=====================================================

float rainMF[3];
float soilMF[3];
float tiltMF[3];


//=====================================================
// RULE
//=====================================================

const byte TOTAL_RULE = 27;

float rule[TOTAL_RULE];


//=====================================================
// AGREGASI
//=====================================================

float amanValue = 0;

float waspadaValue = 0;

float bahayaValue = 0;


//=====================================================
// UPDATE INPUT FUZZY
//=====================================================

void updateFuzzyInput()
{
    if(TEST_MODE)
    {
        rainMM      = TEST_RAIN;
        soilPercent = TEST_SOIL;
        tilt        = TEST_TILT;
    }
    else
    {
        tilt = max(abs(pitch), abs(roll));
    }
}


//=====================================================
// MEMBERSHIP FUNCTION
//=====================================================

// Fungsi Segitiga
float segitiga(float x, float a, float b, float c)
{
    if (x <= a || x >= c)
        return 0;

    if (x == b)
        return 1;

    if (x < b)
        return (x - a) / (b - a);

    return (c - x) / (c - b);
}


// Fungsi Trapesium
float trapesium(float x, float a, float b, float c, float d)
{

    // Left Shoulder
    if (a == b)
    {
        if (x <= b)
            return 1.0;

        if (x >= d)
            return 0.0;

        if (x > c)
            return (d - x) / (d - c);

        return 1.0;
    }

    // Right Shoulder
    if (c == d)
    {
        if (x <= a)
            return 0.0;

        if (x >= c)
            return 1.0;

        if (x < b)
            return (x - a) / (b - a);

        return 1.0;
    }

    // Normal Trapezoid
    if (x <= a || x >= d)
        return 0.0;

    if (x >= b && x <= c)
        return 1.0;

    if (x > a && x < b)
        return (x - a) / (b - a);

    return (d - x) / (d - c);
}

//=====================================================
// MEMBERSHIP CURAH HUJAN
//=====================================================

float hujanRendah()
{
    return trapesium(
        rainMM,
        MF_RAIN_LOW[0],
        MF_RAIN_LOW[1],
        MF_RAIN_LOW[2],
        MF_RAIN_LOW[3]
    );
}

float hujanSedang()
{
    return segitiga(
        rainMM,
        MF_RAIN_MEDIUM[0],
        MF_RAIN_MEDIUM[1],
        MF_RAIN_MEDIUM[2]
    );
}

float hujanTinggi()
{
    return trapesium(
        rainMM,
        MF_RAIN_HIGH[0],
        MF_RAIN_HIGH[1],
        MF_RAIN_HIGH[2],
        MF_RAIN_HIGH[3]
    );
}

//=====================================================
// MEMBERSHIP KELEMBABAN TANAH
//=====================================================

float soilKering()
{
    return trapesium(
        soilPercent,
        MF_SOIL_DRY[0],
        MF_SOIL_DRY[1],
        MF_SOIL_DRY[2],
        MF_SOIL_DRY[3]
    );
}

float soilLembab()
{
    return segitiga(
        soilPercent,
        MF_SOIL_MOIST[0],
        MF_SOIL_MOIST[1],
        MF_SOIL_MOIST[2]
    );
}

float soilBasah()
{
    return trapesium(
        soilPercent,
        MF_SOIL_WET[0],
        MF_SOIL_WET[1],
        MF_SOIL_WET[2],
        MF_SOIL_WET[3]
    );
}

//=====================================================
// MEMBERSHIP KEMIRINGAN
//=====================================================

float tiltNormal()
{
    return trapesium(
        tilt,
        MF_TILT_NORMAL[0],
        MF_TILT_NORMAL[1],
        MF_TILT_NORMAL[2],
        MF_TILT_NORMAL[3]
    );
}

float tiltSignificant()
{
    return segitiga(
        tilt,
        MF_TILT_SIGNIFICANT[0],
        MF_TILT_SIGNIFICANT[1],
        MF_TILT_SIGNIFICANT[2]
    );
}

float tiltExtreme()
{
    return trapesium(
        tilt,
        MF_TILT_EXTREME[0],
        MF_TILT_EXTREME[1],
        MF_TILT_EXTREME[2],
        MF_TILT_EXTREME[3]
    );
}

//=====================================================
// OUTPUT MEMBERSHIP
//=====================================================

float outputAman(float z)
{
    return trapesium(
        z,
        0,
        0,
        20,
        40
    );
}

float outputWaspada(float z)
{
    return segitiga(
        z,
        30,
        50,
        70
    );
}

float outputBahaya(float z)
{
    return trapesium(
        z,
        60,
        80,
        100,
        100
    );
}

//=====================================================
// CLIPPING OUTPUT
//=====================================================

float clipAman(float z)
{
    return min(amanValue, outputAman(z));
}

float clipWaspada(float z)
{
    return min(waspadaValue, outputWaspada(z));
}

float clipBahaya(float z)
{
    return min(bahayaValue, outputBahaya(z));
}

//=====================================================
// OUTPUT AGGREGATION
//=====================================================

float outputAggregation(float z)
{
    float aman = clipAman(z);

    float waspada = clipWaspada(z);

    float bahaya = clipBahaya(z);

    return max(
                aman,
                max(
                    waspada,
                    bahaya
                )
            );
}

//=====================================================
// UPDATE MEMBERSHIP
//=====================================================

void updateMembership()
{
    // Curah Hujan
    rainMF[RENDAH] = hujanRendah();
    rainMF[SEDANG] = hujanSedang();
    rainMF[TINGGI] = hujanTinggi();

    // Kelembaban Tanah
    soilMF[KERING] = soilKering();
    soilMF[LEMBAB] = soilLembab();
    soilMF[BASAH]  = soilBasah();

    // Kemiringan
  tiltMF[NORMAL]      = tiltNormal();
tiltMF[SIGNIFICANT] = tiltSignificant();
tiltMF[EXTREME]     = tiltExtreme();
}

//=====================================================
// UPDATE HASIL FUZZIFIKASI
//=====================================================

void updateFuzzyCategory()
{
    //==========================
    // CURAH HUJAN
    //==========================

    if (rainMF[RENDAH] >= rainMF[SEDANG] &&
        rainMF[RENDAH] >= rainMF[TINGGI])
    {
        rainFuzzy = "RENDAH";
    }
    else if (rainMF[SEDANG] >= rainMF[TINGGI])
    {
        rainFuzzy = "SEDANG";
    }
    else
    {
        rainFuzzy = "TINGGI";
    }

    //==========================
    // KELEMBABAN TANAH
    //==========================

    if (soilMF[KERING] >= soilMF[LEMBAB] &&
        soilMF[KERING] >= soilMF[BASAH])
    {
        soilFuzzy = "KERING";
    }
    else if (soilMF[LEMBAB] >= soilMF[BASAH])
    {
        soilFuzzy = "LEMBAB";
    }
    else
    {
        soilFuzzy = "BASAH";
    }

    //==========================
    // KEMIRINGAN
    //==========================

   if (tiltMF[NORMAL] >= tiltMF[SIGNIFICANT] &&
    tiltMF[NORMAL] >= tiltMF[EXTREME])
{
    tiltFuzzy = "NORMAL";
}
else if (tiltMF[SIGNIFICANT] >= tiltMF[EXTREME])
{
    tiltFuzzy = "SIGNIFICANT";
}
else
{
    tiltFuzzy = "EXTREME";
}
}

//=====================================================
// GET MEMBERSHIP
//=====================================================

float getRainMembership(byte index)
{
    return rainMF[index];
}

float getSoilMembership(byte index)
{
    return soilMF[index];
}

float getTiltMembership(byte index)
{
    return tiltMF[index];
}

//=====================================================
// FUZZY INFERENCE
//=====================================================

void fuzzyInference()
{
    updateFuzzyInput();

    updateMembership();

    updateFuzzyCategory();

    clearRule();

    evaluateRules();

    aggregation();

    defuzzification();

    updateStatus();

    validateFuzzy();
}

//=====================================================
// RULE TABLE
//=====================================================

Rule ruleTable[TOTAL_RULE] =
{
    // Rain Rendah
    {RENDAH, KERING, NORMAL, AMAN},
    {RENDAH, KERING, SIGNIFICANT, AMAN},
    {RENDAH, KERING, EXTREME, WASPADA},

    {RENDAH, LEMBAB, NORMAL, AMAN},
    {RENDAH, LEMBAB, SIGNIFICANT, WASPADA},
    {RENDAH, LEMBAB, EXTREME, BAHAYA},

    {RENDAH, BASAH, NORMAL, WASPADA},
    {RENDAH, BASAH, SIGNIFICANT, BAHAYA},
    {RENDAH, BASAH, EXTREME, BAHAYA},

    // Rain Sedang
    {SEDANG, KERING, NORMAL, AMAN},
    {SEDANG, KERING, SIGNIFICANT, WASPADA},
    {SEDANG, KERING, EXTREME, BAHAYA},

    {SEDANG, LEMBAB, NORMAL, WASPADA},
    {SEDANG, LEMBAB, SIGNIFICANT, WASPADA},
    {SEDANG, LEMBAB, EXTREME, BAHAYA},

    {SEDANG, BASAH, NORMAL, WASPADA},
    {SEDANG, BASAH, SIGNIFICANT, BAHAYA},
    {SEDANG, BASAH, EXTREME, BAHAYA},

    // Rain Tinggi
    {TINGGI, KERING, NORMAL, WASPADA},
    {TINGGI, KERING, SIGNIFICANT, BAHAYA},
    {TINGGI, KERING, EXTREME, BAHAYA},

    {TINGGI, LEMBAB, NORMAL, BAHAYA},
    {TINGGI, LEMBAB, SIGNIFICANT, BAHAYA},
    {TINGGI, LEMBAB, EXTREME, BAHAYA},

    {TINGGI, BASAH, NORMAL, BAHAYA},
    {TINGGI, BASAH, SIGNIFICANT, BAHAYA},
    {TINGGI, BASAH, EXTREME, BAHAYA}
};

//=====================================================
// CLEAR RULE
//=====================================================

void clearRule()
{
    for(byte i=0;i<TOTAL_RULE;i++)
    {
        rule[i]=0;
    }
}

//=====================================================
// RULE ENGINE
//=====================================================

void evaluateRules()
{
    for(byte i=0;i<TOTAL_RULE;i++)
    {
        float rain =
            getRainMembership(ruleTable[i].rain);

        float soil =
            getSoilMembership(ruleTable[i].soil);

        float tilt =
            getTiltMembership(ruleTable[i].tilt);

        rule[i]=min(min(rain,soil),tilt);
    }
}

//=====================================================
// AGGREGATION
//=====================================================

void aggregation()
{
    amanValue=0;
    waspadaValue=0;
    bahayaValue=0;

    for(byte i=0;i<TOTAL_RULE;i++)
    {
        switch(ruleTable[i].output)
        {

        case AMAN:

            amanValue=max(amanValue,rule[i]);

        break;

        case WASPADA:

            waspadaValue=max(waspadaValue,rule[i]);

        break;

        case BAHAYA:

            bahayaValue=max(bahayaValue,rule[i]);

        break;

        }

    }

}

//=====================================================
// DEFUZZIFICATION (NUMERICAL CENTROID)
//=====================================================

void defuzzification()
{
    float numerator = 0.0;
    float denominator = 0.0;

    for(float z = OUTPUT_MIN;
        z <= OUTPUT_MAX;
        z += DEFUZZ_STEP)
    {
        float mu = outputAggregation(z);

        numerator += z * mu;

        denominator += mu;
    }

    if(denominator <= 0.000001)
    {
        fuzzyOutput = 0;
        return;
    }

    fuzzyOutput = numerator / denominator;
}

//=====================================================
// UPDATE STATUS
//=====================================================

void updateStatus()
{
    if (fuzzyOutput < STATUS_AMAN_MAX)
    {
        status = "AMAN";
    }
    else if (fuzzyOutput < STATUS_WASPADA_MAX)
    {
        status = "WASPADA";
    }
    else
    {
        status = "BAHAYA";
    }
}

//=====================================================
// VALIDASI FUZZY
//=====================================================

void validateFuzzy()
{
    float total =
        amanValue +
        waspadaValue +
        bahayaValue;

    if(total > 3.0)
    {
        Serial.println("WARNING : Membership tidak valid!");
    }

    if(fuzzyOutput < 0 || fuzzyOutput > 100)
    {
        Serial.println("WARNING : Centroid di luar rentang!");
    }
}

//=====================================================
// ENUM TO STRING
//=====================================================

const char* rainName(byte value)
{
    switch(value)
    {
        case RENDAH: return "RENDAH";
        case SEDANG: return "SEDANG";
        case TINGGI: return "TINGGI";
    }
    return "-";
}

const char* soilName(byte value)
{
    switch(value)
    {
        case KERING: return "KERING";
        case LEMBAB: return "LEMBAB";
        case BASAH:  return "BASAH";
    }
    return "-";
}

const char* tiltName(byte value)
{
    switch(value)
    {
        case NORMAL:
            return "NORMAL";

        case SIGNIFICANT:
            return "SIGNIFICANT";

        case EXTREME:
            return "EXTREME";
    }

    return "-";
}

const char* outputName(byte value)
{
    switch(value)
    {
        case AMAN: return "AMAN";
        case WASPADA: return "WASPADA";
        case BAHAYA: return "BAHAYA";
    }
    return "-";
}

