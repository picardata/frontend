<template>
  <div class="mt-5">
    <div class="row">
      <div class="col-4">
        <h1>Create blank form</h1>
      </div>
      <div class="col-8">
        <span class="align-middle float-right">
          <nuxt-link to="/form/new" class="btn btn-lg bg-light-primary btn-create">Create other blank form</nuxt-link>
        </span>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-4">
        <h5><b>Questions</b></h5>
      </div>
      <div class="col-8">
        <span class="align-middle float-right">
          <nuxt-link to="/form/share" class="btn btn-lg bg-default btn-share">
            <font-awesome-icon :icon="['fas', 'eye']" />
            Preview form</nuxt-link>
          <nuxt-link to="/form/share" class="btn btn-lg btn-primary btn-share">Share form</nuxt-link>
        </span>
      </div>
    </div>
    <div class="row mt-5">
      <form>
        <div class="card">
          <div class="card-body">
            <div>
              <hr class="header-break">
            </div>
            <div class="form-group">
              <input type="text" name="name" class="form-control title" placeholder="Untitled form">
            </div>
            <div class="form-group">
              <input type="text" name="description" class="form-control description" placeholder="Form description">
            </div>
          </div>
        </div>
        <div class="card mt-5">
          <div class="card-body">
            <div class=" col-8">
              <input type="text" name="question" class="form-control question" placeholder="Question">
              <div class="btn-group type-dropdown col-12 mt-5">
                <button
                  class="btn btn-default btn-lg text-left dropdown-toggle"
                  type="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="true"
                >
                  <font-awesome-icon :icon="['fas', 'grip-lines']" />&nbsp;Short answer
                  <font-awesome-icon :icon="['fas', 'angle-down']" class="fa-pull-right" />
                </button>
                <div class="dropdown-menu">
                  <a class="dropdown-item" href="#">
                    <font-awesome-icon :icon="['fas', 'grip-lines']" />&nbsp;Short answer</a>
                  <a class="dropdown-item" href="#">
                    <font-awesome-icon :icon="['fas', 'align-left']" />&nbsp;Paragraph</a>
                  <div class="dropdown-divider" />
                  <a class="dropdown-item" href="#">
                    <font-awesome-icon :icon="['fas', 'dot-circle']" />&nbsp;Multiple Choice</a>
                  <a class="dropdown-item" href="#">
                    <font-awesome-icon :icon="['fas', 'check-square']" />&nbsp;Checkboxes</a>
                  <a class="dropdown-item" href="#">
                    <font-awesome-icon :icon="['fas', 'caret-square-down']" />&nbsp;Dropdown</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexVue'
}
</script>

<style scoped>
h1 {
  font-size: 36px;
  font-weight: bolder;
}

.btn-create, .btn-share {
  height: 56px;
  border-radius: 40px;
  font-weight: normal;
  font-size: 16px;
  padding: 15px 15px;
}

.btn-create {
  padding: 15px 15px;
}

.btn-share {
  padding: 15px 30px;
}

form {
  width: 100%;
}

.form-control {
  color: black;
}

input.description, input.title {
  border-width: 0;
}

input.title {
  font-size: 48px;
}

input.description {
  font-size: 18px;
}

input.question:focus {
  border-color: var(--primary);
}

.type-dropdown {
  padding: 0;
}

.type-dropdown .btn {
  height: 56px;
  text-align: left;
  border-radius: 15px;
  background-color: #EFF0F7;
  font-size: 16px;
}

input.question {
  font-size: 24px;
  border-width: 0 0 2px 0;
  border-radius: 0;
}

.form-control:focus {
  box-shadow: none;
}

hr.header-break {
  border-top: 8px solid var(--blue);
  margin-left: 15px;
  width: 130px;
}
.dropdown-toggle::after {
  display: none;
}

</style>
