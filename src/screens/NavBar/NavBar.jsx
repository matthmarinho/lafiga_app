import React, { useState } from 'react'
import Body from '../Body/Body'
import ImageMap from '../ImageMap/ImageMap'
import logo from '../../_assets/img/logo.png'
import { Container, Nav, Navbar } from 'react-bootstrap';

export default function NavBar(props) {
    const [showSidebar, setShowSidebar] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);

    const menuCollapse = () => {
        return (
            <div class="mb-4">
                <a onClick={() => { props.setMapName('melee') }} class="flex items-center py-2 pl-12 pr-4 transition cursor-pointer hover:bg-gray-800 hover:text-gray-200">Melee </a>
                <a onClick={() => { props.setMapName('ostrov') }} class="flex items-center py-2 pl-12 pr-4 transition cursor-pointer hover:bg-gray-800 hover:text-gray-200">Ostrov </a>
                <a onClick={() => { props.setMapName('thosgrar') }} class="flex items-center py-2 pl-12 pr-4 transition cursor-pointer hover:bg-gray-800 hover:text-gray-200">Thosgrar </a>
            </div>
        )
    }

    return (
        <>
            <Nav className="col-md-12 d-none d-md-block bg-light sidebar"
                activeKey="/home"
                onSelect={ selectedKey => alert(`selected ${selectedKey}`)}>
                <div className="sidebar-sticky"></div>
                <Nav.Item>
                    <Nav.Link href="/home">Active</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1">Link</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2">Link</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="disabled" disabled>
                    Disabled
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        </>
    )
}