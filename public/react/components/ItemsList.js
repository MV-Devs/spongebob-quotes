import React from 'react';
import { Item } from './Quote';


export const ItemsList = ({items, handleClick,setIsAddingItem}) => {
	return <>
		<div id="addButton" ><button onClick={() => setIsAddingItem(true)} >Add a New Item</button></div>
		<div class="item">
		{
			items.map((item, idx) => {
				return <Item item={item} key={idx} handleClick={handleClick} />
			})
		}
		</div>
	</>
} 
