const weatherForm = document.querySelector('form');
const searchQuery = document.querySelector('input');

document.querySelector('#location').textContent='';
document.querySelector('#forecast').textContent='';

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = searchQuery.value;
    document.querySelector('#location').textContent='Loading...';
    document.querySelector('#forecast').textContent='';
    fetch('http://localhost:3000/weather?address='+location).then( (response) => {
        response.json().then( (data) => {
            if(data.error) {
                document.querySelector('#location').textContent=data.error;
                document.querySelector('#forecast').textContent='';
            } else {
                document.querySelector('#location').textContent=data.location;
                document.querySelector('#forecast').textContent=data.forecast;
            }     
        });
    });
});