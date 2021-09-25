import React, { useEffect, useMemo, useRef, useState } from 'react'
import { ImageOverlay, MapContainer, Popup, Tooltip, Marker, useMapEvents as mapEvent } from 'react-leaflet'
import Fab from '@material-ui/core/Fab'
import AddLocationIcon from '@material-ui/icons/AddLocation'
import markerCity from '../../_assets/img/marker_city.png'
import markerDungeon from '../../_assets/img/marker_dungeon.png'
import { makeStyles } from '@material-ui/core/styles'
import MarkerModal from './components/MarkerModal'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'
import { red } from '@material-ui/core/colors'
// import Marker from 'react-leaflet-enhanced-marker'
import 'leaflet/dist/leaflet.css'
import { Box, Divider, Drawer, Icon, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import MarkerService from './services/marker'
import L from "leaflet";

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
    },
    drawer: {
        width: 250,
    },
}))

const iconCity = L.icon({
    iconSize: [25, 25],
    iconUrl: markerCity,
});

const iconDungeon = L.icon({
    iconSize: [25, 25],
    iconUrl: markerDungeon,
});

export default function ImageMap(props) {
    const classes = useStyles()
    const [bounds, setBounds] = useState([[0, 0], [0, 0]])
    const [center, setCenter] = useState([0, 0])
    const [loaded, setLoaded] = useState(false)
    const [image, setImage] = useState()

    const [markers, setMarkers] = useState([])
    const [newMarkers, setNewMarkers] = useState([])
    const [lastId, setLastId] = useState(null)

    const [openModal, setOpenModal] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [editing, setEditing] = useState(false)
    const [editMarkerId, setEditMarkerId] = useState()
    const [currentMarker, setCurrentMarker] = useState()
    const [currentPoint, setCurrentPoint] = useState()
    const [currentMap, setCurrentMap] = useState()
    const [loading, setLoading] = useState()
    const [creating, setCreating] = useState()
    const [showDrawer, setShowDrawer] = useState(false)

    const position = [1498, 1189]
    const thisIcon = new Leaflet.Icon({
        iconUrl: markerCity,
        iconAnchor: new Leaflet.Point(16, 16),
        iconSize: [25, 25],
    })

    const openMarkerModal = () => {
        setCreating(true)
    }

    const addNewMarker = (marker) => {
        const { lat, lng } = currentPoint;

        let newMarker = {
            id: lastId + 1,
            map_id: props.map.id,
            name: marker.name,
            description: marker.description,
            position: [lat, lng],
            draggable: true,
            color: marker.color,
            category_id: marker.category,
            category_name: marker.categoryName,
            type: 'new',
        }

        console.log(newMarker);

        // let icon
        // switch (marker.categoryName) {
        //     case 'Cidade':
        //         icon = iconCity
        //         break
        //     case 'Masmorra':
        //         icon = iconDungeon
        //         break
        //     case 'Equipe':
        //         icon = L.divIcon(<div><Icon style={{ color: marker.color, width: '25px', height: '25px' }}>room</Icon></div>)
        //         break;
        //     default:
        // }

        // const { lat, lng } = currentPoint;
        // L.marker([lat, lng], { icon }).addTo(currentMap);
        setLastId(lastId + 1)
        setNewMarkers([...newMarkers, newMarker])
        // saveNewMarker(newMarker)
        // setCurrentMarker(newMarker)
        // setMarkers([...markers, newMarker])
        setEditing(true)
    }

    const saveNewMarkers = () => {
        setCreating(false)
        setLoading(true)

        let payload = []
        newMarkers.map((marker) =>
            payload.push(
                {
                    id: marker.id,
                    category_id: marker.category_id,
                    description: marker.description,
                    latitude: marker.position[0],
                    longitude: marker.position[1],
                    map_id: marker.map_id,
                    name: marker.name,
                    color: marker.color
                }
            )
        )

        MarkerService.create(props.map.id, { data: JSON.stringify(payload) })
            .then(response => {
                getMap()
                setNewMarkers([])
                setLoading(false)
            })
            .catch(e => {
                console.log(e);
            });
    }

    const updateMarker = event => {
        // console.log(event);
        // const latLng = event.target.getLatLng(); //get marker LatLng
        // const markerIndex = event.target.options.marker_index; //get marker index
        // //update
        // this.setState(prevState => {
        //   const markerData = [...prevState.markerData];
        //   markerData[markerIndex] = latLng;
        //   return { markerData: markerData };
        // });
    };

    const updateNewMarker = () => {
        let data = {
            latitude: currentMarker.position[0],
            longitude: currentMarker.position[1],
        }
        // setEditing(false)

        MarkerService.update(props.map.id, currentMarker.id, data)
            .then(response => {
                let newMarker = response.data.map(x => Object.assign(x, { draggable: false }))
                setMarkers([...markers, newMarker])
            })
            .catch(e => {
                console.log(e);
            });
    }

    const cancelNewMarker = () => {
        setNewMarkers([])
        setCreating(false)
    }

    const viewMarker = (marker) => {
        setEditMarkerId(marker.sourceTarget.options.id)
    }

    const setMap = () => {
        setLoaded(false)
        let imageName = require('../../_assets/img/' + props.map.name.toLowerCase() + '.jpg')
        let img = new Image()
        img.src = imageName.default
        img.onload = async () => {
            setImage(img)
            setCenter([img.height / 2, img.width / 2])
            setBounds([[0, 0], [img.height, img.width]])
            setLoaded(true)
        }
    }

    const getMap = async () => {
        setLoading(true)
        MarkerService.getAll(props.map.id)
            .then(response => {
                if (response.data.length > 0) {
                    let markers = response.data.map(x => Object.assign(x, {
                        draggable: false,
                        position: [x.latitude, x.longitude],
                    }))
                    setMarkers(markers)
                    setLastId(markers.at(-1).id)
                }
                setLoading(false)
            })
            .catch(e => {
                console.log(e);
                setLoading(false)
            });
    }

    const imgMarker = (marker) => {
        return (
            <Marker key={marker.id} icon={thisIcon} position={marker.position} draggable={marker.draggable}
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
        )
    }
    const teste = () => {
        const markerStyle = {
            backgroundColor: "blue",
            color: "white",
            display: "flex",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            alignItems: "center"
        };
        return <div style={markerStyle}>Marker</div>;
    }

    const customIcon = (marker) => {
        // console.log(marker);
        let icon
        switch (marker.category_name) {
            case 'Região':
                icon = L.divIcon({
                    className: "dummy",
                    iconSize: [25, 25],
                    html: `
                    <div style="overflow:visible">
                        ${marker.name.toUpperCase()}
                    </div>`
                });
                break
            case 'Cidade':
                icon = iconCity
                break
            case 'Masmorra':
                icon = iconDungeon
                break
            case 'Equipe':
                icon = L.divIcon({
                    className: "dummy",
                    iconSize: [25, 25],
                    html: `
                    <div style="overflow:visible">
                        <i class="material-icons" 
                            style="color: rgb(${marker.color.r}, ${marker.color.g}, ${marker.color.b}); width: 25px, height: 25px"
                        >
                            room
                        </i>
                    </div>`
                });
                break
            default:
        }
        return icon
    }

    const markerRef = useRef(null)
    const eventHandlers = useMemo(() => ({
        dragend() {
            const marker = markerRef.current
            if (marker != null) {
                if (marker.options.type == 'new') {
                    let editedMarker = newMarkers.find(e => e.id === marker.options.id)
                    let filtered = newMarkers.filter(function (value) {
                        return value.id !== marker.options.id
                    });
                    editedMarker.position = Object.values(marker._latlng)
                    setNewMarkers([...filtered, editedMarker])
                } else {
                    let editedMarker = markers.find(e => e.id === marker.options.id)
                    let filtered = markers.filter(function (value) {
                        return value.id !== marker.options.id
                    });
                    editedMarker.position = Object.values(marker.markerRef.getLatLng())
                    setMarkers([...filtered])
                    setNewMarkers([...newMarkers, editedMarker])
                }
            }
        },
        click(e) {
            setShowDrawer(true)
        }
    })
    )

    const renderMarkers = () => {
        return [...markers, ...newMarkers].map((marker) => {
            return (
                <Marker
                    id={marker.id}
                    key={`marker_${marker.id}`}
                    type={marker.type ? 'new' : 'old'}
                    icon={customIcon(marker)}
                    position={marker.position}
                    draggable={marker.draggable}
                    eventHandlers={eventHandlers}
                    ref={markerRef}
                >
                    <Tooltip direction="top" offset={[0, -17]}>{marker.name}</Tooltip>
                </Marker>
            )
        })
    }

    const showDescription = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={setShowDrawer(false)}
            onKeyDown={setShowDrawer(false)}
        >
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const GetMarkerPos = () => {
        console.log('opa');
        const map = mapEvent({
            click(e) {
                console.log(e)
                setCurrentPoint(e.latlng)
                setCurrentMap(map)
                setOpenModal(true)
            },
        })
        return null
    }

    useEffect(() => {
        getMap()
    }, [props.map])

    useEffect(() => {
        setMap()
    }, [markers])

    return (
        loaded && (
            <>
                <MarkerModal openModal={openModal} setOpenModal={setOpenModal} addNewMarker={addNewMarker} />
                <Drawer
                    variant="persistent"
                    anchor="left"
                    open={showDrawer}
                    onClose={() => setShowDrawer(false)}
                    className={classes.drawerPaper}
                >
                    <List>
                        
                    </List>
                </Drawer>
                <MapContainer
                    center={center}
                    bounds={bounds}
                    maxBounds={bounds}
                    maxBoundsViscosity={1}
                    crs={Leaflet.CRS.Simple}
                    maxZoom={1}
                    minZoom={-3}
                    zoom={-1}
                    style={{ height: '100%', width: '100%', background: 'black', display: 'flex' }}
                >
                    <ImageOverlay
                        url={image.src}
                        bounds={bounds}
                    />
                    {creating &&
                        <GetMarkerPos />
                    }
                    {!loading && renderMarkers()}
                </MapContainer>
                {creating ?
                    <>
                        <Fab aria-label="add" className={classes.fabCancel} onClick={() => cancelNewMarker()}>
                            <CancelIcon />
                        </Fab>
                        <Fab aria-label="add" className={classes.fabSave} onClick={() => saveNewMarkers()}>
                            <SaveIcon />
                        </Fab>
                    </> :
                    <Fab color="primary" aria-label="add" className={classes.fab} onClick={() => openMarkerModal()} >
                        <AddLocationIcon />
                    </Fab>
                }
            </>
        )
    )
}