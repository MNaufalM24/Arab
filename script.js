let mode = "verb"; // default

function generateSentence() {
  if (mode === "verb") {
    generate();
  } else {
    generateNounMode();
  }
}

function toggleMode() {
  mode = mode === "verb" ? "noun" : "verb";

  const btn = document.getElementById("modeBtn");
  btn.innerText = "Mode: " + (mode === "verb" ? "Verb" : "Noun");
}

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
  { key: "antuma", ar: "أنتما", en: "You", label: "dual" },
  { key: "antum", ar: "أنتم", en: "You", label: "pl m" },
  { key: "antunna", ar: "أنتنّ", en: "You", label: "pl f" },

  { key: "huwa", ar: "هو", en: "He", label: "m" },
  { key: "hiya", ar: "هي", en: "She", label: "f" },
  { key: "huma_m", ar: "هما", en: "They", label: "dual m" },
  { key: "huma_f", ar: "هما", en: "They", label: "dual f" },
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
    past_en: "spoke",

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
  },

  {
    key: "eat",
    en: "eat",
    past_en: "ate",

    present: {
      ana: "آكل",
      nahnu: "نأكل",

      anta: "تأكل",
      anti: "تأكلين",
      antuma: "تأكلان",
      antum: "تأكلون",
      antunna: "تأكلْنَ",

      huwa: "يأكل",
      hiya: "تأكل",
      huma_m: "يأكلان",
      huma_f: "تأكلان",
      hum: "يأكلون",
      hunna: "يأكلْنَ"
    },

    past: {
      ana: "أكلتُ",
      nahnu: "أكلنا",

      anta: "أكلتَ",
      anti: "أكلتِ",
      antuma: "أكلتما",
      antum: "أكلتم",
      antunna: "أكلتنّ",

      huwa: "أكلَ",
      hiya: "أكلتْ",
      huma_m: "أكلا",
      huma_f: "أكلتا",
      hum: "أكلوا",
      hunna: "أكلْنَ"
    }
  },

  {
    key: "drink",
    en: "drink",
    past_en: "drank",

    present: {
      ana: "أشرب",
      nahnu: "نشرب",

      anta: "تشرب",
      anti: "تشربين",
      antuma: "تشربان",
      antum: "تشربون",
      antunna: "تشربْنَ",

      huwa: "يشرب",
      hiya: "تشرب",
      huma_m: "يشربان",
      huma_f: "تشربان",
      hum: "يشربون",
      hunna: "يشربْنَ"
    },

    past: {
      ana: "شربتُ",
      nahnu: "شربنا",

      anta: "شربتَ",
      anti: "شربتِ",
      antuma: "شربتما",
      antum: "شربتم",
      antunna: "شربتنّ",

      huwa: "شربَ",
      hiya: "شربتْ",
      huma_m: "شربا",
      huma_f: "شربتا",
      hum: "شربوا",
      hunna: "شربْنَ"
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
// NOUN MODE DATA
// ======================

const possessive = {
  ana: "عندي",
  nahnu: "عندنا",

  anta: "عندك",
  anti: "عندكِ",
  antuma: "عندكما",
  antum: "عندكم",
  antunna: "عندكنّ",

  huwa: "عنده",
  hiya: "عندها",
  huma_m: "عندهما",
  huma_f: "عندهما",
  hum: "عندهم",
  hunna: "عندهنّ"
};

// ======================
// NOUNS
// ======================

const nouns = [
  { ar: "كتاب", en: "a book", gender: "m" },
  { ar: "بيت", en: "a house", gender: "m" },
  { ar: "سيارة", en: "a car", gender: "f" },
  { ar: "هاتف", en: "a phone", gender: "m" }
];

// ======================
// ADJECTIVES
// ======================

const adjectives = [
  {
    en: "big",
    m: "كبير",
    f: "كبيرة"
  },
  {
    en: "small",
    m: "صغير",
    f: "صغيرة"
  },
  {
    en: "new",
    m: "جديد",
    f: "جديدة"
  }
];

// ======================
// TIME
// ======================
const times = [
  { ar: "أمس", en: "yesterday", tense: "past" },
  { ar: "قبل قليل", en: "earlier", tense: "past" },

  { ar: "الآن", en: "now", tense: "present" },
  { ar: "اليوم", en: "today", tense: "present" },

  { ar: "غدًا", en: "tomorrow", tense: "future" },
  { ar: "لاحقًا", en: "later", tense: "future" }
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

function applyArabicGrammar(verb, subjectKey, tense, isNegative) {
  let base = verb.present[subjectKey];

  if (!isNegative) return base;

  // PAST NEGATIVE → لم + majzum
  if (tense === "past") {
    if (subjectKey === "hum") return base.replace("ون", "وا");
    if (subjectKey === "antum") return base.replace("ون", "وا");
    if (subjectKey === "hunna") return base;
    return base;
  }

  // FUTURE NEGATIVE → لن + mansub
  if (tense === "future") {
    if (subjectKey === "hum") return base.replace("ون", "وا");
    if (subjectKey === "antum") return base.replace("ون", "وا");
    return base;
  }

  return base;
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

    const time = Math.random() < 0.7 ? pick(times) : null;
    const tense = time ? time.tense : pick(["present", "past", "future"]);
    const isNegative = Math.random() < 0.5;
    
    let verbAr;

    if (tense === "present") {
      verbAr = verb.present[subject.key];
    }
    
    else if (tense === "past") {
      if (isNegative) {
        verbAr = applyArabicGrammar(verb, subject.key, "past", true);
      } else {
        verbAr = verb.past[subject.key];
      }
    }
    
    else {
      if (isNegative) {
        verbAr = applyArabicGrammar(verb, subject.key, "future", true);
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
        : verb.past_en;
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
      subject.ar + " " +
      (negation ? negation + " " : "") +
      verbAr +
      (place ? " " + place.ar : "") +
      (time ? " " + time.ar : "");

    const sentenceEn =
      subject.en + " " +
      verbEn +
      (place ? " " + place.en : "") +
      (time ? " " + time.en : "");

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

  document.getElementById("question").innerText = newSentence.en;
  document.getElementById("label").innerText = subject.label;

  document.getElementById("answer").innerText = "";
  document.getElementById("answer").style.display = "none";
}

function generateNounMode() {
  const isNegative = Math.random() < 0.5;
  const isDefinite = Math.random() < 0.5;

  const subject = pick(subjects);
  const poss = possessive[subject.key];
  const noun = pick(nouns);

  // 🔥 adjective dulu
  const useAdj = Math.random() < 0.7;
  const adj = useAdj ? pick(adjectives) : null;

  const nounAr = isDefinite ? "ال" + noun.ar : noun.ar;
  const nounEn = isDefinite
    ? noun.en.replace(/^a |^an /, "the ")
    : noun.en;

  const adjArFinal = adj
    ? (isDefinite ? "ال" + adj[noun.gender] : adj[noun.gender])
    : "";

  const adjEn = adj ? adj.en : "";

  const sentenceAr =
    subject.ar + " " +
    (isNegative ? "ما " : "") +
    poss + " " +
    nounAr +
    (adj ? " " + adjArFinal : "");

  function getHave(subjectKey) {
    const third = ["huwa", "hiya"];
    return third.includes(subjectKey) ? "has" : "have";
  }

  let sentenceEn;

  if (isNegative) {
    const aux = getDoAux(subject.key);
    sentenceEn =
      subject.en + " " +
      aux + " not have " +
      (adj ? adjEn + " " : "") +
      nounEn;
  } else {
    sentenceEn =
      subject.en + " " +
      getHave(subject.key) + " " +
      (adj ? adjEn + " " : "") +
      nounEn;
  }

  current = sentenceAr;

  document.getElementById("question").innerText = sentenceEn;
  document.getElementById("label").innerText = subject.label;

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
