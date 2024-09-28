const loadPostForTrending = () => {
    fetch("http://127.0.0.1:8000/kitchen/post/")
    .then(res => res.json())
    .then(data => {
        const winterRecipes = data.filter(item => item.seasonal === 'Winter');
        displayTrendingData(winterRecipes);
    })
    .catch(err => console.error("Error fetching data:", err));
}

const displayTrendingData = (items) => {
    const trend = document.getElementById("trending");
    // Clear previous content
    trend.innerHTML = "";
    items.forEach(item => {
        trend.innerHTML +=
        `
            <a class="trending-text" href="#">${item.title}</a>
            <hr class="trending-horizontal-line" />
        `;
    });
}
document.addEventListener("DOMContentLoaded", loadPostForTrending);
