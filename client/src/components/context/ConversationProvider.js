import React, { useContext, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage'
import { useContacts } from './ContactsProvider';

const ConversationContext = React.createContext();

export function useConversation() {
    return useContext(ConversationContext)
}

export function ConversationProvider({ id, children }) {
    const [conversations, setConversation] = useLocalStorage('conversations', []);
    const { contacts } = useContacts();
    const [selectedConversationIndex, setSelectedConversationIndex] = useState(0)

    function createConversation(recipients) {
        setConversation(prevConversatons => {
            return [...prevConversatons, { recipients, message: [] }]
        })
    }

    function addMessageToConversation({ recipients, text, sender }) {
        setConversation(prevConversations => {
            let madeChange = false
            const newMessage = { sender, text }
            const newConversation = prevConversations.map(
                conversation => {
                    if (arrayEquality(conversation.recipients, recipients)) {
                        madeChange = true
                        return {
                            ...conversation,
                            message: [...conversation.message, newMessage]
                        }
                    }
                    return conversation;
                })



            if (madeChange) {
                console.log(newConversation);
                return newConversation;
            }
            else {
                console.log(prevConversations);
                return [...prevConversations, { recipients, message: [newMessage] }
                ]
            }

        })

    }

    function sendMessage(recipients, text) {
        addMessageToConversation({ recipients, text, sender: id })
    }



    const formattedConversations = conversations.map((conversation, index) => {
        const recipients = conversation.recipients.map(recipient => {
            const contact = contacts.find(contact => {
                return contact.id === recipient

            })

            const name = (contact && contact.name) || recipient
            return { id: recipient, name }
        })

        const messages = conversation.message.map(message => {
            const contact = contacts.find(contact => {

                return contact.id === message.semder

            })
            const name = (contact && contact.name) || message.sender;
            const fromMe = id === message.sender
            return { ...message, senderName: name, fromMe }

        })


        const select = index === selectedConversationIndex;
        return { ...conversation, messages, recipients, select }

    })


    const value = {
        conversations: formattedConversations,
        createConversation,
        sendMessage,
        selectedConversationIndex: setSelectedConversationIndex,
        selectedConversation: formattedConversations[selectedConversationIndex],
    }

    return (
        <ConversationContext.Provider value={value}>
            {children}
        </ConversationContext.Provider>
    )
}


function arrayEquality(a, b) {
    if (a.length !== b.length) return false

    a.sort()
    b.sort()

    return a.every((element, index) => {
        return element === b[index];
    })
}