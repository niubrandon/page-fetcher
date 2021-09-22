const fs = require('fs');
const request = require('request');
const readline = require("readline");

const arg = process.argv.slice(2,4);
//console.log(arg);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


request(arg[0], (error, response, body) => {
  // console.log('error:', error); // Print the error if one occurred
  /*  if (error.code === "ENOTFOUND") {
      console.log(`URL is Invalid: ${arg[0]}`);
      process.exit();
    } */
  // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  // console.log('body:', body); // Print the HTML for the Google homepage.
  // console.log(response);

  const content = body;
  //converti to byte
  const fileSize = Math.floor(content.length / 8);

//check if file in exists, prompt whether you want to over-write
  if (fs.existsSync(arg[1])) {
    rl.question("Do you want to over-write the file? (Y/N)", (answer) => {
      if (answer === "Y") {
        fs.writeFile(arg[1], content, err => {
          process.exit();
        })
      } else {
        process.exit();
      }
    });
    //not in exists, create a new one but check if there is error
  } else {
 
    fs.writeFile(arg[1], content, err => {
      if (err) {
        //console.log(err);
        if (err.code === "ENOENT") {
          console.log("File Path is Invalid", arg[1]);
          process.exit();
        }
       
      }
//if no error code
      console.log(`Dowloaded and saved ${fileSize} bytes to ${arg[1]}`);
      process.exit();
      
    });
  
  }
 
});

/*   fs.writeFile(arg[1], content, err => {
    if (err) {
      //console.log(err);
      if (err.code === "ENOENT") {
        console.log("File Path is Invalid", arg[1]);
        process.exit();
      }
    } else {
      if (fs.existsSync(arg[1])) {
        rl.question("Do you want to over-write the file? (Y/N)", (answer) => {
          if (answer === "Y") {
            fs.writeFile(arg[1], content, err => {
              process.exit();
            });
          } else {
            process.exit();
          }
        });
        //ask if user want to over-write it or not
} else {
        console.log(`Dowloaded and saved ${fileSize} bytes to ${arg[1]}`);
        
      }
    }
  }); */
//});

//if file already exists, it will be over-write again. add a prompt if the user
//If the file path already exists, right now your app will overwrite it! If you want to change this, let the user know and prompt them to type in Y(followed by the enter key) to overwrite the file, otherwise skip and exit the app. We suggest using the readline module, which we've previously used.

