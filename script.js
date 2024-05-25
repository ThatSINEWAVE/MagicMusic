document.getElementById('begin-button').addEventListener('click', function() {
    document.getElementById('main-menu').classList.add('hidden');
    document.getElementById('genre-input-menu').classList.remove('hidden');
});

document.getElementById('continue-button').addEventListener('click', function() {
    document.getElementById('genre-input-menu').classList.add('hidden');
    document.getElementById('storyline-input-menu').classList.remove('hidden');
});

document.getElementById('back-button').addEventListener('click', function() {
    document.getElementById('storyline-input-menu').classList.add('hidden');
    document.getElementById('genre-input-menu').classList.remove('hidden');
});

document.getElementById('generate-button').addEventListener('click', function() {
    const genreCount = document.getElementById('genre-count').value;
    const storylineCount = document.getElementById('storyline-count').value;

    if (genreCount > 0 && genreCount <= 50 && storylineCount > 0 && storylineCount <= 50) {
        fetchGenresAndStories(genreCount, storylineCount);
    }
});

document.getElementById('restart-button').addEventListener('click', function() {
    document.getElementById('results').classList.add('hidden');
    document.getElementById('main-menu').classList.remove('hidden');
});

document.getElementById('genre-count').addEventListener('input', function() {
    validateInput(this, document.getElementById('continue-button'));
});

document.getElementById('storyline-count').addEventListener('input', function() {
    validateInput(this, document.getElementById('generate-button'));
});

function validateInput(inputElement, buttonElement) {
    const value = inputElement.value;
    if (value > 50) {
        inputElement.classList.add('invalid');
        buttonElement.disabled = true;
    } else {
        inputElement.classList.remove('invalid');
        buttonElement.disabled = false;
    }
}

function fetchGenresAndStories(genreCount, storylineCount) {
    Promise.all([
        fetch(`https://binaryjazz.us/wp-json/genrenator/v1/genre/${genreCount}`).then(response => response.json()),
        fetch(`https://binaryjazz.us/wp-json/genrenator/v1/story/${storylineCount}`).then(response => response.json())
    ]).then(data => {
        const genres = data[0];
        const stories = data[1];

        const contentDiv = document.getElementById('generated-content');
        contentDiv.innerHTML = '<h2>Generated Genres</h2><ul>' + genres.map(genre => `<li>${genre}</li>`).join('') + '</ul>';
        contentDiv.innerHTML += '<h2>Generated Storylines</h2><ul>' + stories.map(story => `<li>${story}</li>`).join('') + '</ul>';

        document.getElementById('storyline-input-menu').classList.add('hidden');
        document.getElementById('results').classList.remove('hidden');
    }).catch(error => {
        console.error('Error fetching data:', error);
    });
}
