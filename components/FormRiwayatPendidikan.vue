<template>
  <div class="p-10">
    <span class="text-xl font-bold">Edit Riwayat Karir</span>
    <hr class="border-gray-500 mt-1" />
    <FormInput
      v-model="formData.school_name"
      width="100%"
      class="mt-4"
      name="school_name"
      label="School Name"
      :error="errors['school_name']"
      @validate="validate('school_name')"
    />
    <FormInput
      v-model="formData.graduation_time"
      width="100%"
      class="mt-4"
      type="date"
      name="graduation_time"
      label="Graduation Time"
      :error="errors['graduation_time']"
      @validate="validate('graduation_time')"
    />

    <div class="flex justify-center gap-4 mt-4">
      <FormButton class-prop="w-36" @click="$modal.hide('modal-education')"
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
  school_name: yup.string().required().label('School Name'),
  graduation_time: yup.date().required().label('Graduation Time'),
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
        school_name: '',
        graduation_time: null,
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
          this.formData[key] = this.dataProp[key] === 'male' ? 0 : 1
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
        await this.$axios.post('/api/profile/education', submitData)
        this.$toast.success('Data karir berhasil disimpan')
        this.$auth.fetchUser()
        this.$modal.hide('modal-education')
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