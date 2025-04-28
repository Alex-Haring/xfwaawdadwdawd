let testimonials = [];
let currentTestimonialIndex = 0;

function showTestimonial() {
    const testimonialSlider = document.getElementById('testimonial-slider');
    if (!testimonials.length) {
        testimonialSlider.innerHTML = '<p>No testimonials available yet.</p>';
        return;
    }

    const testimonial = testimonials[currentTestimonialIndex];

    testimonialSlider.innerHTML = `
        <div class="testimonial">
            <p>"${testimonial.text || 'No text provided'}"</p>
            <h4>- ${testimonial.author || 'Anonymous'}</h4>
        </div>
    `;

    currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
}

fetch('data/testimonials.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not OK');
        }
        return response.json();
    })
    .then(data => {
        testimonials = data;
        showTestimonial();
        setInterval(showTestimonial, 5000);
    })
    .catch(error => {
        console.error('Error loading testimonials:', error);
        const testimonialSlider = document.getElementById('testimonial-slider');
        testimonialSlider.innerHTML = '<p>Unable to load testimonials at the moment.</p>';
    });