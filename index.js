import inquirer from "inquirer";
import chalk from "chalk";
let myBalance = 50000; // User Balance amount in USD
let myPin = 1234; // Declared a Pswd
let myName = "Habib"; // Declared Account Holder Name
let pinCode = await inquirer.prompt([
    {
        message: "Welcome to ATM App. Please Enter your PIN",
        type: "number",
        name: "pin",
    },
]);
// Conditional Statement
if (pinCode.pin === myPin) {
    let opt = await inquirer.prompt([
        {
            name: "option",
            type: "list",
            message: "You have logged in sucessfully. Please select the option",
            choices: ["Cash Withdraw", "Balance Inquiry"],
        },
    ]);
    if (opt.option === "Balance Inquiry") {
        console.log(chalk.green(`Your current balance is $${myBalance}`));
    }
    if (opt.option === "Cash Withdraw") {
        let famnt = await inquirer.prompt([
            {
                name: "amount",
                message: "Please Select the Fast Cash or Select Other Amount",
                type: "list",
                choices: ["Fast Cash", "Other Amount"],
            },
        ]);
        if (famnt.amount === "Fast Cash") {
            let fastCash = await inquirer.prompt([
                {
                    name: "sFcash",
                    type: "list",
                    message: "Please Select amount as mentioned below",
                    choices: ["1000", "2000", "3000", "5000"],
                },
            ]);
            myBalance -= fastCash.sFcash;
            {
                console.log(chalk.green("You have sucessfully performed your transaction. Thank you!"));
            }
            let receiptFC = await inquirer.prompt([
                {
                    message: "Do you want to print the transaction receipt?",
                    name: "rcpt",
                    type: "list",
                    choices: ["Yes", "No"],
                },
            ]);
            if (receiptFC.rcpt === "Yes") {
                console.log(chalk.green(`\n================================================\nAccount Holder:\t\t\t${myName}\nAcct. Number:\t\t\t${"123*****654"}\nTransaction Type:\t\t${opt.option}\nTransaction Amount: \t\t${fastCash.sFcash}\nYour Remaing Balance:\t\t${myBalance}\t\n================================================\n\t\n\tThanks for using ATM Service\t\t\n\n================================================\n`));
            }
            else if (receiptFC.rcpt === "No") {
                console.log(chalk.yellow("Thanks for using ATM Service"));
            }
        }
        else if (famnt.amount === "Other Amount") {
            let otherAmount = await inquirer.prompt([
                {
                    message: "Please Enter the Amount",
                    type: "number",
                    name: "otherAmnt",
                },
            ]);
            if (otherAmount.otherAmnt > myBalance) {
                console.log(chalk.red("You have insufficient Balance"));
            }
            else if ((myBalance -= otherAmount.otherAmnt)) {
                console.log(chalk.green("You have sucessfully performed your transaction. Thank you!"));
                let receiptFC = await inquirer.prompt([
                    {
                        message: "Do you want to print the transaction receipt?",
                        name: "rcpt",
                        type: "list",
                        choices: ["Yes", "No"],
                    },
                ]);
                if (receiptFC.rcpt === "Yes") {
                    console.log(chalk.green(`\n================================================\nAccount Holder:\t\t\t${myName}\nAcct. Number:\t\t\t${"123*****654"}\nTransaction Type:\t\t${opt.option}\nTransaction Amount: \t\t${otherAmount.otherAmnt}\nYour Remaing Balance:\t\t${myBalance}\t\t\n================================================\n\t\n\tThanks for using ATM Service\t\t\n\n================================================\n`));
                }
                else if (receiptFC.rcpt === "No") {
                    console.log(chalk.yellow("Thanks for using ATM Service"));
                }
            }
        }
    }
}
else if (pinCode.pin !== myPin) {
    console.log(chalk.red("You have entered the wrong PIN. Please run the command again (npx h-cli-atm-mar28) and Enter the correct PIN. Thank you!"));
}
