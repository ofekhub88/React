// ** MUI Imports
import { csrftoken , config } from "../../../Config"

import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Dialog, { DialogProps } from '@mui/material/Dialog'
import DialogContentText from '@mui/material/DialogContentText'

// ** MUI Imports
import Box from '@mui/material/Box'
import TreeView from '@mui/lab/TreeView'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import TreeItem from '@mui/lab/TreeItem'
import {useEffect,useState} from 'react'
import NavEdit from "../../form/nav_edit";

import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
// ** Custom Icon Import
import Icon from 'src/@core/components/icon'

// Styled TreeItem component
const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  '&:hover > .MuiTreeItem-content:not(.Mui-selected)': {
    backgroundColor: theme.palette.action.hover
  },
  '& .MuiTreeItem-content': {
    paddingRight: theme.spacing(3),
    borderTopRightRadius: theme.spacing(4),
    borderBottomRightRadius: theme.spacing(4),
    fontWeight: theme.typography.fontWeightMedium
  },
  '& .MuiTreeItem-label': {
    fontWeight: 'inherit',
    paddingRight: theme.spacing(6)
  },
  '& .MuiTreeItem-group': {
    marginLeft: 0,
    '& .MuiTreeItem-content': {
      paddingLeft: theme.spacing(4),
      fontWeight: theme.typography.fontWeightRegular
    }
  }
}))

const StyledTreeItem = props => {
  // ** Props
  const { labelText, labelIcon, labelInfo, ...other } = props

  return (
    <StyledTreeItemRoot
      {...other}
      label={
        <Box sx={{ py: 1, display: 'flex', alignItems: 'center', '& svg': { mr: 1 } }}>
          <Icon icon={labelIcon} color='inherit' />
          <Typography variant='body2' sx={{ flexGrow: 1, fontWeight: 'inherit' }}>
            {labelText}
          </Typography>
          {labelInfo ? (
            <Typography variant='caption' color='inherit'>
              {labelInfo}
            </Typography>
          ) : null}
        </Box>
      }
    />
  )
}



const Navigator = () => {
  const [menuItems,setMenuItems] = useState()
  const [nodeId,setNodeID] = useState(null)
  const url = config.API_SERVER+"/nav_edit"
  const [open, setOpen] = useState(false)

  useEffect(() => {
      fetch(url,config.requestOptions).then(response =>  response.json()).
      then((data) => {
      const menuArray = data; 
      setMenuItems(menuArray)
    }).catch((err) => console.log(err));
  }, [])

  const handleNodeSelect = (e,node) =>{
    console.log(node)
       setNodeID(node)
  }
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => setOpen(false)
  const NodeList={}
  const build_tree = (tree) => {
       return( 
                tree.map((item) => item.children ? 
                  <StyledTreeItem key={item.id} nodeId={item.id.toString()} labelText={item.title} labelIcon={item.icon} > 
                    {build_tree(item.children)}
                  </StyledTreeItem> :
                  
                  <StyledTreeItem key={item.id}  nodeId={item.id.toString()} labelText={item.title} labelIcon={item.icon} />
                ) 
             );
      
}
  return ( 
      <div>
      <Card>
      <CardHeader title='navigator view' />
    <TreeView
      defaultExpanded={['3']}
      sx={{ minHeight: 240 }}
      defaultExpandIcon={<Icon icon='tabler:chevron-right'/>}
      defaultCollapseIcon={<Icon icon='tabler:chevron-down' />}
      onNodeSelect={(e,node)=> handleNodeSelect(e,node)}
    >
      {menuItems &&  build_tree(menuItems)} 

    </TreeView>
    <CardActions>
          <Button disabled={nodeId === null} size='small' type='submit' sx={{ mr: 2 }} variant='contained' onClick={e => handleClickOpen()}>
            Edit node
          </Button>
        <Button size='small' type='submit' sx={{ mr: 2 }} variant='contained'>
            Add Node
          </Button>
        </CardActions>
    </Card>
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'
      >
        <DialogContent >
           <NavEdit handleClose={handleClose} nodeid={nodeId}/>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Navigator

