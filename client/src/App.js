import "./App.css";
import { Provider } from "react-redux";
import Router from "./components/Navigation/Router";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store";

const App = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Provider>
    </div>
  );
};

export default App;
