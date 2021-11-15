const path = require('path')
const ora = require('ora')
const chalk = require('chalk')
const inquirer = require('inquirer')
const downloadGitRepo = require('download-git-repo') // 不支持 Promise
const { promisify } = require('util')

const { getRepoList, getTagList, gitUserRecod } = require('./http.js')
const { githubRepos, createConfig, generatorConfig } = require('../bin/config.js')

// 添加加载动画
async function wrapLoading(fn, message, ...args) {
	// 使用 ora 初始化，传入提示信息 message
	const spinner = ora(message)
	// 开始加载动画
	spinner.start()

	try {
		// 执行传入方法 fn
		const result = await fn(...args)
		// 状态为修改为成功
		spinner.succeed()
		return result || true
	} catch (error) {
		console.log('error', error)
		// 状态为修改为失败
		spinner.fail(createConfig.wrapLoading_fail)
		return false
	}
}

class Generator {
	constructor(name, targetDir) {
		// 目录名称
		this.name = name
		// 创建位置
		this.targetDir = targetDir

		// 对 download-git-repo 进行 promise 化改造
		this.downloadGitRepo = promisify(downloadGitRepo)
	}

	// 下载远程模板
	// 1) 拼接下载地址
	// 2) 调用下载方法
	async download(repo, tag) {
		// 1) 拼接下载地址
		const requestUrl = `${githubRepos}/${repo}${tag ? '#' + tag : ''}`

		// 2) 调用下载方法
		return await wrapLoading(
			this.downloadGitRepo, // 远程下载方法
			createConfig.download_tips, // 加载提示信息
			requestUrl, // 参数1: 下载地址
			path.resolve(process.cwd(), this.targetDir)
		) // 参数2: 创建位置
	}

	// 获取用户选择的模板
	// 1) 从远程拉取模板数据
	// 2) 用户选择自己新下载的模板名称
	// 3) return 用户选择的名称
	async getRepo() {
		// 1) 从远程拉取模板数据
		const repoList = await wrapLoading(getRepoList, createConfig.getRepo_tips)
		if (!repoList) return false

		// 过滤我们需要的模板名称
		const repos = repoList.map((item) => item.name)

		// 2) 用户选择自己新下载的模板名称
		const { repo } = await inquirer.prompt({
			name: 'repo',
			type: 'list',
			choices: repos,
			message: createConfig.getRepo_prompt_message,
		})

		// 3) return 用户选择的名称
		return repo
	}

	// 获取版本标签
	async getTag(repo) {
		// 1) 基于 repo 结果，远程拉取对应的 tag 列表
		const tags = await wrapLoading(getTagList, createConfig.getTag_tips, repo)
		if (!tags) return false

		// 过滤我们需要的 tag 名称
		const tagsList = tags.map((item) => item.name)

		// 2) 用户选择自己需要下载的 tag
		const { tag } = await inquirer.prompt({
			name: 'tag',
			type: 'list',
			choices: tagsList,
			message: createConfig.getTag_prompt_message,
		})

		// 3) return 用户选择的 tag
		return tag
	}

	// 核心创建逻辑
	// 1) 获取模板名称
	// 2) 获取 tag 名称
	// 3) 下载模板到模板目录
	async create() {
		// 1) 获取模板名称
		// const repo = await this.getRepo()
		const repo = 'fast-uni-app'
		console.log('repo', repo)
		if (!repo) {
			console.log(generatorConfig.create_repo_tips)
			return
		}

		// 2) 获取 tag 名称
		const tag = await this.getTag(repo)
		console.log('tag', tag)
		if (!tag) {
			console.log(generatorConfig.create_tag_tips)
			return
		}

		// 3) 下载模板到模板目录
		const down = await this.download(repo, tag)
		console.log('down', down)
		if (!down) {
			console.log(generatorConfig.create_download_tips)
			return
		}

		// 4) 获取用户信息并记录
		// gitUserRecod(repo, tag, this.name)

		// 5) 模板使用提示
		console.log(`\r\n${createConfig.finish_tips} 项目名：${chalk.cyan(this.name)}`)
		console.log('请用HBuilder X打开 不是vue-cli为基础cli架构!')
	}
}

module.exports = Generator
