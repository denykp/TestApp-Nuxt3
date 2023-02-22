<template>
  <div class="p-10">
    <span class="text-xl font-bold">Edit Riwayat Karir</span>
    <hr class="border-gray-500 mt-1" />
    <FormInput
      v-model="formData.position"
      width="100%"
      class="mt-4"
      name="position"
      label="Position"
      :error="errors['position']"
      @validate="validate('position')"
    />
    <FormInput
      v-model="formData.company_name"
      width="100%"
      class="mt-4"
      name="company_name"
      label="Company Name"
      :error="errors['company_name']"
      @validate="validate('company_name')"
    />
    <FormInput
      v-model="formData.starting_from"
      width="100%"
      class="mt-4"
      type="date"
      name="starting_from"
      label="Starting From"
      :error="errors['starting_from']"
      @validate="validate('starting_from')"
    />
    <FormInput
      v-model="formData.ending_in"
      width="100%"
      class="mt-4"
      type="date"
      name="ending_in"
      label="Ending In"
      :error="errors['ending_in']"
      @validate="validate('ending_in')"
    />

    <div class="flex justify-center gap-4 mt-4">
      <FormButton class-prop="w-36" @click="$modal.hide('modal-career')"
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
  position: yup.string().required().label('Position'),
  company_name: yup.string().required().label('Company Name'),
  starting_from: yup.date().required().label('Starting In'),
  ending_in: yup.date().required().label('Ending In'),
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
        position: '',
        company_name: '',
        starting_from: null,
        ending_in: null,
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
    console.log('dataProp', this.dataProp)
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
        await this.$axios.post('/api/profile/career', submitData)
        this.$toast.success('Data karir berhasil disimpan')
        this.$auth.fetchUser()
        this.$modal.hide('modal-career')
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