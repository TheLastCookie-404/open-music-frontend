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
    </fieldset>
  </div>
</template>

<script lang="ts" setup>
  const audiofiles = ref<FileList>();

  definePageMeta({
    layout: "navigation",
  });

  watchEffect(() => {
    console.log(audiofiles.value?.[0]);
  });

  async function send() {
    // Create FormData object instead of plain object
    const formData = new FormData();

    // Append the file to FormData
    if (audiofiles.value?.[0]) {
      formData.append("audio", audiofiles.value[0]);
    }

    await $fetch("http://localhost:8000/api/load", {
      method: "POST",
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
  }

  // async function send() {
  //   const config = {
  //     headers: {
  //       "Content-type": "multipart/form-data; charset=utf-8; boundary=" + Math.random().toString(),
  //       processData: false,
  //       Accept: "application/json",
  //     },
  //   };

  //   await axios
  //     .post(
  //       "http://localhost:8000/api/load",
  //       {
  //         audio: audiofiles.value?.[0],
  //       },
  //       config,
  //     )
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }
</script>
