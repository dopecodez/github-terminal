import request from async-request;

async function getGitHubSearchResult(keyword){
    let url = 'https://api.github.com/search/repositories?q=' + keyword;
    
}