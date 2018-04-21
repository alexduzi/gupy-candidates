import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { withRouter } from "react-router-dom";
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import * as candidateActions from '../../actions';
import { CircularProgress } from 'material-ui/Progress';
import moment from 'moment';

const styles = theme => ({
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
    birthDate: moment().format('yyyy-mm-dd'),
    age: '',
    title: '',

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

    this.props.insertCandidate({ name, lastName, email, birthDate, age, title })
      .then(() => this.props.history.push('/'));
      
  }

  onCancelHandler = () => {

    this.props.history.push('/');
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
      [`${name}Error`]: false
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <form className={classes.container} noValidate autoComplete="off">
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
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ candidates: { insertLoading, insertError, insertErrorMessage } }) => {
  return {
    insertLoading,
    insertError,
    insertErrorMessage
  }
}

export default connect(mapStateToProps, candidateActions)(withStyles(styles)(withRouter(CandidateForm)));
