import React, { useState, useEffect } from "react"
import { useForm } from "react-hook-form"

const Schedule = ({ users, handleNewMeeting }) => {

    const { register, handleSubmit, watch, errors } = useForm()
    const [ guests, setGuests ] = useState([])

    const onScheduleMeeting = (data) => {
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
        <form onSubmit={handleSubmit(onScheduleMeeting)}>
            <div>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" placeholder="Meeting Title" ref={register({required: true})} />
                <label htmlFor="description">Description</label>
                <input type="text" name="description" placeholder="Meeting Description" ref={register({required: true})} />
                <label htmlFor="duration">Duration</label>
                <select name="duration" ref={register} defaultValue="default">
                    <option disabled value="default">Duration</option>
                    <option value={1}>1h</option>
                    <option value={2}>2h</option>
                    <option value={3}>3h</option>
                </select>
                <input type="submit" value="Schedule Meeting"/>
            </div>
            <div>
                <label htmlFor="guests">Add Guests</label>
                <select name="guests" ref={register({required: true})} defaultValue="default" onChange={addGuest} selectedindex="0" id="drop">
                    <option value="default">Select Contacts</option>
                    { guestOptions }
                </select>
                <ul>
                    { addedGuests }
                </ul>

            </div>
        </form>
    )
}

export default Schedule