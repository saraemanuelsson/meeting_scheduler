import React from "react"

const MeetingListItem = ( {callid, owner, name, date, start } ) => {
    return (
    <li className="meeting-list-item" >
        <span className="text-highlight">{callid}</span>
        <span>{owner}</span>
        <span>{name}</span>
        <span>{date}</span>
        <span>{start}</span>
    </li>
    )
}

export default MeetingListItem