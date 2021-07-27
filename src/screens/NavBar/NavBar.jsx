import React, { useState } from 'react'
import ImageMap from '../ImageMap/ImageMap'
import logo from '../../_assets/img/logo.png'

export default function NavBar({openModal}) {
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <React.Fragment>
            <aside class="relative bg-sidebar h-screen w-64 hidden sm:block shadow-xl">
                <div class="p-6">
                    <a class="text-white text-3xl font-semibold uppercase hover:text-gray-300">Saite</a>
                    {/* <button class="w-full bg-white cta-btn font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center">
            <i class="fas fa-plus mr-3"></i> New Report
          </button> */}
                </div>
                <div class="pl-6 pr-4">
                    <button class="w-full px-10 py-3 bg-red-400 text-gray-100 outline-none rounded focus:outline-none" onClick={() => openModal()}>
                        Login
                    </button>    
                </div>
                
                <nav class="text-white text-base font-semibold pt-3">
                    <a onClick={() => {console.log('preda')}} class="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item">
                        <i class="fas fa-tachometer-alt mr-3"></i>
                        Continentes
                    </a>

                </nav>
            </aside>

            {/* <div class="w-full flex flex-col h-screen overflow-y-hidden">
                <header class="w-full items-center bg-white py-2 px-6 hidden sm:flex">
                    <div class="w-1/2"></div>
                </header>
            </div> */}

            {/* <Body showSidebar={showSidebar} /> */}
        </React.Fragment>
    )
}