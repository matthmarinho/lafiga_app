import React from "react"
import { Route, Switch } from "react-router-dom"
import ImageMap from "./screens/ImageMap/ImageMap"
import NotFound from "./screens/NotFound/NotFound"
import Chars from "./screens/Chars/Chars"
import Uploads from "./screens/Uploads/Uploads"
import Home from "./screens/Home/Home"
import Files from "./screens/Files/Files"
import Teams from "./screens/Teams/Teams"
import Maps from "./screens/Maps/Maps"

function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/map/:mapName/:mapId" component={ImageMap} />
            <Route path="/chars" component={Chars} />
            <Route path="/files" component={Files} />
            <Route path="/uploads" component={Uploads} />
            <Route path="/teams" component={Teams} />
            <Route path="/maps" component={Maps} />
            <Route component={NotFound} />
        </Switch>
    )
}

export default Routes