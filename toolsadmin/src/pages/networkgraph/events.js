import jwt_decode from "jwt-decode";
import authConfig from 'src/configs/auth'
import { csrftoken , config } from "src/configs/Config"


const RequestOptions = {...config.requestOptions}


export  const onClickNode = (nodeId, node) => {
    alert('Clicked node '+node.id);
};


export  const addFavourite = (dialog,setDialog,setUserData,userData) => {
    
    console.log(userData);

    
    if (userData.favourite_resources === "") {
       userData.favourite_resources = dialog.id
    } else {
       userData.favourite_resources =  (userData.favourite_resources+","+dialog.id).split(',')
       userData.favourite_resources = userData.favourite_resources.filter((value, index, self) => self.indexOf(value) === index);
       userData.favourite_resources = userData.favourite_resources.join(',');
    }
    RequestOptions["method"] = "PUT"
    RequestOptions["body"]= JSON.stringify({
                             "id": userData.username,
                             "fullName": userData.fullName,
                             "email":  userData.email,
                             "favourite_resources":  userData.favourite_resources
                          }) 
           fetch(authConfig.userEndpoint,RequestOptions).
            then( response =>  {
                window.localStorage.setItem('userData',JSON.stringify(userData))
                console.log(response.statusText)
                setUserData( {...userData})
                setDialog( {...dialog, open: false})  
              })
              .catch((err) => {
                console.log(err)
                setDialog( {...dialog, open: false})  
              })
        
        

}



