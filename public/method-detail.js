document.addEventListener('DOMContentLoaded', async function() {
    // Extract methodId from the current URL path
    const pathParts = window.location.pathname.split('/');
    const methodId = pathParts[pathParts.length - 1];
    
    const methodContainer = document.getElementById('methodContainer');
    
    try {
        // Show loading state
        methodContainer.innerHTML = '<p aria-busy="true">Loading brewing method details...</p>';
        
        // Fetch specific coffee method from the API
        const response = await fetch(`/api/methods/${methodId}`);
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Coffee method not found');
            }
            throw new Error('Failed to load coffee method');
        }
        
        const method = await response.json();
        
        // Clear loading state and create detailed method view
        methodContainer.innerHTML = `
            <article class="method-detail">
                <header style="text-align: center; padding: 2rem; background: linear-gradient(135deg, #D2B48C, #F5F5DC); margin: -2rem -2rem 2rem -2rem; border-radius: 0 0 1rem 1rem;">
                    <h1 style="margin: 0 0 1rem 0; color: #4A2C17; font-size: 2.5rem;">${method.name}</h1>
                    <div class="method-meta" style="display: flex; justify-content: center; gap: 2rem; flex-wrap: wrap;">
                        <div class="meta-item" style="text-align: center;">
                            <div style="font-weight: bold; color: #4A2C17; margin-bottom: 0.25rem;">Type</div>
                            <div style="color: #8B4513;">${method.type}</div>
                        </div>
                        <div class="meta-item" style="text-align: center;">
                            <div style="font-weight: bold; color: #4A2C17; margin-bottom: 0.25rem;">Difficulty</div>
                            <div style="color: #8B4513;">${method.difficulty}</div>
                        </div>
                        <div class="meta-item" style="text-align: center;">
                            <div style="font-weight: bold; color: #4A2C17; margin-bottom: 0.25rem;">Brew Time</div>
                            <div style="color: #8B4513;">${method.brewTime}</div>
                        </div>
                    </div>
                </header>

                <div class="method-content" style="max-width: 800px; margin: 0 auto; padding: 0 1rem;">
                    <section style="margin-bottom: 2rem;">
                        <h2 style="color: #4A2C17; border-bottom: 2px solid #D2B48C; padding-bottom: 0.5rem;">Description</h2>
                        <p style="color: #666; font-size: 1.1rem; line-height: 1.6;">${method.description}</p>
                    </section>

                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin: 2rem 0;">
                        <section class="info-card" style="background: rgba(139, 69, 19, 0.1); padding: 1.5rem; border-radius: 0.75rem; border-left: 4px solid #8B4513;">
                            <h3 style="color: #4A2C17; margin: 0 0 1rem 0;">Grind & Ratio</h3>
                            <div style="margin-bottom: 0.75rem;">
                                <strong style="color: #4A2C17;">Grind Size:</strong>
                                <span style="color: #8B4513; margin-left: 0.5rem;">${method.grindSize}</span>
                            </div>
                            <div>
                                <strong style="color: #4A2C17;">Coffee to Water:</strong>
                                <span style="color: #8B4513; margin-left: 0.5rem;">${method.coffeeToWater}</span>
                            </div>
                        </section>

                        <section class="info-card" style="background: rgba(139, 69, 19, 0.1); padding: 1.5rem; border-radius: 0.75rem; border-left: 4px solid #8B4513;">
                            <h3 style="color: #4A2C17; margin: 0 0 1rem 0;">Equipment Needed</h3>
                            <ul style="color: #8B4513; margin: 0; padding-left: 1.25rem;">
                                ${method.equipment.map(item => `<li style="margin-bottom: 0.25rem;">${item}</li>`).join('')}
                            </ul>
                        </section>
                    </div>

                    <section style="margin: 2rem 0;">
                        <h2 style="color: #4A2C17; border-bottom: 2px solid #D2B48C; padding-bottom: 0.5rem;">Brewing Steps</h2>
                        <ol style="color: #666; line-height: 1.8; font-size: 1.1rem;">
                            ${method.steps.map(step => `<li style="margin-bottom: 0.75rem; padding-left: 0.5rem;">${step}</li>`).join('')}
                        </ol>
                    </section>

                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin: 2rem 0;">
                        <section class="info-card" style="background: rgba(210, 180, 140, 0.2); padding: 1.5rem; border-radius: 0.75rem; border-left: 4px solid #D2B48C;">
                            <h3 style="color: #4A2C17; margin: 0 0 1rem 0;">Pro Tips</h3>
                            <p style="color: #8B4513; margin: 0; font-style: italic;">${method.tips}</p>
                        </section>

                        <section class="info-card" style="background: rgba(210, 180, 140, 0.2); padding: 1.5rem; border-radius: 0.75rem; border-left: 4px solid #D2B48C;">
                            <h3 style="color: #4A2C17; margin: 0 0 1rem 0;">Taste Profile</h3>
                            <p style="color: #8B4513; margin: 0;">${method.taste}</p>
                        </section>
                    </div>

                    <div style="text-align: center; margin: 3rem 0;">
                        <button onclick="history.back()" style="
                            background: linear-gradient(135deg, #8B4513, #A0522D);
                            color: white;
                            padding: 0.75rem 2rem;
                            border: none;
                            border-radius: 0.5rem;
                            font-size: 1rem;
                            cursor: pointer;
                            transition: all 0.3s ease;
                        ">
                            ← Back to Methods
                        </button>
                    </div>
                </div>
            </article>
        `;
        
    } catch (error) {
        console.error('Error loading coffee method:', error);
        methodContainer.innerHTML = `
            <article style="text-align: center; padding: 3rem;">
                <h2 style="color: #4A2C17;">Oops! Something went wrong</h2>
                <p style="color: #666;">${error.message}</p>
                <button onclick="history.back()" style="background: #8B4513; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 0.5rem; cursor: pointer;">← Go Back</button>
            </article>
        `;
    }
});