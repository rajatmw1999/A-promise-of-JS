function Person(FirstName, LastName){
    this.firstName=FirstName;
    this.lastName=LastName;
    this.displayName  = function(){
        return "This person's name is " + this.firstName + " " + this.lastName;
    }
}

var person1 = new Person("Mohil","Garg");
// person1.firstName = "Mohil";
// person1.lastName = "Garg";
// console.log(person1.displayName());
console.log(Object.keys(person1))

// https://www.tutorialsteacher.com/javascript/class-in-javascript