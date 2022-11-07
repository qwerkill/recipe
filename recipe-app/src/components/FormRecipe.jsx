import { useState } from "react";

const FormRecipe = ({fetchAllRecipes}) => {
    const [credentials, setCredentials] = useState ({}); 
  
    const handleCreate = (event) => {
        const {value, name} = event.target;

        setCredentials( {
            ...credentials,
             [name]: value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch ("http://localhost:8000/recipes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify (credentials),
        })
        .then ((response) => response.json ())
        .then (data => fetchAllRecipes());
    }

    return (  
        <form onSubmit={handleSubmit}>
            <input type="text" name="title" placeholder="Entrez le titre de la recette" onChange={handleCreate} />
            <input type="text" name="category" placeholder="Entrez la category de la recette" onChange={handleCreate} />
            <input type="submit" value="Ajouter" />
        </form>
    );
}
 
export default FormRecipe;