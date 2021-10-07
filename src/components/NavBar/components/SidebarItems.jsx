const SidebarItems = [
    {
        name: "Home",
        active: false,
        icon: "Home",
        route: "/"
    },
    {
        name: "Map",
        active: true,
        icon: "Public",
        items: [
            {
                name: "Mundi",
                active: true,
                icon: "Map",
                route: "/map/mundi"
            },
            {
                name: "Melee",
                active: true,
                icon: "Map",
                route: "/map/melee"
            },
            {
                name: "Thosgrar",
                active: true,
                icon: "Map",
                route: "/map/thosgrar"
            },
            {
                name: "Midbar",
                active: false,
                icon: "Map",
                route: "/map/mundi"
            },
            {
                name: "Dovakno",
                active: false,
                icon: "Map",
                route: "/map/mundi"
            },
            {
                name: "Salthenor",
                active: false,
                icon: "Map",
                route: "/map/mundi"
            },
            {
                name: "Magna",
                active: false,
                icon: "Map",
                route: "/map/mundi"
            },
            {
                name: "Nidala",
                active: false,
                icon: "Map",
                route: "/map/mundi"
            },
            {
                name: "Hell's Deep",
                active: false,
                icon: "Map",
                route: "/map/mundi"
            },
            {
                name: "Zandria",
                active: false,
                icon: "Map",
                route: "/map/mundi"
            },
            {
                name: "Bo'Shoyer",
                active: false,
                icon: "Map",
                route: "/map/mundi"
            },
            {
                name: "Ilhas da Tempestade",
                active: false,
                icon: "Map",
                route: "/map/mundi"
            }
        ]
    },
    {
        name: "Settings",
        active: false,
        icon: "Settings",
        items: [
            {
                name: "Player",
                active: false,
                icon: "Person",
                route: "/map/mundi"
            },
            {
                name: "Team",
                active: false,
                icon: "Group",
                route: "/map/mundi"
            },
            {
                name: "Map",
                active: false,
                icon: "Map",
                route: "/map/mundi"
            }
        ]
    },
];

export default SidebarItems;