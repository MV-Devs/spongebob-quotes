import React, {useState, useEffect} from 'react';
import image from "../img/spongebob-desktop-background.jpg"; 
import apiURL from '../api';
import LoginPage from './LoginPage';

export const Quote = () => {
  const [quote, setQuote] = useState('');
  const [name, setName] = useState('');
  const [quotes, setQuotes] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function fetchQuotes(){
		try {
			console.log(apiURL);
			const response = await fetch(`${apiURL}/quotes/all`);
			const quoteData = await response.json();
			//change
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

    const handleLogin = (user) =>{
        setIsLoggedIn
    }

    if (!isLoggedIn) {
        return <LoginPage onLogin={handleLogin} />
    }
 
    // const result = RandomQuote(quotes)
    // console.log(result)
    return <>
    <div style={{ backgroundImage: `url(${image})` }}>
  
      <h3 className="quote"> Quote: {quote}</h3>
      <p className="characterInfo">Character: {name}</p>
      {/* <img src={props.item.image} onClick={() => props.handleClick(props.item.id)}/> */}
      <div id="newQuoteButton"><button onClick={() => getRandomQuote(quotes)} >Click for A New Quote</button></div>
</div>
      {/* <div className="spongebobBackground" style={{ backgroundImage:`url(${image})`,backgroundRepeat:"no-repeat" }}>
        Welcome to the Spongebob Quote App
      </div> */}
      {
        // quotes.map((quote, idx) => {
        //   return <Quote quote={quote} key={idx} handleClick={handleClick} />
        // })
        // loop through quotes and when you press the button show an ew quote
      }
    </>
  } 