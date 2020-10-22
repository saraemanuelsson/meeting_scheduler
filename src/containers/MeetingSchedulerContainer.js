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
        const getData = () => {
            const url = "https://coding-test.ajenta.io/"
            const endPoints = ["users", "meetings"]
    
            endPoints.forEach(endPoint => {
                fetch(url + endPoint)
                .then(res => res.json())
                .then(data => {
                    if (endPoint === "users") {
                        setUsers(addFullNamesToUsers(data))
                    } else if (endPoint === "meetings") {
                        setMeetings(data)
                    }
                })
                .catch(error => console.error)
            })
        }
        getData()
    }, [])

    const addFullNamesToUsers = (userData) => {
        const usersWithFullNames = userData.map(user => {
            return {
                id: user.id,
                name: `${capitalizeFirstLetter(user.first_name)} ${capitalizeFirstLetter(user.last_name)}`,
                email: user.email
            }
        })
        return usersWithFullNames
    }

    const capitalizeFirstLetter = (string) => {
        const prettyString = string.charAt(0).toUpperCase() + string.slice(1)
        return prettyString
    }

    //To do: What if there's no match for user.id and meeting.owner?
    const createDisplayMeetingList = () => {

        let meetingDetails = []
        
        if (meetings.length !== 0 && users.length !== 0) {
            meetingDetails = meetings.map(meeting => {
                const meetingOwner = users.find(user => user.id === meeting.owner)
                return {
                    ...meeting,
                    name: capitalizeFirstLetter(meeting.name),
                    start_time: new Date(meeting.start_time),
                    owner: meetingOwner.name
                }
            })
        }
        return meetingDetails
    }

    const postMeeting = (payload) => {;
        const url = "https://coding-test.ajenta.io/meetings"

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
              },
            body: JSON.stringify(payload)
        })
        .then(res => saveNewMeeting(payload))
        .catch(error => console.error)
    }

    const saveNewMeeting = (meetingDetails) => {
        const newMeetingCallId = meetings[meetings.length -1].callid + 1
        const newMeeting = {
            callid: newMeetingCallId,
            name: meetingDetails.name,
            start_time: meetingDetails.start_time,
            end_time: meetingDetails.end_time,
            owner: meetingDetails.owner
        }
        setMeetings(meetings => [...meetings, newMeeting])
    }

    return (
        <Router>
            <>
                <NavBar />
                <SideBar />
                <Switch>
                    <Route exact path="/" render={(props) => (<Home meetings={createDisplayMeetingList()} />)} />
                    <Route path="/schedule" render={(props) => (<Schedule users={users} handleNewMeeting={postMeeting}/>)} />
                </Switch>
            </>
        </Router>
    )
}

export default MeetingSchedulerContainer