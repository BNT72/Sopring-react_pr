import '../App.css';
import React, {Component} from 'react';
import {connect} from "react-redux";
import {SetRole} from "../redux/actions";

class RoleComponent extends Component {
    constructor(props) {
        super(props);
        this.dev = this.dev.bind(this)
        this.test = this.test.bind(this)

    }
    dev() {
        let usr=this.props.user
        usr.role="DEVELOPER";
        this.props.SetRole("DEVELOPER",usr);

    }

    test() {
        let usr=this.props.user
        usr.role="DEVELOPER";
        this.props.SetRole(usr);


    }



    render() {



        return (
            <>
                <h1>Привет новый пользователь. </h1>
                <h2>Пожалуйста укажи свойю должность</h2>
                <button type="button" className="btn btn-primary" onClick={this.dev} >Разработчик</button>
                <button type="button" className="btn btn-success" onClick={this.test}>Тестировщик</button>

            </>
        );
    }

}

const mapDispatchToProps = {
    SetRole
}

const mapStateToProps = sate => ({
    user: sate.users.user
})

export default connect(mapStateToProps, mapDispatchToProps)(RoleComponent);