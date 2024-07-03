#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import { differenceInSeconds } from "date-fns";
console.log(chalk.bold.blueBright("\n \t Coding-with-Huma-Count-Down-Timer \n"));
console.log("=".repeat(60));
const response = await inquirer.prompt({
    name: "userInput",
    type: "number",
    message: "Please enter the amount of second",
    validate: (input) => {
        if (isNaN(input)) {
            return "Please enter valid number";
        }
        else if (input > 60) {
            return "seconds must be in 60";
        }
        else {
            return true;
        }
    }
});
let input = response.userInput;
// make function
function startTime(val) {
    const intialTime = new Date().setSeconds(new Date().getSeconds() + val);
    const intervalTime = new Date(intialTime);
    setInterval((() => {
        const currentTime = new Date();
        const timeDiff = differenceInSeconds(intervalTime, currentTime);
        if (timeDiff <= 0) {
            console.log(chalk.bold.red("\n \t Timer has Expired"));
            process.exit();
        }
        const min = Math.floor((timeDiff % (3600 * 24)) / 3600);
        const sec = Math.floor(timeDiff % 60);
        console.log(`${min.toString().padStart(2, "0")} :${sec.toString().padStart(2, "0")}`);
    }), 1000);
}
startTime(input);
