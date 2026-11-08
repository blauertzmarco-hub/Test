// Geräte- und Übungsdaten inklusive SVG-Illustrationen
// Alle Grafiken sind inline-SVG, damit die App offline und ohne externe Dateien läuft.

const EQUIPMENT = {
  koerpergewicht: {
    name: "Körpergewicht",
    svg: `<svg viewBox="0 0 64 64"><circle cx="32" cy="12" r="6"/><path d="M32 18v20M32 24l-12 8M32 24l12 8M32 38l-9 18M32 38l9 18" fill="none" stroke-width="4" stroke-linecap="round"/></svg>`,
  },
  kurzhantel: {
    name: "Kurzhantel",
    svg: `<svg viewBox="0 0 64 64"><rect x="8" y="20" width="8" height="24" rx="2"/><rect x="16" y="24" width="6" height="16" rx="2"/><rect x="22" y="29" width="20" height="6" rx="2"/><rect x="42" y="24" width="6" height="16" rx="2"/><rect x="48" y="20" width="8" height="24" rx="2"/></svg>`,
  },
  langhantel: {
    name: "Langhantel",
    svg: `<svg viewBox="0 0 64 64"><rect x="2" y="30" width="60" height="4" rx="2"/><rect x="8" y="18" width="5" height="28" rx="1.5"/><rect x="14" y="22" width="4" height="20" rx="1.5"/><rect x="46" y="22" width="4" height="20" rx="1.5"/><rect x="51" y="18" width="5" height="28" rx="1.5"/></svg>`,
  },
  kettlebell: {
    name: "Kettlebell",
    svg: `<svg viewBox="0 0 64 64"><path d="M22 26c0-12 20-12 20 0" fill="none" stroke-width="5" stroke-linecap="round"/><path d="M32 22c13 0 20 9 20 20 0 8-4 14-8 16H20c-4-2-8-8-8-16 0-11 7-20 20-20z"/></svg>`,
  },
  kabelzug: {
    name: "Kabelzug",
    svg: `<svg viewBox="0 0 64 64"><rect x="8" y="4" width="6" height="56" rx="2"/><rect x="8" y="4" width="40" height="6" rx="2"/><circle cx="46" cy="12" r="4"/><path d="M46 16v26" fill="none" stroke-width="2"/><rect x="38" y="42" width="16" height="4" rx="2"/><rect x="16" y="40" width="10" height="16" rx="1"/><path d="M16 44h10M16 48h10M16 52h10" fill="none" stroke-width="1.5" class="cut"/></svg>`,
  },
  maschine: {
    name: "Maschine",
    svg: `<svg viewBox="0 0 64 64"><rect x="40" y="4" width="8" height="56" rx="2"/><rect x="10" y="34" width="26" height="6" rx="2"/><rect x="10" y="14" width="6" height="22" rx="2"/><rect x="18" y="40" width="4" height="18"/><rect x="34" y="18" width="18" height="5" rx="2"/><rect x="50" y="30" width="10" height="20" rx="1"/></svg>`,
  },
  bank: {
    name: "Hantelbank",
    svg: `<svg viewBox="0 0 64 64"><rect x="6" y="26" width="52" height="8" rx="3"/><rect x="12" y="34" width="5" height="22"/><rect x="47" y="34" width="5" height="22"/><rect x="6" y="54" width="18" height="4" rx="2"/><rect x="40" y="54" width="18" height="4" rx="2"/></svg>`,
  },
  stange: {
    name: "Klimmzugstange",
    svg: `<svg viewBox="0 0 64 64"><rect x="4" y="8" width="56" height="5" rx="2.5"/><rect x="6" y="8" width="5" height="50"/><rect x="53" y="8" width="5" height="50"/><circle cx="32" cy="24" r="5"/><path d="M22 13l6 8M42 13l-6 8M32 29v14M32 43l-5 12M32 43l5 12" fill="none" stroke-width="3.5" stroke-linecap="round"/></svg>`,
  },
  band: {
    name: "Widerstandsband",
    svg: `<svg viewBox="0 0 64 64"><path d="M10 14c10 10 34 10 44 0M10 50c10-10 34-10 44 0" fill="none" stroke-width="5" stroke-linecap="round"/><rect x="4" y="8" width="10" height="12" rx="3"/><rect x="50" y="8" width="10" height="12" rx="3"/><rect x="4" y="44" width="10" height="12" rx="3"/><rect x="50" y="44" width="10" height="12" rx="3"/></svg>`,
  },
};

