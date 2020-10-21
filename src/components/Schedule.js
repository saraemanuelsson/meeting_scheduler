import React, { useState } from "react"
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
        console.log(payload);
        handleNewMeeting(payload)
    }
    
    const getEndTime = (duration) => {
        const currentTime = new Date()
        const endTime = currentTime.setHours(currentTime.getHours() + duration)
        return new Date(endTime)
    }

    let guestOptions = []

    if (users.length !== 0) {
        guestOptions = users.map(user => {
            return (
            <option value={user.id} key={user.id}>{`${user.first_name} ${user.last_name}`}</option>
            )
        })
    }

    let guestNames = []

    if (guests.length !== 0) {
        guestNames = guests.map(guest => {
            return (
                <li key={guest.id}>{guest.first_name} {guest.last_name}</li>
            )
        })
    }

    const addGuest = () => {
        const newGuestId = parseInt(watch("guests"))
        const newGuest = users[users.findIndex(user => user.id === newGuestId)]
        const newGuests = [...guests, newGuest]
        setGuests(newGuests)
    }

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
                <select name="guests" ref={register({required: true})} defaultValue="default" onChange={addGuest}>
                    <option disabled value="default">Search Contacts</option>
                    {guestOptions}
                </select>
                {errors.guests && <span>Required field</span>}
                <ul>
                    {guestNames}
                </ul>

            </div>
        </form>
    )
}

export default Schedule