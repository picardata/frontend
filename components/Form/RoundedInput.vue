<template>
    <div class="form-group">
        <label>{{this.label}}</label>
        <input :placeholder="this.placeholder" 
               required="required" 
               type="text" 
               class="form-control picardata-input" 
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

<style scoped>
.picardata-input {
  background: #EFF0F7;
  border-radius: 15px;
}
</style>