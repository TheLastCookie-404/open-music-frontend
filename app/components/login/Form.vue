<template>
  <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
    <div class="card-body">
      <fieldset class="fieldset">
        <label class="label">Email</label>
        <input
          v-model="userCredentials.email"
          type="email"
          class="input w-full"
          placeholder="Email" />
        <label class="label">Password</label>
        <input
          v-model="userCredentials.password"
          type="password"
          class="input w-full"
          placeholder="Password" />
        <div><a class="link link-hover">Forgot password?</a></div>
        <button @click="() => logIn()" class="btn btn-neutral mt-4">Login</button>
        <button @click="() => test()" class="btn btn-neutral mt-4">Test</button>
        <button @click="() => logOut()" class="btn btn-neutral mt-4">Logout</button>
        {{ email }} {{ password }} {{ userCredentials }}
      </fieldset>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const email = ref<string | null>();
  const password = ref<string | null>();

  const { login, logout } = useSanctumAuth();
  useSanctumClient;

  const userCredentials = reactive({
    email: email.value,
    password: password.value,
  });

  async function logIn() {
    await login(userCredentials)
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  async function test() {
    useSanctumFetch("/api/test")
      .then((resp) => {
        console.log(resp.data.value);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  async function logOut() {
    await logout()
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.error(err);
      });
  }
</script>
