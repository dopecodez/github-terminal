const got = require('got'),
    constants = require('../commons/constants.js');

class RequestService {
    async getGitHubSearchResult(keyword) {
        let url = constants.GITHUB_BASE_URL + 'search/repositories?q=' + keyword;
        try {
            let data = await this.fireRequest(url);
            return data;
        } catch (err) {
            throw err;
        }
    }

    async getGitHubRepoDetails(repoUrl) {
        let url = constants.GITHUB_BASE_URL + 'repos/' + repoUrl;
        try {
            let data = await this.fireRequest(url);
            return data;
        } catch (err) {
            throw err;
        }
    }

    async getGitHubUserRepos(username) {
        let url = constants.GITHUB_BASE_URL + 'users/' + username + '/repos?per_page=100&sort=updated';
        try {
            let data = await this.fireRequest(url);
            return data;
        } catch (err) {
            throw err;
        }
    }

    async fireRequest(url){
        try {
            let data = await got(url, {
                headers: constants.GITHUB_HEADERS
            });
            return data;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = new RequestService();