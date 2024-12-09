import { createTheme,responsiveFontSizes } from '@mui/material';

const theme = responsiveFontSizes(createTheme({
    spacing:4,
    typography:{
        fontFamily:[
            "Montserrat "
        ],
        fontSize:14
    },
    palette:{
        background:{
            default:'#9eb4c7',
        },
        primary:{
            main:'#5c7f91',
            dark:'#375995',
        },
        secondary:{
            main:'#5DBBFF',
            dark:'#aecaf7'
        },
        text:{
            primary:'#000000', 
            // secondary:'#677fa9' 
            secondary:'#000000' 
        },
        white:'#FFFFFF',
        black:'#000000',
        delete_color:'#e76c6c',
        table_header:'#9eb4c7',
        table_odd: '#eeeeeeef',
        tbale_even: '#ffffff',
        fontSize16: '16px',
    }
}))

export default theme;