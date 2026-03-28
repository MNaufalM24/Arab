let current = null;
let history = [];

// ======================
// SUBJECTS
// ======================
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

// ======================
// VERBS (NEW STRUCTURE)
// ======================
const verbs = [
  {
    key: "speak",
    en: "speak",

    present: {
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
    },

    past: {
      ana: "تكلمتُ",
      nahnu: "تكلمنا",

      anta: "تكلمتَ",
      anti: "تكلمتِ",
      antuma: "تكلمتما",
      antum: "تكلمتم",
      antunna: "تكلمتنّ",

      huwa: "تكلمَ",
      hiya: "تكلمتْ",
      huma_m: "تكلما",
      huma_f: "تكلمتا",
      hum: "تكلموا",
      hunna: "تكلمْنَ"
    }
  }
];

// ======================
// PLACES
// ======================
const places = [
  { ar: "هنا", en: "here" },
  { ar: "هناك", en: "there" }
];

// ======================
// ENGLISH RULES
// ======================
const englishRules = {
  thirdPersonSingular: ["huwa", "hiya"]
};

function getEnglishVerb(subjectKey, baseVerb) {
  if (englishRules.thirdPersonSingular.includes(subjectKey)) {
    return baseVerb + "s";
  }
  return baseVerb;
}

function getDoAux(subjectKey) {
  if (englishRules.thirdPersonSingular.includes(subjectKey)) {
    return "does";
  }
  return "do";
}

// ======================
// RANDOM
// ======================
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ======================
// GENERATE
// ======================
function generate() {
  let newSentence = null;
  let attempts = 0;

  let subject;
  let verb;

  do {
    subject = pick(subjects);
    verb = pick(verbs); // ⬅️ sekarang random verb

    const tense = pick(["present", "past", "future"]);
    const isNegative = Math.random() < 0.5;
    
    let verbAr;

    if (tense === "present") {
      verbAr = verb.present[subject.key];
    } else if (tense === "past") {
      if (isNegative) {
        verbAr = verb.present[subject.key]; // لم + present
      } else {
        verbAr = verb.past[subject.key];
      }
    } else {
      if (isNegative) {
        verbAr = verb.present[subject.key]; // لن + present
      } else {
        verbAr = "س" + verb.present[subject.key];
      }
    }

    // DEBUG (cek kalau ada yang missing)
    if (!verb.present[subject.key]) {
      console.error("Missing PRESENT conjugation:", subject.key);
    }
    
    if (tense === "past" && !verb.past[subject.key]) {
      console.error("Missing PAST conjugation:", subject.key);
    }
    
    let verbEn;

    if (tense === "past") {
      verbEn = isNegative
        ? "did not " + verb.en
        : "spoke";
    } else if (tense === "future") {
      verbEn = isNegative
        ? "will not " + verb.en
        : "will " + verb.en;
    } else {
      if (isNegative) {
        const aux = getDoAux(subject.key);
        verbEn = aux + " not " + verb.en;
      } else {
        verbEn = getEnglishVerb(subject.key, verb.en);
      }
    }
    
    const place = Math.random() < 0.5 ? pick(places) : null;

    let negation = "";

    if (isNegative) {
      if (tense === "present") negation = "لا";
      else if (tense === "past") negation = "لم";
      else if (tense === "future") negation = "لن";
    }

    const sentenceAr =
      subject.ar + " " + (negation ? negation + " " : "") + verbAr +
      (place ? " " + place.ar : "");

    const sentenceEn =
      subject.en + " " + verbEn + (place ? " " + place.en : "");

    newSentence = {
      ar: sentenceAr,
      en: sentenceEn
    };

    attempts++;
    if (attempts > 20) break;

  } while (history.includes(newSentence.ar));

  history.push(newSentence.ar);

  if (history.length > 20) {
    history.shift();
  }

  current = newSentence.ar;

  document.getElementById("question").innerText =
    newSentence.en + " (" + subject.label + ")";

  document.getElementById("answer").innerText = "";
  document.getElementById("answer").style.display = "none";
}

// ======================
// SHOW ANSWER
// ======================
function showAnswer() {
  document.getElementById("answer").innerText = current;
  document.getElementById("answer").style.display = "block";
}
