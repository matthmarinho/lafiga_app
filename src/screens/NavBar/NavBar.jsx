import React, { useState } from 'react'
import Body from '../Body/Body'
import ImageMap from '../ImageMap/ImageMap'
import logo from '../../_assets/img/logo.png'

export default function NavBar(props) {
    const [showSidebar, setShowSidebar] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);
    
    const menuCollapse = () => {
        return (
            <div class="mb-4"> 
                <a onClick={() => {props.setMapName('melee')}} class="flex items-center py-2 pl-12 pr-4 transition cursor-pointer hover:bg-gray-800 hover:text-gray-200">Melee </a> 
                <a onClick={() => {props.setMapName('ostrov')}} class="flex items-center py-2 pl-12 pr-4 transition cursor-pointer hover:bg-gray-800 hover:text-gray-200">Ostrov </a> 
                <a onClick={() => {props.setMapName('thosgrar')}} class="flex items-center py-2 pl-12 pr-4 transition cursor-pointer hover:bg-gray-800 hover:text-gray-200">Thosgrar </a> 
            </div>
        )
    }

    return (
        <>
            <aside class="relative bg-sidebar h-screen w-64 hidden sm:block shadow-xl">
                <div class="p-6">
                    <a class="text-white text-3xl font-semibold uppercase hover:text-gray-300">Saite</a>
                    {/* <button class="w-full bg-white cta-btn font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center">
            <i class="fas fa-plus mr-3"></i> New Report
          </button> */}
                </div>
                <nav class="text-white text-base font-semibold pt-3">
                    <div>
                        <div onClick={() => { setOpenMenu(!openMenu) }}>
                            <a class="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item cursor-pointer">
                                <i class="fas fa-tachometer-alt mr-3"></i>
                                Continentes
                            </a>
                        </div>
                        { openMenu && menuCollapse() }
                    </div>
                </nav>
            </aside>

            {/* <div class="w-full flex flex-col h-screen overflow-y-hidden">
                <header class="w-full items-center bg-white py-2 px-6 hidden sm:flex">
                    <div class="w-1/2"></div>
                </header>
            </div> */}

            {/* <Body showSidebar={showSidebar} /> */}
        </>
    )
}