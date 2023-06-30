// Import inquirer, fs, and the shape modules
const inquirer = require("inquirer");
const fs = require("fs");
const { Circle, Square, Triangle } = require("./lib/shapes");

// Define an Svg class that has a constructor with three methods for rendering and setting the text and shape elements in the SVG string.
class Svg {
  constructor() {
    this.textElement = "";
    this.shapeElement = "";
  }

  render(shapeColor, shapeBorder) {
    const borderColor = shapeColor.toLowerCase() === "white" ? "black" : "none";
    const style = shapeBorder ? `style="${shapeBorder}"` : "";
    const svgString = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="200" ${style}>${this.shapeElement}${this.textElement}</svg>`;
    return svgString;
  }

  setTextElement(text, color) {
    this.textElement = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${color}">${text}</text>`;
  }

  setShapeElement(shape) {
    this.shapeElement = shape.render();
  }
}

// Array of questions for user input
const questions = [
  {
    type: "input",
    name: "text",
    message: "Enter up to 3 characters: ",
    validate: function (text) {
      if (text.length > 3) {
        console.log("\n Input characters of length 3 or under");
        return false;
      } 
      else {
        return true;
      }
    },
  },
  {
    type: "input",
    name: "textColour",
    message: "Enter a colour for the text (OR a hexadecimal number): ",
  },
  {
    type: "list",
    name: "shape",
    message: "What shape should the logo be? ",
    choices: ["Circle", "Square", "Triangle"],
  },
  {
    type: "input",
    name: "shapeColour",
    message: "Enter a colour for the shape (OR a hexadecimal number): ",
  },
];

// This function is used to generate the logo
function generateLogo(answers, newLogo) {
  const { shapeColour, text, textColour } = answers;
  newLogo.setTextElement(text.toUpperCase(), textColour);

  switch (answers.shape) {
    case "Triangle":
      newLogo.setShapeElement(new Triangle(shapeColour));
      break;
    case "Square":
      newLogo.setShapeElement(new Square(shapeColour));
      break;
    case "Circle":
      newLogo.setShapeElement(new Circle(shapeColour));
      break;
  }

  const svgString = newLogo.render(shapeColour, textColour);

  fs.writeFile("./examples/logo.svg", svgString, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully created logo: Generated logo.svg");
    }
  });
}

// This function will initialize the app
function init() {
  inquirer
    .prompt(questions)
    .then((answers) => {
      const newLogo = new Svg();
      newLogo.setTextElement(answers.text.toUpperCase(), answers.textColour);

      switch (answers.shape) {
        case "Triangle":
          newLogo.setShapeElement(new Triangle(answers.shapeColour));
          break;
        case "Square":
          newLogo.setShapeElement(new Square(answers.shapeColour));
          break;
        case "Circle":
          newLogo.setShapeElement(new Circle(answers.shapeColour));
          break;
      }

      generateLogo(answers, newLogo);
    })
    .catch((err) => console.log(err));
}

// Function call to initialize the app
init();
module.exports = { Svg };

