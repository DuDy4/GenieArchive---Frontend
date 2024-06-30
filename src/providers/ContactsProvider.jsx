import React, { useState, useEffect, createContext, useContext } from 'react';
import { TenantContext } from './TenantProvider';
import axios from 'axios';

export const ContactsContext = createContext();

export const ContactsProvider = ({ user, children }) => {
    const { tenantId } = useContext(TenantContext);
    const apiUrl = process.env.REACT_APP_API_URL;
    const [render, setRender] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [selectedContacts, setSelectedContacts] = useState([]);

    const fetchContacts = async () => {
        axios.get(`${apiUrl}/v1/salesforce/contacts/${tenantId}`, { withCredentials: true })
            .then(response => {
                console.log('Contacts:', response.data);

                // Create a new window
                const newWindow = window.open('', 'Contacts', 'width=600,height=400');

                // Check if the window was created successfully
                if (newWindow) {
                    // Create a simple HTML structure for displaying the contacts
                    newWindow.document.write(`
                        <html>
                        <head>
                            <title>Contacts</title>
                            <style>
                                table { width: 100%; border-collapse: collapse; }
                                th, td { border: 1px solid black; padding: 8px; text-align: left; }
                                th { background-color: #f2f2f2; }
                            </style>
                        </head>
                        <body>
                            <h1>Contact List</h1>
                            <h2>Select contacts to fetch</h2>
                            <table id="contact-table">
                                <thead>
                                    <tr>
                                        <th>Select</th>
                                        <th>Name</th>
                                        <th>Company</th>
                                        <th>Email</th>
                                        <th>LinkedIn</th>
                                    </tr>
                                </thead>
                                <tbody id="contact-list"></tbody>
                            </table>
                            <br />
                            <button id="gather-checked">Gather Checked Contacts</button>
                            <button id="close-window">Close Window</button>
                            <div id="result"></div>
                        </body>
                        </html>
                    `);

                    // Get the contact list element
                    const contactList = newWindow.document.getElementById('contact-list');

                    // Populate the contact list with the data
                    response.data.forEach(contact => {
                        const row = newWindow.document.createElement('tr');
                        row.innerHTML = `
                            <td><input type="checkbox" value="${contact.Id}" /></td>
                            <td>${contact.FirstName} ${contact.LastName}</td>
                            <td>${contact.Account.Name}</td>
                            <td>${contact.Email}</td>
                            <td>${contact.LinkedInUrl__c}</td>
                        `;
                        contactList.appendChild(row);
                        setContacts([...contacts, contact])
                    });

                    // Add event listener to the button
                    newWindow.document.getElementById('gather-checked').addEventListener('click', () => {
                        const checkedContactIds = [];
                        const checkedContacts = [];
                        const checkboxes = newWindow.document.querySelectorAll('#contact-list input[type="checkbox"]:checked');
                        checkboxes.forEach(checkbox => {
                            checkedContactIds.push(checkbox.value);
                            let row = checkbox.parentElement.parentElement;
                            checkedContacts.push( {
                                id: row.children[0].children[0].value,
                                name: row.children[1].textContent.trim(),
                                email: row.children[2].textContent.trim()
                            })
                        });
                        setSelectedContacts(checkedContactIds);
                        // Display the result
                        const resultDiv = newWindow.document.getElementById('result');
                        resultDiv.innerHTML = '<h2>Checked Contacts</h2><ul>' + checkedContacts.map(contact => `<li>${contact.name} (${contact.email})</li>`).join('') + '</ul>';
                    });

                    // Add event listener to the button
                    newWindow.document.getElementById('close-window').addEventListener('click', () => {
                        newWindow.close();
                    });

                    // Close the document to apply changes
                    newWindow.document.close();
                    console.log('Selected contacts:', selectedContacts);
                } else {
                    console.error('Failed to open new window.');
                }
            })
            .catch(error => {
                console.error('Error fetching contacts:', error);
            });
    };

    const handleSelectedContacts = (contacts) => {
        axios.post(`${apiUrl}/v1/salesforce/build-profiles/${tenantId}`, contacts, { withCredentials: true })
            .then(response => {
                console.log('Contacts saved:', response.data);
            })
            .catch(error => {
                console.error('Error saving contacts:', error);
            });
        }


    useEffect(() => {
        if (selectedContacts.length > 0) {
            handleSelectedContacts(selectedContacts);
            console.log('Selected contacts updated:', selectedContacts); // This will log the updated state in the main window console
            setRender(!render);
        }
    }, [selectedContacts]);

    const value = { fetchContacts };

    return (
        <ContactsContext.Provider value={value}>
            {children}
        </ContactsContext.Provider>
    );
};
