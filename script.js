'use strict';

const apiKey = 'MPaK6hnYjha3d0jrxnuysoAbLIc74tpN0F8slEZG';
const campgroundsURL = 'https://developer.nps.gov/api/v1/campgrounds';
const parksURL = 'https://developer.nps.gov/api/v1/parks';

function formatParkQueryParams(parkParams) {
    const parkQueryItems = Object.keys(parkParams)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(parkParams[key])}`)
    return parkQueryItems.join('&');
}

function displayDropDown(responseJson) {
    console.log(responseJson);

    for (let i = 0; i < responseJson.data.length; i++) {
        $('#js-search-term').append($('<option>',{
            value: responseJson.data[i].parkCode,
            text: responseJson.data[i].name
        }))
    };

function getNpsParks(query) {
    const parkParams = {
        api_key: apiKey,
    };

    const parkQueryString = formatParkQueryParams(parkParams);
    const npsParksUrl = parksURL + '?' + parkQueryString;
    
    console.log(npsParksUrl);

    fetch(npsParksUrl)
        .then(response => {
            if (response.ok) {
                return response.json();
            } throw new Error(response.statusText);
        })
        .then(responseJson => displayDropDown(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Somehing went wrong: ${err.message}`);
        });
}

function watchDropDown() {
        const parkSearchTerm = $('#js-search-term').val();
        getNpsParks(parkSearchTerm);
}

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function displayResults(responseJson) {
    console.log(responseJson);
    $('#results-list').empty();

    for (let i = 0; i < responseJson.data.length; i++) {
        $('#results-list').append(
            `<li>
            <h4>${responseJson.data[i].name}</h4>
            <p>${responseJson.data[i].description}</p>
            <p>Total sites: ${responseJson.data[i].campsites.totalsites}</p>
            <p>Tent-only sites: ${responseJson.data[i].campsites.tentonly}</p>
            <p>RV-only sites: ${responseJson.data[i].campsites.rvonly}</p>
            <p>Group sites: ${responseJson.data[i].campsites.group}</p>
            <p>RV info: ${responseJson.data[i].accessibility.rvinfo}</p>
            <p>Wheelchair accessability: ${responseJson.data[i].accessibility.wheelchairaccess}</p>
            <p>Toilets: ${responseJson.data[i].amenities.toilets}</p>
            <p>Showers: ${responseJson.data[i].amenities.showers}</p>
            <p>Potable water: ${responseJson.data[i].amenities.potablewater}</p>
            <p>Dump station: ${responseJson.data[i].amenities.dumpstation}</p>
            <p>Electrical hookups: ${responseJson.data[i].campsites.electricalhookups}</p>
            <p>Wifi: ${responseJson.data[i].amenities.internetconnectivity}</p>
            <p>Directions: ${responseJson.data[i].directionsoverview}</p>
            <p>Directions URL: ${responseJson.data[i].reservationsurl}</p>
            <p>For reservation info, please visit <a href="https://www.recreation.gov/" target="_blank">recreation.gov.</a>
            </li>`
        )};

        $('#results').removeClass('hidden');
}

function getNpsCampgrounds(query) {
    const params = {
        parkCode: query,
        api_key: apiKey,
    };

    const queryString = formatQueryParams(params);
    const url = campgroundsURL + '?' + queryString;

    console.log(url);

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Somehing went wrong: ${err.message}`);
        });
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#js-search-term').val();
        getNpsCampgrounds(searchTerm);
    });
}

$(watchDropDown);
$(watchForm);