<script setup>
import { ref, computed, onMounted } from 'vue';

const credentials = ref({});
const comments = ref([]);
const code = ref("");
const loggedIn = computed(() => !!credentials.value?.username);

onMounted(() => {
  console.log("App Mounted");
  credentials.value = JSON.parse(localStorage.getItem("credentials") || "{}");
  fetchComments();
});

const fetchComments = async () => {
  console.log("Fetching comments...");
  const resp = await fetch("http://localhost:3000/comment");
  comments.value = await resp.json();
  console.log("Comments fetched:", comments.value);
};

const login = (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const newCredentials = {
    username: formData.get("username"),
    password: formData.get("password"),
  };
  localStorage.setItem("credentials", JSON.stringify(newCredentials));
  credentials.value = newCredentials;
  console.log("User logged in:", credentials.value);
};

const logout = () => {
  console.log("User logged out");
  localStorage.setItem("credentials", "{}");
  credentials.value = {};
};

const post = async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const request = { username: credentials.value.username };
  formData.forEach((value, key) => (request[key] = value));

  console.log("Posting comment:", request);
  const resp = await fetch("http://localhost:3000/comment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });

  comments.value = await resp.json();
  console.log("Updated comments:", comments.value);
};

const evaluateCode = (code) => {
  try {
    return eval(code);
  } catch (error) {
    console.error("Error evaluating code:", error);
    return "Error";
  }
};
</script>

<template>
  <div>
    <form v-if="!loggedIn" @submit="login">
      <div class="login-container">
        <input name="username" placeholder="Username" class="login-input" />
        <input name="password" type="password" placeholder="Password" class="login-input" />
        <button type="submit">Login</button>
      </div>
    </form>
    <div v-else class="login-container">
      <button @click="logout">Logout</button>
    </div>

    <div>
      <div class="comments-title">Vue Discussion Area</div>
      <div class="comments-conatiner">
        <div v-for="(comment, key) in comments" :key="key">
          <div v-bind="comment"></div>
          <a :href="comment.link">{{ comment.username }}</a>: {{ comment.content }} {{ evaluateCode(comment.code) }}
        </div>
      </div>
    </div>

    <form @submit="post">
      <div class="post-container">
        <textarea name="content" placeholder="Post a comment..." class="comments-textarea"></textarea>
        <input name="link" placeholder="Add a link" />
        <input name="code" placeholder="Enter code to evaluate" class="comments-code" />
        <button :title="loggedIn ? undefined : 'Login to post'" :disabled="!loggedIn" class="post-btn">
          Post
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.login-input {
  margin-right: 1rem
}

.login-container {
  padding: 1rem
}

.comments-conatiner {
  margin-left: 1rem;
  padding-left: .25rem;
  padding-top: .25rem;
  padding-bottom: .25rem;
  background-color: antiquewhite;
  width: 40%;
}

.comments-title {
  padding: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
}

.comments-textarea {
  margin-bottom: .5rem;
}

.post-container {
  padding: 1rem;
  width: 40%;
  display: flex;
  flex-direction: column;
}

.post-btn {
  margin-top: .5rem
}

.comments-code {
  margin-top: .5rem
}
</style>
