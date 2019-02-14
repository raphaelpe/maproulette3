import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TaskStatus } from '../../../../../services/Task/TaskStatus/TaskStatus'
import UserEditorSelector
       from '../../../../UserEditorSelector/UserEditorSelector'
import Dropdown from '../../../../Dropdown/Dropdown'
import SvgSymbol from '../../../../SvgSymbol/SvgSymbol'
import TaskEditControl from '../TaskEditControl/TaskEditControl'
import TaskFalsePositiveControl from '../TaskFalsePositiveControl/TaskFalsePositiveControl'
import TaskFixedControl from '../TaskFixedControl/TaskFixedControl'
import TaskTooHardControl from '../TaskTooHardControl/TaskTooHardControl'
import TaskAlreadyFixedControl from '../TaskAlreadyFixedControl/TaskAlreadyFixedControl'
import TaskSkipControl from '../TaskSkipControl/TaskSkipControl'
import './TaskCompletionStep1.scss'


/**
 * TaskCompletionStep1 renders and manages controls and keyboard shortcuts for
 * initiating editing a task (fix, skip, false positive).
 *
 * @see See ActiveTaskControls
 *
 * @author [Neil Rotstan](https://github.com/nrotstan)
 */
export default class TaskCompletionStep1 extends Component {
  state = {
    moreOptionsOpen: false,
  }

  toggleMoreOptions = () => {
    this.setState({moreOptionsOpen: !this.state.moreOptionsOpen})
  }

  closeMoreOptions = () => {
    this.setState({moreOptionsOpen: false})
  }

  render() {
    return (
      <div>
        <UserEditorSelector {...this.props} className="mr-mb-4" />
        <div className="mr-my-4 mr-grid mr-grid-columns-2 mr-grid-gap-4">
          {this.props.allowedProgressions.has(TaskStatus.fixed) &&
           <TaskEditControl {...this.props} />
          }

          {this.props.allowedProgressions.has(TaskStatus.falsePositive) &&
           <TaskFalsePositiveControl {...this.props} />
          }

          {this.props.allowedProgressions.has(TaskStatus.skipped) &&
           <TaskSkipControl {...this.props} />
          }

          <Dropdown
            className="mr-dropdown--fixed mr-w-full"
            dropdownButton={dropdown =>
              <MoreOptionsButton toggleDropdownVisible={dropdown.toggleDropdownVisible} />
            }
            dropdownContent={dropdown =>
              <ListMoreOptionsItems {...this.props} />
            }
          />
        </div>
      </div>
    )
  }
}

const MoreOptionsButton = function(props) {
  return (
    <button
      className="mr-dropdown__button mr-button mr-w-full"
      onClick={props.toggleDropdownVisible}
    >
      <SvgSymbol
        sym="navigation-more-icon"
        viewBox="0 0 20 20"
        className="mr-fill-green-lighter mr-w-4 mr-h-4"
      />
    </button>
  )
}

const ListMoreOptionsItems = function(props) {
  return (
    <ol className="mr-list-dropdown">
      <li>
        <TaskFixedControl {...props} asLink />
      </li>
      <li>
        <TaskTooHardControl {...props} asLink />
      </li>
      <li>
        <TaskAlreadyFixedControl {...props} asLink />
      </li>
    </ol>
  )
}

TaskCompletionStep1.propTypes = {
  /** The current active task */
  task: PropTypes.object.isRequired,
  /** The current map bounds (for editing) */
  mapBounds: PropTypes.object,
  /** Invoked if the user wishes to edit the task */
  pickEditor: PropTypes.func.isRequired,
  /** Invoked if the user immediately completes the task (false positive) */
  complete: PropTypes.func.isRequired,
}
