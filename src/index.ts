const defaultUseUpgradeWebpackPluginOptions: IUseUpgradeWebpackPluginOptions = {
  skipMetaName: 'useUpgradeSkip',
  defaultSkip: false,
}

const emptyOptions: Partial<IUseUpgradeWebpackPluginOptions> = {}

const manualSkipParam = 'no-upgrade'
const manualEnableParam = 'use-upgrade'

export interface IUseUpgradeWebpackPluginOptions {
  skipMetaName?: string
  defaultSkip?: boolean
}

export default class UseUpgradeWebpackPlugin {
  options: IUseUpgradeWebpackPluginOptions = emptyOptions

  constructor(options?: IUseUpgradeWebpackPluginOptions) {
    this.options = { ...defaultUseUpgradeWebpackPluginOptions, ...options }
  }

  apply(compiler: any) {
    const { options } = this
    if (options.skipMetaName === null) {
      return
    }

    const argvs = process.argv
    const includeSkipParam = argvs.includes('--' + manualSkipParam)
    const includeEnableParam = argvs.includes('--' + manualEnableParam)

    if (options.defaultSkip && !includeEnableParam) {
      return
    } else if (includeSkipParam) {
      return
    }

    compiler.hooks.emit.tap('UseUpgradeWebpackPlugin', (compilation: any) => {
      const html = compilation.assets['index.html']
      const updatedHtml = html
        .source()
        .replace(/<head>/, `<head><meta name="${this.options.skipMetaName}">`)
      compilation.assets['index.html'] = {
        source: () => updatedHtml,
        size: () => updatedHtml.length,
      }
    })
  }
}
