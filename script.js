'use strict';

const apiKey = 'MPaK6hnYjha3d0jrxnuysoAbLIc74tpN0F8slEZG';
const searchURL = 'https://developer.nps.gov/api/v1/campgrounds';

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
            <p>Total sites: ${responseJson.data[i].campsites.totalSites}</p>
            <p>Tent-only sites: ${responseJson.data[i].campsites.tentOnly}</p>
            <p>RV-only sites: ${responseJson.data[i].campsites.rvOnly}</p>
            <p>Group sites: ${responseJson.data[i].campsites.group}</p>
            <p>RV info: ${responseJson.data[i].accessibility.rvInfo}</p>
            <p>Wheelchair accessability: ${responseJson.data[i].accessibility.wheelchairAccess}</p>
            <p>Toilets: ${responseJson.data[i].amenities.toilets}</p>
            <p>Showers: ${responseJson.data[i].amenities.showers}</p>
            <p>Potable water: ${responseJson.data[i].amenities.potableWater}</p>
            <p>Dump station: ${responseJson.data[i].amenities.dumpStation}</p>
            <p>Electrical hookups: ${responseJson.data[i].campsites.electricalHookups}</p>
            <p>Wifi: ${responseJson.data[i].amenities.internetConnectivity}</p>
            <p>Directions: ${responseJson.data[i].directionsOverview}</p>
            <p>Directions URL: ${responseJson.data[i].directionsURL}</p>
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
    const url = searchURL + '?' + queryString;

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

$(watchForm);