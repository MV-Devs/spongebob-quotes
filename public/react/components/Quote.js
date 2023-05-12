import React from 'react';

export const Quote = (props) => {

    return <>
      <h3 className="quote"> quote:{props.quote.quote}</h3>
      <p className="itemsInfo">character name:{props.quote.name}</p>
      {/* <img src={props.item.image} onClick={() => props.handleClick(props.item.id)}/> */}
      <div id="newQuoteButton" ><button onClick={() => setNewQuote(true)} >New Quote</button></div>
      {
        // loop through quotes and when you press the button show an ew quote
      }
    </>
  } 