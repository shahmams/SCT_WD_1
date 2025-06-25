document.addEventListener('DOMContentLoaded', function() {
    // Navigation Scroll Effect
    const nav = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.nav-links a');
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.nav-links');
    
    // Change navbar style on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            mobileMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-container') && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
    
    // Active link highlighting based on scroll position
    window.addEventListener('scroll', function() {
        let current = '';
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Back to top button
    const backToTopBtn = document.getElementById('backToTop');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Dark mode toggle
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', function() {
        document.body.setAttribute('data-theme', 
            document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
        
        // Update icon
        const icon = this.querySelector('i');
        if (document.body.getAttribute('data-theme') === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });

    // Workout filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    // Note: workoutCards are created dynamically, so we need to update this NodeList after creation
    let workoutCards = document.querySelectorAll('.workout-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Update workoutCards NodeList in case new cards were added
            workoutCards = document.querySelectorAll('.workout-card');
            // Filter workout cards
            workoutCards.forEach(card => {
                if (filterValue === 'all' || card.classList.contains(filterValue)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Initialize all components
    initializeWorkoutCards();
    initializeRecipeCards();
    initializeTestimonials();
    initializeBlogPosts();
    initializeMealPlans();


    // Close modal when clicking outside modal-content
    window.addEventListener('click', function(e) {
        if (e.target === recipeModal) {
            recipeModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Testimonial slider functionality
    const testimonialSlider = () => {
        let currentIndex = 0;
        const testimonials = document.querySelectorAll('.testimonial-card');
        const dots = document.querySelectorAll('.dot');
        
        function showTestimonial(index) {
            testimonials.forEach((testimonial, i) => {
                testimonial.style.transform = `translateX(-${index * 100}%)`;
                dots[i].classList.toggle('active', i === index);
            });
        }
        
        // Dot click handlers
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                showTestimonial(currentIndex);
            });
        });
        
        // Previous/next buttons
        document.querySelector('.prev').addEventListener('click', () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : testimonials.length - 1;
            showTestimonial(currentIndex);
        });
        
        document.querySelector('.next').addEventListener('click', () => {
            currentIndex = (currentIndex < testimonials.length - 1) ? currentIndex + 1 : 0;
            showTestimonial(currentIndex);
        });
        
        // Auto-advance
        let slideInterval = setInterval(() => {
            currentIndex = (currentIndex < testimonials.length - 1) ? currentIndex + 1 : 0;
            showTestimonial(currentIndex);
        }, 5000);
        
        // Pause on hover
        document.querySelector('.testimonial-slider').addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        document.querySelector('.testimonial-slider').addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => {
                currentIndex = (currentIndex < testimonials.length - 1) ? currentIndex + 1 : 0;
                showTestimonial(currentIndex);
            }, 5000);
        });
    };

    // Meal plan tabs - FIXED VERSION
    document.querySelectorAll('.meal-plan-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const plan = this.getAttribute('data-plan');
            
            // Update active button
            document.querySelectorAll('.meal-plan-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding content
            document.querySelectorAll('.meal-plan-content > div').forEach(content => {
                content.style.display = content.id === plan ? 'block' : 'none';
            });
        });
    });

    // Read more functionality for blog posts - TOGGLE VERSION
    // Attach after blog cards are created
    document.querySelectorAll('.read-more-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const blogContent = this.nextElementSibling;
            const isHidden = blogContent.style.display === 'none' || blogContent.style.display === '';
            
            blogContent.style.display = isHidden ? 'block' : 'none';
            this.textContent = isHidden ? 'Read Less' : 'Read More';
            
            // Smooth scroll to show more content
            if (isHidden) {
                blogContent.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    });

    // Form submission (prevent default)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! This is a demo form and no data will be saved.');
            this.reset();
        });
    }

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thanks for subscribing to our newsletter!');
            this.reset();
        });
    }

    testimonialSlider();
});

