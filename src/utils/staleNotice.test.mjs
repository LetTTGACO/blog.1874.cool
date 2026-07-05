import assert from "node:assert/strict";
import { createJiti } from "jiti";

const jiti = createJiti(import.meta.url);
const { getStaleNoticeType } = await jiti.import("./staleNotice.ts");
const now = new Date("2026-07-05T00:00:00.000Z");
const post = (date, tags = ["vibecoding"]) => ({ data: { date: new Date(date), tags } });

assert.equal(getStaleNoticeType(post("2026-06-04T23:59:59.999Z"), now), "vibecoding");
assert.equal(getStaleNoticeType(post("2026-06-05T00:00:00.000Z"), now), undefined);
assert.equal(getStaleNoticeType(post("2025-07-04T23:59:59.999Z", ["赛博空间"]), now), "default");
assert.equal(getStaleNoticeType(post("2025-07-05T00:00:00.000Z", ["赛博空间"]), now), undefined);
assert.equal(getStaleNoticeType(post("2024-01-01T00:00:00.000Z", ["月刊"]), now), undefined);
