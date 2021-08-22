
'use strict';

// eslint-disable-next-line max-lines-per-function
const buildQuery = (repo, pr) => {
	const [owner, name] = repo.split('/');
	return `
      {
        repository(owner: "${owner}", name: "${name}") {
          branchProtectionRules(first: 10) {
            nodes {
              requiresStatusChecks
              requiredApprovingReviewCount
              requiredStatusCheckContexts
            }
          }
          pullRequest(number: ${pr}) {
            state
            url
            title
            number
            merged
            mergeable
            reviewDecision
            potentialMergeCommit {
              commitUrl
            }
            commits(last: 1) {
              nodes {
                commit {
                  statusCheckRollup {
                    state
                    contexts(last: 100) {
                      totalCount
                      pageInfo {
                        endCursor
                        hasNextPage
                      }
                      nodes {
                        __typename
                        ... on CheckRun {
                          status
                          name
                          conclusion
                        }
                        ... on StatusContext {
                          state
                          context
                          description
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        rateLimit {
          cost
          remaining
        }
      }
    `;
};

module.exports = buildQuery;
