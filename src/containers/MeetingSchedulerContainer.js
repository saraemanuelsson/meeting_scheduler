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
        getData()
    }, [])

    const getData = () => {
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
    }

    const postMeeting = (payload) => {
        console.log("Post time!");
        const url = "https://coding-test.ajenta.io/meetings"

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
              },
            body: JSON.stringify(payload)
        })
        .then(res => console.log(res))
    }

    //To do: What if there's no match for user.id and meeting.owner?
    const getMeetingDisplayDetails = () => {

        let meetingDetails = []
        
        if (meetings.length !== 0 && users.length !== 0) {
            meetingDetails = meetings.map(meeting => {
                const meetingOwner = users.find(user => user.id === meeting.owner)
                return {
                    ...meeting,
                    start_time: getDate(meeting.start_time),
                    end_time: getDate(meeting.end_time), 
                    owner: `${meetingOwner.first_name} ${meetingOwner.last_name}`}
            })
        }
        return meetingDetails
    }

    const getDate = (time) => {
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
                    <Route path="/schedule" render={(props) => (<Schedule users={users} handleNewMeeting={postMeeting}/>)} />
                </Switch>
            </>
        </Router>
    )
}

export default MeetingSchedulerContainer