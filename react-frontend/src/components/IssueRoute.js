import React, {Component} from 'react';
import {connect} from "react-redux";
import {GetUser} from "../redux/actions";
import {Container} from "react-bootstrap";
import {Route,BrowserRouter as Router, Switch} from "react-router-dom";
import ListIssueComponent from "./ListIssueComponent";
import CreateIssueComponent from "./CreateIssueComponent";
import ViewIssueComponent from "./ViewIssueComponent";
import RoleComponent from "./RoleComponent";

class IssueRoute extends Component {

    constructor(props) {
        super(props);


        this.props.GetUser();



    }


    render() {

        if (!this.props.user.id) {
            // Супер костыль //
            // Авторизация проходит только на порту 8081, если пользователь не авторизован появляеться ссылка на порт спринга
            //  где проходит авторизация и в дальнейшем редиректит обратно на порт 3000
            return (<a href={"http://localhost:8081/back"}> Hello user! You need to log in</a>)
        } else {
            return (
                <>
                    <Router>


                        <Container className={"mt-3"}>
                            <Switch>
                                <Route path="/" exact component={ListIssueComponent}/>
                                <Route path="/employees" component={ListIssueComponent}/>
                                <Route path="/add-employee/:id" component={CreateIssueComponent}/>
                                <Route path="/view-employee/:id" component={ViewIssueComponent}/>
                                <Route path="/role" component={RoleComponent}/>
                            </Switch>
                        </Container>


                    </Router>
                </>
            );
        }
    }
}


const mapDispatchToProps = {
    GetUser
}

const mapStateToProps = sate => ({

    user: sate.users.user
})

export default connect(mapStateToProps, mapDispatchToProps)(IssueRoute);