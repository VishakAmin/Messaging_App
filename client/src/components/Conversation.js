import React, { useState } from 'react'
import { ListGroup } from 'react-bootstrap';
import { useConversation } from './context/ConversationProvider';




function Conversation() {

    const { conversations, selectedConversationIndex } = useConversation();
    console.log(conversations);
    return (
        <ListGroup variant="flush">
            {conversations.map((conversation, index) => (
                <ListGroup.Item
                    key={index}
                    action
                    active={conversation.select}
                    onClick={() => selectedConversationIndex(index)}
                >
                    {conversation.recipients.map(r => r.name).join(',')}
                </ListGroup.Item>
            ))}


        </ListGroup>
    )

}

export default Conversation;
