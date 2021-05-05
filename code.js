/**
 * @author John Brereton
 * @since 5/1/2021
 * @source https://github.com/johnBrereton/Country-Info-App
 */

// Create lists to represent datasets
var countryCode = getColumn("Country Data", "Country code");
var countryName = getColumn("Country Data", "Country name");
var seriesCode = getColumn("Country Data", "Series code");
var seriesName = getColumn("Country Data", "Series name");
var countryName1 = getColumn("Countries and Territories", "Country Name")
var countryCode1 = getColumn("Countries and Territories", "Three Letter Country Code");
var twoLetterCode = getColumn("Countries and Territories", "Two Letter Country Code");
var region = getColumn("Countries and Territories", "Region");
var incomeLevel = getColumn("Countries and Territories", "Income Level");
var population = getColumn("Countries and Territories", "Population");
var fertilityRate = getColumn("Countries and Territories", "Population");
var unemployment = getColumn("Countries and Territories", "Unemployment");
var gdp = getColumn("Countries and Territories", "GDP Per Capita");
var percentUsingInternet = getColumn("Countries and Territories", "Percent Using Internet");
var renewableEnergy = getColumn("Countries and Territories", "Percent Renewable Energy");
var co2 = getColumn("Countries and Territories", "CO2 Emissions");
var flag = getColumn("Countries and Territories", "Flag")

// Create a list of yearly info from the dataset
/* var yearlyInfo = [];
for (var i=1990; i < 2012; i++) {
    yearlyInfo[i] = getColumn("Country Data", i.toString());
} */

/**
 _______   ___      ___ _______   ________   _________        ___  ___  ________  ________   ________  ___       _______   ________  ________      
|\  ___ \ |\  \    /  /|\  ___ \ |\   ___  \|\___   ___\     |\  \|\  \|\   __  \|\   ___  \|\   ___ \|\  \     |\  ___ \ |\   __  \|\   ____\     
\ \   __/|\ \  \  /  / | \   __/|\ \  \\ \  \|___ \  \_|     \ \  \\\  \ \  \|\  \ \  \\ \  \ \  \_|\ \ \  \    \ \   __/|\ \  \|\  \ \  \___|_    
 \ \  \_|/_\ \  \/  / / \ \  \_|/_\ \  \\ \  \   \ \  \       \ \   __  \ \   __  \ \  \\ \  \ \  \ \\ \ \  \    \ \  \_|/_\ \   _  _\ \_____  \   
  \ \  \_|\ \ \    / /   \ \  \_|\ \ \  \\ \  \   \ \  \       \ \  \ \  \ \  \ \  \ \  \\ \  \ \  \_\\ \ \  \____\ \  \_|\ \ \  \\  \\|____|\  \  
   \ \_______\ \__/ /     \ \_______\ \__\\ \__\   \ \__\       \ \__\ \__\ \__\ \__\ \__\\ \__\ \_______\ \_______\ \_______\ \__\\ _\ ____\_\  \ 
    \|_______|\|__|/       \|_______|\|__| \|__|    \|__|        \|__|\|__|\|__|\|__|\|__| \|__|\|_______|\|_______|\|_______|\|__|\|__|\_________\
                                                                                                                                       \|_________|
*/

onEvent("searchButton", "click", function() {
    generateResults();
});

onEvent("homeScreen", "keydown", function(event) {
    generateResults();
});

/**
 ________ ___  ___  ________   ________ _________  ___  ________  ________   ________      
|\  _____\\  \|\  \|\   ___  \|\   ____\\___   ___\\  \|\   __  \|\   ___  \|\   ____\     
\ \  \__/\ \  \\\  \ \  \\ \  \ \  \___\|___ \  \_\ \  \ \  \|\  \ \  \\ \  \ \  \___|_    
 \ \   __\\ \  \\\  \ \  \\ \  \ \  \       \ \  \ \ \  \ \  \\\  \ \  \\ \  \ \_____  \   
  \ \  \_| \ \  \\\  \ \  \\ \  \ \  \____   \ \  \ \ \  \ \  \\\  \ \  \\ \  \|____|\  \  
   \ \__\   \ \_______\ \__\\ \__\ \_______\  \ \__\ \ \__\ \_______\ \__\\ \__\____\_\  \ 
    \|__|    \|_______|\|__| \|__|\|_______|   \|__|  \|__|\|_______|\|__| \|__|\_________\
                                                                               \|_________|
*/

// Validates that the country the user enters is valid
// Provides the uesr with an error if the input is not valid
function validateSearch() {
    if(checkFor(getText("countryInput"), countryName1)) {
        setProperty("inputWarning", "text", "");
        return "country";
    }
    else if(checkFor(getText("countryInput"), region)) {
        setProperty("inputWarning", "text", "");
        return "region";
    }
    else if(getText("countryInput") == "") {
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
    var countryId = find(getText("countryInput"), countryName);
    var countryId1 = find(getText("countryInput"), countryName1);
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
        updateInfo(getText("countryInput"));
    }
    else if(validateSearch() == "region") {
        setScreen("resultsScreen");
        updateResults(getText("countryInput"));
    }
}
