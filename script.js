'use strict';

const apiKey = '8cjuTR9nivhxTS9PiKKUfZUVijPHRvjC8ZdSaCGd';
const campgroundsURL = 'https://developer.nps.gov/api/v1/campgrounds';

const STORE = [
    {parkCode: 'ACAD', text: 'Acadia National Park, ME'},
    {parkCode: 'ARCH', text: 'Arches National Park, UT'},
    {parkCode: 'BADL', text: 'Badlands National Park, SD'},
    {parkCode: 'BIBE', text: 'Big Bend National Park, TX'},
    {parkCode: 'BISC', text: 'Biscayne National Park, FL'},
    {parkCode: 'BLCA', text: 'Black Canyon of The Gunnison National Park, CO'},
    {parkCode: 'BRCA', text: 'Bryce Canyon National Park, UT'},
    {parkCode: 'CANY', text: 'Canyon Lands National Park, UT'},
    {parkCode: 'CARE', text: 'Capitol Reef National Park, UT'},
    {parkCode: 'CAVE', text: 'Carlsbad Caverns National Park, NM'},
    {parkCode: 'CHIS', text: 'Channel Islands National Park, CA'},
    {parkCode: 'CONG', text: 'Congaree National Park, SC'},
    {parkCode: 'CRLA', text: 'Crater Lake National Park, OR'},
    {parkCode: 'CUVA', text: 'Cuyahoga Valley National Park, OH'},
    {parkCode: 'DEVA', text: 'Death Valley National Park, CA & NV'},
    {parkCode: 'DENA', text: 'Denali National Park, AK'},
    {parkCode: 'DRTO', text: 'Dry Tortugas National Park, FL'},
    {parkCode: 'EVER', text: 'Everglades National Park, FL'},
    {parkCode: 'GAAR', text: 'Gates of The Arctic National Park, AK'},
    {parkCode: 'JEFF', text: 'Gateway Arch National Park, MO'},
    {parkCode: 'GLAC', text: 'Glacier National Park, MT'},
    {parkCode: 'GLBA', text: 'Glacier Bay National Park, AK'},
    {parkCode: 'GRCA', text: 'Grand Canyon National Park, AZ'},
    {parkCode: 'GRTE', text: 'Grand Teton National Park, WY'},
    {parkCode: 'GRBA', text: 'Great Basin National Park, NV'},
    {parkCode: 'GRSA', text: 'Great Sand Dunes National Park, CO'},
    {parkCode: 'GRSM', text: 'Great Smoky Mountains National Park, NC & TN'},
    {parkCode: 'GUMO', text: 'Guadalupe Mountains National Park, TX'},
    {parkCode: 'HALE', text: 'Haleakala National Park, HI'},
    {parkCode: 'HAVO', text: 'Hawaii Volcanoes National Park'},
    {parkCode: 'HOSP', text: 'Hot Springs National Park, AR'},
    {parkCode: 'INDU', text: 'Indiana Dunes National Park, IN'},
    {parkCode: 'ISRO', text: 'Isle Royale National Park, MI'},
    {parkCode: 'JOTR', text: 'Joshua Tree National Park, CA'},
    {parkCode: 'KATM', text: 'Katmai National Park, AK'},
    {parkCode: 'KEFJ', text: 'Kenai Fjords National Park, AK'},
    {parkCode: 'KOVA', text: 'Kobuk Valley National Park, AK'},
    {parkCode: 'LACL', text: 'Lake Clark National Park, AK'},
    {parkCode: 'LAVO', text: 'Lassen Volcanic National Park, CA'},
    {parkCode: 'MACA', text: 'Mammoth Cave National Park, KY'},
    {parkCode: 'MEVE', text: 'Mesa Verde National Park, CO'},
    {parkCode: 'MORA', text: 'Mount Rainer National Park, WA'},
    {parkCode: 'NPSA', text: 'National Park of American Samoa, American Samoa'},
    {parkCode: 'NOCA', text: 'North Cascades National Park, WA'},
    {parkCode: 'OLYM', text: 'Olympic National Park, WA'},
    {parkCode: 'PEFO', text: 'Petrified Forest National Park, AZ'},
    {parkCode: 'PINN', text: 'Pinnacles National Park, CA'},
    {parkCode: 'REDW', text: 'Redwood National Park, CA'},
    {parkCode: 'ROMO', text: 'Rocky Mountain National Park, CO'},
    {parkCode: 'SAGU', text: 'Saguaro National Park, AZ'},
    {parkCode: 'SEKI', text: 'Sequoia & Kings Canyon National Park, CA'},
    {parkCode: 'SHEN', text: 'Shenandoah National Park, VA'},
    {parkCode: 'THRO', text: 'Theodore Roosevelt National Park, ND'},
    {parkCode: 'VIIS', text: 'Virgin Islands National Park, Virgin Islands'},
    {parkCode: 'VOYA', text: 'Voyageurs National Park, MN'},
    {parkCode: 'WICA', text: 'Wind Cave National Park, SD'},
    {parkCode: 'WRST', text: 'Wrangell-St. Elias National Park, AK'},
    {parkCode: 'YELL', text: 'Yellowstone National Park, WY'},
    {parkCode: 'YOSE', text: 'Yosemite National Park, CA'},
    {parkCode: 'ZION', text: 'Zion National Park, UT'}
];

