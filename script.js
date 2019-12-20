'use strict';

const apiKey = '8cjuTR9nivhxTS9PiKKUfZUVijPHRvjC8ZdSaCGd';
const campgroundsURL = 'https://developer.nps.gov/api/v1/campgrounds';

const STORE = [
    {parkCode: 'ACAD', text: 'Acadia National Park, ME'},
    {parkCode: 'ARCH', text: 'Arches National Park, UT'},
    {parkCode: 'BADL', text: 'Badlands National Park, SD'},
    {parkCode: 'BIBE', text: 'Big Bend National Park, TX'},
    {parkCode: 'BISC', text: 'Biscayne National Park, FL'},
    {parkCode: 'BLCA', text: 'Black Canyon of The Gunnison National Park, CO'},
    {parkCode: 'BRCA', text: 'Bryce Canyon National Park, UT'},
    {parkCode: 'CANY', text: 'Canyon Lands National Park, UT'},
    {parkCode: 'CARE', text: 'Capitol Reef National Park, UT'},
    {parkCode: 'CAVE', text: 'Carlsbad Caverns National Park, NM'},
    {parkCode: 'CHIS', text: 'Channel Islands National Park, CA'},
    {parkCode: 'CONG', text: 'Congaree National Park, SC'},
    {parkCode: 'CRLA', text: 'Crater Lake National Park, OR'},
    {parkCode: 'CUVA', text: 'Cuyahoga Valley National Park, OH'},
    {parkCode: 'DEVA', text: 'Death Valley National Park, CA & NV'},
    {parkCode: 'DENA', text: 'Denali National Park, AK'},
    {parkCode: 'DRTO', text: 'Dry Tortugas National Park, FL'},
    {parkCode: 'EVER', text: 'Everglades National Park, FL'},
    {parkCode: 'GAAR', text: 'Gates of The Arctic National Park, AK'},
    {parkCode: 'JEFF', text: 'Gateway Arch National Park, MO'},
    {parkCode: 'GLAC', text: 'Glacier National Park, MT'},
    {parkCode: 'GLBA', text: 'Glacier Bay National Park, AK'},
    {parkCode: 'GRCA', text: 'Grand Canyon National Park, AZ'},
    {parkCode: 'GRTE', text: 'Grand Teton National Park, WY'},
    {parkCode: 'GRBA', text: 'Great Basin National Park, NV'},
    {parkCode: 'GRSA', text: 'Great Sand Dunes National Park, CO'},
    {parkCode: 'GRSM', text: 'Great Smoky Mountains National Park, NC & TN'},
    {parkCode: 'GUMO', text: 'Guadalupe Mountains National Park, TX'},
    {parkCode: 'HALE', text: 'Haleakala National Park, HI'},
    {parkCode: 'HAVO', text: 'Hawaii Volcanoes National Park'},
    {parkCode: 'HOSP', text: 'Hot Springs National Park, AR'},
    {parkCode: 'INDU', text: 'Indiana Dunes National Park, IN'},
    {parkCode: 'ISRO', text: 'Isle Royale National Park, MI'},
    {parkCode: 'JOTR', text: 'Joshua Tree National Park, CA'},
    {parkCode: 'KATM', text: 'Katmai National Park, AK'},
    {parkCode: 'KEFJ', text: 'Kenai Fjords National Park, AK'},
    {parkCode: 'KOVA', text: 'Kobuk Valley National Park, AK'},
    {parkCode: 'LACL', text: 'Lake Clark National Park, AK'},
    {parkCode: 'LAVO', text: 'Lassen Volcanic National Park, CA'},
    {parkCode: 'MACA', text: 'Mammoth Cave National Park, KY'},
    {parkCode: 'MEVE', text: 'Mesa Verde National Park, CO'},
    {parkCode: 'MORA', text: 'Mount Rainer National Park, WA'},
    {parkCode: 'NPSA', text: 'National Park of American Samoa, American Samoa'},
    {parkCode: 'NOCA', text: 'North Cascades National Park, WA'},
    {parkCode: 'OLYM', text: 'Olympic National Park, WA'},
    {parkCode: 'PEFO', text: 'Petrified Forest National Park, AZ'},
    {parkCode: 'PINN', text: 'Pinnacles National Park, CA'},
    {parkCode: 'REDW', text: 'Redwood National Park, CA'},
    {parkCode: 'ROMO', text: 'Rocky Mountain National Park, CO'},
    {parkCode: 'SAGU', text: 'Saguaro National Park, AZ'},
    {parkCode: 'SEKI', text: 'Sequoia & Kings Canyon National Park, CA'},
    {parkCode: 'SHEN', text: 'Shenandoah National Park, VA'},
    {parkCode: 'THRO', text: 'Theodore Roosevelt National Park, ND'},
    {parkCode: 'VIIS', text: 'Virgin Islands National Park, Virgin Islands'},
    {parkCode: 'VOYA', text: 'Voyageurs National Park, MN'},
    {parkCode: 'WICA', text: 'Wind Cave National Park, SD'},
    {parkCode: 'WRST', text: 'Wrangell-St. Elias National Park, AK'},
    {parkCode: 'YELL', text: 'Yellowstone National Park, WY'},
    {parkCode: 'YOSE', text: 'Yosemite National Park, CA'},
    {parkCode: 'ZION', text: 'Zion National Park, UT'}
];

let APIdata;

