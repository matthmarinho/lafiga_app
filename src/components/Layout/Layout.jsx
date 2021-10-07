import React from 'react'
import NavBar from "./../NavBar/NavBar"
import Routes from "../../routes"
import { BrowserRouter as Router } from "react-router-dom"

function Layout(props) {
    return (
        <div>
            <Router>
                <NavBar />
                <Routes />
            </Router>
        </div>
    )
}

export default Layout