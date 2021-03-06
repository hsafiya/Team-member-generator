const {writeFile,copyFile} = require ("./utils/generate-site");
const inquirer = require ("inquirer");
const Engineer = require ("./lib/Engineer");
const Intern = require ("./lib/Intern");
const Manager = require ("./lib/Manager");
const html = require ("./src/html")
// initialize the prompts answers array
const templateArray = [];

// start with the prompts for manager
const startApp = () => {
    return inquirer
        .prompt([
            {
                type: 'input',
                message: 'Please enter Manager Name.(Required)',
                name: 'name',
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } else {
                        console.log('')
                    }
                }
            },
            {
                type: 'input',
                message: "Please enter Manager ID number.(Required)",
                name: 'id',
                validate: idInput => {
                    const pass = idInput.match(
                        /^[1-9]\d*$/
                    );
                    if (pass) {
                        return true;
                    }
                    return "Please enter a positive number greater than zero.";

                }
            },
            {
                type: 'input',
                message: "Please enter Manager Email.(Required)",
                name: 'email',
                validate: emailInput => {
                    const pass = emailInput.match(
                        /\S+@\S+\.\S+/
                    );
                    if (pass) {
                        return true;
                    }
                    return "Please enter a valid email address.";

                }
            },
            {
                type: 'input',
                message: 'Please enter the Managers office number.(Required)',
                name: 'officeNumber',
                validate: numberInput => {
                    if (numberInput) {
                        return true;
                    } else {
                        console.log('Manager office number is required!')
                    }
                }
            },
            {
                type: 'list',
                message: 'What would you like to do next?',
                name: 'action',
                choices: ['Add Employee', 'Exit']
            }
        ])
        // based on the action chosen callback the function
        .then(data => {
            //construct a Manager class from the answers provided 
            const manager = new Manager(data.name, data.id, data.email, 'Manager', data.officeNumber);
            // add it to the employees array
            templateArray.push(manager)
            if (data.action === 'Add Employee') {
                addEmployee();
            } else {
                confirmDone();
            }
        })
};
// add employee
const addEmployee = () => {
    return inquirer
        .prompt([
            {
                type: 'input',
                message: 'Please enter Employee Name.(Required)',
                name: 'name',
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } else {
                        console.log('')
                    }
                }
            },
            {
                type: 'input',
                message: "Please enter Employee ID number.(Required)",
                name: 'id',
                validate: idInput => {
                    const pass = idInput.match(
                        /^[1-9]\d*$/
                    );
                    if (pass) {
                        return true;
                    }
                    return "Please enter a positive number greater than zero.";

                }
            },
            {
                type: 'input',
                message: "Please enter Employee Email.(Required)",
                name: 'email',
                validate: emailInput => {
                    const pass = emailInput.match(
                        /\S+@\S+\.\S+/
                    );
                    if (pass) {
                        return true;
                    }
                    return "Please enter a valid email address.";

                }
            },
            {
                type: 'list',
                message: 'What is the Role of the Employee?',
                name: 'role',
                choices: ['Engineer', 'Intern']
            }
        ])
        // based on the role chosen callback the function
        .then(data => {
            if (data.role === 'Intern') {
                internPrompt(data)
            } else {
                engineerPrompt(data)
            }
        })
}


// callback for intern
const internPrompt = (answers) => {
    return inquirer
        .prompt([
            {
                type: 'input',
                message: 'What school does the intern attend?(Required)',
                name: 'school',
                validate: internInput => {
                    if (internInput) {
                        return true;
                    } else {
                        console.log('You must enter the school the intern attends!')
                    }
                },

            }
        ])
        //construct an Intern class from the answers provided 
        .then(data => {
            const intern = new Intern(answers.name, answers.id, answers.email, answers.role, data.school);
            // add it to the employees array
            templateArray.push(intern);
            // check if done adding emloyees
            confirmDone();
        });
};

// callback for engineer
const engineerPrompt = (answers) => {
    return inquirer
        .prompt([
            {
                type: 'input',
                message: 'Please provide the Engineer Github username?(Required)',
                name: 'github',
                validate: Github => {
                    if (Github) {
                        return true;
                    } else {
                        console.log('Engineer Github username is required!')
                    }
                }
            }
        ])
        //construct an Emgineer class from the answers provided 
        .then(data => {
            const engineer = new Engineer(answers.name, answers.id, answers.email, answers.role, data.github);
            // add it to the employees array
            templateArray.push(engineer);
            // check if done adding emloyees
            confirmDone();
        });
};

//  prompt to create the file when the user is done entering data
const confirmDone = () => {
    return inquirer
        .prompt([
            {
                type: 'confirm',
                message: 'Would you like to add another employee?',
                name: 'done',
                default: false
            }
        ])
        .then(data => {
            if (data.done === true) {
                addEmployee();
            } else {
                createSite(templateArray);
            }
        });
};

// handler to generate html, write it to an html file and copy the style sheet
const createSite = templateArray => {
    const file = html(templateArray);
    console.log('Team Profile has been Created!');
    writeFile(file)
    .then(() =>copyFile())
    .catch(err => {
        console.log(err);
    })   
}

startApp();
