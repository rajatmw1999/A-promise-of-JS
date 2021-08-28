class Student{
    constructor(firstName, lastName, standard)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.standard = standard;
    }
    displayName(){
        console.log(this.firstName + " " +this.lastName);
    }
}

let student1 = new Student("Mohil","Garg",12);
student1.displayName();