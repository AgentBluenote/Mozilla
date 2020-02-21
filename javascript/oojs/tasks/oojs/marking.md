# Object-oriented JavaScript marking guide

The aim of the tasks is to demonstrate an understanding of the JavaScript features covered in the [Object-oriented JavaScript for beginners](https://wiki.developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object-oriented_JS), [Object prototypes](https://wiki.developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes), and [Inheritance in JavaScript](https://wiki.developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Inheritance) lessons in Learn Web Development on MDN.

Note: If there is an error in your code, it will be outputted into the results panel on the page, to help you try to figure out the answer (or into the browser's JavaScript console, in the case of the downloadable version).

## Task 1

In this task we provide you with a constructor. We want you to:

* Add a new method to the `shape` class's prototype, `calcPerimeter()`, which calculates its perimeter and logs the result to the console.
* Create a new instance of the `shape` class called `square`. Give it a name of `square` with a side length of `5`.
* Call your `calcPerimeter()` method on the instance, to see whether it logs the calculation result to the browser DevTools' console as expected.
* Create a new instance of `Shape()` called `triangle`, with a `name` of `triangle` and side length of `3`. Do it using `square` instance `constructor()`, rather than using the `Shape()` constructor.
* Call `triangle.calcPerimeter` to check that it works OK.

Your code should look something like this:

```
function Shape(name, sides, sideLength) {
  this.name = name;
  this.sides = sides;
  this.sidesLength = sideLength;
}

Shape.prototype.calcPerimeter = function() {
  console.log(`The ${ this.name }'s perimeter length is ${ this.sides * this.sidesLength }.`);
}

let square = new Shape('square', 4, 5);

square.calcPerimeter();

let triangle = new square.constructor('triangle', 3, 6)

triangle.calcPerimeter();
```

## Task 2

Next up we want you to take the `Shape()` constructor you saw in the Task #1 (plus the `calcPerimeter()` method) and recreate it using ES class syntax instead. 

Test that it works by creating the `square` and `triangle` instances as before (using `new Shape()`), and then calling the `square` and `triangle` object's `calcPerimeter()` methods.

Your code should look something like this:

```
class Shape {
  constructor(name, sides, sideLength) {
    this.name = name;
    this.sides = sides;
    this.sidesLength = sideLength;
  }

  calcPerimeter() {
    console.log(`The ${ this.name }'s perimeter length is ${ this.sides * this.sidesLength }.`);
  };
}

let square = new Shape('square', 4, 5);
let triangle = new Shape('triangle', 3, 6);

square.calcPerimeter();
triangle.calcPerimeter();
```

## Task 3

Finally, we'd like you to start with the `Shape()` class you created in the last task.

We'd like you to create a `Square()` class that inherits from `Shape()`, and adds a `calcArea()` method that calculates the square's area.

Create a instance of `Square()` and call its `calcPerimeter()` and `calcArea()` methods to show that it works ok.

Your code should look something like this:

```
class Shape {
  constructor(name, sides, sideLength) {
    this.name = name;
    this.sides = sides;
    this.sidesLength = sideLength;
  }

  calcPerimeter() {
    console.log(`The ${ this.name }'s perimeter length is ${ this.sides * this.sidesLength }.`);
  };
}

class Square extends Shape {
  constructor(name, sides, sideLength) { 
    super(name, sides, sideLength); 
  }
  
  calcArea() {
    console.log(`The ${ this.name }'s area is ${ this.sides * this.sides } squared.`);
  };
}

let square = new Square('square', 4, 5);

square.calcPerimeter();
square.calcArea();
```

