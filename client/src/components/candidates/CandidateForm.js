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

class CandidateForm extends Component {
  state = {

    name: '',
    lastName: '',
    email: '',
    birthDate: moment().format('yyyy-dd-MM'),
    age: '',
    title: '',

    experiences: [
      {
        company: "Gupy",
        position: "Full stack dev.",
        jobDescription: "Delivering high quality software using an amazing stack.",
        startDate: moment().format('yyyy-dd-MM'),
        finalDate: undefined,
        isCurrentJob: true
      }
    ],

    nameError: false,
    lastNameError: false,
    emailError: false,
    titleError: false,
    birthDateError: false
  };

  componentWillMount() {

  }

  onSubmitHandler = () => {
    const { name, lastName, email, birthDate, age, title } = this.state;

    if (!name || name === '') {
      this.setState({ nameError: true });
      return;
    }
    if (!lastName || lastName === '') {
      this.setState({ lastNameError: true });
      return;
    }
    if (!birthDate || birthDate === '') {
      this.setState({ birthDateError: true });
      return;
    }
    if (!title || title === '') {
      this.setState({ titleError: true });
      return;
    }

    this.props.insertCandidate({ name, lastName, email, birthDate, age, title });
      // .then(() => this.props.history.push('/'));

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

  renderAddExperienceButton = () => {
    const { classes } = this.props;

    if (this.props.candidate) {
      return (
        <Button variant="raised" size="large" className={classes.button} href={`/experience/candidate`}>
          Add Experiences
        </Button>
      );
    }

    return (
      <div></div>
    );
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
                <TextField
                  error={this.state.nameError}
                  required
                  id="name"
                  label="Name"
                  value={this.state.name}
                  onChange={this.handleChange('name')}
                  className={classes.textField}
                  margin="normal"
                />
                <TextField
                  error={this.state.lastNameError}
                  required
                  id="lastName"
                  label="Last Name"
                  value={this.state.lastName}
                  onChange={this.handleChange('lastName')}
                  className={classes.textField}
                  margin="normal"
                />
                <TextField
                  error={this.state.emailError}
                  required
                  id="email"
                  label="Email"
                  value={this.state.email}
                  onChange={this.handleChange('email')}
                  className={classes.textField}
                  margin="normal"
                />
                <TextField
                  error={this.state.titleError}
                  required
                  id="title"
                  label="Title"
                  value={this.state.title}
                  onChange={this.handleChange('title')}
                  className={classes.textField}
                  margin="normal"
                />
                <TextField
                  id="age"
                  label="Age"
                  value={this.state.age}
                  onChange={this.handleChange('age')}
                  className={classes.textField}
                  margin="normal"
                />
                <TextField
                  id="birthDate"
                  label="Birth Date"
                  type="date"
                  value={this.state.birthDate}
                  onChange={this.handleChange('birthDate')}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <Button variant="raised" size="large" className={classes.button} onClick={this.onCancelHandler}>
                  Cancel
                </Button>
                <Button variant="raised" size="large" className={classes.button} onClick={this.onSubmitHandler}>
                  { this.props.insertLoading ? <CircularProgress className={classes.progress} color="secondary" /> : 'Save'}
                </Button>
                {this.renderAddExperienceButton()}
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = ({ candidates: { insertLoading, insertError, insertErrorMessage, candidate } }) => {
  return {
    insertLoading,
    insertError,
    insertErrorMessage,
    candidate
  }
}

export default connect(mapStateToProps, candidateActions)(withStyles(styles)(withRouter(CandidateForm)));
