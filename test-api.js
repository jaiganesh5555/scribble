// Test script for backend API
const fetch = require('node-fetch');

const BACKEND_URL = 'https://backend.gjai8587.workers.dev';

// Test signup endpoint
async function testSignup() {
    console.log('Testing signup endpoint...');

    try {
        const response = await fetch(`${BACKEND_URL}/api/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: 'test@example.com',
                password: 'test123',
                name: 'Test User'
            })
        });

        const data = await response.json();
        console.log('Signup Response:', response.status, data);

        return data;
    } catch (error) {
        console.error('Signup Error:', error);
    }
}

// Test signin endpoint
async function testSignin() {
    console.log('Testing signin endpoint...');

    try {
        const response = await fetch(`${BACKEND_URL}/api/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: 'test@example.com',
                password: 'test123'
            })
        });

        const data = await response.json();
        console.log('Signin Response:', response.status, data);
    } catch (error) {
        console.error('Signin Error:', error);
    }
}

// Run tests
async function runTests() {
    await testSignup();
    await testSignin();
}

runTests();