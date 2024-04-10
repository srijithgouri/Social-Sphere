export class PostModel {
    postId: number;
    postName: string;
    url: string;
    description: string;
    voteCount: number;
    user: {
        username: string,
        userId: number
    };
    subreddit:{
        id: number;
        name: string};
    commentCount: number;
    duration: string;
    upVote: boolean;
    downVote: boolean;
    photo: string;
}