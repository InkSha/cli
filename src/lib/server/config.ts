export type Router = {
  url: string
  methods: 'post' | 'put' | 'get' | 'delete'
  params?: Record<string, 'number' | 'string' | 'boolean' | 'object' | 'array' | ((params: any) => boolean)>
  response?: string | number | boolean | Array<any> | object | ((params: Record<string, any>) => any)
  upload?: string[]
  download?: string[]
  timeout?: number
  needToken: boolean
  token: string
  childRouter?: Router[]
}

export type ServerConfig = {
  port?: number
  router: Router[]
}
