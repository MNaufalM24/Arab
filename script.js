let current = null;
let lastSentence = null;

// DATA PALING SIMPLE
const subjects = [
  { key: "ana", ar: "أنا", en: "I" },
  { key: "anta", ar: "أنتَ", en: "You (m)" },
  { key: "huwa", ar: "هو", en: "He" }
];

const verbs = {
  ana: "أتكلم",
  anta: "تتكلم",
  huwa: "يتكلم"
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

  do {
    const subject = pick(subjects);
    const verb = verbs[subject.key];
    const place = Math.random() < 0.5 ? pick(places) : null;

    const sentenceAr =
      subject.ar + " " + verb + (place ? " " + place.ar : "");

    const sentenceEn =
      subject.en + " speak " + (place ? place.en : "");

    newSentence = {
      ar: sentenceAr,
      en: sentenceEn
    };

  } while (newSentence.ar === lastSentence);

  // simpan sebagai last
  lastSentence = newSentence.ar;
  current = newSentence.ar;

  document.getElementById("question").innerText = newSentence.en;
  document.getElementById("answer").style.display = "none";
}

// SHOW ANSWER
function showAnswer() {
  document.getElementById("answer").innerText = current;
  document.getElementById("answer").style.display = "block";
}
