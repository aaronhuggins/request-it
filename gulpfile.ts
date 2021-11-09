import * as gulp from 'gulp'
import * as shell from 'gulp-shell'

function shellTask (tasks: string[], opts?: any): () => Promise<void> {
  const t = shell.task(tasks, opts)

  if (typeof opts === 'string') Object.defineProperty(t, 'name', { value: opts })
  if (typeof opts?.name === 'string') Object.defineProperty(t, 'name', { value: opts.name })
  if (opts === undefined && typeof tasks[0] === 'string') {
    const cmd = tasks[0].split(/ /gu)
    const name = cmd[0]
    Object.defineProperty(t, 'name', { value: name })
  }

  return t
}

export const mocha = shellTask(['mocha'])
export const nyc = shellTask(['nyc mocha'])
export const tsc = shellTask(['tsc --sourceMap false'])
export const typedoc = shellTask(['typedoc'])
export const concatMd = shellTask(['concat-md --decrease-title-levels --start-title-level-at 3 --ignore "**/README.md,**/modules.md" docs > docs.md'])
export const concatReadme = shellTask(['cat abstract.md docs.md > README.md'], 'concatReadme')
export const clean = shellTask(["del-cli '**/*.(js|d.ts|js.map)' '!node_modules/**/*.(js|d.ts|js.map)' '!coverage/**/*.(js|d.ts|js.map)'"])
export const prepack = gulp.series(typedoc, concatMd, concatReadme, tsc)
