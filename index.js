import hapi from '@hapi/hapi'
import joi from 'joi'

const init = async () => {
  const server = hapi.server({
    port: 3000,
    host: 'localhost'
  })

  server.route({
    method: 'GET',
    path: '/apps',
    handler: (request, h) => {
      return { apps: [1, 2, 3, 4] }
    }
  })
  server.route({
    method: 'POST',
    path: '/apps',
    handler: (request, h) => {
      const numberOfProperties = request.payload.apps.length
      return h.response(numberOfProperties).code(200);
    },
    options:{
      validate:{
        payload:joi.object({
          apps: joi.array().items(joi.number())
        })
      }
    }
  });

  await server.start()
  console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()
