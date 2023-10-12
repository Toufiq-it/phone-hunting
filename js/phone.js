const loadData = async (searchText = 13, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data
    // console.log(phones);
    displayPhones(phones, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
    // console.log(phones);

    // 1. get the div id
    const phoneContainer = document.getElementById('phone-container');

    // clear phone container card before adding new card
    phoneContainer.textContent = '';

    // display no result
    const noResultFound = document.getElementById('no-result-found');
    if (phones.length > 0) {
        noResultFound.classList.add('hidden');
    }else{
        noResultFound.classList.remove('hidden');
    };

    // display show all button if there more then 12 phones
    const showAllContainer = document.getElementById('show-all-container');
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    } else {
        showAllContainer.classList.add('hidden');
    }

    // display first 12 phones if not show all
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    };
    

    phones.forEach(phone => {
        console.log(phone);
        // 2 create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card p-8 bg-base-100 shadow-xl`;
        // 3. inner html
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body justify-center items-center">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center">
                <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `;
        // 4. append child
        phoneContainer.appendChild(phoneCard);
    });

    // hide loading spinner
    toggleLoadingSpinner(false);
};

// handle show details
const handleShowDetails = async (id) => {
    console.log('clicked details', id);
    // load single data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
    const phone = data.data;

    showPhoneDetails(phone);

};

// show phone details
const showPhoneDetails = (phone) => {
    console.log(phone);
    // const phoneName = document.getElementById('show-detail-phone-name');
    // phoneName.innerText = phone.name;

    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
    <div class="card bg-base-100">
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="font-bold text-xl">${phone.name}</h2>
            <p><span class="font-bold">Brand: </span>${phone?.brand}</p>
            <p><span class="font-bold">Slug: </span>${phone?.slug}</p>
            <p><span class="font-bold">Storage: </span>${phone?.mainFeatures?.storage}</p>
            <p><span class="font-bold">Memory: </span>${phone?.mainFeatures?.memory}</p>
            <p><span class="font-bold">Display Size: </span>${phone?.mainFeatures?.displaySize}</p>
            <p><span class="font-bold">Release Date: </span>${phone?.releaseDate}</p>
            <p><span class="font-bold">ChipSet: </span>${phone?.mainFeatures?.chipSet}</p>
            <p><span class="font-bold">GPS: </span>${phone?.others?.GPS || 'No GPS'}</p>
            <p><span class="font-bold">WLAN: </span>${phone?.others?.WLAN || 'No WLAN'}</p>
            <p>
            <span class="font-bold">Bluetooth: </span>${phone?.others?.Bluetooth || 'No Bluetooth'}
            <span class="font-bold">NFC: </span>${phone?.others?.NFC || 'No NFC'}
            <span class="font-bold">Radio: </span>${phone?.others?.Radio || 'No Radio'}
            </p>
            <p><span class="font-bold">Sensor: </span>${phone?.mainFeatures?.sensors}</p>
        </div>
    </div>
    `;

    // show the model
    show_details_modal.showModal();
}

// handle search button
const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchFiled = document.getElementById('search-filed');
    const searchText = searchFiled.value;
    console.log(searchText);
    loadData(searchText, isShowAll);
    
};

// handle spinner
const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    } else {
        loadingSpinner.classList.add('hidden');
    }
};

// handle Show all
const handleShowAll = () => {
    handleSearch(true);
};



loadData();