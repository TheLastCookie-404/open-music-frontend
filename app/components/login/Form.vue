<template>
  <div class="bg-base-200 fixed top-0 left-0 flex size-full items-center justify-center">
    <div class="w-full">
      <h1 class="mb-3 text-center text-6xl font-thin tracking-wide sm:text-7xl">TLC Music</h1>
      <p
        class="text-base-content mb-5 text-center font-light tracking-wider sm:mb-12 sm:font-normal">
        Enjoy the sound
      </p>
      <div class="m-auto w-full max-w-sm shrink-0 shadow-2xl">
        <div class="card sm:card-border border-neutral overflow-clip">
          <div
            class="card-body sm:bg-base-300/80 from-base-content/5 bg-linear-to-bl bg-none to-30% backdrop-blur-xl">
            <!-- <h2 class="text-center text-2xl font-light">Login</h2> -->
            <fieldset class="fieldset">
              <label class="label">Email</label>
              <input
                v-model="email"
                type="email"
                class="input bg-base-100 sm:bg-base-200/15 mb-3 w-full"
                placeholder="Email" />
              <label class="label">Password</label>
              <input
                v-model="password"
                type="password"
                class="input bg-base-100 sm:bg-base-200/15 w-full"
                placeholder="Password" />
              <div class="mb-3"><a class="link link-hover">Forgot password?</a></div>
              <button @click="() => logIn()" class="btn btn-neutral text-base-content/60 mt-7">
                Login
              </button>
              <!-- <button @click="() => profile()" class="btn btn-neutral mt-4">Profile</button>
              <button @click="() => logOut()" class="btn btn-neutral mt-4">Logout</button> -->
              <!-- {{ email }} {{ password }} {{ config.app.apiUrl }} -->
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const config = useRuntimeConfig();

  const email = ref<string | null>();
  const password = ref<string | null>();

  async function logIn() {
    await $fetch(`${config.public.apiUrl}/api/login`, {
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
        navigateTo("/");
      })
      .catch((error) => console.error(error));
  }

  async function profile() {
    await $fetch(`${config.public.apiUrl}/api/refresh`, {
      method: "POST",
      credentials: "include",
    }).then(async () => {
      await $fetch(`${config.public.apiUrl}/api/profile`, {
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
    await $fetch(`${config.public.apiUrl}/api/logout`, {
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
