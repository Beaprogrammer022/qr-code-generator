import inquirer from 'inquirer';
//var qr = require('qr-image');
import qr from 'qr-image';
import fs from "fs";

inquirer
    .prompt([
        {
            //type: "password",
            message: "enter your URL",
            name: "URL",
        },
        /* Pass your questions in here */
    ])
    .then((answers) => {
        // Use user feedback for... whatever!!
        console.log(answers);
        const url = answers.URL;
        var qr_svg = qr.image('url', { type: 'png' });
        // here in line 15 qr is an object 
        //image is a method
       // .pipe(: This is a method in Node.js streams.It allows you to connect the output of one stream to the input of another stream.

           // fs.createWriteStream('qr_img.png'): This is creating a writable stream to a file named 'qr_img.png'.fs is the file system module in Node.js, and createWriteStream() is a method provided by this module.It creates a writable stream that writes data to a file.In this case, the file being created or overwritten is 'qr_img.png', which is the destination file for the QR code image.
                qr_svg.pipe(fs.createWriteStream('qr_img.png'));

        fs.writeFile('URL.txt', url, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    })

    .catch((error) => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
        } else {
            // Something else went wrong
        }
    });