const MUSCLES = ["Brust", "Rücken", "Schultern", "Bizeps", "Trizeps", "Beine", "Po", "Bauch", "Ganzkörper"];

// Strichfiguren-Posen für die Übungsvorschau.
// Jede Pose ist eine Liste von SVG-Elementen auf einer 100x100-Fläche.
const POSES = {
  stehen: `<circle cx="50" cy="16" r="7"/><path d="M50 23v32M50 30l-14 16M50 30l14 16M50 55l-9 30M50 55l9 30"/>`,
  ueberkopf: `<circle cx="50" cy="20" r="7"/><path d="M50 27v30M50 32l-12-18M50 32l12-18M50 57l-9 30M50 57l9 30"/><path class="eq" d="M28 12h44"/>`,
  kniebeuge: `<circle cx="46" cy="22" r="7"/><path d="M48 29l6 26M52 34l-16 4M52 34l16 4M54 55l-16 6 6 24M54 55l14 10-4 20"/><path class="eq" d="M26 30h48"/>`,
  liegen: `<circle cx="18" cy="56" r="7"/><path d="M25 58h36M34 58l2-26M48 58l2-26M61 58l12 10v18M61 58l4 28"/><path class="eq" d="M24 30h40"/><path class="eq2" d="M14 66h56"/>`,
  vorbeugen: `<circle cx="30" cy="34" r="7"/><path d="M36 38l26 6M44 40l-2 24M54 42l-2 22M62 44l-6 42M62 44l8 42"/><path class="eq" d="M28 66h40"/>`,
  ziehen: `<circle cx="50" cy="28" r="7"/><path d="M50 35v28M50 40l-12-26M50 40l12-26M50 63l-8 24M50 63l8 24"/><path class="eq" d="M20 12h60"/>`,
  sitzen: `<circle cx="40" cy="24" r="7"/><path d="M40 31v28M40 38l20 4M40 38l20 10M40 59h22v26"/><path class="eq2" d="M30 62h36M34 62v24"/><path class="eq" d="M66 30v30"/>`,
  liegestuetz: `<circle cx="20" cy="46" r="7"/><path d="M26 50l52 14M34 52v24M78 64l6 12"/><path class="eq2" d="M10 78h80"/>`,
  plank: `<circle cx="20" cy="52" r="7"/><path d="M26 56l54 10M30 58l2 18h-10M80 66l6 10"/><path class="eq2" d="M10 78h80"/>`,
  crunch: `<circle cx="30" cy="50" r="7"/><path d="M36 54l18 14M54 68l12-20 10 22M38 56l-6-14"/><path class="eq2" d="M10 78h80"/>`,
  ausfallschritt: `<circle cx="50" cy="16" r="7"/><path d="M50 23v32M50 30l-10 20M50 30l10 20M50 55l-20 8v24M50 55l18 14 8 18"/>`,
  schwingen: `<circle cx="44" cy="24" r="7"/><path d="M46 31l8 24M50 38l14 16M50 38l18 14M54 55l-12 32M54 55l10 32"/><circle class="eqf" cx="70" cy="58" r="6"/>`,
  dip: `<circle cx="50" cy="26" r="7"/><path d="M50 33v26M50 40l-14 6v-10M50 40l14 6v-10M50 59l-6 14 10 10M50 59l10 12"/><path class="eq" d="M26 36h12M62 36h12M30 36v50M70 36v50"/>`,
  seitheben: `<circle cx="50" cy="16" r="7"/><path d="M50 23v32M50 30l-26 4M50 30l26 4M50 55l-9 30M50 55l9 30"/><circle class="eqf" cx="22" cy="34" r="4"/><circle class="eqf" cx="78" cy="34" r="4"/>`,
  curl: `<circle cx="50" cy="16" r="7"/><path d="M50 23v32M50 30l-6 16 10-12M50 30l6 16-10-12M50 55l-9 30M50 55l9 30"/><path class="eq" d="M38 34h24"/>`,
  hueftheben: `<circle cx="16" cy="66" r="7"/><path d="M22 66l24-10 18-2M64 54l8 22M30 64l-2 12"/><path class="eq" d="M40 50h16"/><path class="eq2" d="M6 76h84"/>`,
};

