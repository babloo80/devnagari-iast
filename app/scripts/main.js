var devVowelsConsonantsMap = buildDevVowelConsonantsMap();
var devVoweslConsonants = _.keys(devVowelsConsonantsMap);
var maxKeySize = findMaxKeySize();

function buildDevVowelConsonantsMap() {
  var devToIASTVowelsAndNumbersMap = {
    "अ": "a",
    "आ": "ā",
    "इ": "i",
    "ई": "ī",
    "उ": "u",
    "ऊ": "ū",
    "ऋ": "ṛ",
    "ॠ": "ṝ",
    "ऌ": "ḷ",
    "ॡ": "ḹ",
    "ए": "e",
    "ऐ": "ai",
    "ओ": "o",
    "औ": "au",
    "अं": "ṃ",
    "अः": "ḥ",
    "ऽ":  "'",
    '\u0902': "ṃ",
    '\u0903': "ḥ",
    "१": "1",
    "२": "2",
    "३": "3",
    "४": "4",
    "५": "5",
    "६": "6",
    "७": "7",
    "८": "8",
    "९": "9",
    "०": "0",

  };

  var tempConsonantsMap = {
    "क": "k",
    "ख": "kh",
    "ग": "g",
    "घ": "gh",
    "ङ": "ṅ",
    "च": "c",
    "छ": "ch",
    "ज": "j",
    "झ": "jh",
    "ञ": "ñ",
    "ट": "ṭ",
    "ठ": "ṭh",
    "ड": "ḍ",
    "ढ": "ḍh",
    "ण": "ṇ",
    "त": "t",
    "थ": "th",
    "द": "d",
    "ध": "dh",
    "न": "n",
    "प": "p",
    "फ": "ph",
    "ब": "b",
    "भ": "bh",
    "म": "m",
    "य": "y",
    "र": "r",
    "ल": "l",
    "व": "v",
    "श": "ś",
    "ष": "ṣ",
    "स": "s",
    "ह": "h"
  };

  var vowelEndingMap = {
    "": "a",
    '\u093E': "ā",
    '\u093F': "i",
    '\u0940': "ī",
    '\u0941': "u",
    '\u0942': "ū",
    '\u0943': "ṛ",
    '\u0944': "ṝ",
    '\u0962': "ḷ",
    '\u0963': "ḹ",
    '\u0947': "e",
    '\u0948': "ai",
    '\u094B': "o",
    '\u094C': "au",
    '\u0902': "ṃ",
    '\u0903': "ḥ"
  };

  var consonantKeys = _.keys(tempConsonantsMap);
  var vowelEndingKeys = _.keys(vowelEndingMap);

  var devVowelsConsonantsMap = devToIASTVowelsAndNumbersMap;

  for(var i=0; i < consonantKeys.length; i++) {
    devVowelsConsonantsMap[consonantKeys[i]+ '\u094D'] = tempConsonantsMap[consonantKeys[i]];
    for(var j=0; j < vowelEndingKeys.length; j++) {
      devVowelsConsonantsMap[consonantKeys[i]+vowelEndingKeys[j]] = tempConsonantsMap[consonantKeys[i]] + vowelEndingMap[vowelEndingKeys[j]];
    }
  }
  return devVowelsConsonantsMap;
}

function findMaxKeySize() {
  var maxSize = 0;
  for(var i=0; i< devVoweslConsonants.length; i++) {
    if (devVoweslConsonants[i].length > maxSize) {
      maxSize = devVoweslConsonants[i].length
    }
  }
  return maxSize;
}

function isInList(list, testValue) {
  return _.findIndex(list, function(each) { return each == testValue } ) != -1
}

$('#devTextArea').bind('input propertychange', function() {
  var str = $('#devTextArea').val();
  var result = convertToIAST(str);
  $('#iastTextArea').val(result);
});

//$('#mappingTextArea').val(devVoweslConsonants);

function convertToIAST(str) {
  return convertToIASTInternal(str, 0, maxKeySize, "")
}

function convertToIASTInternal(str, start, charSize, result) {
  debugger;
  if (start >= str.length) return result;
  if ((charSize+start-1) >= str.length) return convertToIASTInternal(str, start, charSize-1, result);
  var acc = str.substr(start, charSize);
  if (isInList(devVoweslConsonants, acc)) {
    result = result + devVowelsConsonantsMap[acc]
  } else if (charSize == 1) { //max length reached and the found characters are bad.
    result = result + acc[0];
  } else {
    return convertToIASTInternal(str, start, charSize-1, result);
  }
  return convertToIASTInternal(str, start+charSize, maxKeySize, result);
}

$('#iastTextArea').bind('input propertychange', function() {
  console.log('IAST Changed!');
  //$("#yourBtnID").hide();
});

function getHexCode(charValue) {
  var code = charValue.charCodeAt(0);
  var codeHex = code.toString(16).toUpperCase();
  while (codeHex.length < 4) {
    codeHex = "0" + codeHex;
  }
  return codeHex;
}
