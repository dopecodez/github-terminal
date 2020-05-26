module.exports = {
    GITHUB_BASE_URL: "https://api.github.com/",
    GITHUB_HEADERS: {
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'dopecodez'
    },
    NO_OF_RESULTS : 5,
    MESSAGES: {
        SELECTION: {
            REPO_SELECTION: 'Please choose between top 5 repos which match your search',
            GITHUB_SEARCH: 'Enter Github repo name for search',
            ACTION_CHOICE : 'Please choose which action you want',
            USERNAME_FETCH : 'Please enter github username'
        },
        ACTIONS : ['Search Repo', 'List Repo for user'],
        ERRORS: {
            USER_SEARCH_ERROR : 'User and Search cannot be used together',
            NO_SEARCH_RESULT : 'No Search result available',
            NOT_VALID_USERNAME : 'No user with given name exists',
            NOT_FOUND : 'Not Found'
        }
    },
    FIELDS: [
        'id',
        'node_id',
        'private',
        'html_url',
        'description',
        'fork',
        'url',
        'language',
        'forks_count',
        'stargazers_count',
        'watchers_count',
        'size',
        'default_branch',
        'open_issues_count',
        'is_template',
        'topics',
        "has_issues",
        "has_wiki",
        "has_pages",
        "has_downloads",
        "pushed_at",
        "created_at",
        "updated_at",
        'license'
    ]
}