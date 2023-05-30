
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CircularProgress from '@mui/material/CircularProgress';


import  { useState,useEffect } from "react";
import { csrftoken , config } from "src/configs/Config"
import jwt_decode from "jwt-decode";
import authConfig from 'src/configs/auth'
import Icon from 'src/@core/components/icon'
// Images
import ocp from "public/images/network/ocp.png";
import jenkins from "public/images/network/jenkins.png";
import bitbucket from "public/images/network/bitbucket.png";
import sonar from "public/images/network/sonar.png";
import nexus from "public/images/network/nexus.png";
import jfrog from "public/images/network/jfrog.png";


function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export default function TransferList() {

  const [nodes,setNodes] = useState([])
  const [leftSelected,setLeftSelected] = useState([]);
  const [rightSelected,setRightSelected] = useState([]);
  const [userData,setUserData] =  useState(JSON.parse(window.localStorage.getItem('userData')))

  
  const favourite_resources = userData.favourite_resources.split(",")
  const RequestOptions = {...config.requestOptions}

  useEffect(() => {
    const url  = config.API_SERVER+"/resources_net"
    RequestOptions["method"] = "GET"
    fetch(url,RequestOptions).then(response =>  response.json()).
    then((data) => {
    let db_nodes = data.nodes
    
    db_nodes.map((node,i) => {
      switch (node.svg){
        case  "jenkins":
            db_nodes[i].svg = jenkins.src;
          break;
        case  "nexus":
            db_nodes[i].svg = nexus.src;
          break;
        case  "sonar":
            db_nodes[i].svg = sonar.src;
          break;
        case  "bitbucket":
            db_nodes[i].svg = bitbucket.src;
          break;
        case  "ocp":
            db_nodes[i].svg = ocp.src;
            break;
        default:
            db_nodes[i].svg = ocp.src;
      }
     
    } )
    setNodes([...db_nodes])
    }).catch((err) => console.log(err));
}, [])

if ( nodes.length === 0 ) {
    return (<CircularProgress />)
}


const handleRightToggle = (e =>  {
       
    //e.preventDefault();     
    const { options } = e.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }   
    setRightSelected(value)
  }
  )

  const handleLeftToggle = ((e,value) =>  {
       
    e.preventDefault();
    if (value) {
        setLeftSelected(value)
    }   
    
  }

  )
  const handleAllRight = () => {
  //  setRight(right.concat(left));
  //  setLeft([]);
  };

const handleSelectedRight = () => {
     const tmpuserData = {...userData}
     tmpuserData.favourite_resources = tmpuserData.favourite_resources.split(',').filter(id => !rightSelected.includes(id.toString()) ).join(',');
     RequestOptions["method"] = "PUT"
     RequestOptions["body"]= JSON.stringify({
                              "id": userData.username,
                              "fullName": userData.fullName,
                              "email":  userData.email,
                              "favourite_resources":  tmpuserData.favourite_resources
                           }) 
     fetch(authConfig.userEndpoint,RequestOptions).
             then( response =>  {
                 window.localStorage.setItem('userData',JSON.stringify(tmpuserData))
                 setUserData( {...tmpuserData})
                 setRightSelected([])
               })
               .catch((err) => {
                 console.log(err)  
               })
 
  };

  const handleSelectedLeft = () => {
    const tmpuserData = {...userData}
    let selected_nodes = leftSelected.map(node => node.id)
    selected_nodes = selected_nodes.filter(id => !tmpuserData.favourite_resources.split(',').
                     includes(id.toString()))
    selected_nodes  = selected_nodes.concat(favourite_resources)
    tmpuserData.favourite_resources = selected_nodes.join(',')
    console.log(userData.favourite_resources)
    console.log(leftSelected)
    console.log(tmpuserData.favourite_resources)
    RequestOptions["method"] = "PUT"
    RequestOptions["body"]= JSON.stringify({
                             "id": userData.username,
                             "fullName": userData.fullName,
                             "email":  userData.email,
                             "favourite_resources":  tmpuserData.favourite_resources
                          }) 
    fetch(authConfig.userEndpoint,RequestOptions).
            then( response =>  {
                window.localStorage.setItem('userData',JSON.stringify(tmpuserData))
                setUserData( {...tmpuserData})
                setLeftSelected([])
              })
              .catch((err) => {
                console.log(err)  
              })
  };


  const RightList = (favourite_list => {
    return(
    <Paper sx={{ width: 400, height: 300, overflow: 'auto' }}>
      <FormControl sx={{ m: 1, minWidth: 200, maxWidth: 400 }}>
        <InputLabel shrink sx={{ m: 2}}  htmlFor="select-multiple-native">
        Your favourite resources
        </InputLabel>
        <Select
          multiple
          native
          value={rightSelected}
          
          onChange= {e => handleRightToggle(e)}
          label="Native"
          inputProps={{
            id: 'select-multiple-native',
          }}
        >
          {favourite_list.map((id) => (
            <option key={id} value={id}>
              {nodes.filter(node => node.id === id.toString())[0]["Name"]}
            </option>
          ))}
        </Select>
      </FormControl>
    </Paper>)
  }
  );

const LeftList = (nodes => (
    <Paper sx={{ width: 400, height: 300, overflow: 'auto' }}>
    <Autocomplete
       sx={{ width: 380 }}
      multiple
      id="tags-standard"
      value={leftSelected}
      options={nodes? nodes : [{title: "No"}]}
      onChange={(e,value) =>   handleLeftToggle(e,value)}
      getOptionLabel={(option) => option.Name}
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
        /> )}
        />
        
    </Paper>
)

)

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item>
        {LeftList(nodes.filter(node => !favourite_resources.includes(node.id)))}
      </Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleSelectedLeft}
            disabled={leftSelected.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleSelectedRight}
            disabled={rightSelected.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllRight}
            disabled={!userData.favourite_resources}
            aria-label="move all left"
          >
            ≪
          </Button>
        </Grid>
      </Grid>
      <Grid item>
          { RightList(favourite_resources) }
      </Grid>
    </Grid>
  );
}