var textbox1 = document.getElementById("textbox1");
var textbox2 = document.getElementById("textbox2");

var firstd = document.getElementById("firstd").value;
var secondd = document.getElementById("secondd").value;

var firstbox = document.getElementById("firstd");
var secondbox = document.getElementById("secondd");

textbox1.addEventListener("keyup", textbox1Change);
textbox2.addEventListener("keyup", textbox2Change);
textbox1.addEventListener("keypress", textbox1Change);
textbox2.addEventListener("keypress", textbox2Change);
firstbox.addEventListener("change",ddUp1);
secondbox.addEventListener("change",ddUp2);

function decodeMorse(morseCode) {
    var ref = { 
      '.-':     'a',
      '-...':   'b',
      '-.-.':   'c',
      '-..':    'd',
      '.':      'e',
      '..-.':   'f',
      '--.':    'g',
      '....':   'h',
      '..':     'i',
      '.---':   'j',
      '-.-':    'k',
      '.-..':   'l',
      '--':     'm',
      '-.':     'n',
      '---':    'o',
      '.--.':   'p',
      '--.-':   'q',
      '.-.':    'r',
      '...':    's',
      '-':      't',
      '..-':    'u',
      '...-':   'v',
      '.--':    'w',
      '-..-':   'x',
      '-.--':   'y',
      '--..':   'z',
    };
    
    return morseCode
      .split('\n')
      .join(' newline ')
      .split('   ')
      .join(' space ')
      .split(' ')
      .map(
        a => a
          .split(' ')
          .map(
            b => ref[b] ? ref[b] : b
          ).join('')
      ).join('')
      .split('space')
      .join(' ')
      .split('newline')
      .join('\n')
      .toUpperCase();
  }

  function encodeMorse(text) {
    var ref = {
        "A": ".-",
        "B": "-...",
        "C": "-.-.",
        "D": "-..",
        "E": ".",
        "F": "..-.",
        "G": "--.",
        "H": "....",
        "I": "..",
        "J": ".---",
        "K": "-.-",
        "L": ".-..",
        "M": "--",
        "N": "-.",
        "O": "---",
        "P": ".--.",
        "Q": "--.-",
        "R": ".-.",
        "S": "...",
        "T": "-",
        "U": "..-",
        "V":"...-",
        "W": ".--",
        "X": "-..-",
        "Y": "-.--",
        "Z": "--.."
     }
  
     return text.toUpperCase().split('\n').join('ß').split("").map(el => {
        return ref[el] ? ref[el] : el;
     }).join(" ").split(' ß ').join('\n').split(' ß').join('\n').split('ß ').join('\n').split('ß').join('\n');
  }
  function encodeBase64(str) {
    return btoa(
      encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function toSolidBytes(match, p1) {
        return String.fromCharCode('0x' + p1)
      })
    )
  }
  function decodeBase64(str) {
    // Going backward: from byte-stream to percent-encoding, to original string.
    return decodeURIComponent(
      atob(str)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        })
        .join('')
    )
  }
  function encodeBinary(string) {
    return string.split('').map(function (char) {
        return char.charCodeAt(0).toString(2);
    }).join(' ');
  }
  function decodeBinary(string) {
    return string.split(' ').map(function (char) {
        return String.fromCharCode(parseInt(char, 2));
    }).join('');
  }

var toText=[
  function(str){return str},
  decodeMorse,
  decodeBase64,
  decodeBinary
]

var fromText=[
  function(str){return str},
  encodeMorse,
  encodeBase64,
  encodeBinary
]
var toNum= new Map()
    toNum.set("text", 0)
    toNum.set("morse", 1)
    toNum.set("base64", 2)
    toNum.set("binary", 3)


function bridge(from,to,str){
  from=toNum.get(from);
  to=toNum.get(to);
  return fromText[to](toText[from](str));
}
function textbox1Change() {
    var cursorStart = textbox1.selectionStart,
        cursorEnd = textbox1.selectionEnd;
    textbox2.value = bridge(firstd,secondd,textbox1.value);
    textbox1.setSelectionRange(cursorStart, cursorEnd)
}
function textbox2Change() {
    var cursorStart = textbox2.selectionStart,
        cursorEnd = textbox2.selectionEnd;

    textbox1.value = bridge(secondd,firstd,textbox2.value);

    textbox2.setSelectionRange(cursorStart, cursorEnd)
}
function ddUp1(){
  firstd = document.getElementById("firstd").value;
  textbox2Change();
}
function ddUp2(){
  secondd = document.getElementById("secondd").value;
  textbox1Change();
}
