export class CreatePostPayload {
    postName: string;
    subredditName?: string;
    url?: string;
    description: string;
    username: string;
    file?: File;
}