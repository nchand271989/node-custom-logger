// lib/logger.js
const { AsyncLocalStorage } = require("async_hooks");
const { randomUUID } = require("crypto");

const asyncLocalStorage = new AsyncLocalStorage();

function generateRequestId() {
  return randomUUID();
}

function runWithRequestId(fn) {
  const requestId = generateRequestId();
  asyncLocalStorage.run(new Map([["requestId", requestId]]), fn);
}

function getRequestId() {
  const store = asyncLocalStorage.getStore();
  return store ? store.get("requestId") : "N/A";
}

// Common log formatter
function formatLog(level, message) {
  const time = new Date().toISOString();
  const requestId = getRequestId();
  return `${time} - ${level} - [RequestId: ${requestId}] ${message}`;
}

function logInfo(message) {
  console.log(formatLog("INFO", message));
}

function logError(message) {
  console.error(formatLog("ERROR", message));
}

module.exports = {
  generateRequestId,
  runWithRequestId,
  getRequestId,
  logInfo,
  logError,
};
