module.exports = {
  watch: {
    'model': {
      handler: function (value) {
        this.$emit('changed-model', value);
      },
      deep: true
    }
  },
  data: {
    loadedStories: []
  },
  created: function() {
    var _this = this;

    if (!this.schema.options) {
      console.error('localized-story-loader-flat: Define the following options: 0 : token, 1 : starts_with');
      return false;
    }
    jQuery.ajax({
      url: 'https://api.storyblok.com/v1/cdn/stories/?token=' + this.schema.options[0].value + '&starts_with=' + this.schema.options[1].value + '/&is_startpage=false&time=' + Date.now(),
      success: function success(response) {
        _this.$set('data.loadedStories', response.stories);
      }
    });
  },
  props: ['model','schema'],
  template: "<div class=uk-form-row><select class=uk-width-1-1 v-model=model><option><option v-for=\"loadedStory in data.loadedStories\" v-bind:value=loadedStory.uuid>{{ loadedStory.name }}</select></div>"
};
