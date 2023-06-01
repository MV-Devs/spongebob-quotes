import React, {useState, useEffect} from 'react';
import image from "../components/images/new-sponge.jpg";



export const AddEditQuote = () => {
    return (

            <div style={{display:"flex",justifyContent:"center", alignItems:"center", height:"1000px", backgroundImage: `url(${image})`,backgroundSize:"100%", backgroundRepeat:"no-repeat"}}>
                <form>
                    <div style={{border: "solid",padding: "150px", backgroundColor:"grey", opacity:"0.85"}}>
                        <label style={{margin:"300px", fontSize: "18px"}}>New/Update Quote:
                            <input style={{fontSize:"20px",paddingRight:"100px", margin:"5px"}} type="text" />
                            <button>Enter</button>
                        </label>
                    </div>
                </form>
            </div>
 
      );
  } 

