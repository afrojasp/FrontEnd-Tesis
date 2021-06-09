import React, { useState } from 'react'
import { Alert } from 'react-bootstrap'

import {DivAlert} from './styles'

export const AlertExitosa = (props) => {
  
    if (props.show) {
      return (
          <DivAlert>
                <Alert variant="success" onClose={props.handler} dismissible>
                    {props.text}
                </Alert>
          </DivAlert>
        
      );
    }
    else{
        return null
    }
}