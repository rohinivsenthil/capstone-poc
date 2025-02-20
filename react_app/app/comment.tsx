export function Comment(props) {
    return (
      <div >
        <div {...props}></div>
        <a href={props.link}>{props.username}</a>: {props.content}
      </div>
    );
  }
  