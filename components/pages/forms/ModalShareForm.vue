<template>
  <div>
    <modal :show="shareForm" modal-classes="share-form" @close="closeModal">
      <div class="modal-header">
        <div class="icon-back" @click="closeModal"><i class="fa fa-arrow-left" /></div>
        <h3>Share "{{ title }}" form</h3>
      </div>
      <div class="modal-body">
        <div class="checkbox">
          <input id="colect-email" type="checkbox" value="1">
          <label for="colect-email">Collect email addresses</label>
        </div>
        <div class="font-weight-bold">
          <span class="color dark-blue mr-4">Share Via</span>
          <span class="color neutral mr-4"> <i class="fa fa-chevron-right"></i> </span>
          <span :class="['color mr-1 pointer', (type === 'email' ? 'main': 'label')]" @click="changeShareMethod('email')">Email</span>
          <span class="color seperate mr-1">|</span>
          <span :class="['color mr-1 pointer', (type === 'link' ? 'main': 'label')]" @click="changeShareMethod('link')" >Link</span>
        </div>
        <div v-if="type === 'email'">
          <h4 class="sub-title color main">Email</h4>
          <ValidationObserver ref="form">
            <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" name="email address">
              <input v-model="formRecipient" type="text" class="form-control no-border pl-0" placeholder="To:">
              <span class="text-danger">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" name="subject email">
              <input v-model="subject" type="text" class="form-control no-border pl-0" placeholder="Subject:">
              <span class="text-danger">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider v-slot="{ errors }" mode="passive" rules="required" name="message">
              <input v-model="content" type="text" class="form-control no-border pl-0" placeholder="message">
              <span class="text-danger">{{ errors[0] }}</span>
            </ValidationProvider>
          </ValidationObserver>
        </div>
        <div v-else>
          <h4 class="sub-title color main">Link</h4>
          <input v-model="getLink" type="text" class="form-control no-border pl-0" disabled="">
        </div>
      </div>
      <div class="modal-footer mt-4">
        <a @click="closeModal" class="mr-4 font-weight-bold color main pointer">Cancel</a>
        <button v-if="type === 'email'" class="btn btn-outline-primary" @click="sendForm">Send Email</button>
        <button v-if="type === 'link'" class="btn btn-outline-primary" @click="copyToClipborad">Copy</button>
      </div>
    </modal>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  name: "ModalShareForm",
  props: ['shareForm', 'title', 'id'],
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data () {
    return {
      formRecipient: '',
      subject: '',
      content: '',
      type: 'email',
      url: this.url
    }
  },
  computed: {
    getLink () {
      return this.url + this.id + '?account=public'
    }
  },
  watch: {
    shareForm(newVal, oldVal) {
      this.formRecipient = ''
      this.subject = ''
      this.content = ''
      this.type = 'email'
    }
  },
  mounted() {
    this.url = window.location.origin + '/forms/surveys/'
  },
  methods: {
    closeModal () {
      this.$emit('closeShareForm')
    },
    changeShareMethod (value) {
      this.type = value
    },
    copyToClipborad () {
      const el = document.createElement('textarea');
      el.value = this.linkForm;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      this.$notify({type: 'success', message: 'Success copy link to your clipboard'})
    },
    async sendForm () {
      const isValid = await this.$refs.form.validate()
      if (!isValid) {
        return false
      }

      this.formRecipient.split(',').map((v) => {
        this.$axios.$post('/api/form-respondents/', {
          subject: this.subject,
          content: this.content,
          formRespondent: {
            email: v.trim(),
            form: this.id
          }
        })
            .then(res => console.log(res))
            .catch(err => console.log(err))
      })
    },
  }
}
</script>