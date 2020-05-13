# github-terminal-cli [![Build Status](https://travis-ci.org/dopecodez/github-terminal.svg?branch=master)](https://travis-ci.org/dopecodez/github-terminal)
A terminal cli app for searching and getting user repositories or search details from Github.It uses the Github V3 api's for getting results.For more information on the Github API, go to https://developer.github.com/v3/.

It's a basic cli with inputs that can be passed as arguments or as options. It will get all fields available in repository details which are defined in constants.js file and prints it out in the console. If you need a new field, just add it to the fields array in this file. Has tests with mocha and chai written on top of this.

If you have any doubts or clarifications on this code, hit me up and I'll try to help you guys out!

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites

You'll need to install NodeJS for running this application. I'm on Node v11.3.0, you can find it at:
```
https://nodejs.org/en/download/
```
You'll also need a code editor to see how the code goes. Use whichever editor which has JS support, I use Visual Studio Code on 
Windows 10.

### Installing

Simple steps to get the application running. Open the terminal to the folder containing github-terminal and just type:
```
npm install
```
This should install all the dependencies within package.json and create your package-lock.json and node modules.

After the previous command completes successfully, open the terminal and type:
```
npm link
```
This is handy for installing your apps, so that you can work on it and test it iteratively without having to continually rebuild.

To run the tests, all you need to do is, type:
```
npm test
```
## Usage

Once program has successfully completed the above commands, we can run our app from the cli. Go ahead and type this on cli:
```
ght -u -k dopecodez -f -n 10
```
ght should get the list of repos for user dopecodez and select the first one. If you just type:
```
ght
```
ght should prompt you for all the options and you can use them.

The arguments available are : -u or -s(--user or --search : Please note that using both these options will result in an error. Use either one)

-k string: --keyword. -k should always be succeeded by a keyword or will throw an error. Keyword can be name of user or repo name for search.

If any of the above arguments are missing, ght will prompt you select one of these options.

-f : --first. If specified, will select and display the first repo details returned by the API. If missing, will prompt user to select from repos returned.

-n number: --number. -n should be succeeded by a number or it will throw an error. Number or repos to choose from.If missing, default is 5.Max is 100.

## Built With

* [NodeJS](https://nodejs.org/en/) - The language used
* [Mocha](https://mochajs.org/) - Test framework for JS.
* [Chai](https://www.chaijs.com/) - Assertion library for JS.
* [Inquirer](https://www.npmjs.com/package/inquirer/v/0.2.3) - Package for interactive cli option choice.
* [args](https://www.npmjs.com/package/args) - Package for parsing command line arguments.
* [Chalk](https://www.npmjs.com/package/chalk) - Package for creating colorful console outputs.
* [got](https://www.npmjs.com/package/got) - Human-friendly and powerful HTTP request library for Node.js.
* [bdd-stdin](https://www.npmjs.com/package/bdd-stdin) - Used for easily mocking responses for BDD unit tests that ask user a question.

## Contributing

Anybody with ideas to genuinely improve the project are welcome. We use git flow, so just pull the repo, cut a branch on develop and put a pull request back to us. We will look through the PR as soon as possible.

## Versioning
For the versions available, see the [tags on this repository](https://github.com/dopecodez/github-terminal/tags). 

## Authors

* **Govind S** - *Initial work* - [dopecodez](https://github.com/dopecodez)

## License

This project is free. Use it in whichever way you please.

## Acknowledgments

* Hat tip to anyone whose code was used.
* [This medium article](https://medium.com/@zorrodg/integration-tests-on-node-js-cli-part-1-why-and-how-fa5b1ba552fe) for giving me ideas to e2e test my cli app.
* [This artice](https://glebbahmutov.com/blog/unit-testing-cli-programs/) for giving me testing ideas which is incidently by the same contributor who maintains bdd-stdin.
* [Twillio's article on CLI apps](https://www.twilio.com/blog/how-to-build-a-cli-with-node-js) for getting me started on the right direction.
