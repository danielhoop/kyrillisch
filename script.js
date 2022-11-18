// https://www.russianlessons.net/lessons/lesson1_main.php
// https://de.wikipedia.org/wiki/Deutsch-russische_Transkription

isCons = function(x) {
  return new RegExp("B|b|C|c|D|d|F|f|G|g|K|k|L|l|M|m|N|n|P|p|Q|q|R|r|S|s|T|t|V|v|W|w|X|x|Z|z").test(x);
}
isVoc = function(x) {
  return !isCons(x) & ! (new RegExp("H|h| |\\.|\\-").test(x));
}

to = ["Ой", "ой", "ой",  "Ю",  "ю",  "Я",  "я",  "Ё",  "ё",    "Ч",    "ч",   "Жа",   "жа",   "Жу",   "жу",   "Ши",   "ши",   "Шo",   "шo",   "Же",   "же",   "Ш",   "ш", "сс", "сс",  "Ц",  "ц", "Ку", "ку",  "Х",  "х", "К", "к", "h", "h", "Й", "й", "Й", "й", "А", "а", "К", "к", "М", "м", "О", "о", "Т", "т", "В", "в", "В", "в", "Е", "е", "Н", "н", "Р", "р", "З", "з", "У", "у", "Б", "б", "Г", "г", "Д", "д", "Ц", "ц", "И", "и", "Л", "л", "П", "п", "Ф", "ф", "Э", "э", "Кс", "кс"]; //   " Щ",  " щ",
fr = ["Eu", "eu", "äu", "Ju", "ju", "Ja", "ja", "Jo", "jo", "Tsch", "tsch", "Scha", "scha", "Schu", "schu", "Schi", "schi", "Scho", "scho", "Sche", "sche", "Sch", "sch",  "ß", "ss", "Ts", "ts", "Qu", "qu", "Ch", "ch", "C", "c", "H", "h", "J", "j", "Y", "y", "A", "a", "K", "k", "M", "m", "O", "o", "T", "t", "V", "v", "W", "w", "E", "e", "N", "n", "R", "r", "S", "s", "U", "u", "B", "b", "G", "g", "D", "d", "Z", "z", "I", "i", "L", "l", "P", "p", "F", "f", "Ä", "ä",  "X",  "x"]; //  " St", " st",

convertStrings = function(){

  newTextValue = document.getElementById("txtInput").value;
  if (newTextValue == "")
    return null;

  for (let i = newTextValue.length; i >= 0; i--) {
	ths = newTextValue.substr(i, 1);
	thsOrig = ths;

	if (i + 1 < newTextValue.length) {
		nxt = newTextValue.substr(i+1, 1);
	} else {
		nxt = " ";
	}
	// if (i + 2 < newTextValue.length) {
	// 	nxt2 = newTextValue.substr(i+2, 1);
	// } else {
	// 	nxt2 = " ";
	// }

	if (i - 1 >= 0) {
	  prv = newTextValue.substr(i-1, 1);
	} else {
		prv = " ";
	}

    // Analyze the letter after this one
	if (i + 1 < newTextValue.length) {
	  
	  // Is last letter of word.
	  if (nxt == " ") {
		  if (ths == "l") {
			  ths = "ль";
		  }
	  }
	  // Next is consonant
	  if (isCons(nxt)) {
		  if (ths == "l" && nxt != "l") {
			  ths = "ль";
		  }
	  }
	}

	// Analyse the letter bevore this one.
	if (i - 1 >= 0) {
	  // Is first letter of word.
      //if (prv == " ") {
      //  if (ths == "S" && nxt == "t") {
      //    ths = "Щ";
      //  }
      //  if (ths == "s" && nxt == "t") {
      //  ths = "щ";
      //  }
	  //}
	  // Previous is vocal
	  if (isVoc(prv)) {
		  if (ths == "i") {
			  ths = "й";
		  }
	  }
	  // Previous is consonant
	  if (isCons(prv)) {
		  if (ths == "j") {
			  ths = "ь" + ths;
		  }
	  }
	}

	// If the latter has changed, then replace it in the original string.
    if (ths != thsOrig) {
		if (i + 1 < newTextValue.length) {
			newTextValue = newTextValue.substring(0, i) + ths + newTextValue.substring(i + 1);
		} else {
			newTextValue = newTextValue.substring(0, i) + ths;
		}
	}
  }

  // Replace all normal rules (without consideration of next and previous).
  for (let i = 0; i < fr.length; i++) {
    newTextValue = newTextValue.replace(new RegExp(fr[i], "g"), to[i]);
  }
  document.getElementById("txtOutput").value = newTextValue;
}