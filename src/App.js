import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Header from "./Component/Header";
import Footer from "./Component/Footer";
import Main from "./Routes/Main";
import Recipes from "./Routes/Recipes";
import RecipeFood from "./Routes/RecipeFood";
import Saved from "./Routes/Saved";
import "./style/css/style.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/recipes" component={Recipes} />
        <Route exact path="/recipe/:id" component={RecipeFood} />
        <Route exact path="/saved" component={Saved} />
        <Route path="*" component={() => <Redirect to="/" />} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
