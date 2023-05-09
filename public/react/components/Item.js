import React from 'react';

export const Item = (props) => {

    return <>
      <h3 class="itemsInfo">{props.item.title} ${props.item.price}</h3>
      <p class="itemsInfo">Click on image for more details</p>
      <img src={props.item.image} onClick={() => props.handleClick(props.item.id)}/>
    </>
  } 