const searchBtn = document.getElementById('search-btn');
const plantList = document.getElementById('items');
const plantDetails = document.querySelector('.description');
const plantCloseBtn = document.getElementById('close-info');

searchBtn.addEventListener('click', getPlantList);
plantList.addEventListener('click', getPlantDetails);
plantCloseBtn.addEventListener('click', () => {
  plantDetails.parentElement.classList.remove('show-info')
});


function getPlantList(event) {
  event.preventDefault();
  let searchInputText = document.getElementById('search-input').value.trim();
  fetch(`https://perenual.com/api/species-list?key=sk-JgDi6636c7020ea875260&q=${searchInputText}`)
    .then(response => response.json())
    .then(data => {
      let html = "";
      if(data.data){
        data.data.forEach(items => {
          html += `
          <div class="item-block" data-id="${items.id}">
            <div class="plant-img">
              <img src="${items.default_image?.small_url}" alt="plant img" />
            </div>
            <div class="plant-info">
              <p>${items.common_name}</p>
              <a href="#" class="info-btn">More Info</a>
            </div>
          </div>
      `;
    });
  }
  plantList.innerHTML = html; 
  })

  .catch(error => console.log('error', error.message));

}


function getPlantDetails (e) {
  e.preventDefault();
  if(e.target.classList.contains('info-btn')) {
    let plantItem = e.target.parentElement.parentElement;
    fetch(`https://perenual.com/api/species/details/${plantItem.dataset.id}?key=sk-JgDi6636c7020ea875260`)
    .then(response => response.json())
    .then(data => plantDetailsBox(data));
    }
}

function plantDetailsBox(data) {
    console.log(data);
    let html = `
        <div class="details">
          <div class="box-1">
            <div class="click-img">
              <img src="${data.default_image?.small_url}" alt="plant img" />
            </div>
          </div>
          
          <div class="box-2">
            <p class="plant-title">${data.common_name}</p>
            <p class="plant-descrip">${data.description}</p>
          </div>

          <div class="box-3">
            <p>Family: ${data.family ?? 'unknown'}</p>
            <p>Scientific Name: ${data.scientific_name ?? 'unknown'}</p>
            <p>Origin: ${data.origin ?? 'unknown'}</p>
            <p>Type: ${data.type ?? 'unknown'}</p>
            <p>Dimension: ${data.dimension ?? 'unknown'}</p>
            <p>Cycle: ${data.cycle ?? 'unknown'}</p>
          </div>

          <div class="box-4">
            <p>Attracts: ${data.attracts ?? 'unknown'}</p>
            <p>Propagation: ${data.propagation ?? 'unknown'}</p>
            <p>Sunlight: ${data.sunlight}</p>
            <p>Pruning Month(s): ${data.pruning_month ?? 'unknown'}</p>
            <p>Growth Rate: ${data.growth_rate ?? 'unknown'}</p>
            <p>Watering: ${data.watering ?? 'unknown'}</p>
          </div>

          <div class="box-5">
          <p>Soil?: ${data.soil ?? 'unknown'}</p>
          <p>Thorny?: ${data.thorny ?? 'unknown'}</p>
          <p>Maintenance?: ${data.maintenance ?? 'unknown'}</p>
          <p>Medicinal?: ${data.medicinal ?? 'unknown'}</p>
          <p>Cuisine: ${data.cuisine ?? 'unknown'}</p>
          <p>Rare Level?: ${data.rare_level ?? 'unknown'}</p>
          <p>Poisonous to humans?: ${data.poisonous_to_humans ?? 'unknown'}</p>
          <p>Indoor?: ${data.indoor ?? 'unknown'}</p>
          </div>
        </div>
      `;
    plantDetails.innerHTML = html;
    plantDetails.parentElement.classList.add('show-info');
}

