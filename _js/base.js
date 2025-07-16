/**
 * Antenor Website - Base JavaScript
 * 
 * Contains the interactive functionality for the services section,
 * allowing users to expand/collapse service descriptions.
 */

/**
 * Toggles the expansion/collapse of a service card
 * @param {HTMLElement} card - The service card element that was clicked
 */
function toggleService(card) {
    const longDescription = card.querySelector('.service-long');
    const indicator = card.querySelector('.expand-indicator');
    
    if (longDescription.classList.contains('expanded')) {
        // Collapse the service
        longDescription.classList.remove('expanded');
        card.classList.remove('expanded');
        indicator.innerHTML = 'Clique para saber mais ↓';
    } else {
        // Expand the service
        longDescription.classList.add('expanded');
        card.classList.add('expanded');
        indicator.innerHTML = 'Clique para ocultar ↑';
    }
}

/**
 * Initialize any additional functionality when the page loads
 */
document.addEventListener('DOMContentLoaded', function() {
    // Any initialization code can go here
    console.log('Antenor website loaded successfully!');
    
    // Add keyboard accessibility for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        // Make cards focusable
        card.setAttribute('tabindex', '0');
        
        // Add keyboard support (Enter or Space to toggle)
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleService(card);
            }
        });
        
        // Add ARIA attributes for accessibility
        card.setAttribute('role', 'button');
        card.setAttribute('aria-expanded', 'false');
        card.setAttribute('aria-label', 'Clique para expandir detalhes do serviço');
        
        // Prevent link clicks from triggering card toggle
        const serviceLink = card.querySelector('.service-title a');
        if (serviceLink) {
            serviceLink.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }
        
        // Update ARIA when toggled
        const originalToggle = card.onclick;
        card.onclick = function() {
            originalToggle.call(this);
            const isExpanded = card.classList.contains('expanded');
            card.setAttribute('aria-expanded', isExpanded.toString());
            card.setAttribute('aria-label', 
                isExpanded ? 'Clique para ocultar detalhes do serviço' : 'Clique para expandir detalhes do serviço'
            );
        };
    });
}); 