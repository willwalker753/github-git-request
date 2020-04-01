function displayResults(responseJson) {
    console.log(responseJson);
    for(i=0;i<responseJson.length;i++) {  
        $('#results').append(`<a href="${responseJson[i].html_url}" target="_blank">${responseJson[i].name}</a><br><br>`);
    }
}

function getRepos(name) {
    let url = 'https://api.github.com/users/'+name+'/repos';
    fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.message);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function submit() {
    $('form').submit(event => {
        event.preventDefault();
        let name = $('#name').val();
        $('#results').empty();
        getRepos(name);
    });
}

$(submit);