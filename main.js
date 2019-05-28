Vue.component("loading", {
  props: ["loading"],
  template: `
    <div id="loading" class="loading d-flex justify-content-center align-items-center" 
    :loading="loading" v-if="loading">
      <h2>Loading...</h2>
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>`
});

const YThot = new Vue({
  el: "#YThot",
  data: {
    header: "Youtube發燒影片 - Recently",
    url: "",
    loading: true,
    indexToCategory: [0, 1, 10, 15, 20, 24, 28],
    category: {
      0: "Recently",
      1: "Film & Animation",
      10: "Music",
      15: "Pets & Animals",
      20: "Gaming",
      24: "Entertainment",
      28: "Science & Technology"
    },
    videos: []
  },
  methods: {
    changeHeader(videoCategoryId) {
      this.header = "Youtube發燒 - " + this.category[videoCategoryId];
    },
    changeUrl(videoCategoryId) {
      if (videoCategoryId) {
        this.url =
          "https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&regionCode=TW&" +
          "&videoCategoryId=" +
          videoCategoryId +
          "&key=AIzaSyDPePVxacztVwUSRbR9eqqdPtkAbI8GQB8";
      } else {
        this.url =
          "https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&regionCode=TW&" +
          "key=AIzaSyDPePVxacztVwUSRbR9eqqdPtkAbI8GQB8";
      }
    },
    isLoading() {
      this.loading = true;
    },
    isReady() {
      this.loading = false;
    },
    getYT(videoCategoryId) {
      this.isLoading();
      this.changeHeader(videoCategoryId);
      this.changeUrl(videoCategoryId);
      axios
        .get(this.url)
        .then(response => {
          for (let i = 0; i < 20; i++) {
            this.videos.splice(i, 1, {
              title: response.data.items[i].snippet.title,
              description: response.data.items[i].snippet.description,
              url:
                "https://www.youtube.com/watch?v=" + response.data.items[i].id,
              imgUrl: response.data.items[i].snippet.thumbnails.medium.url,
              duration: response.data.items[i].contentDetails.duration
                .toLowerCase()
                .replace("pt", "")
              /*viewCount: response.data.items[i].statistics.viewCount,
                  likeCount: response.data.items[i].statistics.likeCount,
                  dislikeCount: response.data.items[i].statistics.dislikeCount,*/
            });
          }
          this.isReady();
        })
        .catch(err => {
          console.log(err);
          alert("oops!Something went wrong!");
          this.isReady();
        });
    }
  },
  mounted: function() {
    this.getYT(0);
  }
});
