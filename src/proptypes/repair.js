import PropTypes from 'prop-types';

export default PropTypes.shape({
  id: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  datetime: PropTypes.object,
  isCompleted: PropTypes.bool,
  isApproved: PropTypes.bool,
});
