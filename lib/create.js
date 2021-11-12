const { join } = require('path')
const { existsSync, remove } = require('fs-extra')
const inquirer = require('inquirer')

const Generator = require('./Generator.js')

module.exports = async (name, options) => {
	// 执行创建命令
	// 需要创建的目录地址
	const targetAir = join(process.cwd(), name)

	// 目录是否已经存在？
	if (existsSync(targetAir)) {
		// 是否为强制创建？
		if (options.force) {
			await remove(targetAir)
		} else {
			// 询问用户是否确定要覆盖
			let { action } = await inquirer.prompt([
				{
					name: 'action',
					type: 'list',
					message: '目标目录已存在，请选择操作:',
					choices: [
						{
							name: '覆盖',
							value: 'overwrite',
						},
						{
							name: '取消',
							value: false,
						},
					],
				},
			])

			if (!action) {
				return
			} else if (action === 'overwrite') {
				// 移除已存在的目录
				console.log(`\r\nRemoving...`)
				await remove(targetAir)
			}
		}
	}

	// 创建项目
	const generator = new Generator(name, targetAir)

	// 开始创建项目
	generator.create()
}
