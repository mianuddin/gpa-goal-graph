import React from 'react';

import Formsy from 'formsy-react';
import FormsyText from 'formsy-material-ui/lib/FormsyText';

import Paper from 'material-ui/lib/paper';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import CardActions from 'material-ui/lib/card/card-actions';

import '../styles/partials/_ClassPaper';

const errorMessages = {
  alphanumericError: 'Only A-Z and 0-9 allowed.',
  numericError: 'Please provide a number.',
  gradeError: 'Must be A+ through F or 0-4.',
};

const ClassPaper = props => {
  function handleSubmit(data) {
    props.addClass(data.className, data.classGrade.toUpperCase(), data.classCredits);
    props.onUserInteraction();
  }

  function handleSelect(selectedRows) {
    const row = selectedRows.length ? selectedRows[0] + 1 : 0;
    props.selectClass(row);
  }

  function duplicateSelectedClass() {
    const selectedClass = props.classes[props.formProps.selectedClass - 1].toObject();
    props.addClass(selectedClass.name, selectedClass.grade, selectedClass.credits);
  }

  function removeSelectedClass() {
    props.removeClass(props.formProps.selectedClass - 1);
  }

  return (
    <div id="ClassSectionContainer">
      <Paper zDepth={1}>
        <div id="TableWrapper">
          <Table
            multiSelectable={false}
            onRowSelection={handleSelect}
          >
            <TableHeader>
              <TableRow>
                <TableHeaderColumn>Class</TableHeaderColumn>
                <TableHeaderColumn>Grade</TableHeaderColumn>
                <TableHeaderColumn>Credits</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              deselectOnClickaway={false}
            >
              {props.classes.map((classObj, index) => (
                <TableRow
                  key={index}
                  selected={(index + 1) === props.formProps.selectedClass}
                >
                  <TableRowColumn>{classObj.get('name')}</TableRowColumn>
                  <TableRowColumn>{classObj.get('grade')}</TableRowColumn>
                  <TableRowColumn>{classObj.get('credits')}</TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <CardActions>
          <FlatButton
            label="Duplicate"
            disabled={!props.formProps.selectedClass}
            onClick={duplicateSelectedClass}
          />
          <FlatButton
            label="Remove"
            disabled={!props.formProps.selectedClass}
            onClick={removeSelectedClass}
          />
        </CardActions>
      </Paper>
      <div id="FAB">
        <FloatingActionButton
          onClick={props.onUserInteraction}
        >
          <ContentAdd />
        </FloatingActionButton>
      </div>
      <Dialog
        title="Add a Class"
        contentClassName="DialogContent"
        modal={false}
        open={props.formProps.dialogOpen}
        onRequestClose={props.onUserInteraction}
      >
        <Formsy.Form
          onValid={props.changeSubmit.bind(this, true)}
          onInvalid={props.changeSubmit.bind(this, false)}
          onValidSubmit={handleSubmit}
        >
          <div id="ClassInputs">
            <FormsyText
              name="className"
              required
              hintText="What is the name of this class?"
              floatingLabelText="Name"
              validations="isExisty"
              validationError={errorMessages.alphanumericError}
            />
            <br />
            <FormsyText
              name="classGrade"
              required
              hintText="What is your grade in this class?"
              floatingLabelText="Grade"
              validations={{
                matchRegexp: /^([a-dA-DfF][+-]?|[0-4][.]?[0-9]?)$/,
              }}
              validationError={errorMessages.gradeError}
            />
            <br />
            <FormsyText
              name="classCredits"
              required
              hintText="How many credits is this class?"
              floatingLabelText="Credits"
              validations="isNumeric"
              validationError={errorMessages.numericError}
            />
          </div>
          <div id="DialogActions">
            <FlatButton
              label="Cancel"
              secondary
              onTouchTap={props.onUserInteraction}
            />
            <FlatButton
              label="Submit"
              primary
              disabled={!props.formProps.canSubmit}
              type="submit"
            />
          </div>
        </Formsy.Form>
      </Dialog>
    </div>
  );
};

ClassPaper.propTypes = {
  classes: React.PropTypes.array,
  formProps: React.PropTypes.object,
  onUserInteraction: React.PropTypes.func,
  changeSubmit: React.PropTypes.func,
  addClass: React.PropTypes.func,
  selectClass: React.PropTypes.func,
  removeClass: React.PropTypes.func,
};

export default ClassPaper;
