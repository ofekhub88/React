
//import { Graph } from "react-d3-graph";
import  { useState,useEffect } from "react";
import {  net_config}  from "./config";
import { csrftoken , config } from "src/configs/Config"
import Icon from 'src/@core/components/icon'
//import Graph from 'react-d3-graph';
//import EGraph from "./graph"
//import loadable from '@loadable/component'
//const Graph = loadable(() => import('./graph'))
// Serach componnets
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

//import dynamic from 'next/dynamic';
//const EGraph = dynamic(() => import('./graph'), {
//    ssr: false
//   });
import ocp from "public/images/network/ocp.png";
import jenkins from "public/images/network/jenkins.png";
import bitbucket from "public/images/network/bitbucket.png";
import sonar from "public/images/network/sonar.png";
import nexus from "public/images/network/nexus.png";
import jfrog from "public/images/network/jfrog.png";
import Card from '@mui/material/Card';

import * as events from './events'

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Grid from '@mui/material/Grid'
import FormControlLabel from '@mui/material/FormControlLabel'
// ** MUI Imports


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

import jwt_decode from "jwt-decode";
import authConfig from 'src/configs/auth'


const netwotkgraph = () => {

const [d3_graph,setD3_graph] = useState(null)
const [graph,setGraph] = useState(()=>{return(null)})
const [data,setData] = useState({})
const [nodes,setNodes] = useState([])
const [selectedNodes,setSelectedNodes] = useState({nodes:[],links:[]})
const [selectedResources,setSelectedResources] = useState([])
const [dialog, setDialog] = useState({open: false,title: "",text: "",id: null,
                                      position: {top: 0, left: 0}})
const [userData,setUserData] =  useState(JSON.parse(window.localStorage.getItem('userData')))
const [favourite_checked,setFavourite_checked] = useState(false)
const url  = config.API_SERVER+"/resources_net"

const favourite_resources = userData.favourite_resources.split(",")

useEffect(() => {
        fetch(url,config.requestOptions).then(response =>  response.json()).
        then((data) => {
        let db_data = {...data}
        db_data["nodes"].map((node,i) => {
          switch (node.svg){
            case  "jenkins":
              db_data["nodes"][i].svg = jenkins.src;
              break;
            case  "nexus":
              db_data["nodes"][i].svg = nexus.src;
              break;
            case  "sonar":
              db_data["nodes"][i].svg = sonar.src;
              break;
            case  "bitbucket":
              db_data["nodes"][i].svg = bitbucket.src;
              break;
            case  "ocp":
                db_data["nodes"][i].svg = ocp.src;
                break;
            default:
              db_data["nodes"][i].svg = ocp.src;
          }
         
        } )
        setNodes(db_data.nodes)
        setData({...db_data})
        }).catch((err) => console.log(err));
}, [])

const  onRightClickNode = ((e, node) =>  { 
  e.preventDefault();     
  console.log(e);
  setDialog({open: true,title: "select option",id: node,
             position: {top: -e.clientY , left: -e.clientX }})
})



useEffect(() => {
    // declare the data fetching function
     
    import('react-d3-graph')
    .then(module => {
      // use the exports of the module
      const {Graph} = module;
     
 
      setGraph(()=>{return(
        <Graph id="graph" 
              config={net_config}
              data={selectedNodes} 
              onClickNode={events.onClickNode}
              onRightClickNode={onRightClickNode}
                 />
        )})
      
         ;
      //console.log(result);
    })
    .catch(error => {
      console.log('Failed to load module:', error);
    });
    
    }, [selectedNodes]);

const filter_nodes = (value => {

  if ( !value ) {
    setSelectedNodes({...filtered_data})
    return(null)
}
  let l_nodes = []
  l_nodes = !value? [] : value.filter((n, index, self) => self.indexOf(n) === index)
  let filtered_data = {nodes:[],links:[]}

  if ( !value ) {
    setSelectedNodes({...filtered_data})
    return(null)
}
  filtered_data.links = data.links.filter(link => l_nodes.includes(link.source) ||  l_nodes.includes(link.target))
  let nodes_list = []
  filtered_data.links.map(link => {
   nodes_list = [...nodes_list,link.source,link.target]
  })   
  filtered_data.nodes = data.nodes.filter(node => nodes_list.includes(node.id) || l_nodes.includes(node.id))
  setSelectedNodes({...filtered_data})
})



const handleListChange = (e,value,item) =>{
        e.preventDefault();
        if (item === 'list') {
          setSelectedResources(Object.keys(value).map(key => value[key].id))
        favourite_checked?  filter_nodes([...selectedResources,...favourite_resources]) : filter_nodes(selectedResourcess)
        } else {
           setFavourite_checked(e.target.checked)
           e.target.checked? 
           filter_nodes([...favourite_resources,...selectedResources])
           :
           filter_nodes(selectedResources)
        }
}




return ( <div>
      
       <Card sx={{   height: 800}}>
       <Grid  container  alignItems="center">
           
      <Autocomplete
       sx={{ width: 500 }}
      multiple
      id="tags-standard"
      options={nodes? nodes : [{title: "No"}]}
      onChange={(e,value) =>   handleListChange(e,value,'list')}
      getOptionLabel={(option) => option.title}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          <img  loading="lazy"  width="20"  src={option.svg} /> {option.Name} 
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          label="selected resource name"
          placeholder="Select resource name"
        />
        
        )}
        
        />
         <FormControlLabel  checked={favourite_checked} onChange={e => handleListChange(e,'0','favourite') } label="Show my favourite resources " control={<Checkbox />} labelPlacement='end' sx={{ mr: 4 }}  key="check"/>
         </Grid>
       

      {graph}


           <Dialog style={{
                 top: -dialog.position.top, left: -dialog.position.left  
                  }}
           open={dialog.open}
           keepMounted
          // onClose={() => handleLocalClose()}
           aria-describedby="alert-dialog-slide-description"
           >
           <DialogTitle>{dialog.title}</DialogTitle>
           <DialogContent>
                  
        <List>
          <ListItem disablePadding>
          <ListItemButton   onClick={() => events.addFavourite({...dialog},setDialog, setUserData,{...userData})}>
              <ListItemText primary="Add to my favourite" />
              </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton   onClick={() => setDialog({...dialog,open: false})}>
              <ListItemText primary="Exit" />
              </ListItemButton>
          </ListItem>
        </List>
           </DialogContent>
           <DialogActions>
           </DialogActions>
           </Dialog>
   </Card>
 </div>
)


}
export default netwotkgraph