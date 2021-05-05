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
    <div class="row mt-3">
      <div class="col-sm-4 pl-0">
        <ul class="list-checks">
          <li>
            <base-checkbox class="mb-3">
              Document
            </base-checkbox>
          </li>
          <li>
            <base-checkbox class="mb-3">
              PDF
            </base-checkbox>
          </li>
          <li>
            <base-checkbox class="mb-3">
              Drawing
            </base-checkbox>
          </li>
          <li>
            <base-checkbox class="mb-3">
              Video
            </base-checkbox>
          </li>
        </ul>
      </div>
      <div class="col-sm-4 pl-0">
        <ul class="list-checks">
          <li>
            <base-checkbox class="mb-3">
              Spreadsheet
            </base-checkbox>
          </li>
          <li>
            <base-checkbox class="mb-3">
              Presentation
            </base-checkbox>
          </li>
          <li>
            <base-checkbox class="mb-3">
              Image
            </base-checkbox>
          </li>
          <li>
            <base-checkbox class="mb-3">
              Audio
            </base-checkbox>
          </li>
        </ul>
      </div>
    </div>
    <div class="row mt-3 type-dropdown">
      <button
        class="btn btn-default btn-lg text-left dropdown-toggle"
        type="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="true"
      >
        Choose max. number of files
        <font-awesome-icon :icon="['fas', 'angle-down']" class="fa-pull-right" />
        <span>1</span>
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
    <div class="row mt-3 type-dropdown">
      <button
        class="btn btn-default btn-lg text-left dropdown-toggle"
        type="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="true"
      >
        Choose max. file sizes
        <font-awesome-icon :icon="['fas', 'angle-down']" class="fa-pull-right" />
        <span>10 MB</span>
      </button>
      <div class="dropdown-menu">
        <a
          class="dropdown-item"
        >
          10 MB
        </a>
        <a
          class="dropdown-item"
        >
          9 MB
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FieldUpload'
}
</script>

<style>
.list-checks .custom-control-label::before,
.list-checks .custom-control-label::after{
  width: 30px;
  top: 0px;
  height: 30px;
  left: -2.75rem !important;
}
</style>
<style scoped>
  .list-checks{
    padding-left: 25px;
  }
  .list-checks li{
    list-style: none;
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
    border-width: 0px 0px 1px 0px;
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
</style>
