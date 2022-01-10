// TODO: Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');
const generateMarkdown = require("./utils/generateMarkdown");

// TODO: Create an array of questions for user input
const questions = [
    {
        type: "input",
        name: "title",
        message: "What is the project's title? (Required)",
        validate: titleInput => {
          if (titleInput) {
            return true;
          } else {
            console.log("Please enter your project title.");
            return false;
          }
        }
      },
      {
        type: "input",
        name: "projectDescription",
        message: "Please write a short description of your project (Required)",
        validate: description => {
          if (description) {
            return true;
          } else {
            console.log("Please write a short description.");
            return false;
          }
        }
      },
      {
        type: "input",
        name: "installInfo",
        message: "Provide any installation instructions:",
      },
      {
        type: 'checkbox',
        name: 'license',
        message: 'Select a license for this project:',
        choices: ['Apache', 'Mozilla', 'MIT', 'GNU', 'Boost', 'ISC'],
        validate: choicesLength => {
          if (choicesLength.length <= 1) {
            return true;
          } else {
            return "Please select one license!";
          }
        }
      },
      {
        type: "input",
        name: "usageInfo",
        message: "Describe the usage for this project:",
      },
      {
        type: "input",
        name: "contributionsInfo",
        message: "Provide any guidlines for contributing to this project:",
      },
      {
        type: "input",
        name: "testsInfo",
        message: "Detail any tests you'd like to include:",
      },
      {
        type: "input",
        name: "githubUsername",
        message: "What is your GitHub username?",
      },
      {
        type: "input",
        name: "emailInfo",
        message: "What is a good email someone can reach you?",
      }
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile("./dist/README.md", generateMarkdown(data), function(err) {
        if (err) {
          return console.log(err);
        }
        console.log('Success!');
      });
}

// TODO: Create a function to initialize app
function init() { 
    inquirer.prompt(questions)
    .then(function(answer) {
      const fileName =
        answer.title
          .split(' ')
          .join('') + '.md';
      
      writeToFile(fileName, answer);
    });
}

// Function call to initialize app
init();