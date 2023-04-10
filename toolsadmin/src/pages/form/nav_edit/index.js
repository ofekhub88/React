// ** React Imports
import { forwardRef, useState ,useEffect} from 'react'
import { csrftoken , config } from "../../../Config"

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
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




const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Birth Date' autoComplete='off' />
})

const NavEdit = ({nodeid,handleClose}) => {
  // ** States
  const [date, setDate] = useState(null)
  const [icons,setIcons] =  useState(listIcons(''))
  const [node,setNode] =  useState({})
  const [origenNode,setOrigenNode] =  useState({})

  const url = config.API_SERVER+"/nav_edit"
  const [open, setOpen] = useState(false)
  useEffect(() => {
      nodeid &&
      fetch(url+"?nodeid="+nodeid,config.requestOptions).
      then(response =>  response.json()).
      then((data) => {
      setNode(data)
      setOrigenNode(data)
    }).catch((err) => console.log(err));
  }, [])
 

  const handleSubmit = (() => {
    if (nodeid) {
         let putRequestOptions = {...config.requestOptions}
         putRequestOptions["method"] = "PUT"
         putRequestOptions["body"] = JSON.stringify(node)
         console.log(putRequestOptions)
         fetch(url,putRequestOptions).
         then(response =>  response.json()).
         then((data) => {
       }).catch((err) => console.log(err));
     } else {
      let putRequestOptions = {...config.requestOptions}
      putRequestOptions["method"] = "POST"
      putRequestOptions["body"] = JSON.stringify(node)
      fetch(url,putRequestOptions).
      then(response =>  response.json()).
      then((data) => {
      console.log(data)
    }).catch((err) => console.log(err));
     }
    return(handleClose)
})



 // id, order_nav, parent_id, icon, "path", title, "action", subject, disabled, , "openInNewTab", "badgeColor", , 

  const textFileds  =  ["title","path", "subject",
                        "tooltip","badgeContent","action"]
  const rquiredList = ["title"]
  const TrueFalse   = ["disabled", "openInNewTab","externalLink"]
  const filedList   = {badgeColor: ['default' , 'primary' , 
                                  'secondary' , 'success' , 'error' , 
                                  'warning' , 'info' ]}

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

  return (
    <Card>
      <CardHeader title='Edit Menue' />
      <Divider sx={{ m: '0 !important' }} />
      <form onSubmit={e => e.preventDefault()}>
        <CardContent>
          <Grid container spacing={5}> 
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                item info
              </Typography>
            </Grid>
            { textFileds.map((item,i) => 
            <Grid item xs={12} sm={6}>
              <TextField required={rquiredList.includes(item)} defaultValue={node[item]} value={node[item]} onChange={e => handleTextChange(e,item) } fullWidth label={item} key={i} />
            </Grid>)}
            <Grid item xs={6} sm={4}>
            <FormGroup row sx={{ mt: 4 }}>
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
          <Button disabled={ origenNode === node } size='large' type='submit' sx={{ mr: 2 }} variant='contained' onClick={() => handleSubmit()}>
            Submit
          </Button>
          <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained' onClick={() => handleClose()}>
            Cancel
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}

export default NavEdit
