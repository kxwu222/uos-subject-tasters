// EventWidget Standalone Bundle
// All dependencies inlined for CMS use

/**
 * Event Widget Utility Functions
 */
function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
    const events = [];
    for (let i = 1; i < lines.length; i++) {
        const values = parseCSVLine(lines[i]);
        if (values.length === headers.length) {
            const event = {};
            headers.forEach((header, index) => {
                event[header] = values[index];
            });
            event.is_visible = event.is_visible === 'true';
            if (event.is_visible) {
                events.push(event);
            }
        }
    }
    return events;
}
function parseCSVLine(line) {
    const values = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        const nextChar = line[i + 1];
        if (char === '"' && inQuotes && nextChar === '"') {
            current += '"';
            i++;
        } else if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            values.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    values.push(current.trim());
    return values;
}
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}
function injectStyles(cssStyles) {
    const styleId = 'event-widget-styles';
    if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = cssStyles;
        document.head.appendChild(style);
    }
}

function getStartTime(timeString) {
    if (!timeString) return '';
    // Split on 'to' or '-'
    let parts = timeString.split(/\s+to\s+|\s*-\s*/i);
    return parts[0].trim();
}

// ... existing code ...
// CSS_STYLES (now with the full CSS from styles.js)
const CSS_STYLES = `
    @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@700&family=Source+Sans+3:wght@200;300;400;600&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');

    .event-widget {
        font-family: 'Source Sans 3', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        font-weight: 200;
        max-width: 100%;
        margin: 0 auto;
        padding: 20px;
        background: #ffffff;
        border-radius: 12px;
    }

    .event-widget * {
        box-sizing: border-box;
    }

    .event-widget-header {
        margin-bottom: 30px;
        text-align: center;
    }

    .event-widget-title {
        font-family: 'Source Serif 4',serif;
        font-weight: 700;
        font-size: 2.5rem;
        color: #131E29;
        margin: 0 0 10px 0;
    }

    .event-widget-subtitle {
        font-size: 1.1rem;
        font-weight: 200;
        color: #64748b;
        margin: 0;
    }

    .event-controls {
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
        margin-bottom: 30px;
        align-items: center;
        justify-content: space-between;
    }

    .search-container {
        position: relative;
        flex: 1;
        min-width: 250px;
    }

    .search-input {
        width: 100%;
        padding: 12px 45px 12px 15px;
        border: 2px solid #e2e8f0;
        border-radius: 25px;
        font-size: 16px;
        font-weight: 200;
        outline: none;
        transition: all 0.3s ease;
        background: #f8fafc;
    }

    .search-input:focus {
        border-color: #24125E;
        background: #ffffff;
        box-shadow: 0 0 0 3px rgba(36, 18, 94, 0.1);
    }

    .search-clear {
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        font-size: 20px;
        color: #94a3b8;
        cursor: pointer;
        padding: 0;
        line-height: 1;
        transition: color 0.2s ease;
        display: none;
    }

    .search-clear:hover {
        color: #64748b;
    }

    .category-filter {
        padding: 10px 40px 10px 15px;
        border: 2px solid #e2e8f0;
        border-radius: 20px;
        background: #f8fafc;
        font-size: 14px;
        font-weight: 200;
        cursor: pointer;
        outline: none;
        position: relative;
        appearance: none;
        background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
        background-repeat: no-repeat;
        background-position: right 15px center;
        background-size: 16px;
    }

    .category-filter:hover,
    .category-filter:focus {
        border-color: #24125E;
        background: #ffffff;
    }

    .events-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 25px;
        margin-bottom: 30px;
    }

    @media (min-width: 1200px) {
        .events-grid {
            grid-template-columns: repeat(4, 1fr);
        }
    }

    @media (min-width: 768px) and (max-width: 1199px) {
        .events-grid {
            grid-template-columns: repeat(3, 1fr);
        }
    }

    .event-card {
        background: #ffffff;
        border-radius: 16px;
        padding: 0;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        cursor: pointer;
        overflow: hidden;
        border: 1px solid #f1f5f9;
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-height: 260px;
    }

    .event-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }

    .event-content {
        padding: 32px 24px 28px 24px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
    }

    .event-category,
    .event-faculty {
        margin-bottom: 10px;
    }

    .event-title {
        font-family: 'Source Serif 4', serif;
        font-weight: 700;
        font-size: 1.25rem;
        color: #1e293b;
        margin: 0 0 10px 0;
        line-height: 1.4;
        text-align: center;
    }

    .event-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
        margin-bottom: 15px;
        font-size: 14px;
        font-weight: 200;
        color: #64748b;
        justify-content: center;
    }

    .event-description {
        color: #475569;
        font-family: 'Source Sans 3', sans-serif;
        font-weight: 200;
        line-height: 1.6;
        margin-bottom: 20px;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-align: center;
    }

    .event-button {
        background: #440099;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 8px;
        font-weight: 400;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 14px;
        width: 100%;
        max-width: 220px;
        margin: 0 auto;
        display: block;
    }

    .event-button:hover {
        background: #330066;
        transform: translateY(-1px);
    }

    .loading {
        text-align: center;
        padding: 60px 20px;
        color: #64748b;
        font-weight: 200;
    }

    .loading-spinner {
        width: 40px;
        height: 40px;
        border: 4px solid #e2e8f0;
        border-top: 4px solid #24125E;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 20px;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    .no-events {
        text-align: center;
        padding: 60px 20px;
        color: #64748b;
        font-weight: 200;
    }

    .no-events-icon {
        font-size: 4rem;
        margin-bottom: 20px;
        opacity: 0.5;
    }

    .event-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.75);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        padding: 10px;
    }

    .event-modal.active {
        opacity: 1;
        visibility: visible;
    }

    .modal-content {
        background: white;
        border-radius: 16px;
        max-width: 500px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
        transform: scale(0.9);
        transition: transform 0.3s ease;
    }

    .event-modal.active .modal-content {
        transform: scale(1);
    }

    .modal-close {
        position: absolute;
        top: 12px;
        right: 12px;
        background: rgba(255, 255, 255, 0.9);
        border: 2px solid #e2e8f0;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        font-size: 18px;
        cursor: pointer;
        transition: all 0.3s ease;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #64748b;
        font-weight: bold;
    }

    .modal-close:hover {
        background: #ffffff;
        border-color: #24125E;
        color: #24125E;
        transform: scale(1.1);
    }

    .modal-body {
        padding: 20px;
    }

    .modal-category {
        display: inline-block;
        padding: 6px 16px;
        background: #C6BBFF;
        color: #24125E;
        font-size: 14px;
        font-weight: 600;
        border-radius: 16px;
        margin-bottom: 15px;
        margin-right: 10px;
    }

    .modal-category.oncampus {
        background: #C6BBFF;
        color: #24125E;
    }

    .modal-category.online {
        background: #9ADBE8;
        color: #131E29;
    }

    .modal-faculty {
        display: inline-block;
        padding: 6px 16px;
        background: #F8F8F9;
        border: 1px solid;
        font-size: 14px;
        font-weight: 600;
        border-radius: 16px;
        margin-bottom: 15px;
    }

    .modal-faculty.arts-and-humanities {
        background: #F8F8F9;
        border-color: #FF6371;
        color: #FF6371;
    }

    .modal-faculty.engineering {
        background: #F8F8F9;
        border-color: #981F92;
        color: #981F92;
    }

    .modal-faculty.health {
        background: #F8F8F9;
        border-color: #005750;
        color: #005750;
    }

    .modal-faculty.science {
        background: #F8F8F9;
        border-color: #005A8F;
        color: #005A8F;
    }

    .modal-faculty.social-sciences {
        background: #F8F8F9;
        border-color: #FF9664;
        color: #FF9664;
    }

    .modal-title {
        font-family: 'Source Serif 4', serif;
        font-weight: 700;
        font-size: 1.6rem;
        color: #1e293b;
        margin: 0 0 15px 0;
        line-height: 1.3;
        padding-right: 50px;
    }

    .modal-subject {
        font-size: 1.1rem;
        font-weight: 400;
        color: #64748b;
        margin-bottom: 15px;
        font-style: italic;
    }

    .modal-meta {
        display: grid;
        grid-template-columns: 1fr;
        gap: 8px;
        margin-bottom: 15px;
        padding: 12px;
        background: #f8fafc;
        border-radius: 12px;
    }

    .modal-meta-item {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
        font-weight: 200;
        color: #475569;
    }

    .modal-meta-item a {
        color: #24125E;
        text-decoration: none;
        transition: color 0.2s ease;
    }

    .modal-meta-item a:hover {
        color: #440099;
        text-decoration: underline;
    }

    .modal-description {
        color: #374151;
        font-family: 'Source Sans 3', sans-serif;
        font-weight: 200;
        line-height: 1.5;
        margin-bottom: 20px;
        font-size: 15px;
    }

    .modal-actions {
        display: flex;
        gap: 10px;
        flex-direction: column;
    }

    .modal-register-btn {
        background: linear-gradient(135deg, #24125E, #440099);
        color: white;
        padding: 12px 20px;
        border: none;
        border-radius: 8px;
        font-weight: 400;
        cursor: pointer;
        transition: all 0.3s ease;
        text-decoration: none;
        display: inline-block;
        font-size: 15px;
        text-align: center;
    }

    .modal-register-btn:hover {
        background: linear-gradient(135deg, #1a0d42, #330066);
        transform: translateY(-1px);
    }

    .modal-share-btn {
        background: #f1f5f9;
        color: #475569;
        padding: 10px 16px;
        border: none;
        border-radius: 8px;
        font-weight: 400;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 14px;
    }

    .modal-share-btn:hover {
        background: #e2e8f0;
    }

    .event-count {
        color: #64748b;
        font-size: 14px;
        font-weight: 200;
        margin-bottom: 20px;
    }

    @media (max-width: 768px) {
        .event-widget {
            padding: 15px;
        }

        .event-widget-title {
            font-size: 2rem;
        }

        .events-grid {
            grid-template-columns: 1fr;
            gap: 20px;
        }

        .event-controls {
            flex-direction: column;
            align-items: stretch;
        }

        .search-container {
            min-width: 100%;
        }

        .event-modal {
            padding: 5px;
        }

        .modal-content {
            max-height: 95vh;
            max-width: 100%;
        }

        .modal-body {
            padding: 16px;
        }

        .modal-title {
            font-size: 1.3rem;
            padding-right: 45px;
            margin-bottom: 12px;
        }

        .modal-subject {
            font-size: 1rem;
            margin-bottom: 12px;
        }

        .modal-close {
            top: 8px;
            right: 8px;
            width: 32px;
            height: 32px;
            font-size: 16px;
        }

        .modal-meta {
            padding: 10px;
            margin-bottom: 12px;
        }

        .modal-description {
            font-size: 14px;
            margin-bottom: 16px;
        }

        .modal-actions {
            gap: 8px;
        }

        .modal-register-btn {
            padding: 10px 16px;
            font-size: 14px;
        }

        .modal-share-btn {
            padding: 8px 14px;
            font-size: 13px;
        }
    }
`;