// Initialize workout cards
function initializeWorkoutCards() {
    const workoutContainer = document.querySelector('.workout-container');
    const workouts = [
        {
            title: "Beginner Full Body",
            level: "beginner",
            type: "strength",
            duration: "4 weeks",
            description: "Perfect for those just starting their fitness journey. Focuses on fundamental movements.",
            img: "images/WEIGHT LOSS PILLS _ SURGERY_ NO! _ SLIM WHOLE BODY EXERCISES AT HOME.jfif"
        },
        {
            title: "Intermediate HIIT",
            level: "intermediate",
            type: "cardio",
            duration: "6 weeks",
            description: "High intensity interval training to boost metabolism and burn fat.",
            img: "images/fullbody.jfif"
        },
        {
            title: "Advanced Powerlifting",
            level: "advanced",
            type: "strength",
            duration: "8 weeks",
            description: "For those looking to increase strength and muscle mass through compound lifts.",
            img: "images/Olympic lifting ___.jfif"
        },
        {
            title: "Yoga for Beginners",
            level: "beginner",
            type: "flexibility",
            duration: "4 weeks",
            description: "Improve flexibility, balance, and mindfulness with this gentle yoga program.",
            img: "images/yoga.jfif"
        },
        {
            title: "Marathon Training",
            level: "advanced",
            type: "cardio",
            duration: "12 weeks",
            description: "Comprehensive program to prepare you for your first marathon.",
            img: "images/marathon.jfif"
        },
        {
            title: "Bodyweight Circuit",
            level: "intermediate",
            type: "strength",
            duration: "6 weeks",
            description: "No equipment needed! Build strength using just your body weight.",
            img: "images/bc.jfif"
        }
    ];

    workouts.forEach(workout => {
        const workoutCard = document.createElement('div');
        workoutCard.classList.add('workout-card', workout.level, workout.type);
        workoutCard.innerHTML = `
            <div class="workout-img">
                <img src="${workout.img}" alt="${workout.title}">
            </div>
            <div class="workout-info">
                <span class="workout-level ${workout.level}">${workout.level.charAt(0).toUpperCase() + workout.level.slice(1)}</span>
                <h3 class="workout-title">${workout.title}</h3>
                <div class="workout-duration">
                    <i class="far fa-clock"></i>
                    <span>${workout.duration}</span>
                </div>
                <p class="workout-description">${workout.description}</p>
                <a href="#" class="view-workout">View Plan</a>
            </div>
        `;
        workoutContainer.appendChild(workoutCard);
    });
}

