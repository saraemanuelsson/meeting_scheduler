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

    return (
        <Router>
            <>
                <NavBar />
                <SideBar />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/meetings" component={Schedule} />
                </Switch>
            </>
        </Router>
    )
}

export default MeetingSchedulerContainer