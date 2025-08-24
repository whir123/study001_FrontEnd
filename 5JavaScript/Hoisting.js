console.log(fun);//[Function: fun]

console.log(person);//undefined

console.log(person);//undefined

console.log(fun);//[Function: fun]

var person = "Eric";

console.log(person);//Eric

function fun() {
  console.log(person);//undefined
  var person = "Tom";
  console.log(person);//Tom
}

fun();

console.log(person);//Eric
