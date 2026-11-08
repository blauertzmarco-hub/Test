# Trainingsplaner

Eine Web-App, mit der du deinen Trainingsplan zusammenstellst: Geräte und Übungen sind bebildert, Sätze und Wiederholungen wählst du für jede Übung aus.

## Starten

Du musst nichts installieren und nichts bauen. Öffne einfach `index.html` im Browser, am Computer oder auf dem Handy.
Deine Pläne werden automatisch im Browser gespeichert (localStorage).

## Funktionen

- **Mehrere Trainingspläne** anlegen, umbenennen, duplizieren und löschen
- **Trainingstage** wie „Tag A – Oberkörper“ hinzufügen und benennen
- **Übungsbibliothek** mit rund 50 Übungen:
  - 9 Geräte mit Grafik: Körpergewicht, Kurzhantel, Langhantel, Kettlebell, Kabelzug, Maschine, Hantelbank, Klimmzugstange, Widerstandsband
  - eine Strichfigur pro Übung, die die Bewegung zeigt, dazu ein Ausführungstipp
  - Filter nach Gerät und Muskelgruppe sowie eine Suche
- **Sätze & Wiederholungen** über Plus/Minus oder Schnellauswahl (z. B. 3 × 10), dazu optional Gewicht, Pause und Notiz
- Sätze und Wiederholungen lassen sich direkt im Plan anpassen, Übungen sortieren, bearbeiten und entfernen
- Übersicht über Trainingstage, Übungen, Sätze und Muskelgruppen, dazu die geschätzte Trainingsdauer pro Tag
- **Drucken / als PDF speichern** sowie **Export/Import als JSON**
- Helles und dunkles Design, für das Handy optimiert

## Dateien

| Datei | Inhalt |
|---|---|
| `index.html` | Seitenaufbau |
| `styles.css` | Gestaltung |
| `data.js` | Geräte, Übungen und SVG-Grafiken – hier kannst du eigene Übungen ergänzen |
| `app.js` | App-Logik |
