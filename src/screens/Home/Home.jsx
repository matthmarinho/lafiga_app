import NavBar from '../NavBar/NavBar'
import ImageMap from '../ImageMap/ImageMap'
import { useState } from 'react'

export default function Home() {
    const [mapName, setMapName] = useState('melee')

    return (
        <>
            <div class="flex">
                <NavBar setMapName={setMapName} />
                <div class="w-full overflow-x-hidden flex flex-col">
                    <ImageMap mapName={mapName} />
                </div>
            </div>
        </>
    )
}
