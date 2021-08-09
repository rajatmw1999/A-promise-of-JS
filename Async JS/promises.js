
function promise(){
    return new Promise((resolve, reject) => {
       var age = 178;
       if(age>=18)
            resolve("Please Enter");
        else
        reject("Age should be atleast 18");
    })
}

// console.log(promise())
promise().then(res=>{
    console.log(res);
}).catch(err => {
    console.log(err);
})