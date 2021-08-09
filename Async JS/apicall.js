
const callApi = async() => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    // console.log(response);
    const data = await response.json();
    // console.log(data);
    return data;
}

// console.log(callApi());

callApi().then(res => {
    console.log(res);
}).catch(err => {
    console.log(err);
});