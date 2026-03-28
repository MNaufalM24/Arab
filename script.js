let current = null;
let history = [];

// DATA
const subjects = [
  { key: "ana", ar: "أنا", en: "I", label: "sg" },
  { key: "nahnu", ar: "نحن", en: "We", label: "pl" },

  { key: "anta", ar: "أنتَ", en: "You", label: "m" },
  { key: "anti", ar: "أنتِ", en: "You", label: "f" },
  { key: "antuma", ar: "أنتما", en: "You two", label: "dual" },
  { key: "antum", ar: "أنتم", en: "You", label: "pl m" },
  { key: "antunna", ar: "أنتنّ", en: "You", label: "pl f" },

  { key: "huwa", ar: "هو", en: "He", label: "m" },
  { key: "hiya", ar: "هي", en: "She", label: "f" },
  { key: "huma_m", ar: "هما", en: "They two", label: "dual m" },
  { key: "huma_f", ar: "هما", en: "They two", label: "dual f" },
  { key: "hum", ar: "هم", en: "They", label: "pl m" },
  { key: "hunna", ar: "هنّ", en: "They", label: "pl f" }
];

const verbs = {
  ana: "أتكلم",
  nahnu: "نتكلم",

  anta: "تتكلم",
  anti: "تتكلمين",
  antuma: "تتكلمان",
  antum: "تتكلمون",
  antunna: "تتكلمْنَ",

  huwa: "يتكلم",
  hiya: "تتكلم",
  huma_m: "يتكلمان",
  huma_f: "تتكلمان",
  hum: "يتكلمون",
  hunna: "يتكلمن"
};

const places = [
  { ar: "هنا", en: "here" },
  { ar: "هناك", en: "there" }
];

// RANDOM
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// GENERATE
function generate() {
  let newSentence = null;
  let attempts = 0; //

  do {
    const subject = pick(subjects);
    const verb = verbs[subject.key];
    const place = Math.random() < 0.5 ? pick(places) : null;

    const sentenceAr =
      subject.ar + " " + verb + (place ? " " + place.ar : "");

    const sentenceEn =
      subject.en + " speak" + (place ? " " + place.en : "");

    newSentence = {
      ar: sentenceAr,
      en: sentenceEn
    };

    attempts++;

    if (attempts > 20) break;

  } while (history.includes(newSentence.ar));

  // simpan ke history
  history.push(newSentence.ar);

  // batasi history biar ringan
  if (history.length > 20) {
    history.shift();
  }

  current = newSentence.ar;

  document.getElementById("question").innerText =
  newSentence.en
    ? newSentence.en + " (" + subject.label + ")"
    : "⚠️ error generating sentence";
  document.getElementById("answer").style.display = "none";
}

// SHOW ANSWER
function showAnswer() {
  document.getElementById("answer").innerText = current;
  document.getElementById("answer").style.display = "block";
}
