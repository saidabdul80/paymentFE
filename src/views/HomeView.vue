<template>
  <div class="tw-flex tw-overflow-hidden tw-flex-col tw-bg-black">
    <header class="tw-flex tw-w-full tw-bg-stone-900 tw-min-h-[73px] tw-max-md:tw-max-w-full"></header>
    <div class="tw-w-[90%] tw-mx-auto"> 
      <div class="tw-grid md:tw-grid-cols-5 tw-w-full tw-grid-cols-1 md:tw-my-[7rem] md:tw-gap-20">
        <section class="md:tw-col-span-2">
          <div class="tw-flex tw-flex-col tw-items-start tw-self-stretch tw-my-auto tw-w-full tw-font-bold tw-max-md:tw-mt-10 tw-max-md:tw-max-w-full">
            <h1 class="tw-self-stretch tw-text-3xl tw-mt-20 tw-text-white tw-max-md:tw-max-w-full">
              Simplify Payments With CowrisPay
            </h1>
            <div v-if="!ls.isLoggedIn()" class="tw-flex tw-gap-5 tw-justify-between sm:tw-mt-20 tw-mt-2 tw-max-w-full tw-text-base tw-text-center tw-w-[411px]">
              <v-btn to="/register"   class="tw-px-5 tw-py-3 tw-capitalize tw-text-black tw-bg-white tw-rounded-xl tw-min-h-[47px]">
                Get Started for Free
              </v-btn>
              <v-btn to="/ugcc/interest" variant="outlined" class="tw-px-5 tw-py-3 tw-capitalize tw-text-white tw-border-white tw-rounded-xl tw-min-h-[47px]">
                Join UGCC
              </v-btn>
              <!-- <button class="tw-px-5 tw-py-3 tw-text-white tw-bg-black tw-rounded-xl tw-border tw-border-white tw-border-solid tw-min-h-[47px]">
                Join Waiting List
              </button> -->
            </div>
            <div class="tw-flex  tw-gap-2.5 sm:tw-mt-8 tw-mt-2 tw-text-sm tw-text-white">
              <div class="tw-shrink-0 tw-my-auto tw-w-px tw-border tw-border-white tw-border-solid tw-h-[51px]"></div>
              <p class="tw-flex-auto tw-max-md:tw-max-w-full">
                Secure, easy-to-use, fast platform designed to support<br />
                your business growth - collect payments, manage transaction<br />
                with a range of advanced features tailored to meet your business needs
              </p>
            </div>   
          </div> 
          
        </section>
        <section class=" md:tw-col-span-3 tw-relative tw-hidden sm:tw-block  tw-h-[60vh] md:tw-h-auto tw-mt-10">
         <img src="@/assets/p1.svg" class=" tw-block tw-right-0 md:tw-absolute" />
         <img src="@/assets/p2.svg" class="tw-absolute md:tw-top-[50%] tw-top-[30%] md:tw-left-[10%]  tw-shadow-lg" />
        </section>
      </div>
    </div>
    <section class="tw-self-center sm:tw-mt-[120px] tw-mt-10 tw-mb-24 tw-w-[90%] tw-mx-auto tw-max-md:tw-mt-10 tw-max-md:tw-max-w-full">
      <div class="tw-grid md:tw-grid-cols-3 tw-grid-cols-1 tw-gap-6 ">
        <Article 
        icon="https://cdn.builder.io/api/v1/image/assets/TEMP/76b45a50e98e3adc35dbc75b293290c47e6c26bd4f9b91ed4bee8c7512d3dbaa?placeholderIfAbsent=true&apiKey=7ab38dc50e694bef84ba311c212964a7"
          title="Payment Collection" 
          content="Easily collect payment through our secure and efficient platform. Design to ensure that every transaction is processed seamlessly"
        />
        <Article 
        icon="https://cdn.builder.io/api/v1/image/assets/TEMP/302ddde47aaea970760c1721c994d01246272239205cab3930b6efb576112fef?placeholderIfAbsent=true&apiKey=7ab38dc50e694bef84ba311c212964a7"
          title="Seamless Integration" 
          content="Our flexible APIs and plug-and-play solutions ensure a quick and smooth setup, so you can start accepting payments without delays."
        />
        <Article 
        icon="https://cdn.builder.io/api/v1/image/assets/TEMP/c6edb2f0e54d057eb96284d021fc0fd3069040af0a24d3aa932f3850df833567?placeholderIfAbsent=true&apiKey=7ab38dc50e694bef84ba311c212964a7"
          title="24/7 Support" 
          content="Whether it’s a technical issue or a question about your transactions, we’re always here to help, ensuring your operations run smoothly without interruptions."
        />
      </div>
    </section>
    <Footer />
  </div>
</template>
<script>
import Article from "@/components/Article.vue"
import TopNav from "@/components/TopNav.vue"
import Footer from "@/components/Footer.vue"
import ls from "@/services/ls";
export default {
  components: {
    Article,
    TopNav,
    Footer
  },
  data() {
    return {
      ls: ls
    }
  },
}
</script>
<style scoped>
builder-component {
  max-width: none !important;
}
</style>