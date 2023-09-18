import { Spinner } from "react-bootstrap";

import React from 'react'

function Loader() {
  return (
    <div>
        <Spinner animation="border"
        role="status"
        style={{
            width:'100px',
            height:'100px',
            margin:'auto',
            display:'block'
        }}>
            
        </Spinner>
    </div>
  )
}

export default Loader