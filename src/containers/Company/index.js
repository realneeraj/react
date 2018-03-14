import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { companyActions, formActions } from "../../_actions";
import { validateCompanyForm } from '../../_helpers';
import { Filters, AddButton, Single, Form } from '../../components/Company';

class Company extends Component {

    constructor(props, context) {
        super(props, context);
        // Set Edit flag
        this.state = {
            edit: false,
        }
        this.handleEdit = this.handleEdit.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleKeyup = this.handleKeyup.bind(this);
    }

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(companyActions.getAll());
    }

    handleEdit(id) {
        const { dispatch } = this.props;
        // Reset Edit flag
        this.setState({
            edit: true
        });
        dispatch(companyActions.view(id));
    }

    onSubmit(values, dispatch) {
        if (this.state.edit)
            dispatch(companyActions.update(values, values.id));
        else
            dispatch(companyActions.add(values));                    

        // Reset Form
        dispatch(formActions.reset());
        // Close Form
        document.getElementById("close-modal").click();
        // Reset Edit flag
        this.setState({
            edit: false
        });
    }

    resetForm() {
        const { dispatch } = this.props;
        // Reset Edit flag
        this.setState({
            edit: false
        });
        // Reset Form
        dispatch(formActions.reset());
    }

    normalizeBoolean(value) {
        if (value === "true") return true;
        if (value === "false") return false;
        return value;
    }

    handleKeyup(event){
        const { dispatch } = this.props;
        dispatch(companyActions.search({search: event.target.value}));  
    }

    render() {
        const { companies, view, handleSubmit } = this.props;

        return (
            <div className="company">
                <Filters
                    handleKeyup={this.handleKeyup}
                 />
                <AddButton />

                <div className="row">
                    <div className="col-lg-12">
                        <div className="box">
                            <div className="box-body">

                                <table className="table table-hover table-striped">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Company Name</th>
                                            <th>Website</th>
                                            <th>Status</th>
                                            <th>Created</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            companies.loading &&
                                            <tr>
                                                <td colSpan="100" align="center">
                                                    <span>
                                                        <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i> Loading...
                                                        </span>
                                                </td>
                                            </tr>
                                        }
                                        {
                                            !companies.loading && !companies.data.length &&
                                            <tr>
                                                <td colSpan="100" align="center">
                                                    <span>
                                                        No Records Found.
                                                    </span>
                                                </td>
                                            </tr>
                                        }
                                        <Single
                                            companies={companies.data}
                                            loading={view.loading}
                                            handleEdit={this.handleEdit}
                                        />
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>

                <Form
                    handleSubmit={handleSubmit}
                    onSubmit={this.onSubmit}
                    view={view}
                    normalizeBoolean={this.normalizeBoolean}
                    resetForm={this.resetForm}
                />
            </div>
        )
    }
}

let CompanyPageForm = reduxForm({
    form: 'companyForm',
    validate: validateCompanyForm,
    enableReinitialize: true
})(Company)

const mapStateToProps = (state) => ({
    companies: state.company.list,
    view: state.company.view,
    initialValues: state.company.view.data
})

let connectedCompanyPage = connect(mapStateToProps)(CompanyPageForm);

export { connectedCompanyPage as Company };