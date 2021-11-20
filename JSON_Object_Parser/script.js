// var showData = {
//     showName: "Flash",
//     showGenre: "Sci-Fi",
//     superPower: "Speed"
// };

// console.log(showData.showGenre);

var schoolData = {
    schoolName: "DAV Public School",
    schoolLocation: "PAN India",
    schoolType: "Senior Secondary",
    rating: null
}

var jsonKeys = Object.keys(schoolData);
// ['schoolName','schoolLocation', 'schoolType', 'rating']

var i=0;
while (i<jsonKeys.length)
{
    if(schoolData[jsonKeys[i]] == null)
    {
        console.log(jsonKeys[i], "Value not available");    
    }
    else{
    console.log(jsonKeys[i], schoolData[jsonKeys[i]]);
    }
    ++i;
}
