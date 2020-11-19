import React, { useState } from 'react'
import { Tab, Nav, Button, Modal } from 'react-bootstrap'
import Contact from './Contact';
import Conversation from './Conversation';
import NewContactModal from './NewContactModal';
import NewConversationModal from './NewConversationModal';


const CONSERVATIONS_KEY = "conservations"
const CONTACT_KEY = "contacts"

const Sidebar = ({ id }) => {


    const [activeKey, setActiveKey] = useState();
    const [modalOpen, setModalOpen] = useState(false);

    const conversationOpen = activeKey === CONSERVATIONS_KEY;
    //    console.log(conversationOpen);

    function closeModal() {
        setModalOpen(false)
    }

    return (
        <div style={{ width: "250px" }} className="d-flex flex-column">
            <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
                <Nav variant="tabs" className="justify-content-center">
                    <Nav.Item>
                        <Nav.Link eventKey={CONSERVATIONS_KEY}>Conservations</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey={CONTACT_KEY}>Contacts</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content className="border-right overflow-auto flex-grow-1">
                    <Tab.Pane eventKey={CONSERVATIONS_KEY}>
                        <Conversation />
                    </Tab.Pane>
                    <Tab.Pane eventKey={CONTACT_KEY}>
                        <Contact />
                    </Tab.Pane>
                </Tab.Content>
                <div className="p-2 border-top border-right small">
                    You ID <span className=
                        "text-muted">{id}</span>
                </div>
                <Button onClick={() => setModalOpen(true)} className="rounded-0">
                    New {conversationOpen ? "Conversation" : "Contact"}
                </Button>

            </Tab.Container>
            <Modal show={modalOpen} onHide={closeModal} >
                {conversationOpen ? <NewConversationModal closeModal={closeModal} /> : <NewContactModal loseModal={closeModal} />}
            </Modal>

        </div>
    )
}

export default Sidebar
