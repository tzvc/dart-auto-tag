import * as core from '@actions/core';
import { context, GitHub } from '@actions/github';
import createCommitTag from './createCommitTag';
import getPubspecVersion from './getPubspecVersion';
import checkTagExists from './checkTagExists';

async function run(): Promise<void> {
  try {
    const authToken = core.getInput('token');
    const client = new GitHub(authToken);

    const pubspecPath = core.getInput('pubspec-path');

    const version = await getPubspecVersion(client, pubspecPath);
    if (!version) {
      core.info(`${pubspecPath} is invalid or does not exist`);
      return;
    }

    const tag = `v${version}`;

    const tagExists = await checkTagExists(client, tag);
    if (!tagExists) {
      core.info(`creating tag ${tag}...`);
      await createCommitTag(client, tag, context.sha);
    } else {
      core.info(`${tag} already exists, ignoring...`);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
