import { Id } from "../../convex/_generated/dataModel";

interface Member {
    _creationTime: number;
    _id: string;
    role: string;
    userId: string;
    workspaceId: string;
}

interface User {
    _creationTime: number;
    _id: Id<"users">;
    email: string;
    firstName: string;
    image: string;
    lastName: string;
    userId: string;
}

interface Page {
    _creationTime: number;
    _id: Id<"messages">;
    channelId: string;
    content: string;
    member: Member;
    memberId: Id<"members">;
    reactions: any[];
    threadCount: number;
    threadTimestamp: number;
    user: User;
    workspaceId: string;
    updatedAt?: number;
}

export interface Data {
    page: Page[];
}

// const data: Data = {
//     page: [
//         {
//             _creationTime: 1733788457754.2156,
//             _id: "kd70168sh4aphpmmpwhdzt49wx765ky9",
//             channelId: "jd7fwk852ceg799ctk1edrkmt97652cz",
//             content: "<p>again</p>",
//             member: {
//                 _creationTime: 1733731987124.8984,
//                 _id: "j9774ttz00z05jbjbazgcnj11s7642za",
//                 role: "member",
//                 userId: "user_2pqJhPQlX3fdgU43MsHe9HfWItf",
//                 workspaceId: "j57ft1248mhwjd17keqjqfbnzd7640ka"
//             },
//             memberId: "j9774ttz00z05jbjbazgcnj11s7642za",
//             reactions: [],
//             threadCount: 0,
//             threadTimestamp: 0,
//             user: {
//                 _creationTime: 1733487793071.051,
//                 _id: "jh7cvs5pbaqchtjxq21jmrbhzs75ygk0",
//                 email: "developedbyrobbie@gmail.com",
//                 firstName: "Robert",
//                 image: "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ2l0aHViL2ltZ18ycHFKaFBWTzQzcjBKMHl4YUx6cm11RlhacDgifQ",
//                 lastName: "Muchiri",
//                 userId: "user_2pqJhPQlX3fdgU43MsHe9HfWItf"
//             },
//             workspaceId: "j57ft1248mhwjd17keqjqfbnzd7640ka"
//         }
//     ]
// };