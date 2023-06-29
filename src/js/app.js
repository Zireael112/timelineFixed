import GetCoords from "./coords";

const inputForm = document.querySelector(".input-form");
const list = document.querySelector(".list");
const video = document.querySelector(".btn-video");
const audio = document.querySelector(".btn-audio");
const audioClose = document.querySelector(".btn-audio-close");
const videoClose = document.querySelector(".btn-video-close");
const modal = document.querySelector(".modals");
const modalInput = modal.querySelector(".modal-input-coords");
const btnModalCancel = modal.querySelector(".btn-cancel");
const btnModalOk = modal.querySelector(".btn-ok");
const time = new Date().toLocaleString("ru-RU", {
  timeZone: "Europe/Moscow",
});

inputForm.addEventListener("keyup", (event) => {
  if (event.target.value.trim() === "") {
    return;
  }
  if (event.keyCode === 13) {
    console.log(navigator.geolocation);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (data) {
          const { latitude, longitude } = GetCoords(data.coords);
          const createDiv = document.createElement("div");
          createDiv.classList.add("element");
          createDiv.innerHTML = `
            <div class="elem-text">${event.target.value}</div>
            <div class="elem-time">${time}</div>
            <div class="elem-coords">[${latitude}, ${longitude}]</div>
          `;
          list.prepend(createDiv);
          event.target.value = "";
        },
        function () {
          modal.hidden = false;
          btnModalCancel.addEventListener("click", () => {
            modal.hidden = true;
            modalInput.value = "";
          });
          btnModalOk.addEventListener("click", () => {
            const result = GetCoords(modalInput.value);
            const { latitude, longitude } = result;
            const createDiv = document.createElement("div");
            createDiv.classList.add("element");
            createDiv.innerHTML = `
                <div class="elem-text">${event.target.value}</div>
                <div class="elem-time">${time}</div>
                <div class="elem-coords">[${latitude}, ${longitude}]</div>
              `;
            list.prepend(createDiv);
            event.target.value = "";
            modal.hidden = true;
            modalInput.value = "";
          });
        },
        { enableHighAccuracy: true }
      );
    }
  }
});

video.addEventListener("click", async () => {
  videoClose.hidden = false;
  video.hidden = true;
  video.classList.add("recording");
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });

  const recorder = new MediaRecorder(stream);
  const chunks = [];

  recorder.addEventListener("dataavailable", (event) => {
    chunks.push(event.data);
  });

  recorder.addEventListener("stop", () => {
    navigator.geolocation.getCurrentPosition(
      function (data) {
        const { latitude, longitude } = data.coords;
        const blob = new Blob(chunks);
        const createDiv = document.createElement("div");
        const vd = document.createElement("video");
        vd.classList.add("elem-text");
        vd.classList.add("video-div");
        createDiv.classList.add("element");
        createDiv.innerHTML = `
            <div class="elem-time">${time}</div>
            <div class="elem-coords">[${latitude}, ${longitude}]</div>
          `;
        vd.controls = true;
        vd.src = URL.createObjectURL(blob);
        createDiv.prepend(vd);
        list.prepend(createDiv);
      },
      function (err) {
        console.log(err);
      },
      { enableHighAccuracy: true }
    );
  });

  recorder.start();

  videoClose.addEventListener("click", () => {
    recorder.stop();
    stream.getTracks().forEach((el) => {
      el.stop();
    });
    videoClose.hidden = true;
    video.hidden = false;
    video.classList.remove("recording");
  });
});

audio.addEventListener("click", async () => {
  audioClose.hidden = false;
  audio.hidden = true;
  audio.classList.add("recording");
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
  });

  const recorder = new MediaRecorder(stream);
  const chunks = [];

  recorder.addEventListener("dataavailable", (event) => {
    chunks.push(event.data);
  });

  recorder.addEventListener("stop", () => {
    navigator.geolocation.getCurrentPosition(
      function (data) {
        const { latitude, longitude } = data.coords;
        const blob = new Blob(chunks);
        const createDiv = document.createElement("div");
        const vd = document.createElement("audio");
        vd.classList.add("elem-text");
        vd.classList.add("audio-div");
        createDiv.classList.add("element");
        createDiv.innerHTML = `
            <div class="elem-time">${time}</div>
            <div class="elem-coords">[${latitude}, ${longitude}]</div>
          `;
        vd.controls = true;
        vd.src = URL.createObjectURL(blob);
        createDiv.prepend(vd);
        list.prepend(createDiv);
      },
      function (err) {
        console.log(err);
      },
      { enableHighAccuracy: true }
    );
  });

  recorder.start();

  audioClose.addEventListener("click", () => {
    recorder.stop();
    stream.getTracks().forEach((el) => {
      el.stop();
    });
    audioClose.hidden = true;
    audio.hidden = false;
    audio.classList.remove("recording");
  });
});
