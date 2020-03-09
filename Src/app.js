const inquirer = require('inquirer');
const chalk = require('chalk')
let passGen = require('./pwd-gen');


class App {
  constructor() {
    this.len = 0;
  }

  getUserInput() {
    let stdin = process.stdin, stdout = process.stdout;
    const question = "Please input the length of passwaord required. Please make sure to input length between 8 and 128!!!: ";
    
    stdin.resume();
    console.log(chalk.green.bold.underline(question));
  
    return new Promise(res => {
      stdin.once('data', data => {
        res(parseInt(data.toString().trim()));
      });
    });
  }

  async getLength() {
    let answer;
    const success_msg = `Perfect! Your password will have ${answer} symbols! Now, please, select following options and click Ready to generate!`
    const err_msg = "Be careful! Enter a number from 8-128!"

    do {
      answer = await this.getUserInput();
      if(answer < 8 || answer > 128) console.log(chalk.redBright.bold(err_msg))
    } while(answer < 8 || answer > 128);
  
    console.log(chalk.blue.bold(success_msg))
    this.len = answer;
  }

  async getPassword() {
    await this.getLength();
    inquirer.prompt([
      { 
        type: "checkbox", 
        prompt: "Select following options for password generation", 
        name: "password",
        choices: [
            "Lower Case",
            "Upper Case",
            "Special Character",
            "Number"
        ]
      }
    ])
    .then(answers => {
      let pwrd = new passGen(this.len).generate(answers.password);
      if(pwrd != null) {
        process.stdout.write(chalk.magenta.underline("Your password is: "));
        process.stdout.write(chalk.white.bgGreen.bold(pwrd))
      }
    })
    .catch(error => {
      if(error.isTtyError) {
      } else {
      }
    });
  }
}

new App().getPassword();
