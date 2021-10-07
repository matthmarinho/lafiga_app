import React from "react"
import { Route, Switch } from "react-router-dom"
import ImageMap from "./screens/ImageMap/ImageMap"
import NotFound from "./screens/NotFound/NotFound"
import Home from "./screens/Home/Home"

function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/map/:mapName/:mapId" component={ImageMap} />
            <Route component={NotFound} />
        </Switch>
    )
}

export default Routes