const searchBtn = document.getElementById("searchBtn");
const usernameInput = document.getElementById("username");
const profile = document.getElementById("profile");

searchBtn.addEventListener("click", fetchProfile);

async function fetchProfile(){
    const username = usernameInput.value.trim();

    if(username === ""){
        profile.innerHTML = "<p class='error'>Please enter a username</p>";
        return;
    }

    try{
        const response = await fetch(`https://api.github.com/users/${username}`);
        const data = await response.json();

        if(data.message === "Not Found"){
            profile.innerHTML = "<p class='error'>User not found</p>";
            return;
        }

        profile.innerHTML = `
            <img src="${data.avatar_url}" alt="Avatar">
            <div class="profile-info">
                <h2>${data.name || data.login}</h2>
                <p>${data.bio || "No bio available"}</p>

                <div class="stats">
                    <div>Repos: ${data.public_repos}</div>
                    <div>Followers: ${data.followers}</div>
                    <div>Following: ${data.following}</div>
                </div>

                <br>
                <a href="${data.html_url}" target="_blank" style="color:#ff758c;">
                    View Profile →
                </a>
            </div>
        `;

    }catch(error){
        profile.innerHTML = "<p class='error'>Error fetching data</p>";
    }
}
