<template lang="html">
  <section class="error-500">
    <div class="container-scroller">
      <div class="container-fluid page-body-wrapper full-page-wrapper">
        <div
          class="content-wrapper d-flex align-items-center text-center error-page bg-info"
        >
          <div class="row flex-grow">
            <div class="col-lg-7 mx-auto text-white">
              <div class="row align-items-center d-flex flex-row">
                <div class="col-lg-6 text-lg-right pr-lg-4">
                  <h1 class="display-1 mb-0">500</h1>
                </div>
                <div class="col-lg-6 error-page-divider text-lg-left pl-lg-4">
                  <h2>⚠️ Desculpe!</h2>
                  <h3 class="font-weight-light">Erro interno!</h3>
                </div>
              </div>
              <div class="row mt-5">
                <div class="col-12 text-center mt-xl-2">
                  <router-link class="text-white font-weight-medium" to="/">
                    Voltar ao início
                  </router-link>
                </div>
              </div>
              <div class="row mt-5">
                <div class="col-12 mt-xl-2">
                  <p class="text-white font-weight-medium text-center">
                    <span
                      class="d-block text-center text-sm-left d-sm-inline-block"
                      >Machi Series. Copyright © {{ new Date().getFullYear() }}
                      <a
                        href="https://www.github.com/lubien"
                        target="_blank"
                        class="text-muted"
                      >
                        <i class="mdi mdi-github-circle"></i> Lubien </a
                      >. All rights reserved.</span
                    >
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- content-wrapper ends -->
      </div>
      <!-- page-body-wrapper ends -->
    </div>
  </section>
</template>

<script lang="js">
export default {
  name: 'error-500'
}
</script>

<style scoped lang="scss">
.error-500 {
}
</style>
