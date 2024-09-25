document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const sectionList = document.getElementById('section-list');
    const searchInput = document.getElementById('search-input');
    const markdownInput = document.getElementById('markdown-input');
    const markdownPreview = document.getElementById('markdown-preview');
    const downloadButton = document.getElementById('download-btn');
    const themeToggleButton = document.getElementById('theme-toggle');
    const body = document.body;

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

    // Function to load sections in the sidebar
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

    // Function to update markdown preview
    function updatePreview() {
        const markdownText = markdownInput.value;
        markdownPreview.innerHTML = marked.parse(markdownText);
    }

    // Function to download the markdown as a .md file
    function downloadMarkdown() {
        const markdownText = markdownInput.value;
        const blob = new Blob([markdownText], { type: 'text/markdown' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'README.md';
        link.click();
    }

    // Add event listener for download button
    downloadButton.addEventListener('click', downloadMarkdown);

    // Event listener for searching sections
    searchInput.addEventListener('input', function() {
        const query = searchInput.value;
        loadSections(query);
    });

    // Event listener to update the preview as the user types
    markdownInput.addEventListener('input', updatePreview);

    // Load all sections initially
    loadSections();

});
