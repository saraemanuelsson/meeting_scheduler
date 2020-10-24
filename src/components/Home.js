import React from "react"
import MeetingListItem from "./MeetingListItem"
import PageHeader from "./PageHeader"

const Home = ({meetings, users, capitalizeFirstLetter}) => {

    const header = `Scheduled Meetings(${meetings.length})`

    const getNameForUser = (meeting) => {
        const meetingOwner = users.find(user => user.id === meeting.owner)
        return meetingOwner.name
    }

    const getPrettyDate = (meeting) => {
        const startDate = new Date(meeting.start_time)
        return startDate.toLocaleDateString("default", {day: "numeric", month: "long", year: "numeric"})
    }

    const getPrettyTime = (meeting) => {
        const startTime = new Date(meeting.start_time)
        return startTime.toLocaleTimeString("default", {hour12: true, hour: '2-digit', minute: '2-digit'})
    }

    let meetingNodes = []

    if (meetings.length !== 0 && users.length !== 0) {
        meetingNodes = meetings.map(meeting => {
            return (
                <MeetingListItem
                key={meeting.callid}
                callid={meeting.callid}
                owner={getNameForUser(meeting)}
                name={capitalizeFirstLetter(meeting.name)}
                date={getPrettyDate(meeting)}
                start={getPrettyTime(meeting)}
                />
            )
        })
    }
    
    return (
        <div className="page-content">
            <PageHeader title={header} />
            <div className="content-container">
                <h2 className="heading secondary meeting-headings">
                    <span>Call id</span>
                    <span>Owner</span>
                    <span>Name</span>
                    <span>Date</span>
                    <span>Start</span>
                </h2>
                <ul className="meeting-list">
                    {meetingNodes}
                </ul>
            </div>
        </div>

    )
}

export default Home