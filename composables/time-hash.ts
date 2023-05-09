export function hashByTime(gapSec=1) {
    return Math.floor(Date.now() / (gapSec * 1000) ).toString()
}
  