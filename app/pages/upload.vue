<template>
  <div>
    <fieldset class="fieldset">
      <legend class="fieldset-legend">Pick a file</legend>
      <input
        @change="(event) => (audiofiles = (event.target as HTMLInputElement)?.files ?? undefined)"
        type="file"
        class="file-input" />
      <!-- <label class="label">Max size 2MB</label> -->
      <button @click="() => send()" class="btn w-fit">Send</button>
      <br />
      <input v-model="trackId" type="text" placeholder="Type here" class="input" />
      <button @click="() => trackDelete()" class="btn btn-error mb-12 w-fit">Delete</button>
      <button @click="() => logout()" class="btn btn-error w-fit">Logout</button>
    </fieldset>
  </div>
</template>

<script lang="ts" setup>
  import { useRuntimeConfig } from "#app";
  const config = useRuntimeConfig();

  const audiofiles = ref<FileList>();

  const trackId = ref<string>();

  definePageMeta({
    layout: "navigation",
  });

  watchEffect(() => {
    console.log(audiofiles.value?.[0]);
  });

  async function send() {
    // refresh();
    // Create FormData object instead of plain object
    const formData = new FormData();

    // Append the file to FormData
    if (audiofiles.value?.[0]) {
      formData.append("audio", audiofiles.value[0]);
    }

    await $fetch(`${config.public.apiUrl}/api/refresh`, {
      method: "POST",
      credentials: "include",
    }).then(async () => {
      await $fetch(`${config.public.apiUrl}/api/upload`, {
        method: "POST",
        credentials: "include",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }

  async function trackDelete() {
    await $fetch(`${config.public.apiUrl}/api/refresh`, {
      method: "POST",
      credentials: "include",
    }).then(async () => {
      await $fetch(`${config.public.apiUrl}/api/tracks/delete`, {
        method: "POST",
        credentials: "include",
        body: {
          // uid: trackId.value,
          id: trackId.value,
        },
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }

  async function logout() {
    await $fetch(`${config.public.apiUrl}/api/refresh`, {
      method: "POST",
      credentials: "include",
    }).then(async () => {
      await $fetch(`${config.public.apiUrl}/api/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }
</script>
