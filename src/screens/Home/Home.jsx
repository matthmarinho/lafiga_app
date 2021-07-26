import Sidebar from '../Sidebar/Sidebar'
import ImageMap from '../ImageMap/ImageMap'
import { useState } from 'react'
import { Col, Container, Navbar, Row } from 'react-bootstrap'
import logo from '../../_assets/img/logo.png'
import './Home.css'

export default function Home() {
    const [mapName, setMapName] = useState('melee')

    return (
        <>
            <Navbar bg="dark" variant="dark" className="header">
                <Container>
                    <Navbar.Brand href="#home">
                        <img
                            alt=""
                            src={logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        Láfiga Mundi
                    </Navbar.Brand>
                </Container>
            </Navbar>
            <Container fluid>
                <Row >
                    <Col xs={2} className="sidebar">      
                        <Sidebar setMapName={setMapName} />
                    </Col>
                    <Col className="body">
                        <ImageMap mapName={mapName} />
                    </Col>
                </Row>
            </Container>
            
            
        </>
    )
}
