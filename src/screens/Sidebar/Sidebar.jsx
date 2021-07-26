import React, { useState } from 'react'
import ImageMap from '../ImageMap/ImageMap'
import logo from '../../_assets/img/logo.png'
import { Nav } from 'react-bootstrap';

export default function Sidebar(props) {
    const [showSidebar, setShowSidebar] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);

    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }

    return (
        <>
            <Nav className="col-md-12 d-none d-md-block sidebar"
                bg="dark"
                activeKey="/home"
                onSelect={selectedKey => alert(`selected ${selectedKey}`)}>
                <div className="sidebar-sticky"></div>
                <Nav.Item>
                    <Nav.Link onClick={() => {setOpenMenu(!openMenu)}}>Continentes</Nav.Link>
                    {openMenu && 
                        <Nav className="col-md-12 d-none d-md-block sidebar"
                            bg="dark"
                            activeKey="/home"
                            onSelect={selectedKey => alert(`selected ${selectedKey}`)}>
                            <div className="sidebar-sticky"></div>
                            {['melee', 'ostrov', 'thosgrar'].map((value, index) =>
                                <Nav.Item>
                                    <Nav.Link key={index} onClick={() => { props.setMapName(value) }}>{capitalize(value)}</Nav.Link>
                                </Nav.Item>
                            )}
                        </Nav>
                    }
                </Nav.Item>
            </Nav>

        </>
    )
}