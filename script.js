let mode = "verb";
let dialect = "msa";

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

function toggleDialect() {
  dialect = dialect === "msa" ? "kw" : "msa";

  const btn = document.getElementById("dialectBtn");
  btn.innerText = "Dialect: " + (dialect === "msa" ? "MSA" : "Kuwait");
}

let current = null;
let history = [];

// ======================
// SUBJECTS
// ======================
const subjects = [
  { key: "ana", ar: "أنا", en: "I", label: "single" },
  { key: "nahnu", ar: "نحن", en: "We", label: "plural" },

  { key: "anta", ar: "أنتَ", en: "You", label: "male" },
  { key: "anti", ar: "أنتِ", en: "You", label: "female" },
  { key: "antuma", ar: "أنتما", en: "You", label: "dual" },
  { key: "antum", ar: "أنتم", en: "You", label: "plural male" },
  { key: "antunna", ar: "أنتنّ", en: "You", label: "plural female" },

  { key: "huwa", ar: "هو", en: "He", label: "male" },
  { key: "hiya", ar: "هي", en: "She", label: "female" },
  { key: "huma_m", ar: "هما", en: "They", label: "dual male" },
  { key: "huma_f", ar: "هما", en: "They", label: "dual female" },
  { key: "hum", ar: "هم", en: "They", label: "plural male" },
  { key: "hunna", ar: "هنّ", en: "They", label: "plural female" }
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
      msa: {
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
    
      kw: {
        ana: "أتكلم",
        anta: "تتكلم",
        huwa: "يتكلم"
      }
    },

    past: {
      msa: {
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
      },
    
      kw: {
        ana: "تكلمت",
        huwa: "تكلم"
      }
    }
  },

  {
    key: "eat",
    en: "eat",
    past_en: "ate",

    present: {
      msa: {
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

      kw: {
        ana: "آكل",
        anta: "تاكل",
        huwa: "ياكل"
      }
    },

    past: {
      msa: {
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
      },

      kw: {
        ana: "اكلت",
        huwa: "اكل"
      }
    }
  },

  {
    key: "drink",
    en: "drink",
    past_en: "drank",

    present: {
      msa: {
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
    
      kw: {
        ana: "أشرب",
        anta: "تشرب",
        huwa: "يشرب"
      }
    },
    
    past: {
      msa: {
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
      },
    
      kw: {
        ana: "شربت",
        huwa: "شرب"
      }
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
  {
    ar_singular: "كتاب",
    ar_plural: "كتب",
    en_singular: "book",
    en_plural: "books",
    gender: "m"
  },
  {
    ar_singular: "بيت",
    ar_plural: "بيوت",
    en_singular: "house",
    en_plural: "houses",
    gender: "m"
  },
  {
    ar_singular: "سيارة",
    ar_plural: "سيارات",
    en_singular: "car",
    en_plural: "cars",
    gender: "f"
  },
  {
    ar_singular: "هاتف",
    ar_plural: "هواتف",
    en_singular: "phone",
    en_plural: "phones",
    gender: "m"
  }
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

function contractNegative(aux) {
  const map = {
    "do": "don't",
    "does": "doesn't",
    "did": "didn't",
    "will": "won't"
  };

  return map[aux] || (aux + "n't");
}

// ======================
// RANDOM
// ======================
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getForm(formObj, subjectKey) {
  if (dialect === "kw") {
    if (formObj.kw && formObj.kw[subjectKey]) {
      return formObj.kw[subjectKey];
    }
    return null;
  }

  // MSA normal
  if (formObj.msa) {
    return formObj.msa[subjectKey];
  }

  return formObj[subjectKey];
}

function getNegation(tense, isNegative) {
  if (!isNegative) return "";

  if (dialect === "kw") {
    return "ما";
  }

  // MSA
  if (tense === "present") return "لا";
  if (tense === "past") return "لم";
  if (tense === "future") return "لن";
}

function getFuturePrefix() {
  if (dialect === "kw") return "راح";
  return "س";
}

function applyArabicGrammar(verb, subjectKey, tense, isNegative) {
  let base = getForm(verb.present, subjectKey);
  if (!base) return null;

  if (dialect === "kw") {
    return base;
  }

  if (!isNegative) return base;

  if (tense === "past") {
    if (subjectKey === "hum") return base.replace("ون", "وا");
    if (subjectKey === "antum") return base.replace("ون", "وا");
    if (subjectKey === "hunna") return base;
    return base;
  }

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
    if (dialect === "kw") {
      const kwSubjects = subjects.filter(s =>
        ["ana", "anta", "huwa"].includes(s.key)
      );
      subject = pick(kwSubjects);
  
      const kwVerbs = verbs.filter(v => v.present.kw);
      verb = pick(kwVerbs);
    } else {
      subject = pick(subjects);
      verb = pick(verbs);
    }

    const time = Math.random() < 0.7 ? pick(times) : null;
    const tense = time ? time.tense : pick(["present", "past", "future"]);
    const isNegative = Math.random() < 0.5;
    
    let verbAr;

    if (tense === "present") {
          const form = getForm(verb.present, subject.key);
    if (!form) continue; // skip kalau tidak ada Kuwait
    verbAr = form;
        }
    
    else if (tense === "past") {
      if (isNegative) {
        verbAr = applyArabicGrammar(verb, subject.key, "past", true);
        if (!verbAr) continue;
      } else {
        const form = getForm(verb.past, subject.key);
        if (!form) continue;
        verbAr = form;
      }
    }
    
    else {
      if (isNegative) {
        verbAr = applyArabicGrammar(verb, subject.key, "future", true);
        if (!verbAr) continue;
      } else {
        const form = getForm(verb.present, subject.key);
        if (!form) continue;
        verbAr = getFuturePrefix() + " " + form;
      }
    }
    
    // DEBUG (cek kalau ada yang missing)
    // if (!verb.present[subject.key]) {
    //   console.error("Missing PRESENT conjugation:", subject.key);
    // }
    
    if (tense === "past" && !verb.past[subject.key]) {
      console.error("Missing PAST conjugation:", subject.key);
    }
    
    let verbEn;

    if (tense === "past") {
      verbEn = isNegative
        ? contractNegative("did") + " " + verb.en
        : verb.past_en;
    } else if (tense === "future") {
      verbEn = isNegative
        ? contractNegative("will") + " " + verb.en
        : "will " + verb.en;
    } else {
      if (isNegative) {
        const aux = getDoAux(subject.key);
        verbEn = contractNegative(aux) + " " + verb.en;
      } else {
        verbEn = getEnglishVerb(subject.key, verb.en);
      }
    }
    
    const place = Math.random() < 0.5 ? pick(places) : null;

    let negation = getNegation(tense, isNegative);

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

function fixArticle(phrase) {
  // remove existing a/an
  phrase = phrase.replace(/^(a|an)\s+/i, "");

  const firstWord = phrase.trim().charAt(0).toLowerCase();

  const vowels = ["a", "e", "i", "o", "u"];

  const article = vowels.includes(firstWord) ? "an" : "a";

  return article + " " + phrase;
}

function generateNounMode() {
  const isNegative = Math.random() < 0.3;
  const isDefinite = Math.random() < 0.4;
  const isPlural = Math.random() < 0.5;

  const subject = pick(subjects);
  const poss = possessive[subject.key];
  const noun = pick(nouns);

  const useAdj = Math.random() < 0.6;
  const adj = useAdj ? pick(adjectives) : null;

  // ======================
  // ARABIC
  // ======================
  const baseNounAr = isPlural ? noun.ar_plural : noun.ar_singular;
  const nounAr = isDefinite ? "ال" + baseNounAr : baseNounAr;

  let adjForm;

  if (isPlural) {
    adjForm = adj ? adj.f : ""; // aturan simplifikasi
  } else {
    adjForm = adj ? adj[noun.gender] : "";
  }
  
  const adjAr = adj
    ? (isDefinite ? "ال" + adjForm : adjForm)
    : "";

  const sentenceAr =
    subject.ar + " " +
    (isNegative ? "ما " : "") +
    poss + " " +
    nounAr +
    (adj ? " " + adjAr : "");

  // ======================
  // ENGLISH (FIXED)
  // ======================

  const nounBase = isPlural
  ? noun.en_plural
  : noun.en_singular;
  const adjEn = adj ? adj.en : "";

  let finalNoun;

  if (isPlural) {
    if (isDefinite) {
      finalNoun =
        "the " +
        (adj ? adjEn + " " : "") +
        nounBase;
    } else {
      finalNoun =
        (adj ? adjEn + " " : "") +
        nounBase;
    }
  } else {
    if (isDefinite) {
      finalNoun =
        "the " +
        (adj ? adjEn + " " : "") +
        nounBase;
    } else {
      const temp =
        (adj ? adjEn + " " : "") +
        nounBase;
  
      finalNoun = fixArticle(temp);
    }
  }
  
  function getHave(subjectKey) {
    const third = ["huwa", "hiya"];
    return third.includes(subjectKey) ? "has" : "have";
  }

  let sentenceEn;

  if (isNegative) {
    const aux = getDoAux(subject.key);

    sentenceEn =
      subject.en + " " +
      contractNegative(aux) + " have " +
      finalNoun;
  } else {
    sentenceEn =
      subject.en + " " +
      getHave(subject.key) + " " +
      finalNoun;
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
