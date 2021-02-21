<template>
  <div class="form-group">
    <label>
      <slot />
    </label>
    <select
      v-if="controlType === 'select'"
      class="form-control"
      v-bind="$attrs"
      :value="value"
      @change="$emit('input', $event.target.value)"
    >
      <option v-for="choice in choices" :key="choice.id" :value="choice.id">
        {{ choice.name }}
      </option>
    </select>
    <input
      v-if="controlType === 'input'"
      class="form-control"
      v-bind="$attrs"
      :value="value"
      @input="$emit('input', $event.target.value)"
    >
    <textarea
      v-if="controlType === 'textarea'"
      class="form-control"
      rows="10"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: 'AppInputControl',
  props: {
    controlType: {
      type: String,
      default: 'input'
    },
    value: {
      type: String,
      default: ''
    },
    choices: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>
