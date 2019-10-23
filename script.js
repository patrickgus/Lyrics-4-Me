'use scrict';

const apiKey = '52c6dff4ea5e83aba69fe752999caa2c';
const lastFmSearchUrl = 'http://ws.audioscrobbler.com/2.0/';
const lyricsSearchUrl = 'https://api.lyrics.ovh/v1/';
// const query = $('#js-search-term').val();
let page = 1;

function formatQueryParams(params) {
  const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);

  return queryItems.join('&');
}

function displayResults(results) {
  console.log(results);
}

function getResults(query, page) {
  const params = {
    method: 'track.search',
    track: query,
    api_key: apiKey,
    format: 'json',
    page: page
  };
  const queryString = formatQueryParams(params);
  const url = lastFmSearchUrl + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function handleLoadMore() {
  $('#js-more-results').on('click', event => {
    const query = $('#js-search-term').val();

    getResults(query, ++page);
  });
}

function handleSearch() {
  $('form').submit(event => {
    event.preventDefault();

    $('#js-results-list').empty();

    const searchTerm = $('#js-search-term').val();
    // const results = getResults(searchTerm, 1);
    page = 1;

    getResults(searchTerm, page);
    // displayResults(results);
  });
}

$(function() {
  handleSearch();
  handleLoadMore();
});
