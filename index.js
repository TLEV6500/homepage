const jokesBuffer = [];
const getJokes = async () => {
  if (jokesBuffer.length > 0) return jokesBuffer.pop();
  const jokesData = await (
    await fetch(
      "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single&amount=5"
    )
  ).json();
  //   console.log("jokesData", jokesData, "jokes", jokesData.jokes);
  if (jokesData) {
    const jokes = jokesData.jokes;
    // console.log("jokes", jokes);
    jokesBuffer.push(...jokes.map((jokeData) => jokeData.joke));
  } else return "Sorry, no jokes for now.";
  return jokesBuffer.pop();
};

const htmlJokeBody = document.getElementById("additional-info__jokes-body");
const htmlShowJokeBtn = document.getElementById("show_joke_btn");

htmlShowJokeBtn.addEventListener("click", async (evt) => {
  htmlJokeBody.innerText = await getJokes();
  console.log(htmlJokeBody.innerText);
});
