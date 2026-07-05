import assert from "node:assert/strict";
import { createJiti } from "jiti";

const jiti = createJiti(import.meta.url);
const { shouldShowVibeCodingStaleNotice } = await jiti.import("./staleNotice.ts");
const now = new Date("2026-07-05T00:00:00.000Z");
const post = (date, tags = ["vibecoding"]) => ({ data: { date: new Date(date), tags } });

assert.equal(shouldShowVibeCodingStaleNotice(post("2026-06-04T23:59:59.999Z"), now), true);
assert.equal(shouldShowVibeCodingStaleNotice(post("2026-06-05T00:00:00.000Z"), now), false);
assert.equal(shouldShowVibeCodingStaleNotice(post("2026-05-01T00:00:00.000Z", ["赛博空间"]), now), false);
