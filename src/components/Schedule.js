import React, { useState } from "react"
import PageHeader from "./PageHeader"
import MeetingDetailsForm from "./MeetingDetailsForm"
import GuestDetailsForm from "./GuestDetailsForm"

const Schedule = ({ users, handleNewMeeting, searchContacts }) => {

    const [ guests, setGuests ] = useState([])
    const [ message, setMessage ] = useState("")
    const [ displayGuestDropdown, setDisplayGuestDropdown ] = useState(false)
    const [ displayDurationDropdown, setDisplayDurationDropdown ] = useState(false)

    const header = "Schedule Meeting"

    const saveMeeting = (meetingDetails) => {
        
        const startTime = new Date()
        const endTime = getEndTime(parseInt(meetingDetails.duration))

        const payload = {
            name: meetingDetails.title.toLowerCase(),
            owner: getRandomOwner(),
            description: meetingDetails.description.toLowerCase(),
            start_time: startTime.toISOString(),
            end_time: endTime.toISOString(),
            guests: guests
        }

        handleNewMeeting(payload)
        setMessage("Meeting Scheduled!")
        setGuests([])
    }

    const getRandomOwner = () => {
        const owner = guests[Math.floor(Math.random() * guests.length)]
        return owner
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
                <MeetingDetailsForm message={message} setMessage={setMessage} saveMeeting={saveMeeting} guests={guests} displayDropdown={displayDurationDropdown} setDisplayDropdown={setDisplayDurationDropdown}/>
                <GuestDetailsForm guests={guests} users={users} displayDropdown={displayGuestDropdown} setDisplayDropdown={setDisplayGuestDropdown} addGuests={addGuests}/>
            </div>
        </div>
    )
}

export default Schedule