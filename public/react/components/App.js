import React, { useState, useEffect } from 'react';
import { SaucesList} from './SaucesList';
import { ItemsList} from './ItemsList';
import { Quote } from './Quote';
import { AddEditQuote } from './AddEditQuote';
import { UpdateItem } from './UpdateItem';

import { AddItem} from './AddItem';


// import and prepend the api url to any fetch calls
//
import apiURL from '../api';

export const App = () => {

	
	const [quotes, setQuotes] = useState([]);
	// const [singleViewQuote, setSingleViewQuote] = useState(null);
	// const [isAddingItem, setIsAddingItem] = useState(false);
	// const [isDeleted, setIsDeleted] = useState(false);
	// const [isUpdating, setIsUpdating] = useState(false);

	// async function fetchQuotes(){
	// 	try {
	// 		console.log(apiURL);
	// 		const response = await fetch(`${apiURL}/quotes/all`);
	// 		const quoteData = await response.json();
			
	// 		setQuotes(quoteData);
	// 		// setQuote(quoteData[0])
	// 		console.log("fetch quotes",quoteData);

	// 	} catch (err) {
	// 		console.log("Oh no an error! ", err)
	// 	}
	// }

	// async function fetchSingleItem(id){
	// 	try {
	// 	  const response = await fetch(`${apiURL}/items/${id}`);
	// 	  const item = await response.json();
	// 	  setSingleViewItem(item);
	// 	} catch (err) {
	// 	  console.log("Oh no an error! ", err);
	// 	}
	//   }

	// useEffect(() => {
	// 	fetchSauces();
	// }, []);

	// useEffect(() => {
	// 	fetchQuotes();
	// }, []);

	return (
		<main>	
	  {/* <h1>Spongebob Quote Generator</h1>
	  {isUpdating ? (
	  	<UpdateItem props={singleViewItem} setIsUpdating={setIsUpdating} isUpdating={isUpdating} setSingleViewItem={setSingleViewItem}/>
	  ) : isAddingItem ? (
		<AddItem setIsAddingItem={setIsAddingItem}/>
	  ) : quote ? (
		<Quote quote={quote} setQuote={setQuote} isDeleted={isDeleted} setIsDeleted={setIsDeleted} isUpdating={isUpdating} setIsUpdating={setIsUpdating}/> 
	  ) : (
			<div id="items"><ItemsList items={items} handleClick={fetchSingleItem} setIsAddingItem={setIsAddingItem}/></div>
	  )} */}
	  <Quote />
		</main>
	)
}