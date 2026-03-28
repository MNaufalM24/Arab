let current = null;

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

// RANDOM
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// GENERATE
function generate() {
  const subject = pick(subjects);

  const verb = verbs[subject.key];

  const sentenceEn = subject.en + " speak";
  const sentenceAr = subject.ar + " " + verb;

  current = sentenceAr;

  document.getElementById("question").innerText = sentenceEn;
  document.getElementById("answer").style.display = "none";
}

// SHOW ANSWER
function showAnswer() {
  document.getElementById("answer").innerText = current;
  document.getElementById("answer").style.display = "block";
}
