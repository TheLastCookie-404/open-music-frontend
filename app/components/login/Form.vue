<template>
  <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
    <div class="card-body">
      <fieldset class="fieldset">
        <label class="label">Email</label>
        <input v-model="email" type="email" class="input w-full" placeholder="Email" />
        <label class="label">Password</label>
        <input v-model="password" type="password" class="input w-full" placeholder="Password" />
        <div><a class="link link-hover">Forgot password?</a></div>
        <button @click="() => logIn()" class="btn btn-neutral mt-4">Login</button>
        <button @click="() => profile()" class="btn btn-neutral mt-4">Profile</button>
        <button @click="() => logOut()" class="btn btn-neutral mt-4">Logout</button>
        {{ email }} {{ password }} {{ config.app.apiUrl }}
      </fieldset>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useRuntimeConfig } from "#app";
  const config = useRuntimeConfig();

  const email = ref<string | null>();
  const password = ref<string | null>();

  async function logIn() {
    await $fetch(`${config.app.apiUrl}/api/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
      body: {
        email: email.value,
        password: password.value,
      },
    })
      .then((response: any) => {
        console.log(response);
      })
      .catch((error) => console.error(error));
  }

  async function profile() {
    await $fetch(`${config.app.apiUrl}/api/refresh`, {
      method: "POST",
      credentials: "include",
    }).then(async () => {
      await $fetch(`${config.app.apiUrl}/api/profile`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
        },
      })
        .then((response: any) => {
          console.log(response);
        })
        .catch((error) => console.error(error));
    });
  }

  async function logOut() {
    await $fetch(`${config.app.apiUrl}/api/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response: any) => {
        console.log(response);
      })
      .catch((error) => console.error(error));
  }

  // async function refresh() {
  //   await $fetch(`${config.app.apiUrl}/api/refresh`, {
  //     method: "POST",
  //     credentials: "include",
  //     headers: {
  //       Accept: "application/json",
  //     },
  //   })
  //     .then((response: any) => {
  //       console.log(response);
  //     })
  //     .catch((error) => console.error(error));
  // }
</script>
