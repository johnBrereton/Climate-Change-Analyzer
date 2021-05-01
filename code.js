/**
 * @author John Brereton
 * @since 5/1/2021
 */

// Create lists to represent datasets
var countryCode = getColumn("Country Data", "Country code");
var countryName = getColumn("Country Data", "Country name");
var seriesCode = getColumn("Country Data", "Series code");
var seriesName = getColumn("Country Data", "Series name");
var countryCode1 = getColumn("Countries and Territories", "Three Letter Country Code");
var twoLetterCode = getColumn("Countries and Territories", "Two Letter Country Code");
var region = getColumn("Countries and Territories", "Region");
var incomeLevel = getColumn("Countries and Territories", "Income Level");
var population = getColumn("Countries and Territories", "Population");
var fertilityRate = getColumn("Countries and Territories", "Population");
var unemployment = getColumn("Countries and Territories", "unemployment");
var gdp = getColumn("Countries and Territories", "GDP Per Capita");
var percentUsingInternet = getColumn("Countries and Territories", "Percent Using Internet");
var renewableEnergy = getColumn("Countries and Territories", "Percent Renewable Energy");
var co2 = getColumn("Countries and Territories", "CO2 Emissions");
var flag = getColumn("Counties and Territories", "Flag")

// Create a list of yearly info from the dataset
var yearlyInfo = [];
for (var i=1990; i < 2012; i++) {
    yearlyInfo[i] = getColumn("Country Data", i.toString());
}