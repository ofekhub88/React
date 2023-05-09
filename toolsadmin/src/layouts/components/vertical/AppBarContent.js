// ** MUI Imports
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Components
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from 'src/customized/layouts/components/shared-components/UserDropdown'
import LogoLight from "public/images/ChiLogoLight.gif"
import LogoDark from "public/images/ChiLogoDark.gif"
const AppBarContent = props => {
  // ** Props
  const { hidden, settings, saveSettings, toggleNavVisibility } = props

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      
      <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'right' }}>
      
        {hidden ? (
          <IconButton color='inherit' sx={{ ml: 2.75 }} onClick={toggleNavVisibility}>
            <Icon fontSize='1.5rem' icon='tabler:menu-2' />
          </IconButton>
        ) : null}

<Box sx={{ display: 'flex', alignItems: 'left' }}>
        <img src={settings.mode === "dark"? LogoLight.src: LogoDark.src} className="App-logo" alt='logo' width='250' height='50' />
        <Typography variant='h6' sx={{ ml: 2 }}>
          
        </Typography>
    </Box>
      </Box>
            
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
      <ModeToggler settings={settings} saveSettings={saveSettings} />
        <UserDropdown settings={settings} />
      </Box>
    </Box>
  )
}

export default AppBarContent
