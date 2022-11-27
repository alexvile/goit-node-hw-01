var colors = require('colors');
const { listContacts, getContactById, removeContact, addContact } = require('./contacts')

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
          listContacts().then(data => console.table(data)).catch(err => console.error(err));
      break;

    case "get":
      getContactById(id).then(data => {
        if (data) {
          console.log(colors.blue('Contact found!'));
          console.log(data)
        } else { 
          console.log(colors.red('Contact not found'));
        }
      })
        .catch(err => console.error(err))
      break;

    case "add":
      addContact(name, email, phone).then(data => {
        console.log(colors.blue('Contact added'));
        console.log(data)
      }).
        catch(err => console.error(err));
      break;

    case "remove":
      removeContact(id).then(data => {
        console.log(colors.blue('Contact deleted'));
        console.log(data)
      })
        .catch(err => console.error(err));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);











// const express = require('express');
// const app = express();
// const PORT = 8081

// app.use(express.json());
// app.use(express.urlencoded({extended: true}));
// app.use(express.static('public'))

// app.use((req, res, next) => { 
//     console.log(`${req.method}`);
//     next();
// })
// app.get('/home', (req, res) => { 
//     res.sendStatus(200);
// })
// app.use((req, res) => { 
//     res.send('global responsasdaess')
// })
// app.listen(PORT, (err) => { 
//      if (err) {
//          console.error(`Error at server launch : ${err}`);
//      }
//      console.log(`Server is working at: ${PORT}`)
//  })


// const fs = require('fs').promises;
// const path = require('path');
// const http = require('http');
// const PORT = 8081

// const requestHandler = (request, response) => { 
//     console.log(request);
//     response.writeHead(200, { 'Content-type': 'text/html' });
//     response.end('<h1>RESPONSE</h1>')

// }
// const server = http.createServer(requestHandler)
// server.listen(PORT, (err) => { 
//     if (err) {
//         console.error(`Error at server launch : ${err}`);
//     }
//     console.log(`Server is working at: ${PORT}`)
// });

// const { listContacts } = require('./contacts');

// listContacts();

// (async () => {
//     try {
//         const data = await fs.readFile(path.resolve('./data.txt'), 'utf8');
//         console.log(data);

//         // const newContent = `${data} new`;
//         // await fs.writeFile(path.resolve('./data.txt'), newContent, 'utf8');

//         // await fs.rename(path.resolve('./data.txt'), path.resolve('./data.txt'))
//     } catch (error) {
//         console.error(error);
        
//     }
 
// })();


// fs.readFile(path.resolve('./data.txt'), 'utf8')
//     .then(data => { 
//         console.log(data);
//     })
//     .catch(error => console.error(error))

// fs.readFile(path.resolve('./data.txt'), 'utf8', (err, data) => { 
//     if (err) {
//         console.error(err);
//     }
//     console.log(data)
// })

// fs.readFile('./data.txt', 'utf8', (err, data) => { 
//     if (err) {
//         console.error(err);
//     }
//     console.log(data)
// })
// console.log(path.resolve('contacts.js'));

// const { test } = require('./contacts');
// console.log(test());
// globalThis.testData = '123'
// console.log(global.testData);
// console.log(process.argv);