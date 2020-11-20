import React, { useRef } from 'react'
import { Modal, Form, Button } from 'react-bootstrap';
import { useContacts } from '../contexts/ContactsProvider';


function NewContactModal({ closeModal }) {

    const idRef = useRef();
    const nameRef = useRef();
    const { createContact } = useContacts();

    function handleSubmit(e) {
        e.preventDefault();
        createContact(idRef.current.value, nameRef.current.value);
        closeModal()
    }

    return (

        <>
            <Modal.Header closeButton>Create a Contact</Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Enter Id:</Form.Label>
                        <Form.Control type="text" ref={idRef} required placeholder="Enter Here" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Enter Name:</Form.Label>
                        <Form.Control type="text" ref={nameRef} required placeholder="Enter Here" />
                    </Form.Group>

                    <Button type="submit">Create</Button>

                </Form>
            </Modal.Body>

        </>
    )
}

export default NewContactModal
