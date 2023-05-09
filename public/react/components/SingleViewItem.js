import React from "react";
import apiURL from "../api";

export const SingleViewItem = ({props,setSingleViewItem, isDeleted, setIsDeleted, setIsUpdating}) => {
  async function handleDelete(ev) {
    const response = await fetch(`${apiURL}/items/${props.id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    setSingleViewItem(null);
    setIsDeleted(true);
    refreshPage();
  }

  function refreshPage() {
    window.location.reload(false);
  }
    return (
    <>
    <div class="fullItem">
      <div class="info"> <h3>{props.title}</h3>
      <h2>${props.price}</h2> </div>
      <div id="image"><img src={props.image} alt={props.name} /></div>
      <div id="desc"><p>Description: {props.description}</p></div>
      <div id="cat"><p>Category: {props.category}</p></div>
    </div>
      <button onClick={() => setSingleViewItem(null)} id="main">Back to Main Page</button>
      <button onClick={handleDelete} id="delete">Delete Item</button>
      <button onClick={() => setIsUpdating(true)} id="update">Update Item</button>
    </>
    );
};
