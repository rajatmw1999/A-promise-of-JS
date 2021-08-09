const myPromise = async() => {
    return new Promise( async (resolve, reject) => {
        var response = await fetch ('https://api.github.com/users/MohilGarg/repos?sort=pushed') 
        var data = response.json()
        resolve(data)
    })
}

myPromise().then(res => console.log(res)).catch(err => console.log(err))