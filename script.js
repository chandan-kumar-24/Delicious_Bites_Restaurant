 
        // Carousel functionality
        let currentIndex = 0;
        const itemsPerView = 3;
        const items = document.querySelectorAll('.carousel-item');
        const totalItems = items.length;
        const maxIndex = totalItems - itemsPerView;

        function updateCarousel() {
            const wrapper = document.getElementById('carouselWrapper');
            const translateX = -currentIndex * (350 + 30); // item width + margin
            wrapper.style.transform = `translateX(${translateX}px)`;
        }

        function moveCarousel(direction) {
            if (direction === 1) {
                currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
            } else {
                currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
            }
            updateCarousel();
        }

        // Auto-scroll carousel every 5 seconds
        setInterval(() => {
            moveCarousel(1);
        }, 5000);

        // Video functionality
        let isVideoPlaying = false;
        const video = document.getElementById('mainVideo');
        const playButton = document.getElementById('playButton');

        function toggleVideo() {
            if (isVideoPlaying) {
                video.pause();
                playButton.classList.remove('hidden');
                isVideoPlaying = false;
            } else {
                video.play();
                playButton.classList.add('hidden');
                isVideoPlaying = true;
            }
        }

        // Modal functionality
        const modal = document.getElementById('requestModal');
        const body = document.body;

        function openModal() {
            modal.style.display = 'block';
            body.classList.add('modal-open');
        }

        function closeModal() {
            modal.style.display = 'none';
            body.classList.remove('modal-open');
            resetForm();
        }

        function resetForm() {
            document.getElementById('requestForm').reset();
        }

        function submitRequest() {
            const form = document.getElementById('requestForm');
            const formData = new FormData(form);
            
            // Basic validation
            const name = formData.get('customerName');
            const email = formData.get('customerEmail');
            const description = formData.get('dishDescription');
            
            if (!name || !email || !description) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Simulate successful submission
            alert('Thank you for your request! We will get back to you soon.');
            closeModal();
        }

        // Close modal when clicking outside
        window.onclick = function(event) {
            if (event.target === modal) {
                closeModal();
            }
        }

        // Escape key to close modal
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && modal.style.display === 'block') {
                closeModal();
            }
        });

        // Responsive carousel adjustment
        function adjustCarousel() {
            const screenWidth = window.innerWidth;
            let itemsToShow = 3;
            
            if (screenWidth <= 768) {
                itemsToShow = 2;
            }
            if (screenWidth <= 480) {
                itemsToShow = 1;
            }
            
            const newMaxIndex = Math.max(0, totalItems - itemsToShow);
            
            if (currentIndex > newMaxIndex) {
                currentIndex = newMaxIndex;
            }
            
            updateCarousel();
        }

        // Handle window resize
        window.addEventListener('resize', adjustCarousel);

        // Initialize carousel on page load
        window.addEventListener('load', () => {
            adjustCarousel();
        });

        // Touch/swipe support for mobile carousel
        let touchStartX = 0;
        let touchEndX = 0;

        const carouselContainer = document.querySelector('.carousel-container');

        carouselContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        carouselContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - next item
                    moveCarousel(1);
                } else {
                    // Swipe right - previous item
                    moveCarousel(-1);
                }
            }
        }
    