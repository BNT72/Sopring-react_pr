import React, {Component} from 'react';
import {Card} from "react-bootstrap";
import {connect, useSelector} from "react-redux";
import {SaveComment} from "../redux/actions";
import {maxLengthCreator, required} from "../validations/validatiors";
import {Field, reduxForm} from "redux-form";
import {renderFieldTextarea} from "../validations/renderField";
import {Link} from "react-router-dom";

class CreateComment extends Component {

    render() {
        const onSubmit = (formData) => {
            formData.author = this.props.user.name

            if (!formData.status) formData.status = this.props.issue.status
            else   this.props.issue.status = formData.status;

            this.props.SaveComment(this.props.id, formData);

        }


        return (
            <Card className={"mt-2 "}>
                <h5 className={"text-center"}>Add Comment</h5>
                <div className={"card-body"}>
                    <CommentReduxForm onSubmit={onSubmit}/>
                </div>

            </Card>
        );
    }
}


const mapDispatchToProps = {
    SaveComment
}

const mapStateToProps = sate => ({
    issue: sate.posts.issue,
    user: sate.users.user


})
export default connect(mapStateToProps, mapDispatchToProps)(CreateComment);


const maxDescriptions = maxLengthCreator(250)

const Form = (props) => {

    const user = useSelector(state => {
        return state.users.user
    })

    return (
        <form onSubmit={props.handleSubmit}>
            <div className={"form-group"}>
                <div className={"form-group p-2"}>
                    <label>Author: {user.name}</label>

                </div>
            </div>

            <div className={"form-group"}>
                <div className={"form-group"}>
                    <label className={"p-2  "}>Status</label>
                    <Field name="status" component="select">
                        <option value="">Select status</option>
                        <option value="In the process">In the process</option>
                        <option value="Closed">Closed</option>
                    </Field>

                </div>
            </div>

            <div className={"form-group mb-2"}>

                <Field component={renderFieldTextarea} label={"Descriptions"} name={"text"}
                       validate={[required, maxDescriptions]}
                />
            </div>


            <button className={"btn btn-success m-1"}>Save</button>

            <Link to={{pathname: '/'}}>
                <button className={"btn btn-danger "}>Cancel</button>
            </Link>
        </form>

    )
}

const CommentReduxForm = reduxForm({form: 'Comment'})(Form)
