const path = require('path');
const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.resolve('./db/contacts.json');

async function readContacts() { 
    try {
        const contacts = await fs.readFile(contactsPath, 'utf8');
        const parsedContacts = JSON.parse(contacts);
        return parsedContacts;
    } catch (error) {
        console.error(error)
    }
}

async function listContacts() {
    contactList = await readContacts();
    // console.table(contactList);
    return contactList;
}
// listContacts();

async function getContactById(contactId) {
    const contacts = await readContacts();
    // console.log(contacts);
    const foundContact = contacts.find(el => String(el.id) === String(contactId));
    // console.log(foundContact);
    return foundContact;
}
// getContactById(2);

async function removeContact(contactId) {
    const contacts = await readContacts();
    const deletedContact = contacts.find(el => String(el.id) === String(contactId));
    const newContacts = contacts.filter(el => String(el.id) !== String(contactId));
    await fs.writeFile(contactsPath, JSON.stringify(newContacts), 'utf8');
    // console.table(newContacts);
    console.log(deletedContact);
    return deletedContact;
}
// removeContact(1);

async function addContact(name, email, phone) {
    const contacts = await readContacts();
    const newContact = { id: uuidv4(), name, email, phone };
    // console.log(newContact);
    // console.log(contacts);
    // const newContacts = contacts.push(newContact);
    contacts.push(newContact);
    // console.table(newContacts);
    // await fs.appendFile( contactsPath, JSON.stringify(newContact) )
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    console.log(newContact);
}
// addContact('testname', 'testemail', 'testphone');

module.exports = {
    listContacts,
    getContactById

}