import NavBar from '../NavBar/NavBar'
import ImageMap from '../ImageMap/ImageMap'
import { useState } from 'react'
import { Col, Container, Navbar, Row } from 'react-bootstrap'
import logo from '../../_assets/img/logo.png'

export default function Home() {
    const [mapName, setMapName] = useState('melee')

    return (
        <>
            <Navbar bg="dark" variant="dark" style={{height: '10vh'}}>
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
            <Container fluid bg="dark">
                <Row style={{height: '90vh'}}>
                    <Col sm={2}>
                        <NavBar setMapName={setMapName} />
                    </Col>
                    <Col>
                        <ImageMap mapName={mapName} />
                    </Col>
                </Row>
            </Container>
            
            
        </>
    )
}
