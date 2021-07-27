import React, { useEffect, useState } from 'react'
import { ImageOverlay, MapContainer, Marker, Popup, Tooltip } from 'react-leaflet'
import Fab from '@material-ui/core/Fab'
import Dialog from '@material-ui/core/Dialog';
import AddLocationIcon from '@material-ui/icons/AddLocation'
import markerCity from '../../_assets/img/marker_city.png'
import { makeStyles } from '@material-ui/core/styles'
import MarkerModal from './components/MarkerModal';
import 'leaflet/dist/leaflet.css'

var Leaflet = require('leaflet')

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    fab: {
        margin: 1,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
        zIndex: 400
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}))

export default function ImageMap(props) {
    const classes = useStyles()
    const [bounds, setBounds] = useState([[0, 0], [0, 0]])
    const [center, setCenter] = useState([0, 0])
    const [loaded, setLoaded] = useState(false)
    const [image, setImage] = useState()
    const [marker, setMarker] = useState({})
    const [markers, setMarkers] = useState([])
    const [openModal, setOpenModal] = useState(false);

    const position = [1498, 1189]
    const thisIcon = new Leaflet.Icon({
        iconUrl: markerCity,
        iconAnchor: new Leaflet.Point(16, 16),
        iconSize: [25, 25],
    })

    const openMarkerModal = () => {
        setOpenModal(true)
    }

    const addNewMarker = (marker) => {
        let newMarker = {
            name: marker.name,
            position: [image.height / 2, image.width / 2],
            draggable: true,
        }

        setMarkers([...markers, newMarker])
    }

    useEffect(() => {
        setLoaded(false)
        let imageName = require('../../_assets/img/' + props.mapName + '.jpg')
        let img = new Image()
        img.src = imageName.default
        img.onload = async () => {
            setImage(img)
            setCenter([img.height / 2, img.width / 2])
            setBounds([[0, 0], [img.height, img.width]])
            setLoaded(true)
        }
    }, [props.mapName])

    return (
        loaded && (
            <>
                <MarkerModal openModal={openModal} setOpenModal={setOpenModal} setMarker={setMarker} />
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
                    {markers.map((marker, index) => 
                        <Marker icon={thisIcon} position={marker.position} draggable={marker.draggable}>
                            <Popup>
                                {marker.name}
                            </Popup>
                            <Tooltip>{marker.name}</Tooltip>
                        </Marker>
                    )}
                </MapContainer>
                <Fab
                    variant="extended"
                    size="small"
                    color="primary"
                    aria-label="add"
                    className={classes.fab}
                    onClick={() => openMarkerModal()}
                >
                    <AddLocationIcon className={classes.extendedIcon} />
                        Add. Localização
                </Fab>
            </>
        )
    )
}