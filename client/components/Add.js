import axios from "axios";
import React from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-modal'; // Documentation at https://reactcommunity.org/react-modal/, not at https://react-bootstrap.github.io/components/modal/
import { Link } from 'react-router-dom';
var queryString = require(queryString);

class Add extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
            amount: '',
            month: '',
            year: '',
            messageFromServer: '',
            modalIsOpen: false
        }
    }



    openModal() {
        this.setState({
            modalIsOpen: true
        })
    }

    closeModal() {
        this.setState({
            modalIsOpen: false,
            description: '',
            amount: '',
            month: 'Jan',
            year: '2020',
            messageFromServer: ''
        })
    }

    componentDidMount() {
        this.setState({
            month: this.props.selectedMonth,
            year: this.props.selectedYear
        })
    }

    handleSelectChange(event) {
        let value = event.target.value;
        if (event.target.name == 'month') {
            this.setState({
                month: value
            })
        } else if (event.target.name == 'year') {
            this.setState({
                year: value
            })
        }
    }

    onClick(event) {
        this.insertNewExpense(this);
    }

    insertNewExpense(exp) {
        axios.post('/insert',
            queryString.stringify({
                description: exp.state.description,
                amount: exp.state.amount,
                month: exp.state.month,
                year: exp.state.year

            }), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then((response) => {
            exp.setState({
                messageFromServer: response.data
            });
        });
    }

    handleTextChange(event) {
        let value = event.target.value;
        if (event.target.name == "description") {
            this.setState({
                description: value
            })
        } else if (event.target.name == "amount") {
            this.setState({
                amount: value
            })
        }
    }



    render() {
        if (this.state.messageFromServer == '') {
            return (
                <div>
                    <Button bsStyle="success" bsSize="small" onClick={this.openModal}><span className="glyphicon glyphicon-plus"></span></Button>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        contentLabel="Add Expense"
                        className="Modal">

                        <Link to={{ pathname: '/', search: '' }} style={{ textDecoration: "none" }}>
                            <Button bsStyle="danger" bsSize="mini" onClick={this.closeModal}>
                                <span className="closebtn glyphicon glyphicon-remove"></span>
                            </Button>
                        </Link>
                        <br />
                        <fieldset>
                            <label name="description">Description:</label>
                            <input type="text" id="description" name="description" value={this.state.description} onChange={this.handleTextChange} />
                            <label name="amount">Amount:</label>
                            <input type="number" id="amount" name="amount" value={this.state.amount} onChange={this.handleTextChange} />
                            <label name="month">Month:</label>
                            <select id="month" name="month" value={this.state.month} onChange={this.handleSelectChange}>
                                <option value="jan" id="jan">January</option>
                                <option value="feb" id="feb">February</option>
                                <option value="mar" id="mar">March</option>
                                <option value="apr" id="apr">April</option>
                                <option value="may" id="may">May</option>
                                <option value="jun" id="jun">June</option>
                                <option value="jul" id="jul">July</option>
                                <option value="aug" id="aug">August</option>
                                <option value="sep" id="sep">September</option>
                                <option value="oct" id="oct">October</option>
                                <option value="nov" id="nov">November</option>
                                <option value="dec" id="dec">December</option>
                            </select>
                            <label name="year">Year:</label>
                            <select>
                                <option value="2016">2016</option>
                                <option value="2017">2017</option>
                                <option value="2018">2018</option>
                                <option value="2019">2019</option>
                                <option value="2020">2020</option>
                                <option value="2021">2021</option>
                                <option value="2022">2022</option>
                            </select>
                        </fieldset>
                        <div className="button-center">
                            <br />
                            <Button bsStyle="success" bsSize="small" onClick={this.onClick}>Add New Expense</Button>
                        </div>
                    </Modal>
                </div>
            );
        } else {
            return (
                <div>
                    <Button bsStyle="success" bsSize="small" onClick={this.openModal}>
                        <span className="glyphicon glyphicon-plus"></span>
                    </Button>

                    <Modal 
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                     // FINSIH ELSE RETURN STATEMENT OF APP COMPONENT////////////////////////>
                     >
                    </Modal>
                   
                </div>
            )
        }

    }


}

export default Add;