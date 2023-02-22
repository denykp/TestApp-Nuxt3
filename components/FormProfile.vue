<template>
  <div class="p-10">
    <span class="text-xl font-bold">Edit Riwayat Karir</span>
    <hr class="border-gray-500 mt-1" />
    <FormInput
      v-model="formData.name"
      width="100%"
      class="mt-4"
      name="name"
      label="Name"
      :error="errors['name']"
      @validate="validate('name')"
    />
    <!-- <FormInput
      v-model="formData.gender"
      width="100%"
      class="mt-4"
      name="gender"
      label="Gender"
      :error="errors['gender']"
      @validate="validate('gender')"
    /> -->
    <div class="mt-4">
      <label for="gender" class="font-semibold">Gender</label>
      <select
        v-model="formData.gender"
        name="gender"
        class="border border-gray-300 rounded w-full"
        style="height: 40px"
      >
        <option
          v-for="(item, index) in [
            { label: 'Male', value: '0' },
            { label: 'Female', value: '1' },
          ]"
          :key="index"
          class="border border-gray-300"
          :value="item.value"
        >
          {{ item.label }}
        </option>
      </select>
    </div>
    <FormInput
      v-model="formData.birthday"
      width="100%"
      class="mt-4"
      type="date"
      name="birthday"
      label="Birthday"
      :error="errors['birthday']"
      @validate="validate('birthday')"
    />
    <FormInput
      v-model="formData.hometown"
      width="100%"
      class="mt-4"
      name="hometown"
      label="Hometown"
      :error="errors['hometown']"
      @validate="validate('hometown')"
    />
    <FormInput
      v-model="formData.bio"
      width="100%"
      class="mt-4"
      name="bio"
      label="Bio"
      :error="errors['bio']"
      @validate="validate('bio')"
    />

    <div class="flex justify-center gap-4 mt-4">
      <FormButton class-prop="w-36" @click="$modal.hide('modal-profile')"
        >Cancel</FormButton
      >
      <FormButton class-prop="w-36" :disabled="!isValid" @click="submit"
        >Save</FormButton
      >
    </div>
  </div>
</template>

<script>
import { set } from 'vue'
import * as yup from 'yup'

const schema = yup.object({
  name: yup.string().required().label('Name'),
  gender: yup.number().required().label('Gender'),
  birthday: yup.date().required().label('Birthday'),
  hometown: yup.string().required().label('Hometown'),
  bio: yup.string().required().label('Bio'),
})

export default {
  props: {
    dataProp: {
      type: Object,
      default: undefined,
    },
  },
  data() {
    return {
      formData: {
        name: '',
        gender: 0,
        birthday: '',
        hometown: '',
        bio: '',
      },
      errors: {},
    }
  },
  computed: {
    isValid() {
      return Object.values(this.errors).join('').length === 0
    },
  },
  mounted() {
    if (this.dataProp) {
      Object.keys(this.formData).forEach((key) => {
        if (key === 'gender') {
          this.formData[key] = this.dataProp[key] === 'female' ? 1 : 0
        } else {
          this.formData[key] = this.dataProp[key]
        }
      })
    }
  },
  methods: {
    async submit() {
      try {
        await schema.validate(this.formData, {
          abortEarly: false,
        })

        const submitData = new FormData()
        Object.keys(this.formData).forEach((key) => {
          submitData.append(key, this.formData[key])
        })
        await this.$axios.post('/api/profile', submitData)
        this.$toast.success('Data profile berhasil disimpan')
        this.$auth.fetchUser()
        this.$modal.hide('modal-profile')
      } catch (error) {
        if (error.errors) {
          error.errors.forEach((err) => {
            this.$toast.error(err)
          })
          this.errorMapping(error)
        } else {
          this.$toast.global.error()
        }
      }
    },
    validate(field) {
      schema
        .validateAt(field, this.formData)
        .then((res) => {
          set(this.errors, field, '')
        })
        .catch((err) => {
          set(this.errors, field, err.message)
        })
    },
    errorMapping({ inner }) {
      inner.forEach((err) => {
        set(this.errors, err.path, err.message)
      })
    },
  },
}
</script>

<style>
</style>