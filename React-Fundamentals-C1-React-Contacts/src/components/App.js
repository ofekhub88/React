import { useState,useEffect } from "react";
import "../css/App.css";
import ListContacts from "./ListContacts";
import * as ContactsAPI from "../utils/ContactsAPI";
import CreateContact from "./CreateContact.js";
import { Route, Routes,useNavigate } from "react-router-dom";

const App = () => {
  let navigate = useNavigate();

  const [contacts, setContacts] = useState([]);
  
  useEffect(() => {
    const getContacts = async () => {
      const res = await ContactsAPI.getAll();
      setContacts(res);
    };

    getContacts();
  }, []);
  
  const createContact = (contact) => {
    const create = async () => {
      const res = await ContactsAPI.create(contact);
      setContacts(contacts.concat(res));
    };

    create();
    navigate("/");
  };

  const removeContact = (contact) => {
    ContactsAPI.remove(contact);

    setContacts(contacts.filter((c) => c.id !== contact.id));
  };

  return (
    <div>
       <Routes>
        <Route exact path="/" element={
              <ListContacts
              contacts={contacts}
              onDeleteContact={removeContact}/>}
        />
        <Route path="/create"
               element={
                <CreateContact
                  onCreateContact={(contact) => {
                    createContact(contact);
                  }}
                />
              }
            />
       </Routes>
    </div>
  );
};

export default App;