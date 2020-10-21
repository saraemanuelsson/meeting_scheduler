import React from "react"
import MeetingListItem from "./MeetingListItem"

const Home = ({meetings}) => {

    let meetingNodes = []

    if (meetings.length !== 0) {
        meetingNodes = meetings.map(meeting => {
            return (
                <MeetingListItem 
                key={meeting.callid}
                callid={meeting.callid}
                owner={meeting.owner}
                name={meeting.name}
                date={meeting.start_time.toLocaleDateString("default", {day: "numeric", month: "long", year: "numeric"})}
                start={meeting.start_time.toLocaleTimeString("default", {hour12: true, hour: '2-digit', minute: '2-digit'})}
                />
            )
        })
    }
    
    return (
        <div>
            <h1>Scheduled Meetings({meetings.length})</h1>
            <h3><span>Call id</span><span>Owner</span><span>Name</span><span>Date</span><span>Start</span></h3>
            <ul>
                {meetingNodes}
            </ul>

        </div>

    )
}

export default Home