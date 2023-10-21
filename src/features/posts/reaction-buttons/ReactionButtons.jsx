import {useDispatch} from "react-redux";
import {updateReaction} from "../postsSlice";
import styles from './ReactionButtons.module.css';

const reactionEmoji = {
    thumbsUp: '👍',
    wow: '😮',
    heart: '❤️',
    rocket: '🚀',
    starStruck: '🤩'
}

const ReactionButtons = ({post}) => {
    const dispatch = useDispatch();

    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
        return (
            <button
                key={name}
                type="button"
                className={styles['reaction-btn']}
                onClick={() => dispatch(updateReaction({postId: post.id, reaction: name}))}
            >
                {emoji} {post.reactions[name]}
            </button>
        )
    })

    return (
        <div className={styles['reaction-btns']}>
            {reactionButtons}
        </div>
    );
};

export default ReactionButtons;