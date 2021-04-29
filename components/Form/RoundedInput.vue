<template>
    <div class="form-group">
        <label class="label">{{this.label}}</label>
        <input :placeholder="this.placeholder" 
               required="required" 
               type="text" 
               class="form-control radius-input" 
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
