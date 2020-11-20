import React, { useState } from 'react'
import { Tab, Nav, Button, Modal } from 'react-bootstrap'
import Contact from './Contact';
import Setting from "./Setting";
import Conversation from './Conversation';
import NewContactModal from './NewContactModal';
import NewConversationModal from './NewConversationModal';
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const CONSERVATIONS_KEY = "conservations"
const CONTACT_KEY = "contacts"
const SETTINGS_KEY = "settings"

const Sidebar = ({ id }) => {


    const [activeKey, setActiveKey] = useState();
    const [modalOpen, setModalOpen] = useState(false);

    const conversationOpen = activeKey === CONSERVATIONS_KEY;
    //    console.log(conversationOpen);

    function closeModal() {
        setModalOpen(false)
    }

    const copyText = () =>

        toast.info(
            "Your Id is copied to Clipboard."
        );


    return (
        <div style={{ width: "330px" }} className="d-flex flex-column">
            <ToastContainer />

            <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
                <Nav variant="tabs" className="justify-content-center">
                    <Nav.Item>
                        <Nav.Link eventKey={CONSERVATIONS_KEY}>Conservations</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey={CONTACT_KEY}>Contacts</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey={SETTINGS_KEY}>Settings</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content className="border-right overflow-auto flex-grow-1">
                    <Tab.Pane eventKey={CONSERVATIONS_KEY}>
                        <Conversation />
                    </Tab.Pane>
                    <Tab.Pane eventKey={CONTACT_KEY}>
                        <Contact />
                    </Tab.Pane>
                    <Tab.Pane eventKey={SETTINGS_KEY}>
                        <Setting />
                    </Tab.Pane>
                </Tab.Content>
                <div className="bottom">
                    Your Id:{" "}
                    <span className="text-muted" value={id}>
                        {id}
                        <CopyToClipboard text={id}>
                            <i
                                className="material-icons p-2 "

                                style={{ fontSize: "15px", cursor: "pointer", color: "black" }}
                                onClick={() => copyText()}
                            >
                                &#x270e;
              </i>
                        </CopyToClipboard>
                    </span>
                    <Button onClick={() => setModalOpen(true)} className="rounded-0 button w-100">
                        New {conversationOpen ? "Conversation" : "Contact"}
                    </Button>
                </div>

            </Tab.Container>
            <Modal show={modalOpen} onHide={closeModal} >
                {conversationOpen ?
                    <NewConversationModal closeModal={closeModal} /> :
                    <NewContactModal closeModal={closeModal} />
                }
            </Modal>

        </div>
    )
}

export default Sidebar
