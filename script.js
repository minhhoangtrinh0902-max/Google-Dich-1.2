let inp = document.getElementById("inp");
let out = document.getElementById("out");
let type = document.getElementById("type");
let from = document.getElementById("from");
let to = document.getElementById("to");

let t;

// 🔹 Auto dịch khi gõ
inp.oninput = () => {
  clearTimeout(t);
  t = setTimeout(run, 400);
};

async function run() {
  let text = inp.value.trim();

  if (!text) {
    out.innerText = "";
    type.innerText = "";
    return;
  }

  // 🔹 Dịch
  try {
    let r = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from.value}|${to.value}`
    );
    let d = await r.json();
    out.innerText = d.responseData.translatedText;
  } catch {
    out.innerText = "Lỗi dịch!";
  }

  // 🔹 Loại từ (chỉ chuẩn với tiếng Anh)
  try {
    let r2 = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${text}`
    );
    let d2 = await r2.json();

    let pos = d2[0].meanings[0].partOfSpeech;
    type.innerText = "Loại từ: " + pos;
  } catch {
    type.innerText = "Loại từ: không rõ";
  }
}

// 🔹 Đổi ngôn ngữ
function swap() {
  [from.value, to.value] = [to.value, from.value];
  run();
}

// 🔹 Đọc
function speak(text, lang) {
  let s = new SpeechSynthesisUtterance(text);
  s.lang = lang === "vi" ? "vi-VN" : "en-US";
  speechSynthesis.speak(s);
}
