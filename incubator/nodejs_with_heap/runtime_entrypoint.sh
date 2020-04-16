#! /bin/sh
node --heap-prof --cpu-prof kubeless.js &&
node servelogs.js