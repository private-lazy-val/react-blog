import {useEffect} from "react";
import {useParams, Link, useNavigate} from "react-router-dom";
import {format} from "date-fns";
import {IoMdClose} from "react-icons/io";
import {useStoreState, useStoreActions} from "easy-peasy";

const EditPost = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const editTitle = useStoreState((state) => state.editTitle);
    const editBody = useStoreState((state) => state.editBody);
    const postImage = useStoreState((state) => state.postImage);
    const fileName = useStoreState((state) => state.fileName);
    const getPostById = useStoreState((state) => state.getPostById);

    const editPost = useStoreActions((actions) => actions.editPost);
    const uploadFile = useStoreActions((actions) => actions.uploadFile);

    const setEditTitle = useStoreActions((actions) => actions.setEditTitle);
    const setEditBody = useStoreActions((actions) => actions.setEditBody);
    const setFileName = useStoreActions((actions) => actions.setFileName);
    const setPostImage = useStoreActions((actions) => actions.setPostImage);

    const post = getPostById(id);

    useEffect(() => {
        if (post) {
            setEditTitle(post.title);
            setEditBody(post.body);
            setPostImage(post.image);
            setFileName(post.file_name);
        }
    }, [post])

    const handleEdit = (id) => {
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const updatedPost = {id, title: editTitle, datetime, body: editBody, image: postImage, file_name: fileName};
        editPost(updatedPost);
        navigate(`/post/${id}`);
    }

    return (
        <main className='new-post'>
            {editTitle &&
                <>
                    <h2>Edit Post</h2>
                    <form className='new-post-form' onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor='post-title'>Title:</label>
                        <input
                            id='post-title'
                            type='text'
                            required
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <label htmlFor='post-body'>Post:</label>
                        <textarea
                            id='post-body'
                            required
                            value={editBody}
                            onChange={(e) => setEditBody(e.target.value)}
                        />
                        <label htmlFor='post-image'>Upload an image:</label>
                        <div>
                            <input
                                className="default-file-input"
                                id='post-image'
                                type='file'
                                onChange={(e) => uploadFile(e)}
                            />
                            <button className="custom-file-input" type="button"
                                    onClick={() => document.getElementById('post-image').click()}>
                                Choose File
                            </button>
                            <span>{fileName || 'No file chosen'}</span> {/* Displaying the name of the file */}
                            {fileName && <button className="remove-file-btn" type="button" onClick={() => {
                                setPostImage(null);
                                setFileName('');
                            }}><IoMdClose/></button>}
                        </div>
                        <button className="submit-btn" type='button' onClick={() => handleEdit(post.id)}>Submit</button>
                    </form>
                </>
            }
            {!editTitle &&
                <>
                    <h2>Post Not Found</h2>
                    <p>Well, that's disappointing</p>
                    <p>
                        <Link to='/'>Visit Out Homepage</Link>
                    </p>
                </>
            }
        </main>
    );
};

export default EditPost;