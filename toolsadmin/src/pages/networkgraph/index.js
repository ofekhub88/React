// ** MUI Imports


import { csrftoken , config } from "src/configs/Config"
import {  useEffect,useState } from 'react'
import authConfig from 'src/configs/auth'
import { data } from "./data"
import dynamic from 'next/dynamic'

import Graph  from "./graph";

const  NetworkGraph = () => {    

  return (
    <div >
      <Graph signalData={data} />
    </div>
  );
}
//<Graph signalData={data} />

export default NetworkGraph


