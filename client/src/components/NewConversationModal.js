import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap';
import { useContacts } from '../components/context/ContactsProvider';
import { useConversation } from "../components/context/ConversationProvider"


function NewConversationModal({ closeModal }) {
    const [selectedContactIds, setselectedContactIds] = useState([]);
    const { contacts } = useContacts()
    const { createConversation } = useConversation();


    function handleSubmit(e) {
        e.preventDefault()
        createConversation(selectedContactIds)
        closeModal()
    }

    function handleCheckboxChange(contactId) {
        setselectedContactIds(prevSeletedContactId => {
            if (prevSeletedContactId.includes(contactId)) {
                return prevSeletedContactId.filter(prevId => {
                    return contactId !== prevId
                })
            } else {
                return [...prevSeletedContactId, contactId]
            }
        })
    }
    console.log(selectedContactIds);

    return (


        <>
            <Modal.Header closeButton>Create a Convesation</Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {contacts.map(contact => (
                        <Form.Group controlId={contact.id} key={contact.id}>
                            <Form.Check
                                type='checkbox'
                                value={selectedContactIds.includes(contact.id)}
                                label={contact.name}
                                onChange={() => handleCheckboxChange(contact.id)}
                            />

                        </Form.Group>
                    ))}


                    <Button type="submit">Create</Button>

                </Form>
            </Modal.Body>

        </>
    )
}

export default NewConversationModal;
