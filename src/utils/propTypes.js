import PropTypes from "prop-types";

const PostPropType =
    PropTypes.exact({
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        user_name: PropTypes.string.isRequired,
        image: PropTypes.string,
        file_name: PropTypes.string,
        date: PropTypes.string.isRequired,
        user_id: PropTypes.string.isRequired,
        reactions: PropTypes.exact({
            thumbsUp: PropTypes.number.isRequired,
            wow: PropTypes.number.isRequired,
            heart: PropTypes.number.isRequired,
            rocket: PropTypes.number.isRequired,
            starStruck: PropTypes.number.isRequired
        }).isRequired,
        id: PropTypes.number.isRequired
    });

export default PostPropType;