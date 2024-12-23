const fp = require("fastify-plugin")
const fs = require("node:fs")

const plugin = (instance, opts, done) => {
  const getFormattedRoutes = () => {
    return [...instance.routes.values()].flat(1).map(r => {
      return {
        name: r?.config?.name || "unspecified",
        url: r.url,
        method:
          typeof r.method === "string"
            ? r.method.toLowerCase()
            : r.method.map(m => m.toLowerCase())
      }
    })
  }

  const createRoutesString = r => {
    if (r.name === "unspecified") {
      instance.log.warn(`route with a path of ${r.url} does not have a name`)
    }

    // * route contains path params
    const pathSegments = r.url.split("/").filter(segment => segment !== "")
    const functionName =
      r.name.charAt(0).toLowerCase() + r.name.slice(1) + "Endpoint"
    const argsArray = pathSegments.filter(p => p.includes(":"))
    const functionGenerics = argsArray
      .map(p => `${p.replace(":", "")}: string`)
      .join(", ")
    const functionArgs = argsArray.map(p => p.replace(":", "")).join(", ")
    const urlPaths = pathSegments
      .map(p => {
        return p.includes(":") ? `\${${p.replace(":", "")}}` : p
      })
      .join("/")

    if (pathSegments.some(p => p.includes(":"))) {
      return [
        `export const ${functionName}: EndpointFunc<{ ${functionGenerics} }> = ({ ${functionArgs} }): Endpoint => {`,
        "  return {",
        `    url: \`\${url}/${urlPaths}\`,`,
        `    method: '${r.method}'`,
        "  }",
        "}",
        "\n"
      ].join("\n")
    }

    return [
      `export const ${functionName}: Endpoint = {`,
      `  url: \`\${url}/${pathSegments.join("/")}\`,`,
      `  method: '${r.method}'`,
      "}",
      "\n"
    ].join("\n")
  }

  const writeRoutesToFile = blacklistRoutes => {
    const stream = fs.createWriteStream(path)

    const routes = getFormattedRoutes().flatMap(r =>
      blacklistRoutes.includes(r.name) ? [] : createRoutesString(r)
    )

    stream.write(
      [
        "export const url = import.meta.env.VITE_API_URL",
        "",
        "interface Endpoint {",
        "  url: string",
        "  method: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'head' | 'options'",
        "}",
        "",
        "export type EndpointFunc<T extends object> = (args: T) => Endpoint",
        "\n"
      ].join("\n")
    )

    routes.slice(0, -1).forEach(r => {
      stream.write(r)
    })

    stream.write(routes[routes.length - 1].replace(/[\n\r]$/, ""))
    stream.end()
  }

  // * plugin code starts here
  const { path } = opts
  const blacklist =
    opts.blacklist == null || opts.blacklist.length === 0 ? [] : opts.blacklist

  if (path == null || path === "") {
    throw new Error("`path` cannot be empty.")
  }

  fs.access(path, fs.constants.F_OK, e => {
    if (e == null) {
      instance.log.info(`${path} exists, removing the old file.`)
      fs.unlinkSync(path)
      writeRoutesToFile(blacklist)
      return
    }

    instance.log.info(`${path} does not exist.`)
    writeRoutesToFile(blacklist)
  })

  instance.addHook("onRoute", () => {
    writeRoutesToFile(blacklist)
  })

  done()
}

module.exports = fp(plugin, {
  name: "fastify-frontend-endpoints-generator",
  fastify: "4.x"
})