// Initialize recipe cards
function initializeRecipeCards() {
    const recipeContainer = document.querySelector('.recipe-container');
    const recipes = [
        {
            title: "Quinoa Salad",
            calories: "320 calories",
            description: "A refreshing and protein-packed salad perfect for post-workout recovery.",
            img: "images/nourish your body.jfif"
        },
        {
            title: "Protein Smoothie",
            calories: "280 calories",
            description: "Delicious and creamy smoothie packed with protein and nutrients.",
            img: "images/Banana Protein Coffee Smoothie To Kickstart Your Day 💪☕.jfif"
        },
        {
            title: "Grilled Chicken",
            calories: "350 calories",
            description: "Lean protein source with simple seasoning for maximum flavor.",
            img: "images/Master Juicy Grilled Chicken Breasts Every Time.jfif"
        },
        {
            title: "Avocado Toast",
            calories: "290 calories",
            description: "Healthy fats and complex carbs for sustained energy.",
            img: "images/Avo toast🥑🍞.jfif"
        }
    ];

    // Modal setup
    const recipeModal = document.getElementById('recipeModal');
    let modalContent = document.getElementById('modalContent');
    if (!modalContent) {
        modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        modalContent.id = 'modalContent';
        recipeModal.appendChild(modalContent);
    }

    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');
        recipeCard.innerHTML = `
            <div class="recipe-img">
                <img src="${recipe.img}" alt="${recipe.title}">
            </div>
            <div class="recipe-info">
                <h3 class="recipe-title">${recipe.title}</h3>
                <div class="recipe-calories">
                    <i class="fas fa-fire"></i>
                    <span>${recipe.calories}</span>
                </div>
                <p class="recipe-description">${recipe.description}</p>
                <button class="view-recipe">View Recipe</button>
            </div>
        `;
        recipeContainer.appendChild(recipeCard);

        // Attach modal event listener here
        recipeCard.querySelector('.view-recipe').addEventListener('click', function(e) {
            e.stopPropagation();
            modalContent.innerHTML = `
                <span class="close-modal" style="cursor:pointer;position:absolute;top:10px;right:20px;font-size:2rem;">&times;</span>
                <img src="${recipe.img}" alt="${recipe.title}" class="modal-recipe-img">
                <h3 class="modal-recipe-title">${recipe.title}</h3>
                <div class="modal-recipe-meta">
                    <span>${recipe.calories}</span>
                    <span>Prep Time: 15 mins</span>
                    <span>Servings: 2</span>
                </div>
                <div class="modal-recipe-content">
                    <div class="modal-recipe-ingredients">
                        <h3>Ingredients</h3>
                        <ul>
                            <li>1 cup quinoa</li>
                            <li>2 cups water</li>
                            <li>1 avocado</li>
                            <li>1 cup cherry tomatoes</li>
                            <li>1/4 cup feta cheese</li>
                            <li>2 tbsp olive oil</li>
                            <li>1 tbsp lemon juice</li>
                            <li>Salt and pepper to taste</li>
                        </ul>
                    </div>
                    <div class="modal-recipe-instructions">
                        <h3>Instructions</h3>
                        <ol>
                            <li>Rinse quinoa under cold water.</li>
                            <li>Cook quinoa with water according to package instructions.</li>
                            <li>Dice avocado and halve cherry tomatoes.</li>
                            <li>Mix all ingredients in a large bowl.</li>
                            <li>Drizzle with olive oil and lemon juice.</li>
                            <li>Season with salt and pepper.</li>
                            <li>Serve chilled.</li>
                        </ol>
                    </div>
                </div>
            `;
            recipeModal.style.display = 'block';
            document.body.style.overflow = 'hidden';

            // Close modal handler
            modalContent.querySelector('.close-modal').addEventListener('click', function() {
                recipeModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        });
    });

    // Close modal when clicking outside modal-content
    window.addEventListener('click', function(e) {
        if (e.target === recipeModal) {
            recipeModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}
// ...existing code...

// Initialize testimonials
function initializeTestimonials() {
    const testimonialContainer = document.querySelector('.testimonial-container');
    const testimonials = [
        {
            content: "I lost 25 pounds in 3 months with FitPro's programs and meal plans. The trainers are amazing and the community is so supportive!",
            name: "Sarah Johnson",
            title: "Lost 25 lbs",
            img: "https://randomuser.me/api/portraits/women/44.jpg",
            before: "https://images.unsplash.com/photo-1517457210348-703079e57d4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            after: "https://images.unsplash.com/photo-1533681470484-b5a729f6e39c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        },
        {
            content: "As a busy professional, I needed efficient workouts. FitPro's 30-minute HIIT routines gave me results I never got from hours at the gym.",
            name: "Michael Chen",
            title: "Gained 15 lbs muscle",
            img: "https://randomuser.me/api/portraits/men/32.jpg",
            before: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            after: "images/bc.jfif"
        },
        {
            content: "After my pregnancy, I struggled to get back in shape. The postnatal program helped me regain my strength and confidence safely.",
            name: "Emily Rodriguez",
            title: "Postnatal fitness",
            img: "https://randomuser.me/api/portraits/women/68.jpg",
            before: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            after: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        }
    ];

    testimonials.forEach(testimonial => {
        const testimonialCard = document.createElement('div');
        testimonialCard.classList.add('testimonial-card');
        testimonialCard.innerHTML = `
            <p class="testimonial-content">"${testimonial.content}"</p>
            <div class="testimonial-author">
                <img src="${testimonial.img}" alt="${testimonial.name}" class="author-img">
                <h4 class="author-name">${testimonial.name}</h4>
                <p class="author-title">${testimonial.title}</p>
            </div>
            <div class="before-after">
                <img src="${testimonial.before}" alt="Before" class="before-after-img">
                <img src="${testimonial.after}" alt="After" class="before-after-img">
            </div>
        `;
        testimonialContainer.appendChild(testimonialCard);
    });

    // Create dots for slider navigation
    const dotsContainer = document.querySelector('.slider-dots');
    testimonials.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            document.querySelectorAll('.dot').forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
            // Slider movement handled by testimonialSlider() function
        });
        dotsContainer.appendChild(dot);
    });
}

