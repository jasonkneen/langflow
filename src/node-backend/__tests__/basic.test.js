const { describe, test, expect } = require('@jest/globals');

const request = require('supertest');
const express = require('express');
const app = require('../index.js');

describe('API Endpoints', () => {
  test('GET /health_check returns OK status', async () => {
    const response = await request(app).get('/health_check');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'OK' });
  });

  test('POST /api/v1/auto_login returns auth token', async () => {
    const response = await request(app).post('/api/v1/auto_login');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('access_token');
    expect(response.body).toHaveProperty('expires_in');
    expect(response.body).toHaveProperty('refresh_token');
  });

  test('GET /api/v1/all_types returns component types', async () => {
    const response = await request(app).get('/api/v1/all_types');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('agents');
    expect(response.body).toHaveProperty('chains');
    expect(response.body).toHaveProperty('memories');
  });

  test('GET /api/v1/components returns component list', async () => {
    const response = await request(app).get('/api/v1/components');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('components');
    expect(response.body.components).toHaveProperty('agents');
  });
});
