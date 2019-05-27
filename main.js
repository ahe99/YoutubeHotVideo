let loading = function() {
  document.getElementById("loading").style.visibility = "visible";
};
let ready = function() {
  document.getElementById("loading").style.visibility = "hidden";
};

const YThot = new Vue({
  el: "#YThot",
  data: {
    header: "Youtube發燒影片 - Recently",
    url: "",
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
    getYT(videoCategoryId) {
      loading();
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
          ready();
          console.log(this.videos);
        })
        .catch(err => {
          console.log(err);
          alert("oops!Something went wrong!");
          ready();
        });
    }
  },
  mounted: function() {
    this.getYT(0);
  }
});
