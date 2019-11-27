const inquirer = require('inquirer'),
    request = require('../src/request.js'),
    arg = require('arg'),
    chalk = require('chalk'),
    constants = require('../commons/constants.js');

// main function
async function cli(args) {
    try {
        let options = parseArgumentsIntoOptions(args); // parse cli arguments
        let action;
        if(options.search && options.user){ //cannot use both search and list user repos together
            throw new Error(constants.MESSAGES.ERRORS.USER_SEARCH_ERROR); 
        }
        if (options.search) {
            action = constants.MESSAGES.ACTIONS[0];
        } else if (options.user) {
            action = constants.MESSAGES.ACTIONS[1];
        } else {
            action = await getAction(); // if no options, provide prompt for user input on type of action
        }
        let keyword, repos, items;
        if (action == constants.MESSAGES.ACTIONS[0]) {
            if (options.keyword == null) {
                keyword = await getKeyWord(constants.MESSAGES.SELECTION.GITHUB_SEARCH);
            } else {
                keyword = options.keyword; //if no options, provide prompt for user to input keyword
            }
            repos = await request.getGitHubSearchResult(keyword);
            items = JSON.parse(repos.body).items;
            if(items.length == 0){
                throw new Error(constants.MESSAGES.ERRORS.NO_SEARCH_RESULT)
            }
        } else if (action == constants.MESSAGES.ACTIONS[1]) {
            if (options.keyword == null) {
                keyword = await getKeyWord(constants.MESSAGES.SELECTION.USERNAME_FETCH);
            } else {
                keyword = options.keyword;//if no options, provide prompt for user to input keyword
            }
            repos = await request.getGitHubUserRepos(keyword);
            items = JSON.parse(repos.body);
            if(items.message == constants.MESSAGES.ERRORS.NOT_FOUND){
                throw new Error(constants.MESSAGES.ERRORS.NOT_VALID_USERNAME)
            }
            items.sort((a, b) => b.stargazers_count - a.stargazers_count); //sorting by no of stars
        }
        items.length = options.number; //setting no of choices length to input
        let choices = [];
        items.forEach(repo => {
            choices.push(repo.full_name); //providing user selection from full names of repos
        });
        let selectedRepo = await chooseBetweenOptions(choices);//prompt for user to select repo
        let repoDetails = await request.getGitHubRepoDetails(selectedRepo);
        let parsedRepo = parseRepoDetails(JSON.parse(repoDetails.body));//parsing to get only required fields
        Object.keys(parsedRepo).forEach(key => {
            console.log(`${chalk.green(key)} : ${chalk.cyanBright(JSON.stringify(parsedRepo[key], null, 2))}`)
        });
    } catch (err) {
        console.log(chalk.redBright(err.message));
    }
}

//parses raw arguments to options
function parseArgumentsIntoOptions(rawArgs) {
    try {
        const args = arg(
            {
                '--search': Boolean,
                '--keyword': String,
                '--user': Boolean,
                '--number' : Number,
                '-s': '--search',
                '-k': '--keyword',
                '-u': '--user',
                '-n': '--number'
            },
            {
                argv: rawArgs.slice(2),
            }
        );
        return {
            search: args['--search'] || null,
            user: args['--user'] || null,
            keyword: args['--keyword'] || null,
            number : args['--number'] || constants.NO_OF_RESULTS
        }
    } catch (err) {
        throw (err);
    }
}

//function to choose between repos
async function chooseBetweenOptions(choices) {
    try {
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
    } catch (err) {
        throw err;
    }
}

//function to get keyword
async function getKeyWord(message) {
    try {
        let keywordQuestion = [];
        keywordQuestion.push({
            name: 'keyword',
            message: message
        });
        const answer = await inquirer.prompt(keywordQuestion);
        return answer.keyword;
    } catch (err) {
        throw err;
    }
}

//function to choose between actions
async function getAction() {
    try {
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
    } catch (err) {
        throw err;
    }
}

//parse repo details to only get required keys
function parseRepoDetails(repo) {
    let result = {};
    constants.FIELDS.forEach(field => {
        if (repo[field]) {
            result[field] = repo[field];
        }
    });
    return result;
}

module.exports = {
    cli: cli
}