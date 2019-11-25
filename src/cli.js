const inquirer = require('inquirer'),
    request = require('../src/request.js'),
    constants = require('../commons/constants.js');

async function cli(args) {
    let keyword = await getKeyWord();
    let repos = await request.getGitHubSearchResult(keyword);
    let items = JSON.parse(repos.body).items;
    items.length = 5;
    let choices = [];
    items.forEach( repo => {
        choices.push(repo.full_name);
    });
    let selectedRepo = await chooseBetweenOptions(choices);
    let repoDetails = await request.getGitHubRepoDetails(selectedRepo);
    let parsedRepo = parseRepoDetails(JSON.parse(repoDetails.body));
    console.log(parsedRepo);
}

async function chooseBetweenOptions(choices) {
    const defaultAction = choices[0];
    const actionQuestion = [];
    actionQuestion.push({
        type: 'list',
        name: 'action',
        message: constants.MESSAGES.SELECTION.REPO_SELECTION,
        choices: choices,
        default: defaultAction,
    });
    const answers = await inquirer.prompt(actionQuestion);
    return answers.action;
}

async function getKeyWord(){
    let keywordQuestion = [];
    keywordQuestion.push({
        name: 'keyword',
        message: constants.MESSAGES.SELECTION.GITHUB_SEARCH
    });
    const answer = await inquirer.prompt(keywordQuestion);
    return answer.keyword;
}

function parseRepoDetails(repo){
    let result = {};
    constants.FIELDS.forEach(field => {
        if(repo[field]){
            result[field] = repo[field];
        }
    });
    return result;
}

module.exports = {
    cli : cli
}