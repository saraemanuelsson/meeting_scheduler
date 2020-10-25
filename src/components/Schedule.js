import React, { useState } from "react"
import { useForm } from "react-hook-form"
import PageHeader from "./PageHeader"
import MeetingDetailsForm from "./MeetingDetailsForm"
import FormLabel from "./FormLabel"
import LookingGlass from "../assets/LookingGlass.png"

const Schedule = ({ users, handleNewMeeting, searchContacts }) => {

    const { register, handleSubmit, watch, errors } = useForm()
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

    const addGuests = () => {
        const addedGuests = watch("guests").map(id => parseInt(id))
        setGuests(addedGuests)
    }

    const removeMessage = () => {
        setMessage("")
    }

    let guestOptions = []

    if (displayDropdown) {
        guestOptions = users.map(user => {
            return (
                <div key={user.id}>
                    <input onChange={addGuests} checked={guests.includes(user.id) ? true : false} type="checkbox" className="dropdown-content" id={user.id} name="guests" ref={register} value={user.id}/>
                    <label className="heading secondary dropdown-label" htmlFor={user.id}>{user.name}</label>
                </div>
            )
        })
    }

    const addedGuests = guests.map(guestId => {
        const cross = '\u2716'
        const guest = users.find(user => user.id === guestId)
        return (
            <li className="heading secondary" key={guest.email}>{guest.name}</li>
        )
    })

    const handleSearchInput = (searchInput) => {
        //Out of scope for exercise but should handle search contacts with searchContacts() here
    }

    return (
        <div className="page-content">
            <PageHeader title={header}/>
            <div className="content-container flex-content" onClick={removeMessage}>
                <MeetingDetailsForm message={message} saveMeeting={saveMeeting}/>
                <div className="form-details small-flex-item">
                    <form action="">
                        <FormLabel htmlFor="guests" label="Add Guests" />
                        <div className="search">
                            <input onChange={handleSearchInput} onClick={() => setDisplayDropdown(!displayDropdown)} className="input-field" type="text" name="search" placeholder="Search" ref={register} />
                            <img className="looking-glass" id="search-icon-form" src={LookingGlass} alt="Search"/>
                        </div>
                        <div className="guest-dropdown" >
                            {guestOptions}
                        </div>
                        <div>
                            <ul className="guest-list" id={displayDropdown ? "hidden" : ""}>
                                {addedGuests}
                            </ul>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Schedule