// test/logger.test.js
const assert = require("assert");
const logger = require("../lib/logger");

// Test generateRequestId format
const id1 = logger.generateRequestId();
const id2 = logger.generateRequestId();
assert.strictEqual(typeof id1, "string", "RequestId must be string");
assert.notStrictEqual(id1, id2, "RequestIds should be unique");

// Test runWithRequestId & getRequestId isolation
logger.runWithRequestId(() => {
  const reqId = logger.getRequestId();
  assert.strictEqual(
    typeof reqId,
    "string",
    "RequestId should be set in context"
  );

  // Test logging outputs
  logger.logInfo("Test Info Log");
  logger.logError("Test Error Log");

  // Nested context isolation test
  logger.runWithRequestId(() => {
    const nestedId = logger.getRequestId();
    assert.notStrictEqual(reqId, nestedId, "Nested RequestId must differ");
  });
});

// Test fallback when no context
assert.strictEqual(
  logger.getRequestId(),
  "N/A",
  "Should return N/A when no context"
);

console.log("All tests passed!");