// Initialize blog posts
function initializeBlogPosts() {
    const blogContainer = document.querySelector('.blog-container');
    const blogPosts = [
        {
            title: "5 Ways to Stay Motivated on Your Fitness Journey",
            date: "June 15, 2023",
            excerpt: "Staying motivated can be challenging, but these proven strategies will help you stay on track...",
            img: "images/Workout Vision Board.jfif",
            content: "<p>1. Set realistic goals: Break your big goal into smaller, achievable milestones.</p><p>2. Find a workout buddy: Accountability increases consistency.</p><p>3. Track your progress: Take measurements and photos to see changes.</p><p>4. Mix it up: Try new workouts to prevent boredom.</p><p>5. Reward yourself: Celebrate non-scale victories too!</p>"
        },
        {
            title: "The Importance of Rest Days in Your Fitness Routine",
            date: "May 28, 2023",
            excerpt: "Many people overlook the importance of rest days, but they're crucial for muscle recovery and growth...",
            img: "images/bc.jfif",
            content: "<p>Rest days allow your muscles to repair and grow stronger. Without proper recovery, you risk overtraining which can lead to injuries and burnout.</p><p>Active recovery (light walking, yoga) can be beneficial on rest days. Listen to your body and take at least 1-2 full rest days per week.</p>"
        },
        {
            title: "Meal Prepping 101 for Busy Professionals",
            date: "May 10, 2023",
            excerpt: "Save time and eat healthy with these simple meal prepping strategies that anyone can follow...",
            img: "images/nourish your body.jfif",
            content: "<p>1. Plan your meals for the week ahead.</p><p>2. Invest in quality containers.</p><p>3. Cook proteins in bulk.</p><p>4. Prepare versatile ingredients.</p><p>5. Portion out snacks in advance.</p><p>With just 2-3 hours on Sunday, you can have healthy meals ready for the entire week!</p>"
        }
    ];

    blogPosts.forEach(post => {
        const blogCard = document.createElement('div');
        blogCard.classList.add('blog-card');
        blogCard.innerHTML = `
            <div class="blog-img">
                <img src="${post.img}" alt="${post.title}">
            </div>
            <div class="blog-content">
                <h3 class="blog-title">${post.title}</h3>
                <div class="blog-date">
                    <i class="far fa-calendar-alt"></i>
                    <span>${post.date}</span>
                </div>
                <p class="blog-excerpt">${post.excerpt}</p>
                <button class="read-more-btn">Read More</button>
                <div class="blog-full-content" style="display: none;">
                    ${post.content}
                </div>
            </div>
        `;
        blogContainer.appendChild(blogCard);
    });
}

