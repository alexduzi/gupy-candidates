import React from 'react';
// import { connect } from 'react-redux';
import CandidateList from './candidates/CandidateList';
import CandidateSearchBar from './candidates/CandidateSearchBar';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  fab: {
    position: 'absolute',
    bottom: '10px',
    right: '10px',
  },
});

const Dashboard = (props) => {

  return (
    <div>
      <CandidateSearchBar />
      <CandidateList />
    </div>
  );
};

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};



export default withStyles(styles)(Dashboard);
