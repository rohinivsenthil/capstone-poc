import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  credentials: any = {};
  comments: any[] = [];
  code: string = '';

  get loggedIn(): boolean {
    return !!this.credentials?.username;
  }

  ngOnInit() {
    console.log("App Mounted");
    this.credentials = JSON.parse(localStorage.getItem("credentials") || "{}");
    this.fetchComments();
  }

  async fetchComments() {
    console.log("Fetching comments...");
    const resp = await fetch("http://localhost:3000/comment");
    this.comments = await resp.json();
    console.log("Comments fetched:", this.comments);
  }

  login(event: Event) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const newCredentials = {
      username: formData.get("username"),
      password: formData.get("password"),
    };
    localStorage.setItem("credentials", JSON.stringify(newCredentials));
    this.credentials = newCredentials;
    console.log("User logged in:", this.credentials);
  }

  logout() {
    console.log("User logged out");
    localStorage.setItem("credentials", "{}");
    this.credentials = {};
  }

  async post(event: Event) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const request: any = { username: this.credentials.username };
    formData.forEach((value, key) => request[key] = value);

    console.log("Posting comment:", request);
    const resp = await fetch("http://localhost:3000/comment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });

    this.comments = await resp.json();
    console.log("Updated comments:", this.comments);
  }

  evaluateCode(code: string) {
    try {
      return eval(code);
    } catch (error) {
      console.error("Error evaluating code:", error);
      return "Error";
    }
  }
}
