import React, { useRef } from 'react'
import { Container, Form, Button } from 'react-bootstrap';
import { v4 as uuidV4 } from 'uuid';

const Login = ({ onIdSubmit }) => {
    const idRef = useRef()

    const handleSubmit = (e) => {
        e.preventDefault()
        onIdSubmit(idRef.current.value)
    }

    const createNewId = () => {
        onIdSubmit(uuidV4())
    }

    return (
        <Container className="align-items-center d-flex" style={{ height: "100vh" }}>
            <Form onSubmit={handleSubmit} className="w-100">
                <Form.Group >
                    <h1>Messaging Application</h1>
                    <h4>Create A New ID, Share With your Friends And Chat Freely..!</h4>
                    <Form.Label>Enter Your Id:</Form.Label>
                    <Form.Control type="text" ref={idRef} required></Form.Control>
                </Form.Group>
                <Button type="submit">
                    Login
                </Button>
                <Button onClick={createNewId} variant="secondary" className="ml-2">Create a New Id</Button>

            </Form>
        </Container>
    )
}

export default Login
