class passwordGenerator {
    constructor(passLen) {
        this.lowercase = "abcdefghijklmnopqrstuvwxyz";
        this.uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        this.numbers = "0123456789";
        this.spcharacters = "`~!@#$%^&*()_+-={}|[]";
        this.passwordlength = passLen;
        this.finalPassword = "";
        this.passwordSet = "";
    }

    validatePassword () {
        if (8 > this.passwordlength) {
            console.log("Password is too short :( ");
            return null;
        } else if (this.passwordlength > 128) {
            console.log("Password length too large");
            return null;
        }
    }

    generate (options) {
        this.validatePassword();
    
        if (options.includes("Lower Case")) {
          this.passwordSet = this.passwordSet + this.lowercase;
        }
        if (options.includes("Upper Case")) {
            this.passwordSet = this.passwordSet + this.uppercase;
        }
        if (options.includes("Special Character")) {
            this.passwordSet = this.passwordSet + this.spcharacters;
        }
        if (options.includes("Number")) {
            this.passwordSet = this.passwordSet + this.numbers;
        }
    
        for (let i = 0; i < this.passwordlength; i++) {
            this.finalPassword = this.finalPassword + 
            this.passwordSet.charAt(Math.floor(Math.random() * this.passwordSet.length));
        }
        
        if (this.finalPassword == "") {
            console.log("Please select an option before generating!");
            return null;
        } else {
            return (this.finalPassword);
        }
        // copyButton.setAttribute("data-clipboard-text", finalPassword)
      }
}

module.exports = passwordGenerator;