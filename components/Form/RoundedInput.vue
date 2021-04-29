<template>
    <div class="form-group">
        <label class="label">{{this.label}}</label>
        <input :placeholder="this.placeholder" 
               required="required" 
               type="text" 
               class="form-control picardata-input-rounded login-credential-input" 
               :disabled="this.disabled"
               :value="value" 
               @input="$emit('input', $event.target.value)"> 
    </div>
</template>
<script>
export default {
  name: 'RoundedInput',
  props: ["value", "placeholder", "disabled", "label"]
}
</script>
<style lang="scss" scoped>
.login-credential-input {
  background: #EFF0F7;
  border-radius: 15px;
  color: #181C3B;
  min-height: 64px;
  border: 1px solid #dee2e6;
  font-size: 1rem;
  padding: 0 24px;

  &:disabled {
    opacity: 0.5;
  }

  &:focus {
    color: #181C3B;
    background-color: #EFF0F7;
    border: 1px solid #dee2e6;
    outline: 0;
    box-shadow: none;
  }

  &::placeholder {
    color: #A0A3BD;
  }

  + .input-group-append {
    background: #EFF0F7;
    border-radius: 0 16px 16px 0;

    .input-group-text {
      border-radius: 0 16px 16px 0;
      font-size: 1rem;
    }
  }

  &.error {
    background: #EFF0F7;
    border: 2px solid #ED2E7E;
  }
}
</style>