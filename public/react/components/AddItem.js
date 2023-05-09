import React, {useState} from 'react';
import apiURL from '../api';

export const AddItem = ({props, setIsAddingItem}) => {
//make the form
const [title, setTitle] = useState('');
const [price, setPrice] = useState('');
const [description, setDescription] = useState('');
const [category, setCategory] = useState('');
const [image, setImage] = useState('');   

async function handleSubmit(ev) {
    //event.preventDefault();
    const response = await fetch(`${apiURL}/items/`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {title, price, description, category, image}
      )
    });

    const data = await response.json();
    setIsAddingItem(null);
    refreshPage();
  }

  function refreshPage() {
    window.location.reload(false);
  }
    
    return  ( <>
    <div id="h2"><h2>Add an Item</h2></div>
     <form>
    <label>
        <p>
        <input type="text" size='50' name="title" placeholder="Title" value={ title } onChange={ev => setTitle(ev.target.value)} /> 
        </p>
        <p>
        <input type="text" size='50' name="price" placeholder="Price" value={ price } onChange={ev => setPrice(ev.target.value)}/> 
        </p>
        <p>
        <input type="text"  size='50' name="description" placeholder="Description" value={ description } onChange={ev => setDescription(ev.target.value)}/> 
        </p>
        <p>
        <input type="text" size='50' name="category" placeholder="Category" value={ category } onChange={ev => setCategory(ev.target.value)}/> 
        </p>
        <p>
        <input type="text" size='50' name="image"  placeholder="Image" value={ image } onChange={ev => setImage(ev.target.value)}/>
        </p> 
    </label>
    </form>
    <div id="buttons">
    <button type="submit" onClick={handleSubmit} id="add">Add My Item!</button>
    <button onClick={() => setIsAddingItem(false)} id="back">Back to Main Page</button>
      </div>
    </>
    );
}