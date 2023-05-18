import React, {useState, useEffect} from 'react';
import apiURL from '../api';

export const Quote = () => {
  const [quote, setQuote] = useState('');
  const [name, setName] = useState('');
  const [quotes, setQuotes] = useState([]);
  
  async function fetchQuotes(){
		try {
			console.log(apiURL);
			const response = await fetch(`${apiURL}/quotes/all`);
			const quoteData = await response.json();
			
			setQuotes(quoteData);
      getRandomQuote(quoteData);
			// setQuote(quoteData[0])
			console.log("fetch quotes",quoteData);

		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	}
  useEffect(() => {
		fetchQuotes();
	}, []);
  
    const getRandomQuote = (quotes) =>{
      if (quotes.length > 0){
        console.log("prop quotes", quotes);
        const randomQuoteIndex = Math.floor(Math.random() * quotes.length);
        const item = quotes[randomQuoteIndex];
        console.log(item);
        setQuote(item.quote);
        setName(item.name);
      }
    }
 
    // const result = RandomQuote(quotes)
    // console.log(result)
    return <>
      <h3 className="quote"> quote:{quote}</h3>
      <p className="itemsInfo">character name:{name}</p>
      {/* <img src={props.item.image} onClick={() => props.handleClick(props.item.id)}/> */}
      <div id="newQuoteButton"><button onClick={() => getRandomQuote(quotes)} >New Quote</button></div>
      {
        // quotes.map((quote, idx) => {
        //   return <Quote quote={quote} key={idx} handleClick={handleClick} />
        // })
        // loop through quotes and when you press the button show an ew quote
      }
    </>
  } 