document.getElementById("header").style.marginLeft =
  document.getElementById("menu").offsetWidth + "px";

let loading = function() {
  document.getElementById("loading").style.visibility = "visible";
};
let ready = function() {
  document.getElementById("loading").style.visibility = "hidden";
};

const category = {
  0: "Recently",
  1: "Film & Animation",
  10: "Music",
  15: "Pets & Animals",
  20: "Gaming",
  24: "Entertainment",
  28: "Science & Technology"
};
let url =
  "https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&regionCode=TW&" +
  "key=AIzaSyDPePVxacztVwUSRbR9eqqdPtkAbI8GQB8";

axios
  .get(url)
  .then(function(response) {
    let videos = new Array();
    for (let i = 0; i < 20; i++) {
      videos[i] = {
        title: response.data.items[i].snippet.title,
        description: response.data.items[i].snippet.description,
        url: "https://www.youtube.com/watch?v=" + response.data.items[i].id,
        imgUrl: response.data.items[i].snippet.thumbnails.medium.url,
        duration: response.data.items[i].contentDetails.duration
          .toLowerCase()
          .replace("pt", "")
        /*viewCount: response.data.items[i].statistics.viewCount,
        likeCount: response.data.items[i].statistics.likeCount,
        dislikeCount: response.data.items[i].statistics.dislikeCount*/
      };
    }
    let YThot = new Vue({
      el: "#YThot",
      data: {
        infor: videos
      }
    });
    ready();
  })
  .catch(function(err) {
    console.log(err);
    alert("oops!Something went wrong!");
    ready();
  });

function getYT(videoCategoryId) {
  loading();
  document.getElementById("header").textContent =
    "Youtube發燒 - " + category[videoCategoryId];
  if (videoCategoryId) {
    url =
      "https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&regionCode=TW&" +
      "&videoCategoryId=" +
      videoCategoryId +
      "&key=AIzaSyDPePVxacztVwUSRbR9eqqdPtkAbI8GQB8";
  } else {
    url =
      "https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&regionCode=TW&" +
      "key=AIzaSyDPePVxacztVwUSRbR9eqqdPtkAbI8GQB8";
  }
  axios
    .get(url)
    .then(function(response) {
      let videos = new Array();
      for (let i = 0; i < 20; i++) {
        videos[i] = {
          title: response.data.items[i].snippet.title,
          description: response.data.items[i].snippet.description,
          url: "https://www.youtube.com/watch?v=" + response.data.items[i].id,
          imgUrl: response.data.items[i].snippet.thumbnails.medium.url,
          duration: response.data.items[i].contentDetails.duration
            .toLowerCase()
            .replace("pt", "")
          /*viewCount: response.data.items[i].statistics.viewCount,
          likeCount: response.data.items[i].statistics.likeCount,
          dislikeCount: response.data.items[i].statistics.dislikeCount,*/
        };
      }
      for (let i = 0, j = 0; i < 20; i++) {
        document.getElementsByClassName("title")[i].textContent =
          videos[i].title;
        document.getElementsByClassName("description")[i].textContent =
          videos[i].description;
        document
          .getElementsByClassName("img")
          [i].setAttribute("src", videos[i].imgUrl);
        document.getElementsByClassName("duration")[i].textContent =
          videos[i].duration;

        document
          .getElementsByClassName("link")
          [j].setAttribute("title", videos[i].title);
        document
          .getElementsByClassName("link")
          [j + 1].setAttribute("title", videos[i].title);
        document
          .getElementsByClassName("link")
          [j].setAttribute("href", videos[i].url);
        document
          .getElementsByClassName("link")
          [j + 1].setAttribute("href", videos[i].url);
        j += 2;
      }
      ready();
    })
    .catch(function(err) {
      console.log(err);
      alert("oops!Something went wrong!");
      ready();
    });
}
