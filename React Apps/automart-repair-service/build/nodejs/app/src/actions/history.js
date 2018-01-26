export function testSet () {
  return {
    type: 'TESTST',
    payload: 'TESTT',
    payload2: 'STATE SETTED'
  }
}

export function setHistories (histories) {
  return {
    type: 'SETHISTORY',
    payload: 'SET HISTORY',
    payload2: histories
  }
}
