import type { Route } from "./+types/home";
import { Comment } from "../comment";
import { useEffect, useMemo, useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const [credentials, setCredentials] = useState({});
  const [comments, setComments] = useState([]);
  const loggedIn = useMemo(() => !!credentials?.username, [credentials]);

  console.log(comments);

  useEffect(() => {
    setCredentials(
      JSON.parse(window.localStorage.getItem("credentials") || "{}")
    );

    fetch("http://localhost:3000/comment")
      .then((resp) => resp.json())
      .then(setComments);
  }, []);

  const login = (formData: FormData) => {
    const newCredentials = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    window.localStorage.setItem("credentials", JSON.stringify(newCredentials));
    setCredentials(newCredentials);
  };

  const logout = () => {
    window.localStorage.setItem("credentials", "{}");
    setCredentials({});
  };

  const post = async (formData: FormData) => {
    const request = { username: credentials.username };
    formData.forEach((value, key) => request[key] = value);

    const resp = await fetch("http://localhost:3000/comment", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(request),
    });

    setComments(await resp.json());
  };

  return (
    <div>
      {!loggedIn ? (
        <form action={login}>
          {" "}
          <input name="username" placeholder="Username" />
          <input name="password" type="password" placeholder="Password" />
          <button>Login</button>
        </form>
      ) : (
        <button onClick={logout}>Logout</button>
      )}

      <div>
        {comments.map((comment, key) => <Comment key={key} {...comment} />)}
      </div>

      <form action={post}>
        <textarea name="content" placeholder="Comment" />
        <input name="link" placeholder="Link" />
        <button title={loggedIn ? undefined : "Login to post"} disabled={!loggedIn}>Post</button>
      </form>
    </div>
  );
}
