#! /usr/bin/env node

const program = require('commander')
const figlet = require('figlet')
const { cliConfig } = require('./config.js')

program
	// 定义命令和参数
	.command(cliConfig.command)
	.description(cliConfig.description)
	// -f or --force 为强制创建，如果创建的目录存在则直接覆盖
	.option('-f, --force', '如果创建的目录存在则直接覆盖')
	.action((name, options) => {
		console.log(
			'\r\n' +
				figlet.textSync(cliConfig.cliName, {
					font: 'Standard',
					horizontalLayout: 'default',
					verticalLayout: 'default',
					width: 100,
					whitespaceBreak: true,
				})
		)
		// 打印执行结果
		require('../lib/create.js')(name, options)
	})

program
	// 配置版本号信息
	.version(`v${require('../package.json').version}`)
	.usage('<command> [option]')

// 解析用户执行命令传入参数
program.parse(process.argv)