function displayDropDown(store) {
    for (let i = 0; i < store.length; i++) {
        console.log(store[i].parkCode);
        console.log(store[i].text);
       $('#js-search-term').append($('<option>',{
           value: store[i].parkCode,
           text: store[i].text
        }))
    };
}

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function displayResults(responseJson) {
    console.log(responseJson);
    $('#results-list').empty();

    handleFilters();

    if (responseJson.data.length == 0) {
        $('#results-list').append(
            `<h2>Search Results: (${responseJson.data.length})</h2>
            <p>Sorry! There are no campgrounds listed for that selection at this time. Please choose a different park.</p>`);
            $('#results').removeClass('hidden');
    };

    if (responseJson.data.length >= 1) {
        $('#filters').removeClass('hidden');
        $('#results-list').append(
            `<h2>Search Results: (${responseJson.data.length})</h2>`)
    
        for (let i = 0; i < responseJson.data.length; i++) {
            $('#results-list').append(
                `<li>
                <h4>${responseJson.data[i].name}</h4>
                <p>${responseJson.data[i].description}</p>
                <p>Total sites: ${responseJson.data[i].campsites.totalsites}</p>
                <p>Group sites: ${responseJson.data[i].campsites.group}</p>
                <p>Tent-only sites: ${responseJson.data[i].campsites.tentonly}</p>
                <p>RV-only sites: ${responseJson.data[i].campsites.rvonly}</p>
                <p>RV info: ${responseJson.data[i].accessibility.rvinfo}</p>
                <p>RV max-length: ${responseJson.data[i].accessibility.rvmaxlength}</p>
                <p>Toilets: ${responseJson.data[i].amenities.toilets}</p>
                <p>Showers: ${responseJson.data[i].amenities.showers}</p>
                <p>Potable water: ${responseJson.data[i].amenities.potablewater}</p>
                <p>Dump station: ${responseJson.data[i].amenities.dumpstation}</p>
                <p>Electrical hookups: ${responseJson.data[i].campsites.electricalhookups}</p>
                <p>Wifi: ${responseJson.data[i].amenities.internetconnectivity}</p>
                <p>Firewood for sale: ${responseJson.data[i].amenities.firewoodforsale}</p>
                <p>Wheelchair accessability: ${responseJson.data[i].accessibility.wheelchairaccess}</p>
                <p>Directions: ${responseJson.data[i].directionsoverview}</p>
                <p>Weather: ${responseJson.data[i].weatheroverview}</p>
                <p>Additional info: ${responseJson.data[i].accessibility.additionalinfo}</p>
                <p>Regulations: ${responseJson.data[i].regulationsoverview}</p>
                <p>For reservation info, please visit <a href="https://www.recreation.gov/" target="_blank">recreation.gov.</a>
                </li>`
            )};
    
            $('#results').removeClass('hidden');
    }     
}

function handleFilters(responseJson) {
    $('.filterOptionShowers').on('click', event => {
        console.log('`handleFiltersChecked` ran');
        if (event.target.checked) {
            let filterDataClone = JSON.parse(JSON.stringify(APIdata));
            let filteredData = filterDataClone.data.filter((obj) => {
            return obj.amenities.showers[0] != 'None'
        })
        filterDataClone.data = filteredData;
        displayResults(filterDataClone);
        } else {
            displayResults(APIdata);
        }  
    })

    $('.filterOptionToilets').on('click', event => {
        console.log('`handleFiltersChecked` ran');
        if (event.target.checked) {
            let filterDataClone = JSON.parse(JSON.stringify(APIdata));
            let filteredData = filterDataClone.data.filter((obj) => {
            return obj.amenities.toilets[0] == 'Flush', 'Vault', 'Composting', 'Portable'
        })
        filterDataClone.data = filteredData;
        displayResults(filterDataClone);
        } else {
            displayResults(APIdata);
        }  
    })

    $('.filterOptionWater').on('click', event => {
        console.log('`handleFiltersChecked` ran');
        if (event.target.checked) {
            let filterDataClone = JSON.parse(JSON.stringify(APIdata));
            let filteredData = filterDataClone.data.filter((obj) => {
            return obj.amenities.potablewater[0] != false
        })
        filterDataClone.data = filteredData;
        displayResults(filterDataClone);
        } else {
            displayResults(APIdata);
        }  
    })

    $('.filterOptionElectrical').on('click', event => {
        console.log('`handleFiltersChecked` ran');
        if (event.target.checked) {
            let filterDataClone = JSON.parse(JSON.stringify(APIdata));
            let filteredData = filterDataClone.data.filter((obj) => {
            return obj.campsites.electricalhookups[0] >= 1
        })
        filterDataClone.data = filteredData;
        displayResults(filterDataClone);
        } else {
            displayResults(APIdata);
        }
    })

    $('.filterOptionDump').on('click', event => {
        console.log('`handleFiltersChecked` ran');
        if (event.target.checked) {
            let filterDataClone = JSON.parse(JSON.stringify(APIdata));
            let filteredData = filterDataClone.data.filter((obj) => {
            return obj.amenities.dumpstation[0] == true
        })
        filterDataClone.data = filteredData;
        displayResults(filterDataClone);
        } else {
            displayResults(APIdata);
        }
    })

    $('.filterOptionWiFi').on('click', event => {
        console.log('`handleFiltersChecked` ran');
        if (event.target.checked) {
            let filterDataClone = JSON.parse(JSON.stringify(APIdata));
            let filteredData = filterDataClone.data.filter((obj) => {
            return obj.amenities.internetconnectivity[0] == true
        })
        filterDataClone.data = filteredData;
        displayResults(filterDataClone);
        } else {
            displayResults(APIdata);
        }
    })
}

function getNpsCampgrounds(query) {
    const params = {
        parkCode: query,
        limit: 100,
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
        .then(responseJson => {
            APIdata = responseJson
            displayResults(responseJson)
        })
        .catch(err => {
            $('#js-error-message').text(`Something went wrong. Please try again later.`);
        });
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#js-search-term').val();
        getNpsCampgrounds(searchTerm);
    });
}

displayDropDown(STORE);

$(watchForm);