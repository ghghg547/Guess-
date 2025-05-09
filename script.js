const flags = [
  { country: { ar: "مصر", en: "Egypt", fr: "Égypte", zh: "埃及", de: "Ägypten", it: "Egitto", es: "Egipto", pt: "Egito", el: "Αίγυπτος", tr: "Mısır" }, img: "https://flagcdn.com/w320/eg.png" },
  { country: { ar: "ألمانيا", en: "Germany", fr: "Allemagne", zh: "德国", de: "Deutschland", it: "Germania", es: "Alemania", pt: "Alemanha", el: "Γερμανία", tr: "Almanya" }, img: "https://flagcdn.com/w320/de.png" },
  { country: { ar: "تركيا", en: "Turkey", fr: "Turquie", zh: "土耳其", de: "Türkei", it: "Turchia", es: "Turquía", pt: "Turquia", el: "Τουρκία", tr: "Türkiye" }, img: "https://flagcdn.com/w320/tr.png" },
  { country: { ar: "فرنسا", en: "France", fr: "France", zh: "法国", de: "Frankreich", it: "Francia", es: "Francia", pt: "França", el: "Γαλλία", tr: "Fransa" }, img: "https://flagcdn.com/w320/fr.png" },
  { country: { ar: "الصين", en: "China", fr: "Chine", zh: "中国", de: "China", it: "Cina", es: "China", pt: "China", el: "Κίνα", tr: "Çin" }, img: "https://flagcdn.com/w320/cn.png" },
  { country: { ar: "إيطاليا", en: "Italy", fr: "Italie", zh: "意大利", de: "Italien", it: "Italia", es: "Italia", pt: "Itália", el: "Ιταλία", tr: "İtalya" }, img: "https://flagcdn.com/w320/it.png" }
];

let currentFlag;
let currentLang = 'ar';

const flagImg = document.getElementById('flag');
const choicesDiv = document.getElementById('choices');
const resultDiv = document.getElementById('result');
const nextBtn = document.getElementById('next-btn');
const langSelect = document.getElementById('language-select');

const clickSound = document.getElementById('click-sound');
const successSound = document.getElementById('success-sound');
const failSound = document.getElementById('fail-sound');

function playSound(type) {
  if (type === "click") clickSound.play();
  else if (type === "correct") successSound.play();
  else if (type === "wrong") failSound.play();
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function loadNewFlag() {
  resultDiv.textContent = "";
  const index = Math.floor(Math.random() * flags.length);
  currentFlag = flags[index];
  flagImg.src = currentFlag.img;

  const choices = [currentFlag];
  while (choices.length < 4) {
    const rand = flags[Math.floor(Math.random() * flags.length)];
    if (!choices.includes(rand)) choices.push(rand);
  }

  shuffle(choices);
  choicesDiv.innerHTML = "";
  choices.forEach(flag => {
    const btn = document.createElement("button");
    btn.textContent = flag.country[currentLang];
    btn.onclick = () => {
      playSound("click");
      if (flag === currentFlag) {
        resultDiv.textContent = getText("correct");
        playSound("correct");
      } else {
        resultDiv.textContent = getText("wrong") + ": " + currentFlag.country[currentLang];
        playSound("wrong");
      }
    };
    choicesDiv.appendChild(btn);
  });
}

function getText(key) {
  const texts = {
    correct: {
      ar: "✅ صحيح!",
      en: "✅ Correct!",
      fr: "✅ Correct!",
      zh: "✅ 正确!",
      de: "✅ Richtig!",
      it: "✅ Corretto!",
      es: "✅ ¡Correcto!",
      pt: "✅ Correto!",
      el: "✅ Σωστό!",
      tr: "✅ Doğru!"
    },
    wrong: {
      ar: "❌ خطأ",
      en: "❌ Wrong",
      fr: "❌ Faux",
      zh: "❌ 错误",
      de: "❌ Falsch",
      it: "❌ Sbagliato",
      es: "❌ Incorrecto",
      pt: "❌ Errado",
      el: "❌ Λάθος",
      tr: "❌ Yanlış"
    }
  };
  return texts[key][currentLang];
}

nextBtn.onclick = () => {
  playSound("click");
  loadNewFlag();
};

langSelect.onchange = () => {
  currentLang = langSelect.value;
  document.getElementById('title').textContent = {
    ar: "🎌 لعبة تخمين الأعلام",
    en: "🎌 Guess the Flags",
    fr: "🎌 Devine le Drapeau",
    zh: "🎌 猜国旗游戏",
    de: "🎌 Flaggenraten",
    it: "🎌 Indovina la Bandiera",
    es: "🎌 Adivina la Bandera",
    pt: "🎌 Adivinhe a Bandeira",
    el: "🎌 Μάντεψε τη Σημαία",
    tr: "🎌 Bayrak Tahmini"
  }[currentLang];
  loadNewFlag();
};

window.onload = loadNewFlag;
