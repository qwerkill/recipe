import {toast} from 'react-toastify';
import RecipeItem from "./RecipeItem";

const RecipeList = ({recipeList,fetchAllRecipes},) => {
    const handleDelete = (recipe) => {
        const confirmUser = window.confirm('Are you sure you want to delete this recipe?');
        // confirm message
        if(confirmUser){
            fetch (`${process.env.REACT_APP_API_URL}/recipes/${recipe.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },            
            })
            .then(res => {
                toast('🦄 Wow so easy!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
                    fetchAllRecipes()
            })
            
        }
        }

    return ( 
        <ul className="recipe-list">
            {recipeList.map(recipe => (
                <RecipeItem handleDelete={handleDelete} recipe={recipe}/>
            ))}
        </ul>
     );
}
 
export default RecipeList;