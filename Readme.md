# node-custom-logger

A lightweight Node.js logger that auto-generates and persists unique request IDs, logging timestamp, log level, and request ID in every log message. No third-party dependencies.

---

## ✨ Features

- Generates a unique `requestId` per request using UUID.
- Uses Node.js built-in `AsyncLocalStorage` to persist `requestId` across async calls.
- Automatically logs:
  - Timestamp (ISO format)
  - Log level (INFO / ERROR)
  - Request ID
- Zero external dependencies.
- Simple API.

---

## 📦 Installation

1. Clone the repo:

```bash
git clone https://github.com/nchand271989/node-custom-logger.git
cd node-custom-logger
```

2. Install via .tgz package (Preferred for Docker & local usage)

Inside your custom-request-logger folder, run:

```bash
npm pack
```

This generates a .tgz file, e.g.:

```
node-custom-logger-1.0.0.tgz
```

In your target project:

```bash
npm install /absolute/path/to/node-custom-logger-1.0.0.tgz
```

## 🚀 Usage

```javascript
const {
  runWithRequestId,
  logInfo,
  logError,
} = require("custom-request-logger");

function doSomething() {
  logInfo("Processing started");
  // Simulate async operation
  setTimeout(() => {
    logInfo("Processing finished");
  }, 1000);
}

runWithRequestId(() => {
  doSomething();
  logError("An error occurred");
});
```

### ✅ Output:

```
2025-03-20T12:34:56.789Z - INFO - [RequestId: 123e4567-e89b-12d3-a456-426614174000] Starting request
2025-03-20T12:34:56.890Z - INFO - [RequestId: 123e4567-e89b-12d3-a456-426614174000] Processing request...
2025-03-20T12:34:57.890Z - INFO - [RequestId: 123e4567-e89b-12d3-a456-426614174000] Still processing...
2025-03-20T12:34:58.890Z - ERROR - [RequestId: 123e4567-e89b-12d3-a456-426614174000] Something went wrong!
```

---

## 📚 API Reference

| Function               | Description                                               |
| ---------------------- | --------------------------------------------------------- |
| `runWithRequestId(fn)` | Initializes request ID context & runs the async function. |
| `logInfo(message)`     | Logs INFO message with timestamp & request ID.            |
| `logError(message)`    | Logs ERROR message with timestamp & request ID.           |
| `getRequestId()`       | Returns current request ID or `"N/A"` if not set.         |

---

## 🗂️ Folder Structure

```
/lib
 └── logger.js        # Core logger
README.md
package.json
```

---

## 🧪 Testing

Run unit tests:

```bash
npm test
```

Tests cover:

- Unique request ID generation.
- Async context persistence.
- Log message formatting.

---

## 📄 License

**This project is licensed under the MIT License.**

- ✅ Free to use in personal/commercial projects.
- ✅ Modifications, redistribution, sublicensing allowed.

---

## 👤 Author

**Naveen Chand (AKA New Moon)**

---

## 🔮 Roadmap

1. Add more log levels (DEBUG, WARN).
2. Optionally support file logging.
3. Colorized console output for dev environments.
