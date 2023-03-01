let alpha = "abcdefghijklmnopqrstuvwxyz";
let alphaArray = alpha.split("");
let lettersElement = document.querySelector(".letters");

// [1] Create The Alpha Letters  In Document Page

alphaArray.forEach((letter) => {
  let letterSpan = document.createElement("span");
  let letterText = document.createTextNode(letter.toUpperCase());
  letterSpan.appendChild(letterText);
  letterSpan.classList = "one-letter";
  lettersElement.appendChild(letterSpan);
});

let testWords = {
  names: ["Mohammed", "Yasser", "Omar", "Shaban", "Salama", "Youssef"],
  "Movie Or Series": [
    "Friends",
    "The GodFather",
    "Harry Potter",
    "Fast & Furious",
    "12 Angry Men",
    "Batman",
  ],
  countries: ["Egypt", "Syria", "Palestin", "Yemen", "Oman", "Libya", "Qatar"],
};

// [2] Create Random Elements

let testWordsKeys = Object.keys(testWords);
let randomProperty =
  testWordsKeys[Math.floor(Math.random() * testWordsKeys.length)];
let randomIndex = Math.floor(Math.random() * testWords[randomProperty].length);
let randomPropertyValue = testWords[randomProperty][randomIndex];
let headerSpan = document.querySelector(".guess-word span");
let spanText = document.createTextNode(randomProperty);
headerSpan.appendChild(spanText);

// [3] Create Span Elements For Each Letter In Letter Guess

let testWordArray = Array.from(randomPropertyValue.toLowerCase());
let letterGuess = document.querySelector(".letter-guess");
testWordArray.forEach((letter) => {
  let spanElemnet = document.createElement("span");
  if (alphaArray.includes(letter) == false) {
    if (letter == " ") {
      spanElemnet.classList.add("space");
    } else {
      spanElemnet.classList.add("mark");
      let mark = document.createTextNode(letter);
      spanElemnet.appendChild(mark);
    }
  } else {
    spanElemnet.classList.add("normal-letter");
  }
  letterGuess.appendChild(spanElemnet);
});

// [4] Make The Influence on Letters When Clicking On It

let lettersElements = document.querySelectorAll(".letters span");
console.log(testWordArray);
console.log(lettersElements);
let attempts = 0;
let theTrue = 0;
lettersElements.forEach((el) => {
  el.addEventListener("click", (e) => {
    if (testWordArray.includes(e.target.innerHTML.toLowerCase())) {
      let letterGuessSpans = document.querySelectorAll(".letter-guess span");
      for (let i = 0; i < testWordArray.length; i++) {
        if (testWordArray[i] === e.target.innerHTML.toLowerCase()) {
          let currentSpan = letterGuessSpans[i];
          theTrue++;
          if (theTrue < testWordArray.length) {
            document.getElementById("success").play();
          } else if (theTrue == testWordArray.length) {
            document.getElementById("congratulation").play();
          }
          if (currentSpan.innerHTML === "") {
            currentSpan.innerHTML = e.target.innerHTML;
            testWordArray[i] = "";
            console.log(testWordArray);
            if (
              !testWordArray.includes(currentSpan.innerHTML.toLocaleLowerCase())
            ) {
              console.log("Finish");
              e.target.classList.add("finish");
              e.target.classList.remove("one-letter");
            }
            break; // Exit loop after revealing one letter
          }
        }
      }
    } else {
      e.target.classList.add("finish");
      e.target.classList.remove("one-letter");
      attempts++;
      draw.classList.add(`wrong-${attempts}`);
      if (attempts < 9) {
        document.getElementById("fail").play();
      } else if (attempts == 9) {
        document.getElementById("gameover").play();
      }
    }
  });
});

// [5] Appear The Draw Parts
let draw = document.querySelector(".draw");
