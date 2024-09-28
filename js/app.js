const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const loadBanner = () => {
  fetch(`http://127.0.0.1:8000/banner/title/?id=${id}`)
    .then((res) => res.json())
    .then((data) => displayBanner(data))
    .catch((error) => console.error("Error fetching banner data:", error));
};

const displayBanner = (data) => {
  const parent = document.getElementById("banner-title");
  parent.innerHTML = ""; // Clear previous content
  const div = document.createElement("div");
  div.innerHTML = `
      <h1 class="text-3xl py-4"><a href="#">${data[0].title}</a></h1>
      <div>
          <p class="lg:pb-12 pb-5 lg:relative leading-/6 sm:w-full" style="font-size: 17px">
              ${data[0].description}
          </p>
          <button class="lg:absolute lg:top-52 lg:start-14 primary-color px-3 py-2 text-white rounded">
              Top 20 summer comfort food recipes
          </button>
      </div>
    `;
  parent.appendChild(div);
};

// IIFE - immediately Invoked Function Expression
(function () {
  fetch("http://127.0.0.1:8000/banner/title/")
    .then((res) => res.json())
    .then((data) => {
      if (data.length > 0) {
        const ids = data.map((item) => item.id);

        // Select a random id from the list of ids
        const randomIndex = Math.floor(Math.random() * data.length);
        const selectItems = data[randomIndex];
        const randomlySelectedIdFromExistingObject = selectItems.id;

        // set this random existing id to the url as a parameter.
        const newUrl = new URL(window.location);
        newUrl.searchParams.set("id", randomlySelectedIdFromExistingObject);
        window.history.pushState({}, "", newUrl);
      }
    });
})();

const promotion = () => {
  fetch("http://127.0.0.1:8000/promotions/list/")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((item) => {
        displayPromotion(item);
      });
    });
};

const displayPromotion = (item) => {
  const parent = document.getElementById("promotion");
  const div = document.createElement("div");

  const title = item.title.split(" ").slice(0, 3).join(" ");
  const description = item.description.split(" ").slice(0, 6).join(" ");

  div.classList.add("w-full", "h-full", "promotion", "bg-base-100", "p-4");
  div.innerHTML = ` 
    <div class="w-full h-full relative">
      <div class="w-full h-48 overflow-hidden">
        <img src="${item.image}" alt="" class="w-full h-full object-cover" />
      </div>
      <h1 class="heading text-xl text-center font-semibold mt-4">${title}</h1>
      <p class="description text-center mt-2">${description}</p>
      <button class="btn-neutral primary-color w-full mt-4 h-10">Order here</button>
    </div>
  `;

  parent.appendChild(div);
};

const podcast = () => {
  fetch("http://127.0.0.1:8000/podcast/episode/list/")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((item, index) => {
        displayPodcast(item, index);
      });
    });
};

const displayPodcast = (item, index) => {
  const podcastEp = document.getElementById("podcast-episode");
  const div = document.createElement("div");
  div.classList.add("podcast-item");

  div.innerHTML = `
        <audio class="hidden" id="audio${index}" src="${item.audio}" controls></audio>
        <div id="playPauseButton${index}" class="flex items-center text-white cursor-pointer mb-4 w-full justify-start" onclick="togglePlayPause(${index})">
        <i id="playPauseIcon${index}" class="fa-solid fa-play mr-2"></i>
        <p>${item.title}</p>
        </div>
  `;
  podcastEp.appendChild(div);
};

const togglePlayPause = (index) => {
  const audio = document.getElementById(`audio${index}`);
  const icon = document.getElementById(`playPauseIcon${index}`);
  if (audio.paused) {
    audio.play();
    icon.classList.remove("fa-play");
    icon.classList.add("fa-pause");
  } else {
    audio.pause();
    icon.classList.remove("fa-pause");
    icon.classList.add("fa-play");
  }
};


promotion();
loadBanner();
podcast();

