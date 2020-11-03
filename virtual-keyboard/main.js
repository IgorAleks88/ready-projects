        const digits = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace"];
        const digitsShiftedEn = ["!", "@", "#", "$", "%", "^", "&",  "*", "(", ")", "_", "+", "backspace"];
        const digitsShiftedRu = ["!", '"', "№", ";", "%", ":", "?",  "*", "(", ")", "_", "+", "backspace" ];
        const keysEn = [
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter",
            "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "\\",
            "voice", "shift", "space", "enru", "left", "right", "sound"
        ];
        const keysShiftedEn = [
            "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}",
            "caps", "A", "S", "D", "F", "G", "H", "J", "K", "L", ":", '"', "enter",
            "done", "Z", "X", "C", "V", "B", "N", "M", "<", ">", "?", "|",
            "voice", "shift", "space", "enru", "left", "right", "sound"
        ];
        const keysRu = [
            "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ",
            "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter",
            "done", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "\\",
            "voice", "shift", "space", "enru", "left", "right", "sound"
        ];
        const keysShiftedRu = [
            "Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ",
            "caps", "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э", "enter",
            "done", "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", ",", "/",
            "voice", "shift", "space", "enru", "left", "right", "sound"
        ];
        const inputArea = document.querySelector(".use-keyboard-input");
        let cursorPos=0;
        const createIconHtmL = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };
        window.SpeechRecognition= window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang ='en-US';

