const cliConfig = {
	cliName: 'imba',
	command: 'create <app-name>',
	description: '创建一个项目',
}

const createConfig = {
	wrapLoading_fail: '失败原因：wifi密码错误...', // fail loading
	download_tips: '在下载模板莫急...', // waiting download template
	getRepo_tips: '获取仓库信息...', // waiting fetch template
	getRepo_prompt_message: '请选择个模板拉取：', // Please choose a template to create project
	getTag_tips: '在拉取标签...', // waiting fetch tag
	getTag_prompt_message: '请选择版本标签：', // Place choose a tag to create project
	finish_tips: '创建完了老哥!',
}

const generatorConfig = {
	create_repo_tips: '获取仓库信息失败!',
	create_tag_tips: '获取版本标签失败!',
}

// https://api.github.com/users/<github user>
const githubRepos = 'imbacc'

module.exports = { cliConfig, createConfig, generatorConfig, githubRepos }
