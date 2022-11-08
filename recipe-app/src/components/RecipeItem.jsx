import { useState } from "react";
import "./RecipeList";

const RecipeItem = ({recipe,handleDelete,fetchAllRecipes}) => {
    const [itemList,setItemList] = useState ({});
    const [update,setUpdate] = useState({recipe});

    const handleSubmit = (event) => {
        event.preventDefault();  
        const newItem =    {
          ...update,
          id: recipe,
          isDone : false
        }
        setItemList([
          ...itemList,
          newItem
        ])
      }
    const handleChange = (recipe) => {
        console.log('handleChange');
        const {value, name} = recipe.name
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
            <input type="text" value={recipe.name}/>
        </form>
        <button onClick={()=> handleDelete(recipe)}>DELETE</button>
        <button onClick={()=> handleChange(recipe)}>UPDATE</button>
    </li> );
}
 
export default RecipeItem;