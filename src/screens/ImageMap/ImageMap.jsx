import React, { useEffect, useState } from 'react'
import { ImageOverlay, MapContainer, Marker, Popup, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import melee from '../../_assets/img/melee.jpg'
import ostrov from '../../_assets/img/ostrov.jpg'
import thosgrar from '../../_assets/img/thosgrar.jpg'
import marker from '../../_assets/img/marker_city.png'

var Leaflet = require('leaflet')

export default function ImageMap(props) {
    const [bounds, setBounds] = useState([[0, 0], [0, 0]])
    const [center, setCenter] = useState([0, 0])
    const [loaded, setLoaded] = useState(false)
    const [image, setImage] = useState()

    const position = [1498, 1189]
    const thisIcon = new Leaflet.Icon({
        iconUrl: marker,
        iconAnchor: new Leaflet.Point(16, 16),
        iconSize: [25, 25],
    })

    useEffect(() => {
        setLoaded(false);
        let imageName = require('../../_assets/img/' + props.mapName + '.jpg')
        let img = new Image();
        img.src = imageName.default
        img.onload = async () => {
            setImage(img)
            setCenter([img.height/2, img.width/2])
            setBounds([[0, 0], [img.height, img.width]])
            setLoaded(true)
        }
    }, [props.mapName])

    return (
        loaded && (
            <MapContainer
                center={center}
                bounds={bounds}
                maxBounds={bounds}
                maxBoundsViscosity={1}
                crs={Leaflet.CRS.Simple}
                maxZoom={1}
                minZoom={-2}
                style={{ height: '100%', width: '100%', background: 'black', display: 'flex' }}
            >
                <ImageOverlay
                    url={image.src}
                    bounds={bounds}
                />
                <Marker icon={thisIcon} position={position}>
                    <Popup>
                        O Reino de Aberama Gold
                    </Popup>
                    <Tooltip>O Reino de Aberama Gold</Tooltip>
                </Marker>
            </MapContainer>
        )
    )
}