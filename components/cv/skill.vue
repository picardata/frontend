<template>
  <div>
    <ValidationObserver ref="form" v-slot="{ handleSubmit }" @keyup="onFormChange">
      <form @submit.prevent="handleSubmit(post)">
        <div class="card border p-4">
          <div class="all-form-title bold-text form-field field-group">
            <span class="text-label">Skills</span>
          </div>
          <div v-for="(skill, index) in skills" :key="'skills-' + index">
            <div class="multiple-fields-wrapper">
              <div class="all-form-title bold-text form-field two-colls first-coll">
                <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" vid="skill.name" name="Name">
                  <input v-model="skill.name" type="text" class="form-input form-control" placeholder="">

                  <span class="text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>

              <div v-if="index !== 0" class="all-form-title bold-text form-field two-colls">
                <button type="button" class="btn btn-sm img-btn float-left mt-2 pt-2" @click.prevent="removeSkill(skill, index)">
                  <img src="~/assets/menu_icons/delete.png" alt="delete">
                </button>
              </div>
            </div>
          </div>
        </div>

        <button type="button" class="btn btn-sm btn-primary btn-add-milestone pl-4 pr-4 mb-4" @click.prevent="addSkill()">
          Add Skill
        </button>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  name: 'Skills',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  props: [
    'skills'
  ],
  data () {
    return {
      dateFieldConfig: {
        allowInput: true,
        altFormat: 'F Y',
        altInput: true
      },
      skillsWrapperKey: 0
    }
  },
  methods: {
    addSkill () {
      const newSkill = {
        name: '',
        status: 1,
        employee: ''
      }

      this.skills.push(newSkill)
      this.skillsWrapperKey++
    },
    removeSkill (skill, index) {
      const skills = this.skills

      if (Object.hasOwnProperty.call(skill, 'id')) {
        const skillUuid = skill.uuid

        this.$axios.$patch('/api/skill/' + skillUuid, {
          name: skill.name,
          status: 0,
          employee: skill.employee
        }).then(() => {
          skills.splice(index, 1)
        }).catch((e) => {
          const errors = {}

          Object.entries(e.response.data.errors).forEach(function (value) {
            const key = value[0]
            errors[key] = value[1]
          })

          this.$refs.form.setErrors(errors)
          return false
        })
      } else {
        skills.splice(index, 1)
      }
    },
    async post () {
      const isValid = await this.$refs.form.validate()
      if (!isValid) {
        return false
      }

      return isValid
    },
    onFormChange () {
    }
  }
}
</script>
