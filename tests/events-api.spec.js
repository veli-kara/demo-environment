// @ts-check
import { test, expect } from '@playwright/test';

test('Event erstellen', async ({ request }) => {
  const testTitle = 'Test event';
  const response = await request.post('http://127.0.0.1:3000/', {
    data: {
      title: testTitle,
      timestamp: Date.now()
    },
  });
  expect(response.ok()).toBeTruthy();
  const resDataRaw = await response.body();
  const resData = JSON.parse(resDataRaw.toString());
  expect(resData).toHaveProperty('event.id');
  expect(resData.event.title).toBe(testTitle);
});

test('Abfrage von Events', async ({ request }) => {
  const response = await request.get('http://127.0.0.1:3000/');
  expect(response.ok()).toBeTruthy();
  const resDataRaw = await response.body();
  const resData = JSON.parse(resDataRaw.toString());
  expect(resData).toHaveProperty('events');
  expect(resData.events.length).toBeGreaterThan(0);
});
