import { GitHub, context } from '@actions/github';

export default async function checkTagExists(
  client: GitHub,
  tag: string,
): Promise<boolean> {
  try {
    await client.git.getRef({
      ref: `tags/${tag}`,
      ...context.repo,
    });

    return true;
  } catch (err) {
    if (err.status === 404) return false;
    throw err;
  }
}
