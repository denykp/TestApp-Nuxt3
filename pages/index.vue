<script setup lang="ts">
const loggedInUser = {
  cover_picture: {
    url: "",
  },
  user_picture: {
    url: "",
  },
};
</script>

<template>
  <div class="container mx-auto">
    <!-- {{ loggedInUser }} -->
    <div
      class="w-100 bg-gray-300 h-96 group relative overflow-hidden flex justify-center items-center"
    >
      <img
        v-if="loggedInUser.cover_picture.url"
        :src="loggedInUser.cover_picture.url"
        alt="cover-picture"
        width="100%"
        height="100%"
      />
      <div
        class="bg-gray-600 h-full bg-opacity-0 group-hover:bg-opacity-30 w-full absolute top-0 flex justify-center items-center"
      >
        <div>
          <label
            for="uploadCover"
            class="w-full flex justify-center items-center text-white font-bold cursor-pointer text-center bg-gray-400 p-2 opacity-0 group-hover:opacity-70 rounded"
          >
            Upload Cover
          </label>
        </div>
      </div>
    </div>
    <!-- <div class="grid grid-cols-4 gap-5">
      <div class="col-span-1 relative">
        <div
          class="border border-gray-200 bg-gray-100 w-48 h-48 text-center absolute left-1/2 transform -translate-x-1/2 -mt-24 rounded-full overflow-hidden"
        >
          <div
            class="h-full w-full group relative flex justify-center items-center"
          >
            <img
              v-if="loggedInUser.user_picture"
              :src="loggedInUser.user_picture.picture.url"
              alt="profile-picture"
              width="100%"
              height="100%"
            />
            <div
              class="bg-gray-600 h-full bg-opacity-0 group-hover:bg-opacity-30 w-full absolute top-0 rounded-full flex justify-center items-center"
            >
              <div>
                <label
                  for="uploadProfile"
                  class="w-full flex justify-center items-center text-white font-bold cursor-pointer text-center bg-gray-400 rounded p-2 opacity-0 group-hover:opacity-70"
                >
                  Upload Picture
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-36 p-5 border border-gray-300 rounded">
          <div class="flex justify-between">
            <span class="font-bold text-2xl">Profile</span>
            <img
              src="~/assets/icons/pen-to-square-solid.svg"
              alt="edit-icon"
              width="20"
              height="20"
              class="cursor-pointer"
              @click="$modal.show('modal-profile')"
            />
          </div>
          <hr class="border-gray-400 mt-1" />
          <div
            v-for="(value, key, index) in profileInfo"
            :key="index"
            class="grid grid-cols-5"
          >
            <div class="col-span-2 font-semibold">{{ displayLabel(key) }}</div>
            <div class="col-span-3">
              <span class="font-semibold">:</span>&nbsp;{{ value || "-" }}
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-3 mt-3">
        <div class="flex justify-end">
          <FormButton class="mr-2" @click="$modal.show('modal-message')"
            >Show Message</FormButton
          >
          <FormButton @click="logout">Logout</FormButton>
        </div>
        <div class="grid grid-cols-2 gap-5">
          <div class="p-10">
            <div class="flex justify-between">
              <span class="font-bold text-2xl">Riwayat Karir</span>
              <img
                src="~/assets/icons/pen-to-square-solid.svg"
                alt="edit-icon"
                width="20"
                height="20"
                class="cursor-pointer"
                @click="$modal.show('modal-career')"
              />
            </div>
            <hr class="border-gray-400 mt-1" />
            <div>
              <div
                v-for="(value, key, index) in loggedInUser.career"
                :key="index"
                class="grid grid-cols-5"
              >
                <div class="col-span-2 font-semibold">
                  {{ displayLabel(key) }}
                </div>
                <div class="col-span-3">
                  <span class="font-semibold">:</span>&nbsp;{{ value || "-" }}
                </div>
              </div>
            </div>
          </div>
          <div class="p-10">
            <div class="flex justify-between">
              <span class="font-bold text-2xl">Riwayat Pendidikan</span>
              <img
                src="~/assets/icons/pen-to-square-solid.svg"
                alt="edit-icon"
                width="20"
                height="20"
                class="cursor-pointer"
                @click="$modal.show('modal-education')"
              />
            </div>
            <hr class="border-gray-400 mt-1" />
            <div>
              <div
                v-for="(value, key, index) in loggedInUser.education"
                :key="index"
                class="grid grid-cols-5"
              >
                <div class="col-span-2 font-semibold">
                  {{ displayLabel(key) }}
                </div>
                <div class="col-span-3">
                  <span class="font-semibold">:</span>&nbsp;{{ value || "-" }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="p-10">
          <div class="flex justify-between">
            <span class="font-bold text-2xl">Galery Profile Picture</span>
            <label
              for="uploadProfileMultiple"
              class="cursor-pointer flex gap-2 px-2 py-1 bg-gray-400 rounded"
            >
              <div class="mt-1">Upload Multiple</div>
              <img
                src="~/assets/icons/upload-solid.svg"
                alt="edit-icon"
                width="20"
                height="20"
              />
            </label>
          </div>
          <hr class="border-gray-400 mt-1" />
          <div class="grid grid-cols-6">
            <div
              v-for="(item, index) in loggedInUser.user_pictures"
              :key="index"
              class="m-3 flex justify-center items-center border border-gray-400 rounded-xl w-40 overflow-hidden relative group"
            >
              <img :src="item.picture.url" :alt="item.id" />
              <div
                class="bg-gray-600 h-full bg-opacity-0 group-hover:bg-opacity-30 w-full absolute top-0 flex justify-center items-center"
              >
                <div>
                  <label
                    class="w-full flex justify-center items-center text-white font-bold cursor-pointer text-center bg-gray-400 p-2 opacity-0 group-hover:opacity-70 rounded"
                    @click="useDefaultProfile(item.id)"
                  >
                    Set as Default
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <!-- section input file -->
    <!-- <input
      id="uploadProfile"
      type="file"
      class="invisible"
      @change="uploadProfile($event, 'profile')"
    />
    <input
      id="uploadProfileMultiple"
      type="file"
      class="invisible"
      multiple
      @change="uploadProfile($event, 'profile')"
    />
    <input
      id="uploadCover"
      type="file"
      class="invisible"
      @change="uploadProfile($event, 'cover')"
    /> -->

    <!-- section modal -->
    <!-- <modal
      name="modal-profile"
      width="400px"
      height="auto"
      @close="console.log('closed')"
    >
      <div>
        <FormProfile :data-prop="profileInfo" />
      </div>
    </modal>
    <modal
      name="modal-career"
      width="400px"
      height="auto"
      @close="console.log('closed')"
    >
      <div>
        <FormRiwayatKarir :data-prop="dataKarir" />
      </div>
    </modal>
    <modal
      name="modal-education"
      width="400px"
      height="auto"
      @close="console.log('closed')"
    >
      <div>
        <FormRiwayatPendidikan :data-prop="dataPendidikan" />
      </div>
    </modal>
    <modal
      name="modal-message"
      width="500px"
      height="auto"
      @close="console.log('closed')"
    >
      <div>
        <FormMessage />
      </div>
    </modal> -->
  </div>
</template>
