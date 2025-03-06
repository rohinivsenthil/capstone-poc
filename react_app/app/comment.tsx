export function Comment(props:any) {
    return (
      <div className="comments-conatiner">
        <div {...props}></div>
        <a href={props.link}>{props.username}</a>: {props.content} {props.category} {eval(props.code)}
      </div>
    );
  }
  