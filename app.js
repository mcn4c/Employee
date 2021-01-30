const Engineer = require("./Develop/lib/Engineer");
const Intern = require("./Develop/lib/Intern");
const Manager = require("./Develop/lib/Manager")
const render = require("./Develop/lib/htmlRenderer");
const path = require("path");
const inquirer = require("inquirer");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const teamMembers = [];
const idArray = [];


// createTeam function will call at the end
function createTeam() {

    // begin with manager prompts
    function createManager() {

        console.log("Begin making your employee database")


        // questions related to manager employee
        inquirer.prompt([{
                    type: 'input',
                    name: "managerName",
                    message: "What is the team manager's name?",
                },

                {
                    type: 'input',
                    name: "managerId",
                    message: "Manager's employee ID:",
                },

                {
                    type: 'input',
                    name: 'managerEmail',
                    message: "Manager's email:",
                },

                {
                    type: "input",
                    name: "officeNumber",
                    message: "Manager's office number:"
                }

            ])
            // push responses to teamMembers array
            .then(data => {

                const managerNameUpper = data.managerName.substring(0, 1).toUpperCase() + data.managerName.substring(1);

                const manager = new Manager(managerNameUpper, data.managerId, data.managerEmail, data.officeNumber);

                teamMembers.push(manager);
                idArray.push(data.managerId);

                
                // call function createTeamMember to input other employees(not managers)
                createTeamMember();

            });


    }

    createManager();

    function createTeamMember() {
        // choose wich type of team member to add unless no more employees to be added
        inquirer.prompt({
                    type: "list",
                    name: "employeeRole",
                    message: "Which is the employee's job description?",
                    choices: ["Engineer", "Intern", "No employees to add at this time"]
                }

            )
            // switch statements to determine which function will be called for diff types of employees
            .then(choice => {
                switch (choice.employeeRole) {
                    // if employee is engineer addEngineer function
                    case "Engineer":
                        addEngineer();
                        break;
                        // if employee is intern, addIntern function
                    case "Intern":
                        addIntern();
                        break;
                        //if no employees to add, fun buildTeam function
                    default:
                        buildTeam();

                }

            })

        //inside createTeamMember after 
        function addEngineer() {

            inquirer.prompt([{
                        type: "input",
                        name: "engineerName",
                        message: "What is the engineer's name?"
                    },

                    {
                        type: "input",
                        name: "engineerId",
                        message: "Engineer ID: "
                    },

                    {
                        type: "input",
                        name: "engineerEmail",
                        message: "Engineer's email: ",
                    },

                    {
                        type: "input",
                        name: "engineerGithub",
                        message: "Engineer's GitHub username: "
                    },

                ])

                .then(answers => {

                    const engineerNameUpper = answers.engineerName.substring(0, 1).toUpperCase() + answers.engineerName.substring(1);
                    const engineerGithubLink = `github.com/${answers.engineerGithub}`;

                    

                     const engineer = new Engineer(
                        engineerNameUpper, answers.engineerId, answers.engineerEmail, engineerGithubLink);

                    teamMembers.push(engineer);
                    idArray.push(answers.engineerId);

                    createTeamMember();
                })
        }

        function addIntern() {

            inquirer.prompt([{
                        type: "input",
                        name: "internName",
                        message: "What is the intern's name?",
                    },
                    {
                        type: "input",
                        name: "internId",
                        message: "Intern's ID",

                    },
                    {
                        type: "input",
                        name: "internEmail",
                        message: "Intern's email: ",
                    },
                    {
                        type: "input",
                        name: "internSchool",
                        message: "Intern's school: ",

                    }


                ])
                .then(answers => {

                    const internNameUpper = answers.internName.substring(0, 1).toUpperCase() + answers.internName.substring(1);

                    

                    const intern = new Intern(internNameUpper, answers.internId, answers.internEmail, answers.internSchool);

                    teamMembers.push(intern);
                    idArray.push(answers.internId);

                    createTeamMember();


                })
        }

        function buildTeam() {

            fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
            createManager();
        }


    }
};
// createManager();





createTeam();

