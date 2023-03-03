import React from 'react'
import * as C from './style'
export const Header = ({title}) => {
  return (
    <C.Header>
        <C.Title>{title}</C.Title>
    </C.Header>
  )
}

