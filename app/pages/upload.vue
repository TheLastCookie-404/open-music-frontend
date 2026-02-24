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
      <button @click="() => logout()" class="btn btn-error my-10 w-fit">Logout</button>
      <div class="rounded-box border-base-content/5 bg-base-100 overflow-x-auto border">
        <table class="table">
          <!-- head -->
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>Title</th>
              <th>Artist</th>
              <th>Playtime</th>
              <th>Delete?</th>
            </tr>
          </thead>
          <tbody>
            <!-- row 1 -->
            <tr v-if="data?.tracks" v-for="(track, index) in data.tracks" :key="track.id">
              <th>{{ index + 1 }}</th>
              <td>
                <div class="rounded-field float-right size-10 overflow-hidden">
                  <img
                    v-if="track['artwork_url']"
                    :src="track['artwork_url']"
                    :alt="track.title"
                    class="float-right h-full" />
                  <div v-else class="bg-base-300 h-full"></div>
                </div>
              </td>
              <td>{{ track.title }}</td>
              <td>{{ track.artist }}</td>
              <td>{{ track.playtime }}</td>
              <td>
                <button @click="() => trackDelete(track.id)" class="btn btn-xs btn-error w-fit">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- <pre>{{ data }}</pre> -->
    </fieldset>
  </div>
</template>

<script lang="ts" setup>
  import { useRuntimeConfig } from "#app";

  interface TracksResponse {
    found: number;
    tracks: {
      id: string;
      title: string;
      artist: string;
      playtime: string;
      artwork_url: string;
    }[];
  }

  const config = useRuntimeConfig();

  const audiofiles = ref<FileList>();
  const trackId = ref<string>();

  const { data, refresh } = await useFetch<TracksResponse>(`${config.public.apiUrl}/api/tracks`, {
    retry: 3,
    retryDelay: 1000,
  });

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
          refresh();
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }

  async function trackDelete(trackId: string) {
    await $fetch(`${config.public.apiUrl}/api/refresh`, {
      method: "POST",
      credentials: "include",
    }).then(async () => {
      await $fetch(`${config.public.apiUrl}/api/tracks/delete`, {
        method: "POST",
        credentials: "include",
        body: {
          // uid: trackId.value,
          // id: trackId.value,
          id: trackId,
        },
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          console.log(response);
          refresh();
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