let APIdata;

function displayDropDown(store) {
    for (let i = 0; i < store.length; i++) {
        //console.log(store[i].parkCode);
       // console.log(store[i].text);
       $('#js-search-term').append($('<option>',{
           value: store[i].parkCode,
           text: store[i].text
        }))
    };
}

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function displayResults(responseJson) {
    //console.log(responseJson);
    $('#resultsCount').empty();
    $('#results-list').empty();

    handleFilters();

    if (responseJson.data.length == 0) {
        $('#resultsCount').append(
            `<h2>Search Results: (${responseJson.data.length})</h2>
            <p class="no-camping">Sorry! There are no campgrounds listed for that selection at this time. Please choose a different park.</p>`);
            $('#resultsCount').removeClass('hidden');
    };

    if (responseJson.data.length >= 1) {
        $('#resultsCount').removeClass('hidden');
        $('#filters').removeClass('hidden');
        $('#resultsCount').append(
            `<h2>Search Results: (${responseJson.data.length})</h2>`)
    
        for (let i = 0; i < responseJson.data.length; i++) {
            $('#results-list').append(
                `<li>
                <h4>${responseJson.data[i].name}</h4>
                <p class="result-data-description">${responseJson.data[i].description}</p>
                <p class="result-data"><img src="https://img.icons8.com/metro/26/000000/hashtag.png" class="icons"> Total sites: ${responseJson.data[i].campsites.totalsites}</p>
                <p class="result-data"><img src="https://img.icons8.com/material-sharp/24/000000/conference-call.png" class="icons"> Group sites: ${responseJson.data[i].campsites.group}</p>
                <p class="result-data"><img src="https://img.icons8.com/ios-glyphs/30/000000/camping-tent.png" class="icons"> Tent-only sites: ${responseJson.data[i].campsites.tentonly}</p>
                <p class="result-data"><img src="https://img.icons8.com/material-rounded/24/000000/rv-campground.png" class="icons"> RV-only sites: ${responseJson.data[i].campsites.rvonly}</p>
                <p class="result-data"><img src="https://img.icons8.com/material-rounded/24/000000/info.png" class="icons"> RV info: ${responseJson.data[i].accessibility.rvinfo}</p>
                <p class="result-data"><img src="https://img.icons8.com/ios-glyphs/30/000000/ruler.png" class="icons"> RV max-length: ${responseJson.data[i].accessibility.rvmaxlength}</p>
                <p class="result-data"><img src="https://img.icons8.com/material-sharp/24/000000/toilet-paper.png" class="icons"> Toilets: ${responseJson.data[i].amenities.toilets}</p>
                <p class="result-data"><img src="https://img.icons8.com/android/24/000000/shower.png" class="icons"> Showers: ${responseJson.data[i].amenities.showers}</p>
                <p class="result-data"><img src="https://img.icons8.com/android/24/000000/water.png" class="icons"> Potable water: ${responseJson.data[i].amenities.potablewater}</p>
                <p class="result-data"><img src="https://img.icons8.com/material/24/000000/bitbucket.png" class="icons"> Dump station: ${responseJson.data[i].amenities.dumpstation}</p>
                <p class="result-data"><img src="https://img.icons8.com/material-sharp/24/000000/electrical.png" class="icons"> Electrical hookups: ${responseJson.data[i].campsites.electricalhookups}</p>
                <p class="result-data"><img src="https://img.icons8.com/android/24/000000/wifi.png" class="icons"> Wifi: ${responseJson.data[i].amenities.internetconnectivity}</p>
                <p class="result-data"><img src="https://img.icons8.com/ios-glyphs/30/000000/bonfire.png" class="icons"> Firewood for sale: ${responseJson.data[i].amenities.firewoodforsale}</p>
                <p class="result-data"><img src="https://img.icons8.com/android/24/000000/wheelchair.png" class="icons"> Wheelchair accessability: ${responseJson.data[i].accessibility.wheelchairaccess}</p>
                <p class="result-data"><img src="https://img.icons8.com/material-sharp/24/000000/track-order.png" class="icons"> Directions: ${responseJson.data[i].directionsoverview}</p>
                <p class="result-data"><img src="https://img.icons8.com/ios-glyphs/30/000000/sun.png" class="icons"> Weather: ${responseJson.data[i].weatheroverview}</p>
                <p class="result-data"><img src="https://img.icons8.com/metro/26/000000/plus-math.png" class="icons"> Additional info: ${responseJson.data[i].accessibility.additionalinfo}</p>
                <p class="result-data"><img src="https://img.icons8.com/ios-glyphs/26/000000/stop-circled.png" class="icons"> Regulations: ${responseJson.data[i].regulationsoverview}</p>
                <p class="result-data"><img src="https://img.icons8.com/metro/26/000000/literature.png" class="icons"> For reservation info, please visit <a href="https://www.recreation.gov">recreation.gov.</a>
                </li>`
            )};
    
            $('#results').removeClass('hidden');
    }     
}

