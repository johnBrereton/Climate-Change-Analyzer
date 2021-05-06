/**
 * @author John Brereton
 * @since 5/1/2021
 * @source https://github.com/johnBrereton/Country-Info-App
 */

// Create lists to represent datasets
var countryCodeList = getColumn("Country Data", "Country code");
var countryNameList = getColumn("Country Data", "Country name");
var seriesCodeList = getColumn("Country Data", "Series code");
var seriesNameList = getColumn("Country Data", "Series name");
var countryNameList1 = getColumn("Countries and Territories", "Country Name")
var countryCodeList1 = getColumn("Countries and Territories", "Three Letter Country Code");
var twoLetterCodeList = getColumn("Countries and Territories", "Two Letter Country Code");
var regionList = getColumn("Countries and Territories", "Region");
var incomeLevelList = getColumn("Countries and Territories", "Income Level");
var populationList = getColumn("Countries and Territories", "Population");
var fertilityRateList = getColumn("Countries and Territories", "Population");
var unemploymentList = getColumn("Countries and Territories", "Unemployment");
var gdpList = getColumn("Countries and Territories", "GDP Per Capita");
var percentUsingInternetList = getColumn("Countries and Territories", "Percent Using Internet");
var renewableEnergyList = getColumn("Countries and Territories", "Percent Renewable Energy");
var co2List = getColumn("Countries and Territories", "CO2 Emissions");
var flagList = getColumn("Countries and Territories", "Flag")

// Create a list of yearly info from the dataset
/* var yearlyInfo = [];
for (var i=1990; i < 2012; i++) {
    yearlyInfo[i] = getColumn("Country Data", i.toString());
} */

var resultsPage = 0;
var userInput;

// Runs the generateResults function when the search button is clicked
onEvent("searchButton", "click", function() {
    generateResults();
});

// Verifies that the enter button was pressed
// Runs the generateResults function
onEvent("homeScreen", "keydown", function(event) {
    if(event.key == "Enter") {
        generateResults();
    }
});

// Returns to the home screen when the results screen back button is pressed
onEvent("resultsBackButton", "click", function() {
    setScreen("homeScreen");
    resultsPage = 0;
});

// Returns to the results screen when the info screen back button is pressed
onEvent("infoBackButton", "click", function() {
    setScreen("homeScreen");
});

// Changes to the previous page when the previous arrow is clicked
onEvent("prevButton", "click", function() {
    if(resultsPage>0) {
        resultsPage--;
        updateResults(userInput);
    }
});

// Changes to the next page when the next arrow is clicked
onEvent("nextButton", "click", function() {
    if(resultsPage<updateResults(userInput)-1) {
        resultsPage++;
        updateResults(userInput);
    }
});

// Validates that the country the user enters is valid
// Provides the uesr with an error if the input is not valid
function validateSearch() {
    userInput = getText("countryInput");
    if(checkFor(userInput, countryNameList1)) {
        setProperty("inputWarning", "text", "");
        return "country";
    }
    else if(checkFor(userInput, regionList)) {
        setProperty("inputWarning", "text", "");
        return "region";
    }
    else if(userInput == "") {
        setProperty("inputWarning", "text", "This is a required field");
        return false;
    }
    else {
        setProperty("inputWarning", "text", "Please enter a valid country name");
        return false;
    }
}

// Updates the info screen with the info of the country selected by the user
function updateInfo(country) {
    var countryId = find(country, countryNameList);
    var countryId1 = find(country, countryNameList1);
    setProperty("countryOutput", "text", countryNameList1[countryId1]);
    setProperty("flagImage", "image", flagList[countryId1]);
    setProperty("populationOutput", "text", populationList[countryId1]);
    setProperty("regionOutput", "text", regionList[countryId1]);
}

// Updates the results page
// Uses the findCountriesIn and sortList functions
// Displays results sorted from greatest to least population
function updateResults(region) {
    var filteredCountryList = findCountriesIn(region)[0];
    var filteredPopulationList = findCountriesIn(region)[1];
    var filteredFlagList = findCountriesIn(region)[2];
    var sortedPopulationIdList = sortList(filteredPopulationList)[1];
    var pages = Math.ceil(filteredCountryList.length/5);
    for (var i=0; i<=4; i++) {
        if(filteredCountryList[sortedPopulationIdList[(5*resultsPage)+i]] != undefined) {
            setProperty("result" + i, "hidden", false);
            setProperty("flag" + i, "hidden", false);
            setProperty("result" + i, "text", "    " + filteredCountryList[sortedPopulationIdList[(5*resultsPage)+i]]);
            setProperty("flag" + i, "image", filteredFlagList[sortedPopulationIdList[(5*resultsPage)+i]]);
        }
        else {
            setProperty("result" + i, "hidden", true);
            setProperty("flag" + i, "hidden", true);
        }
    }
    setProperty("pageLabel", "text", "Page: " + (resultsPage+1) + " of " + pages);
    return pages;
}

// Finds all countries in a given reason
// Returns a list of countries, a list of populations and a list of flag urls
function findCountriesIn(region) {
    var sortedCountryList = [];
    var sortedPopulationList = [];
    var sortedFlagList = [];
    for(var i=0; i < countryNameList1.length; i++) {
        if(regionList[i] == region) {
            appendItem(sortedCountryList, countryNameList1[i]);
            appendItem(sortedPopulationList, populationList[i]);
            appendItem(sortedFlagList, flagList[i]);
        }
    }
    return [sortedCountryList, sortedPopulationList, sortedFlagList];
}

// Sorts a lits from least to greatest
// Returns list of sorted values and a list of their origional list ids
// Uses two for loops to go through every possible combination of two values in the list and see which one is greater
// If the smaller number is in front of the larger number their positions will be exchanged
function sortList(list) {
    var sortedList = [];
    var sortedIds = [];
    var temp = 0;
    sortedList = list;
    sortedIds = createNumericalList(0, list.length);
    for (var i = 0; i < sortedList.length; i++) {
        for (var j=i; j < sortedList.length; j++) {
            if (sortedList[j] > sortedList[i]) {
                temp = sortedIds[j];
                sortedIds[j] = sortedIds[i];
                sortedIds[i] = temp;

                temp = sortedList[j];
                sortedList [j] = sortedList[i];
                sortedList[i] = temp;
            }
        }
    }
    return [sortedList, sortedIds];
}

// Creates a list of consecutive integers
// Requires a starting(from) and ending(to) number
function createNumericalList(from, to) {
    var list = [];
    for (var i=from; i<=to; i++) {
        appendItem(list, i);
    }
    return list;
}

// Checks a list for an element and returns whether or not the item is in the list
// Removes case sensitivity by using to lower case method
function checkFor(element, list) {
    for(var i=0; i < list.length; i++) {
        if(list[i].toLowerCase() == element.toLowerCase()) {
            return true;
        }
    }
    return false;
}

// Ensures that the element is in the list and then find the location of the given element in the given list
// Removes case sensitivity by using to lower case method
function find(element, list) {
    if(!checkFor(element, list)) {
        return false;
    }
    for(var i=0; i < list.length; i++) {
        if(list[i].toLowerCase() == element.toLowerCase()) {
            return i;
        }
    }
}

// Checks whether the user is looking for a country or region and displays results accordingly
// Uses validate search function to make sure the user entered value is a country or region
function generateResults() {
    if(validateSearch() == "country") {
        setScreen("infoScreen");
        updateInfo(userInput);
    }
    else if(validateSearch() == "region") {
        setScreen("resultsScreen");
        updateResults(userInput);
    }
}
