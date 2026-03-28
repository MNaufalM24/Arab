let current = null;

// DATA PALING SIMPLE
const subject = {
  ar: "أنا",
  en: "I"
};

const verb = {
  ar: "أتكلم",
  en: "speak"
};

// GENERATE
function generate() {
  const sentenceEn = subject.en + " " + verb.en;
  const sentenceAr = subject.ar + " " + verb.ar;

  current = sentenceAr;

  document.getElementById("question").innerText = sentenceEn;
  document.getElementById("answer").style.display = "none";
}

// SHOW ANSWER
function showAnswer() {
  document.getElementById("answer").innerText = current;
  document.getElementById("answer").style.display = "block";
}
