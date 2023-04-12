// ** MUI Imports
import { csrftoken , config } from "../../../Config"

import DialogTitle from '@mui/material/DialogTitle'

import DialogActions from '@mui/material/DialogActions'
import Dialog, { DialogProps } from '@mui/material/Dialog'
import DialogContentText from '@mui/material/DialogContentText'
import AlertDialogSlide from  "../../form/dialog_alert"
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
    marginLeft: 4,
    '& .MuiTreeItem-content': {
      paddingLeft: theme.spacing(3),
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
        <Box sx={{ py: 2, display: 'flex', alignItems: 'center', '& svg': { mr: 1} }}>
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
  const [navState,setNavState] = useState({ menuItems : [],
                                    nodeId: null,
                                    open: false,
                                    newNode: true,
                                    parent_id: null,
                                    children: null
                                    })

  const [counter,setCounter] = useState(0)
  const url = config.API_SERVER+"/nav_edit"

  useEffect(() => {
      fetch(url,config.requestOptions).then(response =>  response.json()).
      then((data) => {
      const menuArray = data; 
      setNavState({...navState,menuItems: menuArray})
    }).catch((err) => console.log(err));
  }, [counter])

  const handleNodeSelect = (e,node) =>{
       const id = node.split(":")[0]
       const path = node.split(":")[1]
       const children = node.split(":")[2]
       setNavState({...navState,nodeId: id,newNode: path !== "undefined",children: children })
  }
  const handleClickOpen = (mode) => {
    setNavState({...navState,open: true})
  }

  const handleAddNode = () => {
    setNavState({...navState,parent_id: navState.nodeId})
    setNavState({...navState,nodeId: null,open: true})
  }
  const handleClose = () => setNavState({...navState,open: false})
  const NodeList={}
  const build_tree = (tree) => {
       return( 
                tree.map((item) => item.children ? 
                  <StyledTreeItem key={item.id} nodeId={item.id.toString()+":"+ item.path+":Y"} labelText={item.title+ (item.path? " -> "+item.path: "")} labelIcon={item.icon} > 
                    {build_tree(item.children)}
                  </StyledTreeItem> :         
                  <StyledTreeItem key={item.id}  nodeId={item.id.toString()+":"+item.path+":N"} labelText={item.title + (item.path? " -> "+item.path: "")} labelIcon={item.icon} />
                ) 
             );
      
}
  return ( 
      <div>
      <Card>
      <CardHeader title='navigator view' />
    <TreeView
      defaultExpanded={[0]}
      sx={{ minHeight: 240 }}
      defaultExpandIcon={<Icon icon='tabler:chevron-right'/>}
      defaultCollapseIcon={<Icon icon='tabler:chevron-down' />}
      onNodeSelect={(e,node)=> handleNodeSelect(e,node)}
    >
      <StyledTreeItem  key="0" nodeId={"0:undefined"} labelText="Root" >
      {navState.menuItems &&  build_tree(navState.menuItems)} 
      </StyledTreeItem>
    </TreeView>
    <CardActions>  
    
          <Button disabled={[null,"0"].includes(navState.nodeId) } size='small' type='submit' sx={{ mr: 2 }} variant='contained' onClick={e => handleClickOpen("Edit")}>
            Edit node
          </Button>
        <Button disabled={navState.newNode} size='small' type='submit' sx={{ mr: 2 }} variant='contained' onClick={e => handleAddNode()}>
            Add Node
          </Button>
        </CardActions>
    </Card>
    <Dialog
        open={navState.open}
        onClose={handleClose}
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'
      >
        
          <NavEdit handleClose={handleClose} navState={navState} UpdateCounter={{u:setCounter ,c: counter}} />
        
      </Dialog>
    </div>
  )
}

export default Navigator

