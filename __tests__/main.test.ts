import { GitHub } from '@actions/github';
import getPubspecVersion from '../src/getPubspecVersion';
import checkTagExists from '../src/checkTagExists';
import * as fs from 'fs';

let client: GitHub;

beforeAll(() => {
  let authToken = process.env.GITHUB_TOKEN;

  if (!authToken) {
    const secrets = JSON.parse(fs.readFileSync('secrets.json', 'utf8'));
    authToken = secrets.GITHUB_TOKEN;
  }

  if (!authToken) throw Error('GITHUB_TOKEN is undefined');

  client = new GitHub(authToken);

  process.env.GITHUB_REPOSITORY = 'CDDelta/dart-version-auto-tag';
});

test('read pubspec.yaml version', async () => {
  const version = await getPubspecVersion(client, 'pubspec.yaml');
  expect(version).not.toBeFalsy();

  const versionFake = await getPubspecVersion(client, 'pubspec-fake.yaml');
  expect(versionFake).toBeFalsy();
});

test('check tag exists', async () => {
  const realTagExists = await checkTagExists(client, 'v0.9.0');
  expect(realTagExists).toBe(true);

  const fakeTagExists = await checkTagExists(client, '12345');
  expect(fakeTagExists).toBe(false);
});
