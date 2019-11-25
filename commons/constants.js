module.exports = {
    GITHUB_BASE_URL: "https://api.github.com/",
    GITHUB_HEADERS: {
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'dopecodez'
    },
    MESSAGES: {
        SELECTION: {
            REPO_SELECTION: 'Please choose between top 5 repos which match your search',
            GITHUB_SEARCH: 'Enter Github repo name for search'
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
        "has_projects",
        "has_wiki",
        "has_pages",
        "has_downloads",
        "pushed_at",
        "created_at",
        "updated_at",
        'license'
    ]
}