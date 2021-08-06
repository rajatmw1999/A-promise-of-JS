
const round = async() => {

var tasks = [4,5,18,45,2];
var flag = 1;
do{
    flag = 1;
for(var i=0; i<tasks.length; ++i)
{
    if(tasks[i]>=2)
        tasks[i] = tasks[i] - 2;
    else if(tasks[i]==1)
        tasks[i] = tasks[i] - 1;
    if(tasks[i] != 0)
        flag = 0;
}
console.log(tasks)

}while(flag==0);

}

round().then(res => {
    console.log(res);
});
