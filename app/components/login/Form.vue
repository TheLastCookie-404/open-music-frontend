<template>
  <div class="bg-base-200 fixed top-0 left-0 flex size-full items-center justify-center p-3">
    <div class="w-full">
      <h1 class="text-7xl font-thin mb-3 text-center">TLC Music</h1>
      <p class="text-center mb-12">Enjoy the sound</p>
      <div class="relative shrink-0 shadow-2xl w-full max-w-sm m-auto">
        <div class="card card-border border-neutral bg-base-300/50 z-50 block backdrop-blur-xl">
          <div class="card-body">
            <h2 class="text-center text-2xl font-light">Login</h2>
            <fieldset class="fieldset">
              <label class="label">Email</label>
              <input v-model="email" type="email" class="input w-full mb-3" placeholder="Email" />
              <label class="label">Password</label>
              <input v-model="password" type="password" class="input w-full" placeholder="Password" />
              <div class="mb-3"><a class="link link-hover">Forgot password?</a></div>
              <button @click="() => logIn()" class="btn btn-neutral text-base-content/60 mt-4">
                Confirm
              </button>
              <!-- <button @click="() => profile()" class="btn btn-neutral mt-4">Profile</button>
              <button @click="() => logOut()" class="btn btn-neutral mt-4">Logout</button> -->
              <!-- {{ email }} {{ password }} {{ config.app.apiUrl }} -->
            </fieldset>
          </div>
        </div>
        <!-- <div class="bg-primary/60 absolute top-0 right-0 size-16 rounded-full blur-3xl"></div>
        <div class="bg-primary/60 absolute bottom-5 left-5 size-20 rounded-full blur-3xl"></div> -->
      </div>
    </div>
    <!-- <div class="relative size-fit bg-green-600">
      <div class="absolute -top-3 -left-3 size-24 bg-red-600"></div>
      <div class="relative z-50 size-64 bg-orange-600/50 backdrop-blur-2xl"></div>
    </div> -->
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
