import Components from "../../../theme/master-file-material"
import theme from "../../../theme/theme"
const CustomeButton = ({ text, onClick, ...props }) => {
    return (

        <Components.Button
            onClick={onClick}
            sx={{
                backgroundColor: theme.palette.light_background, // Default background color
                color: theme.palette.black, // Text color
                fontWeight: theme.palette.bold, // Bold text
                '&:hover': {
                    backgroundColor: theme.palette.light_background // Lighter shade on hover
                },
                marginRight:"10px",
                marginBottom:"5px"
            }}
            {...props} // Spread any additional props
        >
            {text} {/* Display the button text passed as a prop */}
        </Components.Button>

    )
}
export default CustomeButton