/**
 * Event Rendering Module
 */
class EventRenderer {
    constructor(container) {
        this.container = container;
    }
    renderWidget() {
        this.container.innerHTML = `
            <div class="event-widget">
                <div class="event-widget-header">
                    <h1 class="event-widget-title">Upcoming Events</h1>
                    <p class="event-widget-subtitle">Discover amazing events happening near you</p>
                </div>
                <div class="event-controls">
                    <div class="search-container">
                        <input type="text" class="search-input" id="event-search" name="event-search" placeholder="Search events..." aria-label="Search events">
                        <button class="search-clear" aria-label="Clear search">×</button>
                    </div>
                    <select class="category-filter" id="faculty-filter" name="faculty-filter" aria-label="Filter by faculty">
                        <option value="all">All Faculties</option>
                        <option value="arts-and-humanities">Arts and Humanities</option>
                        <option value="engineering">Engineering</option>
                        <option value="health">Health</option>
                        <option value="science">Science</option>
                        <option value="social-sciences">Social Sciences</option>
                    </select>
                </div>
                <div class="event-count"></div>
                <div class="events-grid"></div>
                <div class="event-modal">
                    <div class="modal-content">
                        <button class="modal-close" aria-label="Close modal">×</button>
                        <div class="modal-body"></div>
                    </div>
                </div>
            </div>
        `;
    }
    renderEvents(events) {
        const grid = this.container.querySelector('.events-grid');
        if (events.length === 0) {
            this.renderNoEvents(grid);
            return;
        }
        grid.innerHTML = events.map(event => `
            <div class="event-card" data-event-id="${event.id}">
                <div class="event-content">
                    <span class="event-category ${event.category.toLowerCase().replace('-', '')}">${event.category}</span>
                    <span class="event-faculty ${event.Faculty.toLowerCase().replace(' ', '-')}">${event.Faculty}</span>
                    <h3 class="event-title">${event['Event Title']}</h3>
                    <div class="event-meta">
                        <div class="event-meta-item">
                            <span class="material-symbols-outlined">calendar_today</span>
                            ${formatDate(event.date)}
                        </div>
                        <div class="event-meta-item">
                            <span class="material-symbols-outlined">schedule</span>
                            ${event.time}
                        </div>
                        <div class="event-meta-item">
                            <span class="material-symbols-outlined">location_on</span>
                            ${event.location}
                        </div>
                    </div>
                    <p class="event-description">${event.Summary}</p>
                    <button class="event-button">View Details</button>
                </div>
            </div>
        `).join('');
    }
    renderNoEvents(grid) {
        grid.innerHTML = `
            <div class="no-events">
                <div class="no-events-icon"><span class="material-symbols-outlined">event_busy</span></div>
                <h3>No events found</h3>
                <p>Try adjusting your search or filter criteria.</p>
            </div>
        `;
    }
    showLoading() {
        const grid = this.container.querySelector('.events-grid');
        grid.innerHTML = `
            <div class="loading">
                <div class="loading-spinner"></div>
                <p>Loading events...</p>
            </div>
        `;
    }
    showError(message) {
        const grid = this.container.querySelector('.events-grid');
        grid.innerHTML = `
            <div class="no-events">
                <div class="no-events-icon">⚠️</div>
                <h3>Error</h3>
                <p>${message}</p>
            </div>
        `;
    }
    updateEventCount(filteredCount, totalCount, hasFilters) {
        const countElement = this.container.querySelector('.event-count');
        if (hasFilters) {
            countElement.textContent = `Showing ${filteredCount} of ${totalCount} events`;
        } else {
            countElement.textContent = `${totalCount} event${totalCount !== 1 ? 's' : ''} available`;
        }
    }
}

