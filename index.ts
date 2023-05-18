import inquirer from "inquirer";
import chalk from "chalk";
import { rainbow } from "chalk-animation";

function startTimer() {
  console.clear();
  console.log(chalk.green("CLI Countdown Timer"));
  console.log(chalk.gray("Enter a duration in seconds."));

  inquirer
    .prompt([
      {
        type: "input",
        name: "duration",
        message: "Enter the duration in seconds:",
        validate: (value) => {
          const parsedValue = parseInt(value, 10);
          if (Number.isNaN(parsedValue) || parsedValue <= 0) {
            return "Please enter a valid positive number.";
          }
          return true;
        },
      },
    ])
    .then((answers) => {
      const duration = parseInt(answers.duration, 10);

      let secondsLeft = duration;
      const countdown = setInterval(() => {
        console.clear();
        console.log(chalk.yellow(`Time remaining: ${secondsLeft}s`));
        secondsLeft--;

        if (secondsLeft < 0) {
          clearInterval(countdown);
          console.log(chalk.green("Countdown completed!"));
          repeatGame();
        }
      }, 1000);
    })
    .catch((error) => {
      console.error(chalk.red("An error occurred:", error));
      repeatGame();
    });
}

function repeatGame() {
  inquirer
    .prompt([
      {
        type: "confirm",
        name: "repeat",
        message: "Do you want to repeat the countdown?",
        default: false,
      },
    ])
    .then((answers) => {
      if (answers.repeat) {
        startTimer();
      } else {
        console.log(chalk.green("Goodbye!"));
        process.exit(0);
      }
    })
    .catch((error) => {
      console.error(chalk.red("An error occurred:", error));
      process.exit(1);
    });
}

startTimer();
