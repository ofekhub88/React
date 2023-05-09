// ** React Imports
import * as React from 'react';
import { forwardRef, useState ,useEffect} from 'react'
import { csrftoken , config } from "src/configs/Config"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// ** MUI Imports

import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Input from '@mui/material/Input'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Select from '@mui/material/Select'
import Icon from 'src/@core/components/icon'
import { listIcons } from '@iconify/react';
// ** Third Party Imports
import DatePicker from 'react-datepicker'
import Box from '@mui/material/Box'
import Autocomplete from '@mui/material/Autocomplete'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'





const NavEdit = ({navState,handleClose,UpdateCounter}) => {
  // ** States
  const [icons,setIcons] =  useState(listIcons(''))
  const [node,setNode] =  useState({})
  const [origenNode,setOrigenNode] =  useState({})
  const [dialog, setDialog] = useState({open: false,title: "",text: "",parent: "Y"})
  const url = config.API_SERVER+"/nav_edit"
 
  useEffect(() => {
      navState.nodeId &&
      fetch(url+"?nodeid="+navState.nodeId,config.requestOptions).
      then(response =>  response.json()).
      then((data) => {
      setNode(data)
      setOrigenNode(data)
    }).catch((err) => console.log(err));
  }, [])
  
  const handleSubmit = (() => {
    if (navState.nodeId) {
         let putRequestOptions = {...config.requestOptions}
         putRequestOptions["method"] = "PUT"
         putRequestOptions["body"] = JSON.stringify(node)
         fetch(url,putRequestOptions).
         then(response =>  response.json()).
         then((data) => {
          setDialog({...dialog,open:true,
            parent: "Y",
            title: "Update node",
            text: " Node id "+navState.nodeId+"updated scussefuly"});
       }).catch((err) => {
               setDialog({...dialog,open:true,
                                    parent: "Y",
                                     title: "Update node",
                                     text: err});
        console.log(err);
       });
     } else {
      let putRequestOptions = {...config.requestOptions}
      putRequestOptions["method"] = "POST"
      putRequestOptions["body"] = JSON.stringify(node)
      fetch(url,putRequestOptions).
      then(response =>  response.json()).
      then((data) => {
        setDialog({...dialog,open:true,
          parent: "Y",
          title: "New node",
        text: "New Node id added scussefuly"});
         }).catch((err) => {
         setDialog({...dialog,open:true, parent: "N",
           title: "New node",
         text: err})
         console.log(err)
         }
         );
     }
})



 // id, order_nav, parent_id, icon, "path", title, "action", subject, disabled, , "openInNewTab", "badgeColor", , 
 const parent_ids = (tree) => {
  let a= tree.map((item) => {
      if (item.path === undefined && String(item.id) !== navState.nodeId ){
        parnet_list[item.id] = item.title
      }
      if (item.children ) {
         parent_ids(item.children)
      } 
})
}
  const parnet_list = {0: "Root"}
  parent_ids(navState.menuItems)
  
  const textFileds  =  ["title","path", "subject",
                        "tooltip","badgeContent","action"]
  const rquiredList = ["title"]
  const TrueFalse   = ["disabled", "openInNewTab","externalLink"]
  const filedList   = [{name : "badgeColor",
                        options : ['default' , 'primary' , 
                                  'secondary' , 'success' , 'error' , 
                                  'warning' , 'info' ]},
                        {name: "parent_id",
                         options: parnet_list},
                        {name: "order_nav",
                         options: [...Array(20).keys()]
                        }        ]

  const handleTextChange = (e,item) =>{
    e.preventDefault();
    let new_node = {...node}
    new_node[item] = e.target.value
    setNode(new_node)
  }
  const handleCheckChange = (e,item) =>{
     e.preventDefault();
    let new_node = {...node}
    new_node[item] = e.target.checked
    setNode(new_node)
  }
  const handleListChange = (e,value,item) =>{
    e.preventDefault();
    let new_node = {...node}
    new_node[item] = value
    setNode(new_node)
  }
  const handleDelete = () =>{
   
    let putRequestOptions = {...config.requestOptions}
         putRequestOptions["method"] = "DELETE"
         fetch(url+"?nodeid="+navState.nodeId,putRequestOptions).
         then(response =>  response.json()).
         then((data) => {
          setDialog({...dialog,parent: "Y",
                 open:true,title: "Delete",
                 text: "Node id "+ navState.nodeId+ " deleted scussefuly"})
       }).catch((err) => {
        setDialog({...dialog,parent: "Y",
                   open:true,title: "Delete",
                 text: err});
        console.log(err)});
        UpdateCounter.u(UpdateCounter.c+1)
  }
  const handleLocalClose = () => {
    setDialog({...dialog,open: false})
    if (dialog.parent="Y") {
    UpdateCounter.u(UpdateCounter.c+1)
    return(handleClose())}
  }

  return (   <div>
    <DialogContent >
    <Card>
      
      <CardHeader title='Edit Menue' />
      <Divider sx={{ m: '0 !important' }} />
      <form onSubmit={e => e.preventDefault()}>
        <CardContent>
          <Grid container spacing={5}> 
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                Ndoe info
              </Typography>
            </Grid>
            { textFileds.map((item,i) => 
            <Grid item xs={12} sm={6}>
              <Input required={rquiredList.includes(item)}  value={node[item]} placeholder={item} onChange={e => handleTextChange(e,item) } fullWidth  variant="outlined" label={item} key={i} />
            </Grid>)}
              {filedList.map((item,i) =>
              <Grid item xs={6} sm={4}>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel>{item.name }</InputLabel>
                 <Select 
                     labelId="select-label"
                     key={i}
                     value={!node[item.name] && node[item.name] !== 0  ?"":node[item.name] }
                     label={item.name}
                     onChange= {e =>  handleListChange(e,e.target.value,item.name)}
                   >
                   { Array.isArray(item.options)? 
                     item.options.map(key => <MenuItem key={key} value={key}>{key}</MenuItem>)
                     :
                      Object.keys(item.options).map(key => <MenuItem key={key} value={key}>{item.options[key]}</MenuItem>)
                     
                     }
                   </Select>
                   </FormControl>
               </Grid>
              )}
            <Grid item xs={6} sm={20}>
            <FormGroup row sx={{ mt: 2 }}>
              {TrueFalse.map((item,i) =>
              <FormControlLabel  checked={node[item] === undefined? false: node[item]} onChange={e => handleCheckChange(e,item) } label={item} control={<Checkbox />} labelPlacement='end' sx={{ mr: 4 }}  key={i} />
              )}
            </FormGroup>
            
            </Grid>
            <Grid item xs={12}>
            </Grid>

            <Grid item xs={12} sm={5}>
            <Autocomplete
               options={icons? icons : [1,2]}
               id='icon'
               value={node["icon"] || ""}
               onChange={(e,value) =>   handleListChange(e,value,"icon")}
               getOptionLabel={iconname => iconname || "" }
               getOptionSelected={(option, value) => option.id === value.id}
               renderInput={params => <TextField {...params} label="icon name" />}
             />
           </Grid>
           <Grid item xs={12} sm={6}>
               <Icon icon={node["icon"]}  style={{margin: 15}}/>
           </Grid>
    
            
          </Grid>
        </CardContent>
        <CardActions>
          <Button disabled={ origenNode === node || ([!node.order_nav,!node.title,!node.parent_id].includes(true) && node.parent_id !== 0 )} size='large' type='submit' sx={{ mr: 2 }} variant='contained' onClick={() => handleSubmit()}>
            Submit
          </Button>
          <Button disabled={!node.id || navState.children === "Y" } size='large' type='submit' sx={{ mr: 2 }} variant='contained' onClick={() => handleDelete()}>
            delete
          </Button>
          <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained' onClick={() => handleClose()}>
            Cancel
          </Button>
        </CardActions>
      </form>
    </Card>
    </DialogContent>
 
    <Dialog
          open={dialog.open}
         keepMounted
       onClose={() => handleLocalClose()}
       aria-describedby="alert-dialog-slide-description"
       >
       <DialogTitle>{dialog.title}</DialogTitle>
       <DialogContent>
         <DialogContentText id="alert-dialog-slide-description">
                {dialog.text}
         </DialogContentText>
       </DialogContent>
       <DialogActions>
         <Button onClick={()=>  handleLocalClose()}> Close </Button>
       </DialogActions>
</Dialog>
    
  </div>
  )
}

export default NavEdit
