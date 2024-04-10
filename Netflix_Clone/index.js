// API key from TMDB
const api = "10b2f710a126ef85dfb86a300d150601";
// Base URL of the site
const base_url = "https://api.themoviedb.org/3";
// Banner URL
const banner_url = "https://image.tmdb.org/t/p/w300";

// Requests for movies data
const requests = {
  fetchNetflixOriginals: `${base_url}/discover/tv?api_key=${api}&with_networks=213`,
  fetchTrending: `${base_url}/trending/all/week?api_key=${api}&language=en-US`,
  fetchActionMovies: `${base_url}/discover/movie?api_key=${api}&with_genres=28`,
  fetchComedyMovies: `${base_url}/discover/movie?api_key=${api}&with_genres=35`,
  fetchHorrorMovies: `${base_url}/discover/movie?api_key=${api}&with_genres=27`,
  fetchRomanceMovies: `${base_url}/discover/movie?api_key=${api}&with_genres=10749`,
  fetchDocumentaries: `${base_url}/discover/movie?api_key=${api}&with_genres=99`,
};

// Function to truncate the string
function truncate(str, n) {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}

// Function to create and append a row for movies
function createMovieRow(titleText, data) {
  const headrow = document.getElementById("headrow");
  const row = document.createElement("div");
  row.className = "row";
  headrow.appendChild(row);

  const title = document.createElement("h2");
  title.className = "row_title";
  title.innerText = titleText;
  row.appendChild(title);

  const row_posters = document.createElement("div");
  row_posters.className = "row_posters";
  row.appendChild(row_posters);

  data.results.forEach((movie) => {
    const poster = document.createElement("img");
    poster.className = "row_poster";
    poster.src = banner_url + movie.backdrop_path;
    row_posters.appendChild(poster);
  });
}

// Fetch Netflix Originals
fetch(requests.fetchNetflixOriginals)
  .then((res) => res.json())
  .then((data) => {
    const setMovie = data.results[Math.floor(Math.random() * data.results.length)];

    const banner = document.getElementById("banner");
    const banner_title = document.getElementById("banner_title");
    const banner_desc = document.getElementById("banner_description");

    banner.style.backgroundImage = `url(${banner_url}${setMovie.backdrop_path})`;
    banner_title.innerText = setMovie.name || setMovie.title;
    banner_desc.innerText = truncate(setMovie.overview, 150);

    // Create row for Netflix Originals
    createMovieRow("Netflix Originals", data);
  })
  .catch((error) => {
    console.error("Error fetching Netflix originals:", error);
  });

// Fetch other categories of movies
Object.keys(requests).forEach((key) => {
  if (key !== "fetchNetflixOriginals") {
    fetch(requests[key])
      .then((res) => res.json())
      .then((data) => {
        createMovieRow(key.replace("fetch", ""), data); // Remove "fetch" from key for row title
      })
      .catch((error) => {
        console.error(`Error fetching ${key.replace("fetch", "")} movies:`, error);
      });
  }
});