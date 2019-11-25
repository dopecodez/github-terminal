import inquirer from 'inquirer';
import request from '../src/request.js'

export async function cli(args) {
    let keyword = await getKeyWord();
    let repos = await request.getGitHubSearchResult(keyword);
    let selectedRepo = await chooseBetweenOptions(repos);
}

async function chooseBetweenOptions(repos) {
    const defaultAction = repos[0];
    const actionQuestion = [];
    actionQuestion.push({
        type: 'list',
        name: 'action',
        message: 'Please choose between top 5 repos',
        choices: repos,
        default: defaultAction,
    });
    const answers = await inquirer.prompt(actionQuestion);
    return answers.action;
}

async function getKeyWord(action){
    let keywordQuestion = [];
    keywordQuestion.push({
        name: 'keyword',
        message: 'Enter Github repo name for search'
    });
    const answer = await inquirer.prompt(keywordQuestion);
    return answer.keyword;
}