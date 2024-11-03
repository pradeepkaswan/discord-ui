import { faker } from "@faker-js/faker";

export const data = [
  {
    id: 1,
    label: "Tailwind CSS",
    img: "/images/tailwind.png",
    categories: [
      {
        id: "1",
        label: "",
        channels: [
          {
            id: "1",
            label: "Browse Channels",
            icon: "Browse",
            createInvite: false,
          },
        ],
      },
      {
        id: "2",
        label: "",
        channels: [
          {
            id: "2",
            label: "welcome",
            description:
              "Introduction to the Tailwind CSS framework and community.",
            icon: "Book",
            createInvite: true,
            messages: getMessages(),
          },
          {
            id: "3",
            label: "announcements",
            icon: "Speakerphone",
            createInvite: true,
            messages: getMessages(),
          },
        ],
      },
      {
        id: "3",
        label: "Tailwind CSS",
        channels: [
          {
            id: "4",
            label: "help",
            icon: "Chat",
            createInvite: true,
          },
          {
            id: "5",
            label: "archived-help",
            description:
              "Help with Tailwind CSS and build process integration.",
            createInvite: true,
            messages: getMessages(),
          },
          {
            id: "6",
            label: "general",
            description:
              "General discussion of Tailwind CSS (please move off-topic discussion in the off-topic channels).",
            unread: true,
            createInvite: true,
            messages: getMessages(),
          },
          {
            id: "7",
            label: "plugins",
            description: "Tailwind CSS plugins.",
            unread: true,
            createInvite: true,
            messages: getMessages(),
          },
          {
            id: "8",
            label: "internals",
            description: "Development of the Tailwind CSS framework itself.",
            createInvite: true,
            messages: getMessages(),
          },
        ],
      },
      {
        id: "4",
        label: "Tailwind Labs",
        channels: [
          {
            id: "9",
            label: "tailwind-ui",
            createInvite: true,
          },
          {
            id: "10",
            label: "headless-ui",
            unread: true,
            createInvite: true,
          },
          {
            id: "11",
            label: "refactoring-ui",
            createInvite: true,
          },
          {
            id: "12",
            label: "heroicons",
            createInvite: true,
          },
        ],
      },
      {
        id: "5",
        label: "Off Topic",
        channels: [
          {
            id: "13",
            label: "design",
            createInvite: true,
          },
          {
            id: "14",
            label: "development",
            createInvite: true,
          },
          {
            id: "15",
            label: "random",
            createInvite: true,
          },
        ],
      },
      {
        id: "6",
        label: "Community",
        channels: [
          {
            id: "16",
            label: "showcase",
            createInvite: true,
          },
          {
            id: "17",
            label: "jobs-hiring",
            icon: "Chat",
            createInvite: true,
          },
          {
            id: "18",
            label: "jobs-for-hire",
            icon: "Chat",
            createInvite: true,
          },
          {
            id: "19",
            label: "bots",
            createInvite: true,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: "Next.js",
    img: "/images/next.webp",
    categories: [
      {
        id: "1",
        label: "Next.js",
        channels: [
          {
            id: "1",
            label: "Channels & Roles",
            icon: "Browse",
            createInvite: false,
          },
        ],
      },
    ],
  },
];

function getMessages() {
  return Array.from({ length: faker.number.int({ min: 7, max: 25 }) }, () => {
    const user = faker.internet.username();
    const avatarUrl = faker.image.avatar();

    return Array.from({ length: faker.number.int({ min: 1, max: 4 }) }, () => ({
      id: faker.string.uuid(),
      user,
      avatarUrl,
      date: faker.date.past().toLocaleDateString("en-US"),
      text: faker.lorem.paragraphs({ min: 1, max: 3 }, "\n"),
    }));
  }).flat();
}
