<template>
    <div>

        <!-- Navigation -->
        <nav class="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
            <div class="container">

                <router-link class="navbar-brand" to="/">
                    <img src="@/assets/img/logo.png" height="50" alt="">
                </router-link>

                <button class="navbar-toggler navbar-toggler-right" 
                    :class="navbarShow ? 'active' : ''"
                    @click="navbarShow = !navbarShow"
                    type="button">

                    <i v-if="navbarShow" class="fas fa-times fa-lg"></i>
                    <i v-else class="fas fa-bars fa-lg"></i>
                </button>

                <div class="collapse navbar-collapse justify-content-lg-between" 
                    :class="navbarShow ? 'active' : ''"
                    id="navbarResponsive">

                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <router-link class="nav-link" :to="`/${$i18n.locale}/`"> {{ $t('nav.home') }} </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" :to="`/${$i18n.locale}/about`"> {{ $t('nav.about') }} </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" :to="`/${$i18n.locale}/contact`"> {{ $t('nav.contact') }} </router-link>
                        </li>
                    </ul>

                    <ul class="navbar-nav">
                        <li class="nav-item dropdown show">
                            <a class="nav-link dropdown-toggle" href="#" @click.prevent="toggleLangDrp = !toggleLangDrp">
                                {{ $i18n.locale }}
                            </a>
                            <div class="dropdown-menu show" v-if="toggleLangDrp">
                                <a href="#" class="dropdown-item" @click.prevent="changeLang('en')">
                                    <img src="@/assets/img/icons/flag_en.svg" height="15" class="mr-2" alt="">
                                    En
                                </a>
                                <a href="#" class="dropdown-item" @click.prevent="changeLang('fa')">
                                    <img src="@/assets/img/icons/flag_fa.svg" height="15" class="mr-2" alt="">
                                    Fa
                                </a>
                            </div>
                        </li>
                    </ul>

                </div>
                
            </div>
        </nav>


        ‍<router-view />


        <!-- Footer -->
        <footer class="mt-5">
            <div class="container">
            <div class="row">
                <div class="col-lg-8 col-md-10 mx-auto">
                <ul class="list-inline text-center">
                    <li class="list-inline-item">
                    <a href="#">
                        <span class="fa-stack fa-lg">
                        <i class="fas fa-circle fa-stack-2x"></i>
                        <i class="fab fa-twitter fa-stack-1x fa-inverse"></i>
                        </span>
                    </a>
                    </li>
                    <li class="list-inline-item">
                    <a href="#">
                        <span class="fa-stack fa-lg">
                        <i class="fas fa-circle fa-stack-2x"></i>
                        <i class="fab fa-facebook-f fa-stack-1x fa-inverse"></i>
                        </span>
                    </a>
                    </li>
                    <li class="list-inline-item">
                    <a href="#">
                        <span class="fa-stack fa-lg">
                        <i class="fas fa-circle fa-stack-2x"></i>
                        <i class="fab fa-github fa-stack-1x fa-inverse"></i>
                        </span>
                    </a>
                    </li>
                </ul>
                <p class="copyright text-muted mt-4" v-html="$t('footer.copyright')"/>
                </div>
            </div>
            </div>
        </footer>
        
    </div>
</template>

<script>
export default {
    name: 'app',
    data() {
        return {
            toggleLangDrp: false,
            navbarShow: false
        }
    },
    methods: {
        changeLang(language) {
            this.$i18n.locale = language
            this.$router.push({
                params: { lang: language }
            })
            this.toggleLangDrp = false
        }
    }
}
</script>