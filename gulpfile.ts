import * as shell from 'gulp-shell'
import { rmdirSync } from 'fs'

export const mocha = shell.task(['mocha'])
export const nyc = shell.task(['nyc mocha'])
export const tsc = shell.task(['tsc --sourceMap false'])
export const typedoc = shell.task(['typedoc'])
export const concatMd = shell.task(['concat-md --decrease-title-levels --start-title-level-at 3 --ignore "**/README.md,**/modules.md" docs > docs.md'])
export const concatReadme = shell.task(['cat abstract.md docs.md > README.md'])
export const clean = async () => rmdirSync('./dist', { recursive: true })
