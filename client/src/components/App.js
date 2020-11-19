import React from 'react';
import '../App.css';
import Dashboard from './Dashboard';
import useLocalStorage from './hooks/useLocalStorage';
import Login from './Login';
import { ContactsProvider } from "../components/context/ContactsProvider";
import { ConversationProvider } from "../components/context/ConversationProvider";


function App() {
  const [id, setId] = useLocalStorage('id');

  const dashboard = (

    <ContactsProvider>
      <ConversationProvider id={id}>
        <Dashboard id={id} />
      </ConversationProvider>

    </ContactsProvider>
  )

  return (
    <div>
      {id ? dashboard : <Login onIdSubmit={setId} />}
    </div>
  );
}

export default App;
