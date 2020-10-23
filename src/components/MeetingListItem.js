import React from "react"

const MeetingListItem = ( {callid, owner, name, date, start } ) => {
    return (
    <li className="meeting-list-item" >
        <span className="meeting-span meeting-callid">{callid}</span>
        <span className="meeting-span meeting-owner">{owner}</span>
        <span className="meeting-span meeting-name">{name}</span>
        <span className="meeting-span meeting-date">{date}</span>
        <span className="meeting-span meeting-start">{start}</span>
    </li>
    )
}

export default MeetingListItem