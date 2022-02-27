import '../App.css';
import React, {Component} from 'react';
import {Container, Row} from "react-bootstrap";
import {connect} from "react-redux";
import {deleteIssue, fetchPosts, GetUser} from "../redux/actions";
import RoleComponent from "./RoleComponent";

class ListIssueComponent extends Component {
    constructor(props) {
        super(props);

        this.addEmployee = this.addEmployee.bind(this)

        this.viewEmployee = this.viewEmployee.bind(this)

        this.props.GetUser();
        this.props.fetchPosts();

    }

    // componentDidMount() {
    //     EmployeeService.getEmployees().then((res) => {
    //         this.setState({employees: res.data})
    //
    //     });
    //
    // }

    addEmployee() {
        this.props.history.push('/add-employee/_add')
    }


    viewEmployee(id) {
        // this.props.ViewEmployee(id)
        this.props.history.push(`/view-employee/${id}`)
    }

    render() {

        function colorStatus(status) {
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

        return (
            <>

                {this.props.user.role?(<>  <h2 className={"text-center"}>Employee List</h2>
                    <Container>
                        <Row className={" p-3}"}>
                            <button className={"btn btn-primary"} onClick={this.addEmployee}>Add employee</button>
                        </Row>


                        {
                            this.props.employees.map(
                                employee =>
                                    <Row className={"border  my-1 p-1 rounded"} key={employee.id}>
                                        {colorStatus(employee.status)}
                                        <span className={"hover"}
                                              onClick={() => this.viewEmployee(employee.id)}>{employee.name}</span>


                                        <div>by: {employee.author}</div>
                                        <div>#{employee.id} Opened {employee.date}


                                            <img className={"m-2 "} height={18}
                                                 src={"https://image.flaticon.com/icons/png/512/3096/3096673.png"} alt={"none"}
                                                 onClick={() => this.props.deleteIssue(employee.id)}/>

                                        </div>


                                    </Row>
                            )
                        }

                    </Container></>):(<RoleComponent></RoleComponent>)}

            </>
        );
    }

}

const mapDispatchToProps = {
    fetchPosts, deleteIssue, GetUser
}

const mapStateToProps = sate => ({
    employees: sate.posts.employees,
    user: sate.users.user
})

export default connect(mapStateToProps, mapDispatchToProps)(ListIssueComponent);