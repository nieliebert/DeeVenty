document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('input[type="search"]');
    const searchForm = searchInput ? searchInput.closest('form') || searchInput.parentNode : null;
    const postItems = document.querySelectorAll('article');
    
    if (!searchInput || !postItems.length) return;
    
    // Create form if it doesn't exist
    if (!searchForm.tagName || searchForm.tagName.toLowerCase() !== 'form') {
        const newForm = document.createElement('form');
        newForm.className = searchInput.parentNode.className;
        searchInput.parentNode.parentNode.replaceChild(newForm, searchInput.parentNode);
        newForm.appendChild(searchInput);
        
        // Add button
        const button = document.createElement('button');
        button.type = 'submit';
        button.className = 'absolute right-3 top-1/2 transform -translate-y-1/2';
        button.innerHTML = '<svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>';
        newForm.appendChild(button);
        
        searchForm = newForm;
    }
    
    function performSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        
        // If empty search, show all posts
        if (!searchTerm) {
            postItems.forEach(item => {
                item.style.display = '';
            });
            return;
        }
        
        // Filter posts based on search term
        postItems.forEach(item => {
            const title = item.querySelector('h2, h3')?.textContent.toLowerCase() || '';
            const description = item.querySelector('p')?.textContent.toLowerCase() || '';
            const content = title + ' ' + description;
            
            if (content.includes(searchTerm)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    // Handle form submission
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        performSearch();
    });
    
    // Optional: search as you type
    searchInput.addEventListener('input', function() {
        if (searchInput.value.length > 2 || searchInput.value.length === 0) {
            performSearch();
        }
    });
}); 