const state = {
    header: {
        avatar: document.querySelector(".profile-photo"),
        name : document.querySelector(".profile-name"),
        job : document.querySelector(".profile-job"),
        location : document.querySelector(".profile-location"),
        phone : document.querySelector(".profile-phone"),
        email : document.querySelector(".profile-email"),

    },
    skills : {
        softskills_zone: document.querySelector("#profile-skills-softskills"),
        hardskills_zone: document.querySelector("#profile-skills-hardskills")
    },
    languages: document.querySelector("#languages")
}

function updateProfileInfo(profileData, header) {
    header.avatar.src = profileData.photo;
    header.avatar.alt = profileData.name;

    header.name.innerText = profileData.name;
    header.job.innerText = profileData.job;
    header.location.innerText = profileData.location;

    header.phone.innerText = profileData.phone;
    header.phone.href = `tel:${profileData.phone}`;
    
    header.email.innerText = profileData.email;
    header.email.href = `mailto:${profileData.email}`;
}

function updateSoftSkills(profileData, stateSkills) {
    stateSkills.innerHTML = profileData.skills.softSkills.map(skill => 
        `<li>${skill}</li>`).join('')

}

function updateHardSkills(profileData, stateSkills) {
    stateSkills.innerHTML = profileData.skills.hardSkills.map(skill => `<li><img src="${skill.logo}" alt="${skill.name}" title="${skill.name}"></li>`).join('')
}

function updateLanguages(profileData, lang) {
    lang.innerHTML = profileData.languages.map(language => `<li>${language}</li>`).join("")
}

(async () => {
    const profileData = await fetchProfileData()
    updateProfileInfo(profileData, state.header)
    updateSoftSkills(profileData, state.skills.softskills_zone)
    updateHardSkills(profileData, state.skills.hardskills_zone)
    updateLanguages(profileData, state.languages)
})()

console.log(state.header.avatar)