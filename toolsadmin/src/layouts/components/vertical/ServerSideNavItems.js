// ** React Imports
import { useEffect, useState } from 'react'
import { csrftoken , config } from "../../../Config"
// ** Axios Import
import axios from 'axios'

const ServerSideNavItems = () => {
  // ** State
  const [menuItems, setMenuItems] = useState([])
  const url = config.API_SERVER+"/navigator"

  useEffect(() => {
    //axios.get('/api/vertical-nav/data').then(response => {
      fetch(url,config.requestOptions).then(response =>  response.json()).
      then((data) => {
      const menuArray = data; 
      setMenuItems(menuArray)
    }).catch((err) => console.log(err));
  }, [])

  return { menuItems }
}

export default ServerSideNavItems
