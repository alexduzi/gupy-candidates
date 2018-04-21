import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { withRouter } from "react-router-dom";
import Button from 'material-ui/Button';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from 'material-ui/TextField';
import * as candidateActions from '../../actions';
import { CircularProgress } from 'material-ui/Progress';
import moment from 'moment';
import Reorder, {
  reorder,
  reorderImmutable,
  reorderFromTo,
  reorderFromToImmutable
} from 'react-reorder';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  demo: {
    height: 240,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    height: '100%',
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
  container: {
    flexdirection: 'column',
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit * 4,
    marginRight: theme.spacing.unit,
    width: 400,
  },
  button: {
    margin: theme.spacing.unit,
  },
  menu: {
    width: 200,
  },
});

class ExperienceForm extends Component {
  state = {

    candidate: undefined,

    experiences: [
      {
        company: "Gupy",
        position: "Full stack dev.",
        jobDescription: "Delivering high quality software using an amazing stack.",
        startDate: moment().format('yyyy-dd-MM'),
        finalDate: undefined,
        isCurrentJob: true
      }
    ]

  };

  componentWillMount() {

  }

  onSubmitHandler = () => {

    this.props.insertExperiences(this.state.experiences)
      .then(() => this.props.history.push('/'));

  }

  onCancelHandler = () => {

    this.props.cancelCandidateInsertion().then(() => this.props.history.push('/'));
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
      [`${name}Error`]: false
    });
  };

  addNewExperience = () => {
    let { experiences } = this.state;

    let newExperience = {
      company: "",
      position: "",
      jobDescription: "",
      startDate: moment().format('yyyy-dd-MM'),
      finalDate: moment().format('yyyy-dd-MM'),
      isCurrentJob: false
    };

    experiences = [ ...experiences, newExperience ];

    this.setState({ experiences });
  }

  removeExperience = (index) => {
    let { experiences } = this.state;

    if (experiences.length === 1) return;

    experiences = experiences.filter((item, idx) => idx !== index);

    this.setState({ experiences });
  }

  renderExperiences() {
    const { classes } = this.props;

    return this.state.experiences.map((experience, index) => {
      return (
        <div key={index}>
          <TextField
            id="name"
            label="Name"
            value={this.state.name}
            onChange={this.handleChange('name')}
            className={classes.textField}
            margin="normal"
          />
          <Button variant="fab" color="secondary" aria-label="delete" className={classes.button} onClick={() => this.removeExperience(index)}>
            <DeleteIcon />
          </Button>
        </div>
      );
    });
  }

  onReorder (event, previousIndex, nextIndex, fromId, toId) {
    this.setState({
      experiences: reorder(this.state.experiences, previousIndex, nextIndex)
    });
  }

  onReorderGroup (event, previousIndex, nextIndex, fromId, toId) {
    if (fromId === toId) {
      const list = reorderImmutable(this.state[fromId], previousIndex, nextIndex);

      this.setState({
        [fromId]: list
      });
    } else {
      const lists = reorderFromToImmutable({
        from: this.state[fromId],
        to: this.state[toId]
      }, previousIndex, nextIndex);

      this.setState({
        [fromId]: lists.from,
        [toId]: lists.to
      });
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Grid
            container
            spacing={16}
            className={classes.demo}
            alignItems={'center'}
            direction={'column'}
            justify={'center'}
          >
            <Grid key={1} item>
              <Paper
                className={classes.paper}
                style={{ paddingTop: (1 + 1) * 10, paddingBottom: (1 + 1) * 10 }}
              >
                <Button variant="fab" color="primary" aria-label="add" className={classes.button} onClick={this.addNewExperience}>
                  <AddIcon />
                </Button>
                <Reorder
                  reorderId="my-list" // Unique ID that is used internally to track this list (required)
                  placeholderClassName="placeholder" // Class name to be applied to placeholder elements (optional), defaults to 'placeholder'
                  draggedClassName="dragged" // Class name to be applied to dragged elements (optional), defaults to 'dragged'
                  lock="vertical" // Lock the dragging direction (optional): vertical, horizontal (do not use with groups)
                  onReorder={this.onReorder.bind(this)} // Callback when an item is dropped (you will need this to update your state)
                  autoScroll={true} // Enable auto-scrolling when the pointer is close to the edge of the Reorder component (optional), defaults to true
                  disabled={false} // Disable reordering (optional), defaults to false
                  disableContextMenus={true} // Disable context menus when holding on touch devices (optional), defaults to true
                  placeholder={
                    <div className="custom-placeholder" /> // Custom placeholder element (optional), defaults to clone of dragged element
                  }
                >
                  {
                    this.renderExperiences()
                    /*
                    Note this example is an ImmutableJS List so we must convert it to an array.
                    I've left this up to you to covert to an array, as react-reorder updates a lot,
                    and if I called this internally it could get rather slow,
                    whereas you have greater control over your component updates.
                    */
                  }
                </Reorder>
                <Button variant="raised" size="large" className={classes.button} onClick={this.onCancelHandler}>
                  Cancel
                </Button>
                <Button variant="raised" size="large" className={classes.button} onClick={this.onSubmitHandler}>
                  { this.props.insertLoading ? <CircularProgress className={classes.progress} color="secondary" /> : 'Save'}
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = ({ candidates: { candidate } }) => {
  return {
    candidate
  }
}

export default connect(mapStateToProps, candidateActions)(withStyles(styles)(withRouter(ExperienceForm)));
