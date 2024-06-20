const btn = document.getElementById("summarise");
btn.addEventListener("click", function() {
    btn.disabled = true;
    btn.innerHTML = "Summarizing...";
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        var url = tabs[0].url;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://127.0.0.1:5000/summary?url=" + url, true);
        xhr.onload = function() {
            var text = xhr.responseText;
            const p = document.getElementById("output");
            p.value = text;
            btn.disabled = false;
            btn.innerHTML = "Summarise";
        }
        xhr.send();
    });
});



let languages = ['afrikaans', 'albanian', 'amharic', 'arabic', 'armenian', 'assamese', 'aymara', 'azerbaijani', 'bambara', 'basque', 'belarusian', 'bengali', 'bhojpuri', 'bosnian', 'bulgarian', 'catalan', 'cebuano', 'chichewa','chinese (simplified)', 'chinese (traditional)', 'corsican', 'croatian', 'czech','danish', 'dhivehi', 'dogri', 'dutch', 'english', 'esperanto','estonian', 'ewe', 'filipino', 'finnish', 'french', 'frisian','galician', 'georgian', 'german', 'greek', 'guarani', 'gujarati',
   'haitian creole', 'hausa', 'hawaiian', 'hebrew', 'hindi', 'hmong','hungarian', 'icelandic', 'igbo', 'ilocano', 'indonesian', 'irish','italian', 'japanese', 'javanese', 'kannada', 'kazakh', 'khmer','kinyarwanda', 'konkani', 'korean', 'krio', 'kurdish (kurmanji)','kurdish (sorani)', 'kyrgyz', 'lao', 'latin', 'latvian', 'lingala','lithuanian', 'luganda', 'luxembourgish', 'macedonian', 'maithili','malagasy', 'malay', 'malayalam', 'maltese', 'maori', 'marathi','meiteilon (manipuri)', 'mizo', 'mongolian', 'myanmar', 'nepali', 
     'norwegian', 'odia (oriya)', 'oromo', 'pashto', 'persian', 'polish',
      'portuguese', 'punjabi', 'quechua', 'romanian', 'russian', 'samoan',
       'sanskrit', 'scots gaelic', 'sepedi', 'serbian', 'sesotho', 'shona', 
       'sindhi', 'sinhala', 'slovak', 'slovenian', 'somali', 'spanish',
        'sundanese', 'swahili', 'swedish', 'tajik', 'tamil', 'tatar', 
        'telugu', 'thai', 'tigrinya', 'tsonga', 'turkish', 'turkmen', 
        'twi', 'ukrainian', 'urdu', 'uyghur', 'uzbek', 'vietnamese', 
        'welsh', 'xhosa', 'yiddish', 'yoruba', 'zulu'];

let languageselect = document.getElementById("languages");
languages.forEach((languages,i) => (languageselect.options[i] = new Option(languages)));
languageselect.value='hindi';



const btn2 = document.getElementById("translate");
btn2.addEventListener("click", function() {
        btn2.disabled = true;
        btn2.innerHTML = "Translating...";
        chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
            var url = tabs[0].url;
            var xhr = new XMLHttpRequest();
            const p = document.getElementById("output");
            var summary = p.value;
            const lang = document.getElementById("languages");
            var langi = lang.value;
            xhr.open("GET", "http://127.0.0.1:5000/translate?summary=" + summary +"&language="+langi, true);
            xhr.onload = function() {
                var text = xhr.responseText;
                const p = document.getElementById("output");
                p.value = text;
                btn2.disabled = false;
                btn2.innerHTML = "Translate";
            }
            xhr.send();
        });

});



let speech = new SpeechSynthesisUtterance();
const btn3 = document.getElementById("read");
btn3.addEventListener("click", function() {
    btn3.disabled = true;
    btn3.innerHTML = "Reading...";
    speech.text = document.getElementById("output").value;
    window.speechSynthesis.speak(speech);
    btn2.disabled = false;
    btn2.innerHTML = "Read";
    });
