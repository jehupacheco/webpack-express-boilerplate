import {connect} from 'react-redux';
import Counter from 'components/presentational/Counter';

const mapStateToProps = (state) => {
  return {
    value: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIncrement: () => {
      dispatch({
        type: 'INCREMENT',
      });
    },
    onDecrement: () => {
      dispatch({
        type: 'DECREMENT',
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
