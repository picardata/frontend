<template>
  <div class="col-8">
    <div class="row mt-3">
      <div class="col-sm-11">
        Allow only specific file types
      </div>
      <div class="col-sm-1 text-right pr-0">
        <b-form-checkbox
          name="check-button"
          class="d-inline text-primary font-weight-600 pr-0"
          switch
        >
          <span class="button-required" />
        </b-form-checkbox>
      </div>
    </div>
    <div class="row mt-3 type-dropdown">
      <div class="col-sm-2">
        <button
          class="btn btn-default btn-lg text-left dropdown-toggle"
          type="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="true"
        >
          1
          <font-awesome-icon :icon="['fas', 'angle-down']" class="fa-pull-right" />
        </button>
        <div class="dropdown-menu">
          <a
            class="dropdown-item"
          >
            1
          </a>
          <a
            class="dropdown-item"
          >
            2
          </a>
        </div>
      </div>
      <div class="col-sm-1 lh-55">
        to
      </div>
      <div class="col-sm-2">
        <button
          class="btn btn-default btn-lg text-left dropdown-toggle"
          type="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="true"
        >
          5
          <font-awesome-icon :icon="['fas', 'angle-down']" class="fa-pull-right" />
        </button>
        <div class="dropdown-menu">
          <a
            class="dropdown-item"
          >
            1
          </a>
          <a
            class="dropdown-item"
          >
            2
          </a>
        </div>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-sm-12">
        <ol>
          <li>
            <input
              type="text"
              name="input-answer"
              class="form-control pcd"
              value="Label (optional)"
            >
          </li>
          <li>
            <input
              type="text"
              name="input-answer"
              class="form-control pcd"
              value="Label (optional)"
            >
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LinearScale'
}
</script>

<style scoped>
ol{
 padding-left: 30px;
}
ol li:not(:first-child){
  margin-top: 1.5rem;
}
.dropdown-toggle::after {
  display: none;
}

.dropdown-toggle:hover {
  color: #172b4d;
}
.type-dropdown {
  padding: 0;
}

.type-dropdown .btn {
  height: 56px;
  text-align: left;
  background-color: transparent;
  box-shadow: none;
  border-width: 0px 0px 0px 0px;
  font-size: 16px;
  width: 100%;
  border-radius: 0px;
  font-weight: normal;
  color: #172b4d;
}
.type-dropdown .btn span{
  float: right;
  margin-right: 10px;
}
button {
  border-width: 0;
  color: #14142B;
}

button span {
  font-size: 1rem;
}
.lh-55{
  line-height: 55px;
}

input.pcd{
  border-width: 0 0 2px 0;
  border-radius: 0;
  padding-left: 5px;
  font-size: 16px;
  color:#313131;
}
input.pcd:focus {
  border-color: var(--primary);
  box-shadow: none;
}
</style>
