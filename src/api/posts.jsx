import axios from "axios";

export default axios.create({
    baseURL: 'https://pekingese-blog.vercel.app/api/posts'
});