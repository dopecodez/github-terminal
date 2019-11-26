const inquirer = require('inquirer'),
    request = require('../src/request.js'),
    constants = require('../commons/constants.js');

async function cli(args) {
    let action = await getAction();
    let keyword, repos, items;
    if(action == constants.MESSAGES.ACTIONS[0]){
        keyword = await getKeyWord(constants.MESSAGES.SELECTION.GITHUB_SEARCH);
        repos = await request.getGitHubSearchResult(keyword);
        items = JSON.parse(repos.body).items;
    }else if(action == constants.MESSAGES.ACTIONS[1]){
        keyword = await getKeyWord(constants.MESSAGES.SELECTION.USERNAME_FETCH);
        repos = await request.getGitHubUserRepos(keyword);
        items = JSON.parse(repos.body);
    }
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

async function getKeyWord(message){
    let keywordQuestion = [];
    keywordQuestion.push({
        name: 'keyword',
        message: message
    });
    const answer = await inquirer.prompt(keywordQuestion);
    return answer.keyword;
}

async function getAction(){
    let actionQuestion = [];
    let defaultAction = constants.MESSAGES.ACTIONS[0];
    actionQuestion.push({
        type: 'list',
        name: 'action',
        message: constants.MESSAGES.SELECTION.ACTION_CHOICE,
        choices: constants.MESSAGES.ACTIONS,
        default: defaultAction,
    });
    const answer = await inquirer.prompt(actionQuestion);
    return answer.action;
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