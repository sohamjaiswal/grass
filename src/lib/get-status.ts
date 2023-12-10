import type { UserStatus } from "./types/GuildedMe"

export const getStatus: (label: string, imageURL: string) => UserStatus = (label: string, imageURL: string) => {
    const template = {
      content: {
        document: {
          data: {},
          nodes: [
            {
              data: {},
              nodes: [
                {
                  leaves: [
                    {
                      marks: [],
                      object: "leaf",
                      text: label
                    }
                  ],
                  object: "text"
                },
                {
                  object: "block",
                  type: "image",
                  data: {
                    name: "art.img",
                    fileSizeBytes: 1000,
                    src: imageURL
                  },
                  nodes: [
                    {
                      object: "text",
                      leaves: [
                        {
                          object: "leaf",
                          text: "",
                          marks: []
                        }
                      ]
                    }
                  ]
                }
              ],
              object: "block",
              type: "paragraph"
            }
          ],
          object: "document"
        },
        object: "value"
      },
        customReactionId: 1260313,
        expireInMs: 0
      }
      return template
}