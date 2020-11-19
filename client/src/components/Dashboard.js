import React from 'react'
import { useConversation } from './context/ConversationProvider'
import OpenConversation from './OpenConversation'
import Sidebar from './Sidebar'


const Dashboard = ({ id }) => {
    const { selectedConversation } = useConversation()

    return (
        <div className="d-flex" style={{ height: "100vh" }}>
            <Sidebar id={id} />
            {selectedConversation && <OpenConversation />}
        </div>
    )
}

export default Dashboard;
