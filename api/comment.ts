import { IncomingMessage, ServerResponse } from "http";
import dayjs from "dayjs";
import { graphql } from "@octokit/graphql";
import { Issue } from "./_lib/types";

const client = graphql.defaults({
  headers: {
    authorization: `token ${process.env.GITHUB_API_TOKEN}`,
  },
});

const handler = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const result: any = await client(
      `
            query { 
                repository(name: "meehawk", owner: "meehawk") {
                    issue(number: 3) {
                        comments(last: 4) {
                            edges {
                                node {
                                    bodyText,
                                    publishedAt,
                                    author {
                                        login
                                    }
                                }
                            }
                        }
                    }
                }
            }
        `
    );

    const messages = result.repository.issue.comments.edges.map((edge: { node: Issue }) => {
      const { node } = edge;
      return {
        id: node.id,
        content: node.bodyText,
        author: node.author.login,
        dateTime: dayjs(node.publishedAt).format("HH:mm"),
      };
    });

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(messages, null, 2));
  } catch (e) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>Internal Error</h1><p>Sorry, there was a problem</p>");
    console.error(e);
  }
};

export default handler;
