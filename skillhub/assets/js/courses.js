// ===============================
// COURSES DATA (ADMIN CONTROL)
// ===============================

const coursesData = [
  {
    id: 1,
    title: "Start Dropshipping",
    category: "business",
    image: "./assets/imgs/thumnail1.png",
    price: 35000,
    discountedPrice: 30000,
    description: "Learn how to start and scale a profitable dropshipping business.",
  },
  {
    id: 2,
    title: "Digital Art Pro",
    category: "design",
    image: "./assets/imgs/thumnail2.png",
    price: 45000,
    discountedPrice: 40000,
    description: "Master digital illustration and concept art.",
  },
  {
    id: 3,
    title: "Podcast in a Week",
    category: "business",
    image: "./assets/imgs/thumnail3.png",
    price: 9000,
    discountedPrice: 8000,
    description: "Launch and grow your podcast from scratch in 7 days.",
  },
  {
    id: 4,
    title: "AI Power-Up",
    category: "tech",
    image: "./assets/imgs/thumnail4.png",
    price: 30000,
    discountedPrice: 25000,
    description: "Boost productivity using modern AI tools.",
  },
  {
    id: 5,
    title: "Phone to Film",
    category: "design",
    image: "./assets/imgs/thumnail5.png",
    price: 25000,
    discountedPrice: 20000,
    description: "Create cinematic videos using just your smartphone.",
  }
];

// ===============================
// DISPLAY COURSES
// ===============================

function displayCourses(courses) {
  const coursesContainer = document.getElementById("coursesContainer");
  if (!coursesContainer) return;
  
  coursesContainer.innerHTML = courses
    .map(
      (course) => `
  <div class="course-card" data-category="${course.category}">
    <div class="course-image">
      <img src="${course.image}" alt="${course.title}" onerror="this.src='./assets/imgs/logo.png'">
    </div>
    <div class="course-content">
      <h3 class="course-title">${course.title}</h3>
      <p class="course-description">${course.description}</p>
      <div class="course-meta">
        <span class="course-price">
          ${course.discountedPrice ? `<del>PKR ${course.price}</del> PKR ${course.discountedPrice}` : `PKR ${course.price}`}
        </span>
      </div>
      <div class="course-actions">
        <a href="course-detail.html?id=${course.id}" class="btn btn-sm btn-outline">
          View Details
        </a>
        <button class="btn btn-sm btn-primary enroll-btn" data-id="${course.id}">
          Enroll Now
        </button>
      </div>
    </div>
  </div>
`
    )
    .join("");
}

// ===============================
// FILTER BUTTONS
// ===============================

function setupFilterButtons() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const category = btn.dataset.category;

      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      if (category === "all") {
        displayCourses(coursesData);
      } else {
        const filtered = coursesData.filter(
          course => course.category === category
        );
        displayCourses(filtered);
      }
    });
  });
}

// ===============================
// SEARCH FUNCTIONALITY
// ===============================

function setupSearch() {
  const searchInput = document.getElementById("searchInput");
  if (!searchInput) return;
  
  searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase().trim();
    
    if (value === "") {
      const activeFilter = document.querySelector(".filter-btn.active");
      if (activeFilter && activeFilter.dataset.category !== "all") {
        const filtered = coursesData.filter(
          course => course.category === activeFilter.dataset.category
        );
        displayCourses(filtered);
      } else {
        displayCourses(coursesData);
      }
      return;
    }
    
    const filtered = coursesData.filter(course =>
      course.title.toLowerCase().includes(value) ||
      course.description.toLowerCase().includes(value)
    );
    displayCourses(filtered);
  });
}

// ===============================
// ENROLL BUTTONS
// ===============================

function setupEnrollButtons() {
  document.addEventListener("click", function(e) {
    if (e.target.classList.contains("enroll-btn")) {
      const courseId = e.target.dataset.id;
      const course = coursesData.find(c => c.id == courseId);
      
      if (course) {
        alert(`Enrolling in: ${course.title}\nPrice: PKR ${course.discountedPrice || course.price}`);
        // You can redirect to enrollment page or add to cart
        // window.location.href = `enroll.html?id=${courseId}`;
      }
    }
  });
}

// ===============================
// INITIAL LOAD
// ===============================

document.addEventListener("DOMContentLoaded", function() {
  // Display all courses initially
  displayCourses(coursesData);
  
  // Setup all functionality
  setupFilterButtons();
  setupSearch();
  setupEnrollButtons();
});
