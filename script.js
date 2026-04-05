let timeout;

// 🔹 Auto dịch khi gõ
document.getElementById("inputText").addEventListener("input", () => {
  clearTimeout(timeout);
  timeout = setTimeout(translateText, 500);
});

// 🔹 Hàm dịch
async function translateText() {
  let text = document.getElementById("inputText").value;
  let from = document.getElementById("from").value;
  let to = document.getElementById("to").value;

  if (!text.trim()) {
    document.getElementById("output").innerText = "";
    return;
  }

  try {
    let res = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`
    );

    let data = await res.json();

    document.getElementById("output").innerText =
      data.responseData.translatedText;

  } catch {
    document.getElementById("output").innerText = "Lỗi dịch!";
  }
}

// 🔹 Đổi ngôn ngữ
function swapLang() {
  let from = document.getElementById("from");
  let to = document.getElementById("to");

  let temp = from.value;
  from.value = to.value;
  to.value = temp;

  translateText();
}

// 🔹 Hàm đọc chung
function speak(text, lang) {
  let speech = new SpeechSynthesisUtterance(text);
  speech.lang = (lang === "vi") ? "vi-VN" : "en-US";
  speechSynthesis.speak(speech);
}

// 🔹 Đọc gốc
function speakInput() {
  let text = document.getElementById("inputText").value;
  let lang = document.getElementById("from").value;
  speak(text, lang);
}

// 🔹 Đọc dịch
function speakOutput() {
  let text = document.getElementById("output").innerText;
  let lang = document.getElementById("to").value;
  speak(text, lang);
}