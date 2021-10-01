import React, { useEffect, useMemo, useState } from 'react'
import markerCity from '../../_assets/img/marker_city.png'
import markerDungeon from '../../_assets/img/marker_dungeon.png'
import CategoryService from './services/category'
import MarkerService from './services/marker'
import MarkerModal from './components/MarkerModal'
import InfoModal from './components/InfoModal'
import SaveIcon from '@mui/icons-material/Save'
import ClearIcon from '@mui/icons-material/Clear'
import AddLocationIcon from '@mui/icons-material/AddLocation'
import SettingsIcon from '@mui/icons-material/Settings'
import InfoIcon from '@mui/icons-material/Info'
import { ImageOverlay, MapContainer, Tooltip, Marker, useMapEvents as mapEvent, ZoomControl } from 'react-leaflet'
import { SpeedDial, SpeedDialAction } from '@mui/material'
import { styled } from '@mui/material/styles'
import L from "leaflet";
import 'leaflet/dist/leaflet.css'

var Leaflet = require('leaflet')

const iconCity = L.icon({
    iconSize: [25, 25],
    iconUrl: markerCity,
});

const iconDungeon = L.icon({
    iconSize: [25, 25],
    iconUrl: markerDungeon,
});

const SpeedDialCustom = styled(SpeedDial)(({ theme, admin }) => ({
        position: 'absolute', 
        bottom: 16, 
        right: 16,
    ...(admin && {
        right: 88
    }),
}));

