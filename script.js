let current = null;

// DATA PALING SIMPLE
const subjects = [
  { ar: "أنا", en: "I" },
  { ar: "أنتَ", en: "You (m)" },
  { ar: "هو", en: "He" }
];

const verb = {
  ar: "أتكلم",
  en: "speak"
};

// RANDOM
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// GENERATE
function generate() {
  const subject = pick(subjects);

  const sentenceEn = subject.en + " speak";
  const sentenceAr = subject.ar + " أتكلم";

  current = sentenceAr;

  document.getElementById("question").innerText = sentenceEn;
  document.getElementById("answer").style.display = "none";
}

// SHOW ANSWER
function showAnswer() {
  document.getElementById("answer").innerText = current;
  document.getElementById("answer").style.display = "block";
}