/**
 * Event Filtering Module
 */
class EventFilter {
    constructor() {
        this.currentSearch = '';
        this.currentFaculty = 'all';
    }
    setSearch(searchTerm) {
        this.currentSearch = searchTerm;
    }
    setFaculty(faculty) {
        this.currentFaculty = faculty;
    }
    getSearch() {
        return this.currentSearch;
    }
    getFaculty() {
        return this.currentFaculty;
    }
    hasActiveFilters() {
        return this.currentSearch !== '' || this.currentFaculty !== 'all';
    }
    filterEvents(events) {
        return events.filter(event => {
            const matchesSearch = this.currentSearch === '' || 
                event['Event Title'].toLowerCase().includes(this.currentSearch.toLowerCase()) ||
                event.Summary.toLowerCase().includes(this.currentSearch.toLowerCase()) ||
                event.location.toLowerCase().includes(this.currentSearch.toLowerCase()) ||
                event.category.toLowerCase().includes(this.currentSearch.toLowerCase()) ||
                event.Faculty.toLowerCase().includes(this.currentSearch.toLowerCase()) ||
                event.Subject.toLowerCase().includes(this.currentSearch.toLowerCase());
            const matchesFaculty = this.currentFaculty === 'all' || 
                event.Faculty.toLowerCase().replace(' ', '-') === this.currentFaculty.replace('-', ' ').toLowerCase();
            return matchesSearch && matchesFaculty;
        });
    }
    filterExpiredEvents(events, showPastEvents = false) {
        const now = new Date();
        return events.filter(event => {
            const startTime = getStartTime(event.time);
            const eventDate = new Date(`${event.date} ${startTime}`);
            return showPastEvents || eventDate > now;
        });
    }
}

