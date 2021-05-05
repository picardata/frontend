<template>
  <div class="col-8">
    <div>
      <textarea
          name="text-desc"
          class="form-control pcd mt-3"
      >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin venenatis, arcu vel scelerisque bibendum, odio turpis gravida</textarea>
        <input
            type="text"
            name="input-answer"
            class="form-control pcd mt-3"
            placeholder="Short-answer text"
        >
    </div>
  </div>
</template>

<script>
export default {
  name: "Textfield"
}
</script>

<style scoped>
textarea.pcd,input.pcd{
  border-width: 0 0 2px 0;
  border-radius: 0;
  padding-left: 5px;
  font-size: 16px;
  color:#313131;
}
textarea.pcd:focus,input.pcd:focus {
  border-color: var(--primary);
  box-shadow: none;
}
</style>