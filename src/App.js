import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Recipe from "./Recipe";

// IMPORT FILES FOR MATERIAL UI
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";

// STYLES FROM MATERIAL UI
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    margin: "10px auto",
    alignItems: "center",
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

function App() {
  const classes = useStyles();
  // API KEY AND ID
  const APP_ID = "75bbb8be";
  const APP_KEY = "54619bac568ce1ee34ca0bae17544102";

  const [recipes, setRecipes] = useState([]);

  const [search, setSearch] = useState("");

  const [query, setQuery] = useState("orange");

  useEffect(() => {
    getRecipe();
  }, [query]);

  // function for sending HTTP request using axios
  const getRecipe = async () => {
    const response = await axios.get(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    setRecipes(response.data.hits);
    console.log(response.data.hits);
  };

  // function for search
  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  // showing search results
  const updateQuery = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  return (
    <div>
      <Paper onSubmit={updateQuery} component="form" className={classes.root}>
        <InputBase
          type="text"
          value={search}
          onChange={updateSearch}
          className={classes.input}
          placeholder="Search for recipes"
          inputProps={{ "aria-label": "search google maps" }}
        />
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>

      {/* <form onSubmit={updateQuery}>
        <input type="text" value={search} onChange={updateSearch} />
        <button type="submit">search</button>
      </form> */}
      <div style={{ margin: "20px", padding: "20px" }}>
        <Grid container spacing={6}>
          {recipes.map((recipe) => (
            <Grid item xs={3}>
              <Recipe
                key={recipe.recipe.label}
                title={recipe.recipe.label}
                image={recipe.recipe.image}
                ingredients={recipe.recipe.ingredients}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default App;
