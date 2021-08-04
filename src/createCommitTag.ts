import { context, GitHub } from '@actions/github';

export default async function createCommitTag(
  client: GitHub,
  tag: string,
  commitSha: string,
): Promise<void> {
  const tagRes = await client.git.createTag({
    tag,
    message: '',
    object: commitSha,
    type: 'commit',
    ...context.repo,
  });

  await client.git.createRef({
    ref: `refs/tags/${tag}`,
    sha: tagRes.data.sha,
    ...context.repo,
  });
}
