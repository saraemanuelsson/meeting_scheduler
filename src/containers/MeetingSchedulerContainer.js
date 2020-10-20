import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom" 
import NavBar from "../components/NavBar"
import SideBar from "../components/SideBar"
import Home from "../components/Home"
import Schedule from "../components/Schedule"

const MeetingSchedulerContainer = () => {

    const [ users, setUsers ] = useState([])
    const [ meetings, setMeetings ] = useState([])

    useEffect(() => {
        const url = "https://coding-test.ajenta.io/"
        const endPoints = ["users", "meetings"]

        endPoints.forEach(endPoint => {
            fetch(url + endPoint)
            .then(res => res.json())
            .then(data => {
                if (endPoint === "users") {
                    setUsers(data)
                } else {
                    setMeetings(data)
                }
            })
            .catch(error => console.error)
        })
    }, [])

    //To do: What if there's no match for user.id and meeting.owner?
    const getMeetingDisplayDetails = () => {
        const meetingDetails = meetings.map(meeting => {
            const meetingOwner = users.find(user => user.id === meeting.owner)
            return {
                ...meeting,
                start_time: adjustToLocalTime(meeting.start_time),
                end_time: adjustToLocalTime(meeting.end_time), 
                owner: `${meetingOwner.first_name} ${meetingOwner.last_name}`}
        })
        return meetingDetails
    }

    const adjustToLocalTime = (time) => {
        const localTime = new Date(time)
        return localTime;
    }

    return (
        <Router>
            <>
                <NavBar />
                <SideBar />
                <Switch>
                    <Route exact path="/" render={(props) => (<Home meetings={getMeetingDisplayDetails()} />)} />
                    <Route path="/schedule" render={(props) => (<Schedule users={users} />)} />
                </Switch>
            </>
        </Router>
    )
}

export default MeetingSchedulerContainer