// Übungsdatenbank: id, Name, Gerät, Muskelgruppen, Pose, kurze Ausführungsbeschreibung
const EXERCISES = [
  // Körpergewicht
  { id: "liegestuetz", name: "Liegestütz", eq: "koerpergewicht", muscles: ["Brust", "Trizeps"], pose: "liegestuetz", tip: "Körper bildet eine gerade Linie, Brust bis knapp über den Boden senken." },
  { id: "kniebeuge-kg", name: "Kniebeuge", eq: "koerpergewicht", muscles: ["Beine", "Po"], pose: "kniebeuge", tip: "Fersen bleiben am Boden, Knie zeigen in Richtung der Fußspitzen." },
  { id: "ausfallschritt", name: "Ausfallschritt", eq: "koerpergewicht", muscles: ["Beine", "Po"], pose: "ausfallschritt", tip: "Großer Schritt nach vorn, hinteres Knie Richtung Boden absenken." },
  { id: "plank", name: "Unterarmstütz (Plank)", eq: "koerpergewicht", muscles: ["Bauch"], pose: "plank", tip: "Bauch und Po anspannen, kein Hohlkreuz. Wiederholungen = Sekunden." },
  { id: "crunch", name: "Crunches", eq: "koerpergewicht", muscles: ["Bauch"], pose: "crunch", tip: "Oberkörper langsam einrollen, Nacken entspannt lassen." },
  { id: "dips", name: "Dips", eq: "koerpergewicht", muscles: ["Trizeps", "Brust"], pose: "dip", tip: "Ellbogen nach hinten führen, bis Oberarme etwa parallel zum Boden sind." },
  { id: "hueftheben", name: "Hüftheben (Glute Bridge)", eq: "koerpergewicht", muscles: ["Po", "Beine"], pose: "hueftheben", tip: "Hüfte nach oben drücken, oben den Po fest anspannen." },
  { id: "burpee", name: "Burpees", eq: "koerpergewicht", muscles: ["Ganzkörper"], pose: "ueberkopf", tip: "Aus dem Stand in den Liegestütz und explosiv zurück in den Strecksprung." },

  // Kurzhantel
  { id: "kh-bankdruecken", name: "Kurzhantel-Bankdrücken", eq: "kurzhantel", muscles: ["Brust", "Trizeps"], pose: "liegen", tip: "Hanteln kontrolliert auf Brusthöhe senken und nach oben drücken." },
  { id: "kh-curl", name: "Bizeps-Curls", eq: "kurzhantel", muscles: ["Bizeps"], pose: "curl", tip: "Ellbogen bleiben am Körper, kein Schwung aus dem Rücken." },
  { id: "kh-schulterdruecken", name: "Schulterdrücken", eq: "kurzhantel", muscles: ["Schultern", "Trizeps"], pose: "ueberkopf", tip: "Hanteln von Schulterhöhe senkrecht über den Kopf drücken." },
  { id: "kh-seitheben", name: "Seitheben", eq: "kurzhantel", muscles: ["Schultern"], pose: "seitheben", tip: "Arme leicht gebeugt seitlich bis auf Schulterhöhe heben." },
  { id: "kh-rudern", name: "Einarmiges Rudern", eq: "kurzhantel", muscles: ["Rücken", "Bizeps"], pose: "vorbeugen", tip: "Rücken gerade, Hantel Richtung Hüfte ziehen." },
  { id: "kh-goblet", name: "Goblet Squat", eq: "kurzhantel", muscles: ["Beine", "Po"], pose: "kniebeuge", tip: "Hantel vor der Brust halten, aufrecht tief in die Hocke gehen." },
  { id: "kh-trizeps", name: "Trizepsdrücken über Kopf", eq: "kurzhantel", muscles: ["Trizeps"], pose: "ueberkopf", tip: "Oberarme bleiben neben dem Kopf, nur die Unterarme bewegen." },

  // Langhantel
  { id: "lh-bankdruecken", name: "Bankdrücken", eq: "langhantel", muscles: ["Brust", "Trizeps", "Schultern"], pose: "liegen", tip: "Schulterblätter zusammen, Stange zur unteren Brust führen." },
  { id: "lh-kniebeuge", name: "Kniebeuge mit Langhantel", eq: "langhantel", muscles: ["Beine", "Po"], pose: "kniebeuge", tip: "Stange auf dem oberen Rücken, Brust raus, tief beugen." },
  { id: "lh-kreuzheben", name: "Kreuzheben", eq: "langhantel", muscles: ["Rücken", "Beine", "Po"], pose: "vorbeugen", tip: "Gerader Rücken, Stange nah am Körper vom Boden heben." },
  { id: "lh-rudern", name: "Langhantelrudern", eq: "langhantel", muscles: ["Rücken", "Bizeps"], pose: "vorbeugen", tip: "Oberkörper vorgeneigt, Stange zum Bauchnabel ziehen." },
  { id: "lh-military", name: "Military Press", eq: "langhantel", muscles: ["Schultern", "Trizeps"], pose: "ueberkopf", tip: "Im Stand die Stange von der Brust über den Kopf drücken." },
  { id: "lh-curl", name: "Langhantel-Curls", eq: "langhantel", muscles: ["Bizeps"], pose: "curl", tip: "Schulterbreiter Griff, Stange kontrolliert hochbeugen." },
  { id: "lh-hipthrust", name: "Hip Thrust", eq: "langhantel", muscles: ["Po", "Beine"], pose: "hueftheben", tip: "Oberer Rücken auf der Bank, Hüfte mit Stange nach oben strecken." },

  // Kettlebell
  { id: "kb-swing", name: "Kettlebell Swing", eq: "kettlebell", muscles: ["Po", "Rücken", "Ganzkörper"], pose: "schwingen", tip: "Bewegung kommt aus der Hüfte, nicht aus den Armen." },
  { id: "kb-goblet", name: "Kettlebell Goblet Squat", eq: "kettlebell", muscles: ["Beine", "Po"], pose: "kniebeuge", tip: "Kettlebell vor der Brust, Ellbogen zwischen die Knie." },
  { id: "kb-press", name: "Kettlebell Press", eq: "kettlebell", muscles: ["Schultern"], pose: "ueberkopf", tip: "Kettlebell aus der Rack-Position über den Kopf drücken." },
  { id: "kb-rudern", name: "Kettlebell Rudern", eq: "kettlebell", muscles: ["Rücken"], pose: "vorbeugen", tip: "Vorgebeugt, Kettlebell Richtung Hüfte ziehen." },

  // Kabelzug
  { id: "kz-latzug", name: "Latzug", eq: "kabelzug", muscles: ["Rücken", "Bizeps"], pose: "ziehen", tip: "Stange zur oberen Brust ziehen, Schulterblätter nach unten." },
  { id: "kz-rudern", name: "Rudern am Kabel", eq: "kabelzug", muscles: ["Rücken"], pose: "sitzen", tip: "Aufrecht sitzen, Griff zum Bauch ziehen." },
  { id: "kz-trizeps", name: "Trizepsdrücken am Kabel", eq: "kabelzug", muscles: ["Trizeps"], pose: "curl", tip: "Ellbogen fixiert, Seil nach unten durchstrecken." },
  { id: "kz-fliegende", name: "Cable Crossover", eq: "kabelzug", muscles: ["Brust"], pose: "seitheben", tip: "Griffe in einem Bogen vor dem Körper zusammenführen." },
  { id: "kz-facepull", name: "Face Pulls", eq: "kabelzug", muscles: ["Schultern", "Rücken"], pose: "ziehen", tip: "Seil auf Gesichtshöhe ziehen, Ellbogen hoch." },

  // Maschine
  { id: "m-beinpresse", name: "Beinpresse", eq: "maschine", muscles: ["Beine", "Po"], pose: "sitzen", tip: "Knie nicht ganz durchstrecken, Rücken bleibt am Polster." },
  { id: "m-beinstrecker", name: "Beinstrecker", eq: "maschine", muscles: ["Beine"], pose: "sitzen", tip: "Beine kontrolliert strecken, oben kurz halten." },
  { id: "m-beinbeuger", name: "Beinbeuger", eq: "maschine", muscles: ["Beine"], pose: "sitzen", tip: "Fersen Richtung Po ziehen, Hüfte bleibt am Polster." },
  { id: "m-brustpresse", name: "Brustpresse", eq: "maschine", muscles: ["Brust", "Trizeps"], pose: "sitzen", tip: "Griffe auf Brusthöhe, nach vorn drücken." },
  { id: "m-butterfly", name: "Butterfly", eq: "maschine", muscles: ["Brust"], pose: "sitzen", tip: "Arme leicht gebeugt vor der Brust zusammenführen." },
  { id: "m-schulterpresse", name: "Schulterpresse", eq: "maschine", muscles: ["Schultern"], pose: "sitzen", tip: "Griffe senkrecht nach oben drücken." },
  { id: "m-bauch", name: "Bauchmaschine", eq: "maschine", muscles: ["Bauch"], pose: "crunch", tip: "Oberkörper langsam einrollen, Spannung halten." },

  // Bank
  { id: "b-schraegbank", name: "Schrägbankdrücken", eq: "bank", muscles: ["Brust", "Schultern"], pose: "liegen", tip: "Bank auf 30–45°, Gewicht zur oberen Brust führen." },
  { id: "b-bankdips", name: "Bank-Dips", eq: "bank", muscles: ["Trizeps"], pose: "dip", tip: "Hände auf der Bank, Körper nah an der Bank absenken." },
  { id: "b-stepup", name: "Step-ups", eq: "bank", muscles: ["Beine", "Po"], pose: "ausfallschritt", tip: "Mit einem Bein auf die Bank steigen, über die Ferse drücken." },

  // Klimmzugstange
  { id: "s-klimmzug", name: "Klimmzüge", eq: "stange", muscles: ["Rücken", "Bizeps"], pose: "ziehen", tip: "Aus dem Hang hochziehen, bis das Kinn über der Stange ist." },
  { id: "s-chinup", name: "Chin-ups (Untergriff)", eq: "stange", muscles: ["Bizeps", "Rücken"], pose: "ziehen", tip: "Handflächen zeigen zu dir, kontrolliert hoch und runter." },
  { id: "s-beinheben", name: "Hängendes Beinheben", eq: "stange", muscles: ["Bauch"], pose: "ziehen", tip: "Im Hang die Beine ohne Schwung nach vorn oben heben." },

  // Widerstandsband
  { id: "wb-rudern", name: "Band-Rudern", eq: "band", muscles: ["Rücken"], pose: "sitzen", tip: "Band um die Füße, Enden zum Bauch ziehen." },
  { id: "wb-pullapart", name: "Band Pull-Apart", eq: "band", muscles: ["Schultern", "Rücken"], pose: "seitheben", tip: "Band auf Brusthöhe auseinanderziehen." },
  { id: "wb-curl", name: "Band-Curls", eq: "band", muscles: ["Bizeps"], pose: "curl", tip: "Auf das Band stellen und Enden hochbeugen." },
  { id: "wb-squat", name: "Kniebeuge mit Band", eq: "band", muscles: ["Beine", "Po"], pose: "kniebeuge", tip: "Band über den Knien, Knie aktiv nach außen drücken." },
];
