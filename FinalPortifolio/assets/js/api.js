async function fetchProfileData() {
    const url = 'https://raw.githubusercontent.com/karpaguy/DIOBootcamp-Frontend/refs/heads/main/FinalPortifolio/data/profile.json';
    const fetching = await fetch(url);
    return await fetching.json();
}
