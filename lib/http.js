// 通过 axios 处理请求
const axios = require('axios')
const { githubRepos } = require('../bin/config.js')
const execSync = require('child_process').execSync

axios.interceptors.response.use((res) => {
	return res.data
})

/**
 * 获取模板列表
 * @returns Promise
 */
async function getRepoList() {
	return axios.get(`https://api.github.com/users/${githubRepos}/repos`)
}

/**
 * 获取版本信息
 * @param {string} repo 模板名称
 * @returns Promise
 */
async function getTagList(repo) {
	return axios.get(`https://api.github.com/repos/${githubRepos}/${repo}/tags`)
}

/**
 * 获取用户信息并记录
 * @param {string} repos 模板名称
 * @param {Object} body issues增加comment
 */
const gitUserRecod = async (repos, tag, name) => {
	const gitName = execSync('git config user.name').toString().trim()
	const gitEmail = execSync('git config user.email').toString().trim()
	const data = {
		body: `user: ${gitName} email:${gitEmail} time: ${new Date().toLocaleString('zh')}
		repos: ${repos} tag: ${tag} name: ${name}`,
	}
	// https://api.github.com/repos/用户名/仓库名/issues/序号/comments
	return axios.post(`https://api.github.com/repos/${githubRepos}/${repos}/issues/1/comments`, data)
}

module.exports = {
	getRepoList,
	getTagList,
	gitUserRecod,
}
