import React, { useState } from "react"
import { useForm } from "react-hook-form"
import PageHeader from "./PageHeader"

const Schedule = ({ users, handleNewMeeting }) => {

    const { register, handleSubmit, watch, errors } = useForm()
    const [ guests, setGuests ] = useState([])
    const [ message, setMessage ] = useState("")

    const header = "Schedule Meeting"

    const onScheduleMeeting = (data, event) => {
        const startTime = new Date()
        const endTime = getEndTime(parseInt(data.duration))
        const meetingGuests = guests.map(guest => guest.id)

        const payload = {
            name: data.title,
            owner: guests[0].id,
            description: data.description,
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

    const addGuest = () => {
        const newGuestId = parseInt(watch("guests"))
        const indexOfGuest = users.findIndex(user => user.id === newGuestId)
        const newGuest = users[indexOfGuest]
        const newGuests = [...guests, newGuest]
        setGuests(newGuests)
        // users.splice(indexOfGuest, 1) -- Need to figure out better way of removing/highlighting selected guests
    }

    const addedGuests = guests.map(guest => {
        return (
            <li key={guest.id}>{guest.name}</li>
        )
    })

    const guestOptions = users.map(user => {
        return (
            <option value={user.id} key={user.id}>{user.name}</option>
        )
    })

    return (
        <div className="page-content">
            <PageHeader title={header}/>
            <div className="content-container">
                <form className="flex-content" onSubmit={handleSubmit(onScheduleMeeting)}>
                    <div className="form-details large-flex-item">
                        <label htmlFor="title" className="heading secondary input-label">Title</label>
                        <input className="input-field" type="text" name="title" placeholder="Weekly Meeting" ref={register({required: true})} />
                        <label htmlFor="description" className="heading secondary input-label">Description</label>
                        <input className="input-field" type="text" name="description" placeholder="Weekly Stand Up and Project" ref={register({required: true})} />
                        <label htmlFor="duration" className="heading secondary input-label">Duration</label>
                        <select className="input-field dropdown" name="duration" ref={register} defaultValue="default">
                            <option disabled value="default">...</option>
                            <option value={1}>1h</option>
                            <option value={2}>2h</option>
                            <option value={3}>3h</option>
                        </select>
                        <input className="orange-button" type="submit" value="Schedule Meeting"/>
                        <p>{message}</p>
                    </div>
                    <div className="form-details small-flex-item">
                        <label htmlFor="guests" className="heading secondary input-label">Add Guests</label>
                        <select className="input-field" name="guests" ref={register({required: true})} defaultValue="default" onChange={addGuest} selectedindex="0" id="drop">
                            <option value="default">Select Contacts</option>
                            { guestOptions }
                        </select>
                        <ul>
                            { addedGuests }
                        </ul>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default Schedule