const button = document.getElementById('button');
const audioElement = document.getElementById('audio');


//  Disable/Enable Button
  function toggleButton() {
    button.disabled = !button.disabled;
  }


function tellMe(joke) {
        VoiceRSS.speech({
        key: '3adfce64002e4f0a90648edf057ae5dc',
        src: joke,
        hl: 'en-us',
        v: 'Mike',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get Jokes from Joke API
async function getJokes() {
    let joke = '';
    const apiUrl = "https://v2.jokeapi.dev/joke/Dark?blacklistFlags=nsfw,religious,racist";
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      // Assign One or Two Part Joke
        // if (data.setup) {
        //     joke = `${data.setup} ... ${data.delivery}`;
        // } else {
        //     joke = data.joke;
        // }
      data.setup
        ? (joke = `${data.setup} ... ${data.delivery}`)
        : (joke = data.joke);

        tellMe(joke);

        // Disable Button
      toggleButton();

    } catch (error) {
      console.log('whoops', error);
    }
  }

//   getJokes();
  
  
  button.addEventListener("click", getJokes);
  audioElement.addEventListener("ended", toggleButton);
