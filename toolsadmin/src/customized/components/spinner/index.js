// ** MUI Imports
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'



const FallbackSpinner = ({ sx }) => {
  // ** Hook
  const theme = useTheme()

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        ...sx
      }}
    >
      <svg width={82} height={56.375} viewBox='0 0 32 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
      
      </svg>
      <CircularProgress disableShrink sx={{ mt: 6 }} />
    </Box>
  )
}

export default FallbackSpinner

/*

  <path
          fillRule='evenodd'
          clipRule='evenodd'
          fill={theme.palette.primary.main}
          d="M12,-23.8C13.4,-20,11.1,-12.5,16.1,-7.9C21.1,-3.3,33.6,-1.7,32.9,-0.4C32.2,0.8,18.3,1.7,18.6,15.6C19,29.5,33.6,56.5,32.8,65.8C32.1,75.2,16.1,67,4.4,59.3C-7.2,51.7,-14.5,44.6,-15.7,35.6C-17,26.5,-12.3,15.5,-9.8,9.2C-7.3,2.9,-7,1.5,-15.2,-4.7C-23.3,-10.9,-40,-21.8,-42.7,-28.4C-45.3,-34.9,-34,-37.2,-24.6,-36.4C-15.2,-35.6,-7.6,-31.9,-1.2,-29.9C5.3,-27.9,10.6,-27.6,12,-23.8Z" 
          transform="translate(100 100)" 
          //d="-37.5C36.5,-33.5,32.9,-19.3,34.8,-6.5C36.6,6.4,43.8,17.9,40.7,23.6C37.5,29.2,24,28.9,11.7,34.4C-0.6,39.9,-11.7,51.1,-18.7,49.4C-25.7,47.6,-28.6,32.9,-32.2,21.3C-35.8,9.6,-39.9,0.9,-42.5,-11.5C-45.1,-24,-46.3,-40.2,-38.9,-43.8C-31.6,-47.4,-15.8,-38.4,-1.2,-36.9C13.3,-35.5,26.7,-41.6,31.6,-37.5Z"
        />
        <path
          fill='#161616'
          opacity={0.06}
          fillRule='evenodd'
          clipRule='evenodd'
         // d='M7.69824 16.4364L12.5199 3.23696L16.5541 7.25596L7.69824 16.4364Z'
         d="M12,-23.8C13.4,-20,11.1,-12.5,16.1,-7.9C21.1,-3.3,33.6,-1.7,32.9,-0.4C32.2,0.8,18.3,1.7,18.6,15.6C19,29.5,33.6,56.5,32.8,65.8C32.1,75.2,16.1,67,4.4,59.3C-7.2,51.7,-14.5,44.6,-15.7,35.6C-17,26.5,-12.3,15.5,-9.8,9.2C-7.3,2.9,-7,1.5,-15.2,-4.7C-23.3,-10.9,-40,-21.8,-42.7,-28.4C-45.3,-34.9,-34,-37.2,-24.6,-36.4C-15.2,-35.6,-7.6,-31.9,-1.2,-29.9C5.3,-27.9,10.6,-27.6,12,-23.8Z"
         transform="translate(100 100)" 
        />
        <path
          fill='#161616'
          opacity={0.06}
          fillRule='evenodd'
          clipRule='evenodd'
         // d='M8.07751 15.9175L13.9419 4.63989L16.5849 7.28475L8.07751 15.9175Z'
         d="M12,-23.8C13.4,-20,11.1,-12.5,16.1,-7.9C21.1,-3.3,33.6,-1.7,32.9,-0.4C32.2,0.8,18.3,1.7,18.6,15.6C19,29.5,33.6,56.5,32.8,65.8C32.1,75.2,16.1,67,4.4,59.3C-7.2,51.7,-14.5,44.6,-15.7,35.6C-17,26.5,-12.3,15.5,-9.8,9.2C-7.3,2.9,-7,1.5,-15.2,-4.7C-23.3,-10.9,-40,-21.8,-42.7,-28.4C-45.3,-34.9,-34,-37.2,-24.6,-36.4C-15.2,-35.6,-7.6,-31.9,-1.2,-29.9C5.3,-27.9,10.6,-27.6,12,-23.8Z" 
         transform="translate(100 100)" 
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          fill={theme.palette.primary.main}
          d="M12,-23.8C13.4,-20,11.1,-12.5,16.1,-7.9C21.1,-3.3,33.6,-1.7,32.9,-0.4C32.2,0.8,18.3,1.7,18.6,15.6C19,29.5,33.6,56.5,32.8,65.8C32.1,75.2,16.1,67,4.4,59.3C-7.2,51.7,-14.5,44.6,-15.7,35.6C-17,26.5,-12.3,15.5,-9.8,9.2C-7.3,2.9,-7,1.5,-15.2,-4.7C-23.3,-10.9,-40,-21.8,-42.7,-28.4C-45.3,-34.9,-34,-37.2,-24.6,-36.4C-15.2,-35.6,-7.6,-31.9,-1.2,-29.9C5.3,-27.9,10.6,-27.6,12,-23.8Z" 
          transform="translate(100 100)" 
        //  d='M7.77295 16.3566L23.6563 0H32V6.88383C32 6.88383 31.8262 9.17836 30.6591 10.4057L19.7824 22H13.6938L7.77295 16.3566Z'
        />
        */