const keyboard = {
    
    elements: {
        main: null,
        keysContainer: null,
        keys: [],
        keysSound: null
    },

    eventHandlers : {
        oninput: null,
        onclose: null
    },

    properties:{
        value: "",
        capsLock: false,
        language: true,
        systemLanguage: true,
        shift: false,
        sound: true,
        voice: false
    },

    playSound(key) {
        if (this.properties.sound) {
            switch (key) {
                case "charKey":
                    if (this.properties.language) {
                        this.elements.keysSound.src='./assets/sounds/sound1.mp3';
                    } else {
                        this.elements.keysSound.src='./assets/sounds/sound2.mp3';
                    }
                    break;
                case "backspace":
                    this.elements.keysSound.src='./assets/sounds/backspace.mp3';
                    break;
                case "space":
                    this.elements.keysSound.src='./assets/sounds/space.mp3';
                    break;
                case "shift":
                    this.elements.keysSound.src='./assets/sounds/shift.mp3';
                    break;
                case "capslock":
                    this.elements.keysSound.src='./assets/sounds/capslock.mp3';
                    break;
                case "enter":
                    this.elements.keysSound.src='./assets/sounds/enter.mp3';
                    break;
            }
            this.elements.keysSound.play();
        }
    },

    getCursorPosition(){
        cursorPos=inputArea.selectionStart;
        },
    
    caps(){
        for (const key of this.elements.keys){
            if (key.childElementCount===0) {
                key.textContent=this.properties.capsLock ? key.textContent.toUpperCase() :key.textContent.toLowerCase();
            }
        }
    },
     
    change() {
        keyLeyout=[];
        if (this.properties.shift) {
            if (this.properties.language){
            keyLeyout=keyLeyout.concat(digitsShiftedEn, keysShiftedEn);
            } else {
                keyLeyout=keyLeyout.concat(digitsShiftedRu, keysShiftedRu); 
            }
        } else {
            if (this.properties.language){
                keyLeyout=keyLeyout.concat(digits, keysEn);
                } else {
                    keyLeyout=keyLeyout.concat(digits, keysRu); 
                }
        }

        for (let i=0; i<this.elements.keys.length; i++){
            if (this.elements.keys[i].childElementCount===0){
                if (this.properties.capsLock&&!this.properties.shift) {
                    this.elements.keys[i].textContent=keyLeyout[i].toUpperCase();
                };
                if (!this.properties.capsLock&&this.properties.shift) {
                    this.elements.keys[i].textContent=keyLeyout[i].toUpperCase();
                };
                if (!this.properties.capsLock&&!this.properties.shift) {
                    this.elements.keys[i].textContent=keyLeyout[i].toLowerCase();
                };
                if (this.properties.capsLock&&this.properties.shift) {
                    this.elements.keys[i].textContent=keyLeyout[i].toLowerCase();
                };
            }
        }

    

    
    },

    init() {
        //Create main elements

        this.elements.main=document.createElement("div");
        this.elements.keysContainer=document.createElement("div");
        this.elements.keysSound=document.createElement("audio");

        //Setup main elements
        this.elements.keysSound.src='./assets/sounds/sound1.mp3';
        this.elements.main.classList.add("keyboard", "keyboard--hidden"); 
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.keysContainer.appendChild(this._createKeys());
        this.elements.keys=this.elements.keysContainer.querySelectorAll(".keyboard__key");

        //Add to DOM

        this.elements.main.appendChild(this.elements.keysContainer);
        this.elements.main.appendChild(this.elements.keysSound);
        document.body.appendChild(this.elements.main);

        inputArea.addEventListener("focus", ()=> {
                this.open(inputArea.value, currentValue => {
                    inputArea.value = currentValue;
                });
            })
       
    },

    _createKeys() {
        let keyLeyout = [];
        const fragment = document.createDocumentFragment();
        
        

        //Creates HTML for icons

        
        keyLeyout=keyLeyout.concat(digits,keysEn);
        keyLeyout.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreakEn = ["backspace", "]", "enter",  "\\"].indexOf(key) !== -1;
            const insertLineBreakRu = ["backspace", "ъ", "enter",  "."].indexOf(key) !== -1;
        

        //Add atributes/classes

        keyElement.setAttribute("type",  "button");
        keyElement.classList.add("keyboard__key");

        switch (key) {
            case "voice":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    keyElement.innerHTML = createIconHtmL("mic");
                    keyElement.addEventListener('click', ()=> {
                        this._toggleMic();
                        keyElement.classList.toggle("keyboard__key--active", this.properties.voice);                        
                    });
                break;
            case "sound":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHtmL("volume_up");
                    keyElement.addEventListener('click', ()=> {
                        this._toggleSound();
                        if (this.properties.sound) {
                            keyElement.innerHTML = createIconHtmL("volume_up"); 
                        }      else {
                            keyElement.innerHTML = createIconHtmL("volume_off");
                        }                  
                    });
                break; 
            case "left":
                keyElement.innerHTML = createIconHtmL("keyboard_arrow_left");
                keyElement.addEventListener('click', ()=> {
                    this.getCursorPosition();
                    cursorPos--;
                    if (cursorPos<0){
                        cursorPos=0;
                    }
                    this._triggerEvent("oninput");                    
                });
            break;
            case "right":
                keyElement.innerHTML = createIconHtmL("keyboard_arrow_right");
                keyElement.addEventListener('click', ()=> {
                    this.getCursorPosition();
                    cursorPos++;
                    this._triggerEvent("oninput");                    
                });
            break;
            case "enru":
                keyElement.classList.add("keyboard__key--wide");
                if (this.properties.language){
                    keyElement.innerHTML = '<img class="language-icon" src="./assets/flag_en.png" >';
                } else {
                    keyElement.innerHTML = '<img class="language-icon" src="./assets/flag_ru.png" >';
                }
                keyElement.addEventListener('click', ()=> {
                    this._toggleEnRu();
                    if (this.properties.language){
                        keyElement.innerHTML = '<img class="language-icon" src="./assets/flag_en.png" >';
                    } else {
                        keyElement.innerHTML = '<img class="language-icon" src="./assets/flag_ru.png" >';
                    }
                });
                break;

            case "backspace":
                keyElement.classList.add("keyboard__key--wide");
                keyElement.innerHTML = createIconHtmL("backspace");
                keyElement.addEventListener('click', ()=> {
                    this.playSound("backspace");
                    this.getCursorPosition();
                    this.properties.value=this.properties.value.substring(0,cursorPos-1)+this.properties.value.substring(cursorPos);
                    cursorPos--;
                    this._triggerEvent("oninput");                    
                });
                break;
            case "caps":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    keyElement.innerHTML = createIconHtmL("keyboard_capslock");
                    keyElement.addEventListener('click', ()=> {
                        this.playSound("capslock");
                        this._toggleCapsLock();
                        keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);                        
                    });
                break;
            case "shift":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    keyElement.innerHTML = createIconHtmL("eject");
                    keyElement.addEventListener('click', ()=> {
                        this.playSound("shift");
                        this._toggleShift();
                                               
                    });
                break;    
            case "enter":
                        keyElement.classList.add("keyboard__key--wide");
                        keyElement.innerHTML = createIconHtmL("keyboard_return");
                        keyElement.addEventListener('click', ()=> {
                            this.playSound("enter");
                            this.properties.value=this.properties.value.slice(0, cursorPos)+"\n"+this.properties.value.slice(cursorPos, this.properties.value.length);
                            cursorPos++;
                            this._triggerEvent("oninput");                            
                        });
                break;
            case "space":
                        keyElement.classList.add("keyboard__key--extra-wide");
                        keyElement.innerHTML = createIconHtmL("space_bar");
                        keyElement.addEventListener('click', ()=> {
                            this.playSound("space");
                            this.getCursorPosition();
                            this.properties.value=this.properties.value.slice(0, cursorPos)+" "+this.properties.value.slice(cursorPos, this.properties.value.length);
                            cursorPos++;
                            this._triggerEvent("oninput");                            
                        });
                break;
            case "done":
                        keyElement.setAttribute("name","done-button");
                        keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
                        keyElement.innerHTML = createIconHtmL("check_circle");
                        keyElement.addEventListener('click', ()=> {
                            this.close();
                            this._triggerEvent("onclose");
                        });
                break;
            default:
                    keyElement.textContent=key;
                    keyElement.addEventListener('click', ()=> {
                        this.playSound("charKey");
                        this.getCursorPosition();
                        this.properties.value=this.properties.value.slice(0, cursorPos)+keyElement.textContent+this.properties.value.slice(cursorPos, this.properties.value.length);
                        cursorPos++;
                        this._triggerEvent("oninput");
                    });
            break;
            }
            fragment.appendChild(keyElement);
            if (this.properties.language){
            if (insertLineBreakEn) {
                fragment.appendChild(document.createElement("br"));
            }
        } else {
            if (insertLineBreakRu) {
                fragment.appendChild(document.createElement("br"));
            }
        }
        });

        return fragment;
    },

    _triggerEvent(handlerName){
            if (typeof(this.eventHandlers[handlerName]) == "function"){
                this.eventHandlers[handlerName](this.properties.value);
            }
    },       
    _toggleCapsLock(){
        this.properties.capsLock=!this.properties.capsLock;
        this.elements.keys[25].classList.toggle("keyboard__key--active", this.properties.capsLock);
        this.change();
        
    },

    _toggleShift(){
        this.properties.shift=!this.properties.shift;
        this.elements.keys[51].classList.toggle("keyboard__key--active", this.properties.shift);
        this.change();
    },

    _toggleSound(){
        this.properties.sound=!this.properties.sound;
    },

    _toggleMic(){
        this.properties.voice=!this.properties.voice;
        if (this.properties.voice) {
            recognition.start();
        } else {
            recognition.abort();
        }
    },

    _toggleEnRu(){
       
        this.properties.language=!this.properties.language;
        this.change();
        if (this.properties.language){
        recognition.lang = 'en-US';
        } else {
            recognition.lang = 'ru-RU'; 
        }
        
    },
    
    open(inintialValue, oninput, onclose) {
        this.properties.value = inintialValue || '';
        this.eventHandlers.oninput=oninput;
        this.eventHandlers.onclose=onclose;
        this.elements.main.classList.remove("keyboard--hidden");

    },

    close() {
        this.properties.value="";
        this.eventHandlers.oninput=oninput;
        this.eventHandlers.onclose=onclose;
        this.elements.main.classList.add("keyboard--hidden");
    }
};

