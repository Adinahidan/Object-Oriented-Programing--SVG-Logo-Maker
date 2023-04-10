// Import inquirer, fs and the shape modules
const inquirer = require("inquirer");
const fs = require("fs");
const {Circle, Square, Triangle} = require("./lib/shapes"); 

//These lines define an Svg class that has a constructor with three methodes for rendering and setting the text ansd shape elements in the SVG string.
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

  //Array of questions for user input
  const questions = [
    {
        type: "input",
        name: "text",
        message: "Enter up to 3 characters: ",
        validate: function (text){
            if(text.length > 3) {
                console.log("\n Input characters of length 3 or under");
                return false
            } else {
                return true
            }
        }
    },
    {
        type: "input",
        name: "textColour",
        message: "Enter a colour for the text (OR a hexadecimal number): "
    },
    {
        type: "list",
        name: "shape",
        message: "What shape should the logo be? ",
        choices: [ "Circle", "Square","Triangle"],
    },
    {
        type: "input",
        name: "shapeColour",
        message: "Enter a colour for the shape (OR a hexadecimal number): "
    }
];

// This function is used to generate the logo
function generateLogo(answers, newLogo) {
    this.shapeColour = answers.shapeColour;
    this.text = answers.text.toUpperCase();
    this.textColour = answers.textColour;
    fs.writeFile("./results/logo.svg", `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="300" height="200">
  ${newLogo}
  ${new Shape(shapeColour, text, textColour)}
  </svg>`, (e) => {
    e ? console.log(e) : console.log("Successfully created logo", "Generated logo.svg")
  });
}



//This function will innitialize the app
function init() {
    inquirer
    .prompt (questions)
    .then ((answers) => {
        if (answers.shape == "Triangle") {
            const newLogo = new Triangle(answers.shapeColour);
            generateLogo(answers, newLogo);
        }
        if (answers.shape == "Square") {
            const newLogo = new Square(answers.shapeColour);
            generateLogo(answers, newLogo);
        }
        if (answers.shape == "Circle") {
            const newLogo = new Circle(answers.shapeColour);
            generateLogo(answers, newLogo);
        }
    })
    .catch((err)=> console.log(err));
}

// Function call to initialize the app
init();
