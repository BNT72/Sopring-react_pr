import '../App.css';
import React, {Component} from 'react';
import {Container, Row} from "react-bootstrap";
import {connect} from "react-redux";
import {deleteIssue, fetchPosts, fetchProjects, GetUser} from "../redux/actions";
import RoleComponent from "./RoleComponent";

class ListIssueComponent extends Component {
    constructor(props) {
        super(props);

        this.addIssue = this.addIssue.bind(this)
        this.addProject = this.addProject.bind(this)
        this.colorStatus = this.colorStatus.bind(this)

        this.viewIssue = this.viewIssue.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.props.GetUser();
        this.props.fetchPosts();
        this.props.fetchProjects();

        this.issues = ""
        this.filter = ""

    }
    addIssue() {
        this.props.history.push('/add-issue/_add')
    }

    addProject() {
        this.props.history.push('/add-project/_add')
    }


    viewIssue(id) {

        this.props.history.push(`/view-issue/${id}`)
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
    onSubmit(event) {

    }

    render() {
        if (this.filter === "") {
            this.issues = this.props.issues.map(
                issue =>
                    <Row className={"border  my-1 p-1 rounded"} key={issue.id}>
                        {this.colorStatus(issue.status)}
                        <span className={"hover"}
                              onClick={() => this.viewIssue(issue.id)}>{issue.name}</span>


                        <div>by: {issue.author}</div>
                        <div>#{issue.id} Opened {issue.date}


                            <img className={"m-2 "} height={18}
                                 src={"https://cdn-icons.flaticon.com/png/512/484/premium/484662.png?token=exp=1647014908~hmac=ef8d07456ff5250e9e903373010726e7"} alt={"none"}
                                 onClick={() => this.props.deleteIssue(issue.id)}/>

                        </div>


                    </Row>
            )
        } else {
            this.issues = this.props.issues.filter(value => value.project === this.filter).map(
                issue =>
                    <Row className={"border  my-1 p-1 rounded"} key={issue.id}>
                        {this.colorStatus(issue.status)}
                        <span className={"hover"}
                              onClick={() => this.viewIssue(issue.id)}>{issue.name}</span>


                        <div>by: {issue.author}</div>
                        <div>#{issue.id} Opened {issue.date}


                            <img className={"m-2 "} height={18}
                                 src={"https://image.flaticon.com/icons/png/512/3096/3096673.png"} alt={"none"}
                                 onClick={() => this.props.deleteIssue(issue.id)}/>

                        </div>


                    </Row>
            )
        }

        return (
            <>

                {this.props.user.role ? (<>  <h2 className={"text-center"}>Issue List</h2>
                    <Container>
                        <Row className={" p-1 m-1}"}>
                            <button className={"btn btn-primary"} onClick={this.addProject}>Add project</button>
                        </Row>
                        <Row className={" p-1 m-1}"}>
                            <button className={"btn btn-primary"} onClick={this.addIssue}>Add issue</button>
                        </Row>
                        <select className="form-select" onChange={this.onSubmit}>
                            <option>All</option>
                            {this.props.projects.map(project =>
                                <option value={project.id}>{project.name}</option>
                            )}

                        </select>

                        {this.issues}

                    </Container></>) : (<RoleComponent></RoleComponent>)}

            </>
        );
    }

}

const mapDispatchToProps = {
    fetchPosts, deleteIssue, GetUser,fetchProjects
}

const mapStateToProps = sate => ({
    issues: sate.posts.issues,
    user: sate.users.user,
    project: sate.projects.project,
    projects: sate.projects.projects
})

export default connect(mapStateToProps, mapDispatchToProps)(ListIssueComponent);