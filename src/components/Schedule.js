import React, { useState } from "react"
import { useForm } from "react-hook-form"
import PageHeader from "./PageHeader"
import FormLabel from "./FormLabel"
import LookingGlass from "../assets/LookingGlass.png"

const Schedule = ({ users, handleNewMeeting, searchContacts }) => {

    const { register, handleSubmit, watch, errors } = useForm()
    const [ guests, setGuests ] = useState([])
    const [ message, setMessage ] = useState("")
    const [ displayDropdown, setDisplayDropdown ] = useState(false)

    const header = "Schedule Meeting"

    const onScheduleMeeting = (data, event) => {
        const startTime = new Date()
        const endTime = getEndTime(parseInt(data.duration))
        const meetingGuests = guests.map(guest => guest.id)

        const payload = {
            name: data.title.toLowerCase(),
            owner: guests[0].id,
            description: data.description.toLowerCase(),
            start_time: startTime.toISOString(),
            end_time: endTime.toISOString(),
            guests: meetingGuests
        }

        handleNewMeeting(payload)
        setMessage("Meeting Scheduled!")
        event.target.reset()
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
        //Out of scope for exercise but should handle search contacts here
    }

    return (
        <div className="page-content">
            <PageHeader title={header}/>
            <div className="content-container flex-content" onClick={removeMessage}>
                <div className="form-details large-flex-item">
                    <form onSubmit={handleSubmit(onScheduleMeeting)} onClick={removeMessage}>
                        <FormLabel htmlFor="title" label="Title" />
                        <input className="input-field" type="text" name="title" placeholder="Weekly Meeting" required ref={register({required: true})} />
                        <FormLabel htmlFor="description" label="Description" />
                        <input className="input-field" type="text" name="description" placeholder="Weekly Stand Up and Project" ref={register({required: true})} />
                        <FormLabel htmlFor="duration" label="Duration" />
                        <select className="input-field dropdown" name="duration" ref={register} defaultValue="default">
                            <option disabled value="default">...</option>
                            <option value={1}>1h</option>
                            <option value={2}>2h</option>
                            <option value={3}>3h</option>
                        </select>
                        <input className="orange-button" type="submit" value="Schedule Meeting"/>
                        <p id="confirmation">{message}</p>
                    </form>
                </div>
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