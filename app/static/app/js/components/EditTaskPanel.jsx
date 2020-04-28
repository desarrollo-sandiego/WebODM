import '../css/EditTaskPanel.scss';
import React from 'react';
import ErrorMessage from './ErrorMessage';
import EditTaskForm from './EditTaskForm';
import PropTypes from 'prop-types';
import $ from 'jquery';

class EditTaskPanel extends React.Component {
    static defaultProps = {
    };

    static propTypes = {
        task: PropTypes.object.isRequired,
        onSave: PropTypes.func.isRequired,
        onCancel: PropTypes.func.isRequired
    };

    constructor(props){
        super(props);

        this.state = {
          saving: false,
          error: ''
        };

        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleSave(){
      this.setState({saving: true});

      let taskInfo = this.taskForm.getTaskInfo();

      $.ajax({
          url: `/api/projects/${this.props.task.project}/tasks/${this.props.task.id}/`,
          contentType: 'application/json',
          data: JSON.stringify(taskInfo),
          dataType: 'json',
          type: 'PATCH'
        }).done((json) => {
          this.setState({saving: false});
          this.props.onSave(json);
        }).fail(() => {
          this.setState({saving: false, error: "No sé pudo editar la información de su muestra. Por favor, intente nuevamente."});
        });
    }

    handleCancel(){
      this.props.onCancel();
    }

    render(){
        return (
            <div className="edit-task-panel">
              <ErrorMessage bind={[this, "error"]} />
              <div className="form-horizontal">
                <EditTaskForm
                  ref={(domNode) => { if (domNode) this.taskForm = domNode; }}
                  task={this.props.task}
                />
                <div className="actions">
                    <button type="button" className="btn btn-sm btn-primary" onClick={this.handleCancel} disabled={this.state.saving}>Cancelar</button>
                    <button type="button" className="btn btn-sm btn-default save" onClick={this.handleSave} disabled={this.state.saving}>
                        {this.state.saving ?
                            <span>
                                <i className="fa fa-circle-notch fa-spin"></i> Guardando...
                            </span>
                        :   <span>
                                <i className="fa fa-edit"></i> Guardar
                            </span>}
                    </button>
                </div>
              </div>
            </div>
        );
    }
}

export default EditTaskPanel;