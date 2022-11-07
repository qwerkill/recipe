import { useState } from "react";
import "./RecipeList";

const RecipeItem = ({recipe,handleDelete,fetchAllRecipes}) => {
    const [update,setUpdate] = useState({});
    const handleSubmit = (event) => {
        event.preventDefault();  
        const newItem =    {
          ...update,
          id: fetchAllRecipes,
          isDone : false
        }
        
      }
    const handleChange = (recipe) => {
        const {value, name} = recipe.target
        setUpdate({
          [name]: value
        })
        fetch (`${process.env.REACT_APP_API_URL}/recipes/${recipe.id}`, {
            method: 'UPDATE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }
    

        
    return ( 
        <li key={recipe.id}>
        {recipe.title}
        <form onSubmit={handleSubmit}>
            <input type="text" value={recipe.tile}/>
        </form>
        <button onClick={()=> handleDelete(recipe)}>DELETE</button>
        <button onClick={()=> handleChange(recipe)}>UPDATE</button>
    </li> );
}
 
export default RecipeItem;