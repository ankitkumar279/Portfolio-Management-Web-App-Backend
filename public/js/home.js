const ctxProjects = document.getElementById('projectsChart').getContext('2d');
const projectsChart = new Chart(ctxProjects, {
  type: 'bar',
  data: {
    labels: projectNames,       // set from server
    datasets: [{
      label: 'Projects Count',
      data: projectCounts,
      backgroundColor: '#28a745'
    }]
  },
  options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }
});

const ctxSkills = document.getElementById('skillsChart').getContext('2d');
const skillsChart = new Chart(ctxSkills, {
  type: 'doughnut',
  data: {
    labels: skillNames,
    datasets: [{
      data: skillLevels,
      backgroundColor: ['#28a745', '#20c997', '#17a2b8', '#218838']
    }]
  },
  options: { responsive: true }
});
