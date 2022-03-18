import React, {Component} from 'react';
import {Card} from "react-bootstrap";
import {createProject, fetchPosts, GetUsers} from "../redux/actions";
import {connect} from "react-redux";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../validations/validatiors";
import {renderField} from "../validations/renderField";
import {Link} from "react-router-dom";

class CreateProjectComponent extends Component {
    constructor(props) {
        super(props)
        this.props.GetUsers()
    }

    render() {
        const onSubmit = (formData) => {
            this.props.createProject(formData);
            this.props.history.push('/issues')
            this.props.fetchPosts();
        }

        return (
            <Card className={"col-md-6 offset-md-3"}>
                <h3 className={"text-center"}>Add Project</h3>
                <div className={"card-body"}>
                    <IssueReduxForm onSubmit={onSubmit} />
                    {/*<button className={"btn btn-danger mt-1"} onClick={this.cancel.bind(this)}>Cancel</button>*/}
                </div>

            </Card>


        );
    }
}

const mapDispatchToProps = {
    fetchPosts, createProject, GetUsers
}
const mapStateToProps = sate => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateProjectComponent);


const maxLength = maxLengthCreator(30)

class Form extends Component{




    render() {
        return (<form onSubmit={this.props.handleSubmit}>


            <div className={"form-group"}>

                <Field component={renderField} type={"text"} label={"Name"} name={"name"}
                       validate={[required, maxLength]}/>
            </div>


            <button className={"btn btn-success m-1"}>Save</button>
            <Link to={{pathname: '/'}}>
                <button className={"btn btn-danger "}>Cancel</button>
            </Link>


        </form>)
    }
}

const IssueReduxForm = reduxForm({form: 'Project'})(Form)