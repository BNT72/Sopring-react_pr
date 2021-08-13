import React, {Component} from 'react';
import {Card, Row} from "react-bootstrap";
import {ViewIssue} from "../redux/actions";
import {connect} from "react-redux";
import CreateComment from "./CreateComment";

class ViewIssueComponent extends Component {
    constructor(props) {
        super(props);


        this.props.ViewIssue(this.props.match.params.id);


    }

    cancel = () => {
        this.props.history.push('/employees')
    }

    colorStatus(status) {
        switch (status) {
            case "Created":
                return <b className={"text-success"}>{status}</b>
            case "In the process":
                return <b className={"text-warning"}>{status}</b>
            case "Closed":
                return <b className={"text-danger"}>{status}</b>

            default:
                return <b>{status}</b>
        }
    }

    render() {

        return (
            <>
                <h3 className={"text-center"}>View Employee Details</h3>
                <Card className={" p-2"}>

                    <div className={"card-body"}>
                        <Row>
                            {this.colorStatus(this.props.employee.status)}
                        </Row>
                        <Row>
                            <b className={"p-2"}>
                          Problem:  {this.props.employee.name}
                            </b>
                        </Row>

                        <Row className={"p-2 "} >
                                <div>Description: </div>
                          <div className={"border mt-1 p-2 "}>  {this.props.employee.descriptions}</div>
                        </Row>

                        <div className={"p-2"}>Author is {this.props.employee.author}  {this.props.employee.date}   </div>




                    </div>
                </Card>



                {

                    this.props.comments.map(
                        comment =>

                            <Card className={"my-2 p-2"} key={comment.id}>
                                <div>Author: {comment.author} {comment.date}</div>
                                <div>{comment.status}</div>
                                <div>{comment.text}</div>


                            </Card>
                    )
                }


                <CreateComment id={this.props.match.params.id}/>

            </>
        );
    }
}


const mapDispatchToProps = {
    ViewIssue
}
const mapStateToProps = sate => ({
    employee: sate.posts.employee,
    comments: sate.posts.comments

})


export default connect(mapStateToProps, mapDispatchToProps)(ViewIssueComponent)