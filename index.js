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