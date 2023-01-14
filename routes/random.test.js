const host = "http://localhost:3000/random";

test("[01] get a random value using /random", async () => {
  const res = await fetch(host, { method: "POST" });
  const { value, count, precision } = await res.json();
  expect(res.status).toBe(200);
  expect(Array.isArray(value)).toBe(true);
  expect(value.length).toBe(1);
  expect(value[0]).toBeLessThan(1);
  expect(value[0]).toBeGreaterThanOrEqual(0);
  expect(count).toBe(1);
  expect(precision).toBe(3);
  expect(`${value[0]}`.length).toBeLessThanOrEqual(5);
});

test("[02] get 5 random value using /random", async () => {
  const data = {
    count: 5,
  };
  const res = await fetch(host, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(data),
  });
  const { value, count, precision } = await res.json();
  expect(res.status).toBe(200);
  expect(Array.isArray(value)).toBe(true);
  expect(value.length).toBe(5);
  expect(value[0]).toBeLessThan(1);
  expect(value[0]).toBeGreaterThanOrEqual(0);
  expect(count).toBe(5);
  expect(precision).toBe(3);
  expect(`${value[0]}`.length).toBeLessThanOrEqual(5);
});

test("[03] get 5 random value with 5 precision using /random", async () => {
  const data = {
    count: 5,
    precision: 5,
  };
  const res = await fetch(host, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(data),
  });
  const { value, count, precision } = await res.json();
  expect(res.status).toBe(200);
  expect(Array.isArray(value)).toBe(true);
  expect(value.length).toBe(5);
  expect(value[0]).toBeLessThan(1);
  expect(value[0]).toBeGreaterThanOrEqual(0);
  expect(count).toBe(5);
  expect(precision).toBe(5);
  expect(`${value[0]}`.length).toBeLessThanOrEqual(7);
});
