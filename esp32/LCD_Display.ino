//=====================================================
// LCD
//=====================================================

void initLCD()
{
  lcd.init();

  lcd.backlight();

  lcd.setCursor(0,0);
  lcd.print("LANDSLIDE EWS");

  lcd.setCursor(0,1);
  lcd.print("Starting...");

  delay(1500);

  lcd.clear();
}

void updateLCD()
{

  lcdPage = !lcdPage;

  if(lcdPage)
  {
      lcd.setCursor(0,0);
      lcd.print("Rain:");
      lcd.print(rainMM,1);
      lcd.print("mm   ");

      lcd.setCursor(0,1);
      lcd.print("Soil:");
      lcd.print(soilPercent);
      lcd.print("%    ");
  }
  else
  {
      lcd.setCursor(0,0);
      lcd.print("Pitch:");
      lcd.print(pitch,1);
      lcd.print((char)223);
      lcd.print("   ");

      lcd.setCursor(0,1);
      lcd.print("Roll :");
      lcd.print(roll,1);
      lcd.print((char)223);
      lcd.print("   ");
  }

}