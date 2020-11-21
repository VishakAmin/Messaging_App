import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'
import { useConversations } from '../contexts/ConversationsProvider';
import Picker from "emoji-picker-react";
import ReactEmoji from "react-emoji";




const OpenConversation = () => {
    const [text, setText] = useState('')
    const { sendMessage, selectedConversation } = useConversations();
    const [emojiBoard, setEmojiBoard] = useState(false);

    const setRef = useCallback(node => {
        if (node) {
            node.scrollIntoView({ smooth: true })
        }
    }, [])

    function handleSubmit(e) {
        e.preventDefault();
        sendMessage(selectedConversation.recipients.map(r => r.id),
            text);
        setText("")
    }

    //     useEffect(() => {

    //         if (lastMessageRef.current) {
    //             lastMessageRef.current.scrollIntoView({ smooth: true })
    //         }
    // , ]
    // })


    const onEmojiClick = (event, emojiObject) => {
        setText((text) => text.concat(emojiObject.emoji));
        console.log(emojiObject);
    }

    const closeEmoji = () => {
        if (emojiBoard === true) {
            setEmojiBoard(!emojiBoard)
        }
    }
    return (
        <div className="d-flex flex-column flex-grow-1">
            <div className="flex-grow-1 overflow-auto">
                <div className="d-flex flex-column align-items-start justify-content-end px-3">
                    {selectedConversation.messages.map((message, index) => {
                        const lastMessage = selectedConversation.messages.length - 1 === index
                        return (
                            <div
                                ref={lastMessage ? setRef : null}
                                key={index}
                                className={`my-1 d-flex flex-column ${message.fromMe ? 'align-self-end align-items-end' : 'align-items-start'}`}
                            >
                                <div
                                    className={`rounded px-2 py-1 ${message.fromMe ? 'bg-primary text-white' : 'border'}`}>
                                    {message.text}
                                </div>
                                <div className={`text-muted small ${message.fromMe ? 'text-right' : ''}`}>
                                    {message.fromMe ? 'You' : message.senderName}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <Form onSubmit={handleSubmit}>
                {emojiBoard && <Picker onEmojiClick={onEmojiClick} />}
                <Form.Group className="m-2">
                    <InputGroup>
                        <Form.Control
                            as="textarea"
                            required
                            placeholder="Type your message here..."
                            value={text}
                            onChange={e => setText(e.target.value)}
                            style={{ height: '75px', resize: 'none' }}
                        />
                        <Button className="m-1 material-icons button" onClick={() => setEmojiBoard(!emojiBoard)}>
                            &#128512;                        </Button>
                        <InputGroup.Append>
                            <Button className="m-1" type="submit" onClick={() => closeEmoji()} >
                                Send</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
            </Form>
        </div>
    )
}

export default OpenConversation