function handleFilters() {
    $('#filterList').on('click', event => {
    let filters = document.querySelectorAll('.input-checkbox')

    let checkedFilters = [];
    filters.forEach(node => {
    if (node.checked === true) {
        checkedFilters.push(node.id);
    }
    })   
    let filterDataClone = JSON.parse(JSON.stringify(APIdata));
    
    let filteredData = filterDataClone.data;
    checkedFilters.forEach(element => {
        filteredData = filteredData.filter((obj) => {
            let check = true;
        switch(element) {
            case 'showers': 
                check = obj.amenities.showers[0] !== 'None'
                break;
            case 'toilets':
                check = /Flush|Vault|Composting|Portable/gi.test(obj.amenities.toilets[0])
                break;
            case 'water':
                check = obj.amenities.potablewater[0] !== false
                break;
            case 'electrical':
                check = obj.campsites.electricalhookups[0] >= 1
                break;
            case 'dump':
                check = obj.amenities.dumpstation[0] === true
                break;
            case 'internet':
                check = obj.amenities.internetconnectivity[0] === true
                break;
        }
        return check;
    }) 
    //console.log(filteredData);
    
});
    filterDataClone.data = filteredData;
    displayResults(filterDataClone);

});
}

function getNpsCampgrounds(query) {
    const params = {
        parkCode: query,
        limit: 100,
        api_key: apiKey,
    };

    const queryString = formatQueryParams(params);
    const url = campgroundsURL + '?' + queryString;

    //console.log(url);

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } throw new Error(response.statusText);
        })
        .then(responseJson => {
            APIdata = responseJson
            displayResults(responseJson)
        })
        .catch(err => {
            $('#js-error-message').text(`Something went wrong. Please try again later.`);
        });
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#js-search-term').val();
        getNpsCampgrounds(searchTerm);
        $("input:checkbox").prop('checked', false); 
    });
}

displayDropDown(STORE);

$(watchForm);
