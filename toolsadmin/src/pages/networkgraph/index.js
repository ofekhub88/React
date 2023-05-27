
//import { Graph } from "react-d3-graph";
import  { useState,useEffect } from "react";
import {  net_config}  from "./config";
import data from "./data";
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


const netwotkgraph = () => {

const [d3_graph,setD3_graph] = useState(null)
const [graph,setGraph] = useState(()=>{return(null)})
const [data,setData] = useState({})
const [nodes,setNodes] = useState([])
const [selectedNodes,setSelectedNodes] = useState({})
const [dialog, setDialog] = useState({open: false,title: "",text: "",
                                      position: {top: 0, left: 0}})
const url  = config.API_SERVER+"/resources_net"



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




useEffect(() => {
    // declare the data fetching function
     
    import('react-d3-graph')
    .then(module => {
      // use the exports of the module
      const {Graph} = module;
     
      if (selectedNodes.nodes) { 
        selectedNodes.nodes[1].coclor="red"
      setGraph(()=>{return(
        <Graph id="graph" 
              config={net_config}
              data={selectedNodes} 
              onClickNode={events.onClickNode}
              onRightClickNode={evenets.onRightClickNode(e, node,setDialog)}
                 />
        )})
      }
         ;
      //console.log(result);
    })
    .catch(error => {
      console.log('Failed to load module:', error);
    });
    
    }, [selectedNodes]);



const [nodeName, setNodeName] = useState([] );
  

const handleListChange = (e,value) =>{
      e.preventDefault();
  //let new_node = {...node}
  //new_node[item] = value
     const l_nodes = Object.keys(value).map(key => value[key].id)
     let filtered_data = {nodes:[],links:[]}
     filtered_data.links = data.links.filter(link => l_nodes.includes(link.source) ||  l_nodes.includes(link.target))
     let nodes_list = []
     filtered_data.links.map(link => {
      nodes_list = [...nodes_list,link.source,link.target]
     })   
     filtered_data.nodes = data.nodes.filter(node => nodes_list.includes(node.id) || l_nodes.includes(node.id))
     setSelectedNodes({...filtered_data})
}


const handleMenuOptionClick = (option) => {
  console.log(`Selected option: ${option}`);
  // Perform custom action based on the selected option
  // ...

  setModalIsOpen(false);
};

return ( <div>
       <Card sx={{   height: 800}}>
      <Autocomplete
       sx={{ width: 500 }}
      multiple
      id="tags-standard"
      options={nodes? nodes : [{title: "No"}]}
      onChange={(e,value) =>   handleListChange(e,value)}
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
          placeholder="Select resource Name"
        />
        )}
        />
      {graph}


           <Dialog sx={{
                position: 'fixed', top: dialog.position.top, left: dialog.position.left  
                  }}
           open={dialog.open}
           keepMounted
          // onClose={() => handleLocalClose()}
           aria-describedby="alert-dialog-slide-description"
           >
           <DialogTitle>{dialog.title}</DialogTitle>
           <DialogContent>
           <DialogContentText id="alert-dialog-slide-description">
                 dialog.text
           </DialogContentText>
           </DialogContent>
           <DialogActions>

           </DialogActions>
           </Dialog>
   </Card>
 </div>
)


}
export default netwotkgraph