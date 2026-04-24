<template>
  <div>
    <fieldset class="fieldset">
      <!-- <label class="label">Max size 2MB</label> -->
      <div class="mb-4 flex items-center gap-4">
        <input
          @change="(event) => (audiofiles = (event.target as HTMLInputElement)?.files ?? undefined)"
          type="file"
          class="file-input" />
        <NuxtLink to="/login">
          <button class="btn btn-success w-fit">Login</button>
        </NuxtLink>
        <button @click="() => logout()" class="btn btn-error w-fit">Logout</button>
      </div>
      <button @click="() => send()" class="btn w-fit">Send</button>
      <div class="bg-base-300 rounded-box my-6 flex h-20 w-sm items-center gap-4 p-4">
        <div v-if="!currentTrackData" class="rounded-box bg-base-200 size-12 shrink-0"></div>
        <template v-else>
          <audio @canplay="playing = true" ref="audio" />
          <div class="shrink-0">
            <img class="rounded-field size-12" :src="currentTrackData?.artwork_url" />
          </div>
          <div class="w-full overflow-hidden">
            <div class="truncate">{{ currentTrackData?.title }}</div>
            <div class="mb-1.5 truncate text-xs font-semibold uppercase opacity-60">
              {{ currentTrackData.playtime }} {{ currentTrackData?.artist }}
            </div>
            <input type="range" min="0" max="100" v-model="currentTime" class="range range-2xs" />
          </div>
        </template>
        <div class="ml-auto flex shrink-0">
          <button class="btn btn-square btn-ghost text-xl">
            <Icon name="ph:heart" />
          </button>
          <button
            :disabled="!currentTrackData"
            @click="playing = !playing"
            class="btn btn-square btn-ghost text-xl">
            <Icon :name="playing ? 'ph:pause' : 'ph:play'" />
          </button>
        </div>
      </div>
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
              <th>Uploaded By</th>
              <th>Delete?</th>
            </tr>
          </thead>
          <tbody>
            <!-- row 1 -->
            <tr v-if="data?.data" v-for="(track, index) in data.data" :key="track.id">
              <th>{{ index + 1 * data.meta.from }}</th>
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
              <td
                @click="((currentTrackUrl = track.audio_url), (currentTrackData = track))"
                class="hover:link">
                {{ track.title }}
              </td>
              <td>{{ track.artist }}</td>
              <td>{{ track.playtime }}</td>
              <td>{{ track.uploaded_by.name }}</td>
              <td>
                <button
                  :disabled="
                    track.uploaded_by.name !== profile?.name && profile?.role !== 'superadmin'
                  "
                  @click="() => trackDelete(track.id)"
                  class="btn btn-xs btn-error w-fit">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </fieldset>
    <div v-if="data?.links" class="join mt-4">
      <button :disabled="data.links.prev === null" @click="currentPage--" class="join-item btn">
        «
      </button>
      <button class="join-item btn">Page {{ data.meta.current_page }}</button>
      <button :disabled="data.links.next === null" @click="currentPage++" class="join-item btn">
        »
      </button>
    </div>
    <!-- <pre>{{ currentPage }}</pre> -->
  </div>
</template>

<script lang="ts" setup>
  import { useRuntimeConfig } from "#app";

  interface TracksResponse {
    found: number;
    data: {
      id: string;
      uploaded_by: {
        name: string;
        role: string;
      };
      title: string;
      artist: string;
      playtime: string;
      artwork_url: string;
      audio_url: string;
    }[];
    links: {
      prev: string | null;
      next: string | null;
    };
    meta: {
      current_page: number;
      from: number;
    };
  }

  type Profile = { name: string; role: string };

  const config = useRuntimeConfig();

  const audiofiles = ref<FileList>();
  const trackId = ref<string>();
  const currentTrackUrl = shallowRef<MaybeRefOrGetter>();
  const currentTrackData = shallowRef<{
    title?: string;
    artist?: string;
    playtime?: string;
    artwork_url?: string;
  }>();
  const profile = useState<Profile>("profile");
  const currentPage = useLocalStorage<number>("page", 1);

  const audio = useTemplateRef<HTMLMediaElement>("audio");
  const { playing, currentTime } = useMediaControls(audio, {
    src: currentTrackUrl,
  });

  const { data, refresh } = await useFetch<TracksResponse>(`${config.public.apiUrl}/api/tracks`, {
    query: {
      page: currentPage,
    },
    retry: 3,
    retryDelay: 1000,
  });

  definePageMeta({
    layout: "navigation",
  });

  watchEffect(() => {
    console.log(audiofiles.value?.[0]);
  });

  onMounted(() => {
    getProfile();
  });

  onUnmounted(() => {
    currentPage.value = data.value?.meta.current_page;
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

  async function getProfile() {
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
        .then((response) => {
          console.log(response);
          profile.value = response as Profile;
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }
</script>
