import AV from 'leancloud-storage'
import config from '../config'
import documents from './documents'

const GRAPHQL_URL = 'https://api.github.com/graphql'
const GITHUB_API = 'https://api.github.com/repos'

const { username, repository, token } = config
const blog = `${GITHUB_API}/${username}/${repository}`
const access_token = token.join('')
const open = `state=open&access_token=${access_token}`
const closed = `state=closed&access_token=${access_token}`
const isDev = /^(192\.168|localhost)/.test(window.location.host)

// 状态检测
const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) return response
  const error = new Error(response.statusText)
  error.response = response
  throw error
}

// 构建 GraphQL
const createCall = async document => {
  try {
    const payload = JSON.stringify({ query: document })
    const response = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
        Authorization: `token ${access_token}`
      },
      body: payload
    })
    checkStatus(response)
    const body = await response.json()
    return body.data
  } catch (err) {
    console.log(err)
  }
}
console.log(access_token);

// 获取文章数量
export const queryArchivesCount = () => createCall(documents.queryArchivesCount({ username, repository }))

// 获取灵感数量
export const queryInspirationCount = () =>
  createCall(documents.queryInspirationCount({ username, repository }))

// 按分类 & 标签筛选文章
export const queryFilterArchivesCount = ({ label, milestone }) =>
  createCall(documents.queryFilterArchivesCount({ username, repository, label, milestone }))

// 获取文章列表
export const queryPosts = async ({ page = 1, pageSize = 10, filter = '' }) => {
  try {
    const url = `${blog}/issues?${open}&page=${page}&per_page=${pageSize}${filter}`
    const response = await fetch(url)
    checkStatus(response)
    const data = await response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

// 获取单篇文章
export const queryPost = async number => {
  try {
    const url = `${blog}/issues/${number}?${open}`
    const response = await fetch(url)
    checkStatus(response)
    const data = await response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

// 获取分类
export const queryCategory = async () => {
  try {
    const url = `${blog}/milestones?access_token=${access_token}`
    const response = await fetch(url)
    checkStatus(response)
    const data = await response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

// 获取标签
export const queryTag = async () => {
  try {
    const url = `${blog}/labels?access_token=${access_token}&page=1&per_page=100`
    const response = await fetch(url)
    checkStatus(response)
    const data = await response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

// 获取灵感
export const queryInspiration = async ({ page = 1, pageSize = 10 }) => {
  try {
    const url = `${blog}/issues?${closed}&labels=inspiration&page=${page}&per_page=${pageSize}`
    const response = await fetch(url)
    checkStatus(response)
    const data = await response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

// 获取书单 & 友链 & 关于
export const queryPage = async type => {
  try {
    const upperType = type.replace(/^\S/, s => s.toUpperCase())
    const url = `${blog}/issues?${closed}&labels=${upperType}`
    const response = await fetch(url)
    checkStatus(response)
    const data = await response.json()
    return data[0]
  } catch (err) {
    console.log(err)
  }
}

// 文章热度
export const queryHot = async ids => {
  return new Promise(resolve => {
    if (isDev) return resolve([])
    const query = new AV.Query('Counter')
    query.containedIn('id', ids)
    query
      .find()
      .then(res => {
        const hot = {}
        res.forEach(o => (hot[o.attributes.id] = o.attributes.time))
        resolve(hot)
      })
      .catch(console.error)
  }).catch(console.error)
}

// 增加热度
export const increaseHot = post => {
  return new Promise(resolve => {
    if (isDev) return resolve(1)
    const query = new AV.Query('Counter')
    const Counter = AV.Object.extend('Counter')
    const { title, id } = post
    query.equalTo('id', id)
    query
      .find()
      .then(res => {
        if (res.length > 0) {
          // 已存在则返回热度
          const counter = res[0]
          counter
            .increment('time', 1)
            .save(null, { fetchWhenSave: true })
            .then(counter => {
              const time = counter.get('time')
              resolve(time)
            })
            .catch(console.error)
        } else {
          // 不存在则新建
          const newcounter = new Counter()
          newcounter.set('title', title)
          newcounter.set('id', id)
          newcounter.set('time', 1)
          newcounter.set('site', location.href)
          newcounter
            .save()
            .then(() => resolve(1))
            .catch(console.error)
        }
      })
      .catch(console.error)
  }).catch(console.error)
}

// 喜欢小站
export const likeSite = async type => {
  return new Promise(resolve => {
    if (isDev) return resolve(0)
    const query = new AV.Query('Counter')
    const Counter = AV.Object.extend('Counter')
    query.equalTo('title', 'site')
    query
      .first()
      .then(res => {
        if (res) {
          if (type === 'getTimes') {
            resolve(res.get('time'))
          } else {
            res
              .increment('time', 1)
              .save(null, { fetchWhenSave: true })
              .then(counter => resolve(counter.get('time')))
              .catch(console.error)
          }
        } else {
          // 不存在则新建
          const newcounter = new Counter()
          newcounter.set('title', 'site')
          newcounter.set('time', 1)
          newcounter.set('site', location.href)
          newcounter
            .save()
            .then(counter => resolve(counter.get('time')))
            .catch(console.error)
        }
      })
      .catch(console.error)
  }).catch(console.error)
}

// 访问来源
export const visitor = async referrer => {
  return new Promise(resolve => {
    if (isDev) return resolve()
    const query = new AV.Query('Visitor')
    const Visitor = AV.Object.extend('Visitor')
    query.equalTo('referrer', referrer)
    query
      .first()
      .then(res => {
        if (res) {
          res
            .increment('time', 1)
            .save(null, { fetchWhenSave: true })
            .then(() => resolve())
            .catch(console.error)
        } else {
          // 不存在则新建
          const newVisitor = new Visitor()
          newVisitor.set('referrer', referrer)
          newVisitor.set('time', 1)
          newVisitor
            .save()
            .then(() => resolve())
            .catch(console.error)
        }
      })
      .catch(console.error)
  }).catch(console.error)
}
