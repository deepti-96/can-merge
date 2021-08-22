'use strict';

const { graphql } = require('@octokit/graphql');

const runQuery = async (query, token) => {
	const response = await graphql(query, {
		headers: {
			authorization: `token ${token}`,
		},
	});
	return response;
};

module.exports = runQuery;
