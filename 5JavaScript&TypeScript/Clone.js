

      function Person(name, age) {
        this.name = name;
        this.age = age;
      }
      Person.prototype.greet = function () { // ⚠️
        console.log(`Hi, I'm ${this.name} and I'm ${this.age} years old.`);
      };
      const person = new Person('Alice', 25);
      person.greet();
