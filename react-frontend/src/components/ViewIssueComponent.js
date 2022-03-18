import React, {Component} from 'react';
import {Card, Row} from "react-bootstrap";
import {ViewIssue} from "../redux/actions";
import {connect} from "react-redux";
import CreateComment from "./CreateComment";

class ViewIssueComponent extends Component {
    constructor(props) {
        super(props);


        this.props.ViewIssue(this.props.match.params.id);
        this.colorStatus = this.colorStatus.bind(this)
        this.issueInherited = this.issueInherited.bind(this)
        this.issueHeir = this.issueHeir.bind(this)
        this.viewIssue = this.viewIssue.bind(this)
    }

    cancel = () => {
        this.props.history.push('/issues')
    }
    viewIssue(id) {
        this.props.history.push(`/view-issue/${id}`)
        this.props.ViewIssue(id);
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

    issueInherited(){
        if(this.props.issue.issueInherited!==null){
            return< >
                <div className={"h4 m-3" }>
                    Inherited issue
                </div>
                <Card className={"p-2 mt-2"}>

                <div className={"card-header"}>

                  <div className={"h6"}>
                        {this.colorStatus(this.props.issue.issueInherited.status)}
                    </div>
                    <div>
                        <span  className={""}> Problem:</span>
                        <span className={"hover"}   onClick={() => this.viewIssue(this.props.issue.issueInherited.id)}>
                            {this.props.issue.issueInherited.name}
                        </span>
                    </div>
                </div>
                <div className={"card-body border"}>
                    <Row className={""}>
                        <div className={""}>  {this.props.issue.issueInherited.descriptions}</div>
                    </Row>



                </div>
            </Card></>
        }
        return <></>
    }
    issueHeir(){
        let iss=this.props.issues.filter(value => value.issueInherited!==null).filter(value =>value.issueInherited.id==this.props.match.params.id)
        console.log(iss)
        if(iss.length>0){
            // return
          return  iss.map(value =>
                <Card className={"p-2 mt-2"}>

                    <div className={"card-header"}>

                        <div >
                            <div>
                                {this.colorStatus(value.status)}
                            </div>
                            <span  className={" "}> Problem:</span>
                            <span className={" hover"}   onClick={() => this.viewIssue(value.id)}>{value.name}</span>

                        </div>
                    </div>
                    <div className={"card-body border"}>
                        <Row className={""}>

                            <span className={""}>  {value.descriptions}</span>
                        </Row>




                    </div>
                </Card>

            )


        }
        return <></>
    }

    render() {

        return (
            <>
                <h3 className={"text-center"}>View Issue Details</h3>
                <Card className={" p-2 mb-4"}>

                    <div className={"card-header"}>
                        <div className={"h5 "}>
                            {this.colorStatus(this.props.issue.status)}
                        </div>
                        <div>
                            <b className={" h5"}>
                                Problem: {this.props.issue.name}
                            </b>
                        </div>
                    </div>
                        <div className={"card-body"}>
                        <Row className={"p-1 border"}>
                            <h6>Description:</h6>
                            <div className={""}>  {this.props.issue.descriptions}</div>
                        </Row>

                        <div className={"p-2"}>Author is {this.props.issue.author} {this.props.issue.date}   </div>


                    </div>
                </Card>
                {this.issueInherited()}
                {this.props.issues.filter(value => value.issueInherited!==null).filter(value =>value.issueInherited.id==this.props.match.params.id).length>0?
                    (<div className={"h4 m-3"}>
                        Heir issue
                    </div>):(<></>)
                }
                {this.issueHeir()}
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
    issue: sate.posts.issue,
    issues: sate.posts.issues,
    comments: sate.posts.comments

})


export default connect(mapStateToProps, mapDispatchToProps)(ViewIssueComponent)