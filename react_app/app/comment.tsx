export function Comment(props) {
    return (
      <div className="comments-conatiner">
        <div {...props}></div>
        <a href={props.link}>{props.username}</a>: {props.content}
      </div>
    );
  }
  