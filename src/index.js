import React from "react"
import { createRoot } from 'react-dom/client';
import "./index.css"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import App from "./App"

const root = createRoot(document.getElementById('root'))
root.render(<App tab="home" />)