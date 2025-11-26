<template>
  <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
    <div class="card-body">
      <fieldset class="fieldset">
        <label class="label">Email</label>
        <input v-model="email" type="email" class="input w-full" placeholder="Email" />
        <label class="label">Password</label>
        <input v-model="password" type="password" class="input w-full" placeholder="Password" />
        <div><a class="link link-hover">Forgot password?</a></div>
        <button class="btn btn-neutral mt-4">Login</button>
        {{ email }} {{ password }}
      </fieldset>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const { $config } = useNuxtApp();
  const env = $config.app;

  const email = ref<string | null>();
  const password = ref<string | null>();

  async function login() {
    const { data } = await useFetch(`${env.apiUrl}/sanctum/csrf-cookie`);

    const response = await $fetch(`${env.apiUrl}/login`, {
      method: "POST",
      body: {},
    });
  }
</script>
