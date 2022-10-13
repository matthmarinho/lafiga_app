import React from "react"
import { Route, Switch } from "react-router-dom"
import ImageMap from "./screens/ImageMap/ImageMap"
import NotFound from "./screens/NotFound/NotFound"
import Chars from "./screens/Chars/Chars"
import Home from "./screens/Home/Home"
import Teams from "./screens/Teams/Teams"
import Maps from "./screens/Maps/Maps"
import Wiki from "./screens/Wiki/Wiki"

function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/map/:mapId" component={ImageMap} />
            <Route path="/chars" component={Chars} />
            <Route path="/teams" component={Teams} />
            <Route path="/maps" component={Maps} />
            <Route path="/wiki" component={Wiki} />
            <Route component={NotFound} />
        </Switch>
    )
}

export default Routes