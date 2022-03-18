import React, {Component} from 'react';
import {Card} from "react-bootstrap";
import {createIssue, fetchPosts, GetUsers} from "../redux/actions";
import {connect} from "react-redux";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../validations/validatiors";
import {renderField, renderFieldTextarea} from "../validations/renderField";
import {Link} from "react-router-dom";

class CreateIssueComponent extends Component {
    constructor(props) {
        super(props)
        this.props.GetUsers()
    }

    render() {
        const onSubmit = (formData) => {
            formData.author = this.props.user.name
            formData.status = "Created"
            // formData.project_id = Number(formData.project_id)
            console.log(formData)
            this.props.createIssue(formData);
            this.props.history.push('/issues')
            this.props.fetchPosts();
        }
        let users = this.props.users
        let projects = this.props.projects
        let issues = this.props.issues
        // console.log(users)
        return (
            <Card className={"col-md-6 offset-md-3"}>
                <h3 className={"text-center"}>Add Issue</h3>
                <div className={"card-body"}>
                    <IssueReduxForm onSubmit={onSubmit} users={users} projects={projects} issues={issues}/>
                    {/*<button className={"btn btn-danger mt-1"} onClick={this.cancel.bind(this)}>Cancel</button>*/}
                </div>

            </Card>


        );
    }
}

const mapDispatchToProps = {
    fetchPosts, createIssue, GetUsers
}
const mapStateToProps = sate => ({
    issues: sate.posts.issues,
    user: sate.users.user,
    users: sate.users.users,
    projects: sate.projects.projects
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateIssueComponent);


const maxLength = maxLengthCreator(30)
const maxDescriptions = maxLengthCreator(250)

const Form = (props) => {


    return (<form onSubmit={props.handleSubmit}>


        <div className={"form-group"}>

            <Field component={renderField} type={"text"} label={"Name"} name={"name"}
                   validate={[required, maxLength]}/>
        </div>

        <div className={"form-group mb-2"}>

            <Field component={renderFieldTextarea} type={"text"} label={"Descriptions"} name={"descriptions"}
                   validate={[required, maxDescriptions]}
            />
        </div>
        <div className={"form-group"}>
            <label className={"p-2  "}>User</label>
            <Field name="userId" component="select">
                <option value={0}>Select user</option>
                {props.users.map(user => <option value={user.id}>{user.name}</option>)}</Field>

        </div>

        <div className={"form-group"}>
            <label className={"p-2  "}>Status</label>
            <Field name="projectId" component="select">
                <option value={0}>Select project</option>
                {props.projects.map(project => <option value={project.id}>{project.name}</option>)}
            </Field>

        </div>
        <div className={"form-group"}>
            <label className={"p-2  "}>Inherited issue</label>
            <Field name="issueInheritedId" component="select">
                <option value={0}>Select issue</option>
                {props.issues.map(issue => <option value={issue.id}>{issue.name}</option>)}
            </Field>

        </div>


        <button className={"btn btn-success m-1"}>Save</button>
        <Link to={{pathname: '/'}}>
            <button className={"btn btn-danger "}>Cancel</button>
        </Link>


    </form>)

}

const IssueReduxForm = reduxForm({form: 'Issue'})(Form)