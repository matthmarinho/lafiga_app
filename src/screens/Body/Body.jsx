import ImageMap from '../ImageMap/ImageMap'
import { useState } from 'react'

export default function Body(props) {
    const [value, setValue] = useState('melee')
    const [loaded, setLoaded] = useState(false)

    const reload = (option) => {
        setValue(option)
        setLoaded(false)
    }

    return 
        // <Box direction='row' flex overflow={{ horizontal: 'hidden' }}>
        //     {/* <Collapsible direction="horizontal" open={props.showSidebar}>
        //         <Box
        //             flex
        //             width='medium'
        //             elevation='small'
        //             align='center'
        //             pad="medium"
        //         >
        //             <Select
        //                 options={['melee', 'ostrov', 'thosgrar']}
        //                 value={value}
        //                 onChange={({ option }) => reload(option)}
        //             />
        //         </Box>
        //     </Collapsible> */}
        //     <Box flex > 
        //         <ImageMap mapValue={value} open={props.showSidebar} />
        //     </Box>
        // </Box >
    // )
}
