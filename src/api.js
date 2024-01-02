import { outputs } from './bki-data.js'
import { mockResponse } from './api-mock.js'

const baseUrl = 'https://modelserver.cut.hcu-hamburg.de/processes/citizen-ai'
const execUrl = baseUrl + '/execution'

const proxy = process.env.API_PROXY
const doMock = Boolean(process.env.API_MOCK)

console.info('API', { doMock, proxy, baseUrl, execUrl })

const delay = t => {
  return new Promise((resolve) => {
    window.setTimeout(() => { resolve() }, t)
  })
}

const prepUrl = url => {
  if (proxy) {
    return url
      // replace first non-scheme slash with port
      .replace(/(\w)\//, (all, first) => first + ':443/')
      .replace(/^https?:\/\//, proxy + '/')
  } else {
    // normalize to https
    return url.replace(/^https?:\/\//, 'https://')
  }
}

/*
const user = 'user'
const pass = 'pass'

const btoaUtf = str => btoa(unescape(encodeURIComponent(str)))
const authHeaders = { Authorization: 'Basic ' + btoaUtf(user + ':' + pass) }
*/

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  // ...authHeaders
}

export const apiGet = async (params, progressCb, finishCb, errorCb) => {
  if (doMock) {
    console.warn('API: mock response!')
    await delay(1500)
    finishCb('successful', mockResponse())
    return
  }
  const monitorUrl = await requestExec({ inputs: params })
  if (!monitorUrl) throw new Error('API response location bad ' + monitorUrl)
  poll(monitorUrl, progressCb, finishCb, errorCb)
}

const requestExec = params => {
  return fetch(prepUrl(execUrl), {
    method: 'post',
    headers,
    body: JSON.stringify(params)
  })
    .then(resp => {
      console.log('resp', resp)
      if (!resp.ok) throw new Error('API response not OK, ' + resp.status + ' ' + resp.statusText + ' ' + resp.body)
      if (resp.status !== 201) throw new Error('API response not Created, ' + resp.status + ' ' + resp.statusText)
      if (!resp.headers?.has?.('location')) throw new Error('API response has no Location header')
      return resp.headers.get('location')
    })
}

const getResults = (finishCb, resultsUrl, errorCb) => {
  return fetch(prepUrl(resultsUrl), { headers })
    .then(resp => {
      if (!resp.ok) throw new Error('API result error')
      return resp.json()
    })
    .then(json => finishCb('successful', repluck(json.results)))
    .catch(e => {
      errorCb(e)
    })
}

const poll = async (monitorUrl, progressCb, finishCb, errorCb) => {
  let doRecurse = false
  await fetch(prepUrl(monitorUrl), { headers })
    .then(resp => {
      if (!resp.ok) throw new Error('API status poll error')
      return resp.json()
      console.log('### poll resp', resp)
    })
    .then(json => {
      switch (json.status) {
      case 'successful':
        getResults(finishCb, json.links.find(link => link.type === 'application/json')?.href, errorCb)
        return
      case 'running':
      case 'accepted':
        progressCb(json.status, json.progress)
        doRecurse = true
        return
      case 'failed':
      case 'dismissed':
        console.error('API job error, status', json)
        finishCb(json.status)
        throw new Error('API job error, status ', json.status)
      default:
        console.error('API job error', json)
        finishCb(json.status)
        throw new Error('API job error, ', json.status)
      }
    })
    .catch(e => {
      errorCb(e)
    })
  if (doRecurse) {
    setTimeout(
      () => poll(monitorUrl, progressCb, finishCb, errorCb),
      3000
    )
  }
}
