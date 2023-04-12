import * as React from 'react';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';




const  AlertDialogSlide = (props) => {
  return (
   
        <DialogContent>
            
          <DialogContentText id="alert-dialog-slide-description">
            {props.text}
          </DialogContentText>
          
 
        </DialogContent>

       
  );
}

export default  AlertDialogSlide