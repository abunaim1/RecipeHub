const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const loadBanner = () => {
  fetch(`https://recipehub-backend-ya12.onrender.com/banner/title/?id=${id}`)
    .then((res) => res.json())
    .then((data) => displayBanner(data))
    .catch((error) => console.error("Error fetching banner data:", error));
};


const displayBanner = (data) => {
  const parent = document.getElementById("banner-title");
  parent.innerHTML = ""; // Clear previous content
  const div = document.createElement("div");
  div.innerHTML = `
      <h1 class="text-3xl py-4"><a href="#">${data[0 ].title}</a></h1>
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
  fetch("https://recipehub-backend-ya12.onrender.com/banner/title/")
    .then((res) => res.json())
    .then((data) => {
      if (data.length > 0) {
        const ids = data.map((item) => item.id);
        
        // Select a random id from the list of ids
        const randomIndex = Math.floor(Math.random() * data.length);
        const selectItems = data[randomIndex]
        const randomlySelectedIdFromExistingObject = selectItems.id

        // set this random existing id to the url as a parameter.
        const newUrl = new URL(window.location)
        newUrl.searchParams.set("id", randomlySelectedIdFromExistingObject)
        window.history.pushState({}, "", newUrl);
      }
    })
})();

loadBanner()