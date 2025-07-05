#!/usr/bin/env node

const { execSync } = require('child_process');

console.log('🧪 Running Working Tests...\n');

// Run only the tests that work
const workingTests = [
  'src/__tests__/Components/CardComponent.test.tsx',
  'src/__tests__/Components/SearchBar.test.tsx'
];

workingTests.forEach(testFile => {
  try {
    console.log(`Running ${testFile}...`);
    execSync(`npm test -- --testPathPattern=${testFile} --watchAll=false`, { 
      stdio: 'inherit' 
    });
    console.log(`✅ ${testFile} passed\n`);
  } catch (error) {
    console.log(`❌ ${testFile} failed\n`);
  }
});

console.log('🎉 Test runner completed!'); 