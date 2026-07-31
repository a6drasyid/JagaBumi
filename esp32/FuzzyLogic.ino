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
// KEMIRINGAN TANAH (°)
//=====================================================

// Landai
const float MF_TILT_FLAT[4] = {0, 0, 8, 15};

// Sedang
const float MF_TILT_MEDIUM[3] ={10, 20, 30};

// Curam
const float MF_TILT_STEEP[4] ={25, 35, 45, 45};

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
    LANDAI = 0,
    MIRING = 1,
    CURAM  = 2
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

float tiltLandai()
{
    return trapesium(
        tilt,
        MF_TILT_FLAT[0],
        MF_TILT_FLAT[1],
        MF_TILT_FLAT[2],
        MF_TILT_FLAT[3]
    );
}

float tiltSedang()
{
    return segitiga(
        tilt,
        MF_TILT_MEDIUM[0],
        MF_TILT_MEDIUM[1],
        MF_TILT_MEDIUM[2]
    );
}

float tiltCuram()
{
    return trapesium(
        tilt,
        MF_TILT_STEEP[0],
        MF_TILT_STEEP[1],
        MF_TILT_STEEP[2],
        MF_TILT_STEEP[3]
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
    tiltMF[LANDAI] = tiltLandai();
    tiltMF[MIRING] = tiltSedang();
    tiltMF[CURAM]  = tiltCuram();
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

    if (tiltMF[LANDAI] >= tiltMF[MIRING] &&
        tiltMF[LANDAI] >= tiltMF[CURAM])
    {
        tiltFuzzy = "LANDAI";
    }
    else if (tiltMF[MIRING] >= tiltMF[CURAM])
    {
        tiltFuzzy = "MIRING";
    }
    else
    {
        tiltFuzzy = "CURAM";
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
    {RENDAH, KERING, LANDAI, AMAN},
    {RENDAH, KERING, MIRING, AMAN},
    {RENDAH, KERING, CURAM, WASPADA},

    {RENDAH, LEMBAB, LANDAI, AMAN},
    {RENDAH, LEMBAB, MIRING, WASPADA},
    {RENDAH, LEMBAB, CURAM, BAHAYA},

    {RENDAH, BASAH, LANDAI, WASPADA},
    {RENDAH, BASAH, MIRING, BAHAYA},
    {RENDAH, BASAH, CURAM, BAHAYA},

    // Rain Sedang
                     {SEDANG, KERING, LANDAI, AMAN},
    {SEDANG, KERING, MIRING, WASPADA},
    {SEDANG, KERING, CURAM, BAHAYA},

    {SEDANG, LEMBAB, LANDAI, WASPADA},
    {SEDANG, LEMBAB, MIRING, WASPADA},
    {SEDANG, LEMBAB, CURAM, BAHAYA},

    {SEDANG, BASAH, LANDAI, WASPADA},
    {SEDANG, BASAH, MIRING, BAHAYA},
    {SEDANG, BASAH, CURAM, BAHAYA},

    // Rain Tinggi
    {TINGGI, KERING, LANDAI, WASPADA},
    {TINGGI, KERING, MIRING, BAHAYA},
    {TINGGI, KERING, CURAM, BAHAYA},

    {TINGGI, LEMBAB, LANDAI, BAHAYA},
    {TINGGI, LEMBAB, MIRING, BAHAYA},
    {TINGGI, LEMBAB, CURAM, BAHAYA},

    {TINGGI, BASAH, LANDAI, BAHAYA},
    {TINGGI, BASAH, MIRING, BAHAYA},
    {TINGGI, BASAH, CURAM, BAHAYA}
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
        case LANDAI: return "LANDAI";
        case MIRING: return "MIRING";
        case CURAM:  return "CURAM";
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

