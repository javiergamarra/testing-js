import "./App.css";
import { useState } from "react";

function App(props) {

  const [enabled, setEnabled] = useState(false);

  const onClick = () => {
    setEnabled(!enabled);
  };

  const onClickRequest = () => {
    fetch("https://jsonplaceholder.typicode.com/todos/1").then(
      x => {
        console.log(x.json());
      }
    );
  };

  return (<div className="App">

    <button className="button" onClick={onClick} style={{ "fontSize": props.fontSize }}>Enable</button>

    {enabled && (<div>enabled</div>)}

    <input id="name" type="text"></input>

    <p>{props.value}</p>

    <button onClick={onClickRequest}>Call API</button>

  </div>);
}

export default App;
