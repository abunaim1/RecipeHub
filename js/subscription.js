const navBar = () => {
  const login = document.getElementById("login-control");
  const token = localStorage.getItem("tokens");
  const tokens = JSON.parse(token);
  if (tokens) {
    login.innerHTML = `
      <a href="profile.html" class="btn text-white" style="background-color: #77574c">Profile</a>
      <a onclick="logout()" class="btn text-white" style="background-color: #77574c">Logout</a>
      `;
  } else {
    login.innerHTML = `
      <a href="./auth.html" class="btn text-white" style="background-color: #77574c">Login</a>
      `;
  }
};
const ctx = document.getElementById("monthlyUserChart").getContext("2d");
const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  datasets: [
    {
      label: "Premium Users",
      data: [5, 8, 15, 10, 20, 25, 30, 28, 32, 35, 40, 42],
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
      fill: false,
      hidden: false,
    },
    {
      label: "Normal Users",
      data: [10, 12, 20, 15, 25, 28, 35, 32, 38, 42, 48, 50],
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
      fill: false,
      hidden: true,
    },
  ],
};
const config = {
  type: "line",
  data: data,
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        onClick: (e, legendItem) => {
          const chart = monthlyUserChart; // Direct reference to the chart instance
          const datasetIndex = legendItem.datasetIndex;
          if (datasetIndex !== undefined) {
            const dataset = chart.data.datasets[datasetIndex];
            if (dataset) {
              // Toggle visibility for the clicked dataset
              dataset.hidden = !dataset.hidden;
              chart.update(); // Update the chart
            } else {
              console.error("Dataset is undefined");
            }
          } else {
            console.error("datasetIndex is undefined");
          }
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
};
const monthlyUserChart = new Chart(ctx, config);

function showPlan(planType) {
  const monthlyPlan = document.getElementById("monthly-plan");
  const yearlyPlan = document.getElementById("yearly-plan");

  if (planType === "monthly") {
    monthlyPlan.classList.remove("hidden");
    yearlyPlan.classList.add("hidden");
    document.getElementById("monthly-btn").classList.add("bg-neutral", "text-white");
    document.getElementById("yearly-btn").classList.remove("bg-neutral", "text-white");
  } else {
    yearlyPlan.classList.remove("hidden");
    monthlyPlan.classList.add("hidden");
    document.getElementById("yearly-btn").classList.add("bg-neutral", "text-white");
    document.getElementById("monthly-btn").classList.remove("bg-neutral", "text-white");
  }
}


navBar();
