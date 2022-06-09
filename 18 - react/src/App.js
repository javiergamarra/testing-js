import "./App.css";
import { useState } from "react";

function App(props) {

  const [enabled, setEnabled] = useState(false);

  const onClick = () => {
    setEnabled(!enabled);
  };

  return (
    <div className="App">

      <button className="button" onClick={onClick}>Enable</button>

      {enabled && (<div>enabled</div>)}

      <input id="name"></input>

      {props.value}

    </div>
  );
}

export default App;
