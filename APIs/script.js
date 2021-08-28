console.log("Starting...")

const getData = async() =>{
    var response = await fetch('https://akabab.github.io/superhero-api/api/all.json');
    var data = await response.json();
    return data;
} 

// getData().then(data=>{
//     let names = [];
//     data.forEach(stat => {
//         if(stat.powerstats.strength > 99)
//         {
//             names.push('<h2>' +  stat.name + '</h2>' +'<br>' + '<img src="' + stat.images.md + '" /><br>');
//         }
//     });
//     document.getElementById("mysuperhero").innerHTML = names;
// }).catch(err => {
//     console.log(err);
// });

const getSuperHero = async() => {
    var userinput = prompt("Enter your superhero name : ");
    userinput = userinput.toLowerCase();
    getData().then(data=>{
        let name,img;
        data.forEach(stat => {
            if(userinput == stat.name.toLowerCase())
            {
                console.log(stat);
                name = stat.name;
                img = stat.images.md;
            }
        });
        document.getElementById("mysuperhero").innerHTML = '<h2>' + name + '</h2>' + '<br><img src="' + img + '" /> <br>';
    }).catch(err => {
        console.log(err);
    });
}

getSuperHero()