export default function ImageMap({map, user}) {
    const [bounds, setBounds] = useState([[0, 0], [0, 0]])
    const [center, setCenter] = useState([0, 0])
    const [loaded, setLoaded] = useState(false)
    const [image, setImage] = useState()
    const [markers, setMarkers] = useState([])
    const [newMarkers, setNewMarkers] = useState([])
    const [lastId, setLastId] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    const [currentPoint, setCurrentPoint] = useState()
    const [loading, setLoading] = useState()
    const [creating, setCreating] = useState()
    const [showInfo, setShowInfo] = useState(false)
    const [openDial, setOpenDial] = React.useState(false)
    const [openMarkerDial, setOpenMarkerDial] = React.useState(false)
    const [categories, setCategories] = useState([])
    const [openInfoModal, setOpenInfoModal] = useState(false)
    const [infoMarker, setInfoMarker] = useState({})
    const admin = Boolean(user && user.role_id === 1 ? true : false)

    const actions = [
        { icon: <AddLocationIcon />, name: 'Config Markers', function: () => handleCreate() },
    ];

    const createActions = [
        { icon: <ClearIcon />, name: 'Cancel', function: () => cancelNewMarker() },
        { icon: <SaveIcon />, name: 'Save', function: () => saveNewMarkers() },
    ];

    const handleOpenDial = () => setOpenDial(true);
    const handleCloseDial = () => setOpenDial(false);
    const handleOpenMarkerDial = () => setOpenMarkerDial(true);
    const handleCloseMarkerDial = () => setOpenMarkerDial(false);
    const handleCreate = () => {
        setInfoMarker({})
        setCreating(true)
    }
    const handleCloseInfoModal = () => {
        setOpenInfoModal(false)
        setInfoMarker({})
        setShowInfo(false)
    }

    const addNewMarker = (marker) => {
        let { lat, lng } = currentPoint

        let newMarker = {
            id: lastId + 1,
            map_id: map.id,
            name: marker.name,
            description: marker.description,
            position: [lat, lng],
            draggable: true,
            color: marker.color,
            category_id: marker.category,
            category_name: marker.categoryName,
            new: true,
        }

        let filtered = newMarkers.filter(function (value) {
            return value.id !== newMarker.id
        });

        setLastId(lastId + 1)
        setNewMarkers([...filtered, newMarker])
    }

    const editMarker = (marker) => {
        let lat = infoMarker.latitude
        let lng = infoMarker.longitude

        setLoading(true)
        setShowInfo(false)

        let data = {
            map_id: map.id,
            name: marker.name,
            description: marker.description,
            position: [lat, lng],
            draggable: true,
            color: marker.color,
            category_id: marker.category,
            category_name: marker.categoryName,
            new: true,
        }

        MarkerService.update(map.id, infoMarker.id, data)
            .then(response => {
                getMap()
                setLoading(false)
            })
            .catch(e => {
                console.log(e);
            });
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

        MarkerService.create(map.id, { data: JSON.stringify(payload) })
            .then(response => {
                getMap()
                setNewMarkers([])
                setLoading(false)
            })
            .catch(e => {
                console.log(e);
            });
    }

    const cancelNewMarker = () => {
        setNewMarkers([])
        setCreating(false)
    }

    const setMap = () => {
        setLoaded(false)
        let imageName = require('../../_assets/img/' + map.name.toLowerCase() + '.jpg')
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
        MarkerService.getAll(map.id)
            .then(response => {
                if (response.data.length > 0) {
                    let markers = response.data.map(x => Object.assign(x, {
                        draggable: false,
                        position: [x.latitude, x.longitude],
                    }))
                    setMarkers(markers)
                    setLastId(markers[markers.length -1].id)
                } else {
                    setMarkers([])
                    setNewMarkers([])
                }
                setMap()
                setLoading(false)
            })
            .catch(e => {
                console.log(e);
                setLoading(false)
            });
    }

    const customIcon = (marker) => {
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

    const markerManipulate = (e) => {
        let editedMarker = null
        let filtered = null
        if (e != null) {
            if (e.target.options.new) {
                editedMarker = newMarkers.find(m => m.id === e.target.options.id)
                filtered = newMarkers.filter(function (value) {
                    return value.id !== e.target.options.id
                });
                editedMarker.position = Object.values(e.target._latlng)
                setNewMarkers([...filtered, editedMarker])
            } else {
                editedMarker = markers.find(m => m.id === e.target.options.id)
                filtered = markers.filter(function (value) {
                    return value.id !== e.target.options.id
                });
                editedMarker.position = Object.values(e.target._latlng)
                editedMarker.new = true
                setMarkers([...filtered])
                setNewMarkers([...newMarkers, editedMarker])
            }
        }
        return editedMarker
    }

    const getEditMarker = (e) => {
        let editedMarker = null
        if (e != null) {
            if (e.target.options.new) {
                editedMarker = newMarkers.find(m => m.id === e.target.options.id)
            } else {
                editedMarker = markers.find(m => m.id === e.target.options.id)
            }
        }
        return editedMarker
    }


    const eventHandlers = useMemo(() => ({
        dragend(e) {
            markerManipulate(e)
        },
        click(e) {
            setInfoMarker(getEditMarker(e))
            setShowInfo(true)
        }
    })
    )

    const renderMarkers = () => {
        return [...markers, ...newMarkers].map((marker) => {
            return (
                <Marker
                    id={marker.id}
                    key={`marker_${marker.id}`}
                    new={marker.new}
                    icon={customIcon(marker)}
                    position={marker.position}
                    draggable={creating}
                    eventHandlers={eventHandlers}
                >
                    <Tooltip direction="top" offset={[0, -17]}>{marker.name}</Tooltip>
                </Marker>
            )
        })
    }

    const GetMarkerPos = () => {
        mapEvent({
            click(e) {
                setCurrentPoint(e.latlng)
                if (creating) {
                    setOpenModal(true)
                }
            },
        })
        return null
    }

    const getCategories = () => {
        CategoryService.getAll()
            .then(response => {
                setCategories(response.data)
            })
            .catch(e => {
                console.log(e)
            });
    }

    useEffect(() => {
        if (map && map.id) {
            getMap()
        }
    }, [map]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <>
            <MarkerModal openModal={openModal} setOpenModal={setOpenModal} addNewMarker={addNewMarker} edit={editMarker} categories={categories} markerInfo={infoMarker} />
            <InfoModal
                openModal={openInfoModal}
                setOpenModal={setOpenInfoModal}
                setCloseModal={handleCloseInfoModal}
                markerInfo={infoMarker}
                openEdit={setOpenModal}
                getMap={getMap}
                admin={admin}
            />
            {loaded && (
                <MapContainer
                    center={center}
                    bounds={bounds}
                    maxBounds={bounds}
                    maxBoundsViscosity={1}
                    crs={Leaflet.CRS.Simple}
                    maxZoom={1}
                    minZoom={-3}
                    zoom={0}
                    zoomControl={false}
                    style={{ height: '100%', width: '100%', background: 'black', display: 'flex' }}
                >
                    <ImageOverlay
                        url={image.src}
                        bounds={bounds}
                    />
                    <ZoomControl position="bottomleft" />
                    <GetMarkerPos />
                    {!loading && renderMarkers()}
                </MapContainer>
            )}
            {admin && !creating && <SpeedDial
                ariaLabel="SpeedDial actions"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<SettingsIcon />}
                onClose={handleCloseDial}
                onOpen={handleOpenDial}
                open={openDial}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        tooltipOpen
                        onClick={action.function}
                    />
                ))}
            </SpeedDial>}
            {admin && creating && <SpeedDial
                ariaLabel="SpeedDial create actions"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<AddLocationIcon />}
                onClose={handleCloseMarkerDial}
                onOpen={handleOpenMarkerDial}
                open={openMarkerDial}
            >
                {createActions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        tooltipOpen
                        onClick={action.function}
                    />
                ))}
            </SpeedDial>}
            {showInfo && <SpeedDialCustom
                ariaLabel="SpeedDial info"
                admin={admin}
                icon={<InfoIcon />}
                onClick={() => setOpenInfoModal(true)}
            >
            </SpeedDialCustom>}
        </>
    )
}