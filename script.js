document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('markdown-input');
    const preview = document.getElementById('markdown-preview');
    const sectionList = document.getElementById('section-list');
    const searchInput = document.getElementById('search-input');
    const sectionButtons = document.querySelectorAll('.section-buttons button');
    let jsonData = {};

    // Function to update the preview
    const updatePreview = () => {
        preview.textContent = input.value;
    };

    // Event listener for input changes
    input.addEventListener('input', updatePreview);

    // Function to add a new section item
    const addSectionItem = (sectionName, markdownContent, buttonElement) => {
        if (!document.getElementById(`section-${sectionName.toLowerCase().replace(/ /g, '-')}`)) {
            const sectionItem = document.createElement('div');
            sectionItem.classList.add('section-item');
            sectionItem.id = `section-${sectionName.toLowerCase().replace(/ /g, '-')}`;
            sectionItem.draggable = true;
            sectionItem.innerHTML = `<span>${sectionName}</span>
                                     <div class="icons">
                                         <button class="refresh">⟳</button>
                                         <button class="delete">🗑</button>
                                     </div>`;

            // Event listeners for the new buttons
            sectionItem.querySelector('.delete').addEventListener('click', () => {
                sectionItem.remove();
                if (buttonElement) {
                    buttonElement.style.display = 'block';
                }
                updatePreview();
            });

            sectionItem.querySelector('.refresh').addEventListener('click', () => {
                // Logic for refresh button can be added here
            });

            sectionList.appendChild(sectionItem);

            // Add markdown content to the input
            input.value += markdownContent;
            updatePreview();

            // Hide the button to prevent adding duplicate sections
            if (buttonElement) {
                buttonElement.style.display = 'none';
            }

            // Add drag and drop functionality
            sectionItem.addEventListener('dragstart', dragStart);
            sectionItem.addEventListener('dragover', dragOver);
            sectionItem.addEventListener('drop', dragDrop);
        } else {
            alert(`${sectionName} is already added.`);
        }
    };

    // Function to generate markdown content based on section name
    function generateMarkdownContent(sectionName) {
        if (jsonData[sectionName]) {
            return jsonData[sectionName];
        }
        return `## ${sectionName}\n\nYour content here...\n\n`;
    }

    // Event listeners for section buttons
    sectionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const markdownContent = generateMarkdownContent(button.textContent);
            addSectionItem(button.textContent, markdownContent, button);
        });
    });

    // Adding a custom section
    document.querySelector('.custom-section').addEventListener('click', () => {
        const customSectionName = prompt('Enter custom section name:');
        if (customSectionName) {
            const markdownContent = `## ${customSectionName}\n\nYour content here...\n\n`;
            addSectionItem(customSectionName, markdownContent, null);
        }
    });

    // Drag and Drop Functions
    function dragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.id);
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function dragDrop(e) {
        e.preventDefault();
        const id = e.dataTransfer.getData('text');
        const draggableElement = document.getElementById(id);
        const dropzone = e.target.closest('.section-item');
        sectionList.insertBefore(draggableElement, dropzone);
    }

    // Load JSON data
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            jsonData = data;
        })
        .catch(error => console.error('Error loading JSON data:', error));

    // Initial call to update the preview
    updatePreview();
});
