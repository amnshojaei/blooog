<template>
    <div>

        <!-- Page Header -->
        <header class="masthead" :style="{ 'background-image': 'url(' + contactImg + ')' }">
            <div class="overlay"></div>
            <div class="container">
            <div class="row">
                <div class="col-lg-8 col-md-10 mx-auto">
                <div class="page-heading">
                    <h1>{{ $t('contact.title') }}</h1>
                    <span class="subheading">{{ $t('contact.subtitle') }}</span>
                </div>
                </div>
            </div>
            </div>
        </header>

        <!-- Main Content -->
        <div class="container">
            <div class="row">
            <div class="col-lg-8 col-md-10 mx-auto">
                <p v-html="$t('contact.body')" />
                
                <form name="sentMessage" id="contactForm" @submit.prevent="sendForm">

                    <!-- Full Name -->
                    <div class="control-group">
                        <div class="form-group floating-label-form-group controls">
                        <label>{{ $t('contact.form.fullname') }}</label>

                        <input type="text" 
                            class="form-control" 
                            :placeholder="$t('contact.form.fullname')" 
                            id="name" 
                            required
                            v-model="form.fullname">

                        <p class="help-block text-danger"></p>
                        </div>
                    </div>


                    <!-- Email -->
                    <div class="control-group">
                        <div class="form-group floating-label-form-group controls">
                        <label>{{ $t('contact.form.email') }}</label>

                        <input type="email" 
                            class="form-control" 
                            :placeholder="$t('contact.form.email')" 
                            id="email" 
                            required
                            v-model="form.email">

                        <p class="help-block text-danger"></p>
                        </div>
                    </div>


                    <!-- Subject -->
                    <div class="control-group">
                        <div class="form-group col-xs-12 floating-label-form-group controls">
                        <label>{{ $t('contact.form.subject') }}</label>

                        <input type="text" 
                            class="form-control" 
                            :placeholder="$t('contact.form.subject')" 
                            id="phone" 
                            v-model="form.subject">

                        <p class="help-block text-danger"></p>
                        </div>
                    </div>


                    <!-- Message -->
                    <div class="control-group">
                        <div class="form-group floating-label-form-group controls">
                        <label>{{ $t('contact.form.msg') }}</label>

                        <textarea rows="5" 
                            class="form-control" 
                            :placeholder="$t('contact.form.msg')" 
                            id="message" 
                            required 
                            v-model="form.message"></textarea>

                        <p class="help-block text-danger"></p>
                        </div>
                    </div>

                    <br>
                    <div id="success"></div>
                    
                    <div class="form-group">
                        <button type="submit" class="btn btn-primary px-5 btn-lg" id="sendMessageButton">
                            {{ $t('send') }}
                        </button>
                    </div>

                </form>
            </div>
            </div>
        </div>


    </div>
</template>

<script>
import contactImg from '@/assets/img/contact-bg.jpg'
import { postRequest } from '@/utils/apiRequests'

export default {
    name: 'contact',
    metaInfo() {
        return {
            title: this.$t('nav.contact')
        }
    },
    data() {
        return {
            contactImg: contactImg,
            form: {
                fullname: '',
                email: '',
                subject: '',
                message: ''
            }
        }
    },
    methods: {
        sendForm() {
            postRequest('/wp-json/contact-form-7/v1/contact-forms', this.form)
            .then(response => {
                console.log('Success --> ' + response.data)
            })
            .catch(error => {
                console.log('Error --> ' + error)
            })
        }
    }
}
</script>