import React, { useState } from "react"
import PageHeader from "./PageHeader"
import MeetingDetailsForm from "./MeetingDetailsForm"
import GuestDetailsForm from "./GuestDetailsForm"

const Schedule = ({ users, handleNewMeeting, searchContacts }) => {

    const [ guests, setGuests ] = useState([])
    const [ message, setMessage ] = useState("")
    const [ displayDropdown, setDisplayDropdown ] = useState(false)

    const header = "Schedule Meeting"

    const saveMeeting = (meetingDetails) => {
        const startTime = new Date()
        const endTime = getEndTime(parseInt(meetingDetails.duration))
        const meetingGuests = guests.map(guest => guest.id)

        const payload = {
            name: meetingDetails.title.toLowerCase(),
            owner: guests[0].id,
            description: meetingDetails.description.toLowerCase(),
            start_time: startTime.toISOString(),
            end_time: endTime.toISOString(),
            guests: meetingGuests
        }

        handleNewMeeting(payload)
        setMessage("Meeting Scheduled!")
        setGuests([])
    }
    
    const getEndTime = (duration) => {
        const currentTime = new Date()
        const endTime = currentTime.setHours(currentTime.getHours() + duration)
        return new Date(endTime)
    }

    const addGuests = (guestsSelected) => {
        const addedGuests = guestsSelected.map(id => parseInt(id))
        setGuests(addedGuests)
    }

    const removeMessage = () => {
        setMessage("")
    }

    const handleSearchInput = (searchInput) => {
        //Out of scope for exercise but should handle search contacts with searchContacts() here
    }

    return (
        <div className="page-content">
            <PageHeader title={header}/>
            <div className="content-container flex-content" onClick={removeMessage}>
                <MeetingDetailsForm message={message} saveMeeting={saveMeeting}/>
                <GuestDetailsForm guests={guests} users={users} displayDropdown={displayDropdown} setDisplayDropdown={setDisplayDropdown} addGuests={addGuests}/>
            </div>
        </div>
    )
}

export default Schedule