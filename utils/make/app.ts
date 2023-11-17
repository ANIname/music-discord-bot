import 'dotenv/config'

import { execSync } from 'node:child_process'

import inquirer from 'inquirer'
import map from 'lodash/map.js'

import { AVAILABLE_BOTS_BY_CHANNELS } from '../../constants/discord'

(async () => {
  const { command } = await inquirer.prompt([{
    type: 'list',
    name: 'command',
    message: 'Choose the command:',
    choices: [
      { name: 'Build application', value: 'npx tsc' },
      { name: 'Run application', value: 'run application' },
      { name: 'Run and watch application', value: 'npx ts-node-dev --respawn --transpile-only src/index' }
    ]
  }]) as { command: string }
  
  switch (command) {
    case 'run application': {
      const { botId } = await inquirer.prompt([{
        type: 'list',
        name: 'botId',
        message: 'Chose the chanell to run bot:',
        choices: map(AVAILABLE_BOTS_BY_CHANNELS, (botId: string, name: string) => ({ name, value: botId }))
      }]) as { botId: string }
  
      execSync(`BOT_CHANEL_ID=${botId} npx ts-node src/index`, { stdio: 'inherit' })

      break
    }

    case 'another command': {
      break
    }
  
    default: {
      execSync(command, { stdio: 'inherit' })
    }
  }
})()
