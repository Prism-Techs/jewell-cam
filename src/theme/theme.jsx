import { createTheme,responsiveFontSizes } from '@mui/material';
const theme = responsiveFontSizes(createTheme({
    spacing:4,
    typography:{
        fontFamily:[
            "Montserrat "
        ],
        fontSize:14,
    },
    palette:{
        light_background:'#bed2e7',
        button:"#089c84",
        card_background:'#a0bcdd',
        table_header:'#ffffff',
        table_search_add_background:'#87a5a7',
        white:'#FFFFFF',
        delete_color:'red',
        black:'#000000',
        table_odd: '#eeeeeeef',
        tbale_even: '#ffffff',
        bold: 'bold',
        light_skinny:'#f9e9cf',
        fontSize16:16
    }
}))

export default theme;   