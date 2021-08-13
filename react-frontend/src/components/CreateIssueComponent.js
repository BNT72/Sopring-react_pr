import React, {Component} from 'react';
import {Card} from "react-bootstrap";
import {createIssue, fetchPosts} from "../redux/actions";
import {connect, useSelector} from "react-redux";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../validations/validatiors";
import {renderField, renderFieldTextarea} from "../validations/renderField";
import {Link} from "react-router-dom";

class CreateIssueComponent extends Component {


    // cancel = () => {
    //     this.props.history.push('/employees')
    // }


    render() {

        const onSubmit = (formData) => {
            formData.author = this.props.user.name
            formData.status = "Created"

            this.props.createIssue(formData);
            this.props.history.push('/employees')
            this.props.fetchPosts();
        }

        return (
            <Card className={"col-md-6 offset-md-3"}>
                <h3 className={"text-center"}>Add Employee</h3>
                <div className={"card-body"}>
                    <IssueReduxForm onSubmit={onSubmit}/>


                    {/*<button className={"btn btn-danger mt-1"} onClick={this.cancel.bind(this)}>Cancel</button>*/}
                </div>

            </Card>


        );
    }
}

const mapDispatchToProps = {
    fetchPosts, createIssue
}
const mapStateToProps = sate => ({

    user: sate.users.user


})

export default connect(mapStateToProps, mapDispatchToProps)(CreateIssueComponent);


const maxLength = maxLengthCreator(30)
const maxDescriptions = maxLengthCreator(250)

const Form = (props) => {
    const user = useSelector(state => {
        return state.users.user
    })
    return (<form onSubmit={props.handleSubmit}>


        <div className={"form-group mb-2"}>
            <label>Author: {user.name}</label>
        </div>

        <div className={"form-group"}>

            <Field component={renderField} type={"text"} label={"Name"} name={"name"}
                   validate={[required, maxLength]}/>
        </div>

        <div className={"form-group"}>

            {/*<Field component={renderField} type={"text"} label={"Status"} name={"status"}*/}
            {/*       validate={[required,maxLength]}*/}
            {/*/>*/}
        </div>

        <div className={"form-group mb-2"}>

            <Field component={renderFieldTextarea} type={"text"} label={"Descriptions"} name={"descriptions"}
                   validate={[required, maxDescriptions]}
            />
        </div>

        <button className={"btn btn-success m-1"}>Save</button>
        <Link to={{pathname: '/'}}>
            <button className={"btn btn-danger "}>Cancel</button>
        </Link>


    </form>)
}

const IssueReduxForm = reduxForm({form: 'Issue'})(Form)