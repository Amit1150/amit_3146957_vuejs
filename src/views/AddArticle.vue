<template>
  <b-row class="justify-content-center">
      <b-col>
          <b-card no-body>
              <b-card-body>
                  <b-form @submit.prevent="onSubmit">
                      <h2 class="text-xs-center">Add Article</h2>
                      <NAGPErrors/>
                      <b-form-group
                        id="input-group-0"
                        label="Title"
                        label-for="title">
                            <b-form-input
                                id="title"
                                v-model="form.title"
                                placeholder="Enter Title"/>
                      </b-form-group>
                      <b-form-group
                        id="input-group-1"
                        label="Description"
                        label-for="description">
                            <b-form-input
                                id="descrition"
                                v-model="form.description"
                                placeholder="Enter description"/>
                      </b-form-group>
                      <b-form-group
                        id="input-group-0"
                        label="Body"
                        label-for="body">
                            <textarea
                                id="body"
                                v-model="form.body"
                                rows="5"
                                class="w-100"
                                placeholder="Write your article (in markdown)"/>
                      </b-form-group>
                      <b-form-group
                        id="input-group-0"
                        label="Tags"
                        label-for="tags">
                            <b-form-input
                                id="tags"
                                v-model="form.tags"
                                placeholder="Enter Tags (comma seperated)"/>
                      </b-form-group>
                      <b-button 
                            type="submit"
                            class="mr-3" 
                            variant="success">
                            Submit
                        </b-button>
                  </b-form>
              </b-card-body>
          </b-card>
      </b-col>
  </b-row>
</template>

<script>
import NAGPErrors from '../components/ErrorList'
import { ARTICLE_ADD } from "@/store/actions.type";

export default {
    name: 'NAGPAddArticle',
    components: {
        NAGPErrors
    },
    data() {
        return {
            form: {
                title: '',
                description: '',
                body: '',
                tags: ''
            }
        }
    },
    methods: {
        onSubmit() {
            this.$store.dispatch(ARTICLE_ADD, this.form)
                .then(() => this.$router.push({ name: "my-articles" }));
        }
    }
}
</script>
