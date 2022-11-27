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
    return contactList;
}

async function getContactById(contactId) {
    const contacts = await readContacts();
    const foundContact = contacts.find(el => String(el.id) === String(contactId));
    return foundContact;
}

async function removeContact(contactId) {
    const contacts = await readContacts();
    const deletedContact = contacts.find(el => String(el.id) === String(contactId));
    const newContacts = contacts.filter(el => String(el.id) !== String(contactId));
    await fs.writeFile(contactsPath, JSON.stringify(newContacts), 'utf8');
    return deletedContact;
}

async function addContact(name, email, phone) {
    const contacts = await readContacts();
    const newContact = { id: uuidv4(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}