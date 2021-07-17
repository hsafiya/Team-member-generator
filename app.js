const {writeFile,copyFile} = require ("./utils/generate-site");
const inquirer = require ("inquirer");
const Engineer = require ("./lib/Engineer");
const Intern = require ("./lib/Intern");
const Manager = require ("./lib/Manager");
const html = require ("./src/html")