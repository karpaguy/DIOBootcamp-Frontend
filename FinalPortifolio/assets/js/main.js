const state = {
    header: {
        avatar: document.querySelector(".profile-photo"),
        name : document.querySelector(".profile-name"),
        job : document.querySelector(".profile-job"),
        location : document.querySelector(".profile-location"),
        phone : document.querySelector(".profile-phone"),
        email : document.querySelector(".profile-email"),

    }
}

function updateProfileInfo(profileData) {
    state.header.avatar.src = profileData.photo;
    state.header.avatar.alt = profileData.name;

    state.header.name.innerText = profileData.name;
    state.header.job.innerText = profileData.job;
    state.header.location.innerText = profileData.location;

    state.header.phone.innerText = profileData.phone;
    state.header.phone.href = `tel:${profileData.phone}`;
    
    state.header.email.innerText = profileData.email;
    state.header.email.href = `mailto:${profileData.email}`;
}

(async () => {
    const profileData = await fetchProfileData()
    updateProfileInfo(profileData)
    console.log(profileData)
})()

console.log(state.header.avatar)