import React, { useEffect, useState } from 'react'
import { ImageOverlay, MapContainer, Marker, Popup, Tooltip } from 'react-leaflet'
import Fab from '@material-ui/core/Fab'
import Dialog from '@material-ui/core/Dialog';
import AddLocationIcon from '@material-ui/icons/AddLocation'
import markerCity from '../../_assets/img/marker_city.png'
import { makeStyles } from '@material-ui/core/styles'
import MarkerModal from './components/MarkerModal'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'
import { red } from '@material-ui/core/colors';
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
        zIndex: 400,
    },
    fabSave: {
        margin: 1,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
        zIndex: 400,
        backgroundColor: 'green',
        color: 'white'
    },
    fabCancel: {
        margin: 1,
        top: 'auto',
        right: 100,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
        zIndex: 400,
        backgroundColor: 'red',
        color: 'white'
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    cancelButton: {
        color: theme.palette.getContrastText(red[500]),
        backgroundColor: red[500],
        '&:hover': {
          backgroundColor: red[700],
        },
      }
}))

export default function ImageMap(props) {
    const classes = useStyles()
    const [bounds, setBounds] = useState([[0, 0], [0, 0]])
    const [center, setCenter] = useState([0, 0])
    const [loaded, setLoaded] = useState(false)
    const [image, setImage] = useState()
    const [markers, setMarkers] = useState([])
    const [openModal, setOpenModal] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [editing, setEditing] = useState(false);
    const [editMarkerId, setEditMarkerId] = useState();

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
        console.log(marker)
        let newMarker = {
            id: markers.length + 1,
            name: marker.name,
            description: marker.description,
            position: [image.height / 2, image.width / 2],
            draggable: true,
        }
        setCurrentIndex(markers.length)
        setMarkers([...markers, newMarker])
        setEditing(true)
    }

    const saveNewMarker = () => {
        let mkrs = markers
        mkrs[currentIndex].draggable = false
        setMarkers(mkrs)
        setEditing(false)
    }

    const cancelNewMarker = () => {
        let mkrs = markers
        mkrs.pop()
        setMarkers(mkrs)
        setEditing(false)
    }

    const viewMarker = (marker) => {
        setEditMarkerId(marker.sourceTarget.options.id)
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
                <MarkerModal openModal={openModal} setOpenModal={setOpenModal} addNewMarker={addNewMarker} />
                <MapContainer
                    center={center}
                    bounds={bounds}
                    maxBounds={bounds}
                    maxBoundsViscosity={1}
                    crs={Leaflet.CRS.Simple}
                    maxZoom={1}
                    minZoom={-3}
                    zoom={0}
                    style={{ height: '100%', width: '100%', background: 'black', display: 'flex' }}
                >
                    <ImageOverlay
                        url={image.src}
                        bounds={bounds}
                    />
                    {markers.map((marker, index) =>
                        <Marker id={marker.id} icon={thisIcon} position={marker.position} draggable={marker.draggable} 
                            eventHandlers={{
                                click: (e) => {
                                    viewMarker(e)
                                },
                            }}
                        >
                            <Popup>
                                {marker.description}
                            </Popup>
                            <Tooltip>{marker.name}</Tooltip>
                        </Marker>
                    )}
                </MapContainer>
                {editing ?
                    <>
                        <Fab aria-label="add" className={classes.fabCancel} onClick={() => cancelNewMarker()}>
                            <CancelIcon />
                        </Fab>
                        <Fab aria-label="add" className={classes.fabSave} onClick={() => saveNewMarker()}>
                            <SaveIcon />
                        </Fab>
                    </> :
                    <Fab  color="primary" aria-label="add" className={classes.fab} onClick={() => openMarkerModal()} >
                        <AddLocationIcon />
                    </Fab>
                }
            </>
        )
    )
}