// Initialize meal plans
function initializeMealPlans() {
    const mealPlanContent = document.querySelector('.meal-plan-content');
    
    // Standard Meal Plan
    const standardPlan = document.createElement('div');
    standardPlan.id = 'standard';
    standardPlan.innerHTML = `
        <table class="meal-plan-table">
            <thead>
                <tr>
                    <th>Day</th>
                    <th>Breakfast</th>
                    <th>Lunch</th>
                    <th>Dinner</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Monday</td>
                    <td>Oatmeal with berries</td>
                    <td>Grilled chicken salad</td>
                    <td>Salmon with quinoa</td>
                </tr>
                <tr>
                    <td>Tuesday</td>
                    <td>Greek yogurt with nuts</td>
                    <td>Turkey wrap</td>
                    <td>Lean beef with sweet potato</td>
                </tr>
                <tr>
                    <td>Wednesday</td>
                    <td>Smoothie bowl</td>
                    <td>Quinoa salad</td>
                    <td>Grilled shrimp with veggies</td>
                </tr>
                <tr>
                    <td>Thursday</td>
                    <td>Avocado toast</td>
                    <td>Chicken stir-fry</td>
                    <td>Baked cod with rice</td>
                </tr>
                <tr>
                    <td>Friday</td>
                    <td>Protein pancakes</td>
                    <td>Tuna salad</td>
                    <td>Grilled steak with asparagus</td>
                </tr>
                <tr>
                    <td>Saturday</td>
                    <td>Egg white omelet</td>
                    <td>Lentil soup</td>
                    <td>Baked chicken with roasted veggies</td>
                </tr>
                <tr>
                    <td>Sunday</td>
                    <td>Chia pudding</td>
                    <td>Grilled salmon salad</td>
                    <td>Turkey meatballs with zucchini noodles</td>
                </tr>
            </tbody>
        </table>
    `;
    mealPlanContent.appendChild(standardPlan);
    
    // Vegetarian Meal Plan
    const vegetarianPlan = document.createElement('div');
    vegetarianPlan.id = 'vegetarian';
    vegetarianPlan.style.display = 'none';
    vegetarianPlan.innerHTML = `
        <table class="meal-plan-table">
            <thead>
                <tr>
                    <th>Day</th>
                    <th>Breakfast</th>
                    <th>Lunch</th>
                    <th>Dinner</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Monday</td>
                    <td>Oatmeal with berries</td>
                    <td>Chickpea salad</td>
                    <td>Lentil curry with rice</td>
                </tr>
                <tr>
                    <td>Tuesday</td>
                    <td>Greek yogurt with nuts</td>
                    <td>Quinoa bowl</td>
                    <td>Stuffed bell peppers</td>
                </tr>
                <tr>
                    <td>Wednesday</td>
                    <td>Smoothie bowl</td>
                    <td>Falafel wrap</td>
                    <td>Vegetable stir-fry with tofu</td>
                </tr>
                <tr>
                    <td>Thursday</td>
                    <td>Avocado toast</td>
                    <td>Caprese salad</td>
                    <td>Eggplant parmesan</td>
                </tr>
                <tr>
                    <td>Friday</td>
                    <td>Chia pudding</td>
                    <td>Vegetable soup</td>
                    <td>Mushroom risotto</td>
                </tr>
                <tr>
                    <td>Saturday</td>
                    <td>Veggie omelet</td>
                    <td>Hummus and veggie plate</td>
                    <td>Vegetable lasagna</td>
                </tr>
                <tr>
                    <td>Sunday</td>
                    <td>Protein smoothie</td>
                    <td>Greek salad</td>
                    <td>Black bean tacos</td>
                </tr>
            </tbody>
        </table>
    `;
    mealPlanContent.appendChild(vegetarianPlan);
    
    // Keto Meal Plan
    const ketoPlan = document.createElement('div');
    ketoPlan.id = 'keto';
    ketoPlan.style.display = 'none';
    ketoPlan.innerHTML = `
        <table class="meal-plan-table">
            <thead>
                <tr>
                    <th>Day</th>
                    <th>Breakfast</th>
                    <th>Lunch</th>
                    <th>Dinner</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Monday</td>
                    <td>Bulletproof coffee</td>
                    <td>Bacon and avocado salad</td>
                    <td>Steak with buttered veggies</td>
                </tr>
                <tr>
                    <td>Tuesday</td>
                    <td>Scrambled eggs with cheese</td>
                    <td>Chicken Caesar salad (no croutons)</td>
                    <td>Salmon with asparagus</td>
                </tr>
                <tr>
                    <td>Wednesday</td>
                    <td>Keto pancakes</td>
                    <td>Tuna salad lettuce wraps</td>
                    <td>Pork chops with green beans</td>
                </tr>
                <tr>
                    <td>Thursday</td>
                    <td>Avocado and eggs</td>
                    <td>Beef burger (no bun)</td>
                    <td>Chicken thighs with broccoli</td>
                </tr>
                <tr>
                    <td>Friday</td>
                    <td>Chia seed pudding (low-carb)</td>
                    <td>Cobb salad</td>
                    <td>Shrimp scampi with zucchini noodles</td>
                </tr>
                <tr>
                    <td>Saturday</td>
                    <td>Omelet with mushrooms</td>
                    <td>Chicken wings (unbreaded)</td>
                    <td>Ribeye with creamed spinach</td>
                </tr>
                <tr>
                    <td>Sunday</td>
                    <td>Keto smoothie</td>
                    <td>Egg salad</td>
                    <td>Lamb chops with roasted cauliflower</td>
                </tr>
            </tbody>
        </table>
    `;
    mealPlanContent.appendChild(ketoPlan);
}