const inquirer = require('inquirer');
let passGen = require('./pwd-gen');


class App {
  constructor() {
    this.len = 0;
  }

  getUserInput() {
    let stdin = process.stdin, stdout = process.stdout;
    
    stdin.resume();
    stdout.write("Please input the length of password required. Please make sure to input length between 8 and 128!!!: ");
  
    return new Promise(res => {
      stdin.once('data', data => {
        res(parseInt(data.toString().trim()));
      });
    });
  }

  async getLength() {
    let answer;

    do {
      answer = await this.getUserInput();
      if(answer < 8 || answer > 128) console.log("Be careful! Enter a number from 8-128!")
    } while(answer < 8 || answer > 128);
  
    console.log(`Perfect! Your password will have ${answer} symbols! Now, please, select following options and click Ready to generate!`)
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
      if(pwrd != null) console.log(`Your password is: ${pwrd}`);
    })
    .catch(error => {
      if(error.isTtyError) {
      } else {
      }
    });
  }
}

new App().getPassword();