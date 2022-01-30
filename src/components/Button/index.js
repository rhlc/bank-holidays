import "../../styles/components/Buttons.css";

export function Button(props) {
  return <button onClick={props.onClick}>{props.text}</button>;
}
