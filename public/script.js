console.log("Script started loading...");

document.addEventListener('DOMContentLoaded', async function() {
    console.log("DOM loaded!");
    
    const methodGrid = document.getElementById('methodGrid');
    console.log("Found methodGrid element:", methodGrid);
    
    if (!methodGrid) {
        console.error("methodGrid element not found!");
        return;
    }
    
    try {
        console.log("Starting fetch...");
        // Show loading state
        methodGrid.innerHTML = '<p aria-busy="true">Loading brewing methods...</p>';
        
        // Fetch all coffee methods from the API
        const response = await fetch('/api/methods');
        console.log("Fetch response:", response);
        
        if (!response.ok) {
            throw new Error('Failed to load coffee methods');
        }
        
        const methods = await response.json();
        console.log("Received methods:", methods);
        console.log("Number of methods:", methods.length);
        
        // Clear loading state
        methodGrid.innerHTML = '';
        
        // Create method cards
        methods.forEach((method, index) => {
            console.log(`Creating card ${index + 1}:`, method.name);
            const methodCard = document.createElement('article');
            methodCard.className = 'method-card';
            methodCard.style.cursor = 'pointer';
            
            // Add hover effect with CSS classes
            methodCard.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                this.style.transition = 'all 0.3s ease';
            });
            
            methodCard.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
            });
            
            // Create difficulty badge styling
            const difficultyClass = method.difficulty.toLowerCase().replace(/\s+/g, '-');
            let difficultyColor = '#28a745'; // default green for beginner
            if (method.difficulty === 'Intermediate') {
                difficultyColor = '#ffc107';
            } else if (method.difficulty === 'Advanced') {
                difficultyColor = '#dc3545';
            }
            
            methodCard.innerHTML = `
                <header style="text-align: center; padding: 1.5rem; background: linear-gradient(135deg, #D2B48C, #F5F5DC); margin: -1rem -1rem 1rem -1rem;">
                    <h3 style="margin: 0 0 0.5rem 0; color: #4A2C17;">${method.name}</h3>
                    <div class="difficulty-badge" style="
                        display: inline-block; 
                        background: ${difficultyColor}; 
                        color: white; 
                        padding: 0.25rem 0.75rem; 
                        border-radius: 1rem; 
                        font-size: 0.875rem;
                        font-weight: 500;
                    ">
                        ${method.difficulty}
                    </div>
                </header>
                
                <div style="padding: 0 1rem;">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 1rem 0;">
                        <div style="text-align: center; padding: 0.75rem; background: rgba(139, 69, 19, 0.1); border-radius: 0.5rem;">
                            <div style="font-weight: bold; color: #4A2C17; font-size: 0.875rem;">Type</div>
                            <div style="color: #8B4513; font-size: 0.875rem;">${method.type}</div>
                        </div>
                        <div style="text-align: center; padding: 0.75rem; background: rgba(139, 69, 19, 0.1); border-radius: 0.5rem;">
                            <div style="font-weight: bold; color: #4A2C17; font-size: 0.875rem;">Brew Time</div>
                            <div style="color: #8B4513; font-size: 0.875rem;">${method.brewTime}</div>
                        </div>
                    </div>
                    
                    <div style="margin: 1rem 0;">
                        <div style="font-weight: bold; color: #4A2C17; margin-bottom: 0.25rem;">Description</div>
                        <p style="color: #666; margin: 0; font-size: 0.9rem;">${method.description}</p>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 1rem 0;">
                        <div style="text-align: center; padding: 0.75rem; background: rgba(139, 69, 19, 0.1); border-radius: 0.5rem;">
                            <div style="font-weight: bold; color: #4A2C17; font-size: 0.875rem;">Grind Size</div>
                            <div style="color: #8B4513; font-size: 0.875rem;">${method.grindSize}</div>
                        </div>
                        <div style="text-align: center; padding: 0.75rem; background: rgba(139, 69, 19, 0.1); border-radius: 0.5rem;">
                            <div style="font-weight: bold; color: #4A2C17; font-size: 0.875rem;">Ratio</div>
                            <div style="color: #8B4513; font-size: 0.875rem;">${method.coffeeToWater}</div>
                        </div>
                    </div>
                    
                    <div style="margin-top: 1.5rem;">
                        <small style="color: #8B4513; font-style: italic;">
                            Click to view detailed brewing instructions →
                        </small>
                    </div>
                </div>
            `;
            
            // Add click event to navigate to method detail page
            methodCard.addEventListener('click', function() {
                window.location.href = `/methods/${method.id}`;
            });
            
            // Add keyboard accessibility
            methodCard.setAttribute('tabindex', '0');
            methodCard.setAttribute('role', 'button');
            methodCard.setAttribute('aria-label', `View ${method.name} brewing method details`);
            
            methodCard.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    window.location.href = `/methods/${method.id}`;
                }
            });
            
            methodGrid.appendChild(methodCard);
        });
        
        console.log("All cards created successfully!");
        
        // Add CSS for the grid layout
        if (!document.querySelector('#method-grid-styles')) {
            const style = document.createElement('style');
            style.id = 'method-grid-styles';
            style.textContent = `
                .method-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 2rem;
                    margin: 2rem 0;
                }
                
                .method-card {
                    transition: all 0.3s ease;
                    border: 1px solid #e0e0e0;
                    border-radius: 0.75rem;
                    overflow: hidden;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                
                .method-card:focus {
                    outline: 2px solid #8B4513;
                    outline-offset: 2px;
                }
                
                @media (max-width: 768px) {
                    .method-grid {
                        grid-template-columns: 1fr;
                        gap: 1.5rem;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
    } catch (error) {
        console.error('Error loading coffee methods:', error);
        methodGrid.innerHTML = `
            <article style="text-align: center; padding: 2rem;">
                <h3>Oops! Something went wrong</h3>
                <p>We couldn't load the coffee brewing methods. Please try refreshing the page.</p>
                <button onclick="window.location.reload()" role="button">Refresh Page</button>
            </article>
        `;
    }
});