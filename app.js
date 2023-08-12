
let arrays = ["Flabbergast", "Anemone", "repos", "Defibrillator", "Tractable", "Placate", "Homogeneous","Corroborate", "Buttress", "Disabuse", "Prevaricate" ]
const randomizedWord = Math.floor(Math.random() * arrays.length)
const dwin = arrays[randomizedWord]
console.log(dwin)
const searchWord = async (word) => {
    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    try {
      ///////data from api
      const response = await fetch(apiUrl);
      const insideData = await response.json();
      // ... (other variable)
        const definitions = insideData[0].meanings[0].definitions
        const wordSearched = insideData[0].word
        const phonetic = insideData[0].phonetic
        const urlSource = insideData[0].sourceUrls
        const pronounciation = insideData[0].phonetics[0].audio
        const secondProc = insideData[0].phonetics[1].audio
        const synonyms = insideData[0].meanings[0].synonyms
        const newAuds = new Audio(secondProc)
        const newAud = new Audio(pronounciation)


        console.log(wordSearched)

//////////new bug it plays all the sound including the word before
      const linkEl = document.querySelector('.link')

/////source link
      linkEl.onclick = (e) => {
        e.preventDefault()
        window.open(urlSource, urlSource)
      }
////////getting every index of synonyms
        let synonymHTML = '';
        let synonymsLI = '';
        const closeWords = document.querySelector('.close-words li');

        for (let z = 0; z < synonyms.length; z++) {
          const forsyn = synonyms[z]
          synonymsLI = `<li>${forsyn}</li>`
          synonymHTML += synonymsLI;
        } 


        // Assigning the entire synonymHTML to closeWords.innerHTML
        if (closeWords) {
          closeWords.innerHTML = synonymHTML;
        }

        const link = insideData[0].phonetics[1].audio

        // Split the link by '/'
        const linkParts = link.split('/');
        
        // getting the last part of link which is the searched word
        const word = linkParts[linkParts.length - 1].split('-')[0];

        const capitalized = wordSearched.charAt(0).toUpperCase() + wordSearched.slice(1)

        document.querySelector('.playsound').addEventListener("click", () => {
          if (word !== vals.value) {
            newAud.pause();
          } else {
            newAuds.play();
            newAud.play()
          }

        });

      let partOfSpeechHtml = ''; // Initialize the html variable for partOfSpeech
      let eachDefHtml = ''; // Initialize the html variable for eachDef
      let exampleHtml = ''; // Initialize the html variable for example
  document.querySelector('.word').innerHTML = dwin 

  if(vals.value) {
    document.querySelector('.word').innerHTML = capitalized 
  }
      // Loop through each definition
      document.querySelector('.sound').innerHTML = phonetic
      for (let i = 0; i < definitions.length; i++) {
        const partOfSpeech = insideData[0].meanings[0].partOfSpeech
        const eachDef = definitions[i].definition;
        const example = definitions[i].example;

        // Process eachDef as an array or a single value
        let eachDefListItems = '';
        if (Array.isArray(eachDef)) {
          eachDefListItems = eachDef.map(def => `<li>${def}</li>`).join('');
        } else {
          eachDefListItems = `<li>${eachDef}</li>`;
        }
      
        // Process example as an array or a single value
        let exampleListItems = '';
            if (Array.isArray(example)) {
                exampleListItems = example.filter(ex => ex !== undefined).map(ex => `<li>${ex}</li>`).join('');
            } else if (example !== undefined) {
                exampleListItems = `<li>${example}</li>`;
            }
  
        // Concatenate the HTML content for each definition to the respective variables
        partOfSpeechHtml = `<div class="partofspeech">${partOfSpeech}</div>`;

        eachDefHtml += eachDefListItems;
        exampleHtml += exampleListItems;
      }
  
      // Use the 'partOfSpeechHtml' variable to set the content of .partofspeech
      const partOfSpeechElement = document.querySelector('.partofspeechs');
    if (partOfSpeechElement) {
      partOfSpeechElement.innerHTML = partOfSpeechHtml;
    }
  
      // Use the 'eachDefHtml' variable to set the content of .definition ul
      const eachDefElement = document.querySelector('.definition ul');
      if (eachDefElement) {
        eachDefElement.innerHTML = eachDefHtml;
      }
  
      // Use the 'exampleHtml' variable to set the content of .example ul
      const exampleElement = document.querySelector('.example ul');
      if (exampleElement) {
        exampleElement.innerHTML = exampleHtml;
      }
  

    } catch (err) {
      console.log(err);
      document.querySelector(".word").innerHTML = ":("
      if(!vals.value) {
        document.querySelector(".word").innerHTML = "please type a word"
      }
    }
  }

searchWord(dwin)

const vals = document.querySelector('input')
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault()
    searchWord(vals.value)
    
})

let click = 0


function hideNav() {
gsap.to('header', {height: '50px', flexDirection: 'row'})
gsap.to('.menu', {position: "absolute", top: "30%", right: "2%"})
gsap.to('.logo', {position: "absolute", top: "20%", right: "2%"})
}



function animation() {
  click++;
  gsap.to('header', {height: '150px', flexDirection: "column"})
  gsap.to('.right', {display: "flex", flexDirection: "column", gap: "10px", y: "50px"})
  gsap.to('.logo', {position: "absolute", top: "5%", left: "2%"})
  gsap.to('.menu', {position: "absolute", top: "10%", right: "2%"})

  if(click >= 2) {
    click = 0
    gsap.to('.right',{display: "none"})
      setTimeout(() => {
        hideNav()
      }, 500)
        }
}



const ScreenWidth = window.matchMedia('(max-width: 1000px)');

document.addEventListener('DOMContentLoaded', setupListeners);

function setupListeners() {
  changeWith();

  ScreenWidth.addListener(changeWith);
}

function changeWith() {
  if (ScreenWidth.matches) {
    console.log("Outer - Screen width <= 1000px");
    toggle();
  } else {

  }
}

function toggle() {
  let click = 0;
  document.querySelector('.menu-con').onclick = () => {
    click++;
    animation(); 
  };

  
}
