import axios from "axios";

export default axios.create({
    baseURL: 'ttps://pekingese-blog.vercel.app/api/posts'
});