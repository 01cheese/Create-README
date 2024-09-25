document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const sectionList = document.getElementById('section-list');
    const searchInput = document.getElementById('search-input');
    const markdownInput = document.getElementById('markdown-input');
    const markdownPreview = document.getElementById('markdown-preview');
    const downloadButton = document.getElementById('download-btn');

    // Predefined sections and their markdown content
    const sections = {
        "Title and Description": "# Project Title\nA brief description of the project.",
        "API Reference": "## API Reference\nDetails about the API.",
        "Acknowledgements": "## Acknowledgements\nThanks to everyone who contributed.",
        "Appendix": "## Appendix\nAdditional information.",
        "License": "## License\nThis project is licensed under the MIT License.",
        "Authors": "## Authors\nList of authors.",
        "Badges": "## Badges\n![badge](https://img.shields.io/badge/badge-text-brightgreen)",
        "Color Reference": "## Color Reference\nA color palette used in the project.",
        "Contributing": "## Contributing\nHow to contribute to the project.",
        "Demo": "## Demo\nLink to a demo of the project.",
        "Deployment": "## Deployment\nInstructions for deployment.",
        "Documentation": "## Documentation\nLink to the documentation.",
        "Environment Variables": "## Environment Variables\nList of environment variables.",
        "Features": "## Features\nList of features.",
        "Feedback": "## Feedback\nWays to give feedback.",
        "Github Profile - About Me": "## About Me\nDetails about the author.",
        "Installation": "## Installation\nInstructions for installing the project.",
        "Lessons": "## Lessons Learned\nKey lessons learned during the project.",
        "Logo": "## Logo\n![logo](logo.png)",
        "Optimizations": "## Optimizations\nOptimizations made for the project.",
        "Related": "## Related Projects\nList of related projects.",
        "Roadmap": "## Roadmap\nFuture goals and milestones.",
        "Run Locally": "## Run Locally\nInstructions to run the project locally.",
        "Screenshots": "## Screenshots\n![screenshot](screenshot.png)",
        "Support": "## Support\nHow to get support.",
        "Tech": "## Technologies Used\nList of technologies used.",
        "Running Tests": "## Running Tests\nHow to run tests.",
        "Usage/Examples": "## Usage/Examples\nExamples of how to use the project.",
        "Used By": "## Used By\nList of organizations or people using this project."
    };

    // Load sections in the sidebar
    function loadSections(filter = "") {
        sectionList.innerHTML = '';
        const filteredSections = Object.keys(sections).filter(section =>
            section.toLowerCase().includes(filter.toLowerCase())
        );

        filteredSections.forEach(section => {
            const sectionButton = document.createElement('button');
            sectionButton.classList.add('section-item');
            sectionButton.innerText = section;
            sectionButton.addEventListener('click', () => {
                markdownInput.value += sections[section] + '\n\n';
                updatePreview();
            });
            sectionList.appendChild(sectionButton);
        });
    }

// Function to escape HTML character

function updatePreview() {
    const markdownText = markdownInput.value;
    const parsedMarkdown = marked.parse(markdownText);

    // Строгая конфигурация DOMPurify с разрешением только безопасных тегов и изображений
    const purifyConfig = {
        ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'h1', 'h2', 'h3', 'ul', 'li', 'ol', 'code', 'pre', 'blockquote', 'img'],  // Разрешаем <img>
        ALLOWED_ATTR: ['src', 'alt', 'title'],  // Разрешаем атрибуты для изображений
        ALLOWED_URI_REGEXP: /^https?:\/\//i,  // Только безопасные ссылки для изображений
        FORBID_TAGS: ['script', 'form', 'input', 'iframe'],  // Запрещаем опасные теги
        FORBID_ATTR: ['onerror', 'onload', 'style'],  // Запрещаем опасные атрибуты
    };

    const sanitizedContent = DOMPurify.sanitize(parsedMarkdown, purifyConfig);  // Очищаем с конфигурацией
    markdownPreview.innerHTML = sanitizedContent;
}




    // Download markdown as .md file
    function downloadMarkdown() {
        const markdownText = markdownInput.value;
        const blob = new Blob([markdownText], { type: 'text/markdown' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'README.md';
        link.click();
    }

    // Add event listeners
    downloadButton.addEventListener('click', downloadMarkdown);
    searchInput.addEventListener('input', () => loadSections(searchInput.value));
    markdownInput.addEventListener('input', updatePreview);

    // Initial load
    loadSections();
});
