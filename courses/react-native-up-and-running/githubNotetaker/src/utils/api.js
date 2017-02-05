let api = {
    getBio(username) {
        const user = username.toLowerCase().trim();
        const url = `https://api.github.com/users/${user}`;
        return fetch(url).then((res) => res.json());
    },
    getRepos(username) {
        const user = username.toLowerCase().trim();
        const url = `https://api.github.com/users/${user}/repos`;
        return fetch(url).then((res) => res.json());
    }
};
export default api;
