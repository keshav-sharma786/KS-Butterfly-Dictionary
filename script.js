// console.log("Namaste Javascript");

const wordAppearance = document.querySelector(".word-appearance");
const searchBtn = document.querySelector(".search-btn");
const container02 = document.querySelector(".container-2");
const mainContainer = document.querySelector(".main-container");
const inputField = document.querySelector(".input-field");
const container03 = document.querySelector(".container-3");

function showWordsDefinitions(arrOfObjWordMeanings) {
//   console.log(arrOfObjWordMeanings);
  for (const objWordMeanings of arrOfObjWordMeanings) {
    // console.log(objWordMeanings.definitions);
    const speechNounAdjDiv = document.createElement("div");
    speechNounAdjDiv.innerHTML = `
        <div class="speech-noun-adjective">
          <b>Speech:&nbsp;&nbsp;</b>
          <b>${objWordMeanings.partOfSpeech.toUpperCase()}</b>
        </div>
        `;
    container03.append(speechNounAdjDiv);
    // console.dir(speechNounAdjDiv);
    // for this purpose we basically have to apply the nested for of loops
    // objWordDefinitions will be an array of object that is why we are looping on it.
    const objWordDefinitions = objWordMeanings.definitions;
    // console.log(objWordDefinitions);
    // creating a ul element and appending the list items dynamically into it.before the for of loop begins as i will only at once or you can say in one time i will append all the list items inside the ul
    const ul = document.createElement("ul");
    ul.classList.add("unordered-list");
    for (const objWordDefinition of objWordDefinitions) {
    //   console.log(objWordDefinition);
      const li = document.createElement("li");
      li.classList.add("list-definitions");
      li.innerHTML = `👉&nbsp;&nbsp;${objWordDefinition.definition}`;
      ul.append(li);
    }
    // appending ul to the main-container as well
    container03.append(ul);
  }
  //   mainContainer.style.transition = 'height 3s linear';
}

function showWordData(wordData) {
//   console.log(wordData); //array of object.
  const wordDiv = document.createElement("div");
  // wordAppearance.innerText = wordData[0].word.toUpperCase();
  //   const b1 = document.createElement("b");
  //   b1.innerHTML = "WORD:&nbsp; &nbsp;";
  //   const b2 = document.createElement("b");
  //   b2.innerText = wordData[0].word.toUpperCase();
  //   wordDiv.classList.add("word-div");
  //   wordDiv.append(b1);
  //   wordDiv.append(b2);
  wordDiv.classList.add("word-div");
  wordDiv.innerHTML = `
  <b>WORD:&nbsp;&nbsp;</b>
  <b class="word-appearance">${wordData[0].word.toUpperCase()}</b>
`;
  container03.append(wordDiv);
  // looping on the meanings array of object
  // appltying for of loop on the array of objects that we have got basically for the simplicity purpose.
  // for showing meanings as well as definitions as well as part of the speech on ui we'll segregate this logic into a separate function otherwise the code will look very buly as well as messy
  const arrOfObjWordMeanings = wordData[0].meanings;
  // console.log(arrOfObjWordMeanings);
  // function call
  showWordsDefinitions(arrOfObjWordMeanings);
}

// we'll make a async function wordMeaning()
// async function by default return a promise that is basically by default fulfilled

async function wordMeaning(searchedWord) {
  try {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${searchedWord}`;
    const responseObj = await fetch(url);
    const wordData = await responseObj.json();
    // console.log(wordData);
    // now we want after the data has come, we have to show that data to UI as well
    // for that purpose I will segregate that logic into a separate function for that purpose
    showWordData(wordData);
  } catch (err) {
    // console.log(err);
    const wordDiv = document.createElement("div");
    wordDiv.innerHTML = `
       <div class="word-div">
        <b>WORD:&nbsp;&nbsp;</b>
        <b class="word-appearance">word not found</b>
        </div> 
        <br />
        <br />
    `;
    container03.append(wordDiv);
  }
}

// wordMeaning("courage");
searchBtn.addEventListener("click", (e) => {
  // first thing i want is that when the user clicks on the search btn, we have to check that weather the user has searched for a word in the input field or not
  // validation part
  // if not then we w'll give the user an alert meassage
  const searchedWordByUser = inputField.value;
  if (searchedWordByUser) {
    container03.innerHTML = "";
    // means user has searched for a text
    // truty value
    // calling async wordMeaning function
    inputField.value = "";
    wordMeaning(searchedWordByUser);
  } else {
    // user have'nt search for any word
    // falsy value
    alert("Please enter a valid word");
  }
});
