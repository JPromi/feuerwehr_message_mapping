# Feuerwehr Message Mapper

Ein umfassendes Tool zur Verarbeitung und Zuordnung von Alarmierungstexten verschiedener Feuerwehren mittels REGEX-Expressions.

## Übersicht

Dieses Projekt ermöglicht die standardisierte Erfassung und Verarbeitung von Alarmmeldungen aus unterschiedlichen österreichischen Feuerwehrbereichen. Die REGEX-Patterns helfen dabei, unstrukturierte Texte in strukturierte Daten zu konvertieren.

## Unterstützte Regionen

- [Niederösterreich](loweraustria.md)

## Features

- Automatische Extraktion von Einsatzinformationen
- Standardisierte Datenformate
- Einfache Integration in bestehende Systeme

## Verwendung

Weitere Informationen zu den jeweiligen Mappings finden Sie in den jeweiligen Dokumentationen.

# Development

## Regex-Konfiguration

Die Regex-Definitionen sind als JSON-Dateien im Ordner `integrations/` abgelegt.  
Dort werden die jeweiligen Mappings und Felder konfiguriert.

Code- und Konfigurationsbeispiele befinden sich im Verzeichnis `example/` und zeigen die korrekte Verwendung der JSON-Strukturen.

## Unit-Tests
Für dieses Projekt sind Unit-Tests vorhanden.  
Diese befinden sich im Ordner `test` und können mit folgendem Befehl ausgeführt werden:

```bash
node test.js
```

Die zugehörigen Testdaten liegen im Verzeichnis `test/data`.
Für jedes Mapping existieren dort eigene Testdaten, um die korrekte Verarbeitung sicherzustellen.