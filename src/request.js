const request = require('async-request'),
    constants = require('../commons/constants.js');

class RequestService {
    async getGitHubSearchResult(keyword) {
        let url = constants.GITHUB_BASE_URL + 'search/repositories?q=' + keyword;
        try {
            let data = await request(url, {
                headers: constants.GITHUB_HEADERS
            });
            return data;
        } catch (err) {
            throw err;
        }
    }

    async getGitHubRepoDetails(repoUrl) {
        let url = constants.GITHUB_BASE_URL + 'repos/' + repoUrl;
        try {
            let data = await request(url, {
                headers: constants.GITHUB_HEADERS
            });
            return data;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = new RequestService();