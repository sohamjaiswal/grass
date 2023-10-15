import type { UserStatus } from "./types/GuildedMe"

export const getStatus: (link: string, label: string, imageURL: string) => UserStatus = (link: string, label: string, imageURL: string) => {
    const template = {
        content: {
          document: {
            data: {},
            nodes: [
              {
                data: {},
                nodes: [
                  {
                    object: "inline",
                    type: "link",
                    data: {
                      href: link
                    },
                    nodes: [
                      {
                        object: "text",
                        leaves: [
                          {
                            object: "leaf",
                            text: label,
                            marks: []
                          }
                        ]
                      },
                      {
                        object: "block",
                        type: "image",
                        data: {
                          name: "ganyu.gif",
                          fileSizeBytes: 3222143,
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
                    ]
                  },
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
                ],
                object: "block",
                type: "paragraph"
              }
            ]
          }
        },
        customReactionId: 1260313,
        expireInMs: 0
      }
      return template
}