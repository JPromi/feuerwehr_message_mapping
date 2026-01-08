# Niederösterreich
_Version: v1.0_
## WICHTIG
Dieser Mapper Unterstützt keine **EINSATZSTORNOS**, am besten überprüfe mit dem Type Regex ob **EINSATZSTORNO** rauskommt.

## REGEX für jedes Feld
| Feld                    | Regex                                                                                    |
|-------------------------|------------------------------------------------------------------------------------------|
| Type                    | `^([A-Za-z]+)`                                                                           |
| Firedepartment number   | `^\D*(\d+)`                                                                              |
| Group                   | `^\D*\d+([A-Za-z]+)`                                                                     |
| Time                    | `\((\d{1,2}:\d{2})\)`                                                                    |
| Alarm Type              | `\)\s+([A-Za-z]+)(?=\d)`                                                                 |
| Alarm Level             | `\)\s+[A-Za-z]+(\d+)`                                                                    |
| Alarm Accessories       | `\+([^\s+]+(?:\+[^\s+]+)*)`                                                              |
| Alarm Text              | `\)\s+\S+\s+(.*?)\.`                                                                     |
| Object                  | `\. \s*(?:([^,:\n]+)\s*(?=,[^\n]*,[^\n]*(?::|\(\d))|([^,:\n]+)\s*(?=[^,\n]*(?::|\(\d)))` |
| Street                  | `\.\s*(?:[^,]+,\s*)?([^,\d]+?)\s+\d[^,]*(?=,)`                                           |
| Housenumber             | `\.\s*(?:[^,]+,\s*)?[^,\d]+?\s+(\d[^,]*)(?=,\s*\d{4})`                                   |
| ZIP Code                | `,\s*(\d{4})(?=\s+\D)`                                                                   |
| City                    | `,\s*\d{4}\s+([^:(]+?)(?=\s*(?:[:(,]|$))`                                                |
| Address Additional      | `,\s*\d{4}\s+[^:(]+?\s*\((?!\s*[-\d.,]+\s*,\s*[-\d.,]+)([^)]*)\)(?=\s*:|\s*\()`          |
| Note                    | `(?<!\d):\s*(.*?)(?=\s*\([^()]*\)\s*$)`                                                  |
| Latitude                | `\(([-\d.,]+)\s*,\s*[-\d.,]+\)\s*$`                                                      |
| Longitude               | `\(\s*[-\d.,]+\s*,\s*([-\d.,]+)\)\s*$`                                                   |

# Beispiel Alarmierungen

```
A12345SRS (08:50) S1+ATS+MESS Gefahrenmeldeanlage - Schadstoff/Gas. BMA-1 140, Florian Feuerstraße 120/Stg. 5, 3430 Tulln (Türe 2): Rettung auf anfahrt (48.1234, 16.1234)
```
```
A12345SRS (08:50) B1 Gefahrenmeldeanlage - Brand. Florian Feuerstraße 122, 3430 Tulln: Pers in Lift Nr:D 1234 (48.1234, 16.1234)
```
```
A12345SRS (08:50) T1 Bergung - PKW. B00 km 0.0 (Wien): PKW gegen Schild (48.1234, 16.1234)
```
```
A12345SRS (08:50) SOF1 Anforderung von anderer Organisation. Florian Feuerstraße 123, 3430 Tulln (48.1234, 16.1234)
```

# Nicht Unterstützt
```
EINSATZSTORNO für T0 - Hilfeleistung in Florian Feuerstraße 122, 3430 Tulln - KEIN Einsatz erforderlich!
```