window.addEventListener("DOMContentLoaded", function() {
    keyboard.init();
})

/* window.addEventListener('keypress', function(){
    console.log(event.which);
    //Getting what language is set in system
   if (event.which>96 && event.which<123) {
       keyboard.properties.systemLanguage=true;
   }
   if (event.which>1071 && event.which<1104) {
    keyboard.properties.systemLanguage=false;
}

   //changing input symbols if system language not equal to keyboard language
   if (keyboard.properties.systemLanguage != keyboard.properties.language) {
       if (!keyboard.properties.language) {
        keyboard.elements.keys[keysEn.indexOf(event.key)+13].dispatchEvent(new Event('click'));
        event.preventDefault();     
       } else {
        keyboard.elements.keys[keysRu.indexOf(event.key)+13].dispatchEvent(new Event('click'));
        event.preventDefault();  
       }
   }
    
})*/
window.addEventListener('keydown', function (){
    console.log(event.keyCode);
    if (event.keyCode==37) {
        keyboard.elements.keys[54].classList.add('keyboard__key--pressed');
    } 
    if (event.keyCode==39) {
        keyboard.elements.keys[55].classList.add('keyboard__key--pressed');
    } 
    if (event.keyCode==8) {
        keyboard.elements.keys[12].classList.add('keyboard__key--pressed');
    } 
    if (event.keyCode==13) {
        keyboard.elements.keys[37].classList.add('keyboard__key--pressed');
    } 
    if (event.keyCode==32) {
        keyboard.elements.keys[52].classList.add('keyboard__key--pressed');
    } 
    if (event.keyCode==20) {
        keyboard.elements.keys[25].classList.add('keyboard__key--pressed');
        keyboard._toggleCapsLock();
    } 
    if (event.keyCode==16) {
        keyboard.elements.keys[51].classList.add('keyboard__key--pressed');
        keyboard._toggleShift();
    } 
    if (digits.indexOf(event.key)!=-1) {
        keyboard.elements.keys[digits.indexOf(event.key)].classList.add('keyboard__key--pressed');
    }
    if (keysEn.indexOf(event.key)!=-1) {
        keyboard.elements.keys[keysEn.indexOf(event.key)+13].classList.add('keyboard__key--pressed');
    }
    if (keysRu.indexOf(event.key)!=-1) {
        keyboard.elements.keys[keysRu.indexOf(event.key)+13].classList.add('keyboard__key--pressed');
    } 
})
window.addEventListener('keyup', function() {
    if (event.keyCode==37) {
        keyboard.elements.keys[54].classList.remove('keyboard__key--pressed');
    } 
    if (event.keyCode==39) {
        keyboard.elements.keys[55].classList.remove('keyboard__key--pressed');
    } 
    if (event.keyCode==8) {
        keyboard.elements.keys[12].classList.remove('keyboard__key--pressed');
    }
    if (event.keyCode==13) {
        keyboard.elements.keys[37].classList.remove('keyboard__key--pressed');
    } 
    if (event.keyCode==32) {
        keyboard.elements.keys[52].classList.remove('keyboard__key--pressed');
    } 
    if (event.keyCode==20) {
        keyboard.elements.keys[25].classList.remove('keyboard__key--pressed');
        
    } 
    if (event.keyCode==16) {
        keyboard.elements.keys[51].classList.remove('keyboard__key--pressed');
        
    }
    if (digits.indexOf(event.key)!=-1) {
        keyboard.elements.keys[digits.indexOf(event.key)].classList.remove('keyboard__key--pressed');
    }
    if (keysEn.indexOf(event.key)!=-1) {
        keyboard.elements.keys[keysEn.indexOf(event.key)+13].classList.remove('keyboard__key--pressed');
    }
    if (keysRu.indexOf(event.key)!=-1) {
        keyboard.elements.keys[keysRu.indexOf(event.key)+13].classList.remove('keyboard__key--pressed');
    }
})
window.addEventListener('click', function(){
    if (event.target.name!="done-button" && event.target.textContent!="check_circle"){
    inputArea.focus();
    keyboard.getCursorPosition();}
})
inputArea.addEventListener('change', function() {
    keyboard.properties.value=inputArea.value;
})
inputArea.addEventListener('focus', function() {
    inputArea.setSelectionRange(cursorPos, cursorPos);
})

recognition.addEventListener('result', e=>{
    if (keyboard.properties.voice){
    const transcript =Array.from(e.results)
    .map(result=>result[0])
    .map(result=>result.transcript).join('');
    if (e.results[0].isFinal) {
    keyboard.getCursorPosition();
    keyboard.properties.value=keyboard.properties.value.slice(0, cursorPos)+transcript+keyboard.properties.value.slice(cursorPos, keyboard.properties.value.length)+' ';
    cursorPos+=transcript.length;
    keyboard._triggerEvent("oninput");
    console.log(keyboard.properties.value);
    }
    }
})

recognition.addEventListener('end', () => {
    if (keyboard.properties.voice){
    recognition.start()}
})