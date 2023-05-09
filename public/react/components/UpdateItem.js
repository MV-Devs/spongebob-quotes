import React, {useEffect, useState} from 'react';
import apiURL from '../api';

export const UpdateItem = ({props, isUpdating, setIsUpdating, setSingleViewItem, isAddingItem, setIsAddingItem}) => {
//make the form
const [title, setTitle] = useState('');
const [price, setPrice] = useState('');
const [description, setDescription] = useState('');
const [category, setCategory] = useState('');
const [image, setImage] = useState('');   

async function handleUpdate(ev) {
    const response = await fetch(`${apiURL}/items/${props.id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {title, price, description, category, image}
      )
    });
    //const data = await response.json();
    setSingleViewItem(null);
    setIsUpdating(null);
    refreshPage();
  }

  function refreshPage() {
    window.location.reload(false);
  }

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    let result = await fetch(`${apiURL}/items/${props.id}`);
    result = await result.json();
    console.warn(result);
    setTitle(result.title);
    setPrice(result.price);
    setDescription(result.description);
    setCategory(result.category);
    setImage(result.image);
  }

  // async function handleClick() { 
  //   setIsUpdating(true);
  //   setSingleViewItem(false);
  // }
    
    return  ( <>
    <div id="h2"><h2>Update an Item</h2></div>
     <form>
    <label>
        <p>
        <input type="text"  size='50' name="title" placeholder="Title" value={ title } onChange={ev => setTitle(ev.target.value)} /> 
        </p>
        <p>
        <input type="text"  size='50' name="price" placeholder="Price" value={ price } onChange={ev => setPrice(ev.target.value)}/> 
        </p>
        <p>
        <input type="text" size='50' name="description" placeholder="Description" value={ description } onChange={ev => setDescription(ev.target.value)}/> 
        </p>
        <p>
        <input type="text"  size='50' name="category" placeholder="Category" value={ category } onChange={ev => setCategory(ev.target.value)}/> 
        </p>
        <p>
        <input type="text" size='50' name="image"  placeholder="Image" value={ image } onChange={ev => setImage(ev.target.value)}/>
        </p> 
    </label>
    </form>
    <div id="buttons">
    <button onClick={handleUpdate} id="add">Update this Item</button>
    <button onClick={() => setIsUpdating(false)} id="back">Back to Item</button>
    </div>
    </>
    );
}