/**
 * Event Modal Module
 */
class EventModal {
    constructor(container) {
        this.container = container;
        this.modal = null;
    }
    init() {
        this.modal = this.container.querySelector('.event-modal');
    }
    open(event) {
        if (!event || !this.modal) return;
        const modalBody = this.modal.querySelector('.modal-body');
        const googleMapsUrl = `https://maps.google.com/maps?q=${encodeURIComponent(event.location)}`;
        const bookingPageUrl = event['Booking URL'] || '#BOOKING_PAGE_URL_TO_BE_ADDED';
        modalBody.innerHTML = `
            <span class="modal-category ${event.category.toLowerCase().replace('-', '')}">${event.category}</span>
            <span class="modal-faculty ${event.Faculty.toLowerCase().replace(' ', '-')}">${event.Faculty}</span>
            <h2 class="modal-title">${event['Event Title']}</h2>
            <div class="modal-subject">${event.Subject}</div>
            <div class="modal-meta">
                <div class="modal-meta-item">
                    <span class="material-symbols-outlined">calendar_today</span>
                    ${formatDate(event.date)}
                </div>
                <div class="modal-meta-item">
                    <span class="material-symbols-outlined">schedule</span>
                    ${event.time} BST
                </div>
                <div class="modal-meta-item">
                    <span class="material-symbols-outlined">location_on</span>
                    <a href="${googleMapsUrl}" target="_blank">${event.location}</a>
                </div>
            </div>
            <div class="modal-description">${event.Summary}</div>
            <div class="modal-actions">
                <a href="${bookingPageUrl}" target="_blank" class="modal-register-btn">Register Now</a>
                <button class="modal-share-btn" onclick="navigator.share ? navigator.share({title: '${event['Event Title']}', url: window.location.href}) : navigator.clipboard.writeText(window.location.href)">Share Event</button>
            </div>
        `;
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    close() {
        if (!this.modal) return;
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    isOpen() {
        return this.modal && this.modal.classList.contains('active');
    }
}

/**
 * Main EventWidget Class
 */
class EventWidget {
    constructor(containerSelector, csvPath, options = {}) {
        this.container = document.querySelector(containerSelector);
        this.csvPath = csvPath;
        this.options = {
            showPastEvents: false,
            theme: 'default',
            autoRefresh: true,
            ...options
        };
        this.events = [];
        this.filteredEvents = [];
        this.renderer = new EventRenderer(this.container);
        this.filter = new EventFilter();
        this.modal = new EventModal(this.container);
        this.init();
    }
    init() {
        injectStyles(CSS_STYLES);
        this.renderer.renderWidget();
        this.modal.init();
        this.loadEvents();
        this.bindEvents();
        if (this.options.autoRefresh) {
            setInterval(() => this.refreshEvents(), 60000);
        }
    }
    async loadEvents() {
        try {
            this.renderer.showLoading();
            const response = await fetch(this.csvPath);
            const csvText = await response.text();
            this.events = parseCSV(csvText);
            this.refreshEvents();
        } catch (error) {
            console.error('Error loading events:', error);
            this.renderer.showError('Failed to load events. Please try again later.');
        }
    }
    refreshEvents() {
        this.events = this.filter.filterExpiredEvents(this.events, this.options.showPastEvents);
        this.applyFilters();
    }
    applyFilters() {
        this.filteredEvents = this.filter.filterEvents(this.events);
        this.renderer.renderEvents(this.filteredEvents);
        this.renderer.updateEventCount(
            this.filteredEvents.length, 
            this.events.length, 
            this.filter.hasActiveFilters()
        );
    }
    bindEvents() {
        const searchInput = this.container.querySelector('.search-input');
        const searchClear = this.container.querySelector('.search-clear');
        const facultyFilter = this.container.querySelector('.category-filter');
        const modalClose = this.container.querySelector('.modal-close');
        searchInput.addEventListener('input', (e) => {
            this.filter.setSearch(e.target.value);
            this.applyFilters();
            searchClear.style.display = e.target.value ? 'block' : 'none';
        });
        searchClear.addEventListener('click', () => {
            searchInput.value = '';
            this.filter.setSearch('');
            this.applyFilters();
            searchClear.style.display = 'none';
        });
        facultyFilter.addEventListener('change', (e) => {
            this.filter.setFaculty(e.target.value);
            this.applyFilters();
        });
        this.container.addEventListener('click', (e) => {
            const eventCard = e.target.closest('.event-card');
            if (eventCard) {
                const eventId = eventCard.dataset.eventId;
                const event = this.events.find(e => e.id === eventId);
                if (event) {
                    this.modal.open(event);
                }
            }
        });
        modalClose.addEventListener('click', () => {
            this.modal.close();
        });
        this.container.querySelector('.event-modal').addEventListener('click', (e) => {
            if (e.target.classList.contains('event-modal')) {
                this.modal.close();
            }
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.isOpen()) {
                this.modal.close();
            }
        });
    }
}

// Expose globally for CMS use
window.EventWidget = EventWidget; 
